// src/components/RoundedContainer.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const RoundedContainer = ({
  children,
  bgColor,
  className,
  delay = 0,
  isActive,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 100, scale: 0.95 }}
    animate={
      isActive
        ? {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              duration: 0.8,
              ease: "easeOut",
              delay,
            },
          }
        : {
            opacity: 0.4,
            y: 20,
            scale: 0.95,
            transition: {
              duration: 0.5,
              ease: "easeInOut",
            },
          }
    }
    className={`rounded-4xl shadow-2xl p-8 md:p-12 backdrop-blur-sm ${bgColor} ${className} w-full max-w-7xl mx-auto`}
    style={{
      position: "relative",
      zIndex: isActive ? 10 : 1,
    }}
  >
    {children}
  </motion.div>
);

export default RoundedContainer;
