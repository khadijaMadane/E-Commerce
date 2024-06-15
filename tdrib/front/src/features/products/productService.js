import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getProducts=async()=>{
    try {
        const response = await axios.get(`${base_url}product`);
        if(response.data){
            return response.data;

        }
    } catch (error) {
        console.error("Error fetching products: ", error);
        throw error;
    }
};
const getSingleProduct=async(id)=>{
    try {
        const response = await axios.get(`${base_url}product/${id}`);
        if(response.data){
            return response.data;

        }
    } catch (error) {
        console.error("Error fetching products: ", error);
        throw error;
    }
};
const addToWishlist = async (prodId) => {
    try {
        const response = await axios.put(`${base_url}product/wishlist`, { prodId }, config);
        return response.data;
    } catch (error) {
        console.error("Error adding to wishlist: ", error);
        throw error;
    }
};
export const productService={
    getProducts,
    addToWishlist,getSingleProduct,
};