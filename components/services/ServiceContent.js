"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Factory, ShieldCheck, ArrowRight, Layers, Box, Cpu } from 'lucide-react';
import QuoteModal from '@/components/common/QuoteModal';
import FooterSection from '@/components/layout/FooterSection';

gsap.registerPlugin(ScrollTrigger);

const icons = {
  Factory, ShieldCheck, Layers, Box, Cpu, CheckCircle2
};

export default function ServiceContent({ service }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  // Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Text Reveal
      gsap.from(".hero-anim", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2
      });

      // Hero Background Parallax
      if (heroRef.current) {
        gsap.to(heroRef.current, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      }

      // Overview Entrance
      gsap.from(".overview-item", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#overview",
          start: "top 75%"
        }
      });

      // Feature Slabs
      gsap.from(".feature-card", {
        y: 40,
        scale: 0.95,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 80%"
        }
      });

      // Specs & Applications
      gsap.from(".spec-row", {
        x: -40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".specs-table",
          start: "top 80%"
        }
      });

      gsap.from(".utility-module", {
         y: 60,
         opacity: 0,
         duration: 1.5,
         ease: "expo.out",
         scrollTrigger: {
            trigger: ".utility-module",
            start: "top 85%"
         }
      });

    }, containerRef);
    return () => ctx.revert();
  }, [service]);

  if (!service) return null;

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      <QuoteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        serviceTitle={service.title}
      />

      {/* 1. Hero Section - Stunning & Immersive */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-black">
         {/* Background Image with Parallax */}
         <div className="absolute inset-0 opacity-60">
            <img 
               ref={heroRef}
               src={service.heroImage || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"} 
               alt={service.title} 
               className="w-full h-full object-cover"
            />
         </div>
         <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/20 to-black/90"></div>
         
         {/* Content */}
         <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl">
            <Link href="/" className="hero-anim inline-flex items-center gap-2 text-white/60 hover:text-white uppercase tracking-[0.2em] text-[10px] font-bold mb-8 transition-colors">
               <ArrowLeft className="w-3 h-3" /> Back to Home
            </Link>
            <h1 className="hero-anim text-5xl md:text-7xl lg:text-8xl font-light text-white mb-6 leading-[0.95] tracking-tighter">
               {service.title.split(' ').map((word, i) => (
                  <span key={i} className={i === 1 ? "font-serif italic pr-2 text-[#E32219]" : ""}>{word} </span>
               ))}
            </h1>
            <p className="hero-anim text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed mb-10">
               {service.subtitle}
            </p>
            <div className="hero-anim flex flex-col md:flex-row items-center justify-center gap-4">
               <button 
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 py-4 bg-[#E32219] hover:bg-white hover:text-black text-white rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_0_20px_rgba(227,34,25,0.3)] hover:shadow-xl"
               >
                  Get a Quote
               </button>
               <button 
                  onClick={() => {
                     document.getElementById('overview').scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4 bg-white/10 hover:bg-white text-white hover:text-black backdrop-blur-md border border-white/20 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300"
               >
                  Explore Features
               </button>
            </div>
         </div>
      </section>


      {/* 2. Overview Section - Architectural Layout */}
      <section id="overview" className="py-24 md:py-32 bg-white relative overflow-hidden">
         {/* Subtle Background Pattern */}
         <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
              style={{
                backgroundImage: `linear-gradient(45deg, #000 1px, transparent 1px),
                                 linear-gradient(-45deg, #000 1px, transparent 1px)`,
                backgroundSize: '80px 80px'
              }} 
         />

         <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
               
               {/* Left: Magazine Typography */}
               <div className="w-full lg:w-[45%] space-y-10">
                  <div className="space-y-6 overview-item">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-px bg-[#E32219]"></div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-400">Technical Brief // 01</span>
                     </div>
                     
                     <h2 className="text-4xl md:text-5xl lg:text-7xl font-light text-gray-900 leading-[0.9] tracking-tighter">
                        Solution <br/>
                        <span className="font-medium text-[#E32219]">Mastery.</span>
                     </h2>
                  </div>

                  <div className="relative overview-item">
                     <div className="absolute -left-8 top-0 bottom-0 w-1 bg-gray-50"></div>
                     <p className="text-xl text-gray-800 font-light leading-relaxed pl-4">
                        {service.description}
                     </p>
                  </div>

                  <div className="flex items-center gap-12 pt-6 overview-item">
                     <div>
                        <div className="text-3xl font-bold text-gray-900 leading-none">0.05mm</div>
                        <div className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-2">Precision Tolerance</div>
                     </div>
                     <div className="w-px h-10 bg-gray-100"></div>
                     <div>
                        <div className="text-3xl font-bold text-gray-900 leading-none">24/7</div>
                        <div className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-2">Production uptime</div>
                     </div>
                  </div>
               </div>

               {/* Right: Immersive Image Stage */}
               <div className="w-full lg:w-[55%] relative">
                  <div className="relative aspect-16/10 rounded-[32px] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] group border-12 border-white">
                     <img 
                        src={service.heroImage} 
                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
                        alt="Production precision" 
                     />
                     <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
                  </div>
                  
                  {/* Floating Identity Badge */}
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#E32219] rounded-full hidden md:flex flex-col items-center justify-center text-white p-6 shadow-2xl shadow-[#E32219]/30 transform rotate-12">
                     <div className="text-[10px] font-bold uppercase tracking-widest mb-1">Grade-A</div>
                     <div className="text-2xl font-black tracking-tighter line-clamp-1 italic">PREMIUM</div>
                     <div className="text-[9px] font-bold uppercase tracking-widest mt-1 opacity-60">Certified</div>
                  </div>
               </div>
            </div>
         </div>
      </section>


      {/* 3. Key Features - Industrial Tactical Slabs */}
      <section className="py-24 bg-[#050505] relative overflow-hidden">
         {/* Kinetic Grid Overlay */}
         <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }} 
         />

         <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
               <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-6">
                     <div className="w-2 h-2 rounded-full bg-[#E32219] shadow-[0_0_10px_#E32219]"></div>
                     <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-500">Feature Matrix // 02</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight tracking-tighter">
                     Core <span className="font-medium text-[#E32219]">Capabilities.</span>
                  </h2>
               </div>
               <div className="hidden lg:block h-px flex-1 bg-white/10 mx-12"></div>
               <div className="text-right">
                  <span className="text-white/20 font-black text-6xl tracking-tighter">TRD-LVL</span>
               </div>
            </div>

            <div className="features-grid grid grid-cols-1 md:grid-cols-3 gap-1">
               {service.features.map((feature, i) => (
                  <div key={i} className="feature-card group relative bg-white/5 hover:bg-white/10 p-12 transition-all duration-500 border border-white/10 first:rounded-l-[40px] last:rounded-r-[40px]">
                     {/* Background Number */}
                     <div className="absolute top-10 right-10 text-8xl font-black text-white/10 select-none pointer-events-none group-hover:text-[#E32219]/20 transition-colors">
                        0{i + 1}
                     </div>

                     <div className="relative z-10 space-y-8">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-[#E32219] flex items-center justify-center group-hover:bg-[#E32219] group-hover:text-white transition-all duration-500 transform group-hover:-rotate-12">
                           {i === 0 ? <ShieldCheck size={28} /> : i === 1 ? <Layers size={28} /> : <CheckCircle2 size={28} />}
                        </div>
                        
                        <div className="space-y-4">
                           <h3 className="text-2xl font-bold text-white tracking-tight">{feature.title}</h3>
                           <p className="text-gray-400 font-light leading-relaxed text-base">
                              {feature.desc}
                           </p>
                        </div>

                        <div className="pt-8 flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-[#E32219] opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-500">
                           <span>Operational Excellence</span>
                           <ArrowRight size={14} />
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>


      {/* 4. Technical Specs & Applications - Industrial High-Precision Layout */}
      <section className="py-24 md:py-32 bg-white relative">
         <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
               
               {/* Technical Specs - Precision Slabs */}
               <div className="lg:col-span-7 specs-table space-y-12">
                  <div className="space-y-4">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-px bg-[#E32219]"></div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Technical Datasheet // 03</span>
                     </div>
                     <h3 className="text-3xl md:text-4xl font-light text-gray-900 tracking-tighter">
                        Industrial <span className="font-medium">Specifications.</span>
                     </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                     {service.specs.map((spec, i) => (
                        <div key={i} className="spec-row group flex items-center justify-between p-8 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-white hover:shadow-xl hover:border-[#E32219]/20 transition-all duration-500">
                           <div className="flex items-center gap-6">
                              <div className="w-1 h-8 bg-gray-200 group-hover:bg-[#E32219] transition-colors rounded-full"></div>
                              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 group-hover:text-gray-900 transition-colors">{spec.label}</span>
                           </div>
                           <span className="text-xl md:text-2xl font-light text-gray-900 tracking-tight">{spec.value}</span>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Applications - Technical Utility Module */}
               <div className="lg:col-span-5 utility-module">
                  <div className="sticky top-32">
                     <div className="bg-[#050505] text-white p-12 rounded-[40px] relative overflow-hidden group shadow-2xl">
                        {/* Branded Detail */}
                        <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12">
                           <Layers size={120} />
                        </div>
                        
                        <div className="relative z-10 space-y-10">
                           <div className="space-y-4">
                              <h3 className="text-2xl font-light tracking-tight">Standard Utilization</h3>
                              <div className="w-12 h-px bg-[#E32219]"></div>
                           </div>
                           
                           <div className="grid grid-cols-1 gap-3">
                              {service.applications.map((app, i) => (
                                 <div key={i} className="flex items-center gap-6 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-default group/item">
                                    <div className="w-2 h-2 rounded-full bg-[#E32219] shadow-[0_0_8px_#E32219] opacity-40 group-hover/item:opacity-100 transition-opacity"></div>
                                    <span className="text-sm font-light tracking-wide text-gray-300 group-hover/item:text-white transition-colors">{app}</span>
                                 </div>
                              ))}
                           </div>

                           <div className="pt-6">
                              <button 
                                 onClick={() => setIsModalOpen(true)}
                                 className="w-full py-5 bg-[#E32219] hover:bg-white hover:text-[#050505] text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500 flex items-center justify-center gap-3 group/btn shadow-[0_20px_40px_-10px_rgba(227,34,25,0.4)]"
                              >
                                 Request Technical Consult 
                                 <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                              </button>
                           </div>
                        </div>
                     </div>
                     
                     {/* Capacity Badge */}
                     <div className="mt-8 p-8 border border-gray-100 rounded-[30px] flex items-center gap-6 bg-white shadow-sm">
                        <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-[#E32219]">
                           <ShieldCheck size={24} />
                        </div>
                        <div>
                           <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Compliance</div>
                           <div className="text-sm font-bold text-gray-900 tracking-tight">ISO 9001:2015 Certified Production</div>
                        </div>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </section>

      {/* 5. Pre-Footer CTA - Cinematic Conversion Stage */}
      <section className="py-32 relative overflow-hidden bg-white">
         <div className="container mx-auto px-6 relative z-10">
            <div className="bg-[#050505] rounded-[60px] p-12 md:p-24 relative overflow-hidden shadow-2xl">
               {/* Animated Background Elements */}
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                      backgroundSize: '40px 40px'
                    }} 
               />
               <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-[#E32219]/10 to-transparent"></div>
               
               <div className="relative z-10 max-w-4xl">
                  <div className="inline-flex items-center gap-3 mb-8">
                     <div className="w-2 h-2 rounded-full bg-[#E32219] animate-pulse"></div>
                     <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-500">Next Step // Partnerships</span>
                  </div>

                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-10 leading-[0.95] tracking-tighter">
                     Ready to <span className="font-medium text-[#E32219]">Elevate</span> Your <br/>
                     Physical Identity?
                  </h2>
                  
                  <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl mb-16 leading-relaxed">
                     Partner with Trridev Labels for precision-engineered solutions that combine extreme durability with high-end brand aesthetics.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-8">
                     <button 
                        onClick={() => setIsModalOpen(true)}
                        className="group relative px-12 py-6 bg-[#E32219] text-white rounded-full text-xs font-bold uppercase tracking-[0.3em] overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl shadow-[#E32219]/20"
                     >
                        <span className="relative z-10 flex items-center gap-3">
                           Initiate Project Brief <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                     </button>
                     <Link 
                        href="/contact"
                        className="group flex items-center gap-4 text-white hover:text-[#E32219] text-xs font-bold uppercase tracking-[0.3em] transition-all"
                     >
                        Speak with our Engineering Team <div className="w-10 h-px bg-white/20 group-hover:bg-[#E32219] group-hover:w-16 transition-all"></div>
                     </Link>
                  </div>
               </div>

               {/* Corporate Mark */}
               <div className="absolute -bottom-10 -right-10 text-[12rem] font-black text-white/2 select-none pointer-events-none">
                  TRD
               </div>
            </div>
         </div>
      </section>

   
    </div>
  );
}
