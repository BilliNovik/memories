import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../api'

const initialState = {
    authData: null,
}

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (action, { dispatch }) => {
        localStorage.clear()
    }
)

export const asyncSignIn = createAsyncThunk(
    'auth/asyncSignIn',
    async (action, { dispatch }) => {
        localStorage.setItem('profile', JSON.stringify({ ...action }))
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    }
})

export const { } = authSlice.actions
export default authSlice.reducer