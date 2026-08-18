import { configureStore } from "@reduxjs/toolkit";
import prodReducer from "./prodRoute.js"
import authSlice from "./auth.js";

const store = configureStore({
    reducer: {
        prod: prodReducer,
        auth: authSlice,
    }
});

export default store;