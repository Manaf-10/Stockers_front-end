import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

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
          <NavLink to="/">Home</NavLink>
          <NavLink onClick={handleLogOut}>Log Out</NavLink>
          <NavLink to="/posts">posts</NavLink>
          <NavLink to="/stocks">Stocks</NavLink>
          <NavLink to="/posts/upload">upload post</NavLink>

          <SearchBar />
          <NavLink to="/profile" className="profile-nav">
            <img
              src={`http://localhost:3000/public/avatars/${user.avatar}`}
              alt="nav-pic"
            />
          </NavLink>
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
