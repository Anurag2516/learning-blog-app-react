import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="flex items-center justify-between fixed w-full z-50 py-4 px-8 md:px-16 lg:px-32 bg-slate-900 text-white">
        <h1 className="font-semibold text-xl md:text-3xl">blogApp</h1>
        <Link
          to="/create-blogs"
          className="lg:mr-16 px-2 py-2 rounded-lg text-white text-sm md:text-lg font-medium cursor-pointer bg-emerald-500 hover:bg-emerald-600 transition-all "
        >
          Create Blogs
        </Link>
      </div>
    </>
  );
};

export default Navbar;
