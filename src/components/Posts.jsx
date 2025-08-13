import { useEffect, useState } from 'react'
import { GetPosts,NewPost } from '../services/Post'
import './post.css'

const Posts = ({ user }) => {
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
    if(e.target.name === "img"){
      setPost({...post, img: e.target.files[0]})
    }
    else{
      setPost({ ...post, [e.target.name]: e.target.value })
    }
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(user.id)
    const formData = new FormData();
    formData.append("title", post.title)
    formData.append("description", post.description)
    formData.append("img", post.img)
    formData.append("owner",user.id )

    const payload = await NewPost(formData)
    console.log(payload)
    setPost(initialState)
    const updatedPosts = await GetPosts()
    setPosts(updatedPosts)
  }
  if (user) {
    return (
      <>
        <div className="container">
          <h1>Add A New post Listing</h1>
          <form className="c" onSubmit={handleSubmit}>
            <input
              type="text"
              name={'title'}
              placeholder={'title'}
              value={post.title}
              onChange={handleChange}
            />
            <input
              type="file"
              name={'img'}
              placeholder={'image'}
              onChange={handleChange}
            />
            <textarea
              name={'description'}
              placeholder={'description'}
              value={post.description}
              onChange={handleChange}
              className="text-area"
              cols="30"
              rows="10"
              autoComplete="off"
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
        <br />
        <br />

        <h1>Posts:</h1>
        <div className="posts-list">
          {posts.map((post) => (
            <div key={post._id} className="post-card">
              {post.img && <img src={`http://localhost:3000/public/posts/${post.img}`} alt={post.title} />}
              <h3>{post.title}</h3>
              <p>{post.description}</p>
            </div>
          ))}
        </div>
      </>
    )

  } else {
    return (
      <>
        <h3>No Postes</h3>
      </>
    )
  }


}

export default Posts

