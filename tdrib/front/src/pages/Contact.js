import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import { AiOutlineHome, AiOutlineMail } from 'react-icons/ai'
import { BiInfoCircle, BiPhoneCall } from 'react-icons/bi'
import { GoContainer } from 'react-icons/go'
import Container from '../components/Container'

const Contact = () => {
  return (
    <>
    <BreadCrumb title="Contact Us" />
<Container class1="contact-wrapper py-5 home-wrapper-2">
<div className="row">
<div className="col-12">
<iframe 
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d79354.44413461395!2d-5.9463407526891885!3d35.74077178981637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0b87d746836ac7%3A0x20774c4ac415e78d!2s%C3%89cole%20Nationale%20des%20Sciences%20Appliqu%C3%A9es%20de%20Tanger!5e0!3m2!1sfr!2sma!4v1715794062458!5m2!1sfr!2sma" 
width="600" 
height="450" 
className='border-0 w-100'
allowfullscreen="" 
loading="lazy" 
referrerpolicy="no-referrer-when-downgrade"
></iframe>
</div>
<div className="col-12 mt-5">
<div className="contact-inner-wrapper d-flex justify-content-between">
<div>
  <h3 className='contact-title mb-4'>Contact</h3>
  <form action="" className="d-flex flex-column gap-15">
<div>
<input
type="text"
className="form-control"
placeholder="Name"
/>
</div>
<div>
<input type="text" className="form-control" placeholder="Name"/>
</div>
<div>
<input type="email" className="form-control" placeholder='Email'/>
</div>
<div>
<input type="tel" className="form-control" placeholder='Mobile Number'/>
</div>
<div>
<textarea
name=""
id=""
className="w-100 form-control"
cols="30"
rows="4"
placeholder='comments'
></textarea>
</div>
<div>
  <button className='button border-0'>Submit</button>
</div>
</form>
</div> I
<div>
  <h3 className='contact-title mb-4'>Get in touch with us </h3>
  <div>
<ul className="ps-0">
<li className="mb-3 d-flex gap-15 align-items-center">
<AiOutlineHome className="fs-5" />
<address className="mb-0">
Hno: 277 Near village chopal, Mandaura, Sonipat, Haryana
</address>
</li>
<li className="mb-3 d-flex gap-15 align-items-center">
<BiPhoneCall className="fs-5" />
<a href="tel:+91 8264954234">+91 8264954234</a>
</li>
<li className="mb-3 d-flex gap-15 align-items-center">
<AiOutlineMail className="fs-5" />
<a href="mailto: navdeepdahiya753@gmail.com">
navdeepdahiya753@gmail.com
</a>
</li>
<li className="mb-3 d-flex gap-15 align-items-center">
<BiInfoCircle className="fs-5" />
<p className="mb-0">Monday Friday 10 AM 8 PM</p>
</li>
</ul>
</div>
</div>
</div>
</div>
</div>

</Container>
    </>
  )
}

export default Contact