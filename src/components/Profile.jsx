import React, { use } from "react";
import UserPosts from "./UserPosts";
import Listings from "./Listings";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();
  const checkPage = (something) => {
    if (something) return <UserPosts />;
    else return <Listings />;
  };
  const user = {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2vwpeB612sSjtIA83YBXcCSX-YBG0Tv7F3Q&s",
    username: "Manaf Hujari",
  };
  return (
    <div className="user-profile-container">
      <div className="user-profile">
        <img src={`${user.avatar}`} alt="user-image" />
        <div className="profile-info">
          <div className="user-name">{user.username}</div>
          <button onClick={() => navigate("/profile/edit")}>
            Edit profile
          </button>
        </div>
      </div>
      <div className="profile-lists-toggle">
        <button>Listings</button>
        <button>Logs</button>
      </div>
      {checkPage()}
    </div>
  );
};

export default Profile;
