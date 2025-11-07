import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { BlogsProvider } from "./context/BlogContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BlogsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BlogsProvider>
  </StrictMode>
);
