import React from 'react'
import {Link} from 'react-router-dom'
import { BsInstagram , BsFacebook, BsTiktok, BsYoutube } from 'react-icons/bs'
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
    <footer className="py-4">
<div className="container-xxl">
<div className="row align-items-center">
<div className="col-5">
  <div className='footer-top-data d-flex gap-30 align-items-center'>
    <img src='../public/images/images/newsletter.png' alt='newsletter'  />
    <h2 className='mb-0 text-white'>Sign Up for newsletter</h2>
  </div>
</div>
<div className="col-7">
<div className="input-group ">
                <input
                  type="text"
                  className="form-control py-1 "
                  placeholder="Your Email Adress"
                  aria-label="Your Email Adress"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-3" id="basic-addon2">
                Subscribe
                </span>
              </div>
</div>
</div>
</div>
</footer>

<footer className="py-4">
<div className="container-xxl">
<div className="row">
<div className="col-4">
<h4 className="text-white mb-4">Contact Us</h4>
<div>
<address className="text-white mb-4">
            Hno: 277 Near Vill chopal,<br /> Sonipat, Haryana<br />
            Pincode:131104
          </address>
          <a href="tel:+6353443535" className='mt-4 d-block mb-2 text-white'>+4256635535</a>
          <a href="mailto:nav@gmail.com" className='mt-4 d-block mb-3 text-white'>navdeepdoha@gmail.com</a>
        <div className="social_icons d-flex align-items-center gap-3 mt-4">
          <a className='text-white' href=''>
            <BsInstagram className='fs-4' />
          </a>
          <a className='text-white' href=''>
            <BsFacebook className=' fs-4' />
          </a>
          <a className='text-white' href=''>
            <BsTiktok className='fs-4' />
          </a>
          <a className='text-white' href=''>
            <BsYoutube className='fs-4' />
          </a>
        </div>
        </div>
      </div>
<div className="col-3">
<h4 className="text-white mb-4">Information</h4>
<div className="footer-links d-flex flex-column">
<Link to='/privacy-policy' className="text-white py-2 mb-1">Privacy Plicy</Link>
<Link to='/shippingpo' className="text-white py-2 mb-1">Shipping policy</Link>
<Link to='/termandcondition' className="text-white py-2 mb-1">Terms & Condition</Link>
<Link className="text-white py-2 mb-1">Blogs</Link>
<div className="payment-icons d-flex align-items-center gap-2">
      <FaCcVisa className="text-white fs-4" />
      <FaCcMastercard className="text-white fs-4" />
      <FaCcPaypal className="text-white fs-4" />
      <FaCcAmex className="text-white fs-4" />
    </div>
</div>
</div>
<div className="col-3">
<h4 className="text-white mb-4">Account</h4>
<div className="footer-links d-flex flex-column">
<Link className="text-white py-2 mb-1">About Us </Link>
<Link className="text-white py-2 mb-1">Faq</Link>
<Link className="text-white py-2 mb-1">Contact</Link>
</div>
</div>
<div className="col-2">
<h4 className="text-white mb-4">Quick Links</h4>
<div className="footer-links d-flex flex-column">
<Link className="text-white py-2 mb-1">Laptops</Link>
<Link className="text-white py-2 mb-1">Headphones</Link>
<Link className="text-white py-2 mb-1">Tablets</Link>
<Link className="text-white py-2 mb-1">Watch</Link>
</div>
</div>
</div>

 </div>
</footer>
<footer className="py-4">
<div className="container-xxl">
<div className="row">
<div className="col-12">
<p className="text-center mb-0 text-white">&copy; {new Date().getFullYear()}; Powered by Developer's corner</p>

</div>
</div>
</div>
</footer>
</>
  )
}

export default Footer