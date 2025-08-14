import { getTrackedList, getOwnedList } from '../services/lists'
import { useEffect, useState } from 'react'
import OwnedLists from './OwnedLists'
import TrackedLists from './trackedLists'

//user
const Listings = ({user}) => {

  const [page, setpage] = useState('tracked')
  const renderPage = (e) => {
    switch (page) {
      case 'tracked':
        return <TrackedLists  user={user} />
      case 'owned':
        return <OwnedLists user={user}  />
    }
  }
  const changePage = (e) => {
    setpage(e.target.innerText)
  }

  return (
    <>
      <div className="profile-lists-toggle">
        <button onClick={changePage}>tracked</button>
        <button onClick={changePage}>owned</button>
      </div>
      {renderPage()}
    </>
  )
}

export default Listings

