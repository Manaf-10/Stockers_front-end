import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Profile from "./components/Profile";
import Posts from "./components/Posts";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import StockLists from "./components/StockLists";
import StockGraph from "./components/StockGraph";
import UserPosts from "./components/UserPosts";
const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="sign-in" element={<SignIn />}>
          Sign in
        </Route>
        <Route path="sign-up" element={<SignUp />}>
          Sign up
        </Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/posts" element={<Posts />}></Route>
        <Route path="/stocks-lists" element={<StockLists />}></Route>
        <Route path="/stock-graph/:symbol" element={<StockGraph />}></Route>
        <Route path="/:username/posts" element={<UserPosts />}></Route>
      </Routes>
    </>
  );
};

export default App;
