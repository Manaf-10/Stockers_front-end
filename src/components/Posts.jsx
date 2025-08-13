import { useEffect, useState } from 'react'
import { GetPosts } from '../services/Post'
import './post.css'

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
  console.log(posts)

  if (user) {
    return (
      <>
        <h1>Posts:</h1>
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



{/* <div className="container">
          <h1>Add A New post Listing</h1>
          <form className="c" onSubmit={handleSubmit}>
            <input
              type="text"
              name={"title"}
              placeholder={"title"}
              value={post.title}
              onChange={handleChange}
            />
            <input
              type="file"
              name={"img"}
              placeholder={"image"}
              onChange={handleChange}
            />
            <textarea
              name={"description"}
              placeholder={"description"}
              value={post.description}
              onChange={handleChange}
              className="text-area"
              cols="30"
              rows="10"
              autoComplete="off"
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        </div> */}