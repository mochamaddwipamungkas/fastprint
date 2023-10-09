import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light px-5">
      <div className="d-flex justify-content-start ">
        <span className="navbar-brand mb-0 h1">FsatPrint</span>

        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to={"/"} className="nav-link active ms-5" aria-current="page">
              Data Produk
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
