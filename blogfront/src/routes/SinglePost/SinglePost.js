import React from "react";
import { Nav, Siderbar, Footer, Single } from "../../components";
import "./singlepost.css";
const SinglePost = (props) => {
  return (
    <div className="single-post-container">
      <Nav />
      <div className="home-container">
        <Single />
        <Siderbar className="color-drk" />
      </div>

      <Footer />
    </div>
  );
};

export default SinglePost;
