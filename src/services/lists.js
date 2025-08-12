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

export const getTrackedList = async (userId) => {
  try {
    const response = await Client.get(`/lists/tracked/${user.id}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const getOwnedList = async (userId) => {
  try {
    const response = await Client.get(`/lists/owned/${user.id}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
