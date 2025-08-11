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
import { useState, useEffect } from "react";
import { CheckSession } from "./services/Auth";

const App = () => {
  const [user, setUser] = useState(null);

  const checkToken = async () => {
    const user = await CheckSession();
    setUser(user);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      checkToken();
    }
  }, []);

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
      </Routes>
    </>
  );
};

export default App;
