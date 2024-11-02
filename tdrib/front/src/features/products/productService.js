import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getProducts=async(data)=>{
    try {
        const response = await axios.get(`${base_url}product?${data?.brand?`brand=${data?.brand}&&`:""}${data?.tags?`tags=${data?.tags}&&`:""}${data?.category?`category=${data?.category}&&`:""}${data?.minPrice?`price[gte]=${data?.minPrice}&&`:""}${data?.maxPrice?`price[lte]=${data?.maxPrice}&&`:""}`);
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
const rateProduct = async (data) => {
    try {
      const { star, comment, prodId ,firstname} = data; // Extract serializable parts
      const response = await axios.put(`${base_url}product/rating`, { star, comment, prodId ,firstname}, config);
      return response.data;
    } catch (error) {
      console.error("Error rating product: ", error);
      throw error;
    }
  };
export const productService={
    getProducts,
    addToWishlist,
    getSingleProduct,
    rateProduct,
};