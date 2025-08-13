import React from "react";
import { NavLink } from "react-router-dom";
const DropDown = ({ user, handleLogOut }) => {
  return (
    <div className="dropdown">
      <img
        src={`http://localhost:3000/public/avatars/${user.avatar}`}
        alt="nav-pic"
        className="dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{
          width: "10%",
          aspectRatio: "1/1",
          borderRadius: "50%",
          objectFit: "cover",
          cursor: "pointer",
          marginLeft: "100%",
          marginTop: "1%",
        }}
      />
      <ul className="dropdown-menu">
        <div className="dropdown-item">
          <NavLink to="/profile">Profile</NavLink>
        </div>
        <div className="dropdown-item">
          <NavLink to="/posts/upload">upload post</NavLink>
        </div>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <div className="dropdown-item">
          <NavLink onClick={handleLogOut}>Log Out</NavLink>
        </div>
        {/* <NavLink to="/profile" className="profile-nav"></NavLink> */}
      </ul>
    </div>
  );
};

export default DropDown;
