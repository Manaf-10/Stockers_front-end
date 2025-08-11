import { useEffect, useState } from 'react'
import 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import { getStock } from '../services/stock'
import { useParams } from 'react-router-dom'

const StockGraph = () => {
  const skipped = (ctx, value) =>
    ctx.p0.skip || ctx.p1.skip ? value : undefined
  const down = (ctx, value) =>
    ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined
  
  const { symbol } = useParams()
  const [data, setData] = useState(null)
  useEffect(() => {
    const getStocks = async () => {
      const stockData = await getStock(symbol)
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
    }
    getStocks()
  }, [symbol])

  const options = {
    fill: false,
    interaction: {
      intersect: false
    },
    radius: 0
  }

  if (!data) {
    return <div>Loading...</div>
  } else {
    return <Chart type="line" data={data} options={options} />
  }
}

export default StockGraph
