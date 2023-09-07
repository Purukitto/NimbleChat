import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../helper/supabase";

const initialState = { data: [], loading: false, error: "" };

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
			state.error = "";
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
			state.error = "";
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
