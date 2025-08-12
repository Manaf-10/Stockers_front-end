import Client from './api'

export const GetPosts = async () => {
  try {
    const res = await Client.get('/posts')
    return res.data
  } catch (error) {
    throw error
  }
}

export const userPosts = async (user_id) => {
  try {
    const res = await Client.get(`/posts/user/${user_id}`)
    return res.data
  } catch (error) {
    throw error
  }
}
