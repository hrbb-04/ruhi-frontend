// frontend/src/auth/ResetPassword.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FiLock } from "react-icons/fi";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setTokenValid(false);
      setError("Invalid reset token");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (newPassword !== confirmPassword) {
        throw new Error("Passwords don't match");
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, new_password: newPassword }),
        },
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Something went wrong");

      setSuccess("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!tokenValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e6e6fa] to-[#f8f8ff] p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl ring-1 ring-purple-300 p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Invalid Token
          </h2>
          <div className="text-center text-red-500 mb-6">
            The password reset link is invalid or has expired.
          </div>
          <div className="text-center">
            <Link
              to="/forgot-password"
              className="text-purple-700 font-medium hover:text-purple-900 hover:underline"
            >
              Request a new reset link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primaryMedium p-4">
      <div className="max-w-md w-full bg-gradient-to-br from-white/95 to-primary/20 backdrop-blur-sm rounded-3xl shadow-container border border-accentLight/30 p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-secondary to-accentDark flex items-center justify-center text-textLight font-display font-bold text-2xl shadow-md">
              R
            </div>
          </div>
          <h1 className="text-3xl font-display font-bold text-textDark mb-2">
            Reset Your Password
          </h1>
          <p className="text-textDark/80">
            Create a new password for your account
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-textDark/50">
              <FiLock className="text-lg" />
            </div>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-accentLight/50 bg-white/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-highlight"
              placeholder="New Password"
              required
              minLength={6}
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-textDark/50">
              <FiLock className="text-lg" />
            </div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-accentLight/50 bg-white/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-highlight"
              placeholder="Confirm New Password"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-accent to-goldLight text-textDark font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg shadow-accent/30 hover:shadow-accent/50"
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-textDark border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
