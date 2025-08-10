import React from "react";
import { useNavigate } from "react-router-dom";
import { NewPost } from "../../services/NewPost";
import { useState } from "react";

const Posts = ({createPost}) => {
  const initialState = { title: '', description: '', img: '' }

  let navigate = useNavigate()
  const [post, setPost] = useState(initialState)

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await NewPost(post)
    console.log(payload)
    setPost(initialState)
    navigate('/:posts')
  }

  if(createPost){
    return(
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" value={post.title} onChange={handleChange}
          placeholder="Title"/>
          <input type="text" name="description" value={post.description} onChange={handleChange}
          placeholder="Description"/>
          <input type="text" name="img" value={post.img} onChange={handleChange}
          placeholder="Image"/>
          <button type="submit">Create Post</button>
        </form>
      </div>
    )
  }


  return <div>

    create Posts
    </div>;

};

export default Posts;
