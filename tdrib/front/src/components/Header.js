import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from 'react-icons/bs';
import { FaExchangeAlt, FaHeart, FaUser, FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from '../features/user/userSlice'; // Assurez-vous de corriger le chemin d'importation si nécessaire

const Header = () => {
  const dispatch = useDispatch();
  const cartState = useSelector(state => state?.auth?.cartProducts);
  const authState = useSelector(state => state.auth);
  const [total, setTotal] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State local pour gérer l'état de connexion

  const navigate = useNavigate();
  useEffect(() => {
    // Vérifier si l'utilisateur est connecté en fonction de l'état Redux
    setIsLoggedIn(!!authState.user);
  }, [authState]);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum += (Number(cartState[index].quantity) * Number(cartState[index].price));
    }
    setTotal(sum);
  }, [cartState]);

  const handleLogout = () => {
    fetch('http://localhost:3000/logout', {
        method: 'POST',
        credentials: 'include', // Pour envoyer les cookies avec la requête si nécessaire
    })
    .then(response => {
        if (response.ok) {
            // Déconnexion réussie
            dispatch(logoutUser());
            localStorage.removeItem('customer');
    localStorage.removeItem('token');
            localStorage.clear(); // Optionnel : effacer les données locales si nécessaire
            dispatch({ type: 'LOGOUT_USER' }); // Dispatch d'une action de déconnexion (si vous avez un reducer global)
            setIsLoggedIn(false); // Mettre à jour l'état local de connexion
            navigate('/'); // Rediriger vers la page d'accueil après la déconnexion
        } else {
            // Gérer les erreurs si la déconnexion échoue
            console.error('Erreur lors de la déconnexion');
        }
    })
    .catch(error => {
        console.error('Erreur lors de la déconnexion', error);
    });
};

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
                <Link className="text-white" to="/">Bye & Enjoy</Link>
              </h2>
            </div>
            <div className="col-5">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control py-2"
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
                      <FaExchangeAlt className="text-white" size={30} />
                      <div style={{ marginLeft: '5px' }}>
                        <p className="text-white mb-0">Compare <br />Products</p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="d-flex align-items-center gap-10">
                  <Link className="text-white" to="/wishlist">
                    <div className="d-flex align-items-center">
                      <FaHeart className="text-white" size={30} />
                      <div style={{ marginLeft: '5px' }}>
                        <p className="text-white mb-0">Favourite <br />Wishlist</p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="d-flex align-items-center gap-10">
                  <Link className="text-white" to={authState?.user ? "/my-profile" : "/login"}>
                    <div className="d-flex align-items-center">
                      <FaUser className="text-white" size={30} />
                      <div style={{ marginLeft: '5px' }}>
                        {
                          authState?.user ? (
                            <p className="mb-0">
                              Welcome {authState.user.firstname}
                            </p>
                          ) : (
                            <p className="text-white mb-0">
                              Log in <br />My Account
                            </p>
                          )
                        }
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="d-flex align-items-center gap-10">
                  <Link className="text-white" to="/cart">
                    <div className="d-flex align-items-center">
                      <FaShoppingCart className="text-white" size={30} />
                      <div style={{ marginLeft: '5px' }}>
                        <div className="d-flex flex-column gap-10">
                          <span className="badge bg-white text-dark">{cartState?.length ? cartState.length : 0}</span>
                          <p className="text-white mb-0">$ {total ? total : 0}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                {/* Ajout du lien de déconnexion */}
                <div className="d-flex align-items-center gap-10">
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
                  <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
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
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/product">Our Store</NavLink>
                    <NavLink to="/blogs">Blogs</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    <NavLink to="/my-profile">Profile</NavLink>
                    <button className="btn btn-link text-white" onClick={handleLogout}>Logout</button>

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
