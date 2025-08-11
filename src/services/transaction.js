import Client from './api'

export const createTransaction = async (userId, transactionData) => {
  try {
    const res = await Client.post(`/transactions/${userId}`, transactionData)
    return res
  } catch (error) {
    console.log(error)
  }
}
