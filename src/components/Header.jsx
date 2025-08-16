import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import DropDown from "./DropDown";
const Header = ({ user, setUser }) => {
  let navigate = useNavigate();
  const handleLogOut = () => {
    setUser(null);
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav>
      {user ? (
        <>
          <div className="nav-bar-links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/posts">posts</NavLink>
            <NavLink to="/stocks">Stocks</NavLink>
          </div>

          <DropDown user={user} handleLogOut={handleLogOut} />
        </>
      ) : (
        <>
          <NavLink to="/sign-in">Sign in</NavLink>
          <NavLink to="/sign-up">Sign up</NavLink>
        </>
      )}
    </nav>
  );
};

export default Header;

