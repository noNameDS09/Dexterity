'use client'

import React from 'react'
import { Cinzel } from "next/font/google"

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
})

const CTA: React.FC = () => {
  return (
    <section
      className={`${cinzel.className} h-screen flex items-center justify-center relative py-20 md:py-28 px-4 bg-linear-to-b from-stone-950 to-black overflow-hidden`}
    >
      {/* Soft background glow */}
      {/* <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[125] h-[125] bg-amber-500/10 rounded-full blur-3xl" />
      </div> */}

      <div className="relative max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-amber-100 mb-6 tracking-wide drop-shadow-xl">
          Join the Grand Trials
        </h2>

        <p className="text-stone-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed font-sans">
          Two paths lie before you — logic and strategy.  
          Choose your trial and prove your worth in challenges forged for the bold.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          {/* BYTEHUNT */}
          <a
            href="https://unstop.com/o/NXHPdIn?lb=yMLi2eXX"
            target="_blank"
            rel="noreferrer"
            className="relative group"
          >
            <div className="absolute inset-0 bg-purple-600 blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
            <span
              className="
                relative inline-block
                px-8 py-4
                bg-linear-to-r from-purple-600 to-purple-900
                text-white font-bold tracking-wider
                rounded-xl
                shadow-lg
                hover:scale-105 transition-transform duration-300
              "
            >
              Register for BYTEHUNT
            </span>
          </a>

          {/* ATHERIA */}
          <a
            href="https://unstop.com/p/realm-of-atheria-marathwada-mitra-mandals-college-of-engineering-mmcoe-pune-1623013"
            target="_blank"
            rel="noreferrer"
            className="relative group"
          >
            <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
            <span
              className="
                relative inline-block
                px-8 py-4
                bg-linear-to-r from-emerald-600 to-green-700
                text-white font-bold tracking-wider
                rounded-xl
                shadow-lg
                hover:scale-105 transition-transform duration-300
              "
            >
              Enter Realm of Atheria
            </span>
          </a>
        </div>

        {/* Decorative Orbs */}
        <div className="mt-16 flex justify-center gap-10 opacity-60">
          <div className="w-14 h-14 bg-linear-to-br from-amber-400/30 to-orange-500/20 rounded-full blur-md" />
          <div className="w-10 h-10 bg-linear-to-br from-emerald-400/30 to-green-500/20 rounded-full blur-md" />
          <div className="w-16 h-16 bg-linear-to-br from-purple-400/20 to-indigo-500/20 rounded-full blur-md" />
        </div>
      </div>
    </section>
  )
}

export default CTA
