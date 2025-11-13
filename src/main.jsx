import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { BlogsProvider } from "./context/BlogContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BlogsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BlogsProvider>
  </AuthProvider>
);
