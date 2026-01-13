// 'use client'
// import React, { useRef, useEffect, useState, useCallback } from 'react';
// import { gsap } from 'gsap';
// import { Cinzel } from "next/font/google";

// const cinzel = Cinzel({
//   variable: "--font-cinzel",
//   subsets: ["latin"],
// });

// const DEFAULT_PARTICLE_COUNT = 12;
// const DEFAULT_SPOTLIGHT_RADIUS = 300;
// const DEFAULT_GLOW_COLOR = '255, 140, 0'; // Amber glow for the event theme
// const MOBILE_BREAKPOINT = 768;

// const createParticleElement = (x: number, y: number, color: string = DEFAULT_GLOW_COLOR): HTMLDivElement => {
//   const el = document.createElement('div');
//   el.className = 'particle';
//   el.style.cssText = `
//     position: absolute;
//     width: 4px;
//     height: 4px;
//     border-radius: 50%;
//     background: rgba(${color}, 1);
//     box-shadow: 0 0 6px rgba(${color}, 0.6);
//     pointer-events: none;
//     z-index: 100;
//     left: ${x}px;
//     top: ${y}px;
//   `;
//   return el;
// };

// const calculateSpotlightValues = (radius: number) => ({
//   proximity: radius * 0.5,
//   fadeDistance: radius * 0.75
// });

// const updateCardGlowProperties = (card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) => {
//   const rect = card.getBoundingClientRect();
//   const relativeX = ((mouseX - rect.left) / rect.width) * 100;
//   const relativeY = ((mouseY - rect.top) / rect.height) * 100;

//   card.style.setProperty('--glow-x', `${relativeX}%`);
//   card.style.setProperty('--glow-y', `${relativeY}%`);
//   card.style.setProperty('--glow-intensity', glow.toString());
//   card.style.setProperty('--glow-radius', `${radius}px`);
// };

// const ParticleCard: React.FC<{
//   children: React.ReactNode;
//   className?: string;
//   disableAnimations?: boolean;
//   style?: React.CSSProperties;
//   particleCount?: number;
//   glowColor?: string;
//   enableTilt?: boolean;
//   clickEffect?: boolean;
//   enableMagnetism?: boolean;
// }> = ({
//   children,
//   className = '',
//   disableAnimations = false,
//   style,
//   particleCount = DEFAULT_PARTICLE_COUNT,
//   glowColor = DEFAULT_GLOW_COLOR,
//   enableTilt = true,
//   clickEffect = false,
//   enableMagnetism = false
// }) => {
//   const cardRef = useRef<HTMLDivElement>(null);
//   const particlesRef = useRef<HTMLDivElement[]>([]);
//   const timeoutsRef = useRef<number[]>([]);
//   const isHoveredRef = useRef(false);
//   const memoizedParticles = useRef<HTMLDivElement[]>([]);
//   const particlesInitialized = useRef(false);
//   const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

//   const initializeParticles = useCallback(() => {
//     if (particlesInitialized.current || !cardRef.current) return;

//     const { width, height } = cardRef.current.getBoundingClientRect();
//     memoizedParticles.current = Array.from({ length: particleCount }, () =>
//       createParticleElement(Math.random() * width, Math.random() * height, glowColor)
//     );
//     particlesInitialized.current = true;
//   }, [particleCount, glowColor]);

//   const clearAllParticles = useCallback(() => {
//     timeoutsRef.current.forEach(clearTimeout);
//     timeoutsRef.current = [];
//     magnetismAnimationRef.current?.kill();

//     particlesRef.current.forEach(particle => {
//       gsap.to(particle, {
//         scale: 0,
//         opacity: 0,
//         duration: 0.3,
//         ease: 'back.in(1.7)',
//         onComplete: () => {
//           particle.parentNode?.removeChild(particle);
//         }
//       });
//     });
//     particlesRef.current = [];
//   }, []);

//   const animateParticles = useCallback(() => {
//     if (!cardRef.current || !isHoveredRef.current) return;

//     if (!particlesInitialized.current) {
//       initializeParticles();
//     }

//     memoizedParticles.current.forEach((particle, index) => {
//       const timeoutId = setTimeout(() => {
//         if (!isHoveredRef.current || !cardRef.current) return;

//         const clone = particle.cloneNode(true) as HTMLDivElement;
//         cardRef.current.appendChild(clone);
//         particlesRef.current.push(clone);

//         gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });

//         gsap.to(clone, {
//           x: (Math.random() - 0.5) * 100,
//           y: (Math.random() - 0.5) * 100,
//           rotation: Math.random() * 360,
//           duration: 2 + Math.random() * 2,
//           ease: 'none',
//           repeat: -1,
//           yoyo: true
//         });

//         gsap.to(clone, {
//           opacity: 0.3,
//           duration: 1.5,
//           ease: 'power2.inOut',
//           repeat: -1,
//           yoyo: true
//         });
//       }, index * 100);

//       timeoutsRef.current.push(timeoutId);
//     });
//   }, [initializeParticles]);

//   useEffect(() => {
//     if (disableAnimations || !cardRef.current) return;

//     const element = cardRef.current;

//     const handleMouseEnter = () => {
//       isHoveredRef.current = true;
//       animateParticles();

//       if (enableTilt) {
//         gsap.to(element, {
//           rotateX: 5,
//           rotateY: 5,
//           duration: 0.3,
//           ease: 'power2.out',
//           transformPerspective: 1000
//         });
//       }
//     };

//     const handleMouseLeave = () => {
//       isHoveredRef.current = false;
//       clearAllParticles();

//       if (enableTilt) {
//         gsap.to(element, {
//           rotateX: 0,
//           rotateY: 0,
//           duration: 0.3,
//           ease: 'power2.out'
//         });
//       }

//       if (enableMagnetism) {
//         gsap.to(element, {
//           x: 0,
//           y: 0,
//           duration: 0.3,
//           ease: 'power2.out'
//         });
//       }
//     };

//     const handleMouseMove = (e: MouseEvent) => {
//       if (!enableTilt && !enableMagnetism) return;

//       const rect = element.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;
//       const centerX = rect.width / 2;
//       const centerY = rect.height / 2;

//       if (enableTilt) {
//         const rotateX = ((y - centerY) / centerY) * -10;
//         const rotateY = ((x - centerX) / centerX) * 10;

//         gsap.to(element, {
//           rotateX,
//           rotateY,
//           duration: 0.1,
//           ease: 'power2.out',
//           transformPerspective: 1000
//         });
//       }

//       if (enableMagnetism) {
//         const magnetX = (x - centerX) * 0.05;
//         const magnetY = (y - centerY) * 0.05;

//         gsap.to(element, {
//           x: magnetX,
//           y: magnetY,
//           duration: 0.3,
//           ease: 'power2.out'
//         });
//       }
//     };

//     const handleClick = (e: MouseEvent) => {
//       if (!clickEffect) return;

//       const rect = element.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;

//       const maxDistance = Math.max(
//         Math.hypot(x, y),
//         Math.hypot(x - rect.width, y),
//         Math.hypot(x, y - rect.height),
//         Math.hypot(x - rect.width, y - rect.height)
//       );

//       const ripple = document.createElement('div');
//       ripple.style.cssText = `
//         position: absolute;
//         width: ${maxDistance * 2}px;
//         height: ${maxDistance * 2}px;
//         border-radius: 50%;
//         background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
//         left: ${x - maxDistance}px;
//         top: ${y - maxDistance}px;
//         pointer-events: none;
//         z-index: 1000;
//       `;

//       element.appendChild(ripple);

//       gsap.fromTo(
//         ripple,
//         { scale: 0, opacity: 1 },
//         {
//           scale: 1,
//           opacity: 0,
//           duration: 0.8,
//           ease: 'power2.out',
//           onComplete: () => ripple.remove()
//         }
//       );
//     };

//     element.addEventListener('mouseenter', handleMouseEnter);
//     element.addEventListener('mouseleave', handleMouseLeave);
//     element.addEventListener('mousemove', handleMouseMove);
//     element.addEventListener('click', handleClick);

//     return () => {
//       isHoveredRef.current = false;
//       element.removeEventListener('mouseenter', handleMouseEnter);
//       element.removeEventListener('mouseleave', handleMouseLeave);
//       element.removeEventListener('mousemove', handleMouseMove);
//       element.removeEventListener('click', handleClick);
//       clearAllParticles();
//     };
//   }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

//   return (
//     <div
//       ref={cardRef}
//       className={`${className} relative overflow-hidden`}
//       style={{ ...style, position: 'relative', overflow: 'hidden' }}
//     >
//       {children}
//     </div>
//   );
// };

// const GlobalSpotlight: React.FC<{
//   gridRef: React.RefObject<HTMLDivElement | null>;
//   disableAnimations?: boolean;
//   enabled?: boolean;
//   spotlightRadius?: number;
//   glowColor?: string;
// }> = ({
//   gridRef,
//   disableAnimations = false,
//   enabled = true,
//   spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
//   glowColor = DEFAULT_GLOW_COLOR
// }) => {
//   const spotlightRef = useRef<HTMLDivElement | null>(null);
//   const isInsideSection = useRef(false);

//   useEffect(() => {
//     if (disableAnimations || !gridRef?.current || !enabled) return;

//     const spotlight = document.createElement('div');
//     spotlight.className = 'global-spotlight';
//     spotlight.style.cssText = `
//       position: fixed;
//       width: 800px;
//       height: 800px;
//       border-radius: 50%;
//       pointer-events: none;
//       background: radial-gradient(circle,
//         rgba(${glowColor}, 0.15) 0%,
//         rgba(${glowColor}, 0.08) 15%,
//         rgba(${glowColor}, 0.04) 25%,
//         rgba(${glowColor}, 0.02) 40%,
//         rgba(${glowColor}, 0.01) 65%,
//         transparent 70%
//       );
//       z-index: 200;
//       opacity: 0;
//       transform: translate(-50%, -50%);
//       mix-blend-mode: screen;
//     `;
//     document.body.appendChild(spotlight);
//     spotlightRef.current = spotlight;

//     const handleMouseMove = (e: MouseEvent) => {
//       if (!spotlightRef.current || !gridRef.current) return;

//       const section = gridRef.current.closest('.bento-section');
//       const rect = section?.getBoundingClientRect();
//       const mouseInside =
//         rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

//       isInsideSection.current = mouseInside || false;
//       const cards = gridRef.current.querySelectorAll('.card');

//       if (!mouseInside) {
//         gsap.to(spotlightRef.current, {
//           opacity: 0,
//           duration: 0.3,
//           ease: 'power2.out'
//         });
//         cards.forEach(card => {
//           (card as HTMLElement).style.setProperty('--glow-intensity', '0');
//         });
//         return;
//       }

//       const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
//       let minDistance = Infinity;

//       cards.forEach(card => {
//         const cardElement = card as HTMLElement;
//         const cardRect = cardElement.getBoundingClientRect();
//         const centerX = cardRect.left + cardRect.width / 2;
//         const centerY = cardRect.top + cardRect.height / 2;
//         const distance =
//           Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
//         const effectiveDistance = Math.max(0, distance);

//         minDistance = Math.min(minDistance, effectiveDistance);

//         let glowIntensity = 0;
//         if (effectiveDistance <= proximity) {
//           glowIntensity = 1;
//         } else if (effectiveDistance <= fadeDistance) {
//           glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
//         }

//         updateCardGlowProperties(cardElement, e.clientX, e.clientY, glowIntensity, spotlightRadius);
//       });

//       gsap.to(spotlightRef.current, {
//         left: e.clientX,
//         top: e.clientY,
//         duration: 0.1,
//         ease: 'power2.out'
//       });

//       const targetOpacity =
//         minDistance <= proximity
//           ? 0.8
//           : minDistance <= fadeDistance
//             ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
//             : 0;

//       gsap.to(spotlightRef.current, {
//         opacity: targetOpacity,
//         duration: targetOpacity > 0 ? 0.2 : 0.5,
//         ease: 'power2.out'
//       });
//     };

//     const handleMouseLeave = () => {
//       isInsideSection.current = false;
//       gridRef.current?.querySelectorAll('.card').forEach(card => {
//         (card as HTMLElement).style.setProperty('--glow-intensity', '0');
//       });
//       if (spotlightRef.current) {
//         gsap.to(spotlightRef.current, {
//           opacity: 0,
//           duration: 0.3,
//           ease: 'power2.out'
//         });
//       }
//     };

//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseleave', handleMouseLeave);

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseleave', handleMouseLeave);
//       spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
//     };
//   }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

//   return null;
// };

// const useMobileDetection = () => {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   return isMobile;
// };

// const EventsWithMagicBento: React.FC = () => {
//   const gridRef = useRef<HTMLDivElement>(null);
//   const isMobile = useMobileDetection();
//   const shouldDisableAnimations = isMobile;

//   const eventsData = [
//     {
//       title: 'BYTEHUNT',
//       subtitle: 'Technical Quiz & DSA Challenge',
//       icon: '🔍',
//       gradient: 'from-blue-500 to-cyan-500',
//       description: 'BYTEHUNT is a multi-round technical challenge designed to assess aptitude, logical reasoning, and applied Data Structures & Algorithms through progressively complex stages.',
//       features: [
//         'Round 1 — MCQ Screening (Aptitude & CS Fundamentals)',
//         'Round 2 — PDF Chain Puzzle Challenge',
//         'Round 3 — Advanced DSA & Optimization'
//       ],
//       registerLink: 'https://unstop.com/o/NXHPdIn?lb=yMLi2eXX&utm_medium=Share&utm_source=shreydaw9833&utm_campaign=Online_coding_challenge',
//       color: '#1a1a2e'
//     },
//     {
//       title: 'Realm of Atheria',
//       subtitle: 'Phygital Strategy Board Game',
//       icon: '🏰',
//       gradient: 'from-green-600 to-emerald-500',
//       description: 'A phygital strategy board game where teams advance by solving technical and logical challenges. Success depends on collaboration, timing, and informed decision-making.',
//       features: [
//         'Strategic board-game mechanics',
//         'Team-based competitive format',
//         'Mixed technical & reasoning challenges',
//         'Tactical gameplay decisions'
//       ],
//       registerLink: 'https://unstop.com/p/realm-of-atheria-marathwada-mitra-mandals-college-of-engineering-mmcoe-pune-1623013',
//       color: '#1a1a2e'
//     }
//   ];

//   return (
//     <>
//       <style>
//         {`
//           .bento-section {
//             --glow-x: 50%;
//             --glow-y: 50%;
//             --glow-intensity: 0;
//             --glow-radius: 200px;
//             --glow-color: ${DEFAULT_GLOW_COLOR};
//             --border-color: #57534e;
//             --background-dark: #1c1917;
//           }
          
//           .card--border-glow::after {
//             content: '';
//             position: absolute;
//             inset: 0;
//             padding: 3px;
//             background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
//                 rgba(${DEFAULT_GLOW_COLOR}, calc(var(--glow-intensity) * 0.8)) 0%,
//                 rgba(${DEFAULT_GLOW_COLOR}, calc(var(--glow-intensity) * 0.4)) 30%,
//                 transparent 60%);
//             border-radius: inherit;
//             -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
//             -webkit-mask-composite: xor;
//             mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
//             mask-composite: exclude;
//             pointer-events: none;
//             opacity: 1;
//             transition: opacity 0.3s ease;
//             z-index: 1;
//           }
          
//           .card--border-glow:hover::after {
//             opacity: 1;
//           }
          
//           .event-card {
//             min-height: 500px;
//           }
          
//           @media (max-width: 768px) {
//             .event-card {
//               min-height: 450px;
//             }
//           }
//         `}
//       </style>

//       <section className={`${cinzel.className} py-24 px-4 bg-gradient-to-b from-stone-900 to-stone-950`} id='events'>
//         <GlobalSpotlight
//           gridRef={gridRef}
//           disableAnimations={shouldDisableAnimations}
//           enabled={true}
//           spotlightRadius={DEFAULT_SPOTLIGHT_RADIUS}
//           glowColor={DEFAULT_GLOW_COLOR}
//         />

//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-100 text-center mb-16 tracking-wide">
//             The Trials
//           </h2>

//           <div className="bento-section grid gap-6 md:grid-cols-2" ref={gridRef}>
//             {eventsData.map((event, index) => (
//               <ParticleCard
//                 key={index}
//                 className="card card--border-glow event-card flex flex-col rounded-2xl border border-stone-600 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
//                 style={{
//                   backgroundColor: event.color,
//                   '--glow-x': '50%',
//                   '--glow-y': '50%',
//                   '--glow-intensity': '0',
//                   '--glow-radius': '200px'
//                 } as React.CSSProperties}
//                 disableAnimations={shouldDisableAnimations}
//                 particleCount={15}
//                 glowColor={DEFAULT_GLOW_COLOR}
//                 enableTilt={true}
//                 clickEffect={true}
//                 enableMagnetism={true}
//               >
//                 {/* Header */}
//                 <header className="text-center mb-8">
//                   <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${event.gradient} flex items-center justify-center shadow-md`}>
//                     <span className="text-2xl">{event.icon}</span>
//                   </div>

//                   <h3 className="text-2xl sm:text-3xl font-bold text-amber-100 mb-2">
//                     {event.title}
//                   </h3>

//                   <p className="text-stone-400 text-sm">
//                     {event.subtitle}
//                   </p>
//                 </header>

//                 {/* Description */}
//                 <div className="flex-grow text-stone-300 text-sm sm:text-base leading-relaxed space-y-4">
//                   <p>{event.description}</p>

//                   <div className="pt-4 border-t border-stone-600">
//                     <h4 className="text-amber-200 font-semibold mb-3">
//                       {event.title === 'BYTEHUNT' ? 'Event Structure' : 'Key Features'}
//                     </h4>
//                     <ul className="space-y-2 text-sm">
//                       {event.features.map((feature, idx) => (
//                         <li key={idx}>• {feature}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>

//                 {/* Register Button */}
//                 <div className="mt-8 flex justify-center">
//                   <a
//                     href={event.registerLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className={`px-7 py-3 rounded-full bg-gradient-to-r ${event.gradient} text-stone-900 font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all`}
//                   >
//                     Register for {event.title}
//                   </a>
//                 </div>
//               </ParticleCard>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default EventsWithMagicBento;

// 'use client'
// import React, { useRef, useEffect, useState, useCallback } from 'react'
// import { gsap } from 'gsap'

// /* ===================== TYPES ===================== */

// export interface BentoCardProps {
//   color?: string
//   title?: string
//   description?: string
//   label?: string
//   textAutoHide?: boolean
//   disableAnimations?: boolean
// }

// export interface BentoProps {
//   textAutoHide?: boolean
//   enableStars?: boolean
//   enableSpotlight?: boolean
//   enableBorderGlow?: boolean
//   disableAnimations?: boolean
//   spotlightRadius?: number
//   particleCount?: number
//   enableTilt?: boolean
//   glowColor?: string
//   clickEffect?: boolean
//   enableMagnetism?: boolean
// }

// /* ===================== CONFIG ===================== */

// const DEFAULT_PARTICLE_COUNT = 12
// const DEFAULT_SPOTLIGHT_RADIUS = 300
// const DEFAULT_GLOW_COLOR = '255, 140, 0' // amber glow
// const MOBILE_BREAKPOINT = 768

// /* ===================== EVENT GRID DATA ===================== */

// const cardData: BentoCardProps[] = [
//   // -------- BYTEHUNT --------
//   {
//     color: '#1c1917',
//     label: 'Event',
//     title: 'BYTEHUNT',
//     description: 'Technical Quiz & DSA Challenge'
//   },
//   {
//     color: '#1c1917',
//     label: 'About',
//     title: 'What is BYTEHUNT?',
//     description:
//       'A multi-round technical challenge testing aptitude, logic, and applied Data Structures & Algorithms.'
//   },
//   {
//     color: '#1c1917',
//     label: 'Structure',
//     title: 'Rounds',
//     description:
//       'R1: MCQ Screening • R2: PDF Chain Puzzle • R3: Advanced DSA & Optimization'
//   },

//   // -------- REALM OF ATHERIA --------
//   {
//     color: '#1c1917',
//     label: 'Event',
//     title: 'Realm of Atheria',
//     description: 'Phygital Strategy Board Game'
//   },
//   {
//     color: '#1c1917',
//     label: 'Gameplay',
//     title: 'How it Works',
//     description:
//       'Teams advance by solving technical and logical challenges with tactical decisions.'
//   },
//   {
//     color: '#1c1917',
//     label: 'Features',
//     title: 'Key Elements',
//     description:
//       'Board-game mechanics • Team play • Mixed technical & reasoning challenges'
//   }
// ]

// /* ===================== UTILS ===================== */

// const createParticleElement = (x: number, y: number, color: string) => {
//   const el = document.createElement('div')
//   el.className = 'particle'
//   el.style.cssText = `
//     position:absolute;width:4px;height:4px;border-radius:50%;
//     background:rgba(${color},1);box-shadow:0 0 6px rgba(${color},0.6);
//     pointer-events:none;z-index:100;left:${x}px;top:${y}px;
//   `
//   return el
// }

// const calculateSpotlightValues = (radius: number) => ({
//   proximity: radius * 0.5,
//   fadeDistance: radius * 0.75
// })

// const updateCardGlowProperties = (
//   card: HTMLElement,
//   mouseX: number,
//   mouseY: number,
//   glow: number,
//   radius: number
// ) => {
//   const rect = card.getBoundingClientRect()
//   const relativeX = ((mouseX - rect.left) / rect.width) * 100
//   const relativeY = ((mouseY - rect.top) / rect.height) * 100

//   card.style.setProperty('--glow-x', `${relativeX}%`)
//   card.style.setProperty('--glow-y', `${relativeY}%`)
//   card.style.setProperty('--glow-intensity', glow.toString())
//   card.style.setProperty('--glow-radius', `${radius}px`)
// }

// /* ===================== PARTICLE CARD ===================== */

// const ParticleCard: React.FC<{
//   children: React.ReactNode
//   className?: string
//   disableAnimations?: boolean
//   style?: React.CSSProperties
//   particleCount?: number
//   glowColor?: string
//   enableTilt?: boolean
//   clickEffect?: boolean
//   enableMagnetism?: boolean
// }> = ({
//   children,
//   className = '',
//   disableAnimations = false,
//   style,
//   particleCount = DEFAULT_PARTICLE_COUNT,
//   glowColor = DEFAULT_GLOW_COLOR,
//   enableTilt = true,
//   clickEffect = false,
//   enableMagnetism = false
// }) => {
//   const cardRef = useRef<HTMLDivElement>(null)
//   const particlesRef = useRef<HTMLDivElement[]>([])
//   const timeoutsRef = useRef<number[]>([])
//   const isHoveredRef = useRef(false)
//   const memoizedParticles = useRef<HTMLDivElement[]>([])
//   const particlesInitialized = useRef(false)
//   const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null)

//   const initializeParticles = useCallback(() => {
//     if (particlesInitialized.current || !cardRef.current) return
//     const { width, height } = cardRef.current.getBoundingClientRect()
//     memoizedParticles.current = Array.from({ length: particleCount }, () =>
//       createParticleElement(Math.random() * width, Math.random() * height, glowColor)
//     )
//     particlesInitialized.current = true
//   }, [particleCount, glowColor])

//   const clearAllParticles = useCallback(() => {
//     timeoutsRef.current.forEach(clearTimeout)
//     timeoutsRef.current = []
//     magnetismAnimationRef.current?.kill()

//     particlesRef.current.forEach(particle => {
//       gsap.to(particle, {
//         scale: 0,
//         opacity: 0,
//         duration: 0.3,
//         ease: 'back.in(1.7)',
//         onComplete: () => particle.remove()
//       })
//     })
//     particlesRef.current = []
//   }, [])

//   const animateParticles = useCallback(() => {
//     if (!cardRef.current || !isHoveredRef.current) return
//     if (!particlesInitialized.current) initializeParticles()

//     memoizedParticles.current.forEach((particle, index) => {
//       const id = window.setTimeout(() => {
//         if (!isHoveredRef.current || !cardRef.current) return
//         const clone = particle.cloneNode(true) as HTMLDivElement
//         cardRef.current.appendChild(clone)
//         particlesRef.current.push(clone)

//         gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3 })

//         gsap.to(clone, {
//           x: (Math.random() - 0.5) * 100,
//           y: (Math.random() - 0.5) * 100,
//           duration: 3,
//           repeat: -1,
//           yoyo: true,
//           ease: 'none'
//         })
//       }, index * 100)
//       timeoutsRef.current.push(id)
//     })
//   }, [initializeParticles])

//   useEffect(() => {
//     if (disableAnimations || !cardRef.current) return
//     const el = cardRef.current

//     const enter = () => {
//       isHoveredRef.current = true
//       animateParticles()
//       if (enableTilt) gsap.to(el, { rotateX: 5, rotateY: 5, duration: 0.3 })
//     }

//     const leave = () => {
//       isHoveredRef.current = false
//       clearAllParticles()
//       gsap.to(el, { rotateX: 0, rotateY: 0, x: 0, y: 0, duration: 0.3 })
//     }

//     const move = (e: MouseEvent) => {
//       const r = el.getBoundingClientRect()
//       const x = e.clientX - r.left - r.width / 2
//       const y = e.clientY - r.top - r.height / 2

//       if (enableTilt)
//         gsap.to(el, { rotateX: (-y / r.height) * 10, rotateY: (x / r.width) * 10, duration: 0.1 })

//       if (enableMagnetism) gsap.to(el, { x: x * 0.05, y: y * 0.05, duration: 0.3 })
//     }

//     el.addEventListener('mouseenter', enter)
//     el.addEventListener('mouseleave', leave)
//     el.addEventListener('mousemove', move)

//     return () => {
//       el.removeEventListener('mouseenter', enter)
//       el.removeEventListener('mouseleave', leave)
//       el.removeEventListener('mousemove', move)
//       clearAllParticles()
//     }
//   }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism])

//   return (
//     <div ref={cardRef} className={`${className} relative overflow-hidden`} style={style}>
//       {children}
//     </div>
//   )
// }

// /* ===================== GRID ===================== */

// const BentoCardGrid: React.FC<{ children: React.ReactNode; gridRef?: any }> = ({
//   children,
//   gridRef
// }) => (
//   <div className="bento-section grid gap-2 p-3 max-w-[54rem] mx-auto" ref={gridRef}>
//     {children}
//   </div>
// )

// /* ===================== MOBILE ===================== */

// const useMobileDetection = () => {
//   const [isMobile, setIsMobile] = useState(false)
//   useEffect(() => {
//     const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT)
//     check()
//     window.addEventListener('resize', check)
//     return () => window.removeEventListener('resize', check)
//   }, [])
//   return isMobile
// }

// /* ===================== MAIN ===================== */

// const EventsMagicBento: React.FC<BentoProps> = ({
//   textAutoHide = true,
//   enableStars = true,
//   enableBorderGlow = true,
//   enableTilt = true,
//   enableMagnetism = true,
//   glowColor = DEFAULT_GLOW_COLOR
// }) => {
//   const gridRef = useRef<HTMLDivElement>(null)
//   const isMobile = useMobileDetection()

//   return (
//     <>
//       <style>
//         {`
//         .bento-section{--glow-x:50%;--glow-y:50%;--glow-intensity:0;--glow-radius:200px}
//         .card--border-glow::after{
//           content:'';position:absolute;inset:0;padding:6px;
//           background:radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
//           rgba(${glowColor},calc(var(--glow-intensity)*.8)) 0%,
//           rgba(${glowColor},calc(var(--glow-intensity)*.4)) 30%,transparent 60%);
//           border-radius:inherit;pointer-events:none
//         }
//         @media(min-width:1024px){
//           .card-responsive{grid-template-columns:repeat(4,1fr)}
//           .card-responsive .card:nth-child(3){grid-column:span 2;grid-row:span 2}
//           .card-responsive .card:nth-child(4){grid-column:1/span 2;grid-row:2/span 2}
//         }
//       `}
//       </style>

//       <BentoCardGrid gridRef={gridRef}>
//         <div className="card-responsive grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
//           {cardData.map((card, i) => {
//             const base =
//               'card flex flex-col justify-between p-5 rounded-2xl border border-stone-700 bg-[#1c1917] text-white'

//             return (
//               <ParticleCard
//                 key={i}
//                 className={`${base} ${enableBorderGlow ? 'card--border-glow' : ''}`}
//                 disableAnimations={isMobile}
//                 glowColor={glowColor}
//                 enableTilt={enableTilt}
//                 enableMagnetism={enableMagnetism}
//               >
//                 <span className="text-xs uppercase tracking-wider text-amber-400">
//                   {card.label}
//                 </span>

//                 <div>
//                   <h3 className="text-base font-semibold mb-1">{card.title}</h3>
//                   <p className="text-sm text-stone-300 leading-snug">
//                     {card.description}
//                   </p>
//                 </div>
//               </ParticleCard>
//             )
//           })}
//         </div>
//       </BentoCardGrid>
//     </>
//   )
// }

// export default EventsMagicBento
'use client'
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Cinzel } from "next/font/google";

// --- Fonts & Constants ---
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '255, 160, 0'; // Amber/Gold Color
const MOBILE_BREAKPOINT = 768;

// --- Types ---
interface BentoItemProps {
  title: string;
  description: string;
  label: string;
  isMain?: boolean;
}

interface EventSectionProps {
  id: string;
  title: string;
  registerLink: string;
  items: BentoItemProps[];
}

// --- Helper Functions ---
const createParticleElement = (x: number, y: number, color: string): HTMLDivElement => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75
});

const updateCardGlowProperties = (card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
};

// --- Components ---

const GlobalSpotlight: React.FC<{
  containerRef: React.RefObject<HTMLDivElement | null>;
  disableAnimations?: boolean;
  enabled?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
}> = ({
  containerRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR
}) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (disableAnimations || !containerRef?.current || !enabled) return;

    const spotlight = document.createElement('div');
    spotlight.className = 'global-spotlight';
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.15) 0%,
        rgba(${glowColor}, 0.08) 15%,
        rgba(${glowColor}, 0.04) 25%,
        rgba(${glowColor}, 0.02) 40%,
        rgba(${glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !containerRef.current) return;

      const grids = containerRef.current.querySelectorAll('.bento-grid');
      let mouseInsideAny = false;

      grids.forEach(grid => {
        const rect = grid.getBoundingClientRect();
        if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
          mouseInsideAny = true;
        }
      });

      const cards = containerRef.current.querySelectorAll('.card');

      if (!mouseInsideAny) {
        gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
        cards.forEach(card => (card as HTMLElement).style.setProperty('--glow-intensity', '0'));
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cards.forEach(card => {
        const cardElement = card as HTMLElement;
        const cardRect = cardElement.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) glowIntensity = 1;
        else if (effectiveDistance <= fadeDistance) glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);

        updateCardGlowProperties(cardElement, e.clientX, e.clientY, glowIntensity, spotlightRadius);
      });

      gsap.to(spotlightRef.current, { left: e.clientX, top: e.clientY, duration: 0.1 });
      
      const targetOpacity = minDistance <= proximity ? 0.8 : minDistance <= fadeDistance ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8 : 0;
      gsap.to(spotlightRef.current, { opacity: targetOpacity, duration: 0.2 });
    };

    const handleMouseLeave = () => {
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      spotlightRef.current?.remove();
    };
  }, [containerRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

const ParticleCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  disableAnimations?: boolean;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}> = ({
  children,
  className = '',
  disableAnimations = false,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  
  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;
    const element = cardRef.current;

    const spawnParticles = () => {
      if(!isHoveredRef.current) return;
      const { width, height } = element.getBoundingClientRect();
      
      for(let i = 0; i < 3; i++) {
        const p = createParticleElement(Math.random() * width, Math.random() * height, glowColor);
        element.appendChild(p);
        
        gsap.fromTo(p, 
          { scale: 0, opacity: 0 }, 
          { 
            scale: 1, 
            opacity: 1, 
            duration: 0.3,
            onComplete: () => {
              gsap.to(p, {
                x: (Math.random() - 0.5) * 60,
                y: (Math.random() - 0.5) * 60,
                opacity: 0,
                duration: 1 + Math.random(),
                onComplete: () => p.remove()
              })
            }
          }
        );
      }
    };

    let particleInterval: NodeJS.Timeout;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      particleInterval = setInterval(spawnParticles, 200);

      if (enableTilt) {
        gsap.to(element, { rotateX: 0, rotateY: 0, scale: 1.02, duration: 0.3, ease: 'power2.out' });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearInterval(particleInterval);
      if (enableTilt) gsap.to(element, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.3 });
      if (enableMagnetism) gsap.to(element, { x: 0, y: 0, duration: 0.3 });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      if (enableTilt) {
        gsap.to(element, {
          rotateX: ((y - cy) / cy) * -5,
          rotateY: ((x - cx) / cx) * 5,
          duration: 0.1
        });
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: (x - cx) * 0.05,
          y: (y - cy) * 0.05,
          duration: 0.3
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return;
      const rect = element.getBoundingClientRect();
      const ripple = document.createElement('div');
      const size = Math.max(rect.width, rect.height) * 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.3) 0%, transparent 70%);
        left: ${e.clientX - rect.left - size/2}px;
        top: ${e.clientY - rect.top - size/2}px;
        pointer-events: none;
        z-index: 50;
      `;
      
      element.appendChild(ripple);
      gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.6, onComplete: () => ripple.remove() });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('click', handleClick);

    return () => {
      clearInterval(particleInterval);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('click', handleClick);
    };
  }, [disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

  return (
    <div ref={cardRef} className={className} style={{ position: 'relative', overflow: 'hidden' } as React.CSSProperties}>
      {children}
    </div>
  );
};

// --- Main Page Component ---

const EventsBento = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();
  
  // Data for the two events
  const events: EventSectionProps[] = [
    {
      id: "bytehunt",
      title: "The Logic Trial",
      registerLink: "https://unstop.com/o/NXHPdIn?lb=yMLi2eXX",
      items: [
        { label: "Phase 1", title: "Aptitude", description: "MCQ Screening" },
        { label: "Phase 2", title: "Puzzle Chain", description: "PDF-based cryptographic hunt" },
        // Main Card (Will Span 2 cols)
        { label: "Main Event", title: "BYTEHUNT", description: "Technical Quiz & DSA Challenge", isMain: true },
        { label: "Phase 3", title: "Code Arena", description: "Advanced DSA & Optimization" },
        { label: "Rewards", title: "Exciting Prizes", description: "Certificates & Cash Pool" },
        // Footer Card (Will Span 2 cols)
        { label: "Format", title: "Hybrid", description: "Online Qualifier + Offline Finale" }
      ]
    },
    {
      id: "atheria",
      title: "The Strategy Trial",
      registerLink: "https://unstop.com/p/realm-of-atheria-marathwada-mitra-mandals-college-of-engineering-mmcoe-pune-1623013",
      items: [
        { label: "Concept", title: "Phygital", description: "Physical Board + Digital App" },
        { label: "Team", title: "Squad Based", description: "Teams of 4 compete for dominance" },
        // Main Card (Will Span 2 cols)
        { label: "Main Event", title: "Realm of Atheria", description: "Strategic Board Game Challenge", isMain: true },
        { label: "Gameplay", title: "Tactical", description: "Resource management & attacks" },
        { label: "Objective", title: "Conquer", description: "Capture zones via logical tasks" },
        // Footer Card (Will Span 2 cols)
        { label: "Date", title: "March 15th", description: "Live at the Main Auditorium" }
      ]
    }
  ];

  return (
    <>
      <style jsx global>{`
        :root {
          --glow-color: ${DEFAULT_GLOW_COLOR};
        }
        
        .bento-grid {
          display: grid;
          grid-template-columns: 1fr; /* Mobile Default */
          gap: 1rem;
          width: 100%;
          margin: 0 auto;
        }

        /* Refined Grid for Side-by-Side Layout 
          Instead of 4 columns, we use 2 columns per event on large screens.
        */
        @media (min-width: 640px) {
          .bento-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 180px;
          }

          /* The 3rd item (Main Event) spans full width and 2 rows height */
          .bento-grid > .card:nth-child(3) {
            grid-column: span 2;
            grid-row: span 2;
          }

          /* The 6th item (Last one) spans full width to footer the grid */
          .bento-grid > .card:nth-child(6) {
            grid-column: span 2;
          }
        }

        .card {
          background-color: #0c0a09; /* Stone-950 */
          border: 1px solid #44403c; /* Stone-700 */
          border-radius: 1.25rem;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.3s ease;
          position: relative;
        }

        .card--main {
           background: radial-gradient(circle at center, #1c1917 0%, #0c0a09 100%);
           border-color: #78350f; /* Amber-900 */
        }

        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
          border-color: rgba(251, 191, 36, 0.5); /* Amber-400 */
        }

        /* Inner Glow Effect */
        .card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 2px;
          background: radial-gradient(
            var(--glow-radius) circle at var(--glow-x) var(--glow-y),
            rgba(var(--glow-color), calc(var(--glow-intensity) * 0.5)) 0%,
            transparent 50%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          opacity: 1;
        }

        .text-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <div ref={containerRef} className={`${cinzel.className} min-h-screen bg-stone-950 text-stone-200 py-24 px-4 overflow-hidden`}>
        <GlobalSpotlight containerRef={containerRef} disableAnimations={isMobile} />

        {/* Global Heading */}
        <div className="text-center mb-16">
           <h1 className="text-5xl md:text-6xl font-bold text-amber-100 tracking-wider mb-6 drop-shadow-2xl">
              The Grand Trials
           </h1>
           <p className="text-stone-400 text-lg max-w-2xl mx-auto font-sans">
             Two paths lie before you. Choose your trial and prove your worth in the arena of Logic or Strategy.
           </p>
        </div>

        {/* SIDE-BY-SIDE CONTAINER 
          On XL screens, this becomes 2 columns.
        */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 max-w-[1600px] mx-auto items-start">
          
          {events.map((event) => (
            <div key={event.id} className="relative z-10 flex flex-col h-full">
              {/* Event Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-amber-100 tracking-wider mb-2 drop-shadow-lg">
                  {event.title}
                </h2>
                <div className="w-16 h-0.5 bg-amber-500/50 mx-auto"></div>
              </div>

              {/* Bento Grid */}
              <div className="bento-grid">
                {event.items.map((item, idx) => (
                  <ParticleCard
                    key={idx}
                    className={`card ${item.isMain ? 'card--main' : ''}`}
                    enableTilt={!isMobile}
                    enableMagnetism={!isMobile}
                    clickEffect={true}
                    particleCount={item.isMain ? 20 : 8}
                    glowColor={DEFAULT_GLOW_COLOR}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-amber-500/80 border border-amber-900/50 px-2 py-0.5 rounded">
                        {item.label}
                      </span>
                      {item.isMain && <span className="text-2xl">🏆</span>}
                    </div>

                    <div className="mt-auto">
                      <h3 className={`font-bold text-amber-50 ${item.isMain ? 'text-2xl md:text-3xl mb-2' : 'text-lg mb-1'}`}>
                        {item.title}
                      </h3>
                      <p className={`text-stone-400 font-sans ${item.isMain ? 'text-base' : 'text-xs text-clamp-2'}`}>
                        {item.description}
                      </p>
                    </div>
                  </ParticleCard>
                ))}
              </div>

              {/* Register Button (Sticks to bottom of column) */}
              <div className="mt-8 text-center pt-4">
                <a 
                  href={event.registerLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block relative group"
                >
                  <div className="absolute inset-0 bg-amber-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <button className="relative px-8 py-3 bg-stone-900 border border-amber-500/50 text-amber-100 font-bold tracking-widest uppercase hover:bg-amber-900/30 transition-all duration-300 transform hover:scale-105">
                    Register for {event.id === 'bytehunt' ? 'Logic' : 'Strategy'}
                  </button>
                </a>
              </div>
            </div>
          ))}
        
        </div>
      </div>
    </>
  );
};

export default EventsBento;