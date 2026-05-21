// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import EmotionBackground from "./components/EmotionBackground";

// Emotion style mapping
const emotionStyles = {
  fear_anxiety: {
    screenBg:
      "bg-gradient-to-br from-[#E9E9FC] to-[#D2C3F2] mobile-animate-fear",
    cardBg: "bg-gradient-to-br from-[#E9E9FC] to-[#D2C3F2]",
    textColor: "text-textDark",
    animation: {
      animate: { x: [0, -2, 2, 0] },
      transition: { duration: 0.6, repeat: Infinity, repeatDelay: 1.4 },
    },
  },
  happiness_gratitude: {
    screenBg:
      "bg-gradient-to-br from-[#EBF6FF] to-[#FFFFE3] mobile-animate-happiness",
    cardBg: "bg-gradient-to-br from-[#EBF6FF] to-[#FFFFE3]",
    textColor: "text-textDark",
    animation: {
      animate: {
        boxShadow: [
          "0 0 0 0 rgba(255, 209, 102, 0.4)",
          "0 0 15px 15px rgba(255, 209, 102, 0.4)",
          "0 0 0 0 rgba(255, 209, 102, 0.4)",
        ],
      },
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },
  regret_repentance: {
    screenBg:
      "bg-gradient-to-br from-[#865BB0] to-[#732CDE] mobile-animate-regret",
    cardBg: "bg-gradient-to-br from-[#865BB0] to-[#732CDE]",
    textColor: "text-textLight",
    animation: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 3, ease: "easeOut" },
    },
  },
  anger: {
    screenBg:
      "bg-gradient-to-br from-[#E36D36] to-[#C72A2A] mobile-animate-anger",
    cardBg: "bg-gradient-to-br from-[#E36D36] to-[#C72A2A]",
    textColor: "text-textLight",
    animation: {
      initial: { scale: 0.9 },
      animate: { scale: [1.2, 1] },
      transition: { duration: 3, ease: "backOut" },
    },
  },
  sadness: {
    screenBg:
      "bg-gradient-to-br from-[#578EC9] to-[#164981] mobile-animate-sadness",
    cardBg: "bg-gradient-to-br from-[#578EC9] to-[#164981]",
    textColor: "text-textLight",
    animation: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 3, ease: "easeIn" },
    },
  },
  neutral: {
    screenBg: "bg-gradient-to-br from-[#F1E6FF] to-[#C09FFC]",
    cardBg: "bg-gradient-to-br from-[#F1E6FF] to-[#C09FFC]",
    textColor: "text-textDark",
  },
  default: {
    screenBg: "bg-gradient-to-br from-primary to-primaryMedium",
    cardBg: "bg-white/80 backdrop-blur-md",
    textColor: "text-textDark",
  },
};

const EmotionInput = () => {
  useEffect(() => {
    document.title = "Ruhi - Emotion Detection";
  }, []);

  const [text, setText] = useState("");
  const [emotion, setEmotion] = useState(null);
  const [results, setResults] = useState({ verses: [], hadiths: [], duas: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeCard, setActiveCard] = useState(0);

  // Get current emotion style or default
  const currentStyle = emotion ? emotionStyles[emotion] : emotionStyles.default;

  // Format emotion for display
  const formatEmotion = (emotionStr) => {
    const formatMap = {
      fear_anxiety: "Fear/Anxiety",
      happiness_gratitude: "Happiness/Gratitude",
      regret_repentance: "Regret/Repentance",
      anger: "Anger",
      sadness: "Sadness",
      neutral: "Neutral",
    };
    return formatMap[emotionStr] || emotionStr.replace(/_/g, " ");
  };

  const detectAndSearch = async () => {
    if (!text.trim()) {
      setError("Please share how you're feeling.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResults({ verses: [], hadiths: [], duas: [] });
      setActiveCard(0);

      // Step 1: Detect Emotion
      const emotionRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/emotion/detect`,
        { text },
      );

      // Step 2: Search Relevant Content
      const searchRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/search/`,
        {
          user_text: text,
          emotion: emotionRes.data.emotion,
        },
      );

      setEmotion(emotionRes.data.emotion);
      setResults(searchRes.data);

      if (Object.values(searchRes.data).every((arr) => arr.length === 0)) {
        setError(
          "We couldn't find content that matches your current emotions. Try expressing yourself differently.",
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.detail || "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Combine all results into a single array for the carousel
  const allResults = [
    ...results.verses.map((item) => ({ ...item, type: "Quranic Verse" })),
    ...results.hadiths.map((item) => ({ ...item, type: "Hadith" })),
    ...results.duas.map((item) => ({ ...item, type: "Dua" })),
  ];

  // Handle carousel navigation
  const nextCard = () => {
    setActiveCard((prev) => (prev < allResults.length - 1 ? prev + 1 : 0));
  };

  const prevCard = () => {
    setActiveCard((prev) => (prev > 0 ? prev - 1 : allResults.length - 1));
  };

  return (
    <div
      className={`min-h-screen relative p-4 flex justify-center items-center bg-white/60 backdrop-blur-md ${currentStyle.screenBg}`}
    >
      {/* Add EmotionBackground component */}
      {emotion && emotion !== "neutral" && (
        <EmotionBackground emotion={emotion} />
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary/30 backdrop-blur-md rounded-4xl shadow-container w-full max-w-4xl overflow-hidden relative z-10"
      >
        <div className="flex flex-col lg:flex-row">
          {/* Left Container - Input Section */}
          <div className="w-full lg:w-1/3 p-6 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-secondary mb-4">
              Share What's on Your Mind
            </h2>

            <div className="space-y-6">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="I'm feeling..."
                className="w-full p-4 rounded-xl border border-primary/30 focus:ring-2 focus:ring-accentLight focus:outline-none min-h-[100px] transition-all text-lg"
              />

              <div className="flex flex-col space-y-4">
                <button
                  onClick={detectAndSearch}
                  disabled={loading}
                  className="w-full flex items-center justify-center py-3 text-lg rounded-full transition-all duration-300 shadow-lg shadow-accent/30 hover:shadow-accent/50 font-display font-bold bg-gradient-to-r from-accent to-goldLight text-textDark"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-textDark"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Understanding your emotions...
                    </>
                  ) : (
                    "Find Comfort in Guidance"
                  )}
                </button>

                {emotion && (
                  <div className="bg-primary/10 backdrop-blur-sm rounded-xl p-4 border border-primary/20 text-center animate-fade-in">
                    <p className="text-sm text-textDark/70 mb-1">
                      We sense you're feeling
                    </p>
                    <span className="inline-block px-4 py-2 bg-accentLight/20 text-accentDark rounded-full font-medium text-lg">
                      {formatEmotion(emotion)}
                    </span>
                  </div>
                )}
              </div>

              {error && <p className="text-red-500 text-center">{error}</p>}
            </div>
          </div>

          {/* Right Container - Horizontal Carousel */}
          <div className="w-full lg:w-2/3 p-6 flex flex-col">
            <h3 className="text-xl font-display font-semibold text-textDark mb-6 text-center">
              Guidance For Your Journey
            </h3>

            <div className="relative flex-grow">
              {allResults.length > 0 ? (
                <div className="h-[550px] flex flex-col justify-between">
                  {/* Carousel Navigation */}
                  <div className="flex justify-between items-center mb-4">
                    <button
                      onClick={prevCard}
                      className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                      aria-label="Previous card"
                    >
                      <FiChevronLeft className="text-2xl text-textDark" />
                    </button>

                    <div className="flex space-x-2">
                      {allResults.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveCard(index)}
                          className={`w-3 h-3 rounded-full transition-all ${
                            activeCard === index
                              ? "bg-secondary"
                              : "bg-secondary/60"
                          }`}
                          aria-label={`Go to card ${index + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={nextCard}
                      className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                      aria-label="Next card"
                    >
                      <FiChevronRight className="text-2xl text-textDark" />
                    </button>
                  </div>

                  {/* Carousel Content */}
                  <div className="relative h-full overflow-hidden">
                    {allResults.map((result, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{
                          opacity: index === activeCard ? 1 : 0,
                          x:
                            index === activeCard
                              ? 0
                              : index > activeCard
                                ? 100
                                : -100,
                          zIndex: index === activeCard ? 10 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                        className={`absolute inset-0 rounded-2xl border border-primary/10 p-6 ${
                          currentStyle.cardBg
                        } ${index === activeCard ? "block" : "hidden"}`}
                      >
                        <motion.div
                          {...(index === activeCard && emotion
                            ? currentStyle.animation
                            : {})}
                          className="h-full w-full flex flex-col"
                        >
                          <div className="mb-4">
                            <span className="inline-block px-3 py-1 bg-white/30 backdrop-blur-sm text-textDark rounded-full text-sm font-medium">
                              {result.type}
                            </span>
                          </div>

                          <div
                            className={`flex-grow overflow-y-auto pr-2 ${currentStyle.textColor}`}
                          >
                            <div className="p-2 space-y-6">
                              <h4 className="font-arabic text-3xl leading-relaxed text-right">
                                {result.arabic}
                              </h4>
                              <div className="italic pl-4 py-1">
                                <p className="text-justify text-lg">
                                  {result.text}
                                </p>
                              </div>
                              <p className="text-sm opacity-80 mt-4">
                                Source: {result.source}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-8 text-textDark/60">
                  <div className="bg-primary/10 backdrop-blur-sm rounded-full p-6 mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 text-secondary/60"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-display font-medium mb-2 text-textDark">
                    Your Spiritual Journey Starts Here
                  </h4>
                  <p className="max-w-md text-lg text-textDark/80">
                    Share your feelings to receive personalized guidance that
                    speaks to your heart.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EmotionInput;
