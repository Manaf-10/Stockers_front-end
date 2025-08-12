import { useEffect, useState } from 'react'
// import { NewPost } from '../services/NewPost'
import { userPosts } from '../services/GetPost'
import './post.css'

const UserPosts = ({ user }) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await userPosts(user.id)
        console.log(data)
        setPosts(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [])
  console.log(posts)
  console.log(user.id)

  if (user.id !== posts.map((post)=>(post.owner)) ) {
    return (
      <>
        <h1>Posts:</h1>
        <div className="posts-list">
          {posts
            .filter((posts) => posts.owner === user.id)
            .map((posts) => (
              <div key={posts._id} className="post-card">
                {posts.img && (
                  <img
                    src={`http://localhost:3000/public/posts/${posts.img}`}
                    alt={posts.title}
                  />
                )}
                <h3>{posts.title}</h3>
                <p>{posts.description}</p>
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
