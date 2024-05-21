import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'

const Wishlist = () => {
  return (
   <>
    <BreadCrumb title="Wishlist" />
<Container class1="wishlist-wrapper home-wrapper-2 py-5">
<div className="row">
<div className="col-3">
<div className="wishlist-card position-relative">
<img
src="images/images/cross.svg"
alt="cross"
className="position-absolute cross img-fluid"
style={{ visibility: 'hidden' }}

/>
<div className="wishlist-card-image">
<img
src="images/images/watch.jpg"
className="img-fluid w-100"
alt="watch"
/>
</div>
<div className='py-3 px-3'>
<h5 className="title"> honor t1 è.2.3 ram 5 with wifi+5g tablet</h5>
<h6 className="price">$ 100</h6>
</div>
</div>
</div>
<div className="col-3">
<div className="wishlist-card position-relative">
<img
src="images/images/cross.svg"
alt="cross"
className="position-absolute cross img-fluid"
style={{ visibility: 'hidden' }}

/>
<div className="wishlist-card-image">
<img
src="images/images/watch.jpg"
className="img-fluid w-100"
alt="watch"
/>
</div>
<div className='py-3 px-3'>
<h5 className="title"> honor t1 è.2.3 ram 5 with wifi+5g tablet</h5>
<h6 className="price">$ 100</h6>
</div>
</div>
</div>
<div className="col-3">
<div className="wishlist-card position-relative">
<img
src="images/images/cross.svg"
alt="cross"
className="position-absolute cross img-fluid"
style={{ visibility: 'hidden' }}

/>
<div className="wishlist-card-image">
<img
src="images/images/watch.jpg"
className="img-fluid w-100"
alt="watch"
/>
</div>
<div className='py-3 px-3'>
<h5 className="title"> honor t1 è.2.3 ram 5 with wifi+5g tablet</h5>
<h6 className="price">$ 100</h6>
</div>
</div>
</div>
</div>

</Container>
   </>

  )
}

export default Wishlist