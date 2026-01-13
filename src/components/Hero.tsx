'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Noise from './Noise';

const Hero: React.FC = () => {
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVars = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const letterVars = {
    hidden: { opacity: 0, letterSpacing: '-0.3em', filter: 'blur(6px)' },
    visible: { opacity: 1, letterSpacing: '0.14em', filter: 'blur(0px)', transition: { duration: 2.2, ease: 'easeOut' } },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-stone-950 overflow-hidden">

      {/* ===== BACKGROUND NOISE ===== */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <Noise patternSize={250} patternScaleX={1} patternScaleY={1} patternRefreshInterval={2} patternAlpha={15} />
      </div>

      {/* ===== ANIMATED GRADIENT ORBS ===== */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.35 }} transition={{ duration: 2 }} className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-24 left-16 w-64 h-64 bg-green-900/30 rounded-full blur-[100px]"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], y: [0, -40, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-24 right-16 w-80 h-80 bg-amber-700/20 rounded-full blur-[120px]"
          />
        </motion.div>
      </div>

      {/* ===== FOG / VIGNETTE ===== */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-stone-950/40 to-stone-950 z-20 pointer-events-none" />

      {/* ===== CONTENT ===== */}
      <motion.div
        variants={containerVars}
        initial="hidden"
        animate="visible"
        className="relative z-30 text-center px-6 max-w-5xl mx-auto flex flex-col items-center"
      >
        <motion.h1 variants={letterVars} className="font-cinzel font-bold text-transparent bg-clip-text bg-linear-to-b from-amber-100 via-amber-200/80 to-stone-500 drop-shadow-[0_0_15px_rgba(252,211,77,0.3)] mb-6 text-5xl sm:text-6xl md:text-8xl lg:text-9xl tracking-[0.08em] sm:tracking-[0.12em] md:tracking-wider leading-none py-6">
          DEXTERITY
        </motion.h1>

        {/* Subtitle */}
        <motion.p variants={itemVars} className="text-base sm:text-lg md:text-2xl text-stone-400 mb-10 tracking-[0.25em] uppercase italic">
          Where <span className="text-amber-200/70">Logic</span> Meets <span className="text-amber-200/70">Legends</span>
        </motion.p>

        {/* Button */}
        <motion.div variants={itemVars} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <button className="px-8 py-3 border border-amber-200/30 text-amber-100 bg-stone-900/50 backdrop-blur-sm hover:bg-amber-200 hover:text-stone-900 transition-colors duration-500 font-cinzel tracking-widest text-sm uppercase">
            Begin the Quest
          </button>
        </motion.div>
      </motion.div>

      {/* ===== SCROLL INDICATOR ===== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-40"
      >
        <span className="text-[10px] text-stone-500 uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-stone-500 to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: [0, 40] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="w-full h-1/2 bg-amber-200/50 absolute top-0"
          />
        </div>
      </motion.div>

    </section>
  );
};

export default Hero;
