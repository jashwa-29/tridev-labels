
"use client";
import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from '../layout/Preloader';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const textRef = useRef(null);
  const videoRef = useRef(null);
  
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  // Preloader completion handler
  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
    // Trigger entrance animations here if not already automated
  }, []);

  useEffect(() => {
    // Robust video loading check
    if (videoRef.current) {
      if (videoRef.current.readyState >= 3) {
        setIsVideoLoaded(true);
      }
    }
    
    // Safety timeout to ensure video shows eventually
    const timer = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 1000); // Reduced from 2500ms

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Sophisticated Parallax
      gsap.to(bgRef.current, {
        yPercent: 15, // Slower, more subtle movement
        scale: 1.1,   // Slight "Ken Burns" continued scaling
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Text Parallax (slightly faster than BG for depth)
      gsap.to(textRef.current, {
        yPercent: -20,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Entrance
      const tl = gsap.timeline();
      tl.from(bgRef.current, { scale: 1.2, duration: 2.5, ease: "power2.out" })
        .from(".hero-line", {
          y: 30,
          opacity: 0,
          duration: 1.5,
          stagger: 0.2,
          ease: "power3.out"
        }, "-=2");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#050505]">
      
      {/* High-End Cinematic Preloader */}
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Background Layer */}
      {/* Background Video Layer */}
      <div ref={bgRef} className="absolute inset-0 z-0 h-[120%] -top-[10%] w-full">
        {/* Optimized Poster Image */}
        <Image
          src="/hero-bg-bright.png"
          alt="Tridev Labels Background"
          fill
          priority
          className={`object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-0' : 'opacity-100'}`}
        />

        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline
          preload="auto"
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover contrast-[1.1] saturate-[0.8] z-0 pointer-events-none transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src="/herosectionbgvideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dimming Overlay (Replaces opacity on elements) */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
      </div>

      {/* Main Content - Centered & Clean */}
      <div ref={textRef} className="relative z-10 text-center max-w-5xl px-6">
        
        <div className="hero-line mb-6 flex justify-center">
          <span className="px-4 py-1.5 border border-[#E32219]/60 rounded-full text-[9px] md:text-[10px] font-medium uppercase tracking-[0.25em] text-white bg-[#E32219]/20 backdrop-blur-sm">
            Est. 2024 • Excellence in Print
          </span>
        </div>

        <h1 className="hero-line text-4xl md:text-5xl lg:text-8xl font-medium tracking-tighter text-white mb-6 leading-none">
          Precision Labeling <br />
          <span className="text-[#E32219] font-light">Defined.</span>
        </h1>

        <p className="hero-line text-lg md:text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed mb-10">
          We partner with brands to create exceptional packaging solutions through sustainable innovation and uncompromising quality.
        </p>

        <div className="hero-line flex flex-col md:flex-row items-center justify-center gap-6">
          <Link 
            href="/about"
            className="px-10 py-4 bg-[#E32219] text-white hover:bg-white hover:text-[#E32219] transition-colors duration-300 rounded-sm font-medium uppercase tracking-[0.2em] text-xs shadow-[0_0_20px_rgba(227,34,25,0.4)] hover:shadow-none"
          >
            Discover More
          </Link>
          <Link 
            href="/contact"
            className="px-10 py-4 border border-[#E32219]/50 text-white hover:bg-[#E32219] hover:text-white transition-colors duration-300 rounded-sm font-medium uppercase tracking-[0.2em] text-xs"
          >
            Get in Touch
          </Link>
        </div>

      </div>

      {/* Elegant Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-50">
         <div className="w-px h-12 bg-white/50"></div>
         <span className="text-[9px] uppercase tracking-[0.3em] text-white">Scroll</span>
      </div>

    </div>
  );
}
