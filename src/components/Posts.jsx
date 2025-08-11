import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NewPost } from '../services/NewPost'
import { GetPosts } from '../services/GetPost'

import axios from 'axios'

const Posts = ({ user }) => {
  const initialState = { title: '', description: '', img: '' }
  // let navigate = useNavigate()
  
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
    setPost({ ...post, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await NewPost(post)
    console.log(payload)
    setPost(initialState)
    const updatedPosts = await GetPosts() 
    setPosts(updatedPosts)
  }
  console.log(user)
    if (localStorage.getItem("token")) {
    return (
      <>
      <div className='container'>
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
            type="text"
            name={'img'}
            placeholder={'image'}
            value={post.img}
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

      <h1>posts:</h1>
      {posts.map((po) => (
        <div key={po._id}>
          <h3>title: {po.title}</h3>
          <p>img: {po.img}</p>
          <p>description: {po.description}</p>
        </div>
      ))}

      </>
    )
  } else {
    return (
      <>
        <h3>unathorized</h3>
      </>
    )
  }

}

export default Posts
