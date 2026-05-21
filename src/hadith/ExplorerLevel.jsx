// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronRight, FiArrowLeft } from "react-icons/fi";

const ExplorerLevel = ({
  title,
  items,
  isLoading,
  onSelect,
  onBack,
  isActive,
}) => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className={`mb-6 overflow-hidden ${
        isActive ? "border-l-4 border-accentLight pl-4" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-display font-semibold bg-gradient-to-r from-secondary to-accentDark bg-clip-text text-transparent">
          {title}
        </h2>
        {onBack && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="flex items-center text-sm text-textLight hover:text-textDark bg-gradient-to-r from-accent/60 to-goldLight/20 px-3 py-1 rounded-full transition-colors"
          >
            <FiArrowLeft className="mr-1" /> Back
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-16 bg-gradient-to-r from-primary/20 to-secondary/10 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : items.length > 0 ? (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            {items.map((item) => (
              <motion.li
                key={item._id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-primary/20 to-secondary/10 hover:from-primary/30 hover:to-secondary/20 rounded-xl transition-all cursor-pointer shadow-sm hover:shadow-md"
              >
                <button
                  onClick={() => onSelect(item)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <div>
                    <h3 className="font-medium text-textDark">
                      {item.name ||
                        item.Chapter_English ||
                        item.Section_English}
                    </h3>
                    <p className="text-sm text-textDark/70 mt-1">
                      {item.order
                        ? `Theme ${item.order}`
                        : item.Chapter_Number
                        ? `Chapter ${item.Chapter_Number}`
                        : `Section ${item.Section_Number}`}
                    </p>
                  </div>
                  <FiChevronRight className="text-secondary text-xl" />
                </button>
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-4"
          >
            <div className="inline-block bg-gradient-to-r from-accent/10 to-goldLight/10 p-4 rounded-full mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <p className="text-textDark/70">No {title.toLowerCase()} found</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ExplorerLevel;
