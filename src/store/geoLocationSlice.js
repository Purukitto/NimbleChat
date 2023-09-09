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
