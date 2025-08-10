import { useEffect, useState } from 'react'
import 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import { getStock } from '../services/stock'
import { data } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const StockGraph = () => {
  const { symbol } = useParams()
  const [data, setData] = useState(null)
  useEffect(() => {
    const getStocks = async () => {
      const stockData = await getStock(symbol)
      setData({
        labels: stockData.Dates,
        datasets: [
          {
            label: 'Close Price',
            data: stockData.data,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
            type: 'line'
          }
        ]
      })
    }
    getStocks()
  }, [symbol])

  const options = {
    responsive: true,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      title: { display: true, text: `${symbol} — Close & Volume` }
    }
  }
  if (!data) {
    return <div>Loading...</div>
  } else {
    return <Chart type="bar" data={data} options={options} />
  }
}

export default StockGraph
