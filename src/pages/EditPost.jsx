import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetEditPost, EditPosts, DeletePosts } from "../services/Post";

const EditPost = ({ user }) => {
  let navigate = useNavigate();
  const initialState = {
    title: "",
    description: "",
  };
  const [post, setPost] = useState();

  const { post_id } = useParams();

  useEffect(() => {
    const getPost = async () => {
      const res = await GetEditPost(post_id);
      setPost(res.data.posts);
    };
    getPost();
  }, [post_id]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const onDelete = () => {
    DeletePosts(post_id).then(() => navigate("/posts"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await EditPosts(post_id, {
      title: post.title,
      description: post.description,
    });

    setPost(initialState);

    navigate("/profile");
  };

  if (user && post) {
    return (
      <>
        <div className="upload-container">
          <h1>Edit a New Post</h1>
          <form className="sign-form" onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <input
                type="text"
                name={"title"}
                placeholder={"title"}
                value={post.title}
                onChange={handleChange}
              />
              <span className="icon"></span>
            </div>

            <textarea
              name={"description"}
              placeholder={"description"}
              value={post.description}
              onChange={handleChange}
              className="input-wrapper"
              cols="30"
              rows="10"
              autoComplete="off"
            ></textarea>
            <button className="b-in" type="submit">
              Submit
            </button>
            <br />
            <br />
            <button className="b-in" type="delete" onClick={onDelete}>
              Delete
            </button>
          </form>
        </div>
      </>
    );
  } else return <h3>unathorized</h3>;
};

export default EditPost;
