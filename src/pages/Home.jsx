import { FilePenLine, Trash2 } from "lucide-react";
import { useBlogForm } from "../hooks/useBlogForm";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useBlogs } from "../context/BlogContext";

const Home = () => {
  const { handleEdit } = useBlogForm();
  const { blogs, setBlogs } = useBlogs();

  return (
    <>
      <div className="flex flex-col gap-12 w-[1000px] my-16 ml-8 py-4 px-8">
        <h1 className="font-bold text-4xl text-black">My Blogs:</h1>
        {blogs.length === 0 ? (
          <div className="flex items-center justify-center text-3xl font-bold">
            No Blogs Available...
          </div>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog.id}
              className="flex justify-between border-2 border-black rounded py-4 px-8 "
            >
              <div className="flex flex-col items-start gap-2">
                <div className="font-bold text-2xl text-black mb-1">
                  Title: {blog.title}
                </div>
                {blog.subtitle && (
                  <div className="flex gap-2 mb-3">
                    <h2 className="font-bold text-xl text-black">Subtitle:</h2>
                    <p className="font-semibold text-xl text-black">
                      {blog.subtitle}
                    </p>
                  </div>
                )}
                <div className="font-bold text-xl text-black mb-3 flex flex-col gap-2">
                  Blog:
                  <h2
                    className="font-normal text-black text-lg mb-4"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                </div>

                {blog.tags && blog.tags.length > 0 && (
                  <div className="font-bold text-lg text-black flex flex-col gap-2">
                    Tags:
                    <div className="flex flex-wrap gap-3">
                      {blog.tags.map((elem) => {
                        return (
                          <span
                            key={elem.id}
                            className=" px-1 border-2 rounded bg-teal-300 font-bold text-md text-black"
                          >
                            {elem.tag}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-3 items-start justify-center">
                <Link
                  to={`/edit-blogs/${blog.id}`}
                  className="border-2 border-black rounded p-1 cursor-pointer bg-emerald-300 text-black hover:bg-emerald-400 transition-all"
                  title="Edit Blog"
                >
                  <FilePenLine />
                </Link>
                <div
                  className="border-2 border-black rounded p-1 cursor-pointer  text-black  bg-red-400 hover:bg-red-500 transition-all"
                  title="Delete Blog"
                >
                  <Trash2
                    onClick={() =>
                      setBlogs((prev) => prev.filter((i) => i.id !== blog.id))
                    }
                  />
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
