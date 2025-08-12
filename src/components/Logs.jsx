import { useEffect, useState } from 'react'
import { GetTransaction } from '../services/GetTransaction'
import './post.css'

const Logs = ({ user }) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetTransaction()
        setPosts(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [])

  console.log(posts)
  console.log(user)

  if (user.id !== posts.map((x)=>(x.owner)) ) {
    return (
      <>
        <h1>Posts:</h1>
        <div className="posts-list">
          {posts
            .filter((po) => po.owner === user.id)
            .map((po) => (
              <div key={po._id} className="post-card">
                {po.img && (
                  <img
                    src={`http://localhost:3000/public/posts/${po.img}`}
                    alt={po.title}
                  />
                )}
                <h3>{po.title}</h3>
                <p>{po.description}</p>
              </div>
            ))}
        </div>
      </>
    )
  } else {
    return (
      <>
        <h3>no logs yet</h3>
      </>
    )
  }
}

export default Logs