import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../reducers/chatSlice";

export const store = configureStore({
	reducer: {
		chat: chatReducer,
	},
});
