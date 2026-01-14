'use client';
import React from 'react';
import { FaInstagram, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaUniversity } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const Footer: React.FC = () => {
  const socialLinks = [
    { name: 'AESA', url: 'https://www.instagram.com/aesa_mmcoe?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', color: 'hover:text-pink-500' },
    { name: 'NEURA', url: 'https://www.instagram.com/neura_ai_club?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', color: 'hover:text-blue-400' },
    { name: 'CYPHER', url: 'https://www.instagram.com/cypher_mmcoe?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', color: 'hover:text-purple-500' },
  ];

  return (
    <footer className={`${cinzel.variable} relative bg-stone-950 text-stone-300 pt-20 pb-10 overflow-hidden`}>
      
      {/* Decorative Top Border Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* 1. Brand & College Info (Spans 4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-amber-100 font-cinzel tracking-wider drop-shadow-md">
                DEXTERITY
              </h2>
              <p className="text-amber-500/80 text-sm font-bold tracking-widest uppercase mt-1">
                Where Logic Meets Legends
              </p>
            </div>
            
            <div className="flex gap-3 items-start text-stone-400">
              <FaUniversity className="mt-1 text-amber-500 shrink-0" />
              <p className="text-sm leading-relaxed font-sans">
                Department of Artificial Intelligence & Data Science<br />
                <span className="text-stone-500">Marathwada Mitra Mandal's College of Engineering, Pune</span>
              </p>
            </div>
          </div>

          {/* 2. Event Details (Spans 3 columns) */}
          <div className="lg:col-span-3 lg:pl-8">
            <h3 className="text-lg font-bold text-amber-100 mb-6 font-cinzel border-b border-stone-800 pb-2 inline-block">
              Event Details
            </h3>
            <ul className="space-y-4 font-sans text-sm">
              <li className="flex items-center gap-3 group">
                <div className="p-2 rounded-full bg-stone-900 border border-stone-800 group-hover:border-amber-500/50 transition-colors">
                  <FaCalendarAlt className="text-amber-500" />
                </div>
                <div>
                  <span className="block text-stone-500 text-xs uppercase">Date</span>
                  <span className="text-stone-200">Jan 24, 2026</span>
                </div>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 rounded-full bg-stone-900 border border-stone-800 group-hover:border-amber-500/50 transition-colors">
                  <FaClock className="text-amber-500" />
                </div>
                <div>
                  <span className="block text-stone-500 text-xs uppercase">Time</span>
                  <span className="text-stone-200">9:00 AM - 6:00 PM</span>
                </div>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 rounded-full bg-stone-900 border border-stone-800 group-hover:border-amber-500/50 transition-colors">
                  <FaMapMarkerAlt className="text-amber-500" />
                </div>
                <div>
                  <span className="block text-stone-500 text-xs uppercase">Venue</span>
                  <span className="text-stone-200">6th Floor, Main Building</span>
                </div>
              </li>
            </ul>
          </div>

          {/* 3. Coordinators (Spans 3 columns) */}
          <div className="lg:col-span-3">
  <h3 className="text-lg font-bold text-amber-100 mb-6 font-cinzel border-b border-stone-800 pb-2 inline-block">
    Student Leads
  </h3>

  <ul className="space-y-3 font-sans text-sm">
    {[
      { name: 'Rohit Dahiphale', phone: '+91 98905 91622' },
      { name: 'Atharv Yeole', phone: '+91 81495 02323' },
      { name: 'Madhura Patwardhan', phone: '' },
    ].map((lead, idx) => (
      <li
        key={idx}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-stone-800/50 pb-2 last:border-0 gap-1"
      >
        <div>
          <span className="text-stone-300 block">{lead.name}</span>
          <a
            href={`tel:${lead.phone.replace(/\s+/g, '')}`}
            className="text-xs text-stone-500 hover:text-amber-400 transition"
          >
            {lead.phone}
          </a>
        </div>

        <span className="text-xs text-amber-500/60 bg-amber-950/30 px-2 py-0.5 rounded border border-amber-900/30 self-start sm:self-center">
          Coord
        </span>
      </li>
    ))}
  </ul>
</div>


          {/* 4. Social Clubs (Spans 2 columns) */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold text-amber-100 mb-6 font-cinzel border-b border-stone-800 pb-2 inline-block">
              Connect
            </h3>
            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 5 }}
                  className={`group flex items-center gap-3 p-3 rounded-lg bg-stone-900 border border-stone-800 hover:border-stone-600 transition-all ${link.color}`}
                >
                  <FaInstagram className="text-xl group-hover:scale-110 transition-transform" />
                  <span className="font-cinzel text-sm tracking-wide text-stone-300 group-hover:text-white">
                    {link.name}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-500 font-sans">
          <p>© 2026 DEXTERITY. All rights reserved.</p>
          <p>Developed by me__avadhoot</p>
          <div className="flex gap-6">
            <span className="hover:text-amber-500 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-amber-500 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;