import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../api'

const initialState = {
    i: []
}

export const asyncSignUp = createAsyncThunk(
    'auth/asyncSignUp',
    async ({ formData, navigate }, { dispatch }) => {
        // const { data } = await api.
        // navigate('/')
    }
)

export const asyncSignIn = createAsyncThunk(
    'auth/asyncSignIn',
    async ({ formData, navigate }, { dispatch }) => {
        // const { data } = await api.
        // navigate('/')
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signup: (state, { payload }) => {

        },

        signin: (state, { payload }) => {

        },
    }
})

export const { signup, signin } = authSlice.actions
export default authSlice.reducer