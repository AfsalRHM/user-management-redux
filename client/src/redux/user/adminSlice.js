import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentAdmin: null,
    error: false
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        signInSuccess: (state, action) => {
            state.currentAdmin = action.payload;
            state.error = false;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
        },
        signOut: (state) => {
            state.currentAdmin = null;
        }
    }
})

export const {signInSuccess, signOut, signInFailure} = adminSlice.actions;

export default adminSlice.reducer;