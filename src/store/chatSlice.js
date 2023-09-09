/*
 * This file contains the chat slice of the Redux store.
 *
 * The chat slice contains the following state:
 * 	- messages: An array of messages in the chat
 * 	- prompt: The prompt to be sent to the bot
 * 	- loading: A boolean indicating whether the chat is loading
 * 	- thinking: A boolean indicating whether the NBox AI is thinking
 * 	- error: An error message if any
 *
 * The chat slice contains the following actions:
 * 	- update: Updates the message text in local state
 * 	- startThinking: Sets the thinking state to true
 * 	- stopThinking: Sets the thinking state to false
 * 	- setPrompt: Sets the prompt to be sent to the NBox AI
 *
 * The chat slice contains the following thunks (async actions):
 * 	- fetchChat: Fetches chat messages from the database
 * 	- sendMessage: Sends a message to the database
 * 	- updateMessage: Updates the message text in the database
 */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../helper/supabase";

const initialState = {
	messages: [],
	prompt: "",
	loading: false,
	thinking: false,
	error: null,
};

// Fetch chat messages from database
export const fetchChat = createAsyncThunk("chat/fetchChat", async (chatID) => {
	const { data, error } = await supabase
		.from("chatstream")
		.select("*")
		.eq("chat_id", chatID)
		.order("id", { ascending: false })
		.limit(50); //Limit to avoid fetching too many messages

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
		startThinking: (state) => {
			state.thinking = true;
		},
		stopThinking: (state) => {
			state.thinking = false;
		},
		setPrompt: (state, action) => {
			state.prompt = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchChat.pending, (state) => {
			state.loading = true;
			state.error = null;
		});

		builder.addCase(fetchChat.fulfilled, (state, action) => {
			state.loading = false;
			state.messages = [...action.payload.reverse()];
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

export const { update, startThinking, stopThinking, setPrompt } =
	chatSlice.actions;
export default chatSlice.reducer;
