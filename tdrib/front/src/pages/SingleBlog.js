import React from 'react';
import { Link } from 'react-router-dom'; // Assurez-vous d'importer Link si vous utilisez react-router-dom
import BreadCrumb from '../components/BreadCrumb';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import Container from '../components/Container'

const SingleBlog = () => {
  return (
    <>
      <BreadCrumb title="Dynamic Blog Name" />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
          <div className="row">
            <div className="col-12">
              <div className="single-blog-card">
                <Link to="/blogs" className='d-flex align-items-center gap-10'>
                  <HiOutlineArrowLeft className='fs-4'/>
                  Go back to blogs
                </Link>
                <h3 className="title">
                  A Beautiful Sunday Morning Renaissance
                </h3>
                <img src="images/images/blog-1.jpg" className='img-fluid w-100 my-4' alt="blog"/>
                <p>La Maude est un phénomène naturel spectaculaire qui se 
                  produit dans certaines régions du monde pendant les mois d'automne. 
                  C'est un événement météorologique fascinant qui attire l'attention
                  des observateurs du ciel et des amateurs de nature. </p>
              </div>
            </div>
          </div>
       
      </Container>
    </>
  );
};

export default SingleBlog;
