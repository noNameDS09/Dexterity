'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Cinzel } from "next/font/google";
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const Events: React.FC = () => {
  return (
    <section className={`${cinzel.className} text-center py-24 px-4 bg-linear-to-b from-stone-900 to-stone-950`} id='events'>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="max-w-6xl mx-auto"
      >
        {/* Section Heading */}
        <motion.h2
          variants={fadeUp}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-100 font-cinzel text-center mb-16 tracking-wide"
        >
          The Trials
        </motion.h2>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* BYTEHUNT */}
          <motion.article
            variants={fadeUp}
            className="
              bg-gradient-to-br from-stone-700/80 to-stone-800/90
              border border-stone-600
              rounded-xl
              p-8 sm:p-10
              shadow-lg
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-xl
              flex flex-col
            "
          >
            <header className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md">
                <span className="text-xl">🔍</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-amber-100 font-cinzel">
                BYTEHUNT
              </h3>

              <p className="text-stone-400 text-sm mt-1">
                Technical Quiz & DSA Challenge
              </p>
            </header>

            <div className="text-stone-300 text-sm sm:text-base leading-relaxed space-y-4 flex-grow">
              <p>
                BYTEHUNT is a multi-round technical challenge designed to assess
                aptitude, logical reasoning, and applied Data Structures & Algorithms
                through progressively complex stages.
              </p>

              <div className="pt-4 border-t border-stone-600">
                <h4 className="text-amber-200 font-semibold mb-2">
                  Event Structure
                </h4>
                <ul className="space-y-1 text-sm">
                  <li>• Round 1 — MCQ Screening (Aptitude & CS Fundamentals)</li>
                  <li>• Round 2 — PDF Chain Puzzle Challenge</li>
                  <li>• Round 3 — Advanced DSA & Optimization</li>
                </ul>
              </div>
            </div>

            {/* Register Button */}
            <motion.div
              className="mt-8 flex justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="https://unstop.com/o/NXHPdIn?lb=yMLi2eXX&utm_medium=Share&utm_source=shreydaw9833&utm_campaign=Online_coding_challenge"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  px-7 py-3
                  rounded-full
                  bg-gradient-to-r from-blue-500 to-cyan-500
                  text-stone-900
                  font-semibold
                  shadow-md
                  hover:shadow-lg
                  transition-all
                "
              >
                Register for BYTEHUNT
              </a>
            </motion.div>
          </motion.article>

          {/* Realm of Atheria */}
          <motion.article
            variants={fadeUp}
            className="
              bg-gradient-to-br from-stone-700/80 to-stone-800/90
              border border-stone-600
              rounded-xl
              p-8 sm:p-10
              shadow-lg
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-xl
              flex flex-col
            "
          >
            <header className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-600 to-emerald-500 flex items-center justify-center shadow-md">
                <span className="text-xl">🏰</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-amber-100 font-cinzel">
                Realm of Atheria
              </h3>
            </header>

            <div className="text-stone-300 text-sm sm:text-base leading-relaxed space-y-4 flex-grow">
              <p>
                A phygital strategy board game where teams advance by solving technical
                and logical challenges. Success depends on collaboration, timing, and
                informed decision-making.
              </p>

              <div className="pt-4 border-t border-stone-600">
                <h4 className="text-amber-200 font-semibold mb-2">
                  Key Features
                </h4>
                <ul className="space-y-1 text-sm">
                  <li>• Strategic board-game mechanics</li>
                  <li>• Team-based competitive format</li>
                  <li>• Mixed technical & reasoning challenges</li>
                  <li>• Tactical gameplay decisions</li>
                </ul>
              </div>
            </div>

            {/* Register Button */}
            <motion.div
              className="mt-8 flex justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="https://unstop.com/p/realm-of-atheria-marathwada-mitra-mandals-college-of-engineering-mmcoe-pune-1623013"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  px-7 py-3
                  rounded-full
                  bg-gradient-to-r from-green-600 to-emerald-500
                  text-stone-900
                  font-semibold
                  shadow-md
                  hover:shadow-lg
                  transition-all
                "
              >
                Register for Atheria
              </a>
            </motion.div>
          </motion.article>

        </div>
      </motion.div>
    </section>
  )
}

export default Events
