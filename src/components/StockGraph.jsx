import { useEffect, useState } from 'react'
import 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import { getStock } from '../services/stock'
import { useParams } from 'react-router-dom'
import { addToOwnedList, addToTrackedList } from '../services/lists'
import { createTransaction } from '../services/transaction'

const StockGraph = ({ stock, user }) => {
  const skipped = (ctx, value) =>
    ctx.p0.skip || ctx.p1.skip ? value : undefined
  const down = (ctx, value) =>
    ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined

  const { symbol } = useParams()
  const [data, setData] = useState(null)
  const [latestPrice, setLatestPrice] = useState(null)
  useEffect(() => {
    const getStocks = async () => {
      const stockData = await getStock(stock.symbol)
      console.log(stockData)

      setData({
        labels: stockData.Dates,
        datasets: [
          {
            label: 'stocks',
            data: stockData.data,
            borderColor: 'rgb(75, 192, 192)',
            segment: {
              borderColor: (ctx) =>
                skipped(ctx, 'rgb(0,0,0,0.2)') || down(ctx, 'rgb(192,75,75)'),
              borderDash: (ctx) => skipped(ctx, [6, 6])
            },
            spanGaps: true
          }
        ]
      })
      setLatestPrice(stockData.data[stockData.data.length - 1])
    }
    getStocks()
  }, [symbol])

  const handleBuy = async () => {
    try {
      const transaction = await createTransaction(user.id, {
        symbol: stock.symbol,
        company: stock.company,
        type: 'buy',
        actionPrice: latestPrice,
        quantity: 1
      })

      const owned = await addToOwnedList(user.id, {
        symbol: stock.symbol,
        company: stock.company.name,
        price: latestPrice,
        amount: 1
      })

      console.log('Transaction:', transaction)
      console.log('Owned list updated:', owned)
    } catch (error) {
      console.log(error)
    }
  }

  const handleTrack = async () => {
    try {
      const track = await addToTrackedList(user.id, {
        symbol: stock.symbol,
        company: stock.company.name,
        price: latestPrice,
        amount: 0
      })
      console.log(`Tracking ${stock.symbol}`)
    } catch (error) {
      console.error(error)
    }
  }

  const options = {
    fill: false,
    interaction: {
      intersect: false
    },
    radius: 0
  }
  console.log(stock)
  if (!data) {
    return <div>Loading...</div>
  } else {
    return (
      <>
        <div className="graph-header">
          <h1>{stock.symbol}</h1>
        </div>
        <div className="graph-page">
          <div className="graph-container">
            <Chart type="line" data={data} options={options} />
          </div>
          <div className="buttons-container">
            <button className="buy-button" onClick={handleBuy}>
              Buy
            </button>
            <button className="track-button" onClick={handleTrack}>
              Track
            </button>
          </div>
        </div>
      </>
    )
  }
}

export default StockGraph
