import { useEffect, useState } from 'react'
import { NewPost } from '../services/NewPost'
import { GetPosts } from '../services/GetPost'
import './post.css'

const UserPosts = ({ user }) => {
  const initialState = { title: '', description: '', img: '' }

  const [post, setPost] = useState(initialState)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetPosts()
        setPosts(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [])

  const handleChange = (e) => {
    if (e.target.name === 'img') {
      setPost({ ...post, img: e.target.files[0] })
    } else {
      setPost({ ...post, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(user.id)
    const formData = new FormData()
    formData.append('title', post.title)
    formData.append('description', post.description)
    formData.append('img', post.img)
    formData.append('owner', user.id)

    const payload = await NewPost(formData)
    console.log(payload)
    setPost(initialState)
    const updatedPosts = await GetPosts()
    setPosts(updatedPosts)
  }
  console.log(posts)
  console.log(user.id)

  if (user.id !== posts.map((x)=>(x.owner)) ) {
    return (
      <>
        <h1>Posts:</h1>
        <div className="posts-list">
          {posts
            .filter((po) => po.owner === user.id)
            .map((po) => (
              <div key={po._id} className="post-card">
                {po.img && (
                  <img
                    src={`http://localhost:3000/public/posts/${po.img}`}
                    alt={po.title}
                  />
                )}
                <h3>{po.title}</h3>
                <p>{po.description}</p>
              </div>
            ))}
        </div>
      </>
    )
  } else {
    return (
      <>
        <h3>no posts yet</h3>
      </>
    )
  }
}

export default UserPosts

// import React, { useEffect, useState } from 'react';
// import { GetPosts } from '../services/GetPost'
// import axios from 'axios';

// const UserPosts = ({ user }) => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     if (user?._id) {
//       const fetchPosts = async () => {
//         try {
//           const res = await GetPosts()
//           console.log(res)
//           setPosts(res.data);
//         } catch (err) {
//           console.error(err);
//         }
//       };
//       fetchPosts();
//     }
//   }, [user]);

//   if (!posts.length) return <h4>No posts found</h4>;

//   return (
//     <>
//       {posts.map((post) => (
//         <div key={post._id} style={{ border: "1px solid #ccc", margin: "1rem", padding: "1rem" }}>
//           {post.img && <img src={post.img} alt={post.title} style={{ width: "200px" }} />}
//           <h3>{post.title}</h3>
//           <p>{post.description}</p>
//         </div>
//       ))}
//     </>
//   );
// };

// export default UserPosts;

// import React, { useEffect, useState } from 'react'
// import axios from 'axios'

// const UserPosts = ({ userId }) => {
//   const [posts, setPosts] = useState([])

//   useEffect(() => {
//     const fetchUserPosts = async () => {
//       try {
//         const res = await axios.get(`/api/posts/user/${userId}`)
//         setPosts(res.data)
//       } catch (err) {
//         console.error(err)
//       }
//     }
//     fetchUserPosts()
//   }, [userId])

//   return (
//     <>
//       {posts.length > 0 ? (
//         Array.isArray(posts) && posts.map(post => (
//           <div key={post._id}>
//             <h3>{post.title}</h3>
//             <p>{post.description}</p>
//           </div>
//         ))
//       ) : (
//         <h4>No posts yet</h4>
//       )}
//     </>
//   )
// }

// export default UserPosts

//////// under line 3 //////////
// const items = Array.from({ length: 10 })
// return (
//   <div className="listings">
//     {items.map((_, index) => (
//       <div className="test" key={index}>
//         <img
//           src="https://w0.peakpx.com/wallpaper/852/116/HD-wallpaper-mahadev-lord-shiva-shiva-hindu-bhakti-devotional-god-thumbnail.jpg"
//           alt="something"
//         />
//       </div>
//     ))}
//   </div>
// )
