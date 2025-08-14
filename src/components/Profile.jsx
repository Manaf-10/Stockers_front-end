import { useState } from "react";
import UserPosts from "./UserPosts";
import Logs from "./Logs";
import { useNavigate } from "react-router-dom";
import OwnedLists from "./OwnedLists";
import TrackedLists from "./trackedLists";
const Profile = ({ user }) => {
  const navigate = useNavigate();
  const [page, setpage] = useState("Posts");
  const renderPage = (e) => {
    switch (page) {
      case "Posts":
        return <UserPosts user={user} />;
      case "Logs":
        return <Logs user={user} />;
      case "Tracked":
        return <TrackedLists user={user}/>
      case "Owned":
      return <OwnedLists user={user}/>  
    }
  };
  

  const changePage = (e) => {
    setpage(e.target.innerText);
  };

  return user ? (
    <>
      <div className="user-profile-container">
        <div className="user-profile">
          <img
            src={`http://localhost:3000/public/avatars/${user.avatar}`}
            alt="user-image"
          />
          <div className="profile-info">
            <div className="user-name">{user.username}</div>
            <button onClick={() => navigate("/profile/edit")}>
              Edit profile
            </button>
          </div>
        </div>
        <div className="profile-lists-toggle">
          <button onClick={changePage}>Posts</button>
          <button onClick={changePage}>Logs</button>
          <button onClick={changePage}>Owned</button>
          <button onClick={changePage}>Tracked</button>

        </div>
        {renderPage()}
      </div>
    </>
  ) : (
    <h4>loading...</h4>
  );
};

export default Profile;
