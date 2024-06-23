import React, { useEffect, useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import ReactStars from "react-rating-stars-component";
import ProductCard from '../components/ProductCard';
import Color from '../components/Color';
import Container from '../components/Container'
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from '../features/products/productSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faThLarge, faTh, faThList, faBars } from '@fortawesome/free-solid-svg-icons';




const OurStore = () => {
  const [grid,setGrid]=useState(4);
  const productState=useSelector((state)=>state?.product?.product);
  console.log(productState);
  const dispatch=useDispatch();

const [brands,setBrands]=useState([]);
const [categories, setCategories]=useState([])
const [tags, setTags]=useState([]);
const [colors, setColors]=useState([]);


//Filter states
const [brand,setBrand]=useState(null);
const [color, setColor]=useState(null);
const [category, setCategory]=useState(null)
const [tag, setTag]=useState(null);
const [minPrice,setMinPrice]=useState(null);
const [maxPrice,setMaxPrice]=useState(null);
const [sort,setSort]=useState(null);

useEffect(()=>{
  let newBrands=[];
  let category=[];
  let newtags=[];
  let newColors=[];
    for (let index = 0; index < productState.length; index++) {
    const element = productState[index];
    newBrands.push(element.brand) 
    category.push(element.category)
    newtags.push(element.tags)
    newColors.push(element.color)
  }
  setBrands(newBrands)
  setCategories(category)
  setTags(newtags)
},[productState])
console.log("hello");
console.log([...new Set(brands)],[...new Set(categories)],[...new Set(tags)]);


 useEffect(()=>{
  getProducts();
 }, [sort,tag,brand,category,minPrice,maxPrice])
  const getProducts=()=>{
    dispatch(getAllProducts({sort,tag,brand,category,minPrice,maxPrice}));
  };



  return (
    <>
    <BreadCrumb title="Our store "/>
    <Container class1='store-wrapper home-wrapper-2 py-5'>
    
        <div className='row'>
        <div className="col-3">
          <div className="filter-card mb-3">
            <h3 className="filter-title">Shop By Categories</h3>
              <div>
                <ul className="ps-0">
                  {
                    categories && [...new Set(categories)].map((item, index)=>{
                      return <li key={index} onClick={()=> setCategory(item)} >{item}</li>
                    })
                  }
                </ul>
              </div>
            </div>
          <div className="filter-card mb-3">
            <h3 className="filter-title">Filter By</h3>
            <div>  
              <h5 className='sub-title'>Availability</h5>
              <div>
              <div class="form-check">
                <input className="form-check-input" type="checkbox" value="" id=""/>
                <label className="form-check-label" htmlfor="">
                In Stock
                </label>
                </div>
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="" checked/>
                <label className="form-check-label" htmlfor="">
                out of stock
                </label>
                </div>
            </div>
            <h5 className='sub-title'>Price</h5>
            <div className='d-flex align-items-center gap-10'>
                  <div className="form-floating mb-3">
                  <input
                  type="number"
                  className="form-control"
                  id="floatingInput"
                  placeholder="From"
                  onChange={(e)=>setMinPrice(e.target.value)}
                  />
                  <label htmlFor="floatingInput">From</label>
                  </div>
                  <div className="form-floating mb-3">
                  <input
                  type="number"
                  className="form-control"
                  id="floatingInput1"
                  placeholder="To"
                  onChange={(e)=>setMaxPrice(e.target.value)}

                  />
                  <label htmlFor="floatingInput1">To</label>
                  </div>
                  </div>
            
                <div>
                <div className="form-check">
                <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="color-1"
                />
                <label className="form-check-label" html For="color-1">
                S (2)
                </label>
                </div>
                <div className="form-check">
                <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="color-2"
                />
                <label className="form-check-label" html For="color-2">
                M (2)
                </label>
                </div>
                </div>
          </div>
          </div>
          <div className="filter-card mb-3">
          <h3 className="filter-title">Product Tags</h3>
            <div>
              <div className="product-tags d-flex flex-wrap align-items-center gap-10">
              {
                    tags && [...new Set(tags)].map((item, index)=>{
                      return ( <span onClick={()=>setTag(item)} key={index} className="badge bg-light text-secondary rounded-3 py-2 px-3">
                        {item}
                        </span>)
                    })
                  }
               
              </div>
            </div>
            </div>
            <div className="filter-card mb-3">
          <h3 className="filter-title">Product Brands</h3>
            <div>
              <div className="product-tags d-flex flex-wrap align-items-center gap-10">
              {
                    brands && [...new Set(brands)].map((item, index)=>{
                      return ( <span onClick={()=>setBrand(item)} key={index} className="badge bg-light text-secondary rounded-3 py-2 px-3">
                        {item}
                        </span>)
                    })
                  }
               
              </div>
            </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Random Product</h3>
              <div>
                  <div className="randon-products d-flex">
                    <div className="w-50">
                        <img
                        src="https://sh0pcart.netlify.app/images/watch.jpg"
                        className="img-fluid"
                        alt="watch"
                        />
                      </div>
                      <div className="w-50">
                      <h5>Kids headphones bulk 10 pack multi colored for students
                      </h5>
                      <ReactStars count={5} size={24} value="3" edit={false} activeColor="#ffd700" />
                      <b>$300</b>
                      </div>
                    </div>
                    <div className="randon-products d-flex">
                    <div className="w-50">
                        <img
                        src="https://sh0pcart.netlify.app/images/watch.jpg"
                        className="img-fluid"
                        alt="watch"
                        />
                      </div>
                      <div className="w-50">
                      <h5>Kids headphones bulk 10 pack multi colored for students
                      </h5>
                      <ReactStars count={5} size={24} value="4" edit={false} activeColor="#ffd700" />
                      <b>$300</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-9">
                <div className="filter-sort-grid mb-4">
                  <div className='d-flex justify-content-between align-items-center'>
                  <div className="d-flex align-items-center gap-10">
                    <p className="mb-0 d-block" style={{"width":"100px"}}>Sort By:</p>
                    <select 
                    name=""
                     defaultValue={"DEFAULT"} 
                     className="form-control form-select" 
                     id=""
                     onChange={(e)=>setSort(e.target.value)}
                     >
                    
                    <option value="title">Alphabetically, A-Z</option>
                    <option value="-title">
                    Alphabetically, Z-A
                    </option>
                    <option value="price">Price, low to high</option>
                    <option value="-price">Price, high to low</option>
                    <option value="createdAt">Date, old to new</option>
                    <option value="-createdAt">Date, new to old</option>
                    </select>
                    </div>
                    <div className="d-flex align-items-center justify-space-between gap-10 container">
      <p className="totalproducts">21 Products</p>
      <div className="d-flex gap-10 align-items-center grid-icons">
        <FontAwesomeIcon
          onClick={() => { setGrid(4); }}
          icon={faTh}
          className="grid-icon"
          alt="grid 4"
        />
        <FontAwesomeIcon
          onClick={() => { setGrid(3); }}
          icon={faThLarge}
          className="grid-icon"
          alt="grid 3"
        />
        <FontAwesomeIcon
          onClick={() => { setGrid(6); }}
          icon={faThList}
          className="grid-icon"
          alt="grid 6"
        />
        <FontAwesomeIcon
          onClick={() => { setGrid(12); }}
          icon={faBars}
          className="grid-icon"
          alt="grid 12"
        />
      </div>
    </div>
                  </div>
             
                </div>
                <div>
                  <div className='products-lisr pd-5'>
                    <div className='d-flex gap-10 flex-wrap'>
                    <ProductCard data={productState ? productState : []} grid={grid}/>
                    </div>
                  </div>


                </div>
                </div>
             </div>
            
  </Container>
</>
  )
}
export default OurStore;
