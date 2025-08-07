import React, { use } from "react";
import Posts from "./Posts";

const Profile = () => {
  const user = {
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2vwpeB612sSjtIA83YBXcCSX-YBG0Tv7F3Q&s",
  };
  return (
    <div className="user-profile-container">
      <div className="user-profile">
        <img src={`${user.avatar}`} alt="user-image" />
      </div>
    </div>
  );
};

export default Profile;
