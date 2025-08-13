import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateProfile } from '../services/Auth'

const Edit = ({ user, handleLogOut }) => {
  // let thisUser = user.user;

  console.log(user)
  const navigate = useNavigate()

  const initialState = {
    username: user.username,
    email: user.email,
    password: '',
    confirmPassword: '',
    avatar: null
  }

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    if (e.target.name === 'avatar') {
      setFormValues({ ...formValues, avatar: e.target.files[0] })
      console.log(e.target.files[0])
    } else {
      setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }
  }
  const isDisabled = formValues.password !== formValues.confirmPassword

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('username', formValues.username)
    formData.append('email', formValues.email)
    formData.append('avatar', formValues.avatar)
    console.log(avatar)

    await updateProfile(user.id, formData)

    setFormValues(initialState)
    handleLogOut()
    navigate('/')
  }
  return (
    <div className="background-container">
      <div className="sign-form">
        <form onSubmit={handleSubmit} className="up">
          <h1>Edit Profile</h1>
          <label className="image-upload" htmlFor="avatar">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
              alt="upload avatar"
            />
          </label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            style={{ display: 'none' }}
            onChange={handleChange}
            className="img-upload"
            accept="image/*"
          />
          <div className="input-wrapper">
            <input
              name="username"
              type="text"
              placeholder={user.username}
              onChange={handleChange}
              value={formValues.username}
            />
          </div>
          <div className="input-wrapper">
            <input
              name="email"
              type="email"
              placeholder={user.email}
              onChange={handleChange}
              value={formValues.email}
              autoComplete="email"
            />
          </div>
          <div className="input-wrapper">
            <input
              placeholder="password"
              name="password"
              type="password"
              onChange={handleChange}
              value={formValues.password}
              required
              autoComplete="off"
            />
          </div>
          <div className="input-wrapper">
            <input
              placeholder="confirm password"
              name="confirmPassword"
              type="password"
              onChange={handleChange}
              value={formValues.confirmPassword}
              required
              autoComplete="off"
            />
          </div>
          <button className="b-in" disabled={isDisabled}>
            Edit
          </button>
        </form>
        <div className="error-msg"></div>
      </div>
    </div>
  )
}

export default Edit
