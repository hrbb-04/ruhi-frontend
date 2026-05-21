// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiLogOut,
  FiTrash2,
  FiEdit,
  FiSave,
} from "react-icons/fi";

const MyProfile = () => {
  const { token, logout, login } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setProfile(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setLoading(false);
      } catch (error) {
        console.error("Fetch Profile Error:", error);
        if (error.response?.status === 401) {
          logout();
          navigate("/login");
        } else {
          setError("Failed to fetch profile");
        }
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, navigate, logout]);

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/profile`,
        { name, email },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
        login(response.data.access_token);
      }

      setProfile({ ...profile, name, email });
      setEditMode(false);
      setError("");
    } catch (error) {
      setError(error.response?.data?.detail || "Failed to update profile");
    }
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This cannot be undone.",
      )
    ) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        logout();
        navigate("/");
      } catch (error) {
        console.error("Delete Account Error:", error);
        setError("Failed to delete account");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primaryMedium">
        <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primaryMedium py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-white/95 to-primary/20 backdrop-blur-sm rounded-3xl shadow-container border border-accentLight/30 p-8"
        >
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {profile && (
            <>
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-display font-bold text-textDark">
                  My Profile
                </h1>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setEditMode(!editMode)}
                  className="flex items-center gap-2 bg-secondary to-accentLight/10 border border-accentLight/30 text-textLight font-bold py-3 px-6 rounded-full transition-all"
                >
                  {editMode ? (
                    <>
                      <FiSave /> Cancel
                    </>
                  ) : (
                    <>
                      <FiEdit /> Edit Profile
                    </>
                  )}
                </motion.button>
              </div>

              {editMode ? (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-secondary to-accentDark text-textLight flex items-center justify-center font-display font-bold text-2xl">
                      {name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm text-textDark/70">
                      Profile Photo
                    </span>
                  </div>

                  <div className="space-y-6">
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textDark/50" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-accentLight/50 bg-white/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-highlight"
                        placeholder="Full Name"
                      />
                    </div>

                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textDark/50" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-accentLight/50 bg-white/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-highlight"
                        placeholder="Email Address"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleUpdateProfile}
                      className="w-full bg-gradient-to-r from-accent to-goldLight text-textDark font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg shadow-accent/30 hover:shadow-accent/50"
                    >
                      Update Profile
                    </motion.button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-8">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-secondary to-accentDark text-textLight flex items-center justify-center font-display font-bold text-2xl">
                        {profile.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h2 className="text-2xl font-display font-bold text-textDark">
                          {profile.name}
                        </h2>
                        <p className="text-textDark/80">{profile.email}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-10">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={logout}
                        className="flex items-center gap-2 bg-secondary to-accentLight/10 border border-accentLight/30 text-textLight font-bold py-3 px-6 rounded-full transition-all"
                      >
                        <FiLogOut /> Logout
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDeleteAccount}
                        className="flex items-center gap-3 bg-gradient-to-r from-red-400 via-red-500 to-red-600 border border-red-300/50 text-red-900 font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
                      >
                        <FiTrash2 /> Delete Account
                      </motion.button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MyProfile;
