import { useState, useEffect } from 'react'
import { getTrackedList, deleteTracked } from '../services/lists'

const TrackedLists = ({ user }) => {
  const [trackedStockes, setTrackedStock] = useState([])
  const [deleteT, setDeleteT] = useState(false)

  const fetchTrackedLists = async () => {
    const tracked = await getTrackedList(user.id)
    setTrackedStock(tracked)
  }
  const handleDelete = async (symbol) => {
    try {
      const res = await deleteTracked(user.id, {
        symbol: symbol
      })
      setDeleteT(!deleteT)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTrackedLists()
  }, [deleteT])

  console.log(trackedStockes)
  return (
    <>
      {trackedStockes.map((el) => (
        <div key={el._id} className="post-card">
          <h3>{el.symbol}</h3>
          <h3>{el.company}</h3>
          <h3>{el.price}</h3>
          <button onClick={() => handleDelete(el.symbol)}> Un Track</button>
        </div>
      ))}
    </>
  )
}
export default TrackedLists
