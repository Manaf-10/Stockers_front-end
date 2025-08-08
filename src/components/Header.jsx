import React from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/posts">posts</NavLink>
      <NavLink to="/sign-in">Sign in</NavLink>
      <NavLink to="/sign-up">Sign up</NavLink>
      <NavLink to="/stocks-lists">Stocks</NavLink>
      <input type="text" className="search-bar" placeholder=" 🔍 Search"/>
      <NavLink className="nav-profile" to="/profile">
        Profile
      </NavLink>
    </nav>
  );
};

export default Header;
