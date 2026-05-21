// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import Lottie from "react-lottie-player";
import quranAnimation from "../assets/reciting-quran.json";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Something went wrong");

      setSuccess("Password reset instructions sent to your email");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primaryMedium p-4">
      <div className="max-w-4xl w-full bg-gradient-to-br from-white/95 to-primary/20 backdrop-blur-sm rounded-3xl shadow-container border border-accentLight/30 overflow-hidden flex flex-col lg:flex-row">
        {/* Left - Animation */}
        <div className="w-full lg:w-1/2 bg-secondary hidden lg:flex flex-col items-center justify-center p-8 relative">
          <div className="relative z-10 text-center px-8 w-full max-w-md">
            <Lottie
              loop
              animationData={quranAnimation}
              play
              className="w-full"
              style={{ backgroundColor: "transparent" }}
            />
            <h2 className="text-2xl font-display font-bold text-textLight mt-4">
              Reconnect with Divine Guidance
            </h2>
          </div>
          <div className="absolute top-0 left-0 w-full h-full pattern-islamic opacity-10"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-accentLight/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        </div>

        {/* Right - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
          <div className="w-full max-w-md">
            {/* RUHI branding */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center"
                >
                  <motion.div
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-secondary to-accentDark flex items-center justify-center text-textLight font-display font-bold text-xl"
                    whileHover={{ rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    R
                  </motion.div>
                  <span className="ml-3 text-2xl font-display font-bold text-secondary">
                    RUHI
                  </span>
                </motion.div>
              </div>

              <h1 className="text-3xl font-display font-bold text-textDark mb-2">
                Reset Password
              </h1>
              <p className="text-textDark/80">
                Enter your email to receive a password reset link
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

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-textDark/50">
                  <FiMail className="text-lg" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-accentLight/50 bg-white/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-highlight"
                  placeholder="Email Address"
                  required
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
                  "Send Reset Link"
                )}
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-textDark/80">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-secondary font-bold hover:text-accentDark hover:underline"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
