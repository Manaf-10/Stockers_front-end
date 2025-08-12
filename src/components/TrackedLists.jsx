import { useState, useEffect } from 'react'
import { getTrackedList } from '../services/lists'

const TrackedLists = ({ user }) => {
  const [trackedStockes, setTrackedStock] = useState([])

  const fetchTrackedLists = async () => {
    const tracked = await getTrackedList(user.id)
    setTrackedStock(tracked)
  }
  useEffect(() => {
    fetchTrackedLists()
  }, [])
  console.log(trackedStockes)
  return (
    <>
      {trackedStockes.map((el) => (
        <div key={el._id} className="post-card">
          <h3>{el.symbol}</h3>
          <h3>{el.company}</h3>
          <h3>{el.price}</h3>
        </div>
      ))}
    </>
  )
}
export default TrackedLists
