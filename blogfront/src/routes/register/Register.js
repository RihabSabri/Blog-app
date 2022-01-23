import React, { useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import { Input } from "../../components";
import axios from "axios";

const Register = () => {
  const [err, setError] = useState(false);
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
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Please enter your email",
      errorMessage: "Plase enter a valid email adress",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be from 8-20 characters long and include atleast : 1 uppercase and lowercase letter, 1 digit and one special character",
      pattern:
        "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
      required: true,
    },
    {
      id: 4,
      name: "confirmation",
      type: "password",
      placeholder: "Confirm your password",
      errorMessage: "Passwords do not match",
      pattern: values.password,
      required: true,
    },
  ];

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const { confirmation, ...others } = values;

  const register = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/register",
        others
      );
      res.data && window.location.replace("/auth/login");
    } catch (error) {
      setError(true);
    }
  };
  console.log(err);
  return (
    <div className="login-container">
      <div className="center-login">
        <h1 className="blog-title login-title">
          <span aria-hidden="true">Girls in tech</span>
          Girls in tech
          <span aria-hidden="true">Girls in tech</span>
        </h1>
        <p className="login-with">Create An Account</p>
        <form action="post" className="form-login" onSubmit={register}>
          {inputs.map((input) => (
            <Input
              key={input.id}
              onChange={onChangeHandler}
              name={input.name}
              placeholder={input.placeholder}
              type={input.type}
              value={values[input.name]}
              required={input.required}
              pattern={input.pattern}
              errorMessage={input.errorMessage}
            />
          ))}
          <button className="login-btn" type="submit">
            Register
          </button>
          {err && (
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
        </form>
        <p className="login-register">
          already have an account?
          <span>
            <Link to="/auth/login" style={{ color: "var(--prm-blue-1)" }}>
              Log In
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
