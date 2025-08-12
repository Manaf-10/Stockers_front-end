import Client from './api'

export const GetTransaction = async (user_id) => {
  try {
    const res = await Client.get(`/transactions/${user_id}`)
    return res.data
  } catch (error) {
    throw error
  }
}
