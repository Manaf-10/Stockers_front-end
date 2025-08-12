import { useState, useEffect } from 'react'
import { getOwnedList } from '../services/lists'

const OwnedLists = ({ user }) => {
  const [ownedStockes, setownedStock] = useState([])
  const fetchOwnedLists = async () => {
    const owned = await getOwnedList(user.id)
    setownedStock(owned)
  }
  useEffect(() => {
    fetchOwnedLists()
  }, [])
  return (
    <>
      {ownedStockes.map((el) => (
        <div key={el._id} className="post-card">
          <h3>{el.symbol}</h3>
          <h3>{el.company}</h3>
          <h3>{el.price}</h3>
        </div>
      ))}
    </>
  )
}
export default OwnedLists
