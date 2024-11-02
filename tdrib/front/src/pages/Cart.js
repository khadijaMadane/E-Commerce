import React, { useEffect, useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import { AiFillDelete } from 'react-icons/ai';
import Container from '../components/Container';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartProduct, getUserCart, updateCartProduct } from '../features/user/userSlice';

const Cart = () => {
    const getTokenFromLocalStorage = localStorage.getItem("customer")
        ? JSON.parse(localStorage.getItem("customer")) : null;
    const config2 = {
        headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""}`,
            Accept: "application/json",
        },
    };

    const dispatch = useDispatch();
    const [productUpdateDetail, setProductUpdateDetail] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);

    const userCartState = useSelector(state => state.auth.cartProducts);

    useEffect(() => {
        dispatch(getUserCart(config2));
    }, [dispatch]);

    useEffect(() => {
        if (productUpdateDetail !== null) {
            dispatch(updateCartProduct({ cartItemId: productUpdateDetail?.cartItemId, quantity: productUpdateDetail?.quantity }));
            setTimeout(() => {
                dispatch(getUserCart(config2));
            }, 200);
        }
    }, [productUpdateDetail, dispatch]);

    const deleteACartProduct = (id) => {
        dispatch(deleteCartProduct({ id: id, config2: config2 }));
        setTimeout(() => {
            dispatch(getUserCart(config2));
        }, 200);
    };

    useEffect(() => {
        let sum = 0;
        userCartState?.forEach(item => {
            sum += Number(item.quantity) * item.price;
        });
        setTotalAmount(sum);
    }, [userCartState]);

    return (
        <>
            <BreadCrumb title="Cart" />
            <Container class1="cart-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                            <h4 className="cart-col-1">Product</h4>
                            <h4 className="cart-col-2">Price</h4>
                            <h4 className="cart-col-3">Quantity</h4>
                            <h4 className="cart-col-4">Total</h4>
                        </div>
                        {
                            userCartState && userCartState.map((item, index) => (
                                <div key={index} className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
                                    <div className="cart-col-1 d-flex align-items-center">
                                        <div className="w-25">
                                            <img
                                                src={item?.productId.images[0]?.url || "https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d3Jpc3R3YXRjaHxlbnwwfHwwfHx8MA%3D%3D"}
                                                className="img-fluid"
                                                alt="product image"
                                            />
                                        </div>
                                        <div className="w-75" style={{ marginLeft: '50px' }}>
                                            <h5 className="title">{item?.productId?.title || 'No Title Available'}</h5>
                                            <p className="color">Color:
                                                <ul className='colors ps-0'>
                                                    <li style={{ backgroundColor: item?.color?.title || 'transparent' }}></li>
                                                </ul>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="cart-col-2">
                                        <h5 className="price">$ {item?.price}</h5>
                                    </div>
                                    <div className="cart-col-3 d-flex align-items-center gap-15">
                                        <div>
                                            <input
                                                className="form-control"
                                                type="number"
                                                min={1}
                                                max={20}
                                                name={"quantity" + item?._id}
                                                id={"cart" + item?._id}
                                                value={productUpdateDetail?.cartItemId === item?._id ? productUpdateDetail.quantity : item?.quantity}
                                                onChange={(e) => setProductUpdateDetail({ cartItemId: item?._id, quantity: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <AiFillDelete onClick={() => deleteACartProduct(item?._id)} className='text-danger' />
                                        </div>
                                    </div>
                                    <div className="cart-col-4">
                                        <h5 className='price'>$ {item?.price * item?.quantity}</h5>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="col-12 py-2 mt-4">
                        <div className="d-flex justify-content-between align-items-baseline">
                            <Link to="/product" className="button">
                                Continue To Shopping
                            </Link>
                            {
                                totalAmount > 0 &&
                                <div className="d-flex flex-column align-items-end">
                                    <h4>SubTotal: $ {totalAmount}</h4>
                                    <p>Taxes and shipping calculated at checkout</p>
                                    <Link to="/checkout" className="button">
                                        Checkout
                                    </Link>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Cart;
