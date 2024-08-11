import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CartWidget from './CartWidget';



  const NavBar = () => {

    const [categories, setCategories] = useState([]);


    useEffect(() => {
      const fetchCategories = () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              { id: 'ps5', name: 'Juegos PS5' },
              { id: 'switch', name: 'Juegos de Nintendo Switch' }
            ]);
          }, 1000);
        });
      };
  
      fetchCategories().then(data => setCategories(data));
    }, []);


    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to={'/'} className="navbar-brand">Ivan Store</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to={'/'} className="nav-link">Productos</Link>
              </li>
              <li className="nav-item">
                <Link to={'/category/ps5'} className="nav-link">Juegos PS5</Link>
              </li>
              <li className="nav-item">
                <Link to={'./category/switch'} className="nav-link">Juegos de Nintendo Switch</Link>
              </li>
              
            </ul>
            <CartWidget />
          </div>
        </div>
      </nav>
    );
  };
  export default NavBar;