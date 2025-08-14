import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetPosts } from "../services/Post";

const Posts = ({ user }) => {
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

  if (user) {
    return (
      <>
        <div className="posts-list">
          {posts.map((post) => (
            <div key={post._id} className="post-card">
              {post.img && (
                <img
                  src={`http://localhost:3000/public/posts/${post.img}`}
                  alt={post.title}
                />
              )}
              <div className="post-details">
                <div className="post-owner">
                  <img
                    src={`http://localhost:3000/public/avatars/${post.owner.avatar}`}
                    alt={`${post.owner.username} avatar`}
                  />
                  <p>{`${post.owner.username}`}</p>
                </div>
                <div className="post-text">
                  <p>{post.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  } else {
    return (
      <>
        <h3>No Postes</h3>
      </>
    );
  }
};

export default Posts;
