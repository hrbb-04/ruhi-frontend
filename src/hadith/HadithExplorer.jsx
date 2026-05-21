// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  FiSearch,
  FiX,
  FiArrowLeft,
  FiChevronRight,
  FiBookOpen,
} from "react-icons/fi";
import HadithCard from "./HadithCard";
import SearchResults from "./SearchResults";
import { containerVariants, itemVariants } from "./animations";

const HadithExplorer = () => {
  useEffect(() => {
    document.title = "Ruhi - Hadith Explorer";
  }, []);

  const [state, setState] = useState({
    themes: [],
    chapters: [],
    sections: [],
    hadiths: [],
    searchResults: [],
    selectedTheme: null,
    selectedChapter: null,
    selectedSection: null,
    searchQuery: "",
    isLoading: false,
    error: null,
    activeLevel: "themes",
  });

  // Fetch themes on component mount
  useEffect(() => {
    const fetchThemes = async () => {
      setState((prev) => ({ ...prev, isLoading: true }));
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/hadith/themes`,
        );
        setState((prev) => ({
          ...prev,
          themes: response.data,
          isLoading: false,
        }));
      } catch {
        setState((prev) => ({
          ...prev,
          error: "Failed to load themes",
          isLoading: false,
        }));
      }
    };

    fetchThemes();
  }, []);

  // Fetch chapters for selected theme
  const fetchChapters = async (themeId) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/hadith/chapters/${themeId}`,
      );
      setState((prev) => ({
        ...prev,
        chapters: response.data,
        sections: [],
        hadiths: [],
        selectedChapter: null,
        selectedSection: null,
        isLoading: false,
      }));
    } catch {
      setState((prev) => ({
        ...prev,
        error: "Failed to load chapters",
        isLoading: false,
      }));
    }
  };

  // Fetch sections for selected chapter
  const fetchSections = async (chapterId) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/hadith/sections/${chapterId}`,
      );
      setState((prev) => ({
        ...prev,
        sections: response.data,
        hadiths: [],
        selectedSection: null,
        isLoading: false,
      }));
    } catch {
      setState((prev) => ({
        ...prev,
        error: "Failed to load sections",
        isLoading: false,
      }));
    }
  };

  // Fetch hadiths for selected section
  const fetchHadiths = async (sectionId) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/hadith/hadiths/${sectionId}`,
      );
      setState((prev) => ({
        ...prev,
        hadiths: response.data,
        isLoading: false,
      }));
    } catch {
      setState((prev) => ({
        ...prev,
        error: "Failed to load hadiths",
        isLoading: false,
      }));
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!state.searchQuery.trim()) return;

    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/hadith/search?query=${encodeURIComponent(
          state.searchQuery,
        )}`,
      );
      setState((prev) => ({
        ...prev,
        searchResults: response.data,
        activeLevel: "search",
        isLoading: false,
      }));
    } catch {
      setState((prev) => ({
        ...prev,
        error: "Search failed. Please try again.",
        isLoading: false,
      }));
    }
  };

  const resetSelections = () => {
    setState((prev) => ({
      ...prev,
      selectedTheme: null,
      selectedChapter: null,
      selectedSection: null,
      chapters: [],
      sections: [],
      hadiths: [],
      searchResults: [],
      searchQuery: "",
      activeLevel: "themes",
    }));
  };

  // Navigation breadcrumbs with animations
  const NavigationBreadcrumbs = () => (
    <motion.div
      className="flex items-center mb-6 text-sm flex-wrap gap-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={() => {
          setState((prev) => ({
            ...prev,
            selectedTheme: null,
            selectedChapter: null,
            selectedSection: null,
            chapters: [],
            sections: [],
            hadiths: [],
            activeLevel: "themes",
          }));
        }}
        className="flex items-center hover:text-accentLight bg-gradient-to-r from-secondary to-accentDark text-textLight px-3 py-1 rounded-full transition-colors shadow-md"
      >
        <span>All Themes</span>
      </button>

      {state.selectedTheme && (
        <>
          <FiChevronRight className="text-goldLight" />
          <button
            onClick={() => {
              setState((prev) => ({
                ...prev,
                selectedChapter: null,
                selectedSection: null,
                sections: [],
                hadiths: [],
                activeLevel: "chapters",
              }));
            }}
            className="flex items-center hover:text-accentLight bg-gradient-to-r from-secondary to-accentDark text-textLight px-3 py-1 rounded-full transition-colors shadow-md"
          >
            <span>{state.selectedTheme.name}</span>
          </button>
        </>
      )}

      {state.selectedChapter && (
        <>
          <FiChevronRight className="text-goldLight" />
          <button
            onClick={() => {
              setState((prev) => ({
                ...prev,
                selectedSection: null,
                hadiths: [],
                activeLevel: "sections",
              }));
            }}
            className="flex items-center hover:text-accentLight bg-gradient-to-r from-secondary to-accentDark text-textLight px-3 py-1 rounded-full transition-colors shadow-md"
          >
            <span>{state.selectedChapter.Chapter_English}</span>
          </button>
        </>
      )}

      {state.selectedSection && (
        <>
          <FiChevronRight className="text-goldLight" />
          <span className="text-textLight font-medium bg-gradient-to-r from-accent to-goldLight text-textDark px-3 py-1 rounded-full shadow-sm">
            {state.selectedSection.Section_English}
          </span>
        </>
      )}
    </motion.div>
  );

  // Skeleton loader component
  const SkeletonLoader = ({ count = 5 }) => (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className="h-16 bg-primaryMedium/30 rounded-xl animate-pulse"
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primaryMedium py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with decorative elements */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12 relative"
        >
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-accentLight/20 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
          <h1 className="text-4xl font-display font-bold text-textDark relative z-10">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-accentDark">
              Hadith Explorer
            </span>
          </h1>
          <p className="text-textDark/80 mt-2 relative z-10 max-w-md mx-auto">
            Discover authentic hadiths through themes and chapters with divine
            wisdom
          </p>
          <div className="absolute top-2 -right-4 w-16 h-16 bg-highlight/20 rounded-full filter blur-xl opacity-40"></div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative mb-10 max-w-2xl mx-auto"
        >
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <input
                type="text"
                value={state.searchQuery}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, searchQuery: e.target.value }))
                }
                placeholder="Search hadiths by keywords..."
                className="w-full pl-12 pr-24 py-4 rounded-full border border-accentLight/50 bg-white/90 focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent shadow-lg text-textDark font-medium"
              />
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary text-xl" />

              {state.searchQuery && (
                <button
                  type="button"
                  onClick={() =>
                    setState((prev) => ({ ...prev, searchQuery: "" }))
                  }
                  className="absolute right-24 top-1/2 transform -translate-y-1/2 text-secondary hover:text-accent"
                >
                  <FiX />
                </button>
              )}

              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-gradient-to-r from-accent to-goldLight text-textDark font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg shadow-accent/30 hover:shadow-accent/50"
                >
                  Search
                </motion.button>
              </div>
            </div>
          </form>
        </motion.div>

        {/* Navigation and Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-container p-6 overflow-hidden border border-accentLight/30"
        >
          {/* Floating glassmorphism reset button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={resetSelections}
            className="absolute right-8 top-8 z-10 bg-gradient-to-br from-accent to-goldLight text-textDark p-2 rounded-full shadow-lg hover:shadow-highlight/40 transition-all"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <FiX className="font-bold" />
          </motion.button>

          {state.error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6"
            >
              {state.error}
            </motion.div>
          )}

          {state.activeLevel === "search" ? (
            <SearchResults
              results={state.searchResults}
              query={state.searchQuery}
              onBack={resetSelections}
            />
          ) : (
            <>
              <NavigationBreadcrumbs />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                {/* Decorative background elements (UPDATED) */}
                <div className="absolute inset-0 z-0 pattern-islamic opacity-10"></div>
                <div className="absolute top-0 right-0 w-48 h-48 bg-highlight/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

                {/* Themes Column (UPDATED) */}
                <motion.div
                  className="relative z-10 border-r border-accentLight/30 pr-6"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-xl font-display font-bold text-secondary mb-4 flex items-center">
                    <span className="mr-2 bg-gradient-to-r from-secondary to-accentDark bg-clip-text text-transparent">
                      Themes
                    </span>
                    {state.isLoading && state.activeLevel === "themes" && (
                      <span className="ml-2 w-3 h-3 rounded-full bg-secondary animate-ping"></span>
                    )}
                  </h2>
                  <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {state.isLoading && state.activeLevel === "themes" ? (
                      <SkeletonLoader count={5} />
                    ) : (
                      state.themes.map((theme) => (
                        <motion.div
                          key={theme._id}
                          whileHover={{
                            scale: 1.02,
                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                          }}
                          className={`p-4 rounded-xl mb-3 cursor-pointer transition-all duration-300 ${
                            state.selectedTheme?._id === theme._id
                              ? "bg-gradient-to-br from-primary/50 to-secondary/30 border-2 border-accentLight shadow-lg"
                              : "bg-primaryMedium/20 hover:bg-primaryMedium/40"
                          }`}
                          onClick={() => {
                            setState((prev) => ({
                              ...prev,
                              selectedTheme: theme,
                              activeLevel: "chapters",
                            }));
                            fetchChapters(theme._id);
                          }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-textDark">
                              {theme.name}
                            </h3>
                            <div className="flex items-center">
                              <span className="text-xs bg-accentLight/30 text-secondary px-2 py-1 rounded-full">
                                {theme.chapters?.length || 0} chapters
                              </span>
                              <FiChevronRight className="ml-2 text-secondary" />
                            </div>
                          </div>
                          {theme.description && (
                            <p className="text-sm text-textDark/70 mt-2 line-clamp-2">
                              {theme.description}
                            </p>
                          )}
                        </motion.div>
                      ))
                    )}
                  </div>
                </motion.div>

                {/* Chapters Column */}
                <AnimatePresence>
                  {state.selectedTheme && (
                    <motion.div
                      className="relative z-10 border-r border-accentLight/30 px-6"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 20, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <h2 className="text-xl font-display font-bold text-secondary mb-4 flex items-center">
                        <span className="mr-2 bg-gradient-to-r from-secondary to-accentDark bg-clip-text text-transparent">
                          Chapters
                        </span>
                        {state.isLoading &&
                          state.activeLevel === "chapters" && (
                            <span className="ml-2 w-3 h-3 rounded-full bg-secondary animate-ping"></span>
                          )}
                      </h2>
                      <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                        {state.isLoading && state.activeLevel === "chapters" ? (
                          <SkeletonLoader count={5} />
                        ) : (
                          state.chapters.map((chapter) => (
                            <motion.div
                              key={chapter._id}
                              whileHover={{
                                scale: 1.02,
                                boxShadow:
                                  "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                              }}
                              className={`p-4 rounded-xl mb-3 cursor-pointer transition-all duration-300 ${
                                state.selectedChapter?._id === chapter._id
                                  ? "bg-gradient-to-br from-primary/50 to-secondary/30 border-2 border-accentLight shadow-lg"
                                  : "bg-primaryMedium/20 hover:bg-primaryMedium/40"
                              }`}
                              onClick={() => {
                                setState((prev) => ({
                                  ...prev,
                                  selectedChapter: chapter,
                                  activeLevel: "sections",
                                }));
                                fetchSections(chapter._id);
                              }}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium text-textDark">
                                  {chapter.Chapter_English}
                                </h3>
                                <div className="flex items-center">
                                  <span className="text-xs bg-accentLight/30 text-secondary px-2 py-1 rounded-full">
                                    Ch. {chapter.Chapter_Number}
                                  </span>
                                  <FiChevronRight className="ml-2 text-secondary" />
                                </div>
                              </div>
                              {chapter.Chapter_Arabic && (
                                <p className="text-sm text-textDark/70 mt-2 text-right font-arabic">
                                  {chapter.Chapter_Arabic}
                                </p>
                              )}
                            </motion.div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Sections Column (UPDATED) */}
                <AnimatePresence>
                  {state.selectedChapter && (
                    <motion.div
                      className="relative z-10 px-6"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 20, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <h2 className="text-xl font-display font-bold text-secondary mb-4 flex items-center">
                        <span className="mr-2 bg-gradient-to-r from-secondary to-accentDark bg-clip-text text-transparent">
                          Sections
                        </span>
                        {state.isLoading &&
                          state.activeLevel === "sections" && (
                            <span className="ml-2 w-3 h-3 rounded-full bg-secondary animate-ping"></span>
                          )}
                      </h2>
                      <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                        {state.isLoading && state.activeLevel === "sections" ? (
                          <SkeletonLoader count={5} />
                        ) : (
                          state.sections.map((section) => (
                            <motion.div
                              key={section._id}
                              whileHover={{
                                scale: 1.02,
                                boxShadow:
                                  "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                              }}
                              className={`p-4 rounded-xl mb-3 cursor-pointer transition-all duration-300 ${
                                state.selectedSection?._id === section._id
                                  ? "bg-gradient-to-br from-primary/50 to-secondary/30 border-2 border-accentLight shadow-lg"
                                  : "bg-primaryMedium/20 hover:bg-primaryMedium/40"
                              }`}
                              onClick={() => {
                                setState((prev) => ({
                                  ...prev,
                                  selectedSection: section,
                                  activeLevel: "hadiths",
                                }));
                                fetchHadiths(section._id);
                              }}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium text-textDark">
                                  {section.Section_English}
                                </h3>
                                <div className="flex items-center">
                                  <span className="text-xs bg-accentLight/30 text-secondary px-2 py-1 rounded-full">
                                    Sec. {section.Section_Number}
                                  </span>
                                  <FiChevronRight className="ml-2 text-secondary" />
                                </div>
                              </div>
                              {section.Section_Arabic && (
                                <p className="text-sm text-textDark/70 mt-2 text-right font-arabic">
                                  {section.Section_Arabic}
                                </p>
                              )}
                            </motion.div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Hadith Display (UPDATED) */}
              <AnimatePresence>
                {state.selectedSection && state.hadiths.length > 0 && (
                  <motion.div
                    className="mt-8 pt-6 border-t border-accentLight/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-display font-semibold bg-gradient-to-r from-secondary to-accentDark bg-clip-text text-transparent">
                        Hadiths in {state.selectedSection.Section_English}
                      </h2>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          setState((prev) => ({
                            ...prev,
                            selectedSection: null,
                            hadiths: [],
                            activeLevel: "sections",
                          }))
                        }
                        className="bg-gradient-to-r from-accent to-goldLight text-textDark font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg shadow-accent/30 hover:shadow-accent/50"
                      >
                        <FiArrowLeft className="mr-1" /> Back to Sections
                      </motion.button>
                    </div>

                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="show"
                      className="space-y-6"
                    >
                      {state.hadiths.map((hadith) => (
                        <motion.div key={hadith._id} variants={itemVariants}>
                          <HadithCard hadith={hadith} />
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Empty State (UPDATED) */}
              {!state.selectedTheme &&
                state.themes.length === 0 &&
                !state.isLoading && (
                  <motion.div
                    className="flex flex-col items-center justify-center h-full py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="bg-gradient-to-r from-accent/20 to-goldLight/20 w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-inner">
                      <FiBookOpen className="text-4xl text-accent" />
                    </div>
                    <h3 className="text-xl font-display font-medium text-textDark">
                      No themes found
                    </h3>
                    <p className="text-textDark/60 mt-2">
                      Please try again later
                    </p>
                  </motion.div>
                )}
            </>
          )}
        </motion.div>
      </div>

      {/* Custom scrollbar styling */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d2c4ff;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #b18aff;
        }
      `}</style>
    </div>
  );
};

export default HadithExplorer;
