"use client";

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    date: "August 2008",
    title: "The Humble Beginning",
    description: "Launched with two fundamental Letter Press machines (Iwasaki Strong Press and Semi Rotary FSK Press)."
  },
  {
    date: "June 2010",
    title: "Capacity Expansion",
    description: "Integrated the Onda 250 Letter Press Printing Machine to meet increasing industrial demand."
  },
  {
    date: "December 2012",
    title: "Integrated Finishing",
    description: "Established our first dedicated Slitting Press Unit within the factory premises."
  },
  {
    date: "June 2014",
    title: "Flexographic Revolution",
    description: "Added the high-capacity Mark Andy 2200 Flexographic Press to significantly boost production volume."
  },
  {
    date: "February 2018",
    title: "Precision Slitting",
    description: "Commissioned a Secondary Slitting Unit to refine our post-press precision and traceability."
  },
  {
    date: "August 2021",
    title: "Next-Gen Automation",
    description: "Acquired a High-Speed Servo Press with Hot Foil and repass printing capabilities."
  },
  {
    date: "January 2023",
    title: "The Future Anchor",
    description: "Completed relocation to a state-of-the-art 20,000 sq ft facility in Nehru Nagar, OMR, Chennai."
  }
];

export default function HistoryTimeline() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline vertical line animation
      gsap.from(".timeline-line", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 2,
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 70%",
          end: "bottom 80%",
          scrub: true
        }
      });

      // Events reveal
      gsap.utils.toArray(".timeline-event").forEach((event, i) => {
        gsap.from(event, {
          x: i % 2 === 0 ? -40 : 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: event,
            start: "top 85%"
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#E32219]"></div>
            <span className="text-xs font-medium uppercase tracking-[0.4em] text-gray-500">
              Our Journey
            </span>
            <div className="h-px w-8 bg-[#E32219]"></div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-light text-gray-900 tracking-tighter">
            A Legacy of <span className="font-medium text-[#E32219]">Innovation</span>
          </h2>
        </div>

        <div className="timeline-container relative max-w-6xl mx-auto px-4">
          
          {/* Vertical Line */}
          <div className="timeline-line absolute left-1/2 top-0 bottom-0 w-px bg-gray-100 hidden md:block" />

          <div className="space-y-24 md:space-y-12">
            {timelineData.map((item, i) => (
              <div 
                key={i} 
                className={`timeline-event relative flex flex-col md:flex-row items-center gap-8 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content Card */}
                <div className={`w-full md:w-1/2 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-[#E32219] uppercase tracking-[0.4em]">
                      {item.date}
                    </span>
                    <h3 className="text-2xl font-medium text-gray-900 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 font-light leading-relaxed max-w-md mx-auto md:ml-auto md:mr-0 inline-block">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Central Point */}
                <div className="absolute left-1/2 -ml-2 w-4 h-4 rounded-full border-2 border-[#E32219] bg-white z-10 hidden md:block" />

                {/* Mirror Placeholder */}
                <div className="hidden md:block w-1/2" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
