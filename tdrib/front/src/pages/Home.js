import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/blogCard";
import ProductCard from "../components/ProductCard";
import SpecialProduct from '../components/SpecialProduct';
import Container from '../components/Container'
import { FaShippingFast, FaPercent, FaComments, FaDollarSign, FaLock, FaGift } from 'react-icons/fa'; // Importer les icônes Font Awesome
import {services} from "../utils/Data"
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getAllBlogs } from '../features/blogs/blogSlice';
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { getAllProducts } from '../features/products/productSlice';

const Home = () => {



  const productState = useSelector((state) => state?.product?.product) || [];
  console.log('productState:', productState);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    if (Array.isArray(productState)) {

      const newCategories = new Set();
      
      productState.forEach((product) => {
        newCategories.add(product.category);
        
      });

      setCategories([...newCategories]);
      
    }
  }, [productState]);
  useEffect(() => {
    getProducts();
  }, [category]);

  const getProducts = () => {
    dispatch(getAllProducts({category}));
  };
  
  const blogState=useSelector((state)=>state?.blog?.blog);
  const dispatch=useDispatch();

 useEffect(()=>{
  getblogs();
 }, [])
  const getblogs=()=>{
    dispatch(getAllBlogs());
  };
  return (
    <>
    <Container class1="home-wrapper-1 py-5">
    <div className="row">
                <div className="col-6">
                    <div className="main-banner position-relative p-3">
                    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRuCP61ts1nwDkQHDGxEhYiG3fIIpHKnfOBA&s"
      style={{ width: '100%', height: 'auto' }}
      className="img-fluid rounded-3"
      alt="main banner"
    />
        
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
            <h6>Headphones
            </h6>
            <p>10 Items</p>
        </div>
        <img className="fixed-size" src="https://www.telstra.com.au/content/dam/tcom/devices/general/hardware/headphones/ghdwhph-sh3h/black/landscape-front.png" alt="camera"/>
    </div>
    <div className="d-flex gap-10 align-items-center">
        <div>
            <h6>TV</h6>
            <p>10 Items</p>
        </div>
        <img className="fixed-size" src="https://www.sngf.ma/132-thickbox_default/tv-leader-led-43-smart-t2s2-109-cm.jpg" alt="camera"/>
    </div>
    <div className="d-flex gap-10 align-items-center">
        <div>
            <h6>Cameras</h6>
            <p>10 Items</p>
            
        </div>
        <img className="fixed-size" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvV6D7XgWg4DGTOYfu7AaV_m1vi1qd6ligPw&s" alt="camera"/>
    </div>
    <div className="d-flex gap-10 align-items-center">
        <div>
            <h6>Smart Watches
            </h6>
            <p>10 Items</p>
        </div>
        <img className="fixed-size" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUcKhlsSGb8ZYzMUmjvLkBcEYqWrGtlPtAJA&s" alt="camera"/>
    </div>
    <div className="d-flex gap-10 align-items-center">
        <div>
            <h6>Laptops</h6>
            <p>10 Items</p>
        </div>
        <img className="fixed-size" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1NZ-GcAgdXR6AxmOWPBSYS-cACiKkL3fHxg&s" alt="camera"/>
    </div>
    <div className="d-flex gap-10 align-items-center">
        <div>
            <h6>Speakers</h6>
            <p>10 Items</p>
        </div>
        <img className="fixed-size" src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1657728279-jbl-parybox-1657728245.jpg?crop=1xw:1xh;center,top&resize=980:*" alt="camera"/>
    </div>
    <div className="d-flex gap-10 align-items-center">
        <div>
            <h6>Mobile Phone</h6>
            <p>10 Items</p>
        </div>
        <img className="fixed-size" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs0i36nWx8--N4kVFiecBsZlPRgJRzdhimxQ&s" alt="camera"/>
    </div>
    <div className="d-flex gap-10 align-items-center">
        <div>
            <h6>Tablette</h6>
            <p>10 Items</p>
        </div>
        <img className="fixed-size" src="https://p2-ofp.static.pub/fes/cms/2021/10/28/juqs65pgl1gh3dysi7yv1tnvtsiqva364946.png" alt="camera"/>
    </div>
</div>

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
      

      
      <Container class1="blog-wrapper py-5 home-wrapper-2">

<div className="row">
  <div className='col-12'>
    <h3 className='section-heading'>Our latest Blogs</h3>
  </div>


</div>
<div className='row'>
{blogState && blogState?.map((item, index)=>{
                    if (index<4){
                      return(
                        <div className='col-3 ' key={index}> 
                        <BlogCard id={item?._id} 
                        title={item?.title} 
                        description={item?.description} 
                        image={item?.images[0]?.url}
                        data={moment(item?.createdAt).format("MMMM Do YYYY, h:mm a")}
                        />
                        </div>
     
                      );
                    }
                  })}
</div>

</Container>
    </>
  );
};

export default Home;