import axios from "axios";
import { base_url } from "../../utils/axiosConfig";

const getProducts=async(userData)=>{
    try {
        const response = await axios.get(`${base_url}product`);
        return response.data;
    } catch (error) {
        console.error("Error fetching products: ", error);
        throw error;
    }
}
export const productService={
    getProducts,
}