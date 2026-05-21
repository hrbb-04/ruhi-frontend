// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./sections/HeroSection";
import StatsSection from "./sections/StatsSection";
import ModuleDetails from "./sections/ModuleDetails";
import HowItWorks from "./sections/HowItWorks";
import QuotesSection from "./sections/QuotesSection";
import CTASection from "./sections/CTASection";
import Footer from "./components/Footer";
import ModuleDetails2 from "./sections/ModuleDetails2";

const LandingPage = () => {
  useEffect(() => {
    document.title = "Ruhi";
  }, []);

  return (
    <div
      className="min-h-screen overflow-hidden overflow-y-scroll snap-y snap-mandatory"
      style={{ scrollBehavior: "smooth" }}
    >
      <HeroSection />
      <StatsSection />
      <ModuleDetails />
      <QuotesSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;
