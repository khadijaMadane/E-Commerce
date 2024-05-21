import React from 'react'
import { Link } from 'react-router-dom'; // Assurez-vous d'importer Link si vous utilisez react-router-dom
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container'
import CustmInput from '../components/CustmInput';
const ForgotPassword = () => {
  return (
    <>
    <BreadCrumb title="Forgot Password" />
<Container class1="login-wrapper py-5 home-wrapper-2">
<div className="row">
<div className="col-12">
<div className="auth-card">
<h3 className="text-center mb-3">Reset Your Password</h3>
<p className="text-center mt-2 mb-3">
We will send you an email to reset your password
</p>
<form action="" className="d-flex flex-column gap-15">
<CustmInput type="email" name="email" placeholder="Email" />

<div>
<Link to="/forgot-passowrd">Forgot Password?</Link>
<div className='mt-3 d-flex justify-content-center flex-column gap-15 align-items-center'>
<button className='button border-0' type='submit'>Submit</button>
                    <Link to="/login" >Cancel</Link> {/* Utilisation de Link */}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </> 
)
}

export default ForgotPassword