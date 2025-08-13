import { useState, useEffect } from 'react'
import stockList from './stocksList.json'
import StockGraph from './StockGraph'

const formatNumber = (num) => {
  if (num >= 1_000_000_000_000) {
    return (num / 1_000_000_000_000).toFixed(2) + 'T'
  } else if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(2) + 'B'
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(2) + 'M'
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(2) + 'K'
  } else {
    return num.toString()
  }
}

const StockLists = ({ user }) => {
  const [data, setData] = useState(null)
  const [showGraph, setShowGraph] = useState(false)

  useEffect(() => {
    console.log('showgraph', showGraph)
    if (showGraph) {
      return (
        <StockGraph
          stock={data}
          user={user}
          setStockData={setData}
          setShowGraph={setShowGraph}
        />
      )
    }
    console.log('again')
  }, [setShowGraph])

  const handleClick = (e, stock) => {
    setShowGraph(true)
    setData(stock)
    window.history.pushState({}, '', `/stocks/${stock.symbol}`)
  }
  console.log(data)
  console.log(showGraph)

  if (!showGraph) {
    return (
      <div className="stocks-list-container">
        <h2>All stocks</h2>
        {stockList.data.map((stock) => {
          const change = stock.price.changePercent
          let changeColor = ''
          if (change > 0) {
            changeColor = '#06806b'
          } else if (change < 0) {
            changeColor = '#cc2f3c'
          } else {
            changeColor = '#707070'
          }
          return (
            <div
              to={`/stocks/${stock.symbol}`}
              name={'stock'}
              onClick={(e) => handleClick(e, stock)}
              key={stock.symbol}
            >
              <div className="stock-box" key={stock.symbol}>
                <div className="stock-img">
                  <img src="google_icon.png" alt={`${stock.symbol} image`} />
                </div>
                <div className="stock-symbol">{stock.symbol}</div>
                <div className="stock-price">
                  {stock.price.current.toFixed(2)}
                </div>
                <div className="stock-currency">{stock.market.currency}</div>
                <div className="stock-change" style={{ color: changeColor }}>
                  {change}%
                </div>
                <div className="stock-volume">
                  {formatNumber(stock.price.volume)}{' '}
                  <div className="stock-currency"> {stock.market.currency}</div>
                </div>
                <div className="stock-market-cap">
                  {formatNumber(stock.market.marketCap)}{' '}
                  <div className="stock-currency"> {stock.market.currency}</div>
                </div>
                <div className="stock-pe">{stock.market.peRatio}%</div>
                <div className="stock-exchange">
                  <img
                    src={`${stock.market.exchange}.png`}
                    alt={`${stock.market.exchange}`}
                  />
                </div>
                <div className="stock-sector">{stock.company.sector}</div>
              </div>
            </div>
          )
        })}
      </div>
    )
  } else {
    return (
      <StockGraph
        stock={data}
        user={user}
        setStockData={setData}
        setShowGraph={setShowGraph}
      />
    )
  }
}

export default StockLists
