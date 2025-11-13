import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useAuth();

  const handleLogout = () => {
    setCurrentUser([]);
    toast.success(`See you soon, ${currentUser[0].username}!`);
    navigate("/login", { replace: true });
  };
  return (
    <>
      <div className="flex items-center justify-between fixed w-full z-50 py-4 px-8 md:px-16 lg:px-32 bg-slate-900 text-white shadow-lg">
        <h1 className="font-semibold text-xl md:text-3xl bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          blogIt
        </h1>

        <div className="flex items-center gap-6">
          <Link
            to="/create-blogs"
            className="px-4 py-2 rounded-lg text-white text-sm md:text-lg font-medium cursor-pointer bg-emerald-500 hover:bg-emerald-600 transition-all shadow-md hover:shadow-lg"
          >
            Create Blog
          </Link>

          <div className="relative group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center font-bold text-lg md:text-xl text-white cursor-pointer ring-2 ring-emerald-400/50 hover:ring-emerald-400 transition-all shadow-lg">
              {currentUser && currentUser.length > 0
                ? currentUser[0].username.charAt(0).toUpperCase()
                : "G"}
            </div>

            <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
              <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700"></div>
              <button
                type="button"
                className=" cursor-pointer w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-slate-700 transition-colors"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                Profile
              </button>

              <button
                type="button"
                className="cursor-pointer w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-700 transition-colors"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
