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
        <NavLink className="drop-down-box" to="/profile">
        <div className="dropdown-item">
          Profile
        </div>
        </NavLink>
         <NavLink className="drop-down-box" to="/posts/upload">
        <div className="dropdown-item">
         upload post
        </div>
        </NavLink>
        <li>
          <hr className="dropdown-divider" />
        </li>
         <NavLink className="drop-down-box" onClick={handleLogOut}>
        <div className="dropdown-item">
         Log Out
        </div>
        </NavLink>
      </ul>
    </div>
  );
};

export default DropDown;

