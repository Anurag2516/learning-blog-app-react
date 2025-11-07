import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="flex items-center justify-between py-4 px-32 bg-black text-white">
        <h1 className="font-semibold text-3xl">blogApp</h1>
        <Link
          to="/create-blogs"
          className="mr-16 px-2 py-2 border-2 rounded-lg bg-emerald-400 text-black text-lg font-medium cursor-pointer hover:bg-emerald-500 transition-all "
        >
          Create Blogs
        </Link>
      </div>
    </>
  );
};

export default Navbar;
