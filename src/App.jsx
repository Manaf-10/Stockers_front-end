import './App.css'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Profile from './components/Profile'
import Posts from './components/Posts'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import StockLists from './components/StockLists'
import UserPosts from './components/UserPosts'
import Edit from './pages/Edit'
import UploadPost from './pages/UploadPost'
import { useState, useEffect, useRef } from 'react'
import { CheckSession } from './services/Auth'
import { useNavigate } from 'react-router-dom'
import * as THREE from 'three'
import NET from 'vanta/dist/vanta.net.min'
import { Line } from 'react-chartjs-2'


const App = () => {
  const vantaRef = useRef(null)
  const [vantaEffect, setVantaEffect] = useState(null)
  // el: vantaRef.current,
  // THREE: THREE,

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xff3276,
          backgroundColor: 0x201237,
          points: 15.0,
          spacing: 14.0,
          showDots: false
        })
      )
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy() // Cleanup
    }
  }, [vantaEffect])

  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  console.log(user)

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
    navigate('/')
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <>
      <div
        ref={vantaRef}
        style={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: 0,
          overflow: 'hidden'
        }}
      ></div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {' '}
        <Header user={user} setUser={setUser} />
        <Routes>
          <Route path="sign-in" element={<SignIn setUser={setUser} />}>
            Sign in
          </Route>
          <Route path="sign-up" element={<SignUp setUser={setUser} />}>
            Sign up
          </Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/profile" element={<Profile user={user} />}></Route>
          <Route path="/posts" element={<Posts user={user} />}></Route>
          <Route path="/stocks" element={<StockLists user={user} />}></Route>
          <Route path="/:username/posts" element={<UserPosts />}></Route>
          <Route
            path="/profile/edit"
            element={<Edit user={user} handleLogOut={handleLogOut} />}
          ></Route>
          <Route
            path="/posts/upload"
            element={<UploadPost user={user} />}
          ></Route>
        </Routes>
      </div>

    </>
  )
}

export default App
