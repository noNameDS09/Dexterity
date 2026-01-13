'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const slowFloat = {
  animate: {
    y: [0, -6, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const About: React.FC = () => {
  return (
    <section className={`${cinzel.className} py-24 px-4 bg-linear-to-b from-stone-950 to-stone-900 relative overflow-hidden text-center`}>
      
      {/* Ambient Background Motion */}
      <motion.div
        variants={slowFloat}
        animate="animate"
        className="absolute -top-40 -left-40 w-96 h-96  rounded-full blur-[120px]"
      />
      <motion.div
        variants={slowFloat}
        animate="animate"
        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-[120px]"
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl mx-auto relative"
      >
        {/* Card */}
        <motion.div
          variants={fadeUp}
          className="
            relative
            bg-gradient-to-br from-stone-700/80 to-stone-800
            border border-stone-600
            rounded-2xl
            p-8 sm:p-10 md:p-14
            shadow-xl
            overflow-hidden
          "
        >
          {/* Subtle texture overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 bg-gradient-to-br from-stone-950 via-stone-800 to-stone-900"
          />

          <div className="relative z-10">
            {/* Heading */}
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-100 font-cinzel text-center mb-10 tracking-wide"
            >
              About Dexterity
            </motion.h2>

            {/* Content */}
            <motion.div
              variants={container}
              className="text-base sm:text-lg md:text-xl text-stone-300 leading-relaxed space-y-6"
            >
              <motion.p variants={fadeUp}>
                <span className="text-amber-200 font-medium">DEXTERITY</span> is a
                premier college-level fest that bridges the worlds of technology and
                imagination—where participants engage in competitive challenges that
                test both logical prowess and creative strategy.
              </motion.p>

              <motion.p variants={fadeUp}>
                Our events are meticulously crafted to push boundaries, foster
                innovation, and celebrate the spirit of exploration. From analytical
                problem-solving to strategic gameplay, every trial is designed to
                challenge the intellect while encouraging collaboration.
              </motion.p>

              <motion.p variants={fadeUp}>
                Step into an immersive realm where ancient wisdom meets modern
                technology, and emerge victorious from the ultimate test of
                adaptability, ingenuity, and <span className="italic">dexterity</span>.
              </motion.p>
            </motion.div>
          </div>

          {/* Decorative animated corners */}
          {[
            "top-4 left-4 border-l-2 border-t-2",
            "top-4 right-4 border-r-2 border-t-2",
            "bottom-4 left-4 border-l-2 border-b-2",
            "bottom-4 right-4 border-r-2 border-b-2",
          ].map((pos, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              className={`absolute ${pos} w-8 h-8 border-amber-400/50`}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
