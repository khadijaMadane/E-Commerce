import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Home from "../pages/Home";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Layout = () => {
return (
    <>
    
<Header />
<Outlet />
<Footer/>
<ToastContainer 
    position="top-right"
    autoclose={3000}
    hideProgressBar={false}
    neweston Top ={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
/>
</>
);
};
export default Layout;