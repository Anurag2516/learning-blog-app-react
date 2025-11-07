import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const BlogsContext = createContext();

export const BlogsProvider = ({ children }) => {
  const [blogs, setBlogs] = useLocalStorage("blogsList", []);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "blogsList" && e.newValue) {
        try {
          setBlogs(JSON.parse(e.newValue));
        } catch (err) {
          console.error("Invalid JSON in blogsList:", err);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [setBlogs]);

  return (
    <BlogsContext.Provider value={{ blogs, setBlogs }}>
      {children}
    </BlogsContext.Provider>
  );
};

export const useBlogs = () => {
  const context = useContext(BlogsContext);

  if (!context) {
    throw new Error("useBlogs must be used within BlogProvider");
  }
  return context;
};
