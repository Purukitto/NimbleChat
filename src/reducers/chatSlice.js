import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		add: (state, action) => {
			state.push(action.payload);
		},
	},
});

export const { add } = chatSlice.actions;

export default chatSlice.reducer;
