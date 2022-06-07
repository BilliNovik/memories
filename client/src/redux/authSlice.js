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

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (action, { dispatch }) => {
        localStorage.setItem('profile', JSON.stringify({ ...action }))
    }
)

export const asyncSignUp = createAsyncThunk(
    'auth/asyncSignUp',
    async (obj, { dispatch }) => {
        try {
            const { data } = await api.signUp(obj.formData);

            dispatch(loginUser(data));

            obj.navigate('/');
        } catch (error) {
            console.log(error);
        }

    }
)

export const asyncSignIn = createAsyncThunk(
    'auth/asyncSignIn',
    async (obj, { dispatch }) => {
        try {
            const { data } = await api.signIn(obj.formData);

            dispatch(loginUser(data));

            obj.navigate('/');
        } catch (error) {
            console.log(error);
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signUp: (state, { payload }) => {
            state.authData = payload
        },
    }
})

export const { signUp } = authSlice.actions
export default authSlice.reducer