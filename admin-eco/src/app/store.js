import { configureStore} from "@reduxjs/toolkit" ; 
import authReducer from "../feature/auth/authSlice";
import customerReducer from "../feature/customer/customerSlice";
import productReducer from "../feature/product/productSlice";
import brandReducer from "../feature/brand/brandSlice";
import pCategoryReducer from "../feature/pcategory/pcategorySlice";
import bCategoryReducer from "../feature/bcategory/bcategorySlice";
import colorReducer from "../feature/color/colorSlice";
import blogReducer from "../feature/blogs/blogSlice";
import enquiryReducer from "../feature/enquiry/enquirySlice";
import uploadReducer from "../feature/upload/uploadSlice";

export const store = configureStore({
    reducer:{ auth : authReducer ,
         customer: customerReducer,
         product: productReducer,
         brand: brandReducer,
         pCategory: pCategoryReducer,
         color: colorReducer,
         blogs: blogReducer,
         bCategory: bCategoryReducer,
         enquiry: enquiryReducer,
         upload: uploadReducer,
        },
    
})