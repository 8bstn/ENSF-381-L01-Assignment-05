import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.jpg";
import "../App.css";

const Header = () => (
  <header>
    <img src={logo} alt="LMS Logo" />
    <h1>LMS - Learning Management System</h1>
    <nav style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
      <Link to="/">Home</Link>
      <Link to="/courses">Courses</Link>
      <Link to="/login">Login</Link>
    </nav>
  </header>
);

export default Header;
