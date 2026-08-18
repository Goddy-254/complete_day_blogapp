import { createSlice } from "@reduxjs/toolkit";
import config from "../config/config.js";


const mode = import.meta.env.MODE; // "development" or "production"

const prodSlice = createSlice({
    name: "prod",
    initialState: {
        link: config[mode].apiUrl
    }
});

export default prodSlice.reducer;