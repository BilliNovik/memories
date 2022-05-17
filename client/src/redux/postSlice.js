import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios'

const initialState = {
    posts: [],
}

export const getPosts = createAsyncThunk(
    'posts/getPosts',
    async (obj, { dispatch }) => {
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
        dispatch(fetchAll(res.data))
    }
)

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        fetchAll: (state, { payload }) => {
            state.posts = payload;
        }
    }
})

export const { fetchAll } = postSlice.actions
export default postSlice.reducer