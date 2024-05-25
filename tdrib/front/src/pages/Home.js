import React from 'react'
import {Link} from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/blogCard";
import ProductCard from "../components/ProductCard";
import SpecialProduct from '../components/SpecialProduct';
import Container from '../components/Container'
import { FaShippingFast, FaPercent, FaComments, FaDollarSign, FaLock, FaGift } from 'react-icons/fa'; // Importer les icônes Font Awesome
import {services} from "../utils/Data"
const Home = () => {
  return (
    <>
    <Container class1="home-wrapper-1 py-5">
    <div className="row">
                <div className="col-6">
                    <div className="main-banner position-relative p-3">
                    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEbVQL6swwaiubQSJeUCELWrVKl3GmIYZ6YxfRRL4SA4eZCBJ0"
      style={{ width: '100%', height: 'auto' }}
      className="img-fluid rounded-3"
      alt="main banner"
    />
        <div className="main-banner-content position-absolute">
        <h4>SUPERCHARGED FOR PROS.</h4>
        <h5>iPad S13+ Pro.</h5>
        <p>From $1,299 or $61.82/mo </p>
        <Link className="button">BUY NOW</Link>
        </div>
        </div>
        </div>
        <div className="col-6">
<div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
<div className="small-banner position-relative p-3">
<img
src="https://sh0pcart.netlify.app/images/catbanner-01.jpg"
className="img-fluid rounded-3"
alt="main banner"
/>
<div className="small-banner-content position-absolute">
<h4> Best sake</h4>
<h5>iPad S13+ Pro.</h5>
<p className="small-paragraph">From $999.00 ог $41.62/mo.</p>
<p className="small-paragraph"> for 24 mo Footnote</p>
</div>
</div>
<div className="small-banner position-relative p-3">
<img
src="https://sh0pcart.netlify.app/images/catbanner-03.jpg"
className="img-fluid rounded-3"
alt="main banner"
/>
<div className="small-banner-content position-absolute">
<h4>New ARRIVAL</h4>
<h5>Bur Ipad Air</h5>
<p className="small-paragraph">From $999.00 ог $41.62/mo.</p>
<p className="small-paragraph"> for 24 mo Footnote</p>

</div>
</div>
<div className="small-banner position-relative p-3">
<img
src="https://sh0pcart.netlify.app/images/catbanner-02.jpg"
className="img-fluid rounded-3"
alt="main banner"
/>
<div className="small-banner-content position-absolute">
<h4>SUPERCHARGED FOR PROS.</h4>
<h5>iPad S13+ Pro.</h5>
<p className="small-paragraph">From $999.00 ог $41.62/mo.</p>
<p className="small-paragraph"> for 24 mo Footnote</p>
</div>
</div>
<div className="small-banner position-relative p-3">
<img
src="https://sh0pcart.netlify.app/images/catbanner-04.jpg"
className="img-fluid rounded-3"
alt="main banner"
/>
<div className="small-banner-content position-absolute">
<h4>SUPERCHARGED FOR PROS.</h4>
<h5>iPad S13+ Pro.</h5>
<p className="small-paragraph">From $999.00 ог $41.62/mo.</p>
<p className="small-paragraph"> for 24 mo Footnote</p>
</div>
</div>
</div>
</div>
        </div>
    </Container>
   
<Container>
  <section class="home-wrapper-2 pt-5">
    <div class="container-xxl">
      <div class="row">
        <div class="col-sm-12">
          <div class="services d-flex justify-content-between align-items-center py-5">
            <div class="d-flex align-items-center gap-15 g-col-6">
              <FaShippingFast className="icon"  size={30} />
              <div>
                <h6>Free Shipping</h6>
                <p class="mb-0">From all orders over $50</p>
              </div>
            </div>
            <div class="d-flex align-items-center gap-15 g-col-6">
              <FaGift className="icon"  size={30} />
              <div>
                <h6>Daily Serprice Offers</h6>
                <p class="mb-0">Save upto 25%</p>
              </div>
            </div>
            <div class="d-flex align-items-center gap-15 g-col-6">
              <FaComments className="icon"  size={30} />
              <div>
                <h6>Suppurt 24/7</h6>
                <p class="mb-0">Shop with an expert</p>
              </div>
            </div>
            <div class="d-flex align-items-center gap-15 g-col-6">
              <FaDollarSign className="icon"  size={30} />
              <div>
                <h6>Affordable Prices</h6>
                <p class="mb-0">Get factory default prices</p>
              </div>
            </div>
            <div class="d-flex align-items-center gap-15 g-col-6">
              <FaLock className="icon"  size={30} />
              <div>
                <h6>Secure Payments</h6>
                <p class="mb-0">100% protected</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</Container>
    
    <Container class1="home-wrapper-2 py-5">
    <div className="row">
            <div className="col-12">
                <div className="categories d-flex justify-content-between flex-wrap align-items-center">
                    <div className="d-flex gap-10 align-items-center">
                        <div>
                        <h6>Cameras</h6>
                        <p>10 Items</p>
                        </div>
                        <img src="khadija/khadija/camera.jpg" alt="camera"/>
                    </div>
                    <div className="d-flex gap-10 align-items-center">
                        <div>
                        <h6>Cameras</h6>
                        <p>10 Items</p>
                        </div>
                        <img src="khadija/khadija/tv.jpg" alt="camera"/>
                    </div>
                    <div className="d-flex gap-10 align-items-center">
                        <div>
                        <h6>Cameras</h6>
                        <p>10 Items</p>
                        </div>
                        <img src="khadija/khadija/tv.jpg" alt="camera"/>
                    </div>
                    <div className="d-flex gap-10 align-items-center">
                        <div>
                        <h6>Cameras</h6>
                        <p>10 Items</p>
                        </div>
                        <img src="khadija/khadija/headphone.jpg" alt="camera"/>
                    </div>
                    <div className="d-flex gap-10 align-items-center">
                        <div>
                        <h6>Cameras</h6>
                        <p>10 Items</p>
                        </div>
                        <img src="khadija/khadija/camera.jpg" alt="camera"/>
                    </div>
                    <div className="d-flex gap-10 align-items-center">
                        <div>
                        <h6>Cameras</h6>
                        <p>10 Items</p>
                        </div>
                        <img src="khadija/khadija/tv.jpg" alt="camera"/>
                    </div>
                    <div className="d-flex gap-10 align-items-center">
                        <div>
                        <h6>Cameras</h6>
                        <p>10 Items</p>
                        </div>
                        <img src="khadija/khadija/tv.jpg" alt="camera"/>
                    </div>
                    <div className="d-flex gap-10 align-items-center">
                        <div>
                        <h6>Cameras</h6>
                        <p>10 Items</p>
                        </div>
                        <img src="khadija/khadija/headphone.jpg" alt="camera"/>
                    </div>
                </div>
            </div>
        </div>
    </Container>
    <Container class1="featured-wrapper py-5 home-wrapper-2">
    <div className="row">
<div className="col-12">
<h3 ssName="section-heading">Featured Collection</h3>
</div>
<ProductCard />
<ProductCard />
<ProductCard />
<ProductCard />
</div>
    </Container>
    <Container class1="special-wrapper py-5 home-wrapper-2">
    <div className="row">
      <div className="col-12">
        <h3 className="section-heading">Special Products</h3>
      </div>
    </div>
    </Container>

<Container class1="marque-wrapper py-5">
        
          <div className="row">
            <div className="col-12">
              <div className="marquee-inner-wrapper card-wrapper">
                <Marquee className="d-flex">
                  <div className="mx-4 w-25">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt4yoYGEanGNFITuTEeCbBpnP-fhtHSDMlOA&s" alt="brand" className="brand-img" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="http://enceintes-bluetooth.info/wp-content/uploads/2017/03/bose-logo.jpg" alt="brand" className="brand-img" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="https://logos-marques.com/wp-content/uploads/2021/02/Canon-logo-768x480.png" alt="brand" className="brand-img"/>
                  </div>
                  <div className="mx-4 w-25">
                    <img src="https://sf2.cnetfrance.fr/wp-content/uploads/cnet/2023/05/dell20logo-184x138-1.jpg" alt="brand" className="brand-img"/>
                  </div>
                  <div className="mx-4 w-25">
                    <img src="https://m.media-amazon.com/images/I/31GpAOSdTLL._AC_.jpg" alt="brand" className="brand-img"/>
                  </div>
                  <div className="mx-4 w-25">
                    <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT2cWQelMW3F6gPJfVaBJcGgJTg80MZQ2P-P0DFc0KKoHCPWY7h" alt="brand" className="brand-img"/>
                  </div>
                  <div className="mx-4 w-25">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgPk_ycLv6um_wgKyGmnQYihk8zZf-d_znAtGJxf4n4Ovm5_rX" alt="brand" className="brand-img"/>
                  </div>
                  <div className="mx-4 w-25">
                    <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSnSEBG8jq8LTOmuWJ5A7zXnHatQHJ_ZDibqH6n34wOMxDGS0o9" alt="brand" className="brand-img"/>
                  </div>
                </Marquee>
              </div>
            </div>
          </div>
        
      </Container>
      
<Container class1="popular-wrapper py-5 home-wrapper-2">

<div className="row">
<div className="col-12">
<h3 className="section-heading">Our Popular Products</h3>
</div>
</div>
<div className="row">
<ProductCard />
<ProductCard />
<ProductCard />
<ProductCard />
</div>
</Container>

      
      <Container class1="blog-wrapper py-5 home-wrapper-2">

<div className="row">
  <div className='col-12'>
    <h3 className='section-heading'>Our latest Blogs</h3>
  </div>


</div>
<div className='row'>
    <div className='col-3'>
    <BlogCard/>
    </div>
    <div className='col-3'>
    <BlogCard/>
    </div>
    <div className='col-3'>
    <BlogCard/>
    </div>
    <div className='col-3'>
    <BlogCard/>
    </div>
</div>

</Container>
    </>
  );
};

export default Home;