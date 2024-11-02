import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { act } from "react";
import { blogService } from "./blogService"; // Adjust the import path as necessary

export const getAllBlogs = createAsyncThunk(
    "blogs/get", 
async (thunkAPI) => {
    try {
        return await blogService.getBlogs();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const getABlog = createAsyncThunk(
    "blog/get", 
async (id ,thunkAPI) => {
    try {
        return await blogService.getBlog(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const blogState = {
    blog: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const blogSlice = createSlice({
    name: "blog",
    initialState: blogState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllBlogs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllBlogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blog = action.payload;
            })
            .addCase(getAllBlogs.rejected, (state, action) => {  // Corrected line
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error.message;  // Added .message to error
            }) .addCase(getABlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getABlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.singleBlog = action.payload;
            })
            .addCase(getABlog.rejected, (state, action) => {  // Corrected line
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error.message;  // Added .message to error
            });
    },
});

export default blogSlice.reducer;
