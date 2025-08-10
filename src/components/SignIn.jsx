import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignInUser } from '../services/Auth'

const SignIn = ({ setUser }) => {
  const initialState = { email: '', password: '' }
  const [formValues, setFormValues] = useState(initialState)

  let navigate = useNavigate()

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = await SignInUser(formValues)
    setFormValues(initialState)
    setUser(payload)
    navigate('/')
  }

  return (
    <div className="background-container">
      <div className="sign-form">
        <form className="in" onSubmit={handleSubmit}>
          <h1>Sign in</h1>
          <div className="input-wrapper">
            <input
              onChange={handleChange}
              id="email"
              type="email"
              placeholder="example@example.com"
              value={formValues.username}
              required
            />
          </div>
          <div className="input-wrapper">
            <input
              placeholder="password"
              onChange={handleChange}
              type="password"
              id="password"
              value={formValues.password}
              required
            />
          </div>
          <button
            className="b-in"
            disabled={!formValues.email || !formValues.password}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignIn
