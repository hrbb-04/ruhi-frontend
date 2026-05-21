import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary text-textLight py-16 w-full">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-secondary to-accentDark flex items-center justify-center text-textLight font-display font-bold text-xl">
              R
            </div>
            <span className="ml-3 text-2xl font-display font-bold text-textLight">
              RUHI
            </span>
          </div>
          <p className="mt-4 text-textLight/80 max-w-md">
            AI-powered spiritual guidance providing personalized Quranic verses,
            Hadith recommendations, and Duas tailored to your emotional state
          </p>
        </div>

        <div>
          <h4 className="font-display font-bold text-xl mb-6">Navigation</h4>
          <ul className="space-y-3">
            {[
              { path: "/", label: "Home" },
              { path: "/emotion", label: "Emotion Detection" },
              { path: "/hadith", label: "Hadith Explorer" },
              { path: "/about", label: "About" },
              { path: "/login", label: "Login" },
            ].map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="text-textLight/80 hover:text-goldLight transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-xl mb-6">Resources</h4>
          <ul className="space-y-3">
            {[
              { path: "/emotion", label: "Quran Verses" },
              { path: "/emotion", label: "Hadith Collection" },
              { path: "/emotion", label: "Daily Duas" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className="text-textLight/80 hover:text-goldLight transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-textLight/20 text-center text-textLight/60">
        © {new Date().getFullYear()} RUHI - Quranic Guidance. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
