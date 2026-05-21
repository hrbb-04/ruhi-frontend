import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AuthForm = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (type === "register" && password !== confirmPassword) {
        throw new Error("Passwords don't match");
      }

      let endpoint, body;
      if (type === "login") {
        endpoint = "login";
        body = JSON.stringify({ email, password });
      } else {
        endpoint = "register";
        body = JSON.stringify({ email, password });
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
        },
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || data.message || "Something went wrong");
      }

      if (type === "login") {
        localStorage.setItem("token", data.access_token);
        navigate("/");
      } else {
        // Auto-login after registration
        const loginResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          },
        );

        const loginData = await loginResponse.json();
        if (!loginResponse.ok) throw new Error("Auto-login failed");

        localStorage.setItem("token", loginData.access_token);
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-primary">
        {type === "login" ? "Login to Your Account" : "Create an Account"}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {typeof error === "string" ? error : JSON.stringify(error)}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
            minLength={6}
          />
        </div>

        {type === "register" && (
          <div>
            <label className="block text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
              minLength={6}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary py-3 rounded-lg flex justify-center"
        >
          {loading ? (
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : type === "login" ? (
            "Login"
          ) : (
            "Register"
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        {type === "login" ? (
          <>
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary font-medium hover:underline"
              >
                Register
              </Link>
            </p>
            <Link
              to="/forgot-password"
              className="mt-2 text-sm text-gray-600 hover:text-primary hover:underline"
            >
              Forgot your password?
            </Link>
          </>
        ) : (
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
