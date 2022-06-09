import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api'

const initialState = {
    posts: [],
    isLoading: false
}

export const getPosts = createAsyncThunk(
    'posts/getPosts',
    async (page, { dispatch }) => {
        dispatch(loadingStart())
        const { data } = await api.fetchPosts(page);
        dispatch(fetchAll(data))
        dispatch(loadingEnd())
    }
)

export const getPostById = createAsyncThunk(
    'posts/getPosts',
    async (id, { dispatch }) => {
        dispatch(loadingStart())
        const { data } = await api.fetchPostsById(id);
        dispatch(fetchPost(data))
        dispatch(loadingEnd())
    }
)

export const getPostsBySearch = createAsyncThunk(
    'posts/getPostsBySearch',
    async (obj, { dispatch }) => {
        dispatch(loadingStart())
        const { data: { data } } = await api.fetchPostsBySearch(obj);
        dispatch(fetchBySearch(data))
        dispatch(loadingEnd())
    }
)

export const createPost = createAsyncThunk(
    'posts/createPost',
    async (obj, { dispatch }) => {
        dispatch(loadingStart())
        const { data } = await api.createPost(obj);
        dispatch(create(data))
        dispatch(loadingEnd())
    }
)

export const updatePost = createAsyncThunk(
    'posts/updatePosts',
    async (obj, { dispatch }) => {
        const { data } = await api.updatePost(obj.currentId, obj.postData);
        dispatch(update(data))
    }
)

export const deletePosts = createAsyncThunk(
    'posts/deletePosts',
    async (id, { dispatch }) => {
        await api.deletePost(id);
        dispatch(deletePost(id))
    }
)

export const likePost = createAsyncThunk(
    'posts/likePost',
    async (id, { dispatch }) => {
        const { data } = await api.likePost(id);
        dispatch(like(data))
    }
)

export const commentPost = createAsyncThunk(
    'posts/commentPost',
    async ({ id, value }, { dispatch }) => {
        const { data } = await api.comment(id, value)
        dispatch(comment(data))
        return data
    }
)

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        fetchAll: (state, { payload }) => {
            state.posts = payload.data
            state.currentPage = payload.currentPage
            state.numberOfPages = payload.numberOfPages
        },

        fetchPost: (state, { payload }) => {
            state.post = payload
        },

        create: (state, { payload }) => {
            state.posts.push(payload);
        },

        update: (state, { payload }) => {
            state.posts.find(post => {
                if (post._id === payload._id) {
                    post.creator = payload.creator
                    post.title = payload.title
                    post.message = payload.message
                    post.tags = payload.tags
                    post.selectedFile = payload.selectedFile
                }
            })
        },

        deletePost: (state, { payload }) => {
            state.posts = state.posts.filter(post => post._id !== payload)
        },

        like: (state, { payload }) => {
            state.posts.find(post => {
                if (post._id === payload._id) {
                    post.likes = payload.likes
                }
            })
        },

        fetchBySearch: (state, { payload }) => {
            state.posts = payload
        },

        loadingStart: (state, { payload }) => {
            state.isLoading = true
        },

        loadingEnd: (state, { payload }) => {
            state.isLoading = false
        },

        comment: (state, { payload }) => {
            state.posts.find(post => {
                if (post._id === payload._id) {
                    post.comments = payload.comments
                }
            })
        },

    }
})

export const { fetchAll, create, update, comment, deletePost, like, fetchBySearch, loadingStart, loadingEnd, fetchPost } = postSlice.actions
export default postSlice.reducer