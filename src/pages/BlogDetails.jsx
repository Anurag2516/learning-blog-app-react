import { useNavigate, useParams, Link } from "react-router-dom";
import { useBlogs } from "../context/BlogContext";
import { ArrowLeft, EllipsisVertical, FilePenLine, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { formatDateTime } from "../utils/formatDateTime";

const BlogDetails = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });

  const { blogDetailsId } = useParams();
  const navigate = useNavigate();
  const { blogs, setBlogs, notification, setNotification } = useBlogs();

  const blog = blogs.find((blog) => blog.id === blogDetailsId);

  const [isBtnClicked, setIsBtnClicked] = useState(null);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickedOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target))
        setIsBtnClicked(null);
    };

    document.addEventListener("click", handleClickedOutside);

    return () => document.removeEventListener("click", handleClickedOutside);
  }, []);

  const handleDeleteBlog = (id) => {
    setBlogs((prev) => prev.filter((i) => i.id !== id));
    setNotification("Blog Deleted Successfully!");
    navigate("/");
  };

  if (!blog) return;

  return (
    <>
      {notification && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-green-500 px-4 py-4 rounded shadow-lg z-50">
          {notification}
        </div>
      )}
      <div className="py-28 px-10 lg:px-0 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex md:hidden justify-between items-center md:px-14 mb-6">
            <ArrowLeft size={24} onClick={() => navigate("/")} />
            <div ref={dropdownRef} className="flex md:hidden relative">
              <EllipsisVertical onClick={() => setIsBtnClicked(blog.id)} />
              {isBtnClicked === blog.id && (
                <div className="absolute top-2 right-6 w-32 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden">
                  <Link
                    to={`/edit-blogs/${blog.id}`}
                    className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Edit Blog
                  </Link>
                  <div className="h-px bg-slate-200"></div>
                  <button
                    type="button"
                    className="w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                    onClick={() => handleDeleteBlog(blog.id)}
                  >
                    Delete Blog
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="hidden md:flex justify-between items-center md:px-14 mb-6">
            <div
              className="flex justify-center items-center gap-2 text-white cursor-pointer bg-emerald-500 hover:bg-emerald-600 transition-all rounded-lg px-2 py-2"
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={20} />
              <p className="cursor-pointer text-base font-medium">
                Back To Home
              </p>
            </div>
            <div className="flex gap-3 py-2">
              <Link
                to={`/edit-blogs/${blog.id}`}
                className="rounded-md p-2 cursor-pointer text-slate-900 bg-emerald-400 hover:bg-emerald-500 shadow-md transition-all"
                title="Edit Blog"
              >
                <FilePenLine size={24} />
              </Link>
              <div
                className="rounded-md p-2 cursor-pointer text-slate-900 bg-red-400 hover:bg-red-500 shadow-md transition-all"
                title="Delete Blog"
                onClick={() => handleDeleteBlog(blog.id)}
              >
                <Trash2 size={24} />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-10 py-12 md:px-14">
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-3xl md:text-4xl text-slate-800">
                {blog.title}
              </h1>
              <h2 className="font-bold text-lg md:text-xl text-slate-600">
                {blog.subtitle}
              </h2>
              <p className="text-slate-500 font-semibold text-sm mt-1">
                Created At:
                {formatDateTime(blog.createdAt)}
              </p>
            </div>
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex gap-4">
                <h2 className="text-slate-700 font-bold text-lg md:text-xl">
                  Tags:
                </h2>
                <div className="flex flex-wrap gap-3">
                  {blog.tags.map((elem) => {
                    return (
                      <span
                        key={elem.id}
                        className="px-3 py-1 rounded-full bg-emerald-100 font-bold text-sm md:text-base text-emerald-700 shadow-sm"
                      >
                        {elem.tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="w-full h-px bg-slate-500"></div>
            <div
              className="font-normal text-lg text-slate-800 leading-normal text-justify space-y-4"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
