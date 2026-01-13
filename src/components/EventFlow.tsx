import React from 'react';

const EventFlow: React.FC = () => {
  const rounds = [
    { number: 1, title: 'Registration & Briefing', description: 'Teams assemble and receive initial instructions' },
    { number: 2, title: 'Preliminary Round', description: 'Basic challenges to filter participants' },
    { number: 3, title: 'Technical Trials', description: 'Core challenges testing skills and strategy' },
    { number: 4, title: 'Final Challenge', description: 'Ultimate test of dexterity and teamwork' },
    { number: 5, title: 'Victory Ceremony', description: 'Celebration and awards for champions' }
  ];

  return (
    <section className="py-20 px-4 bg-linear-to-b from-stone-800 to-stone-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-amber-100 mb-16 font-cinzel text-center">
          The Journey
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-amber-400 to-stone-600"></div>

          {rounds.map((round, index) => (
            <div key={index} className="relative flex items-start mb-12">
              {/* Timeline dot */}
              <div className="shrink-0 w-16 h-16 bg-linear-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg border-4 border-stone-800">
                <span className="text-stone-900 font-bold text-lg font-cinzel">{round.number}</span>
              </div>

              {/* Content */}
              <div className="ml-8 bg-linear-to-r from-stone-700 to-stone-800 p-6 rounded-lg border border-stone-600 shadow-xl flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-amber-100 mb-2 font-cinzel">
                  {round.title}
                </h3>
                <p className="text-stone-300 leading-relaxed">
                  {round.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventFlow;
