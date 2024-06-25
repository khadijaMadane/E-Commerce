import React, { useEffect, useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProductWishlist, removeFromWishlist } from '../features/user/userSlice';
import { faTimes, faEye, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import ReactStars from 'react-rating-stars-component';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const dispatch = useDispatch();
  const [wishlistState, setWishlistState] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWishlist();
  }, [dispatch]); // Fetch wishlist when component mounts or dispatch changes

  const fetchWishlist = () => {
    dispatch(getUserProductWishlist())
      .then((data) => {
        setWishlistState(data.payload || []);
      })
      .catch((error) => {
        console.error('Error fetching wishlist:', error);
      });
  };

  const handleRemoveFromWishlist = async (id) => {
    try {
      await dispatch(removeFromWishlist(id));
      const updatedWishlist = wishlistState.filter(item => item._id !== id);
      setWishlistState(updatedWishlist);
      toast.success("Product removed from wishlist successfully");
    } catch (error) {
      console.error('Failed to remove product from wishlist:', error);
    } finally {
      setTimeout(fetchWishlist, 300); // Rafraîchir la wishlist après une courte attente
    }
  };
  
  const navigateToProduct = (id) => {
    // Navigate to product details page
    console.log("Navigate to product details page for id:", id);
    // Example navigation using react-router-dom
    // navigate(`/product/${id}`);
  };

  return (
    <>
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
          {wishlistState.length === 0 && <div className='text-center fs-3'>No data</div>}
          {wishlistState.map((item, index) => (
            <div className="col-3" key={index}>
              <div className="product-card">
                <div className="product-image">
                  <img
                    src={item.images[0]?.url || 'https://sh0pcart.netlify.app/images/watch.jpg'}
                    className="img-fluid w-100 d-block mx-auto"
                    alt="watch"
                    width={160}
                  />
                </div>
                <div className="product-details">
                  <h6 className="brand">{item.brand}</h6>
                  <h5 className="product-title">{item.title}</h5>
                  <ReactStars count={5} size={24} value={parseInt(item.totalrating)} edit={false} activeColor="#ffd700" />
                  <p className="price">{item.price}</p>
                </div>
                <div className="action-bar position-absolute">
                  <div className="d-flex flex-column gap-15">
                    <button className="border-0 bg-transparent" onClick={() => navigate(`/product/${item?._id}`)}>
                      <FontAwesomeIcon icon={faEye} size={30} />
                    </button> 
                    <button className="border-0 bg-transparent" onClick={() => handleRemoveFromWishlist(item._id)}>
                      <FontAwesomeIcon icon={faTimes} size={30} />
                    </button>
                    <button className="border-0 bg-transparent">
                      <FontAwesomeIcon icon={faShoppingCart} size={30} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
