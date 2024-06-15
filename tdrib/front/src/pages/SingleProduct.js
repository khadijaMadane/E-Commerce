import React, { useEffect, useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import ProductCard from '../components/ProductCard';
import ReactStars from "react-rating-stars-component";
import ReactImageZoom from "react-image-zoom";
import Color from '../components/Color';
import { TbGitCompare } from "react-icons/tb";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getAProduct } from '../features/products/productSlice';
import { toast } from "react-toastify";
import { addProdToCart, getUserCart } from '../features/user/userSlice';

const SingleProduct = () => {
    const [color, setColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [alreadyAdded, setAlreadyAdded] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const getProductId = location.pathname.split("/")[2];
    const dispatch = useDispatch();

    const productState = useSelector(state => state.product.singleproduct);
    const cartState = useSelector(state => state.auth.cartProducts);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        dispatch(getAProduct(getProductId));
        dispatch(getUserCart());
    }, [dispatch, getProductId]);

    useEffect(() => {
        if (cartState) {
            for (let index = 0; index < cartState.length; index++) {
                if (getProductId === cartState[index]?.productId?._id) {
                    setAlreadyAdded(true);
                    break;
                }
            }
        }
    }, [cartState, getProductId]);

    const uploadCart = () => {
        if (color === null) {
            toast.error("Please Choose Color");
            return false;
        } else {
            dispatch(addProdToCart({ productId: productState?._id, quantity, color, price: productState?.price }));
            navigate('/cart');
        }
    };

    const props = {
        width: 400,
        height: 200,
        zoomWidth: 600,
        img: productState?.images[0]?.url || "https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d3Jpc3R3YXRjaHxlbnwwfHwwfHx8MA%3D%3D"
    };

    const [orderedProduct, setOrderedProduct] = useState(true);

    const copyToClipboard = (text) => {
        const textField = document.createElement("textarea");
        textField.innerText = text;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand("copy");
        textField.remove();
    };

    // Render null or a loading indicator while productState is being fetched
    if (!productState) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <BreadCrumb title={productState?.title || "Product Name"} />
            <Container class1="main-product-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-6">
                        <div className="main-product-image">
                            <ReactImageZoom {...props} />
                        </div>
                        <div className='other-product-images d-flex flex-wrap gap-10'>
                            {productState?.images?.map((image, index) => (
                                <div key={index}>
                                    <img src={image.url} alt={`Product ${index}`} className='img-fluid' />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="main-product-details">
                            <div className="border-bottom">
                                <h3 className="title">{productState?.title}</h3>
                            </div>
                            <div className="border-bottom py-3">
                                <p className="price">{productState?.price}</p>
                                <div className="d-flex align-items-center gap-10">
                                    <ReactStars
                                        count={5}
                                        size={24}
                                        value={productState?.totalrating}
                                        edit={false}
                                        activeColor="#ffd700"
                                    />
                                    <p className="mb-0 t-review">(2 Reviews)</p>
                                </div>
                                <a className='review-btn' href='#review'>Write a Review</a>
                            </div>
                            <div className='border-bottom py-3'>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Type:</h3>
                                    <p className='product-data'>{productState?.type}</p>
                                </div>
                                <div className='d-flex gap-5 align-items-center my-2'>
                                    <h3 className='product-heading'>Brand:</h3>
                                    <p className='product-data'>{productState?.brand}</p>
                                </div>
                                <div className='d-flex gap-5 align-items-center my-2'>
                                    <h3 className='product-heading'>Category:</h3>
                                    <p className='product-data'>{productState?.category}</p>
                                </div>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Tags:</h3>
                                    <p className='product-data'>{productState?.tags}</p>
                                </div>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Availability:</h3>
                                    <p className='product-data'>In stock</p>
                                </div>
                                {alreadyAdded === false && (
                                    <>
                                        <div className='d-flex gap-10 flex-column mt-2 mb-3'>
                                            <h3 className='product-heading'>Color:</h3>
                                            <Color setColor={setColor} colorData={productState?.color} />
                                        </div>
                                    </>
                                )}
                                <div className='d-flex gap-15 align-items-center flex-row mt-2 mb-3'>
                                    {alreadyAdded === false && (
                                        <>
                                            <h3 className='product-heading'>Quantity:</h3>
                                            <div>
                                                <input type='number' className='form-control'
                                                    min={1}
                                                    max={20}
                                                    style={{ width: "70px" }}
                                                    id=""
                                                    onChange={(e) => setQuantity(e.target.value)}
                                                    value={quantity}
                                                />
                                            </div>
                                        </>
                                    )}
                                    <div className='d-flex gap-30 align-items-center ms-5'>
                                        <button
                                            className='button border-0'
                                            /* data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop"*/
                                            type="button"
                                            onClick={() => { alreadyAdded ? navigate('/cart') : uploadCart() }}
                                        >
                                            {alreadyAdded ? "Go To Cart" : "Add To Cart"}
                                        </button>
                                        <button className='button signup'>Buy it now</button>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center gap-15'>
                                    <div><a href='#'> <TbGitCompare />Add to Compare</a></div>
                                    <div><a href='#'><AiOutlineHeart className='fs-5 me-2' /> Add to wishlist</a></div>
                                </div>
                                <div className='d-flex gap-10 flex-column mt-2 mb-3'>
                                    <div className='d-flex gap-10 align-items-center my-2'>
                                        <h3 className='product-heading'>Shipping & Return:</h3>
                                        <p className='product-data'>Free shipping and returns available on all orders! We ship all US domestic orders within <b>5-10 business days!</b></p>
                                    </div>
                                    <div className='d-flex gap-10 align-items-center my-2'>
                                        <h3 className='product-heading'>Copy Product Link:</h3>
                                        <p className='product-data'>Running shoes cushions stride with soft foam. <b>5-10 business days!</b></p>
                                        <a href='javascript:void(0);' onClick={() => copyToClipboard(window.location.href)}>Copy product link</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <div className="description-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <h4>Description</h4>
                            <div className="bg-white p-3">
                                <p dangerouslySetInnerHTML={{ __html: productState?.description }}></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section id="review" className="reviews-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <div className="review-head d-flex justify-content-between align-items-end">
                                <div>
                                    <h3 className="mb-2">Customer Reviews</h3>
                                    <div className="d-flex align-items-center gap-10">
                                        <ReactStars count={5} size={24} value={4} edit={false} activeColor="#ffd700" />
                                        <p className="mb-0">Based on 2 Reviews</p>
                                    </div>
                                </div>
                                {orderedProduct && (
                                    <div>
                                        <a className='text-dark text-decoration-underline' href='#'>Write a review</a>
                                    </div>
                                )}
                            </div>
                            <div className='review-form py-4'>
                                <h4 className="">Write a Review</h4>
                                <form action="" className="d-flex flex-column gap-15">
                                    <div>
                                        <ReactStars count={5} size={24} value={4} edit={true} activeColor="#ffd700" />
                                    </div>
                                    <div>
                                        <textarea className="w-100 form-control" cols="30" rows="4" placeholder="comments"></textarea>
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <button className="button border-0">Submit Review</button>
                                    </div>
                                </form>
                            </div>
                            <div className='reviews mt-4'>
                                <div className='review'>
                                    <div className='d-flex gap-10 align-items-center'>
                                        <h6 className='mb-0'>Navdeep</h6>
                                        <ReactStars count={5} size={24} value={4} edit={false} activeColor="#ffd700" />
                                    </div>
                                    <p className='mt-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="popular-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="section-heading">Our Popular Products</h3>
                        </div>
                    </div>
                    <div className="row">
                        <ProductCard />
                        <ProductCard />
                    </div>
                </div>
            </section>

            {/* Bootstrap Modal */}
            {modalVisible && (
                <div className="modal fade show" id="staticBackdrop" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModalVisible(false)}></button>
                            </div>
                            <div className="modal-body">
                                Product added to cart.
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setModalVisible(false)}>Close</button>
                                <button type="button" className="btn btn-primary">Understood</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SingleProduct;
