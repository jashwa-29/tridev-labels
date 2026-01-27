"use client";

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WhyChooseSection() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [activeStat, setActiveStat] = useState(0);

  const stats = [
    { value: "16+", label: "Years of Excellence" },
    { value: "3,725+", label: "Satisfied Customers" },
    { value: "2B+", label: "Labels Printed" },
    { value: "1-3", label: "Days Delivery" }
  ];



  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content fade in
      gsap.from(contentRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%"
        }
      });

      // Stats animation
      gsap.from(".stat-item", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stats-container",
          start: "top 80%"
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative py-20 md:py-24  mb-16 md:mb-24 lg:mb-32 xl:mb-40 overflow-hidden"
      style={{
        backgroundImage: 'url("https://peppy-moonbeam-9fe49c.netlify.app/images/background-img-1.jpeg")',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 z-0 bg-black/70"></div>

      <div ref={contentRef} className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Elegant Header */}
        <div className="max-w-4xl mx-auto mb-12 md:mb-16 text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#E32219]"></div>
            <span className="text-sm font-medium uppercase tracking-[0.3em] text-gray-300">
              Why Choose Trridev Labelss
            </span>
            <div className="h-px w-8 bg-[#E32219]"></div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-8 leading-tight">
            Excellence in <span className="font-medium text-[#E32219]">Every Label</span>
          </h1>
          
          {/* Why Choose Us Paragraph */}
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-lg text-gray-200 font-light leading-relaxed mb-6">
              Our thousands of customers keep choosing Trridev Labelss for our commitment 
              to reliability and engineering precision. We combine 16+ years of heritage with 
              modern tech to create the perfect label for any occasion.
            </p>
          </div>
        </div>



        {/* Stats Row */}
        <div className="stats-container max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="stat-item group cursor-pointer"
                onMouseEnter={() => setActiveStat(index)}
              >
                <div className={`bg-white/5 backdrop-blur-md rounded-xl p-6 md:p-8 border transition-all duration-300 ${
                  activeStat === index 
                    ? 'border-[#E32219]/70 shadow-lg shadow-[#E32219]/20 bg-white/10' 
                    : 'border-white/10 hover:border-white/20'
                }`}>
                  <div className={`text-4xl md:text-5xl font-light mb-2 transition-all duration-300 ${
                    activeStat === index ? 'text-[#E32219]' : 'text-white'
                  }`}>
                    {stat.value}
                  </div>
                  <div className={`h-px w-8 mb-3 group-hover:w-12 transition-all duration-300 ${
                    activeStat === index ? 'bg-[#E32219]' : 'bg-white/40'
                  }`}></div>
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}