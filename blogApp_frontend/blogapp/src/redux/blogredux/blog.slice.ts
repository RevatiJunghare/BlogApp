import { createSlice } from "@reduxjs/toolkit";
import BlogActions from "./blog.actions";


const initialState = {
    data:{
        blogData:null,
        deleted:null,
        createBlog:null
    },
    error:false,
    loading:false
}


const BlogSlice = createSlice({
    name:"BlogSlice",
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
        .addCase(BlogActions.GETALLBLOGS.pending,(state)=>{
            state.error = false,
            state.loading = true
        })
        .addCase(BlogActions.GETALLBLOGS.fulfilled,(state,action)=>{
            state.data.blogData = action.payload,
            state.error = false,
            state.loading = false
        })
        .addCase(BlogActions.GETALLBLOGS.rejected,(state)=>{
            state.error = true,
            state.loading = false
        })
        .addCase(BlogActions.deleteBlog.pending,(state)=>{
            state.error = false,
            state.loading = true
        })
        .addCase(BlogActions.deleteBlog.fulfilled,(state,action)=>{
            state.data.deleted = action.payload,
            state.error = false,
            state.loading = false
        })
        .addCase(BlogActions.deleteBlog.rejected,(state)=>{
            state.error = true,
            state.loading = false
        })

        .addCase(BlogActions.createBlog.pending,(state)=>{
            state.error = false,
            state.loading = true
        })
        .addCase(BlogActions.createBlog.fulfilled,(state,action)=>{
            state.data.createBlog = action.payload,
            state.error = false,
            state.loading = false
        })
        .addCase(BlogActions.createBlog.rejected,(state)=>{
            state.error = true,
            state.loading = false
        })
    },
})

export default BlogSlice.reducer