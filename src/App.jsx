import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateBlogs from "./pages/createBlogs";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-blogs" element={<CreateBlogs />} />
        <Route path="/edit-blogs/:blogId" element={<CreateBlogs />} />
      </Routes>
    </>
  );
};

export default App;
