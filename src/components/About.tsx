import React from 'react';

const About: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-linear-to-b from-stone-800 to-stone-900">
      <div className="max-w-4xl mx-auto">
        <div className="bg-linear-to-br from-stone-700 to-stone-800 p-8 md:p-12 rounded-lg border border-stone-600 shadow-2xl relative overflow-hidden">
          {/* Stone texture overlay */}
          <div className="absolute inset-0 opacity-50">
            <div className="absolute inset-0 bg-linear-to-br from-stone-600/20 via-stone-500/10 to-stone-700/20"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-100 mb-8 font-cinzel text-center">
              About Dexterity
            </h2>
            <div className="text-lg md:text-xl text-stone-300 leading-relaxed space-y-6">
              <p>
                DEXTERITY is a premier college-level fest that bridges the worlds of technology and imagination,
                where participants engage in competitive challenges that test both logical prowess and creative strategy.
              </p>
              <p>
                Our events are designed to push boundaries, foster innovation, and celebrate the spirit of exploration.
                Whether you're a coding virtuoso or a strategic thinker, DEXTERITY offers trials that challenge your
                intellect, creativity, and teamwork in equal measure.
              </p>
              <p>
                Join us in this immersive journey where ancient wisdom meets modern technology,
                and emerge victorious from the ultimate test of dexterity.
              </p>
            </div>
          </div>

          {/* Decorative corners */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-amber-400/50"></div>
          <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-amber-400/50"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-amber-400/50"></div>
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-amber-400/50"></div>
        </div>
      </div>
    </section>
  );
};

export default About;
