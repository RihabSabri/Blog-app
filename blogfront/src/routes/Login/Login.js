import React, { useContext, useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";
import { Input } from "../../components";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmation: "",
  });
  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      pattern: "^(?=.*[a-zA-Z])[A-Za-z0-9]{3,12}$",
      errorMessage:
        "Username should be between 3 and 12 characters,include atleast 1 letter and no special characters",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      required: true,
    },
  ];
  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const { dispatch, isFetching, user } = useContext(Context);
  const [error, setError] = useState(false);

  const submitHandler = async (e) => {
    setError(false);
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:5000/auth/login", values);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      res.data && window.location.replace("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAIL" });
      console.log(err);
      setError(true);
    }
  };
  console.log(user);
  return (
    <div className="login-container">
      <div className="center-login">
        <h1 className="blog-title login-title">
          <span aria-hidden="true">Girls in tech</span>
          Girls in tech
          <span aria-hidden="true">Girls in tech</span>
        </h1>
        <p className="login-with">Log In </p>
        <form action="post" className="form-login" onSubmit={submitHandler}>
          {inputs.map((input) => (
            <Input
              onChange={onChangeHandler}
              className="input-login"
              key={input.id}
              name={input.name}
              type={input.type}
              required={input.required}
              placeholder={input.placeholder}
              pattern={input.pattern}
              errorMessage={input.errorMessage}
            />
          ))}
          {error && (
            <span
              style={{
                color: "red",
                fontSize: "14px",
                textAlign: "center",
                marginTop: "5px",
                opacity: 0.4,
              }}
            >
              Something Went wrong
            </span>
          )}
          <button className="login-btn" disabled={isFetching}>
            Log in
          </button>
        </form>
        <p className="login-register">
          Dont have an account?
          <span>
            <Link to="/auth/register" style={{ color: "var(--prm-blue-1)" }}>
              Register
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
