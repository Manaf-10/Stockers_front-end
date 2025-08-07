import React from "react";
import logs from "./logslist";
const Logs = () => {
  return (
    <div className="logs-container">
      {logs.map((log, index) => (
  <div className="log" key={index}>
    <img className={`${log.status}-img`} src={'sold-icon.png'} alt={`${log.symbol} icon`} />
    <div className="symbol-date">
      <div className="logs-symbol">{log.symbol}</div>
      <div>{log.amount} | {log.date}</div>
    </div>
    <div>{log.company}</div>
    <div className="price-status">
      <div className="price">{(parseFloat(log.price) * parseInt(log.amount)).toFixed(2)}</div>
      <div className={`status-${log.status}`}>{log.status}</div>
    </div>
  </div>
))}

    </div>
  );
};

export default Logs;
