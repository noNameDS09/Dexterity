import React from 'react';

const CTA: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-linear-to-b from-stone-900 to-black">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-amber-100 mb-8 font-cinzel">
          Join the Challenge
        </h2>
        <p className="text-xl md:text-2xl text-stone-300 mb-12 leading-relaxed">
          Choose your trial and prove your dexterity in the ultimate test of logic and strategy.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button className="px-8 py-4 bg-linear-to-r from-amber-500 to-orange-500 text-stone-900 font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-cinzel">
            Register for Etch
          </button>
          <button className="px-8 py-4 bg-linear-to-r from-green-600 to-emerald-600 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-cinzel">
            Enter Realm of Atheria
          </button>
        </div>

        {/* Decorative elements */}
        <div className="mt-16 flex justify-center space-x-8">
          <div className="w-16 h-16 bg-linear-to-br from-amber-400/20 to-orange-500/20 rounded-full blur-sm"></div>
          <div className="w-12 h-12 bg-linear-to-br from-green-400/20 to-emerald-500/20 rounded-full blur-sm"></div>
          <div className="w-20 h-20 bg-linear-to-br from-stone-400/10 to-stone-500/10 rounded-full blur-sm"></div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
