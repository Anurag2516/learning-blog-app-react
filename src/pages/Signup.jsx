import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { TriangleAlert } from "lucide-react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const {
    navigate,
    username,
    setUsername,
    userEmail,
    setUserEmail,
    userPassword,
    setUserPassword,
    error,
    setError,
    isUserAvailable,
    setIsUserAvailable,
    handleSubmit,
  } = useSignup();

  return (
    <>
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="bg-linear-to-br from-emerald-50 to-emerald-100 flex items-center justify-center p-12">
              <div className="w-full max-w-xl ">
                <DotLottieReact src="/Secure Login.lottie" loop autoplay />
              </div>
            </div>

            <div className="p-12 flex items-center">
              <div className="w-full space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-800 mb-2">
                    Welcome
                  </h2>
                  <p className="text-slate-600">Create an account</p>
                </div>

                <form onSubmit={(e) => handleSubmit(e)} className="space-y-5">
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-slate-700 mb-1.5"
                    >
                      Username
                    </label>
                    <input
                      id="username"
                      type="username"
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        if (error.isUsernameError)
                          setError((prev) => ({
                            ...prev,
                            isUsernameError: "",
                          }));
                      }}
                      placeholder="Enter your Username"
                    />
                    {error.isUsernameError && (
                      <div className="text-red-500 text-sm mt-1">
                        {error.isUsernameError}
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-700 mb-1.5"
                    >
                      Email ID
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                      value={userEmail}
                      onChange={(e) => {
                        setUserEmail(e.target.value);
                        if (error.isEmailError)
                          setError((prev) => ({ ...prev, isEmailError: "" }));
                      }}
                      placeholder="Enter your Email"
                    />
                    {error.isEmailError && (
                      <div className="text-red-500 text-sm mt-1">
                        {error.isEmailError}
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-slate-700 mb-1.5"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                      value={userPassword}
                      onChange={(e) => {
                        setUserPassword(e.target.value);
                        if (error.isPasswordError)
                          setError((prev) => ({
                            ...prev,
                            isPasswordError: "",
                          }));
                      }}
                      placeholder="Enter your password"
                    />
                    {error.isPasswordError && (
                      <div className="text-red-500 text-sm mt-1">
                        {error.isPasswordError}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2.5 rounded-lg transition"
                  >
                    Sign Up
                  </button>
                </form>
                <div className="flex items-center justify-center gap-2">
                  <p className="text-slate-800 font-medium text-base">
                    Already have an account?
                  </p>
                  <button
                    type="button"
                    className="text-blue-500 font-semibold text-base underline cursor-pointer hover:text-blue-700"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isUserAvailable && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 transition-all duration-300 transform
        animate-slide-down"
        >
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <TriangleAlert className="text-red-600" />
            </div>

            <h2 className="text-xl font-semibold text-slate-800">
              Account already exists.
            </h2>

            <p className="text-slate-600">
              Account with this credentials already exists. Please login
              instead.
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsUserAvailable(null)}
                className="px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 cursor-pointer transition"
              >
                Cancel
              </button>
              <button
                onClick={() => navigate("/login")}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 py-2.5 cursor-pointer rounded-lg transition"
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
