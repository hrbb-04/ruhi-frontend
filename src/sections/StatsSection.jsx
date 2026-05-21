// eslint-disable-next-line no-unused-vars
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CountUp from "react-countup";
import { FiBookOpen, FiMessageCircle, FiHeart, FiUsers } from "react-icons/fi";

const StatsSection = () => {
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

  const statsData = [
    {
      label: "Verses",
      value: 100,
      icon: FiBookOpen,
      color: "text-accentLight",
      bgColor: "bg-primary/10",
    },
    {
      label: "Hadiths",
      value: 80,
      icon: FiMessageCircle,
      color: "text-secondary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Duas",
      value: 40,
      icon: FiHeart,
      color: "text-highlight",
      bgColor: "bg-primary/10",
    },
    {
      label: "Users Helped",
      value: 20,
      icon: FiUsers,
      color: "text-accent",
      bgColor: "bg-primary/10",
    },
  ];

  return (
    <section
      ref={statsRef}
      className="snap-section py-12 md:py-16 w-full relative overflow-visible"
    >
      <div className="max-w-4xl mx-auto px-4 relative z-0">
        <motion.h2
          className="text-3xl md:text-4xl font-display font-bold text-center text-textDark mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Spiritual Impact
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              className="bg-white backdrop-blur-sm border border-gray-100 rounded-2xl p-4 hover:shadow-lg transition-all duration-300 group flex flex-col items-center justify-center aspect-square"
            >
              <div className="flex flex-col items-center">
                <motion.div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${stat.bgColor} transition-colors duration-300`}
                  animate={
                    isStatsInView
                      ? {
                          scale: [1, 1.1, 1],
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.7,
                    delay: index * 0.15 + 0.3,
                    times: [0, 0.3, 0.6, 1],
                  }}
                >
                  <stat.icon className={`text-3xl ${stat.color}`} />
                </motion.div>

                <div className="text-3xl font-display font-bold text-textDark">
                  {isStatsInView ? (
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      delay={index * 0.1}
                    />
                  ) : (
                    0
                  )}
                  +
                </div>

                <div className="mt-1 text-base font-medium text-textDark/80 text-center">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
