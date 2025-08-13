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
      await deleteTracked(user.id, { symbol })
      setDeleteT(!deleteT)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTrackedLists()
  }, [deleteT])

  return (
    <div className="tracked-container">
      {trackedStockes.map((el) => (
        <div key={el._id} className="post-card tracked-card">
          <div className="tracked-header">
            <h3>{el.symbol}</h3>
            <button onClick={() => handleDelete(el.symbol)}>Untrack</button>
          </div>
          <div className="tracked-body">
            <p><strong>Company:</strong> {el.company}</p>
            <p><strong>Price:</strong> ${parseFloat(el.price).toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TrackedLists
