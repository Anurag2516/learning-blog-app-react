import Editor from "./Editor";
import { useState } from "react";

export default function BlogForm() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  const showTags = () => {
    setTags((prev) => [...prev, tag]);
    setTag("");
  };

  const createBlogs = () => {
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
  };

  return (
    <>
      <div className="mx-5 lg:w-[70%] bg-white">
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
              onChange={(event) => setTitle(event.target.value)}
              required
            />
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
            <Editor content={content} onChange={setContent} />
          </div>
        </div>

        {blogs.map((blog) => {
          return (
            <div
              key={blog.id}
              className="flex flex-col items-start gap-2 border-2 border-black rounded py-4 px-4 w-full"
            >
              <h1>{blog.title}</h1>
              <h2>{blog.subtitle}</h2>
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              <p>
                {!blog.tags || blog.tags.length < 2 ? (
                  <div>Write Something first</div>
                ) : (
                  blog.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="font-bold text-lg text-black p-1 bg-teal-300"
                    >
                      {tag}
                    </span>
                  ))
                )}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col items-start gap-4 border-2 border-black rounded p-6 mr-4 lg:w-[30%]">
        <div className="flex flex-col items-start gap-5 w-full">
          <h1 className="font-bold text-xl">Tags</h1>
          <div className=" flex gap-3 w-full">
            <input
              className="border-2 border-black p-2 w-[60%]"
              type="text"
              placeholder="Enter tags"
              value={tag}
              onChange={(event) => {
                const trimmedValue = event.target.value.trim();
                if (trimmedValue) setTag(trimmedValue);
              }}
            />
            <button
              className="p-2 bg-emerald-400 border-2 border-black rounded w-[20%]"
              onClick={showTags}
            >
              Add
            </button>
          </div>
          {tags.map((tag, idx) => {
            return (
              <div key={idx} className="p-1 bg-teal-300">
                <span className="font-bold text-lg text-black">{tag}</span>
              </div>
            );
          })}
        </div>
        <button
          type="submit"
          className="p-2 bg-emerald-400 border-2 border-black rounded mt-8"
          onClick={() => createBlogs()}
        >
          Publish Blog
        </button>
      </div>
    </>
  );
}
