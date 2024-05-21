import React from 'react'
import { Link } from 'react-router-dom'; // Assurez-vous d'importer Link si vous utilisez react-router-dom
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container'
import CustmInput from '../components/CustmInput';
const Resetpassword = () => {
  return (
    <>
    <BreadCrumb title="Login" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className='text-center mb-3'> Reset Password</h3>
              <form action="" className='d-flex flex-column gap-15'>
              <CustmInput type="password" name="password" placeholder="Password" />
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