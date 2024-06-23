// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import './App.css';
import OurStore from "./pages/OurStore";
import Blog from "./pages/Blog";
import CompareProduct from "./pages/CompareProduct";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Signup from "./pages/Signup";
import Resetpassword from "./pages/Resetpassword";
import SingleBlog from "./pages/SingleBlog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPloicy from "./pages/RefundPloicy";
import ShippingPo from "./pages/ShippingPo";
import TermAndConditions from "./pages/TermAndConditions";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { PrivateRoutes } from "./routing/PrivateRoutes";
import { OpenRoutes } from "./routing/OpenRoutes";
import Profile from "./pages/Profile"; // Correct import statement

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product" element={<OurStore />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<PrivateRoutes><Cart /></PrivateRoutes>} />
          <Route path="/checkout" element={<PrivateRoutes><Checkout /></PrivateRoutes>} />
          <Route path="/my-profile" element={<PrivateRoutes><Profile /></PrivateRoutes>} />

          <Route path="/blogs" element={<Blog />} />
          <Route path="blog/:id" element={<SingleBlog />} />

          <Route path="/compare-product" element={<CompareProduct />} />
          <Route path="/wishlist" element={<PrivateRoutes><Wishlist /></PrivateRoutes>} />
          <Route path="/login" element={<OpenRoutes><Login /></OpenRoutes>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/signup" element={<OpenRoutes><Signup /></OpenRoutes>} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPloicy />} />
          <Route path="/single-blog" element={<SingleBlog />} />
          <Route path="/reset-password/:token" element={<Resetpassword />} />
          <Route path="/shippingpo" element={<ShippingPo />} />
          <Route path="/termandcondition" element={<TermAndConditions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
