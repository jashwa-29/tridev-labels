"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Layers, Box, Cpu, CheckCircle2 } from 'lucide-react';
import QuoteModal from '@/components/common/QuoteModal';
import FooterSection from '@/components/layout/FooterSection';
import PageHeader from '@/components/common/PageHeader';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);


export default function ServiceContent({ service }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef(null);

  // Entrance Animations
  useEffect(() => {
    if (!service) return;

    const ctx = gsap.context(() => {
      // Robust Entrance Sequence
      const animations = [
        { selector: ".overview-item", trigger: "#dna" },
        { selector: ".feature-card", trigger: ".features-grid" },
        { selector: ".spec-row", trigger: ".specs-table" },
        { selector: ".cta-reveal", trigger: ".cta-section" }
      ];

      animations.forEach(anim => {
        gsap.fromTo(anim.selector, 
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: anim.trigger,
              start: "top 85%",
              toggleActions: "play none none none"
            },
            clearProps: "all"
          }
        );
      });

      // Special animation for mosaic images (matching AboutUs)
      gsap.fromTo(".parallax-img",
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: "#dna",
            start: "top 80%"
          },
          clearProps: "all"
        }
      );

      // Trust Section Stagger
      gsap.fromTo(".trust-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".trust-section",
            start: "top 85%"
          },
          clearProps: "all"
        }
      );

      ScrollTrigger.refresh();
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

      {/* 1. Standardized Hero Header */}
      <PageHeader 
        title={service.title}
        subtitle={service.subtitle}
        breadcrumb="Services"
        description={service.description || service.desc}
      />

      {/* 2. Institutional Overview - Premium Multi-Layered Design */}
      <section id="dna" className="py-24 md:py-40 bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E32219]/5 rounded-full blur-[120px] -mr-64 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gray-900/5 rounded-full blur-[100px] -ml-48 -mb-24"></div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left: Enhanced Narrative Content */}
            <div className="lg:col-span-5 space-y-10 overview-item" style={{ opacity: 0 }}>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-[3px] bg-gradient-to-r from-[#E32219] to-[#E32219]/40 rounded-full"></div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-gray-400">Trusted Industry Partner</span>
                </div>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 leading-[1.05] tracking-tighter">
                  Engineering{" "}
                  <span className="relative inline-block">
                    <span className="text-[#E32219] font-medium">Excellence.</span>
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-linear-to-r from-[#E32219] to-transparent opacity-30"></div>
                  </span>
                </h2>
              </div>
              
              <p className="text-gray-600 text-xl md:text-2xl font-light leading-relaxed">
                {service.description || service.desc}
              </p>

              {/* Enhanced Statistics Cards */}
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="group relative bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-[#E32219]/20 transition-all duration-500">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#E32219]/5 rounded-full blur-2xl group-hover:bg-[#E32219]/10 transition-all duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-5xl font-light text-gray-900 tracking-tighter mb-2 group-hover:text-[#E32219] transition-colors duration-300">100%</div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-3">Quality Assurance</div>
                    <div className="w-full h-1 bg-linear-to-r from-[#E32219] to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
                
                <div className="group relative bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-[#E32219]/20 transition-all duration-500">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gray-900/5 rounded-full blur-2xl group-hover:bg-gray-900/10 transition-all duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-3xl font-light text-gray-900 tracking-tighter mb-2 group-hover:text-[#E32219] transition-colors duration-300">ISO Certified</div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-3">9001:2015 Standards</div>
                    <div className="w-full h-1 bg-linear-to-r from-[#E32219] to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              </div>

              {/* Additional Trust Indicators */}
              <div className="flex flex-wrap gap-4 pt-2">
                {[
                  { label: "Years Experience", value: "25+" },
                  { label: "Global Clients", value: "500+" },
                  { label: "Products Delivered", value: "10M+" }
                ].map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-3 px-5 py-3 bg-gray-50 rounded-full border border-gray-100 hover:border-[#E32219]/30 hover:bg-white transition-all duration-300 group">
                    <div className="w-2 h-2 rounded-full bg-[#E32219] shadow-[0_0_8px_rgba(227,34,25,0.4)] group-hover:shadow-[0_0_12px_rgba(227,34,25,0.6)] transition-all duration-300"></div>
                    <span className="text-sm font-bold text-gray-900">{stat.value}</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Premium Image Mosaic with Overlapping Elements */}
            <div className="lg:col-span-7 relative overview-item" style={{ opacity: 0 }}>
              <div className="relative h-[600px] md:h-[700px]">
                
                {/* Main Hero Image - Larger, Offset */}
                <div className="absolute top-0 right-0 w-[75%] h-[70%] rounded-[40px] overflow-hidden shadow-2xl z-20 group">
                  <Image 
                    src={service.heroImage || service.image || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"} 
                    alt={service.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-br from-transparent via-transparent to-black/30"></div>
                  
                  {/* Floating Badge on Image */}
                  <div className="absolute top-8 right-8 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-gray-100">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-6 h-6 text-[#E32219]" />
                      <div>
                        <div className="text-xs font-bold text-gray-900">ISO Certified</div>
                        <div className="text-[9px] text-gray-500 uppercase tracking-wider">Quality Assured</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Secondary Image - Bottom Left */}
                <div className="absolute bottom-0 left-0 w-[55%] h-[45%] rounded-[40px] overflow-hidden shadow-2xl z-10 group border-4 border-white">
                  <Image 
                    src={service.subProducts?.[0]?.image || "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80"} 
                    alt="Manufacturing Process"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 30vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
                </div>

                {/* Accent Image - Small, Top Left */}
                <div className="absolute top-[15%] left-[5%] w-[35%] h-[30%] rounded-3xl overflow-hidden shadow-xl z-30 group border-4 border-white">
                  <Image 
                    src={service.subProducts?.[1]?.image || "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80"} 
                    alt="Quality Control"
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-br from-[#E32219]/20 to-transparent"></div>
                </div>

                {/* Glassmorphic Stats Card - Floating */}
                <div className="absolute bottom-[25%] right-[5%] bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-gray-100 z-40 hover:scale-105 transition-transform duration-500">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#E32219] to-[#E32219]/70 flex items-center justify-center shadow-lg">
                      <Cpu className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900 tracking-tight">Zero Defect</div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Manufacturing</div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-[40%] left-[40%] w-3 h-3 rounded-full bg-[#E32219] shadow-[0_0_20px_rgba(227,34,25,0.5)] z-50 animate-pulse"></div>
                <div className="absolute bottom-[60%] right-[20%] w-2 h-2 rounded-full bg-gray-900 shadow-[0_0_15px_rgba(0,0,0,0.3)] z-50 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 3. Sub-Products Portfolio - Comprehensive Showcase */}
      <section className="py-20 md:py-32 bg-gray-50 relative overflow-hidden">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
             style={{
               backgroundImage: `linear-gradient(45deg, #000 1px, transparent 1px),
                                 linear-gradient(-45deg, #000 1px, transparent 1px)`,
               backgroundSize: '40px 40px'
             }} 
        />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-5xl mx-auto mb-16 md:mb-20">
            <div className="flex items-center justify-center mb-8 md:mb-10">
              <div className="h-px w-12 md:w-16 bg-linear-to-r from-transparent via-gray-300 to-transparent"></div>
              <div className="mx-4 md:mx-5 text-[10px] md:text-xs font-medium uppercase tracking-[0.3em] md:tracking-[0.4em] text-gray-500 whitespace-nowrap">
                Our Product Range
              </div>
              <div className="h-px w-12 md:w-16 bg-linear-to-l from-transparent via-gray-300 to-transparent"></div>
            </div>

            <div className="relative mb-8 md:mb-10 flex flex-col items-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 tracking-tight leading-tight md:leading-[0.95] text-center">
                <span className="font-normal block md:inline">Complete</span>
                <span className="font-normal relative block md:inline mt-2 md:mt-0">
                  <span className="text-[#E32219] md:ml-4">Solutions Portfolio</span>
                  <span className="absolute -bottom-2 left-1/4 right-1/4 md:left-0 md:right-0 h-px bg-linear-to-r from-transparent via-[#E32219]/50 to-transparent"></span>
                </span>
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <p className="text-base md:text-lg text-gray-600 leading-relaxed font-light tracking-wide px-4">
                Discover our comprehensive range of {service.title.toLowerCase()} designed to meet diverse industrial requirements with precision engineering and uncompromising quality standards.
              </p>
            </div>
          </div>

          {/* Detailed Product Cards */}
          <div className="space-y-12 md:space-y-16 features-grid max-w-7xl mx-auto">
            {(service.subProducts || service.features).map((item, i) => (
              <div 
                key={i} 
                className={`feature-card group grid grid-cols-1 ${i % 2 === 0 ? 'lg:grid-cols-5' : 'lg:grid-cols-5'} gap-8 lg:gap-12 items-center bg-white rounded-[40px] p-8 md:p-12 shadow-lg hover:shadow-2xl transition-all duration-700 border border-gray-100`}
                style={{ opacity: 0 }}
              >
                {/* Image Section */}
                <div className={`${i % 2 === 0 ? 'lg:col-span-2' : 'lg:col-span-2 lg:order-2'} relative`}>
                  <div className="aspect-4/3 rounded-3xl overflow-hidden shadow-xl relative">
                    <Image 
                      src={item.image || service.heroImage || "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80"} 
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 30vw"
                      className="object-cover grayscale brightness-90 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                    
                    {/* Image Badge */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white/95 backdrop-blur-sm flex items-center justify-center text-[#E32219] group-hover:bg-[#E32219] group-hover:text-white transition-all duration-500 shadow-lg">
                          {i % 3 === 0 ? <ShieldCheck size={22} /> : i % 3 === 1 ? <Layers size={22} /> : <Box size={22} />}
                        </div>
                        <div className="flex-1">
                          <div className="h-1 rounded-full bg-[#E32219] transition-all duration-500" style={{ width: '60px' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className={`${i % 2 === 0 ? 'lg:col-span-3' : 'lg:col-span-3 lg:order-1'} space-y-6`}>
                  {/* Product Number & Title */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold uppercase tracking-widest text-[#E32219]">
                        Product {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="h-px flex-1 bg-linear-to-r from-[#E32219]/30 to-transparent"></div>
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 tracking-tight leading-tight">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 font-light leading-relaxed text-lg">
                    {item.desc}
                  </p>

                  {/* Applications */}
                  <div className="pt-2">
                    <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Ideal Applications</div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Manufacturing',
                        'Logistics',
                        'Retail',
                        'Healthcare',
                        'Food & Beverage'
                      ].map((app, idx) => (
                        <span 
                          key={idx}
                          className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-xs font-medium text-gray-700 hover:border-[#E32219] hover:text-[#E32219] transition-colors duration-300"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>



        </div>
      </section>


      {/* 4. Technical Specifications - Immersive Background Section */}
      <section className="relative py-24 md:py-40 overflow-hidden">
        {/* Full-bleed Background Image with Parallax */}
        <div className="absolute inset-0 z-0 scale-110">
          <Image 
            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80" 
            alt="Technical Background"
            fill
            sizes="100vw"
            className="object-cover opacity-10 grayscale"
          />
          <div className="absolute inset-0 bg-white/90"></div>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            <div className="lg:col-span-12 mb-12">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-px bg-[#E32219]"></div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Technical Datasheet</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-light text-gray-900 tracking-tighter">
                  Performance <span className="text-[#E32219] font-medium">Specs.</span>
                </h3>
            </div>

            <div className="lg:col-span-8 specs-table">
              <div className="bg-white/50 backdrop-blur-md rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                {service.specs.map((spec, i) => (
                  <div key={i} className="spec-row flex justify-between items-center py-8 border-b border-gray-100 last:border-0 hover:bg-white/80 px-8 transition-all duration-500">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">{spec.label}</span>
                    <span className="text-xl md:text-2xl font-light text-gray-900 tracking-tight">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 sticky top-32">
              <div className="bg-[#050505] p-12 rounded-[40px] text-white space-y-10 shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-[#E32219]/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[#E32219]/20 transition-all duration-700"></div>
                 
                 <h4 className="text-xl font-bold uppercase tracking-widest text-[#E32219] relative z-10">Key Applications</h4>
                 <div className="space-y-5 relative z-10">
                   {service.applications.map((app, i) => (
                     <div key={i} className="flex items-center gap-5 text-gray-300 font-light hover:text-white transition-colors cursor-default">
                        <div className="w-2 h-2 rounded-full bg-[#E32219] shadow-[0_0_8px_#E32219]"></div>
                        <span className="text-lg tracking-tight">{app}</span>
                     </div>
                   ))}
                 </div>
                 <div className="pt-8 border-t border-white/10 relative z-10">
                    <p className="text-sm text-gray-400 leading-relaxed font-light italic">
                      "At Trridev Labels, our technical specifications are not just numbers—they are a commitment to zero-defect manufacturing."
                    </p>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* NEW: 4.5 Quality Standards - Immersive Parallax Section */}
      <section 
        className="relative py-32 md:py-40 trust-section overflow-hidden"
        style={{
          backgroundImage: 'url("https://peppy-moonbeam-9fe49c.netlify.app/images/background-img-1.jpeg")',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Dark Overlay with Blur */}
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm z-0"></div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#E32219]"></div>
              <span className="text-sm font-medium uppercase tracking-[0.3em] text-gray-300">
                Manufacturing Excellence
              </span>
              <div className="h-px w-8 bg-[#E32219]"></div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tighter">
              Quality <span className="font-medium text-[#E32219]">Standards.</span>
            </h2>
            <p className="text-gray-300 font-light text-lg leading-relaxed">
              We adhere to global certifications and rigorous internal audits to ensure every label that leaves our facility meets international safety and durability benchmarks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "ISO 9001:2015", 
                desc: "Certified Quality Management System ensuring consistent high-grade output.",
                icon: <ShieldCheck className="w-10 h-10" />
              },
              { 
                title: "Zero-Defect Policy", 
                desc: "Vision-inspected printing lines for 100% accuracy in serialization and data.",
                icon: <Cpu className="w-10 h-10" />
              },
              { 
                title: "Global Compliance", 
                desc: "Materials compliant with FDA, UL, and RoHS environmental standards.",
                icon: <Layers className="w-10 h-10" />
              }
            ].map((trust, idx) => (
              <div key={idx} className="trust-item bg-white/10 backdrop-blur-md p-10 rounded-[40px] border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-500 group">
                <div className="w-16 h-16 rounded-2xl bg-[#E32219]/20 text-[#E32219] flex items-center justify-center mb-8 group-hover:bg-[#E32219] group-hover:text-white transition-all duration-300">
                  {trust.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-4">{trust.title}</h4>
                <p className="text-gray-300 font-light leading-relaxed">{trust.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 5. Clean Conversion Hub */}
      <section className="py-20 md:py-32 bg-gray-50 flex justify-center items-center cta-section">
        <div className="container mx-auto px-6 text-center max-w-4xl space-y-10 cta-reveal" style={{ opacity: 0 }}>
          <div className="inline-flex items-center gap-3">
             <span className="w-12 h-px bg-[#E32219]"></span>
             <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-400">Initiate Partnership</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-light text-gray-900 tracking-tighter leading-tight">
            Ready to <span className="font-medium text-[#E32219]">Transform</span> Your <br className="hidden md:block" /> Product Packaging?
          </h2>

          <p className="text-gray-500 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Partner with Trridev Labels for high-precision labeling solutions. From initial design to global industrial delivery, we have you covered with ISO-certified excellence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="relative px-10 sm:px-12 py-5 bg-gray-900 text-white text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] rounded-sm group overflow-hidden shadow-xl transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-4">
                Get Technical Quote
                <svg className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </span>
              <div className="absolute inset-0 bg-[#E32219] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <Link 
              href="/contact"
               className="relative px-10 sm:px-12 py-5 border border-gray-300 text-gray-900 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] rounded-sm group overflow-hidden transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-4 group-hover:text-white transition-colors duration-300">
                Consult Engineering
                <svg className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </span>
              <div className="absolute inset-0 bg-[#E32219] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
