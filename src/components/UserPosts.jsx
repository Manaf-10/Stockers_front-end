import { useEffect, useState } from "react";
import { NewPost } from "../services/NewPost";
import { GetPosts } from "../services/GetPost";
import "./post.css";

const UserPosts = ({ user }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetPosts();
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
        <div className="test" key={post}>
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
