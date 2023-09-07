import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../helper/supabase";

const initialState = {
	messages: [],
	loading: false,
	error: null,
};

export const fetchChat = createAsyncThunk("chat/fetchChat", async (chatID) => {
	const { data, error } = await supabase
		.from("chatstream")
		.select("*")
		.eq("chat_id", chatID)
		.order("id", { ascending: true });
	if (error) throw new Error(error);
	else return data;
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

		if (error) throw new Error(error);
		else return data[0];
	}
);

// Update message text in database
export const updateMessage = createAsyncThunk(
	"chat/updateMessage",
	async ({ id, message }) => {
		const { error } = await supabase
			.from("chatstream")
			.update({ text: message.trim() })
			.eq("id", +id);

		if (error) throw new Error(error.message);
	}
);

export const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		update: (state, action) => {
			const { payload, response } = action.payload;

			const existingMessageIndex = state.messages.findIndex(
				(m) => m.id === payload.id
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
			state.error = null;
		});

		builder.addCase(fetchChat.fulfilled, (state, action) => {
			state.loading = false;
			state.messages = [...action.payload];
		});

		builder.addCase(fetchChat.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});

		builder.addCase(sendMessage.pending, (state) => {
			state.error = null;
		});

		builder.addCase(sendMessage.fulfilled, (state, action) => {
			state.messages = [...state.messages, action.payload];
		});

		builder.addCase(sendMessage.rejected, (state, action) => {
			state.error = action.error.message;
		});

		builder.addCase(updateMessage.pending, (state) => {
			state.error = null;
		});

		builder.addCase(updateMessage.rejected, (state, action) => {
			state.error = action.error.message;
		});
	},
});

export const { update } = chatSlice.actions;
export default chatSlice.reducer;
