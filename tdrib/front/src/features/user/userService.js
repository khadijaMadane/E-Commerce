import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const register=async(userData)=>{
    const response= await axios.post(`${base_url}user/register`,userData);
    if(response.data){
        if (response.data){
            localStorage.setItem("customer", JSON.stringify(response.data));
        }
        return response.data;
    }
}

  
const login=async(userData)=>{
    const response= await axios.post(`${base_url}user/login`,userData);
    if (response.data) {
        localStorage.setItem("customer", JSON.stringify(response.data));
        localStorage.setItem("token", response.data.token); // Store token separately
      }  return response.data;

}


const getUserWishlist= async()=>{
    const response=await axios.get(`${base_url}user/wishlist`,config);
    if (response.data){
        return response.data;
    }
};
const addToCart = async (cartData) => {
    const response=await axios.post(`${base_url}user/cart`,cartData,config);
        return response.data;
    
}
const getCart = async (data) => {
    const response=await axios.get(`${base_url}user/cart`,data);
    
        return response.data;
    
}
const removeProductFromCart = async (data) => {
    const response = await axios.delete(`${base_url}user/delete-product-cart/${data.id}`, data.config2);
    if (response.data) {
        return response.data;
    }
};

const updateProductFromCart = async (cartDetail) => {
    const response = await axios.delete(`${base_url}user/update-product-cart/${cartDetail.cartItemId}/${cartDetail.quantity}`, config);
    if (response.data) {
        return response.data;
    }
};
const updateUser = async (data) => {
    try {
        const response = await axios.put(`${base_url}user/edit-user`, data, config); // Assurez-vous que `base_url` et `config` sont définis correctement
        return response.data;
    } catch (error) {
        throw error;
    }
};
const forgetPassToken = async (data) => {
    try {
        const response = await axios.post(`${base_url}user/forgot-password-token`, data); // Assurez-vous que `base_url` et `config` sont définis correctement
        return response.data;
    } catch (error) {
        throw error;
    }
};
const resetPass = async (data) => {
    try {
        const response = await axios.put(`${base_url}user/reset-password/${data.token}`, {password:data?.password}); // Assurez-vous que `base_url` et `config` sont définis correctement
        return response.data;
    } catch (error) {
        throw error;
    }
};


const createOrder = async (orderDetail) => {
    try {
        const response = await axios.post(`${base_url}user/cart/create-order`, orderDetail,config); // Assurez-vous que `base_url` et `config` sont définis correctement
        return response.data;
    } catch (error) {
        throw error;
    }
};
const deleteFromWishlist = async (id) => {
    try {
        const response = await axios.delete(`${base_url}user/wishlist/${id}`, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const authService={
    register,
    login,
    getUserWishlist,
    addToCart,
    getCart,
    removeProductFromCart,
    updateProductFromCart,
    updateUser,
    forgetPassToken,
    resetPass,
    deleteFromWishlist,
    createOrder,
    
}