import React, { useEffect, useState } from 'react'
import axios from 'axios'

const UserPosts = ({ userId }) => {
  const [posts, setPosts] = useState([]) 

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await axios.get(`/api/posts/user/${userId}`)
        setPosts(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchUserPosts()
  }, [userId])

  return (
    <>
      {posts.length > 0 ? (
        Array.isArray(posts) && posts.map(post => (
          <div key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
          </div>
        ))
      ) : (
        <h4>No posts yet</h4>
      )}
    </>
  )
}

export default UserPosts































































































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