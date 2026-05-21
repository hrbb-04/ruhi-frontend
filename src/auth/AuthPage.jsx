// frontend/src/auth/AuthPage.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "react-lottie-player";
import { FiLock, FiMail, FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import quranAnimation from "../assets/reciting-quran.json";
import { useAuth } from "../context/AuthContext";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    document.title = isLogin ? "Login - RUHI" : "Sign Up - RUHI";
  }, [isLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!isLogin && password !== confirmPassword) {
        throw new Error("Passwords don't match");
      }

      const endpoint = isLogin ? "login" : "register";
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, ...(!isLogin && { name }) }),
        },
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Something went wrong");

      if (isLogin) {
        localStorage.setItem("token", data.access_token);
        login(data.access_token);
        navigate("/");
      } else {
        setSuccess("Account created successfully! Redirecting to login...");
        setTimeout(() => setIsLogin(true), 2000);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primaryMedium p-4">
      <div className="max-w-6xl w-full bg-gradient-to-br from-white/95 to-primary/20 backdrop-blur-sm rounded-3xl shadow-container border border-accentLight/30 overflow-hidden flex flex-col lg:flex-row">
        {/* Left column - Animation */}
        <div className="w-full lg:w-1/2 bg-secondary hidden lg:flex flex-col items-center justify-center p-8 relative">
          <div className="relative z-10 text-center px-8 w-full max-w-md">
            <div className="mb-8">
              <Lottie
                loop
                animationData={quranAnimation}
                play
                className="w-full"
                style={{ backgroundColor: "transparent" }}
              />
            </div>

            <h2 className="text-3xl font-display font-bold text-textLight mb-4">
              Find Peace Through Divine Guidance
            </h2>
            <p className="text-textLight/80 text-lg">
              Discover personalized Quranic verses, Hadith, and Duas tailored to
              your emotional state.
            </p>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full pattern-islamic opacity-10"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-accentLight/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        </div>

        {/* Right column - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
          <div className="w-full max-w-md">
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
                {isLogin ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-textDark/80">
                {isLogin
                  ? "Sign in to continue your spiritual journey"
                  : "Join our community for personalized guidance"}
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
              {!isLogin && (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-textDark/50">
                    <FiUser className="text-lg" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-accentLight/50 bg-white/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-highlight"
                    placeholder="Full Name"
                    required
                  />
                </div>
              )}

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

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-textDark/50">
                  <FiLock className="text-lg" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-accentLight/50 bg-white/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-highlight"
                  placeholder="Password"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-textDark/50 hover:text-secondary"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              {!isLogin && (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-textDark/50">
                    <FiLock className="text-lg" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 border border-accentLight/50 bg-white/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-highlight"
                    placeholder="Confirm Password"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-textDark/50 hover:text-secondary"
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              )}

              {/* Forgot password link */}
              {isLogin && (
                <div className="flex justify-end -mt-3">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-secondary hover:text-accentDark hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-accent to-goldLight text-textDark font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg shadow-accent/30 hover:shadow-accent/50"
              >
                {loading ? (
                  <div className="h-5 w-5 border-2 border-textDark border-t-transparent rounded-full animate-spin"></div>
                ) : isLogin ? (
                  "Login"
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-textDark/80">
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError("");
                    setSuccess("");
                  }}
                  className="bg-secondary backdrop-blur-sm border border-accentLight/30 text-textLight hover:bg-accentDark font-bold py-3 px-6 rounded-full transition-all duration-300"
                >
                  {isLogin ? "Sign Up" : "Login"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
