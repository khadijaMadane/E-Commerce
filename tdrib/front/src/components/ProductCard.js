import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";

const ProductCard = (props) => {
  const { grid } = props;
  let location = useLocation();

  return (
    <>
    <div className={` ${location.pathname === "/product" ? `gr-${grid}` : "col-3"}`}>
      <Link to={`${
        location.pathname=='/' ? '/product/:id'
        :location.pathname=='/product/:id' ? '/product/:id' : ":id"}`} className="product-card position-relative">
        <div className="wishlist-icon position-absolute">
          <button className="border-0 bg-transparent">
            <img src="images/images/wish.svg" alt="wishlist" />
          </button>
        </div>
        <div className="product-image">
          <img src="images/images/watch.jpg" className="img-fluid" alt="product image" />
          <img src="images/images/tv.jpg" className="img-fluid" alt="product image" />
        </div>
        <div className="product-details">
          <h6 className="brand">Havels</h6>
          <h5 className="product-title">
            Kids headphones bulk 10 pack multi colored for students
          </h5>
          <ReactStars count={5} size={24} value={3} edit={false} activeColor="#ffd700" />
          <p className={`description ${grid===12 ? "d-block" :"d-none"}`}>
            at this hjg hcfh hhfhcgs hgfhdghfgkeskfshhf fffggf tgfdrfdthk uilkjgg gdhhddyyhffgffggf
            gvccvvcyfgyrg
            hgdhghgdgh
          </p>
          <p className="price">$100.00</p>
        </div>
        <div className="action-bar position-absolute">
          <div className="d-flex flex-column gap-15">
            <button className="border-0 bg-transparent">
              <img src="images/images/prodcompare.svg" alt="compare" />
            </button>
            <button className="border-0 bg-transparent">
              <img src="images/images/view.svg" alt="view" />
            </button>
            <button className="border-0 bg-transparent">
              <img src="images/images/add-cart.svg" alt="addcart" />
            </button>
          </div>
        </div>
      </Link>
    </div>
    <div className={` ${location.pathname === "/product" ? `gr-${grid}` : "col-3"}`}>
      <Link to={`${
        location.pathname=='/' ? '/product/:id'
        :location.pathname=='/product/:id' ? '/product/:id' : ":id"}`} 
       className="product-card position-relative">
        <div className="wishlist-icon position-absolute">
          <button className="border-0 bg-transparent">
            <img src="images/images/wish.svg" alt="wishlist" />
          </button>
        </div>
        <div className="product-image">
          <img src="images/images/watch.jpg" alt="product image" />
          <img src="images/images/tv.jpg" alt="product image" />
        </div>
        <div className="product-details">
          <h6 className="brand">Havels</h6>
          <h5 className="product-title">
            Kids headphones bulk 10 pack multi colored for students
          </h5>
          <ReactStars count={5} size={24} value={3} edit={false} activeColor="#ffd700" />
          <p className={`description ${grid===12 ? "d-block" :"d-none"}`}>
            at this hjg hcfh hhfhcgs hgfhdghfgkeskfshhf fffggf tgfdrfdthk uilkjgg gdhhddyyhffgffggf
            gvccvvcyfgyrg
            hgdhghgdgh
          </p>
          <p className="price">$100.00</p>
        </div>
        <div className="action-bar position-absolute">
          <div className="d-flex flex-column gap-15">
            <button className="border-0 bg-transparent">
              <img src="images/images/prodcompare.svg" alt="compare" />
            </button>
            <button className="border-0 bg-transparent">
              <img src="images/images/view.svg" alt="view" />
            </button>
            <button className="border-0 bg-transparent">
              <img src="images/images/add-cart.svg" alt="addcart" />
            </button>
          </div>
        </div>
      </Link>
    </div>
    <div className={` ${location.pathname === "/product" ? `gr-${grid}` : "col-3"}`}>
      <Link
       to={`${
        location.pathname=='/' ? '/product/:id'
        :location.pathname=='/product/:id' ? '/product/:id' : ":id"}`}
      className="product-card position-relative">
        <div className="wishlist-icon position-absolute">
          <button className="border-0 bg-transparent">
            <img src="images/images/wish.svg" alt="wishlist" />
          </button>
        </div>
        <div className="product-image">
          <img src="images/images/watch.jpg" alt="product image" />
          <img src="images/images/tv.jpg" alt="product image" />
        </div>
        <div className="product-details">
          <h6 className="brand">Havels</h6>
          <h5 className="product-title">
            Kids headphones bulk 10 pack multi colored for students
          </h5>
          <ReactStars count={5} size={24} value={3} edit={false} activeColor="#ffd700" />
          <p className={`description ${grid===12 ? "d-block" :"d-none"}`}>
            at this hjg hcfh hhfhcgs hgfhdghfgkeskfshhf fffggf tgfdrfdthk uilkjgg gdhhddyyhffgffggf
            gvccvvcyfgyrg
            hgdhghgdgh
          </p>
          <p className="price">$100.00</p>
        </div>
        <div className="action-bar position-absolute">
          <div className="d-flex flex-column gap-15">
            <button className="border-0 bg-transparent">
              <img src="images/images/prodcompare.svg" alt="compare" />
            </button>
            <button className="border-0 bg-transparent">
              <img src="images/images/view.svg" alt="view" />
            </button>
            <button className="border-0 bg-transparent">
              <img src="images/images/add-cart.svg" alt="addcart" />
            </button>
          </div>
        </div>
      </Link>
    </div>
   

    </>
  );
};

export default ProductCard;
