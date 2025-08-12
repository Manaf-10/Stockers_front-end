import { getTrackedList, getOwnedList } from '../services/lists'
import { useEffect, useState } from 'react'
//user
const Listings = () => {
  const [trackedStockes, setTrackedStock] = useState([])
  const [ownedStockes, setownedStock] = useState([])

  useEffect(() => {})

  return (
    <div className="listings">
      {items.map((_, index) => (
        <div className="test" key={index}>
          <img
            src="https://w0.peakpx.com/wallpaper/852/116/HD-wallpaper-mahadev-lord-shiva-shiva-hindu-bhakti-devotional-god-thumbnail.jpg"
            alt="something"
          />
        </div>
      ))}
    </div>
  )
}

export default Listings
