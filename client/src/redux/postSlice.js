import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api'

const initialState = {
    posts: [],
}

export const getPosts = createAsyncThunk(
    'posts/getPosts',
    async (obj, { dispatch }) => {
        const { data } = await api.fetchPosts();
        dispatch(fetchAll(data))
    }
)

export const updatePost = createAsyncThunk(
    'posts/updatePosts',
    async (obj, { dispatch }) => {
        const { data } = await api.updatePost(obj.currentId, obj.postData);
        dispatch(update(data))

        //is it good?
        dispatch(getPosts())
    }
)

export const deletePosts = createAsyncThunk(
    'posts/deletePosts',
    async (id, { dispatch }) => {
        const { data } = await api.deletePost(id);
        dispatch(deletePost(data))

        //is it good?
        dispatch(getPosts())
    }
)

export const likePost = createAsyncThunk(
    'posts/likePost',
    async (id, { dispatch }) => {
        const { data } = await api.likePost(id);
        dispatch(like(data))

        //is it good?
        dispatch(getPosts())
    }
)

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        fetchAll: (state, { payload }) => {
            state.posts = payload;
        },

        create: (state, { payload }) => {
            api.createPost(payload);
            state.posts.push(payload);
        },

        update: (state, { payload }) => {
            state.posts.map(post => post._id === payload._id ? payload : post)
        },

        deletePost: (state, { payload }) => {
            state.posts.filter(post => post._id !== payload._id)
        },

        like: (state, { payload }) => {
            state.posts.map(post => post._id === payload._id ? payload : post)
        },
    }
})

export const { fetchAll, create, update, deletePost, like } = postSlice.actions
export default postSlice.reducer