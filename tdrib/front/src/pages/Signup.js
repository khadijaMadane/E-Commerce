import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Importez useDispatch depuis Redux
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import CustmInput from '../components/CustmInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { authSlice, registerUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const signUpSchema = yup.object({
  firstname: yup.string().required('First Name is Required').required("First name adress is required"),
  lastname: yup.string().required('Last Name is Required').required("last name adress is required"),
  email: yup.string().nullable().email('Email Should be valid').required("email adress is required"),
  mobile: yup.string().required('Mobile No is Required').required("mobile number adress is required"),
  password: yup.string().required('Password is Required').required("password adress is required"),
});

const Signup = () => {
  const authState=useSelector(state=>state.auth)
  const dispatch = useDispatch(); // Déclarez useDispatch ici
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      mobile: '',
      password: '',
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values)); // Utilisez dispatch pour envoyer les valeurs
    },
  });

  useEffect(()=>{
    if(authState.createdUser!==null && authState.isError===false){
     /* Navigate('/login')*/
    }
  },[authState])
  return (
    <>
      <BreadCrumb title="Login" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className='text-center mb-3'>Sign Up</h3>
              <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                <CustmInput
                  type="text"
                  name="firstname"
                  placeholder="First name"
                  value={formik.values.firstname}
                  onChange={formik.handleChange('firstname')}
                  onBlur={formik.handleBlur('firstname')}
                />
                <div className={formik.errors.firstname && formik.touched.firstname ? 'error' : ''}>
                  {formik.touched.firstname && formik.errors.firstname}
                </div>
                <CustmInput
                  type="text"
                  name="lastname"
                  placeholder="Last name"
                  value={formik.values.lastname}
                  onChange={formik.handleChange('lastname')}
                  onBlur={formik.handleBlur('lastname')}
                />
                <div className={formik.errors.lastname && formik.touched.lastname ? 'error' : ''}>
                  {formik.touched.lastname && formik.errors.lastname}
                </div>
                <CustmInput
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formik.values.mobile}
                  onChange={formik.handleChange('mobile')}
                  onBlur={formik.handleBlur('mobile')}
                />
                <div className={formik.errors.mobile && formik.touched.mobile ? 'error' : ''}>
                  {formik.touched.mobile && formik.errors.mobile}
                </div>
                <CustmInput
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange('email')}
                  onBlur={formik.handleBlur('email')}
                />
                <div className={formik.errors.email && formik.touched.email ? 'error' : ''}>
                  {formik.touched.email && formik.errors.email}
                </div>
                <CustmInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange('password')}
                  onBlur={formik.handleBlur('password')}
                />
                <div className={formik.errors.password && formik.touched.password ? 'error' : ''}>
                  {formik.touched.password && formik.errors.password}
                </div>
                <div>
                  <div className=' mt-3 d-flex justify-content-center gap-15 align-items-center'>
                    <button className='button border-0'>Sign Up</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;
