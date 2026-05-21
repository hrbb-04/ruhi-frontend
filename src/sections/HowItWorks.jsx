// src/sections/HowItWorks.jsx
import RoundedContainer from "../components/RoundedContainer";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import geometricPattern from "../assets/backgrounds/geometric-pattern.svg";
import { useScrollContext } from "../context/ScrollContext";

const HowItWorks = () => {
  const { activeSection } = useScrollContext();
  const sectionIndex = 3; // Updated index
  const steps = [
    {
      title: "Share Your Feelings",
      description: "Describe your current emotional state in your own words",
      icon: "1",
    },
    {
      title: "AI Emotion Analysis",
      description: "Our system detects emotions and context",
      icon: "2",
    },
    {
      title: "Receive Guidance",
      description: "Get relevant Quranic verses, Hadith, and Duas",
      icon: "3",
    },
  ];

  return (
    <section className="snap-section relative py-20 min-h-screen flex items-center justify-center">
      {/* Background */}
      <div
        className="absolute inset-0 bg-section-gold/10 z-0"
        style={{
          backgroundImage: `url(${geometricPattern})`,
          backgroundSize: "30%",
          backgroundPosition: "center",
          opacity: 0.2,
        }}
      >
        <div className="absolute inset-0 bg-white/5 backdrop-blur-xs"></div>
      </div>

      <div className="w-full px-4">
        <RoundedContainer
          bgColor="bg-white/90"
          isActive={activeSection === sectionIndex}
        >
          <motion.h2
            className="text-4xl font-display font-bold text-center mb-16 text-section-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            How It Works
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="w-24 h-24 rounded-full bg-section-gold/10 flex items-center justify-center text-3xl font-bold text-section-text mx-auto mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-display font-bold mb-3 text-section-text">
                  {step.title}
                </h3>
                <p className="text-section-text/80">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </RoundedContainer>
      </div>
    </section>
  );
};

export default HowItWorks;
