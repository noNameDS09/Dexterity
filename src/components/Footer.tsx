import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-4 bg-black border-t border-stone-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* College Info */}
          <div>
            <h3 className="text-xl font-bold text-amber-100 mb-4 font-cinzel">DEXTERITY</h3>
            <p className="text-stone-400 leading-relaxed">
              College Technical Fest<br />
              Department of Computer Science
            </p>
          </div>

          {/* Event Details */}
          <div>
            <h4 className="text-lg font-semibold text-amber-200 mb-4 font-cinzel">Event Details</h4>
            <div className="text-stone-400 space-y-2">
              <p><span className="text-stone-500">Date:</span> March 15-16, 2024</p>
              <p><span className="text-stone-500">Venue:</span> Main Auditorium</p>
              <p><span className="text-stone-500">Time:</span> 9:00 AM - 6:00 PM</p>
            </div>
          </div>

          {/* Coordinators */}
          <div>
            <h4 className="text-lg font-semibold text-amber-200 mb-4 font-cinzel">Coordinators</h4>
            <div className="text-stone-400 space-y-2">
              <p>Dr. Sarah Johnson<br /><span className="text-stone-500">Faculty Coordinator</span></p>
              <p>Alex Chen<br /><span className="text-stone-500">Student Coordinator</span></p>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-stone-800 pt-8 text-center">
          <p className="text-stone-500 text-sm">
            © 2024 DEXTERITY. All rights reserved. | Where Logic Meets Legends
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
