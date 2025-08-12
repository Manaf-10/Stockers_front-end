import { useEffect, useState } from "react";
import axios from "axios";

const Logs = ({ users }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/transactions/user/${users._id}`
        );
        setTransactions(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (users?._id) fetchLogs();
  }, [users]);

  return (
    <div className="logs-container">
      {transactions.map((transaction) => (
        <div key={transaction._id} className="log-card">
          <h4>{transaction.symbol}</h4>
          <p>Type: {transaction.type}</p>
          <p>Quantity: {transaction.quantity}</p>
          <p>Price: ${transaction.actionPrice}</p>
          <p className="log-date">
            {new Date(transaction.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Logs;
