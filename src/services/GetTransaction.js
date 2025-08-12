import Client from './api'

export const GetTransaction = async () => {
  try {
    const res = await Client.get('/transactions')
    return res.data
  } catch (error) {
    throw error
  }
}
