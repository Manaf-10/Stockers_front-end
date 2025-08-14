import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GetEditPost, EditPosts, DeletePosts } from '../services/Post'

const EditPost = ({ user }) => {
  let navigate = useNavigate()
  const initialState = {
    title: '',
    description: ''
  }
  const [post, setPost] = useState()

  const { post_id } = useParams()
  console.log(post_id)

  useEffect(() => {
    const getPost = async () => {
      const res = await GetEditPost(post_id)
      console.log(res.data)
      setPost(res.data.posts)
    }
    getPost()
  }, [post_id])

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value })
  }

  const onDelete = () => {
    DeletePosts(post_id).then(() => navigate('/posts'))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await EditPosts(post_id, {
      title: post.title,
      description: post.description
    })

    setPost(initialState)

    navigate('/profile')
  }

  if (user && post) {
    return (
      <>
        <div className="upload-container">
          <h1>Edit a New Post</h1>
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

            {/* <div className="input-div">
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
            </div> */}
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
            <br /><br />
          <button className="b-in" type="delete" onClick={onDelete}>
              Delete
            </button>
          </form>
        </div>
      </>
    )
  } else return <h3>unathorized</h3>
}

export default EditPost
