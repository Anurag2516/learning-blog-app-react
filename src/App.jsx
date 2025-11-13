import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateBlogs from "./pages/createBlogs";
import BlogDetails from "./pages/BlogDetails";
import Error404 from "./pages/Error404";
import Signup from "./pages/signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRoute from "./components/AuthRoute";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/signup"
          element={
            <AuthRoute>
              <Signup />
            </AuthRoute>
          }
        />
        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/create-blogs" element={<CreateBlogs />} />
          <Route path="/edit-blogs/:editBlogId" element={<CreateBlogs />} />
          <Route
            path="/blogs/blog-details/:blogDetailsId"
            element={<BlogDetails />}
          />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default App;
