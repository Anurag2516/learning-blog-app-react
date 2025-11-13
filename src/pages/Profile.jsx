import { useBlogs } from "../context/BlogContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { formatDateTime } from "../utils/formatDateTime";
import { Mail, UserRound } from "lucide-react";
import toast from "react-hot-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { users, setUsers, currentUser, setCurrentUser } = useAuth();
  const { blogs, setBlogs } = useBlogs();
  const userBlogs = blogs.filter((i) => i.userId === currentUser[0].userId);

  const handleDeleteAccount = () => {
    const newArr = users.filter((i) => i.userId !== currentUser[0].userId);
    setUsers(newArr);
    const newBlogs = blogs.filter((i) => i.userId !== currentUser[0].userId);
    setBlogs(newBlogs);

    setCurrentUser([]);
    toast.success("Account deleted successfully!");
    navigate("/signup", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>

          <div className="relative px-8 pb-8">
            <div className="flex flex-col items-center -mt-16">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-5xl font-bold shadow-xl border-4 border-white">
                {currentUser[0].username.charAt(0).toUpperCase()}
              </div>

              <h1 className="mt-4 text-3xl font-bold text-gray-800">
                {currentUser[0].username}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Member since {formatDateTime(currentUser[0].createdAt)}
              </p>
            </div>

            <div className="mt-8 flex justify-center">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center w-full max-w-xs">
                <p className="text-4xl font-bold text-blue-600">
                  {userBlogs.length}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Total Blogs Published
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Account Details
              </h2>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="text-gray-800 font-medium">
                    {currentUser[0].userEmail}
                  </p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail size={19} className="text-blue-600" />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500">Username</p>
                  <p className="text-gray-800 font-medium">
                    {currentUser[0].username}
                  </p>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <UserRound size={19} className="text-purple-600" />
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 border-2 border-red-200 rounded-xl bg-red-50">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Danger Zone
              </h3>
              <p className="text-sm text-red-600 mb-4">
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
              <button
                className="cursor-pointer w-full py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
