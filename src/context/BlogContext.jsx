import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const BlogsContext = createContext();

export const BlogsProvider = ({ children }) => {
  const [blogs, setBlogs] = useLocalStorage("blogsList", []);
  const [notification, setNotification] = useState("");

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

  useEffect(() => {
    if (!notification && notification === "") return;
    const notificationTimer = setTimeout(() => {
      setNotification("");
    }, 2000);

    return () => clearTimeout(notificationTimer);
  }, [notification]);

  return (
    <BlogsContext.Provider
      value={{ blogs, setBlogs, notification, setNotification }}
    >
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
