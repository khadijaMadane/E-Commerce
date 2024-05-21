import React from 'react';
import { Link } from 'react-router-dom'; // Assurez-vous d'importer Link si vous utilisez react-router-dom
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container'
import CustmInput from '../components/CustmInput';
const Login = () => {
  return (
    <>
      <BreadCrumb title="Login" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className='text-center mb-3'>Login</h3>
              <form action="" className='d-flex flex-column gap-15'>
              <CustmInput type="email" name="email" placeholder="Email" />
              <CustmInput type="password" name="password" placeholder="Password" />

              
                <div>
                  <Link to="/forgot-password">Forget Password?</Link> {/* Utilisation de Link */}
                  <div className=' mt-3 d-flex justify-content-center gap-15 align-items-center'>
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
