import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateBlogs from "./pages/createBlogs";
import BlogDetails from "./pages/BlogDetails";
import Error404 from "./pages/Error404";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="*" element={<Error404 />} />
        <Route path="/" element={<Home />} />
        <Route path="/create-blogs" element={<CreateBlogs />} />
        <Route path="/edit-blogs/:editBlogId" element={<CreateBlogs />} />
        <Route
          path="/blogs/blog-details/:blogDetailsId"
          element={<BlogDetails />}
        />
      </Routes>
    </>
  );
};

export default App;
