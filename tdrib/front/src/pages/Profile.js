import React, { useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../features/user/userSlice';
import { FiEdit } from "react-icons/fi";

const profileSchema = yup.object({
  firstName: yup.string().required('First Name is Required'),
  lastName: yup.string().required('Last Name is Required'),
  email: yup.string().email('Email Should be valid').required('Email address is required'),
  mobile: yup.string().required('Mobile Number is Required'),
});

const Profile = () => {
  const dispatch = useDispatch();
  const userState = useSelector(state => state.auth.user);
  const [edit, setEdit] = useState(true);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: userState?.firstname,
      lastName: userState?.lastname,
      email: userState?.email,
      mobile: userState?.mobile,
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      dispatch(updateProfile(values))
        .unwrap()
        .then((result) => {
          console.log('Profile updated successfully:', result);
          setEdit(true);
        })
        .catch((err) => {
          console.error('Failed to update profile:', err);
        });
    },
  });

  return (
    <>
      <BreadCrumb title='My Profile' />
      <Container className='cart-wrapper home-wrapper-2 py-5'>
        <div className='row'>
          <div className='col-12'>
            <div className='d-flex justify-content-between align-items-center'>
              <h3 className='my-3'>Update Profile</h3>
              <FiEdit className='fs-3' onClick={() => setEdit(false)} />
            </div>
          </div>
          <div className='col-12'>
            <form onSubmit={formik.handleSubmit}>
              <div className='mb-3'>
                <label htmlFor='firstName' className='form-label'>First Name</label>
                <input
                  type='text'
                  name='firstName'
                  className='form-control'
                  disabled={edit}
                  id='firstName'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                />
                <div className='error'>
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <div className='text-danger'>{formik.errors.firstName}</div>
                  ) : null}
                </div>
              </div>
              <div className='mb-3'>
                <label htmlFor='lastName' className='form-label'>Last Name</label>
                <input
                  type='text'
                  name='lastName'
                  disabled={edit}
                  className='form-control'
                  id='lastName'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className='text-danger'>{formik.errors.lastName}</div>
                ) : null}
              </div>
              <div className='mb-3'>
                <label htmlFor='email' className='form-label'>Email address</label>
                <input
                  type='email'
                  name='email'
                  disabled={edit}
                  className='form-control'
                  id='email'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className='text-danger'>{formik.errors.email}</div>
                ) : null}
              </div>
              <div className='mb-3'>
                <label htmlFor='mobile' className='form-label'>Mobile No</label>
                <input
                  type='text'
                  name='mobile'
                  disabled={edit}
                  className='form-control'
                  id='mobile'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mobile}
                />
                {formik.touched.mobile && formik.errors.mobile ? (
                  <div className='text-danger'>{formik.errors.mobile}</div>
                ) : null}
              </div>
              <button type='submit' className='btn btn-primary'>Save</button>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Profile;
