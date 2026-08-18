import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        loading: true,
    },
    reducers: {
        login: (state) => {
            state.isLoggedIn = true;
            state.loading = false;
        },

        logout: (state) => {
            state.isLoggedIn = false;
            state.loading = false;
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;