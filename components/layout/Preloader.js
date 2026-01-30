"use client";
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const counterRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter Animation
      const tl = gsap.timeline({
        onComplete: () => {
          // Exit Animation - Snappy
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 0.5,
            ease: "circ.inOut",
            onComplete: onComplete
          });
        }
      });

      // Animate counter - Ultra Fast
      tl.to(counterRef.current, {
        innerText: 100,
        duration: 0.6, 
        snap: { innerText: 1 },
        ease: "none",
        onUpdate: function() {
          if (counterRef.current) {
            counterRef.current.innerHTML = Math.round(this.targets()[0].innerText) + "%";
          }
        }
      });

      // Logo Reveal - Synchronized
      tl.fromTo(logoRef.current, 
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }, 
        0
      );

      // Text Reveal
      tl.from(textRef.current, {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=1.5");

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-100 bg-white flex flex-col items-center justify-center text-white"
    >
      <div className="relative flex flex-col items-center gap-6">
        {/* Logo Image */}
        <div ref={logoRef} className="relative w-48 md:w-64 aspect-3/1 flex items-center justify-center">
           <img 
             src="/tridev-logo.png" 
             alt="Tridev Labels Logo" 
             className="w-full h-auto object-contain "
           />
        </div>

        {/* Counter */}
        <div className="absolute -bottom-24 font-mono text-xs md:text-sm text-gray-500 tracking-widest">
           <span ref={counterRef}>0%</span>
        </div>
      </div>
    </div>
  );
}
