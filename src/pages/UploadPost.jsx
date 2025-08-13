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
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> 
      <path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg> <p>Browse File to upload!</p>
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
