// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiArrowRight, FiUser, FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-sm py-4 shadow-container border-b border-accentLight/30">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
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

        <div className="hidden md:flex space-x-8 items-center">
          {[
            { path: "/", label: "Home" },
            { path: "/emotion", label: "Emotion Detection" },
            { path: "/hadith", label: "Hadith Explorer" },
            { path: "/about", label: "About" },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="font-medium text-textDark hover:text-accentLight transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {token ? (
            <>
              <Link
                to="/profile"
                className="font-medium text-textDark hover:text-accentLight transition-colors flex items-center gap-1"
              >
                <FiUser className="text-lg" /> Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-secondary font-medium text-textLight hover:text-accentLight transition-colors flex items-center gap-1"
              >
                <FiLogOut className="text-lg" /> Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-gradient-to-r from-accent to-goldLight text-textDark font-bold py-2 px-5 rounded-full transition-all duration-300 shadow-md shadow-accent/30 hover:shadow-accent/50 flex items-center gap-2"
            >
              Login <FiArrowRight />
            </Link>
          )}
        </div>

        <button
          className="bg-secondary md:hidden text-2xl text-textLight"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white px-4 py-6 border-t border-accentLight/20"
        >
          <div className="flex flex-col space-y-4">
            {[
              { path: "/", label: "Home" },
              { path: "/emotion", label: "Emotion Detection" },
              { path: "/hadith", label: "Hadith Explorer" },
              { path: "/about", label: "About" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="font-medium text-textDark hover:text-accentLight py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="border-t border-accentLight/20 pt-4 mt-2">
              {token ? (
                <>
                  <Link
                    to="/profile"
                    className="font-medium text-textDark hover:text-accentLight py-2 block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="bg-secondary font-medium text-textLight hover:text-accentLight py-2 block w-full text-center"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-accent to-goldLight text-textDark font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-md shadow-accent/30 hover:shadow-accent/50 text-center block mt-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
