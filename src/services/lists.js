import Client from './api'

export const addToOwnedList = async (userId, stock) => {
  try {
    const res = await Client.post(`/lists/owned/${userId}`, stock)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const addToTrackedList = async (userId, stock) => {
  try {
    const res = await Client.post(`/lists/tracked/${userId}`, stock)
    return res
  } catch (error) {
    console.log(error)
  }
}
