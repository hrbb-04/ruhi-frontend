// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import HadithCard from "./HadithCard";

const SearchResults = ({ results, query, onBack }) => {
  return (
    <div className="relative">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-full pattern-islamic opacity-5 z-0"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-semibold bg-gradient-to-r from-secondary to-accentDark bg-clip-text text-transparent">
            Search Results for "{query}"
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="flex items-center bg-gradient-to-r from-accent to-goldLight text-textDark px-4 py-2 rounded-full transition-colors shadow-md"
          >
            <FiArrowLeft className="mr-1" /> Back to Explorer
          </motion.button>
        </div>

        <AnimatePresence>
          {results.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {results.map((result) => (
                <motion.div
                  key={result._id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <HadithCard hadith={result} highlight={query} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="bg-gradient-to-r from-accent/20 to-goldLight/20 w-24 h-24 rounded-full flex items-center justify-center mb-6 mx-auto shadow-inner">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-display font-medium text-textDark">
                No hadiths found matching your search
              </h3>
              <p className="text-textDark/60 mt-2">Try different keywords</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchResults;
