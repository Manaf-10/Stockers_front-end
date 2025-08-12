import { useEffect, useState } from 'react'
import { GetTransaction } from '../services/GetTransaction'
import './post.css'

const Logs = ({ user }) => {
  const [Transactions, setTransactions] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetTransaction(user.id)
        setTransactions(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [])

  console.log(Transactions)

  if (user.id !== Transactions.map((Transaction) => Transaction.owner)) {
    return (
    <div className="logs-container">
      {Transactions.map((Transaction, index) => (
  <div className="log" key={index}>
    <img className={`${Transaction.type}-img`} src={'sold-icon.png'} alt={`${Transaction.symbol} icon`} />
    <div className="symbol-date">
      <div className="logs-symbol">{Transaction.symbol}</div>
      <div>{Transaction.quantity} | {Transaction.date}</div>
    </div>
    <div>{Transaction.company}</div>
    <div className="price-status">
      <div className="price">{(parseFloat(Transaction.actionPrice) * parseInt(Transaction.quantity)).toFixed(2)}</div>
      <div className={`status-${Transaction.type}`}>{Transaction.type}</div>
    </div>
  </div>
))}

    </div>
  );

  } else {
    return (
      <>
        <h3>no logs yet</h3>
      </>
    )
  }
}

export default Logs




// return (
//     <div className="logs-container">
//       {logs.map((log, index) => (
//   <div className="log" key={index}>
//     <img className={`${log.status}-img`} src={'sold-icon.png'} alt={`${log.symbol} icon`} />
//     <div className="symbol-date">
//       <div className="logs-symbol">{log.symbol}</div>
//       <div>{log.amount} | {log.date}</div>
//     </div>
//     <div>{log.company}</div>
//     <div className="price-status">
//       <div className="price">{(parseFloat(log.price) * parseInt(log.amount)).toFixed(2)}</div>
//       <div className={`status-${log.status}`}>{log.status}</div>
//     </div>
//   </div>
// ))}

//     </div>
//   );












//       return (
//       <>
//         <h1>Logs:</h1>
//         <div className="posts-list">
//           {Transactions
//             .filter((Transaction) => Transaction.owner === user.id)
//             .map((Transaction) => (
//               <div key={Transaction._id} className="post-card">
//                 {Transaction.img && (
//                   <img
//                     src={`http://localhost:3000/public/posts/${Transaction.img}`}
//                     alt={po.title}
//                   />
//                 )}
//                 <h3>{Transaction.title}</h3>
//                 <p>{Transaction.description}</p>
//               </div>
//             ))}
//         </div>
//       </>
//     )