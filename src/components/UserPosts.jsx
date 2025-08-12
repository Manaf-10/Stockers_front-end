import { useEffect, useState } from 'react'
// import { NewPost } from '../services/NewPost'
import { GetPosts } from '../services/GetPost'
import './post.css'

const UserPosts = ({ user }) => {
  // const initialState = { title: '', description: '', img: '' }

  // const [post, setPost] = useState(initialState)
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

  // const handleChange = (e) => {
  //   if (e.target.name === 'img') {
  //     setPost({ ...post, img: e.target.files[0] })
  //   } else {
  //     setPost({ ...post, [e.target.name]: e.target.value })
  //   }
  // }

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   console.log(user.id)
  //   const formData = new FormData()
  //   formData.append('title', post.title)
  //   formData.append('description', post.description)
  //   formData.append('img', post.img)
  //   formData.append('owner', user.id)

  //   const payload = await NewPost(formData)
  //   console.log(payload)
  //   setPost(initialState)
  //   const updatedPosts = await GetPosts()
  //   setPosts(updatedPosts)
  // }
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
