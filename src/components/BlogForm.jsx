import { RotateCw } from "lucide-react";
import Editor from "./Editor";
import { useBlogForm } from "../hooks/useBlogForm";
import { useTags } from "../hooks/useTags";
import CreateBlogTags from "./CreateBlogTags";
import { useParams } from "react-router-dom";

export default function BlogForm() {
  const tagsState = useTags();

  const blogFormState = useBlogForm(
    tagsState.tags,
    tagsState.setTag,
    tagsState.setTags,
    tagsState.setIsTagVisible
  );

  const {
    title,
    setTitle,
    subtitle,
    setSubtitle,
    content,
    setContent,
    error,
    setError,
    createBlogs,
    editorRef,
  } = blogFormState;

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-start w-full py-4 px-6 bg-slate-100">
        <form
          className="flex w-full gap-2 bg-white"
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
                    className="cursor-pointer"
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
                    className="cursor-pointer"
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
                    className="cursor-pointer"
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

          <CreateBlogTags {...tagsState} {...blogFormState} />
        </form>
      </div>
    </>
  );
}
