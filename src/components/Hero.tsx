import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-linear-to-b from-stone-900 via-stone-800 to-stone-900 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-linear-to-br from-stone-600/10 via-stone-500/5 to-stone-700/10"></div>
      </div>

      {/* Fog effect */}
      <div className="absolute inset-0 bg-linear-to-t from-stone-900/50 via-transparent to-stone-900/30"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold text-amber-100 mb-4 font-cinzel tracking-wider drop-shadow-2xl">
          DEXTERITY
        </h1>
        <p className="text-xl md:text-2xl text-stone-300 mb-12 font-geist-sans italic">
          Where Logic Meets Legends
        </p>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-stone-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-stone-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Decorative vines */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-linear-to-br from-green-800/20 to-transparent rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-linear-to-tl from-amber-600/10 to-transparent rounded-full blur-xl"></div>
      </div>
    </section>
  );
};

export default Hero;
