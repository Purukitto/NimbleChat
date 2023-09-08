/*
 * This file contains the redux slice for user
 *
 * The user slice contains the following state:
 * 	- data: An array of user data
 * 	- loading: A boolean indicating whether the user is loading
 * 	- error: An error message if any
 *
 * The user slice contains the following actions:
 * 	- none
 *
 * The user slice contains the following thunks (async actions):
 * 	- fetchUser: Fetches user data from supabase
 * 	- logoutUser: Logs out the user
 */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../helper/supabase";

const initialState = { data: [], loading: false, error: null };

// To fetch user data from supabase
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (user) {
		return user;
	} else {
		throw new Error("User not found");
	}
});

// To logout user
export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
	const { error } = await supabase.auth.signOut();
	if (error) {
		throw new Error(error);
	}
});

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchUser.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(fetchUser.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload;
		});
		builder.addCase(fetchUser.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});

		builder.addCase(logoutUser.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(logoutUser.fulfilled, (state, action) => {
			state.loading = false;
			state.data = [];
		});
		builder.addCase(logoutUser.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});
	},
});

export default userSlice.reducer;
