import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { productService } from "./productService";

export const getAllProducts = createAsyncThunk(
    "product/get", 
    async (data,thunkAPI) => {
        try {
            return await productService.getProducts(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getAProduct = createAsyncThunk(
    "product/getAProduct", 
    async (id, thunkAPI) => {
        try {
            return await productService.getSingleProduct(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const addToWishlist = createAsyncThunk(
    "product/wishlist", 
    async (prodId, thunkAPI) => {
        try {
            return await productService.addToWishlist(prodId);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const addRating = createAsyncThunk(
    'product/rating',
    async (data) => {
      try {
        const response = await productService.rateProduct(data); // Use the service function
        return response;
      } catch (error) {
        console.error('Error adding rating:', error);
        throw error;
      }
    }
  );
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
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error.message;  // Ensure error.message is used
            })
            .addCase(addToWishlist.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.addToWishlist = action.payload;
                state.message = "Product added to wishlist";
                toast.success(state.message);
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error.message;
                toast.error(state.message);
            })
            .addCase(getAProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.singleproduct = action.payload;
                state.message = "Product fetched successfully";
                toast.success(state.message);
            })
            .addCase(getAProduct.rejected, (state, action) => {
                state.isLoading = false;
                 state.isError = true;
                state.isSuccess = false;
                state.message = action.error.message;
                toast.error(state.message);
            }).addCase(addRating.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addRating.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.rating = action.payload;
                state.message = "Rating Added successfully";
                toast.success(state.message);
                
            })
            .addCase(addRating.rejected, (state, action) => {
                state.isLoading = false;
                 state.isError = true;
                state.isSuccess = false;
                state.message = action.error.message;
                toast.error(state.message);
            });
    },
});

export default productSlice.reducer;
