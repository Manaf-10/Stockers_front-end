import React from "react";
import stockList from './stocksList.json';

const formatNumber = (num) => {
  if (num >= 1_000_000_000_000) {
    return (num / 1_000_000_000_000).toFixed(2) + "T";
  } else if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(2) + "B";
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(2) + "M";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(2) + "K";
  } else {
    return num.toString();
  }
};


const StockLists = () => {
  return (
    <div className="stocks-list-container">
      <h2>All stocks</h2>
      {stockList.data.map((stock) => {
        const change = stock.price.change;
        let changeColor = "";

        if (change > 0) {
          changeColor = "#06806b"; 
        } else if (change < 0) {
          changeColor = "#cc2f3c"; 
        } else {
          changeColor = "#707070"; 
        }

        return (
          <div className="stock-box" key={stock.symbol}>
            <div className="stock-img">
              <img src="google_icon.png" alt={`${stock.symbol} image`} />
            </div>
            <div className="stock-symbol">{stock.symbol}</div>
            <div className="stock-price">
              {stock.price.current.toFixed(2)}
            </div>
            <div className="stock-currency">{stock.market.currency}</div>
            <div
              className="stock-change"
              style={{ color: changeColor }}
            >
              {change}%
            </div>
            <div className="stock-volume">
              {formatNumber(stock.price.volume)}
            </div>
            <div className="stock-market-cap">
              {formatNumber(stock.market.marketCap)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StockLists;
