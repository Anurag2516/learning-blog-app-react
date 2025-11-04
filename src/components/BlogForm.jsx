import { CircleX } from "lucide-react";
import Editor from "./Editor";
import { useEffect, useRef, useState } from "react";

export default function BlogForm() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState({});
  const [isTagVisible, setIsTagVisible] = useState();

  const editorRef = useRef(null);

  const isFormValid = () => {
    return (
      title.trim() !== "" && content.trim() !== "" && content !== "<p></p>"
    );
  };
  const isTagInputValid = () => {
    return tag.trim() !== "";
  };

  const createTags = () => {
    if (isTagInputValid()) {
      let newTag = {
        id: crypto.randomUUID(),
        tag: tag,
      };
      setTags((prev) => [...prev, newTag]);
      setTag("");
      setIsTagVisible(true);
      return;
    }
  };

  const createBlogs = () => {
    if (!isFormValid()) {
      setError({
        title: !title.trim() ? "Enter the title first" : "",
        content:
          !content.trim() && content !== "<p></p>"
            ? "Enter the blog content first"
            : "",
      });
      return;
    }
    setError({});
    const newBlog = {
      id: crypto.randomUUID(),
      title: title,
      subtitle: subtitle,
      content: content,
      tags: tags,
    };
    setBlogs((prev) => [...prev, newBlog]);
    setTitle("");
    setSubtitle("");
    setContent("");
    setTag("");
    setTags([]);
    setIsTagVisible(false);

    editorRef.current?.clearContent();
  };

  const tagVisible = (idx) => {
    setTags((prev) => prev.filter((_, i) => i !== idx));
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

  return (
    <>
      <div className="flex flex-col gap-4 items-center">
        <div className="flex flex-col lg:flex-row justify-center items-start w-full">
          <form
            className="flex w-full ml-6 gap-2 bg-white"
            onSubmit={(e) => {
              e.preventDefault();
              createBlogs();
            }}
          >
            <div className="lg:w-[70%]">
              <div className="flex flex-col items-start gap-5 border-2 border-black rounded py-6 px-8 w-full">
                <div className="flex flex-col items-start gap-2 w-full">
                  <h1>Title</h1>
                  <input
                    className="border-2 border-black rounded px-2 py-2 w-full"
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter blog title"
                    value={title}
                    onChange={(event) => {
                      setTitle(event.target.value);
                      if (error.title)
                        setError((prev) => ({ ...prev, title: "" }));
                    }}
                  />
                  {error.title && (
                    <span className="bg-red-500 text-sm p-2 text- border-2 border-black rounded">
                      {error.title}
                    </span>
                  )}
                </div>

                <div className="flex flex-col items-start gap-2 w-full">
                  <h1>Subtitle (optional)</h1>
                  <input
                    className="border-2 border-black rounded px-2 py-2 w-full"
                    type="text"
                    id="subtitle"
                    name="subtitle"
                    placeholder="Enter subtitle"
                    value={subtitle}
                    onChange={(event) => setSubtitle(event.target.value)}
                  />
                </div>
                <div className="flex flex-col items-start gap-2 w-full">
                  <h1>Blog Content</h1>
                  <Editor
                    content={content}
                    ref={editorRef}
                    onChange={(newContent) => {
                      setContent(newContent);
                      if (error.content)
                        setError((prev) => ({ ...prev, content: "" }));
                    }}
                  />
                  {error.content && (
                    <span className="bg-red-500 text-sm p-2 text- border-2 border-black rounded">
                      {error.content}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start gap-4 border-2 border-black rounded p-6 mr-4 lg:w-[30%] h-fit">
              <div className="flex flex-col items-start gap-5 w-full">
                <h1 className="font-bold text-xl">Tags</h1>
                <div className="flex gap-3 w-full">
                  <input
                    className="border-2 border-black p-2 w-[60%]"
                    type="text"
                    placeholder="Enter tags"
                    value={tag}
                    onChange={(event) => setTag(event.target.value)}
                  />
                  <button
                    disabled={!isTagInputValid()}
                    className={`p-2 border-2 border-black rounded w-[20%] ${
                      isTagInputValid()
                        ? "bg-emerald-400 cursor-pointer hover:bg-emerald-300"
                        : "bg-emerald-200 cursor-not-allowed"
                    }`}
                    onClick={createTags}
                  >
                    Add
                  </button>
                </div>
              </div>

              {tags.length !== 0 && isTagVisible && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((elem, idx) => (
                    <div
                      key={elem.id}
                      className="py-1 px-2 border-2 rounded-2xl bg-teal-300 "
                    >
                      <span className="flex gap-3 items-center justify-between font-bold text-lg text-black ">
                        {elem.tag}
                        <CircleX
                          className="cursor-pointer"
                          size={20}
                          strokeWidth={2.25}
                          onClick={() => tagVisible(idx)}
                        />
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <button
                type="submit"
                className={`p-2 border-2 border-black rounded mt-8 ${
                  isFormValid()
                    ? "bg-emerald-400 cursor-pointer hover:bg-emerald-300 "
                    : "bg-emerald-200 cursor-not-allowed"
                }`}
              >
                Publish Blog
              </button>
            </div>
          </form>
        </div>

        {blogs.map((blog) => {
          return (
            <div
              key={blog.id}
              className="flex flex-col items-start gap-2 border-2 border-black rounded py-4 px-4 w-[800px] my-6 mx-4"
            >
              <div className="font-bold text-2xl text-black mb-1">
                Title: {blog.title}
              </div>
              {blog.subtitle && (
                <h2 className="font-bold text-xl text-black mb-3">
                  Subtitle: {blog.subtitle}
                </h2>
              )}
              <div className="font-bold text-xl text-black mb-3 flex flex-col gap-2">
                Blog:
                <h2
                  className="font-normal text-black text-xl mb-4"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>
              <div className="font-bold text-lg text-black flex gap-2">
                Tags:
                <div className="flex flex-wrap gap-3">
                  {blog.tags.map((elem) => {
                    return (
                      <span
                        key={elem.id}
                        className=" px-2 border-2 rounded bg-teal-300 font-bold text-lg text-black"
                      >
                        {elem.tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
