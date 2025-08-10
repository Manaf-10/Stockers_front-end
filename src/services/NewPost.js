import Client, { BASE_URL } from './api'

export const NewPost = async (data) => {
  try {
    const res = await Client.post(`/posts/new`, data)

    return res
  } catch (error) {
    throw error
  }
}
