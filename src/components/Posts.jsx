import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NewPost } from "../services/NewPost";

const Posts = ({ user }) => {
  const initialState = { title: "", description: "", img: "" };

  let navigate = useNavigate();

  const [post, setPost] = useState(initialState);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = await NewPost(post);
    setPost(initialState);
    navigate("/");
  };
  if (localStorage.getItem("token")) {
    // if (user) {
    return (
      <div className="container">
        <h1>Add A New post Listing</h1>
        <form className="c" onSubmit={handleSubmit}>
          <input
            type="text"
            name={"title"}
            placeholder={"title"}
            value={post.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name={"img"}
            placeholder={"image"}
            value={post.img}
            onChange={handleChange}
          />
          <textarea
            name={"description"}
            placeholder={"description"}
            value={post.description}
            onChange={handleChange}
            className="text-area"
            cols="30"
            rows="10"
            autoComplete="off"
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  } else {
    return (
      <>
        <h3>unathorized</h3>
      </>
    );
  }
};

export default Posts;
