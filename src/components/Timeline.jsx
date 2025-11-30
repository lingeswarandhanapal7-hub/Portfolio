"use client";
import { useScroll, useTransform, motion, useMotionValue, useSpring } from "framer-motion";
import React, { useRef } from "react";

export const Timeline = ({ data }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div className="c-space section-spacing relative overflow-hidden" ref={containerRef}>
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.15), transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Enhanced heading with gradient text */}
        <motion.h2
          className="text-heading mb-12 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          viewport={{ once: true }}
        >
          My Life Flow
        </motion.h2>

        {/* Horizontal scroll container with custom scrollbar */}
        <div className="relative">
          <div className="overflow-x-auto overflow-y-hidden pb-12 scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-neutral-800/30 hover:scrollbar-thumb-purple-500">
            <div className="flex gap-6 min-w-max px-4 py-8">
              {data.map((item, index) => {
                // Parallax effect based on scroll
                const cardProgress = useTransform(
                  scrollYProgress,
                  [0, 0.5, 1],
                  [0, 1, 1]
                );

                const opacity = useTransform(
                  cardProgress,
                  [0, 0.2 + (index * 0.08), 0.4 + (index * 0.08), 1],
                  [0, 0, 1, 1]
                );

                const scale = useTransform(
                  cardProgress,
                  [0, 0.2 + (index * 0.08), 0.4 + (index * 0.08), 1],
                  [0.85, 0.85, 1, 1]
                );

                const y = useTransform(
                  cardProgress,
                  [0, 0.2 + (index * 0.08), 0.4 + (index * 0.08), 1],
                  [60, 60, 0, 0]
                );

                const rotateY = useTransform(
                  cardProgress,
                  [0, 0.2 + (index * 0.08), 0.4 + (index * 0.08), 1],
                  [15, 15, 0, 0]
                );

                return (
                  <motion.div
                    key={index}
                    className="flex-shrink-0 w-[380px] md:w-[480px] relative group"
                    style={{
                      opacity,
                      scale,
                      y,
                      perspective: "1000px",
                    }}
                  >
                    {/* Glow effect on hover */}
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    {/* Card container with enhanced effects */}
                    <motion.div
                      className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-neutral-900/80 via-neutral-800/60 to-neutral-900/80 border border-neutral-700/50 backdrop-blur-xl shadow-2xl overflow-hidden"
                      whileHover={{
                        scale: 1.03,
                        rotateY: 5,
                        transition: { duration: 0.3 }
                      }}
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {/* Animated gradient overlay */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: "linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(219, 39, 119, 0.1) 50%, rgba(59, 130, 246, 0.1) 100%)",
                        }}
                        animate={{
                          backgroundPosition: ["0% 0%", "100% 100%"],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      />

                      {/* Floating particles effect */}
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-purple-400 rounded-full"
                            style={{
                              left: `${20 + i * 30}%`,
                              top: `${30 + i * 20}%`,
                            }}
                            animate={{
                              y: [-20, -60, -20],
                              opacity: [0, 1, 0],
                              scale: [0, 1.5, 0],
                            }}
                            transition={{
                              duration: 3 + i,
                              repeat: Infinity,
                              delay: i * 0.8,
                            }}
                          />
                        ))}
                      </div>

                      {/* Enhanced timeline dot with pulse */}
                      <motion.div
                        className="absolute -top-5 left-8 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-500/50"
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{
                          delay: 0.2 + (index * 0.1),
                          duration: 0.6,
                          type: "spring",
                          bounce: 0.5
                        }}
                        viewport={{ once: true }}
                      >
                        <motion.div
                          className="w-4 h-4 rounded-full bg-white"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [1, 0.8, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                        {/* Pulse rings */}
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-purple-400"
                          animate={{
                            scale: [1, 2, 2],
                            opacity: [0.8, 0, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut",
                          }}
                        />
                      </motion.div>

                      {/* Content with staggered animations */}
                      <motion.div
                        className="relative z-10 mt-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <motion.h3
                          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-3"
                          whileHover={{ scale: 1.05, x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {item.date}
                        </motion.h3>
                        <motion.h4
                          className="text-xl md:text-2xl font-semibold text-neutral-200 mb-2"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {item.title}
                        </motion.h4>
                        <motion.h5
                          className="text-lg md:text-xl text-purple-400/80 mb-5 font-medium"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {item.job}
                        </motion.h5>

                        {/* Description with reveal animation */}
                        <div className="space-y-3">
                          {item.contents.map((content, idx) => (
                            <motion.p
                              className="text-sm md:text-base font-normal text-neutral-300 leading-relaxed"
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + (index * 0.1) + (idx * 0.1), duration: 0.5 }}
                              viewport={{ once: true }}
                            >
                              {content}
                            </motion.p>
                          ))}
                        </div>
                      </motion.div>

                      {/* Animated connecting line */}
                      {index < data.length - 1 && (
                        <motion.div
                          className="absolute -right-6 top-0 w-6 h-[3px] overflow-hidden"
                          style={{ top: '25px' }}
                        >
                          <motion.div
                            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
                            initial={{ scaleX: 0, originX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ delay: 0.5 + (index * 0.1), duration: 0.6, ease: "easeOut" }}
                            viewport={{ once: true }}
                            animate={{
                              backgroundPosition: ["0% 50%", "100% 50%"],
                            }}
                            style={{
                              backgroundSize: "200% 100%",
                            }}
                          />
                        </motion.div>
                      )}

                      {/* Bottom accent line */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ delay: 0.6 + (index * 0.1), duration: 0.8 }}
                        viewport={{ once: true }}
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Enhanced scroll hint with animation */}
        <motion.div
          className="text-center mt-8 flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            animate={{ x: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-purple-400 text-lg"
          >
            ←
          </motion.div>
          <span className="text-neutral-400 text-sm font-medium">
            Scroll horizontally to explore
          </span>
          <motion.div
            animate={{ x: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-purple-400 text-lg"
          >
            →
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};
