import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  return (
    <header>
      <h1>AI Quranic Guide</h1>
      <nav className="main-nav">
        <Link
          to="/emotion"
          className={`nav-button ${
            location.pathname === "/emotion" ? "active" : ""
          }`}
        >
          Emotion Detection
        </Link>
        <Link
          to="/hadith"
          className={`nav-button ${
            location.pathname === "/hadith" ? "active" : ""
          }`}
        >
          Hadith Explorer
        </Link>
      </nav>
    </header>
  );
};

export default Navigation;
