import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import { useDispatch, useSelector } from "react-redux";
import { BiArrowBack } from 'react-icons/bi';
import { useFormik } from 'formik';
import * as yup from 'yup';

const Checkout = () => {
  const dispatch = useDispatch();
  const cartState = useSelector(state => state.auth.cartProducts);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingInfo,setShippingInfo]=useState(null)
  useEffect(() => {
    let sum = 0;
    cartState?.forEach(item => {
      sum += Number(item.quantity) * item.price;
    });
    setTotalAmount(sum);
  }, [cartState]);

  const shippingSchema = yup.object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    address: yup.string().required("Address Name is required"),
    state: yup.string().required("State is required"),
    city: yup.string().required("City is required"),
    country: yup.string().required("Country is required"),
    pincode: yup.string().required("Pincode is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      state: "",
      city: "",
      country: "",
      pincode: "",
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      setShippingInfo(values)
    },
  });

  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">Dev Corner</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": '>' }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className='text-dark total-price' to="/cart">Cart</Link>
                  </li>
                  &nbsp;/
                  <li className="breadcrumb-item total-price active" aria-current="page">
                    Information
                  </li>
                  &nbsp;/
                  <li className="breadcrumb-item total-price active">
                    Shipping
                  </li>
                  &nbsp;/
                  <li className="breadcrumb-item active" aria-current="page">
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Contact Information</h4>
              <p className="user-details total">
                Navdeep Dahiya (monud0232@gmail.com)
              </p>
              <h4 className='mb-3'>Shipping Address</h4>
              <form
                onSubmit={formik.handleSubmit}
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className='w-100'>
                  <select name='country'
                    value={formik.values.country}
                    onChange={formik.handleChange("country")}
                    onBlur={formik.handleBlur("country")}
                    className='form-control form-select'
                  >
                    <option value="" disabled>Select Country</option>
                    <option value="Morocco">Morocco</option>
                    {/* Add more country options as needed */}
                  </select>
                  <div className='error ms-2 my-1'>
                    {formik.touched.country && formik.errors.country}
                  </div>
                </div>
                <div className='flex-grow-1'>
                  <input
                    type="text"
                    placeholder='First Name'
                    className="form-control"
                    name="firstName"
                    value={formik.values.country}
                    onChange={formik.handleChange("firstName")}
                    onBlur={formik.handleBlur("firstName")}
                  />
                  <div className='error ms-2 my-1'>
                    {formik.touched.firstName && formik.errors.firstName}
                  </div>
                </div>
                <div className='flex-grow-1'>
                  <input
                    type="text"
                    placeholder='Last Name'
                    className="form-control"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange("lastName")}
                    onBlur={formik.handleBlur("lastName")}
                  />
                  <div className='error ms-2 my-1'>
                    {formik.touched.lastName && formik.errors.lastName}
                  </div>
                </div>
                <div className='w-100'>
                  <input
                    type="text"
                    placeholder='Address'
                    className="form-control"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange("address")}
                    onBlur={formik.handleBlur("address")}
                  />
                  <div className='error ms-2 my-1'>
                    {formik.touched.address && formik.errors.address}
                  </div>
                </div>
                <div className='w-100'>
                  <input
                    type="text"
                    placeholder='Apartment, Suite, etc'
                    className="form-control"
                    name="other"
                    value={formik.values.other}
                    onChange={formik.handleChange("other")}
                    onBlur={formik.handleBlur("other")}
                  />
                </div>
                
                <div className='flex-grow-1'>
                  <input
                    type="text"
                    placeholder='City'
                    className="form-control"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange("city")}
                    onBlur={formik.handleBlur("city")}
                  />
                  <div className='error ms-2 my-1'>
                    {formik.touched.city && formik.errors.city}
                  </div>
                </div>
                <div className='flex-grow-1'>
                  <select
                    name="state"
                    className='form-control form-select'
                    value={formik.values.state}
                    onChange={formik.handleChange("state")}
                    onBlur={formik.handleBlur("state")}
                  >
                    <option value="" disabled>Select state</option>
                    {/* Add state options here */}
                  </select>
                  <div className='error'>
                    {formik.touched.state && formik.errors.state}
                  </div>
                </div>
                <div className='flex-grow-1'>
                  <input
                    type="text"
                    placeholder='Zipcode'
                    className="form-control"
                    name="pincode"
                    value={formik.values.pincode}
                    onChange={formik.handleChange("pincode")}
                    onBlur={formik.handleBlur("pincode")}
                  />
                  <div className='error'>
                    {formik.touched.pincode && formik.errors.pincode}
                  </div>
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className='text-dark'>
                      <BiArrowBack className='me-2' /> Return to Cart
                    </Link>
                    <button type="submit" className="button">
                      Continue to Shipping
                    </button>
                    <button type="submit" className="button">
                      Place Order
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className="border-bottom py-4">
              {cartState && cartState.map((item, index) => (
                <div key={index} className='d-flex gap-10 mb-2 align-items-center'>
                  <div className='w-27 d-flex gap-10'>
                    <div className='w-25 position-relative'>
                      <span style={{ top: "2px", right: "2px" }} className='badge bg-secondary text-white rounded-circle p-1 position-absolute'>
                        {item?.quantity}
                      </span>
                      <img className='img-fluid' width={100} src={item?.productId?.images[0]?.url} alt='product' />
                    </div>
                    <div>
                      <h5 className='total'>{item?.productId?.title}</h5>
                      <p className='total-price'>{item?.color?.title}</p>
                    </div>
                  </div>
                  <div className='flex-grow-1'>
                    <h5 className='total'>$ {item?.price * item?.quantity}</h5>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className='total'>Subtotal</p>
                <p className='total-price'>$ {totalAmount ? totalAmount : "0"}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Shipping</p>
                <p className="mb-0 total-price">$ 5</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bottom py-4">
              <h4 className='total'>Total</h4>
              <h5 className='total-price'>$ {totalAmount ? totalAmount + 5 : "0"}</h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Checkout;
