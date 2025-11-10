import { CircleX, RotateCw } from "lucide-react";

const CreateBlogTags = ({
  tag,
  setTag,
  tags,
  setTags,
  isTagVisible,
  isTagInputValid,
  createTags,
}) => {
  return (
    <>
      <div className="flex flex-col items-start gap-4 w-full md:w-2xl">
        <div className="flex flex-col items-start gap-5 w-full">
          <h1 className="font-semibold text-xl md:text-2xl text-slate-700">
            Tags
            <span className="font-normal text-lg italic text-slate-500 mx-2">
              (optional)
            </span>
          </h1>

          <div className="flex gap-3 w-full">
            <input
              className="border-2 shadow-lg text-slate-900 rounded-lg py-2 md:py-3 px-2 w-full md:w-[70%] border-slate-300 focus:border-emerald-500 focus:outline-none transition-all"
              type="text"
              placeholder="Enter tags"
              value={tag}
              onChange={(event) => setTag(event.target.value)}
            />
            <button
              disabled={!isTagInputValid()}
              className={`px-2 rounded font-semibold text-base md:text-lg text-white ${
                isTagInputValid()
                  ? "bg-emerald-500 cursor-pointer hover:bg-emerald-600 transition-all"
                  : "bg-emerald-400 cursor-not-allowed"
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
                className="py-1 px-2 shadow-lg rounded-2xl bg-emerald-100"
              >
                <span className="flex gap-3 items-center justify-between font-bold text-lg text-emerald-700 ">
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
      </div>
    </>
  );
};

export default CreateBlogTags;
