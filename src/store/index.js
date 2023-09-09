/*
 * This file is used to combine all the reducers and create a store
 */

import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice";
import userReducer from "./userSlice";
import geoLocationReducer from "./geoLocationSlice";

export const store = configureStore({
	reducer: {
		chat: chatReducer,
		user: userReducer,
		geolocation: geoLocationReducer,
	},
});
