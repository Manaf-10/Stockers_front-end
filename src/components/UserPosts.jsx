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
            src={`http://localhost:3000/public/posts/${post.img}`}
            alt="something"
          />
        </div>
      ))}
    </div>
  );
};

<<<<<<< HEAD
export default UserPosts;
=======
export default UserPosts

>>>>>>> 6aec15f42c0e239b41a8d3e15ec6e7e987d941b9
