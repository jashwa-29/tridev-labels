"use client";

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const solutions = [
  {
    id: 1,
    title: "Thermal Transfer Labels",
    shortTitle: "Premium",
    description: "High-end labels with metallic foils, embossing, and specialty materials for luxury brands that demand attention on the shelf.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    accentColor: "#E32219",
    image: "https://i.pinimg.com/1200x/28/69/48/286948c062ac9bd2c97422fef9fa527c.jpg"
  },
  {
    id: 2,
    title: "Sustainable Eco-Labels",
    shortTitle: "Eco-Friendly",
    description: "Environmentally friendly labels using recycled materials and biodegradable inks. Perfect for green brands committed to sustainability.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    accentColor: "#10B981",
    image: "https://i.pinimg.com/1200x/3f/5e/3f/3f5e3ff335ab1254d9e39dd3368d8fec.jpg"
  },
  {
    id: 3,
    title: "Automotive & Durable Goods",
    shortTitle: "Smart",
    description: "NFC, QR code, and AR-enabled labels for enhanced customer engagement. Bridge the physical and digital worlds seamlessly.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    accentColor: "#3B82F6",
    image: "https://i.pinimg.com/1200x/df/8a/f8/df8af8112ce715813ecedd5cb17baa33.jpg"
  },
  {
    id: 4,
    title: "Beauty & Home Care",
    shortTitle: "Industrial",
    description: "Labels engineered to withstand extreme conditions, chemicals, and harsh environments. Built to last where others fail.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    accentColor: "#6B7280",
    image: "https://i.pinimg.com/1200x/ff/88/8b/ff888b16d05f34d7596b39805b16c6f7.jpg"
  },
  {
    id: 5,
    title: "General Products Labels",
    shortTitle: "Pharma",
    description: "FDA-compliant labels for the healthcare industry. Ensuring safety, traceability, and clarity for every product.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    ),
    accentColor: "#8B5CF6",
    image: "https://i.pinimg.com/1200x/d3/ae/66/d3ae6675764a3449bab489f244dc18f9.jpg"
  },
  {
    id: 6,
    title: "Food & Beverage Labels",
    shortTitle: "Beverage",
    description: "Specialized labels for bottles, cans, and cartons. Water-resistant and vibrant designs that pop in the cooler.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    ),
    accentColor: "#F59E0B",
    image: "https://i.pinimg.com/1200x/2b/0b/52/2b0b52d5d0e4f15078c5835290e50f6d.jpg"
  },
  {
    id: 7,
    title: "Pharmaceutical Labels",
    shortTitle: "Beverage",
    description: "Specialized labels for bottles, cans, and cartons. Water-resistant and vibrant designs that pop in the cooler.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    ),
    accentColor: "#F59E0B",
    image: "https://i.pinimg.com/1200x/2b/0b/52/2b0b52d5d0e4f15078c5835290e50f6d.jpg"
  },
  {
    id: 8,
    title: "Tamper-evident Labels",
    shortTitle: "Beverage",
    description: "Specialized labels for bottles, cans, and cartons. Water-resistant and vibrant designs that pop in the cooler.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    ),
    accentColor: "#F59E0B",
    image: "https://i.pinimg.com/1200x/2b/0b/52/2b0b52d5d0e4f15078c5835290e50f6d.jpg"
  },
  {
    id: 9,
    title: "Barcode Label Printers",
    shortTitle: "Beverage",
    description: "Specialized labels for bottles, cans, and cartons. Water-resistant and vibrant designs that pop in the cooler.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    ),
    accentColor: "#F59E0B",
    image: "https://i.pinimg.com/1200x/2b/0b/52/2b0b52d5d0e4f15078c5835290e50f6d.jpg"
  },
];

function ReyndersCard({ service, isActive, isAnyActive, onHover }) {
  const flexClass = !isAnyActive 
    ? 'flex-1' 
    : isActive 
      ? 'flex-[2.5] lg:flex-[3]' 
      : 'flex-1';

  return (
    <div 
      onMouseEnter={onHover}
      className={`relative h-[300px] md:h-[450px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group ${isActive ? 'md:flex-[2.5] lg:flex-3' : 'md:flex-1'} ${
        isActive 
          ? 'shadow-2xl z-10' 
          : isAnyActive 
            ? 'grayscale-[10%] hover:grayscale-0' 
            : 'grayscale-0'
      }`}
    >
      <div className={`absolute inset-0 transition-all duration-1000 ease-out transform origin-center ${
         isActive ? 'scale-105 opacity-100' : 'scale-100 opacity-90'
      }`}>
         <img 
           src={service.image} 
           alt={service.title}
           className="w-full h-full object-cover transition-opacity duration-500"
         />
      </div>

      <div className={`absolute inset-0 bg-[#E32219]/75 transition-all duration-500 ${
         isActive ? 'opacity-100' : 'opacity-0'
      }`} />

      <div className="relative h-full w-full p-6 md:p-8 flex flex-col justify-end z-20">
         <div className="transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
            <div className="mb-2 md:mb-4">
               <h3 className={`uppercase tracking-widest font-bold leading-tight mb-2 md:mb-3 transition-all duration-500 ${
                  isActive ? 'text-xl md:text-3xl text-white' : 'text-lg md:text-2xl text-white md:text-black'
               }`}>
                  {service.title}
               </h3>
               
               <div className="h-[4px] md:h-[6px] rounded-full transition-all duration-700 ease-out"
                    style={{ backgroundColor: service.accentColor, width: isActive ? '100px' : '40px' }} 
               />
            </div>

            <div className={`
              grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
              ${isActive ? 'grid-rows-[1fr] opacity-100 mt-2 md:mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'}
            `}>
               <div className="overflow-hidden min-h-0">
                  <p className="text-white/90 text-sm md:text-base leading-relaxed mb-4 md:mb-6 font-medium max-w-lg">
                     {service.description}
                  </p>
                  
                  <button className={`inline-flex items-center gap-2 text-[10px] md:text-xs font-extrabold uppercase tracking-widest border-b-2 pb-1 transition-colors ${
                    isActive ? 'text-white border-white hover:text-white/80 hover:border-white/80' : 'text-gray-900 border-gray-900 hover:text-[#E32219] hover:border-[#E32219]'
                  }`}>
                     Explore Solution
                     <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                  </button>
               </div>
            </div>
         </div>
         
         <div className={`absolute top-4 md:top-6 right-4 md:right-6 p-1.5 md:p-2 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-500 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
            <div className={`text-gray-800 ${isActive ? 'scale-100' : 'scale-50'}`} style={{ color: service.accentColor }}>
               {service.icon}
            </div>
         </div>
      </div>
    </div>
  );
}

export default function SolutionsSection() {
  const [activeRow1, setActiveRow1] = useState(0); 
  const [activeRow2, setActiveRow2] = useState(null);
  const [activeRow3, setActiveRow3] = useState(null);
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
       gsap.from(containerRef.current, {
          y: 50, 
          opacity: 0, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
             trigger: containerRef.current,
             start: "top 80%"
          }
       });
       
       if(headerRef.current) {
         gsap.from(headerRef.current.children, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%"
            }
         });
       }
    });
    return () => ctx.revert();
  }, []);

  const row1 = solutions.slice(0, 3);
  const row2 = solutions.slice(3, 6);
  const row3 = solutions.slice(6, 9);

  return (
    <section id="services" className="relative bg-white overflow-hidden pb-16 md:pb-24 lg:pb-32 xl:pb-40">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{
             backgroundImage: `linear-gradient(45deg, #000 1px, transparent 1px),
                                 linear-gradient(-45deg, #000 1px, transparent 1px)`,
             backgroundSize: '40px 40px'
           }} 
      />

      <div ref={containerRef} className="container mx-auto px-4 md:px-8 relative z-10">
        
        <div ref={headerRef} className="text-center max-w-5xl mx-auto mb-12 md:mb-20">
          <div className="flex items-center justify-center mb-6 md:mb-10">
            <div className="h-px w-10 md:w-16 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <div className="mx-3 md:mx-5 text-[10px] md:text-xs font-medium uppercase tracking-[0.3em] md:tracking-[0.4em] text-gray-500 whitespace-nowrap">
              Tailored Solutions
            </div>
            <div className="h-px w-10 md:w-16 bg-gradient-to-l from-transparent via-gray-300 to-transparent"></div>
          </div>

          <div className="relative mb-6 md:mb-10 flex flex-col items-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-gray-900 tracking-tight leading-tight md:leading-[0.95] text-center">
              <span className="font-normal block md:inline">Precision Label</span>
              <span className="font-normal relative block md:inline mt-2 md:mt-0">
                <span className="text-[#E32219] md:ml-4">Solutions</span>
                <span className="absolute -bottom-2 left-1/4 right-1/4 md:left-0 md:right-0 h-px bg-gradient-to-r from-transparent via-[#E32219]/50 to-transparent"></span>
              </span>
            </h1>
          </div>

          <div className="max-w-2xl mx-auto mt-8 md:mt-12">
            <p className="text-base md:text-lg text-gray-600 leading-relaxed font-light tracking-wide px-4">
              Expertly crafted labels that elevate your brand through innovative 
              design and meticulous attention to detail.
            </p>
          </div>
        </div>

        <div className="space-y-4 md:space-y-4">
           {/* Row 1 */}
           <div 
             className="flex flex-col md:flex-row gap-4 h-auto md:min-h-[450px]"
             onMouseLeave={() => setActiveRow1(null)}
           >
              {row1.map((s, idx) => (
                 <ReyndersCard 
                    key={s.id} 
                    service={s} 
                    isActive={activeRow1 === idx} 
                    isAnyActive={activeRow1 !== null}
                    onHover={() => setActiveRow1(idx)}
                 />
              ))}
           </div>

           {/* Row 2 */}
           <div 
             className="flex flex-col md:flex-row gap-4 h-auto md:min-h-[450px]"
             onMouseLeave={() => setActiveRow2(null)}
           >
              {row2.map((s, idx) => (
                 <ReyndersCard 
                    key={s.id} 
                    service={s} 
                    isActive={activeRow2 === idx} 
                    isAnyActive={activeRow2 !== null}
                    onHover={() => setActiveRow2(idx)}
                 />
              ))}
           </div>

           {/* Row 3 */}
           <div 
             className="flex flex-col md:flex-row gap-4 h-auto md:min-h-[450px]"
             onMouseLeave={() => setActiveRow3(null)}
           >
              {row3.map((s, idx) => (
                 <ReyndersCard 
                    key={s.id} 
                    service={s} 
                    isActive={activeRow3 === idx} 
                    isAnyActive={activeRow3 !== null}
                    onHover={() => setActiveRow3(idx)}
                 />
              ))}
           </div>
        </div>
      </div>
    </section>
  );
}
