// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import Lottie from "react-lottie-player";
import quranAnimation from "../assets/quran-animation.json";

const HeroSection = () => {
  const [animationPlaying, setAnimationPlaying] = useState(true);

  return (
    <section className="snap-section pt-40 pb-60 px-4 min-h-screen snap-start flex items-center relative overflow-visible bg-gradient-to-br from-secondary/90 to-accentDark">
      <div className="w-full px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-display font-bold leading-tight text-textLight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Spiritual Guidance Through{" "}
              <span className="text-highlight drop-shadow-gold">
                Divine Wisdom
              </span>
            </motion.h1>
            <motion.p
              className="mt-6 text-xl text-textLight/95 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Discover personalized Quranic verses, Hadith, and Duas tailored to
              your emotional state
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link to="/emotion">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-accent to-goldLight text-textDark font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg shadow-accent/30 hover:shadow-accent/50"
                >
                  Emotion Detection
                </motion.button>
              </Link>
              <Link to="/hadith">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-sm border border-accentLight/30 text-textLight hover:bg-white/20 font-bold py-3 px-6 rounded-full transition-all duration-300"
                >
                  Explore Hadith
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center"
            whileHover={{ y: -10 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              type: "spring",
              stiffness: 300,
            }}
          >
            <Lottie
              animationData={quranAnimation}
              play={animationPlaying}
              speed={0.5}
              onLoopComplete={() => setAnimationPlaying(false)}
              loop={false}
              className="w-full max-w-lg floating"
            />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full -mb-px z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          className="w-full h-auto"
        >
          <path
            fill="url(#wave-gradient)" // Use gradient instead of solid color
            stroke="none"
            d="M0,96L48,90C96,84,192,72,288,72C384,72,480,84,576,96C672,108,768,120,864,120C960,120,1056,108,1152,90C1248,72,1344,48,1392,36L1440,24L1440,180L1392,180C1344,180,1248,180,1152,180C1056,180,960,180,864,180C768,180,672,180,576,180C480,180,384,180,288,180C192,180,96,180,48,180L0,180Z"
          ></path>
          {/* Add gradient definition */}
          <defs>
            <linearGradient
              id="wave-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#E8E0FF" /> {/* Primary color */}
              <stop offset="100%" stopColor="#D2C4FF" />{" "}
              {/* PrimaryMedium color */}
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
