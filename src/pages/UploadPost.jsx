import React from 'react'
import styled from 'styled-components'
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
        <div className="upload-container">
          <h1>Create a New Post</h1>
          <form className="sign-form" onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <input
                type="text"
                name={'title'}
                placeholder={'title'}
                value={post.title}
                onChange={handleChange}
              />
              <span className="icon"></span>
            </div>
            {/* ////////// you can work from here Feras :) /////////// */}
            <div className="input-div">
              <input
                type="file"
                name={'img'}
                onChange={handleChange}
                className="input"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                strokeLinejoin="round"
                strokeLinecap="round"
                viewBox="0 0 24 24"
                strokeWidth={2}
                fill="none"
                stroke="currentColor"
                className="icon"
              >
                <polyline points="16 16 12 12 8 16" />
                <line y2={21} x2={12} y1={12} x1={12} />
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                <polyline points="16 16 12 12 8 16" />
              </svg>
            </div>
            <textarea
              name={'description'}
              placeholder={'description'}
              value={post.description}
              onChange={handleChange}
              className="input-wrapper"
              cols="30"
              rows="10"
              autoComplete="off"
            ></textarea>
            <button className="b-in" type="submit">
              Submit
            </button>
          </form>
        </div>
      </>
    )
  } else return <h3>unathorized</h3>
}

export default UploadPost
