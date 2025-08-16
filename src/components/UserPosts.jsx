import { useEffect, useState } from "react";
import { userPosts } from "../services/Post";
import { useNavigate } from "react-router-dom";

const UserPosts = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await userPosts(user.id);
        setPosts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="listings">
      {posts.map((post) => (
        <div
          className="test"
          key={post._id}
          onClick={() => navigate(`/profile/${post._id}`)}
        >
          <img
            src={`https://stockers-08633ec7dca9.herokuapp.com/public/posts/${post.img}`}
            alt="something"
          />
        </div>
      ))}
    </div>
  );
};

export default UserPosts;
