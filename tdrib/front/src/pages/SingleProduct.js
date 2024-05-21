import React, { useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import ProductCard from '../components/ProductCard';
import ReactStars from "react-rating-stars-component";
import ReactImageZoom from "react-image-zoom"
import Color from '../components/Color';
import { TbGitCompare} from "react-icons/tb";
import { Link } from 'react-router-dom'; // Assurez-vous d'importer Link si vous utilisez react-router-dom
import {AiOutlineHeart} from 'react-icons/ai';
import Container from '../components/Container'

const SingleProduct = () => {
    const props={width: 400,
         height:200,
         zoomWidth:600,
        img: "https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d3Jpc3R3YXRjaHxlbnwwfHwwfHx8MA%3D%3D"}
    const [orderedProduct, setOrderedProduct] = useState(true);
    const copyToClipboard = (text) => {
        console.log("text", text);
        var textField= document.createElement("textarea");
        textField.innerText = text;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand("copy");
        textField.remove();
        };
    return (
        <>
            <BreadCrumb title="Product Name" />
            <Container class1="main-product-wrapper py-5 home-wrapper-2">
                    <div className="row">
                        <div className="col-6">
                            <div className='main-product-image'>
                                <div>
                                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg0qGhD7zJBDBym8a-UbJ3dke7PqLTlhjqa2ONIQOUmw&s' alt='' className='img-fluid'/>
                                </div>
                            </div>
                            <div className='other-product-images d-flex flex-wrap gap-10'>
                                <div>
                                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg0qGhD7zJBDBym8a-UbJ3dke7PqLTlhjqa2ONIQOUmw&s' alt='' className='img-fluid'/>
                                </div>
                                <div>
                                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg0qGhD7zJBDBym8a-UbJ3dke7PqLTlhjqa2ONIQOUmw&s' alt='' className='img-fluid'/>
                                </div>
                                <div>
                                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg0qGhD7zJBDBym8a-UbJ3dke7PqLTlhjqa2ONIQOUmw&s' alt='' className='img-fluid'/>
                                </div>
                                <div>
                                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg0qGhD7zJBDBym8a-UbJ3dke7PqLTlhjqa2ONIQOUmw&s' alt='' className='img-fluid'/>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                        <div className="main-product-details">
    <div className="border-bottom">
    <h3 className="title">
    Kids Headphones Bulk 10 Pack Multi Colored For Students
    </h3>
    </div>
    <div className="border-bottom py-3">
    <p className="price">$ 100</p>
    <div className="d-flex align-items-center gap-10">
    <ReactStars
    count={5}
    size={24}
    value={4}
    edit={false}
    activeColor="#ffd700"
    />
    <p className="mb-0 t-review">(2 Reviews )</p>
    </div>
    <a  className='review-btn' href='#review'>
                Write a Review 
            </a>
    </div>
    <div className='border-bottom py-3'>
        <div className='d-flex gap-10 align-items-center my-2 '>
            <h3 className='product-heading'>Type:</h3> 
            <p className='product-data'>Match</p>
        </div>
        <div className='d-flex gap-5 align-items-center my-2 '>
        <h3 className='product-heading'>Brand:</h3> 
            <p className='product-data'>Havells</p>
                    </div>
        <div className='d-flex gap-5 align-items-center my-2'>
        <h3 className='product-heading'>Category:</h3> 
            <p className='product-data'>watch</p>
        </div>
        <div className='d-flex gap-10 align-items-center my-2'>
        <h3 className='product-heading'>Tags:</h3> 
            <p className='product-data'>watch</p>
        </div>
        <div className='d-flex gap-10 align-items-center my-2'>
        <h3 className='product-heading'>Availablity:</h3> 
            <p className='product-data'>In stock</p>
        </div>
        <div className='d-flex gap-10 flex-column  mt-2 mb-3'>
        <h3 className='product-heading'>Size:</h3> 
        <div className='d-flex flex-wrap gap-15'>
            <span className='badge border border-1 bg-white text-dark border-secondary'>S</span>
            <span className='badge border border-1 bg-white text-dark border-secondary'>M</span>
            <span className='badge border border-1 bg-white text-dark border-secondary'>XL</span>
            <span className='badge border border-1 bg-white text-dark border-secondary'>XXL</span>

        </div>
        </div>
        <div className='d-flex gap-10 flex-column mt-2 mb-3 '>
        <h3 className='product-heading'>Color:</h3> 
            <Color />
        </div>
        <div className='d-flex gap-15 align-items-center flex-row mt-2 mb-3 '>
        <h3 className='product-heading'>Quantity:</h3> 
            <div>
                <input type='number' className='form-control' min={1} max={20} style={{"width":"70px"}} name='' id=''/>
            </div>
            <div className=' d-flex  gap-30 align-items-center ms-5'>
                    <button className='button border-0'>Add to Cart</button>
                    <button className='button signup'>But it now</button> {/* Utilisation de Link */}
                  </div>
        </div>
        <div className='d-flex align-items-center gap-15'>
          <div>  <a href=''> <TbGitCompare/>Add to Compare</a>
        </div>
        <div>
            <a href=''><AiOutlineHeart className='fs-5 me-2'/> Add to wishlist</a>
        </div>
        </div>
        <div className='d-flex gap-10 flex-column  mt-2 mb-3'>
        
        <div className='d-flex gap-10 align-items-center my-2 '>
            <h3 className='product-heading'>Shipping & Return:</h3> 
            <p className='product-data'>Free shipping and returns available on all orders! 
            we ship all US domestic orders within
            <b>5 -10 business days!</b> </p>
        </div>
        <div className='d-flex gap-10 align-items-center my-2 '>
            <h3 className='product-heading'>Coppy Product  Link:</h3> 
            <p className='product-data'>Running shoes cushions stride with soft foarm hdhhhd hhckjhz fgiuhj kdtr
            <b>5 -10 business days!</b> </p>
            <a href='javascript:void(0); ' onClick={()=>{
                copyToClipboard(
                    "https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d3Jpc3R3YXRjaHxlbnwwfHwwfHx8MA%3D%3D"
                )
            }
                
            }>coppy product link</a>
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
                                
                                <p>azertyu azerty azerty azerty aazerty azerty azerty azerty azerty</p>
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
                                    <h4 className="mb-2">Customer Reviews</h4>
                                    <div className="d-flex align-items-center gap-10">
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            value={4}
                                            edit={false}
                                            activeColor="#ffd700"
                                        />
                                        <p className="mb-0">Based on 2 Reviews</p>
                                    </div>
                                </div>

                                {orderedProduct && (
                                    <div>
                                        <a className='text-dark text-decoration-underline' href=''>Write a review</a>
                                    </div>
                                )}
                            </div>
                            <div className='review-form py-4'>
                                <h4 className="">Write a Review</h4>

                                <form action="" className="d-flex flex-column gap-15">
                                   <div>
                                   <ReactStars
                                            count={5}
                                            size={24}
                                            value={4}
                                            edit={true}
                                            activeColor="#ffd700"
                                        />
                                   </div>
                                    <div>
                                        <textarea
                                            name=""
                                            id=""
                                            className="w-100 form-control"
                                            cols="30"
                                            rows="4"
                                            placeholder="comments"
                                        ></textarea>
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
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            value={4}
                                            edit={false}
                                            activeColor="#ffd700"
                                        />

                                    </div>
                                        <p className='mt-3'>lorem a une structure beint faite et aussi avoire un baf birne fait et jolie jaime bien</p>
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
        </>
    );
};

export default SingleProduct;
