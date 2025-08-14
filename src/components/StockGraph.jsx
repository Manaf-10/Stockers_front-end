import { useEffect, useState } from 'react'
import 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import { getStock } from '../services/stock'
import { useNavigate, useParams } from 'react-router-dom'
import {
  addToOwnedList,
  addToTrackedList,
  getOwnedList,
  getTrackedList
} from '../services/lists'
import { createTransaction } from '../services/transaction'


const StockGraph = ({ stock, user, setStockData, setShowGraph }) => {
  const skipped = (ctx, value) =>
    ctx.p0.skip || ctx.p1.skip ? value : undefined
  const down = (ctx, value) =>
    ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined

  const [data, setData] = useState(null)
  const [latestPrice, setLatestPrice] = useState(null)
  const [isTracked, setIsTracked] = useState(false)
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    const getStocks = async () => {
      const stockData = await getStock(stock.symbol)

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
    checkTracked()

    getStocks()
  }, [toggle])

  const checkTracked = async () => {
    const tracked = await getTrackedList(user.id)
    tracked.find((el) => {
      if (el.symbol === stock.symbol) {
        setIsTracked(true)
        return
      }
    })
  }

  console.log('is tracked is ' + isTracked)

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
      setToggle(!toggle)
    } catch (error) {
      console.error(error)
    }
  }

  const options = {
    responsive: true,
    interaction: {
      intersect: false,
      mode: 'index'
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderWidth: 1,
        borderColor: 'rgba(143, 31, 132, 1)',
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (context) => `Price: $${context.formattedValue}`
        }
      }
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hoverRadius: 6,
        hoverBackgroundColor: '#00ffcc'
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255,255,255,0.05)'
        },
        ticks: {
          color: '#bbb'
        }
      },
      y: {
        grid: {
          color: 'rgba(255,255,255,0.05)'
        },
        ticks: {
          color: '#bbb',
          callback: (value) => `$${value}`
        }
      }
    }
  }

  const handleBack = () => {
    console.log('No more stock! Go back!')
    setData(null)
    setShowGraph(false)
    window.history.pushState({}, '', `/stocks`)
  }
  console.log(data)
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
            {isTracked ? (
              <button disabled>Already Tracked</button>
            ) : (
              <>
                <button className="track-button" onClick={handleTrack}>
                  Track
                </button>
              </>
            )}
            <button onClick={handleBack}>back</button>
          </div>
        </div>
      </>
    )
  }
}

export default StockGraph
