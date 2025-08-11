import { useEffect, useState } from 'react'
import axios from 'axios'
import './Logs.css'

const Logs = ({ users }) => {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/transactions/user/${users._id}`
        )
        setTransactions(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    if (users?._id) fetchLogs()
  }, [users])

  return (
    <div className="logs-container">
      {transactions.map((t) => (
        <div key={t._id} className="log-card">
          <h4>{t.symbol}</h4>
          <p>Type: {t.type}</p>
          <p>Quantity: {t.quantity}</p>
          <p>Price: ${t.actionPrice}</p>
          <p className="log-date">{new Date(t.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  )
}

export default Logs
