import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Assurez-vous d'importer Link si vous utilisez react-router-dom
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container'
import CustmInput from '../components/CustmInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { loginUser } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const loginSchema = yup.object({
  email: yup.string().email('Email Should be valid').required("email adress is required"),
  password: yup.string().required('Password is Required'),
});

const Login = () => {
  const authState = useSelector(state => state.auth); // Use useSelector to get the auth state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values)); // Utilisez dispatch pour envoyer les valeurs
      
          navigate('/');
       
    },
  });

  return (
    <>
      <BreadCrumb title="Login" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className='text-center mb-3'>Login</h3>
              <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                <CustmInput type="email" name="email" placeholder="Email"
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  value={formik.values.email} />
                <div className='error'>
                  {formik.touched.email && formik.errors.email}
                </div>
                <CustmInput type="password" name="password" placeholder="Password"
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  value={formik.values.password} />
                <div className='error'>
                  {formik.touched.password && formik.errors.password}
                </div>
                <div>
                  <Link to="/forgot-password">Forget Password?</Link> {/* Utilisation de Link */}
                  <div className='mt-3 d-flex justify-content-center gap-15 align-items-center'>
                    <button className='button border-0'>Login</button>
                    <Link to="/signup" className='button signup'>SignUp</Link> {/* Utilisation de Link */}
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

export default Login;
