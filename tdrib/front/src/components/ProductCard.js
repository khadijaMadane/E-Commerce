import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faExchangeAlt, faEye, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../features/products/productSlice";
import { toast } from "react-toastify";

const ProductCard = (props) => {
  const { grid, data } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, isSuccess, isError } = useSelector((state) => state.product);

  const addToWishlistHandler = (id) => {
    dispatch(addToWishlist(id))
      .unwrap()
      .then(() => {
        toast.success("Product added to wishlist successfully");
      })
      .catch((error) => {
        toast.error("Failed to add product to wishlist");
      });
  };

  return (
    <>
      {Array.isArray(data) && data.map((item, index) => {
        return (
          <div key={index} className={`${location.pathname === "/product" ? `gr-${grid}` : "col-3"}`}>
            <div className="product-card">
              <div className="product-image">
                <img src={item?.images[0].url} className="img-fluid mx_auto" alt="product image" width={160} />
              </div>
              <div className="product-details">
                <h6 className="brand">{item?.brand}</h6>
                <h5 className="product-title">{item?.title}</h5>
                <ReactStars count={5} size={24} value={item?.totalrating.toString()} edit={false} activeColor="#ffd700" />
                <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}
                 dangerouslySetInnerHTML={{ __html: item?.description }}
                 ></p>
                <p className="price">{item?.price}</p>
              </div>
              <div className="action-bar position-absolute">
                <div className="d-flex flex-column gap-15">
                  <button
                    className="border-0 bg-transparent"
                    onClick={() => addToWishlistHandler(item?._id)}
                    disabled={isLoading}
                  >
                    <FontAwesomeIcon icon={faHeart} size={30} />
                  </button>
                  <button className="border-0 bg-transparent" onClick={() => navigate(`/product/${item?._id}`)}>
                    <FontAwesomeIcon icon={faEye} size={30} />
                  </button>
                  <button className="border-0 bg-transparent">
                    <FontAwesomeIcon icon={faShoppingCart} size={30} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductCard;
