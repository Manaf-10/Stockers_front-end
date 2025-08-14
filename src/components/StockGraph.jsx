import { useEffect, useState } from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { getStock } from "../services/stock";
import {
  addToOwnedList,
  addToTrackedList,
<<<<<<< HEAD
  getTrackedList,
} from "../services/lists";
import { useNavigate } from "react-router-dom";
import { createTransaction } from "../services/transaction";
import BackButton from "./BackButton";
const StockGraph = ({ stock, setStock, user }) => {
=======
  getOwnedList,
  getTrackedList
} from '../services/lists'
import { createTransaction } from '../services/transaction'


const StockGraph = ({ stock, user, setStockData, setShowGraph }) => {
>>>>>>> 6aec15f42c0e239b41a8d3e15ec6e7e987d941b9
  const skipped = (ctx, value) =>
    ctx.p0.skip || ctx.p1.skip ? value : undefined;
  const down = (ctx, value) =>
    ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;

  const [data, setData] = useState(null);
  const [latestPrice, setLatestPrice] = useState(null);
  const [isTracked, setIsTracked] = useState(false);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const getStocks = async () => {
      const stockData = await getStock(stock.symbol);

      setData({
        labels: stockData.Dates,
        datasets: [
          {
            label: "stocks",
            data: stockData.data,
            borderColor: "rgb(75, 192, 192)",
            segment: {
              borderColor: (ctx) =>
                skipped(ctx, "rgb(0,0,0,0.2)") || down(ctx, "rgb(192,75,75)"),
              borderDash: (ctx) => skipped(ctx, [6, 6]),
            },
            spanGaps: true,
          },
        ],
      });
      setLatestPrice(stockData.data[stockData.data.length - 1]);
    };
    checkTracked();

    getStocks();
  }, [toggle]);

  const checkTracked = async () => {
    const tracked = await getTrackedList(user.id);
    tracked.find((el) => {
      if (el.symbol === stock.symbol) {
        setIsTracked(true);
        return;
      }
    });
  };

  const handleBuy = async () => {
    try {
      const transaction = await createTransaction(user.id, {
        symbol: stock.symbol,
        company: stock.company,
        type: "buy",
        actionPrice: latestPrice,
        quantity: 1,
      });

      const owned = await addToOwnedList(user.id, {
        symbol: stock.symbol,
        company: stock.company.name,
        price: latestPrice,
        amount: 1,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleTrack = async () => {
    try {
      const track = await addToTrackedList(user.id, {
        symbol: stock.symbol,
        company: stock.company.name,
        price: latestPrice,
        amount: 0,
      });
      setToggle(!toggle);
    } catch (error) {
      console.error(error);
    }
  };

  const options = {
    responsive: true,
    interaction: {
      intersect: false,
      mode: "index",
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderWidth: 1,
        borderColor: "rgba(143, 31, 132, 1)",
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (context) => `Price: $${context.formattedValue}`,
        },
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        radius: 0,
        hoverRadius: 6,
        hoverBackgroundColor: "#00ffcc",
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255,255,255,0.05)",
        },
        ticks: {
          color: "#bbb",
        },
      },
      y: {
        grid: {
          color: "rgba(255,255,255,0.05)",
        },
        ticks: {
          color: "#bbb",
          callback: (value) => `$${value}`,
        },
      },
    },
  };

  const handleBack = () => {
    setStock(null);
    navigate("/stocks");
    setStock(null);
  };
  if (!data) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div className="graph-page">
          <div className="graph-header">
            <BackButton handleBack={handleBack} />
            <h1>{stock.symbol}</h1>
          </div>
          <div className="graph-body">
            <div className="graph-container">
              <Chart type="line" data={data} options={options} />
            </div>
            <div className="buttons-container">
              <button className="buy-button" onClick={handleBuy}>
                Buy
              </button>
              {isTracked ? (
                <button disabled>Tracked</button>
              ) : (
                <>
                  <button className="track-button" onClick={handleTrack}>
                    Track
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default StockGraph;
