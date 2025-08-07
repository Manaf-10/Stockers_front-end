import Client from './api'

export const RegisterUser = async (data) => {
  try {
    const res = await Client.post('/auth/register', data)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const SignInUser = async (data) => {
  try {
    const res = await Client.post('/auth/login', data)
    return res.data.user
  } catch (error) {
    console.log(error)
  }
}

export const CheckSession = async () => {
  try {
    const res = await Client.get('/auth/session')
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const UpdatePassword = async () => {
  try {
    const res = await Client.post(`/auth/update/${user_id}`, data)
    return res.data
  } catch (error) {
    console.log(error)
  }
}
