import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    postsData: [],
    error: null
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        fetchPostsStart: (state) => {
            state.status = 'loading';
        },
        fetchPostsSuccess: (state, action) => {
            state.status = 'succeeded';
            state.postsData = action.payload.postsData;
        },
        fetchPostsFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.payload.error;
        },

        addPostReducer: (state, action) => {
            // console.log("Post Reducer: ", action.payload);
            state.status = 'succeeded';
            state.postsData.push(action.payload);
        },
        updatePostReducer: (state, action) => {
            // console.log("Post Updated Reducer: ", action.payload);
            const { title, $id, content, featuredimage, status, userid } = action.payload;
            state.status = 'succeeded';
            state.postsData = state.postsData.map(post => post.$id == $id ? { ...post, title, $id, content, featuredimage, status, userid } : post);
        },
        deletePostReducer: (state, action) => {
            // console.log("Delete Post Reducer: ", action.payload);
            state.status = 'succeeded';
            state.postsData = state.postsData.filter(post => post.$id !== action.payload)
        },
    }
});

export const { fetchPostsStart, fetchPostsSuccess, fetchPostsFailure, addPostReducer, deletePostReducer, updatePostReducer } = postsSlice.actions;

export default postsSlice.reducer;