import { useEffect, useRef, useState } from "react";
import { useBlogs } from "../context/BlogContext";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const useBlogForm = (
  tags = [],
  setTag = () => {},
  setTags = () => {},
  setIsTagVisible = () => {}
) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const { blogs, setBlogs, notification, setNotification } = useBlogs();
  const { currentUser } = useAuth();
  const [error, setError] = useState({});
  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();

  const { editBlogId } = useParams();

  const editorRef = useRef(null);

  const isHtmlEmpty = (html) => {
    const text = html
      .replace(/<br\s*\/?>/gi, "")
      .replace(/<[^>]*>/g, "")
      .trim();

    return text === "";
  };

  const isFormValid = () => {
    return title.trim() !== "" && !isHtmlEmpty(content);
  };

  const formError = () => {
    setError({
      title: !title.trim() ? "Enter the title first" : "",
      content: isHtmlEmpty(content) ? "Enter the blog content first" : "",
    });
  };

  const createBlogs = () => {
    if (!isFormValid()) {
      formError();
    } else {
      const newBlog = {
        userId: currentUser[0].userId,
        id: crypto.randomUUID(),
        title,
        subtitle,
        content,
        tags: tags || [],
        createdAt: new Date().toISOString(),
      };
      setBlogs((prev) => [...prev, newBlog]);
      setNotification("Blog Published Successfully!");
      emptyForm();
    }
  };

  const updateBlogs = () => {
    if (!isFormValid()) {
      formError();
    } else {
      setBlogs((prev) =>
        prev.map((blog) => {
          return blog.id === editingId
            ? { ...blog, title, subtitle, content, tags }
            : blog;
        })
      );
      setNotification("Blog Updated Successfully!");
      emptyForm();
      setEditingId(null);
      navigate("/");
    }
  };

  const emptyForm = () => {
    setTitle("");
    setSubtitle("");
    setContent("");
    setTag("");
    setTags([]);
    setIsTagVisible(false);

    editorRef.current?.clearContent();
  };

  useEffect(() => {
    if (!editBlogId) return;

    const blog = blogs.find((blog) => blog.id === editBlogId);
    if (!blog) return;
    setTitle(blog.title);
    setSubtitle(blog.subtitle);
    setContent(blog.content);
    setTags(blog.tags);
    setIsTagVisible(true);
    editorRef.current?.setContent(blog.content);

    setEditingId(blog.id);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [editBlogId]);

  const handleCancelEdit = () => {
    setEditingId(null);
    navigate("/");
  };

  return {
    title,
    setTitle,
    subtitle,
    setSubtitle,
    content,
    setContent,
    blogs,
    setBlogs,
    error,
    setError,
    editingId,
    isFormValid,
    createBlogs,
    updateBlogs,
    handleCancelEdit,
    editorRef,
    emptyForm,
    notification,
    setNotification,
  };
};
