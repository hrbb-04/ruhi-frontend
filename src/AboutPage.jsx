// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect } from "react";
import {
  FiGithub,
  FiMail,
  FiBook,
  FiCpu,
  FiDatabase,
  FiCode,
  FiLayout,
  FiServer,
  FiCloud,
} from "react-icons/fi";
// Add at the top with other imports
import hajarImage from "./assets/hrbpic2.jpg";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Ruhi - About";
  }, []);

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

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8E0FF] via-[#D9CEFF] to-[#C6B6FF] pt-20 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl mt-10 mb-24 h-[500px]">
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{
              backgroundImage:
                "url('https://wallpapers.com/wallpapers/purple-hijab-cartoon-po5v6sy4izavgo6b.jpg')",
              backgroundBlendMode: "multiply",
              background:
                "linear-gradient(135deg, rgba(90, 62, 184, 0.85) 0%, rgba(129, 101, 224, 0.8) 50%, rgba(180, 140, 255, 0.75) 100%)",
            }}
          />

          <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
            <motion.h1
              className="text-5xl md:text-7xl font-display font-bold text-textLight mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              About <span className="text-highlight">Ruhi</span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-textLight/90 max-w-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Spiritual Guidance Through Divine Wisdom
            </motion.p>
          </div>
        </div>

        {/* About Me Section */}
        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 mb-24 shadow-container border border-accentLight/30"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
        >
          <div className="grid md:grid-cols-3 gap-10 items-center">
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <div className="relative">
                {/* Replace the initial circle with your image */}
                <motion.div
                  className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg"
                  animate={{
                    rotate: [0, -2, 0, 2, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <img
                    src={hajarImage}
                    alt="Hajar Razzaque Bhatti"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <motion.div
                  className="absolute -bottom-3 -right-3 bg-gradient-to-r from-highlight to-goldLight text-textDark font-bold py-2 px-4 rounded-full shadow-lg"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  Developer
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <h2 className="text-3xl font-display font-bold mb-6 bg-gradient-to-r from-[#6F4CD1] to-[#A37AFF] bg-clip-text text-transparent">
                Hajar Razzaque Bhatti
              </h2>
              <p className="text-textDark mb-5">
                Final Year Computer Science Student at International Islamic
                University, Islamabad
              </p>
              <p className="text-textDark/80 mb-8">
                Assalamu Alaikum. I'm a final-year CS student passionate about
                building meaningful technology. This project represents my
                journey from having little experience in web development and AI
                to creating a complete application that serves a spiritual
                purpose.
              </p>

              <p className="text-textDark font-semibold">
                Contact me at:{" "}
                <span className="text-accent font-bold">
                  hajarbhatti05@gmail.com
                </span>
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* About Project */}
        <motion.div
          className="grid md:grid-cols-2 gap-16 mb-28"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-display font-bold mb-8 bg-gradient-to-r from-[#6F4CD1] to-[#A37AFF] bg-clip-text text-transparent">
              About the Project
            </h2>
            <p className="text-textDark/90 mb-6">
              Ruhi is an intelligent web application designed to provide
              personalized Islamic guidance through the Quran, Hadith, and Duas.
            </p>
            <p className="text-textDark/90 mb-6">
              The system responds to the user's emotional or spiritual state. By
              simply describing how they feel, users receive relevant Verses,
              Hadith, or Duas that directly address those emotions.
            </p>
            <p className="text-textDark/90">
              Whether feeling anxious, grateful, or seeking forgiveness, the
              platform provides comforting Islamic content to help navigate
              emotional states.
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-[#6F4CD1] to-[#A37AFF] rounded-3xl p-10 flex items-center justify-center"
            variants={itemVariants}
          >
            <div className="text-center">
              <div className="inline-block bg-gradient-to-r from-accent to-goldLight text-textLight p-5 rounded-full mb-8">
                <FiBook className="text-4xl" />
              </div>
              <h3 className="text-2xl font-display font-bold text-textLight mb-5">
                Project Vision
              </h3>
              <p className="text-textLight">
                To create spiritually beneficial tools that positively impact
                lives and bring people closer to Islamic teachings through
                technology.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Key Features */}
        <div className="mb-28">
          <h2 className="text-3xl font-display font-bold mb-16 text-center bg-gradient-to-r from-[#6F4CD1] to-[#A37AFF] bg-clip-text text-transparent">
            Key Features
          </h2>

          <motion.div
            className="grid md:grid-cols-3 gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              {
                icon: <FiCpu className="text-4xl" />,
                title: "Emotion-Based Recommendations",
                desc: "Uses NLP to analyze feelings and suggest relevant Quranic verses, Hadith, and Duas",
              },
              {
                icon: <FiDatabase className="text-4xl" />,
                title: "Hadith Explorer",
                desc: "Search Hadith by keywords or themes like patience, mercy, or repentance",
              },
              {
                icon: <FiBook className="text-4xl" />,
                title: "Personalized Guidance",
                desc: "Provides authentic, emotionally relevant Islamic content for daily spiritual support",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-accentLight/30 shadow-container hover:shadow-lg transition-all"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="text-accent mb-5">{feature.icon}</div>
                <h3 className="text-xl font-display font-bold text-textDark mb-4">
                  {feature.title}
                </h3>
                <p className="text-textDark/80">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Tech Stack */}
        <div className="mb-28">
          <h2 className="text-3xl font-display font-bold mb-16 text-center bg-gradient-to-r from-[#6F4CD1] to-[#A37AFF] bg-clip-text text-transparent">
            Tech Stack
          </h2>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              {
                name: "React.js",
                color: "from-blue-400/20 to-blue-600/20",
                icon: <FiLayout className="text-3xl text-textDark mb-3" />,
                type: "frontend",
              },
              {
                name: "FastAPI",
                color: "from-green-400/20 to-green-600/20",
                icon: <FiServer className="text-3xl text-textDark mb-3" />,
                type: "backend",
              },
              {
                name: "MongoDB",
                color: "from-green-300/20 to-green-500/20",
                icon: <FiDatabase className="text-3xl text-textDark mb-3" />,
                type: "database",
              },
              {
                name: "BERT",
                color: "from-orange-400/20 to-orange-600/20",
                icon: <FiCpu className="text-3xl text-textDark mb-3" />,
                type: "ai",
              },
              {
                name: "Tailwind CSS",
                color: "from-teal-400/20 to-teal-600/20",
                icon: <FiLayout className="text-3xl text-textDark mb-3" />,
                type: "frontend",
              },
              {
                name: "Framer Motion",
                color: "from-purple-400/20 to-purple-600/20",
                icon: <FiLayout className="text-3xl text-textDark mb-3" />,
                type: "frontend",
              },
              {
                name: "PyTorch",
                color: "from-red-400/20 to-red-600/20",
                icon: <FiCpu className="text-3xl text-textDark mb-3" />,
                type: "ai",
              },
              {
                name: "Beanie ODM",
                color: "from-emerald-400/20 to-emerald-600/20",
                icon: <FiDatabase className="text-3xl text-textDark mb-3" />,
                type: "database",
              },
            ].map((tech, index) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-br ${tech.color} rounded-2xl p-5 text-center flex flex-col items-center justify-center h-full`}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                {tech.icon}
                <span className="text-textDark font-medium">{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Future Vision */}
        <motion.div
          className="bg-gradient-to-br from-[#6F4CD1]/10 to-[#A37AFF]/20 rounded-3xl p-10 mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-display font-bold mb-8 text-center bg-gradient-to-r from-[#6F4CD1] to-[#A37AFF] bg-clip-text text-transparent">
            Future Vision
          </h2>

          <div className="max-w-4xl mx-auto">
            <p className="text-textDark/90 mb-8 text-center">
              This project represents the beginning of a larger vision to create
              spiritually meaningful technology
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              {[
                "Voice input for accessibility",
                "Conversational AI chatbot",
                "Mobile applications (iOS & Android)",
                "Multilingual support",
                "Personalized spiritual progress tracking",
                "Community features for sharing insights",
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-gradient-to-r from-accent to-goldLight text-textDark p-1 rounded-full mr-3 mt-1">
                    <div className="bg-white rounded-full p-1">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                    </div>
                  </div>
                  <span className="text-textDark">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact */}
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold mb-6 bg-gradient-to-r from-[#6F4CD1] to-[#A37AFF] bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-textDark/90 mb-6 max-w-2xl mx-auto">
            I welcome your feedback, suggestions, or collaboration ideas to
            enhance this platform and create more spiritually beneficial
            technology.
          </p>

          <p className="text-textDark mb-6 max-w-2xl mx-auto font-semibold">
            Contact me at: quranicguide01@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
