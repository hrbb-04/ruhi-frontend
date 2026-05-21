// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const HadithCard = ({ hadith }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gradient-to-br from-white to-accent/20 border border-accentLight/30 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all relative overflow-hidden"
    >
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-accent/10 to-transparent rounded-bl-full"></div>

      <div className="flex items-start relative z-10">
        <div className="mr-4 mt-1">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/40 to-goldLight flex items-center justify-center text-textDark font-bold text-lg shadow-sm">
            {hadith.number}
          </div>
        </div>
        <div>
          <p className="text-textDark leading-relaxed text-justify font-medium">
            {hadith.text}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="bg-gradient-to-r from-accent/20 to-goldLight/20 text-textDark text-xs px-3 py-1 rounded-full border border-accent/30">
              Sahih Hadith
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HadithCard;
