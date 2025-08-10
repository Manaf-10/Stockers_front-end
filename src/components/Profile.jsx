import { use, useState } from 'react'
import UserPosts from './UserPosts'
import Listings from './Listings'
import Logs from './Logs'
import { useNavigate } from 'react-router-dom'

const Profile = ({ user }) => {
  let thisUser = user.user
  const navigate = useNavigate()
  const [page, setpage] = useState('Posts')

  const renderPage = (e) => {
    switch (page) {
      case 'Lists':
        return <Listings />
      case 'Posts':
        return <UserPosts />
      case 'Logs':
        return <Logs />
    }
  }

  const changePage = (e) => {
    //iam using inner text to get the innner content (doesnot makes sense to add an id or a name to the buttons)
    setpage(e.target.innerText)
  }

  return (
    <div className="user-profile-container">
      <div className="user-profile">
        <img src={`${thisUser.avatar}`} alt="user-image" />
        <div className="profile-info">
          <div className="user-name">{thisUser.username}</div>
          <button onClick={() => navigate('/profile/edit')}>
            Edit profile
          </button>
        </div>
      </div>
      <div className="profile-lists-toggle">
        <button onClick={changePage}>Lists</button>
        <button onClick={changePage}>Logs</button>
        <button onClick={changePage}>Posts</button>
      </div>
      {renderPage()}
    </div>
  )
}

export default Profile
