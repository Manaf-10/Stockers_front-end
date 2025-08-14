import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../services/Auth";

const SignUp = () => {
  let navigate = useNavigate();

  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: null,
  };

  const [errorMsg, setErrorMsg] = useState(null);
  const [formValues, setFormValues] = useState(initialState);

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      setFormValues({ ...formValues, avatar: e.target.files[0] });
    } else {
      setFormValues({ ...formValues, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", formValues.username);
    formData.append("email", formValues.email);
    formData.append("password", formValues.password);
    formData.append("avatar", formValues.avatar);
    let res = await RegisterUser(formData);
    if (res.msg) {
      setErrorMsg(res.msg);
      return errorMsg;
    }

    setFormValues(initialState);
    navigate("/sign-in");
  };

  const isDisabled =
    !formValues.username ||
    !formValues.email ||
    !formValues.password ||
    !formValues.confirmPassword ||
    formValues.password !== formValues.confirmPassword;

  return (
    <div className="background-container">
      <div className="sign-form">
        <form onSubmit={handleSubmit} className="up">
          <h1>Sign up</h1>
          <label className="image-upload" htmlFor="avatar">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
              alt="upload avatar"
            />
          </label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            style={{ display: "none" }}
            onChange={handleChange}
            className="img-upload"
            accept="image/*"
          />
          <div className="input-wrapper">
            <input
              name="username"
              type="text"
              placeholder="username"
              onChange={handleChange}
              value={formValues.username}
              required
            />
          </div>
          <div className="input-wrapper">
            <input
              name="email"
              type="email"
              placeholder="example@example.com"
              onChange={handleChange}
              value={formValues.email}
              required
              autoComplete="email"
            />
          </div>
          <div className="input-wrapper">
            <input
              placeholder="password"
              name="password"
              type="password"
              onChange={handleChange}
              value={formValues.password}
              required
              autoComplete="off"
            />
          </div>
          <div className="input-wrapper">
            <input
              placeholder="confirm password"
              name="confirmPassword"
              type="password"
              onChange={handleChange}
              value={formValues.confirmPassword}
              required
              autoComplete="off"
            />
          </div>
          <button className="b-in" disabled={isDisabled}>
            Sign up
          </button>
        </form>
        <div className="error-msg">{errorMsg}</div>
      </div>
    </div>
  );
};

export default SignUp;
