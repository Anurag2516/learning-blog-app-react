import React from "react";
import BlogForm from "../components/BlogForm";

const Home = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-start">
        <BlogForm />
      </div>
    </>
  );
};

export default Home;
