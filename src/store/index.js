import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice";
import userReducer from "./userSlice";
import { weatherApi } from "./weatherSlice";

export const store = configureStore({
	reducer: {
		chat: chatReducer,
		user: userReducer,
		[weatherApi.reducerPath]: weatherApi.reducer,
	},
});
