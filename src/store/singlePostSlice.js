import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    postsData: null
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPostReducer: (state, action) => {
            state.postsData = action.payload;
        }
    }
});

export const { setPostReducer } = postSlice.actions;

export default postSlice.reducer;