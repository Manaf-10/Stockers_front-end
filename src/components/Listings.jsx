import React from "react";

const Listings = () => {
  
  const items = Array.from({ length: 10 });
  return (
    <div className="listings">
      {items.map((_, index) => (
        <div className="test">
          <img
            src="https://w0.peakpx.com/wallpaper/852/116/HD-wallpaper-mahadev-lord-shiva-shiva-hindu-bhakti-devotional-god-thumbnail.jpg"
            alt="something"
          />
        </div>
      ))}
    </div>
  );
};

export default Listings;
