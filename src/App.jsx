import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Profile from "./components/Profile";
import Posts from "./components/Posts";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import StockLists from "./components/StockLists";
import UserPosts from "./components/UserPosts";
import Edit from "./pages/Edit";
import StockGraph from "./components/StockGraph";
import { useState, useEffect } from "react";
import { CheckSession } from "./services/Auth";

const App = () => {
  const [user, setUser] = useState(null);
  const checkToken = async () => {
    if (user) {
      let currentUser = await CheckSession();
      const token = localStorage.getItem("token");
      if (token) {
        setUser(currentUser);
      }
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  /////////// we will need this //////////////

  /////////// we will need this //////////////

  return (
    <>
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
        <Route path="/stocks" element={<StockLists />}></Route>
        <Route path="/:username/posts" element={<UserPosts />}></Route>
        <Route path="/profile/edit" element={<Edit user={user} />}></Route>
        <Route path="/stocks/:symbol" element={<StockGraph />}></Route>
      </Routes>
    </>
  );
};

export default App;
