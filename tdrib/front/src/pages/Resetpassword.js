import React from 'react'
import { Link, useNavigate , useLocation } from 'react-router-dom'; // Assurez-vous d'importer Link si vous utilisez react-router-dom
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container'
import CustmInput from '../components/CustmInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../features/user/userSlice';

const passwordSchema = yup.object({
password: yup.string().required("password is required"),
});


const Resetpassword = () => {
  const location= useLocation()
  const getToken=location.pathname.split("/")[2]

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      password: '',
      
    },
    validationSchema: passwordSchema,
    onSubmit: (values) => {
       dispatch(resetPassword({token: getToken,password:values.password })); // Utilisez dispatch pour envoyer les valeurs
      
          navigate('/login');
       
    },
  });
  return (
    <>
    <BreadCrumb title="Login" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className='text-center mb-3'> Reset Password</h3>
              <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
              <CustmInput type="password" name="password" placeholder="Password" 
              onChange={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
              value={formik.values.password}/>
              <div className='error text-center'>
                  {formik.touched.password && formik.errors.password}
                </div>
              <CustmInput type="password" name="confpassword" placeholder="Confirm Password"/>

                <div>
                  <div className=' mt-3 d-flex justify-content-center gap-15 align-items-center'>
                    <button className='button border-0'>ok</button>
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


export default Resetpassword