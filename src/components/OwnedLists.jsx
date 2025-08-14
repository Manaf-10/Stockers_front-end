import { useState, useEffect } from 'react'
import { getOwnedList, deleteOwned } from '../services/lists'
import { createTransaction } from '../services/transaction'

const OwnedLists = ({ user }) => {
  const [ownedStockes, setownedStock] = useState([])
  const [deleteO, setDeleteO] = useState(false)

  const fetchOwnedLists = async () => {
    const owned = await getOwnedList(user.id)
    setownedStock(owned)
  }
  const handleDelete = async (stock) => {
    try {
      console.log(stock)
      const res = await deleteOwned(user.id, {
        symbol: stock.symbol
      })
      const transaction = await createTransaction(user.id, {
        symbol: stock.symbol,
        company: stock.company,
        type: 'sell',
        actionPrice: stock.price,
        quantity: 1
      })
      setDeleteO(!deleteO)
    } catch (error) {
      console.log(error)
    }
  }
  

  useEffect(() => {
    fetchOwnedLists()
  }, [deleteO])
  return (
    <>
      {ownedStockes.map((el) => (
        <div key={el._id} className="owned-card">
          <h3>{el.symbol}</h3>
          <h3>{el.company}</h3>
          <h3>{el.price}</h3>
          <button
            onClick={() => {
              handleDelete(el)
            }}
          >
            SELL
          </button>
        </div>
      ))}
    </>
  )
}
export default OwnedLists
