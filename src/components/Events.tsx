import React from 'react';

const Events: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-linear-to-b from-stone-900 to-stone-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-amber-100 mb-16 font-cinzel text-center">
          The Trials
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* BYTEHUNT Event */}
          <div className="bg-linear-to-br from-stone-700 to-stone-800 p-8 rounded-lg border border-stone-600 shadow-2xl hover:shadow-amber-500/20 hover:border-amber-400/50 transition-all duration-300 group">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-linear-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 transition-shadow">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-amber-100 font-cinzel">
                BYTEHUNT
              </h3>
              <p className="text-stone-400 text-sm">Technical Quiz & DSA Challenge</p>
            </div>

            <div className="text-stone-300 leading-relaxed space-y-4">
              <p>
                BYTEHUNT is a multi-round technical competition designed to evaluate
                aptitude, logical reasoning, and applied Data Structures & Algorithms
                through progressive difficulty levels.
              </p>
              <div className="pt-4 border-t border-stone-600">
                <h4 className="text-amber-200 font-semibold mb-2">Event Structure:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Round 1 – MCQ Screening: 30 MCQs covering aptitude, reasoning, CS fundamentals</li>
                  <li>• Round 2 – PDF Chain Challenge: 5 progressive password-protected PDFs</li>
                  <li>• Round 3 – Advanced DSA: 4 medium-to-hard problems with optimization focus</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Realm of Atheria Event */}
          <div className="bg-gradient-to-br from-stone-700 to-stone-800 p-8 rounded-lg border border-stone-600 shadow-2xl hover:shadow-green-500/20 hover:border-green-400/50 transition-all duration-300 group">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-linear-to-br from-green-600 to-emerald-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-green-500/50 transition-shadow">
                <span className="text-2xl">🏰</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-amber-100 font-cinzel">
                Realm of Atheria
              </h3>
            </div>

            <div className="text-stone-300 leading-relaxed space-y-4">
              <p>
                A phygital board game where tribes compete by answering questions. Players advance through
                trials of logic, tech fundamentals, and code reasoning. Strategy, timing, and decision-making determine victory.
              </p>
              <div className="pt-4 border-t border-stone-600">
                <h4 className="text-amber-200 font-semibold mb-2">Key Features:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Strategic board game mechanics</li>
                  <li>• Team-based competition</li>
                  <li>• Mixed technical challenges</li>
                  <li>• Tactical decision making</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
