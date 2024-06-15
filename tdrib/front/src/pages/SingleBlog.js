import React  , {useEffect}from 'react';
import { Link, useLocation } from 'react-router-dom'; // Assurez-vous d'importer Link si vous utilisez react-router-dom
import BreadCrumb from '../components/BreadCrumb';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import Container from '../components/Container'
import { useDispatch, useSelector } from "react-redux";
import { getABlog } from '../features/blogs/blogSlice';

const SingleBlog = () => {
  const blogState=useSelector((state)=>state?.blog?.singleBlog);
  const dispatch=useDispatch();
const location =useLocation();
console.log(blogState?.title);
const getBlogId=location.pathname.split("/")[2];
 useEffect(()=>{
  getblog();
 }, [])
  const getblog=()=>{
    dispatch(getABlog(getBlogId));
  };
  return (
    <>
     
      <BreadCrumb title={blogState?.title} />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
          <div className="row">
            <div className="col-12">
              <div className="single-blog-card">
                <Link to="/blogs" className='d-flex align-items-center gap-10'>
                  <HiOutlineArrowLeft className='fs-4'/>
                  Go back to blogs
                </Link>
                
                <h3 className="title">
                {blogState?.title}                </h3>
                <img src={blogState?.images[0].url ? 
                  blogState?.images[0].url :"https://sh0pcart.netlify.app/images/watch.jpg"
                } 
                className='img-fluid blog-image my-4' // Apply the custom CSS class
                alt="blog"/>
                <p
          className="desc"
          dangerouslySetInnerHTML={{
            __html: blogState ?. description,
          }}
        ></p>
              </div>
            </div>
          </div>
       
      </Container>
    </>
  );
};

export default SingleBlog;
