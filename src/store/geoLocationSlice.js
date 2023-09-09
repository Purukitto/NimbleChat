/*
 * This file contains the redux slice for the geolocation of the user.
 *
 * The geolocation slice contains the following state:
 * 	- latitude: The latitude of the user
 * 	- longitude: The longitude of the user
 * 	- error: An error message if any
 *
 * The geolocation slice contains the following actions:
 * 	- setLocation: Sets the latitude and longitude of the user
 * 	- setError: Sets the error message
 */

import { createSlice } from "@reduxjs/toolkit";

const geoLocationSlice = createSlice({
	name: "geolocation",
	initialState: {
		latitude: null,
		longitude: null,
		error: null,
	},
	reducers: {
		setLocation: (state, action) => {
			state.latitude = action.payload.latitude;
			state.longitude = action.payload.longitude;
		},
		setError: (state, action) => {
			state.error = action.payload;
		},
	},
});

export const { setLocation, setError } = geoLocationSlice.actions;
export default geoLocationSlice.reducer;
