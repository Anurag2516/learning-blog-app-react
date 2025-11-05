import { CircleX, FilePenLine, RotateCw, Trash2, X } from "lucide-react";
import Editor from "./Editor";
import { useBlogForm } from "../hooks/useBlogForm";
import { useTags } from "../hooks/useTags";
import { useState } from "react";

export default function BlogForm() {
  const {
    tag,
    setTag,
    tags,
    setTags,
    isTagVisible,
    setIsTagVisible,
    isTagInputValid,
    createTags,
    tagVisible,
  } = useTags();

  const {
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
    handleEdit,
    handleCancelEdit,
    isFormValid,
    createBlogs,
    updateBlogs,
    editorRef,
    emptyForm,
  } = useBlogForm(tags, setTag, setTags, setIsTagVisible);

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-start w-full">
        <form
          className="flex w-full ml-6 gap-2 bg-white"
          onSubmit={(e) => {
            e.preventDefault();
            createBlogs();
          }}
        >
          <div className="lg:w-[70%]">
            <div className="flex flex-col items-start gap-8 border-2 border-black rounded py-6 px-8 w-full">
              <div className="flex flex-col items-start gap-3 w-full">
                <div className="flex w-full justify-between">
                  <h1 className="font-bold text-2xl">Title</h1>
                  <button
                    type="button"
                    className="p-1 bg-red-400 border-2 border-black rounded-lg cursor-pointer hover:bg-red-500 transition-all"
                    title="Reset Field"
                    onClick={() => setTitle("")}
                  >
                    <RotateCw size={20} />
                  </button>
                </div>
                <input
                  className="border-2 border-black rounded-lg px-2 py-3 w-full"
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
                <div className="flex gap-2 w-full justify-between">
                  <h1 className="font-bold text-2xl">
                    Subtitle
                    <span className="font-normal text-lg mx-2">(optional)</span>
                  </h1>
                  <button
                    type="button"
                    className="p-1 bg-red-400 border-2 border-black rounded-lg cursor-pointer hover:bg-red-500 transition-all"
                    title="Reset Field"
                    onClick={() => setSubtitle("")}
                  >
                    <RotateCw size={20} />
                  </button>
                </div>
                <input
                  className="border-2 border-black rounded-lg px-2 py-3 w-full"
                  type="text"
                  id="subtitle"
                  name="subtitle"
                  placeholder="Enter subtitle"
                  value={subtitle}
                  onChange={(event) => setSubtitle(event.target.value)}
                />
              </div>
              <div className="flex flex-col items-start gap-2 w-full">
                <div className="flex gap-2 w-full justify-between">
                  <h1 className="font-bold text-2xl">Blog Content</h1>
                  <button
                    type="button"
                    className="p-1 bg-red-400 border-2 border-black rounded-lg cursor-pointer hover:bg-red-500 transition-all"
                    title="Reset Field"
                    onClick={() => {
                      setContent("");
                      editorRef.current?.clearContent();
                    }}
                  >
                    <RotateCw size={20} />
                  </button>
                </div>
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
              <div className="flex w-full justify-between pr-2">
                <h1 className="font-bold text-2xl">
                  Tags
                  <span className="font-normal text-lg mx-2">(optional)</span>
                </h1>
                <button
                  type="button"
                  className="p-1 bg-red-400 border-2 border-black rounded-lg cursor-pointer hover:bg-red-500 transition-all"
                  title="Reset Field"
                  onClick={() => setTags([])}
                >
                  <RotateCw size={20} />
                </button>
              </div>
              <div className="flex gap-3 w-full">
                <input
                  className="border-2 border-black rounded-lg p-2 w-[80%]"
                  type="text"
                  placeholder="Enter tags"
                  value={tag}
                  onChange={(event) => setTag(event.target.value)}
                />
                <button
                  disabled={!isTagInputValid()}
                  className={`p-2 border-2 border-black rounded w-[20%] ${
                    isTagInputValid()
                      ? "bg-emerald-400 cursor-pointer hover:bg-emerald-300 transition-all"
                      : "bg-emerald-200 cursor-not-allowed"
                  }`}
                  onClick={createTags}
                  onKeyDown={(e) => {
                    if (e.target.key === "Enter") createTags;
                  }}
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

            <div className="flex flex-wrap gap-3 ">
              {editingId ? (
                <div className="flex gap-4 ">
                  <button
                    type="submit"
                    onClick={updateBlogs}
                    className={`p-2 border-2 border-black rounded mt-8 ${
                      isFormValid()
                        ? "bg-emerald-400 cursor-pointer hover:bg-emerald-300 transition-all"
                        : "bg-emerald-200 cursor-not-allowed"
                    }`}
                  >
                    Update Blog
                  </button>
                  <button
                    type="submit"
                    onClick={handleCancelEdit}
                    className="p-2 border-2 border-black rounded mt-8 bg-blue-400 cursor-pointer hover:bg-blue-500 transition-all"
                  >
                    Cancel Edit
                  </button>
                </div>
              ) : (
                <button
                  type="submit"
                  className={`p-2 border-2 border-black rounded mt-8 ${
                    isFormValid()
                      ? "bg-emerald-400 cursor-pointer hover:bg-emerald-300 transition-all"
                      : "bg-emerald-200 cursor-not-allowed"
                  }`}
                >
                  Publish Blog
                </button>
              )}
              <button
                type="reset"
                className="p-2 border-2 border-black rounded mt-8 bg-red-500 cursor-pointer hover:bg-red-600 transition-all"
                onClick={emptyForm}
              >
                Reset Form
              </button>
            </div>
          </div>
        </form>
      </div>

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
              </div>
              <div className="flex gap-3 items-start justify-center">
                <div
                  className="border-2 border-black rounded p-1 cursor-pointer bg-emerald-300 text-black hover:bg-emerald-400 transition-all"
                  title="Edit Blog"
                >
                  <FilePenLine onClick={() => handleEdit(blog)} />
                </div>
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
}
