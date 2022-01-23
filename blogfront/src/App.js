import React from "react";
import { Home, SinglePost, Write, Login, Register } from "./routes";
import { Routes, Route, Navigate } from "react-router";
import { useContext } from "react";
import { Context } from "./context/Context";

const App = () => {
  const { user } = useContext(Context);
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/post/:id" element={<SinglePost />} />
        <Route exact path="/write" element={user ? <Write /> : <Login />} />
        <Route exact path="/auth/login" element={user ? <Home /> : <Login />} />
        <Route
          exact
          path="/auth/register"
          element={user ? <Home /> : <Register />}
        />
      </Routes>
    </div>
  );
};

export default App;
