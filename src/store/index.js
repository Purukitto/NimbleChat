import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice";
import userReducer from "./userSlice";

export const store = configureStore({
	reducer: {
		chat: chatReducer,
		user: userReducer,
	},
});
