// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Lottie from "react-lottie-player";
import lightsAnimation from "../assets/lights-animation.json";

const CTASection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="snap-section relative py-16 min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primaryMedium">
      {/* Animation for top - visible on all screens */}
      <div className="absolute top-0 left-0 w-full h-1/3 md:h-1/2 flex justify-center z-0">
        <Lottie
          animationData={lightsAnimation}
          play
          loop
          speed={0.7}
          className="w-full max-w-4xl"
        />
      </div>

      <div className="w-full px-4 relative z-10 mt-32 md:mt-0">
        <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center md:text-left order-2 md:order-1"
          >
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 text-textDark"
              variants={itemVariants}
            >
              Find Peace Through{" "}
              <span className="text-accentLight">Divine Guidance</span>
            </motion.h2>

            <motion.p
              className="text-xl mb-8 max-w-md mx-auto md:mx-0 text-textDark/90"
              variants={itemVariants}
            >
              Let divine wisdom help you navigate your emotions and find inner
              calm
            </motion.p>

            <motion.div variants={itemVariants}>
              <Link to="/emotion">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-accent to-goldLight text-textDark font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg shadow-accent/30 hover:shadow-accent/50 text-lg w-full md:w-auto"
                >
                  Start Emotion Detection
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          <div className="flex justify-center order-1 md:order-2 mb-12 md:mb-0">
            <div className="bg-white backdrop-blur-sm rounded-2xl p-6 max-w-md w-full shadow-lg shadow-accent/30">
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-6 text-textDark">
                  Why Choose Us?
                </h3>
                <ul className="space-y-4">
                  {[
                    "Personalized spiritual guidance",
                    "Authentic Quranic & Hadith sources",
                    "Emotion-based recommendations",
                    "24/7 accessible platform",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start text-left"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.5 }}
                    >
                      <span className="text-accentLight text-xl font-bold mr-3">
                        •
                      </span>
                      <span className="text-textDark text-lg">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
