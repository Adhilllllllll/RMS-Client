import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import ChangePasswordModal from "../components/ChangePasswordModal";
import ForgotPasswordModal from "../components/ForgotPasswordModal";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user, loading, error } = useSelector((state) => state.auth);

  const navigateToDashboard = (role) => {
    if (role === "admin") navigate("/admin/dashboard", { replace: true });
    else if (role === "reviewer") navigate("/reviewer/dashboard", { replace: true });
    else if (role === "student") navigate("/student/dashboard", { replace: true });
    else if (role === "advisor") navigate("/advisor/dashboard", { replace: true });
    else navigate("/", { replace: true });
  };

  // Redirect authenticated users away from login page
  useEffect(() => {
    if (isAuthenticated && user) {
      navigateToDashboard(user.role);
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then((payload) => {
        // Check if user must change password
        if (payload.mustChangePassword) {
          setPendingUser(payload);
          setShowChangePassword(true);
        } else {
          const role = payload?.user?.role;
          navigateToDashboard(role);
        }
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  const handlePasswordChanged = () => {
    setShowChangePassword(false);
    // Clear form
    setEmail("");
    setPassword("");
    setPendingUser(null);
    // Show success message and prompt to login again
    alert("Password changed successfully! Please login with your new password.");
  };

  return (
    <>
      <ChangePasswordModal
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
        userEmail={email}
        onSuccess={handlePasswordChanged}
      />
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900 transition-colors duration-300">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-10">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Sign in to access your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:border-black focus:ring-0 focus:bg-white focus:outline-none transition-all duration-200 sm:text-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:border-black focus:ring-0 focus:bg-white focus:outline-none transition-all duration-200 sm:text-sm"
                required
              />
              <div className="mt-1 text-right">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-gray-500 hover:text-black hover:underline transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-black hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : "Sign In"}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 rounded-lg bg-red-50 border border-red-100">
              <p className="text-sm text-center text-red-600 font-medium">{typeof error === "string" ? error : "An error occurred"}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;

