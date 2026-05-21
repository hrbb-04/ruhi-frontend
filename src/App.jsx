// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmotionInput from "./EmotionInput";
import HadithExplorer from "./hadith/HadithExplorer";
import LandingPage from "./LandingPage";
import "./index.css";
import { ScrollProvider } from "./context/ScrollContext";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import AuthPage from "./auth/AuthPage";
import { AuthProvider } from "./context/AuthContext";
import MyProfile from "./auth/MyProfile";
import Navbar from "./components/Navbar";
import AboutPage from "./AboutPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollProvider>
          <div className="App min-h-screen bg-gradient-to-br from-primary to-primaryMedium">
            <Navbar />
            <div className="pt-20">
              {" "}
              {/* Added padding to avoid navbar overlap */}
              <Routes>
                <Route path="/emotion" element={<EmotionInput />} />
                <Route path="/hadith" element={<HadithExplorer />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/" element={<LandingPage />} />
                <Route path="/profile" element={<MyProfile />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/register" element={<AuthPage />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                  path="/reset-password/:token"
                  element={<ResetPassword />}
                />
              </Routes>
            </div>
          </div>
        </ScrollProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
