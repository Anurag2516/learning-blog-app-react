import Editor from "./Editor";
import { useBlogForm } from "../hooks/useBlogForm";
import { useTags } from "../hooks/useTags";
import CreateBlogTags from "./CreateBlogTags";

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
    editingId,
    handleCancelEdit,
    isFormValid,
    updateBlogs,
    emptyForm,
    notification,
    setNotification,
  } = blogFormState;

  return (
    <>
      {notification && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-green-400 px-4 py-4 rounded shadow-lg z-50">
          {notification}
        </div>
      )}
      <div className="py-24 md:py-28 px-10 lg:px-0 bg-slate-50">
        <form
          className="flex flex-col items-start gap-10 py-12 px-6 md:px-12 max-w-5xl mx-auto shadow-lg bg-white rounded-lg"
          onSubmit={(e) => {
            e.preventDefault();
            createBlogs();
          }}
        >
          <div className="flex flex-col items-start gap-3 w-full">
            <h1 className="font-semibold text-xl md:text-2xl text-slate-700">
              Title <span className="text-lg md:text-xl">*</span>
            </h1>

            <input
              className="px-4 py-3 shadow-lg w-full text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
              type="text"
              id="title"
              name="title"
              placeholder="Enter blog title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                if (error.title) setError((prev) => ({ ...prev, title: "" }));
              }}
            />

            {error.title && (
              <span className="text-red-500 text-base">{error.title}</span>
            )}
          </div>

          <div className="flex flex-col items-start gap-2 w-full">
            <h1 className="font-semibold text-xl md:text-2xl text-slate-700">
              Subtitle
              <span className="font-normal text-lg italic text-slate-500 mx-2">
                (optional)
              </span>
            </h1>

            <input
              className="px-4 py-3 shadow-lg w-full text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
              type="text"
              id="subtitle"
              name="subtitle"
              placeholder="Enter subtitle"
              value={subtitle}
              onChange={(event) => setSubtitle(event.target.value)}
            />
          </div>
          <div className="flex flex-col items-start gap-2 w-full">
            <h1 className="font-semibold text-xl md:text-2xl text-slate-700">
              Blog Content <span className="text-lg md:text-xl">*</span>
            </h1>

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
              <span className="text-red-500 text-base ">{error.content}</span>
            )}
          </div>

          <CreateBlogTags {...tagsState} {...blogFormState} />

          <div className="flex flex-wrap justify-center md:justify-between gap-2 w-full my-8">
            <button
              type="reset"
              className="p-2 rounded mt-8 font-semibold text-white text-base md:text-lg bg-red-500 cursor-pointer hover:bg-red-600 transition-all"
              onClick={() => {
                emptyForm();
                setNotification("Form Reset Successfully!");
              }}
            >
              Reset Form
            </button>
            {editingId ? (
              <div className="flex flex-wrap justify-center gap-2 md:gap-4 ">
                <button
                  type="submit"
                  onClick={handleCancelEdit}
                  className="p-2 rounded mt-8 font-semibold text-base md:text-lg text-white bg-blue-400 cursor-pointer hover:bg-blue-500 transition-all"
                >
                  Cancel Edit
                </button>
                <button
                  type="submit"
                  onClick={updateBlogs}
                  className={`p-2 rounded mt-8 font-semibold text-base md:text-lg text-white ${
                    isFormValid()
                      ? "bg-emerald-500 cursor-pointer hover:bg-emerald-600 transition-all"
                      : "bg-emerald-400 cursor-not-allowed"
                  }`}
                >
                  Update Blog
                </button>
              </div>
            ) : (
              <button
                type="submit"
                className={`p-2 rounded mt-8 font-semibold text-base md:text-lg text-white ${
                  isFormValid()
                    ? "bg-emerald-500 cursor-pointer hover:bg-emerald-600 transition-all"
                    : "bg-emerald-400 cursor-not-allowed"
                }`}
              >
                Publish Blog
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
