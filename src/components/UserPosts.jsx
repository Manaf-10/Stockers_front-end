import { useEffect, useState } from 'react'
// import { userPosts } from '../services/GetPost'
import './post.css'

const UserPosts = ({ user }) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const data = await userPosts(user.id)
    //     setPosts(data)
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };
    // fetchData();
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

export default UserPosts

