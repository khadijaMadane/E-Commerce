import React from "react";
import { NavLink, Link } from "react-router-dom";
import { BsSearch } from 'react-icons/bs';
import { FaExchangeAlt, FaHeart, FaUser, FaShoppingCart } from 'react-icons/fa'; // Importing Font Awesome icons

const Header = () => {
  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">
                Free Shipping Over $100 & Free Returns
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Hotline:
                <a className="text-white" href="tel:+91 8264954234">
                  +91 8264954234
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>

      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items.center">
            <div className="col-2">
              <h2>
                <Link className="text-white" to="/">Dev Corner</Link>
              </h2>
            </div>
            <div className="col-5">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control py-2 "
                  placeholder="Search Product Here..."
                  aria-label="Search Product Here..."
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-6" />
                </span>
              </div>
            </div>
            <div className="col-5">
            <div className="header-upper-links d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-10">
            <Link className="text-white" to="/compare-product">
              <div className="d-flex align-items-center">
                <FaExchangeAlt className="text-white" size={30} /> {/* Increase size to 30 */}
                <div style={{ marginLeft: '5px' }}> {/* Add margin */}
                  <p className="text-white mb-0">Compare <br />Products</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="d-flex align-items-center gap-10">
            <Link className="text-white" to="/wishlist">
              <div className="d-flex align-items-center">
                <FaHeart className="text-white" size={30} /> {/* Increase size to 30 */}
                <div style={{ marginLeft: '5px' }}> {/* Add margin */}
                  <p className="text-white mb-0">Favourite <br />Wishlist</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="d-flex align-items-center gap-10">
            <Link className="text-white" to="/login">
              <div className="d-flex align-items-center">
                <FaUser className="text-white" size={30} /> {/* Increase size to 30 */}
                <div style={{ marginLeft: '5px' }}> {/* Add margin */}
                  <p className="text-white mb-0">Log in <br />My Account</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="d-flex align-items-center gap-10">
            <Link className="text-white" to="/cart">
              <div className="d-flex align-items-center">
                <FaShoppingCart className="text-white" size={30} /> {/* Increase size to 30 */}
                <div style={{ marginLeft: '5px' }}> {/* Add margin */}
                  <div className="d-flex flex-column gap-10">
                    <span className="badge bg-white text-dark">0</span>
                    <p className="text-white mb-0">$200</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
        <div className="row">
        <div className="col-12">
        <div className="menu-bottom d-flex align-items-center gap-30">
        <div>
                    <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="images/images/menu.svg" alt="" />
              <span className="me-5 d-inline-block">Shop Categorie</span>

             </button>
             <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><NavLink className="dropdown-item text-white" to="">Action</NavLink></li>
                      <li><NavLink className="dropdown-item text-white" to="">Another action</NavLink></li>
                      <li><NavLink className="dropdown-item text-white" to="">Something else here</NavLink></li>
                    </ul>

            </div>
        </div>
        <div className="menu-links">
        <div className="d-flex align-items-center gap-15">
        <NavLink  to="/">Home</NavLink>
        <NavLink to="/product">Our Store</NavLink>
        <NavLink to="/blogs">Blogs</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
</header>
    </>
  );
};

export default Header;
