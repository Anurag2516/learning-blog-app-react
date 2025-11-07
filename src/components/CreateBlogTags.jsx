import { CircleX, RotateCw } from "lucide-react";

const CreateBlogTags = ({
  tag,
  setTag,
  tags,
  setTags,
  isTagVisible,
  isTagInputValid,
  createTags,
  editingId,
  handleCancelEdit,
  isFormValid,
  updateBlogs,
  emptyForm,
}) => {
  return (
    <>
      <div className="flex flex-col items-start gap-4 border-2 border-black rounded p-6 mr-4 lg:w-[30%] h-fit">
        <div className="flex flex-col items-start gap-5 w-full">
          <div className="flex w-full justify-between pr-2">
            <h1 className="font-bold text-2xl">
              Tags
              <span className="font-normal text-lg mx-2">(optional)</span>
            </h1>
            <button
              type="button"
              className="cursor-pointer"
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
                    onClick={() =>
                      setTags((prev) => prev.filter((_, i) => i !== idx))
                    }
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
    </>
  );
};

export default CreateBlogTags;
