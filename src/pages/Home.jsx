import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="main-content">
        <div className="text-section">
          <h1>Home Page</h1>
          <p>
            Stockers is your go-to platform for tracking, analyzing, and staying
            ahead in the stock market. Whether you’re a beginner exploring your
            first investments or an experienced trader managing your portfolio,
            we bring you real-time data, insightful charts, and market updates
            all in one place. Stay informed, make smarter moves, and keep your
            eyes on the market — with Stockers, you’re always in focus
          </p>
        </div>

        <img
          src="../readMeImgs/stonks.png"
          alt="noStockToday"
          className="image-placeholder"
        />
      </div>
    </div>
  );
};

export default Home;
