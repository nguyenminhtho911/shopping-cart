import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "./DataProvider";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const { cart } = useContext(DataContext);

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const styleMenu = {
    left: menu ? 0 : "-100%",
  };

  return (
    <header className="container">
      <div className="menu" onClick={toggleMenu}>
        <i className="fas fa-bars"></i>
      </div>

      <div className="logo">
        <h1>
          <Link to="/">Store</Link>
        </h1>
      </div>
      <ul style={styleMenu}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/login">Login / Register</Link>
        </li>
        <li onClick={toggleMenu} className="menu">
          <i className="fas fa-times"></i>
        </li>
      </ul>

      <div className="cart-icon">
        <span>{cart.length}</span>
        <Link to="/cart">
          <i className="fas fa-shopping-cart"></i>
        </Link>
      </div>
    </header>
  );
};

export default Header;
