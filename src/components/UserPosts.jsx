import { useEffect, useState } from "react";
import { userPosts } from "../services/Post";

const UserPosts = ({ user }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(user.id);
        const data = await userPosts(user.id);
        console.log(data);
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
        <div className="test" key={post._id}>
          <img
            src={`http://localhost:3000/public/posts/${post.img}`}
            alt="something"
          />
        </div>
      ))}
    </div>
  );
};

export default UserPosts;
