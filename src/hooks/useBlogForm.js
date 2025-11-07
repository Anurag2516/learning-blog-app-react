import { useEffect, useRef, useState } from "react";
import { useBlogs } from "../context/BlogContext";
import { useParams } from "react-router-dom";

export const useBlogForm = (
  tags = [],
  setTag = () => {},
  setTags = () => {},
  setIsTagVisible = () => {}
) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const { blogs, setBlogs } = useBlogs();
  const [error, setError] = useState({});
  const [editingId, setEditingId] = useState(null);

  const { blogId } = useParams();

  const editorRef = useRef(null);

  const isFormValid = () => {
    return (
      title.trim() !== "" && content.trim() !== "" && content !== "<p></p>"
    );
  };

  const formError = () => {
    setError({
      title: !title.trim() ? "Enter the title first" : "",
      content:
        !content.trim() && content !== "<p></p>"
          ? "Enter the blog content first"
          : "",
    });
  };

  const createBlogs = () => {
    if (!isFormValid()) {
      formError();
    } else {
      const newBlog = {
        id: crypto.randomUUID(),
        title,
        subtitle,
        content,
        tags: tags || [],
      };
      setBlogs((prev) => [...prev, newBlog]);
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
      emptyForm();
      setEditingId(null);
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
    if (!blogId) return;

    const blog = blogs.find((blog) => blog.id === blogId);
    if (!blog) return;
    setTitle(blog.title);
    setSubtitle(blog.subtitle);
    setContent(blog.content);
    setTags(blog.tags);
    setIsTagVisible(true);
    editorRef.current?.setContent(blog.content);

    setEditingId(blog.id);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [blogId]);

  const handleCancelEdit = () => {
    emptyForm();
    setEditingId(null);
  };

  useEffect(() => {
    {
      if (error.title) {
        const titleTimer = setTimeout(() => {
          setError((prev) => ({ ...prev, title: "" }));
        }, 2000);
        return () => clearTimeout(titleTimer);
      }

      if (error.content) {
        const contentTimer = setTimeout(() => {
          setError((prev) => ({ ...prev, content: "" }));
        }, 2000);
        return () => clearTimeout(contentTimer);
      }
    }
  }, [error.title, error.content]);

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
  };
};
