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
      <NavLink className="nav-profile" to="/profile">
        Profile
      </NavLink>
    </nav>
  );
};

export default Header;
