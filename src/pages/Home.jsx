import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">

      <div className="main-content">
        <div className="text-section">
          <h1>Home Page</h1>
          <h2>Add a subheading</h2>
          <p>Add a little bit of body text Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis voluptatibus voluptatem nostrum suscipit illo distinctio, inventore ducimus dignissimos, veniam impedit ipsam ipsum corporis minima iusto iure molestias enim non repellendus. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis incidunt laboriosam vero ducimus non ratione nisi eum architecto rerum ipsum, eveniet, obcaecati libero minima magnam id, iure recusandae dolorum. Adipisci. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum aperiam, voluptas fugit tempore deserunt quo, est dolor amet alias nam veritatis! Omnis, eligendi labore quam quaerat modi perferendis accusantium hic.</p>
        </div>

        <img src="../readMeImgs/stonks.png" alt="noStockToday" className="image-placeholder" />
      </div>

    </div>
  );
};

export default Home;

