import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify";

export const registerUser = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
  try {
    return await authService.register(userData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const loginUser = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
  try {
    return await authService.login(userData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getUserProductWishlist = createAsyncThunk("user/wishlist", async (_, thunkAPI) => {
  try {
    return await authService.getUserWishlist();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addProdToCart = createAsyncThunk("user/cart/add", async (cartData, thunkAPI) => {
  try {
    return await authService.addToCart(cartData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getUserCart = createAsyncThunk("user/cart/get", async (_, thunkAPI) => {
  try {
    return await authService.getCart();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteCartProduct = createAsyncThunk("user/cart/delete", async (cartItemId, thunkAPI) => {
  try {
    return await authService.removeProductFromCart(cartItemId);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateCartProduct = createAsyncThunk("user/cart/update", async (cartDetail, thunkAPI) => {
  try {
    return await authService.updateProductFromCart(cartDetail);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateProfile = createAsyncThunk("user/profile/update", async (data, thunkAPI) => {
  try {
    return await authService.updateUser(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const forgetPasswordToken = createAsyncThunk("user/password/token", async (data, thunkAPI) => {
  try {
    return await authService.forgetPassToken(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
export const resetPassword = createAsyncThunk("user/password/reset", async (data, thunkAPI) => {
  try {
    return await authService.resetPass(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});


export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      // Appel à votre service d'authentification ou nettoyage nécessaire
      // Par exemple, vider le localStorage
      localStorage.removeItem("customer");
      localStorage.removeItem("token");
      
      // Retourner null ou une valeur appropriée selon votre besoin
      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const getCustomerFromLocalStorage = () => {
  const customer = localStorage.getItem("customer");
  return customer ? JSON.parse(customer) : null;
};

const initialState = {
  user: getCustomerFromLocalStorage(),
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdUser = action.payload;
        if (state.isSuccess === true) {
          toast.info("User created successfully");
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
        if (state.isSuccess) {
          localStorage.setItem("token", action.payload.token);
          toast.info("User logged in successfully");
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(getUserProductWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProductWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
      })
      .addCase(getUserProductWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
      })
      .addCase(addProdToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProdToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cartProduct = action.payload;
        if (state.isSuccess) {
          toast.success("Product added to cart");
        }
      })
      .addCase(addProdToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
      })
      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cartProducts = action.payload;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
      })
      .addCase(deleteCartProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCartProduct = action.payload;
        if (state.isSuccess) {
          toast.success("Product deleted from cart successfully!");
        }
      })
      .addCase(deleteCartProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
        if (state.isError === true) {
          toast.error("Something went wrong");
        }
      })
      .addCase(updateCartProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCartProduct = action.payload;
        if (state.isSuccess) {
          toast.success("Product updated in cart successfully!");
        }
      })
      .addCase(updateCartProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
        if (state.isError === true) {
          toast.error("Something went wrong");
        }
      }).addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = { ...state.user, ...action.payload };
        toast.success("Profile updated successfully!");
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message || "Something went wrong";
        toast.error(state.message);
      }).addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; // Réinitialisez l'état de l'utilisateur ici
        // Réinitialisez d'autres états si nécessaire
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
        toast.error(action.error.message); // Affichez une erreur si nécessaire
      }).addCase(forgetPasswordToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgetPasswordToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.token = action.payload;
        if (state.isSuccess) {
          toast.success("Forgot Email Sent successfully!");
        }
      })
      .addCase(forgetPasswordToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
        if (state.isError === true) {
          toast.error("Something went wrong");
        }
      }).addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      }).addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.pass = action.payload;
        if (state.isSuccess) {
          toast.success("Password Updated successfully!");
        }
      }).addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
        if (state.isError === true) {
          toast.error("Something went wrong");
        }
      });;
  },
});

export default authSlice.reducer;
