import React from "react";
import { Link } from "react-router-dom";
import "./navBarStyle.css";

const navBar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <div className="logo-text">
          <Link to="/">
            <b>M</b>utual <b>F</b>und
          </Link>
        </div>
      </div>
      <div className="menu">
        <Link to="/" className="menu-item fund-house">
          <b>F</b>und House
        </Link>
      </div>
      <div></div>
    </div>
  );
};

export default navBar;
