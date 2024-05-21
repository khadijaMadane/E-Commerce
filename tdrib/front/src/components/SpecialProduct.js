import React from 'react';
import ReactStars from "react-rating-stars-component";
import {Link} from"react-router-dom";
const SpecialProduct = () => {
return(
<div className="col-5 mb-3">
    <div className="special-product-card">
        <div className="d-flex justify-content-between">
            <div>
                <img src="images/images/watch.jpg" className="img-fluid" alt="watch" />
            </div>
            <div className="special-product-content">
                <h5 className="brand">Havels</h5>
                <h6 className="title">
                Samsung Galaxy Note10+ Mobile Phone; Sim...
                </h6>
                <ReactStars
                    count={5}
                    size={24}
                    value="3"
                    edit={false}
                    activeColor="#ffd700"
                />
                <p className="price">
                <span className="red-p">$100</span> &nbsp; <strike>$200</strike>
                </p>
                <div className="discount-till">
                    <p>
                        <b>5 days</b>
                    </p>
<div className="d-flex gap-10 align-items-center">
<span className="badge rounded-circle p-3 bg-danger">1</span>:
<span className="badge rounded-circle p-3 bg-danger">1</span>:
<span className="badge rounded-circle p-3 bg-danger">1</span>
</div>
</div>
<div className="prod-count mt-5">
    <div>
        <button className='button'>Add to Cart</button>
    </div>
</div>
</div>
</div>
</div>
</div>
  )
}

export default SpecialProduct