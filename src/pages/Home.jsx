import { EllipsisVertical, FilePenLine, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useBlogs } from "../context/BlogContext";
import { useEffect, useRef, useState } from "react";
import { formatDateTime } from "../utils/formatDateTime";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();
  const { blogs, setBlogs } = useBlogs();
  const { currentUser } = useAuth();
  const [isBtnClicked, setIsBtnClicked] = useState(null);

  const dropdownRef = useRef(null);

  const userBlogs =
    currentUser && currentUser.length > 0
      ? blogs.filter((i) => i.userId === currentUser[0].userId)
      : [];

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
    toast.success("Blog Deleted Successfully!");
  };

  return (
    <>
      <div
        className={`flex flex-col items-center gap-14 py-32 px-6 lg:px-36 md:px-12 bg-slate-50 ${
          userBlogs.length === 0 ? "h-screen" : "h-auto"
        }`}
      >
        <h1 className="font-bold text-4xl text-slate-900">My Blogs:</h1>

        {userBlogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 rounded-lg w-[500px] h-[200px] gap-4">
            <h2 className="font-bold text-slate-400 text-2xl">
              No Blogs Available...
            </h2>
            <p className="text-slate-500 text-base">
              Start sharing your thoughts with the world
            </p>
            <button
              className="px-6 py-2.5 rounded-lg text-white text-sm md:text-lg font-medium cursor-pointer bg-emerald-500 hover:bg-emerald-600 transition-all shadow-md hover:shadow-lg"
              onClick={() => navigate("/create-blogs")}
            >
              Create Blog
            </button>
          </div>
        ) : (
          userBlogs.map((blog) => (
            <div
              key={blog.id}
              className="flex flex-col items-start gap-2 w-full border border-slate-200 bg-white rounded-lg shadow-lg py-8 px-5 lg:px-10 hovr:shadow-xl transition-shadow duration-300 hover:border-emerald-300"
            >
              <div className="flex flex-col space-y-1">
                <h2 className="text-slate-900 font-normal text-2xl">
                  {blog.title}
                </h2>
                {blog.subtitle && (
                  <p className="text-slate-700 font-normal text-lg">
                    {blog.subtitle}
                  </p>
                )}
                <p className="text-slate-500 font-semibold text-sm mt-1 mb-2">
                  Created At:
                  {formatDateTime(blog.createdAt)}
                </p>
              </div>
              <div className="mb-3 flex flex-col gap-1 mt-6">
                <h2
                  className="text-slate-700 font-normal text-lg line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
                {blog.content.length > 250 && (
                  <Link
                    to={`/blogs/blog-details/${blog.id}`}
                    className="w-fit mt-1"
                  >
                    <p className="text-blue-600 font-medium text-base underline hover:text-blue-800">
                      Read more
                    </p>
                  </Link>
                )}
              </div>
              <div className="flex justify-between items-center gap-3 w-full">
                {blog.tags && blog.tags.length > 0 ? (
                  <div className="flex flex-col gap-3 mt-8">
                    <h2 className="text-slate-700 font-bold text-xl">Tags:</h2>
                    <div className="flex flex-wrap gap-3">
                      {blog.tags.map((elem) => {
                        return (
                          <span
                            key={elem.id}
                            className=" px-3 py-1 rounded-full bg-emerald-100 font-bold text-md text-emerald-700 shadow-lg"
                          >
                            {elem.tag}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}

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

                <div className="hidden md:flex gap-3 items-end justify-center">
                  <Link
                    to={`/edit-blogs/${blog.id}`}
                    className="rounded-md p-2 cursor-pointer bg-emerald-300 text-slate-900 hover:bg-emerald-400 shadow-md transition-all"
                    title="Edit Blog"
                  >
                    <FilePenLine />
                  </Link>
                  <div
                    className="rounded-md p-2 cursor-pointer text-slate-900 bg-red-400 hover:bg-red-500 shadow-md transition-all"
                    title="Delete Blog"
                    onClick={() => handleDeleteBlog(blog.id)}
                  >
                    <Trash2 />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Home;
