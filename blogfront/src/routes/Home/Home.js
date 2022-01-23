import React, { useState, useEffect } from "react";
import { Nav, Hero, Siderbar, Posts, Footer } from "../../components";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/v1/posts" + search
      );
      setPosts(res.data.posts);
    };
    getPosts();
  }, [search]);
  return (
    <div className="big-home-container">
      <Hero />
      <Nav />
      <div className="home-container">
        <Posts posts={posts} />
        <Siderbar />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
