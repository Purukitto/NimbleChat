import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../helper/supabase";

const initialState = { messages: [], loading: false, error: "" };

export const fetchChat = createAsyncThunk("chat/fetchChat", async (chatID) => {
	const chat = await supabase
		.from("chatstream")
		.select("*")
		.eq("chat_id", chatID)
		.order("id", { ascending: true });
	return chat.data;
});

// Send user message to database
export const sendMessage = createAsyncThunk(
	"chat/sendMessage",
	async ({ message, user }) => {
		const { data, error } = await supabase
			.from("chatstream")
			.insert([
				{
					chat_id: user.id,
					user: {
						fName: user.user_metadata.user_name,
						avatar: user.user_metadata.avatar_url,
					},
					text: message,
				},
			])
			.select();

		if (error) throw new Error(error.message);
		else return data[0];
	}
);

export const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		update: (state, action) => {
			console.log("action.payload: ", action.payload);
			const { botMessage, response } = action.payload;
			console.log(
				"botMessage in payload: ",
				JSON.stringify(botMessage),
				"response in payload: ",
				response
			);
			const existingMessageIndex = state.messages.findIndex(
				(m) => m.id === botMessage.id
			);

			if (existingMessageIndex !== -1) {
				state.messages[existingMessageIndex] = {
					...state.messages[existingMessageIndex],
					text: response,
				};
			} else {
				state.messages.push({
					...state.messages[existingMessageIndex],
					text: response,
				});
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchChat.pending, (state) => {
			state.loading = true;
			state.error = "";
		});

		builder.addCase(fetchChat.fulfilled, (state, action) => {
			state.loading = false;
			state.messages = [...action.payload];
		});

		builder.addCase(fetchChat.rejected, (state, action) => {
			state.loading = false;
			// state.error = action.error.message; TODO
		});

		builder.addCase(sendMessage.pending, (state) => {
			state.error = "";
			state.loading = true;
		});

		builder.addCase(sendMessage.fulfilled, (state, action) => {
			state.loading = false;
			state.messages = [...state.messages, action.payload];
		});

		builder.addCase(sendMessage.rejected, (state, action) => {
			state.loading = false;
			// state.error = action.error.message; TODO
		});
	},
});

export const { update } = chatSlice.actions;
export default chatSlice.reducer;
