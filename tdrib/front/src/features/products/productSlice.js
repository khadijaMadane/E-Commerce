import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { productService } from "./productService";
import { act } from "react";

export const getAllProducts = createAsyncThunk(
    "product/get", 
async (thunkAPI) => {
    try {
        return await productService.getProducts();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const addToWishlist = createAsyncThunk(
    "product/wishlist", 
async (prodId, thunkAPI) => {
    try {
        return await productService.addToWishlist(prodId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const productState = {
    product: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const productSlice = createSlice({
    name: "product",
    initialState: productState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.product = action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action) => {  // Corrected line
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;  // Added .message to error
            }).addCase(addToWishlist.pending, (state) =>{
                state.isLoading= true;
            }).addCase(addToWishlist.fulfilled, (state, action)=>{
                state.isLoading=false;
                state.isError=false;
                state.isSuccess=true;
                state.addToWishlist=action.payload;
                state.message="product added too wishlist";
                toast.success(state.message);
            }).addCase(addToWishlist.rejected, (state, action)=>{
                state.isLoading=false;
                state.isError=true;
                state.isSuccess=false;
                state.message=action.error.message;
                toast.error(state.message);

            });
    },
});

export default productSlice.reducer;
