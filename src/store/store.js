import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authslice";
import postsSlice from "./postslice"
import singlePostSlice from "./singlePostSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        posts: postsSlice,
        post: singlePostSlice,
    }
})

export default store