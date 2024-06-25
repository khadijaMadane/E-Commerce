import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify";

// Fonction utilitaire pour récupérer l'utilisateur depuis localStorage
const getCustomerFromLocalStorage = () => {
  const customer = localStorage.getItem("customer");
  return customer ? JSON.parse(customer) : null;
};

// Définition de initialState
const initialState = {
  user: getCustomerFromLocalStorage(),
  cartProduct: [],
  wishlist: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Thunks pour les opérations asynchrones
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await authService.login(userData);
      if (response) {
        localStorage.setItem("token", response.token);
        return response;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

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
    return thunkAPI.rejectWithValue(error.response.data);
  }
});


export const createAnOrder = createAsyncThunk("user/cart/create-order", async (orderDetail, thunkAPI) => {
  try {
    return await authService.createOrder(orderDetail);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
export const getUserCart = createAsyncThunk("user/cart/get", async (data, thunkAPI) => {
  try {
    return await authService.getCart(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const deleteCartProduct = createAsyncThunk("user/cart/delete", async (data, thunkAPI) => {
  try {
    return await authService.removeProductFromCart(data);
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
      localStorage.removeItem("customer");
      localStorage.removeItem("token");
      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const removeFromWishlist = createAsyncThunk(
  "auth/removeFromWishlist",
  async (id, thunkAPI) => {
    try {
      const response = await authService.deleteFromWishlist(id);
      return response.data; // Réponse de votre API backend après suppression
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


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
        state.isSuccess = true;
        state.user = action.payload;
        localStorage.setItem("customer", JSON.stringify(action.payload));
        toast.success("User logged in successfully");
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
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
        state.cartProducts = [];
        state.wishlist = [];
        localStorage.removeItem("customer");
        localStorage.removeItem("token");
        toast.success("Logged out successfully!");
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
      }).addCase(removeFromWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Mettez à jour la wishlist en supprimant l'élément correspondant
        state.wishlist = state.wishlist.filter(item => item._id !== action.payload._id);
        toast.success("Product removed from wishlist successfully");
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      }).addCase(createAnOrder.pending, (state) => {
        state.isLoading = true;
      }).addCase(createAnOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orderdProduct = action.payload;
        if (state.isSuccess) {
          toast.success("Ordered  successfully!");
        }
      }).addCase(createAnOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
        if (state.isError === true) {
          toast.error("Something went wrong");
        }
      });
  },
});

export default authSlice.reducer;
