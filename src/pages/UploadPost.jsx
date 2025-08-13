import { useState } from 'react'
import { NewPost } from '../services/Post'

const UploadPost = ({ user }) => {
  const initialState = { title: '', description: '', img: '' }

  const [post, setPost] = useState(initialState)
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
  }

  if (user) {
    return (
      <>
        <div className="container">
          <h1>Create a New Post</h1>
          <form className="c" onSubmit={handleSubmit}>
            <input
              type="text"
              name={'title'}
              placeholder={'title'}
              value={post.title}
              onChange={handleChange}
            />
            {/* ////////// you can work from here Feras :) /////////// */}
            <div className="aaaaa">
              <div className="input-group">
                <p>Browse File to upload!</p>
                <input
                  type="file"
                  name={'img'}
                  placeholder={'image'}
                  onChange={handleChange}
                  className="upLoadPhoto"
                />
              </div>
            </div>
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
      </>
    )
  } else return <h3>unathorized</h3>
}

export default UploadPost
