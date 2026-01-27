"use client";

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, User, Send } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const blogs = [
  {
    id: 1,
    category: "Industrial",
    title: "The Future of Smart Labels in Pharma Logistics",
    excerpt: "Exploring how NFC and QR-integrated labels are revolutionizing traceability and patient safety in the healthcare supply chain.",
    date: "Jan 18, 2026",
    author: "Aditi Sharma",
    image: "https://i.pinimg.com/1200x/28/69/48/286948c062ac9bd2c97422fef9fa527c.jpg",
    featured: true
  },
  {
    id: 2,
    category: "Sustainability",
    title: "Eco-Friendly Substrates: Beyond Recyclable",
    excerpt: "A deep dive into compostable labeling materials that meet high-durability industrial standards.",
    date: "Jan 12, 2026",
    author: "Rajesh Kumar",
    image: "https://i.pinimg.com/1200x/3f/5e/3f/3f5e3ff335ab1254d9e39dd3368d8fec.jpg",
    featured: false
  },
  {
    id: 3,
    category: "Innovation",
    title: "Finishing Techniques That Elevate Premium Brands",
    excerpt: "How spot UV and holographic foils are changing consumer perception on the retail shelf.",
    date: "Jan 05, 2026",
    author: "Sarah Jenkins",
    image: "https://i.pinimg.com/1200x/ff/88/8b/ff888b16d05f34d7596b39805b16c6f7.jpg",
    featured: false
  },
  {
    id: 4,
    category: "Logistics",
    title: "Cold Chain Labels: Engineered for the Extreme",
    excerpt: "Technical challenges in creating labels that maintain adhesion and legibility below -40°C.",
    date: "Dec 28, 2025",
    author: "Vikram Mehta",
    image: "https://i.pinimg.com/1200x/2b/0b/52/2b0b52d5d0e4f15078c5835290e50f6d.jpg",
    featured: false
  }
];

export default function BlogsSection() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from(headerRef.current?.children || [], {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%"
        }
      });

      // Cards stagger reveal
      gsap.from(".blog-card", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".blog-grid",
          start: "top 85%"
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="pb-16 md:pb-24 lg:pb-32 xl:pb-40 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-12 lg:px-20">
        
        {/* Trridev Signature Header */}
        <div ref={headerRef} className="max-w-4xl mx-auto mb-16 md:mb-24 text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#E32219]"></div>
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-gray-400">
              Industrial Insights
            </span>
            <div className="h-px w-8 bg-[#E32219]"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-light text-gray-900 mb-8 leading-tight tracking-tighter">
            Labeling <span className="font-medium text-[#E32219]">Expertise</span> & Trends
          </h2>
          
          <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
            Stay ahead with the latest innovations in industrial printing, 
            sustainable packaging, and supply chain technology.
          </p>
        </div>

        {/* Editorial Blog Grid */}
        <div className="blog-grid grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Featured Post (Left) */}
          <div className="blog-card lg:col-span-7 group cursor-pointer lg:sticky lg:top-32">
            <div className="relative h-full flex flex-col">
              <div className="relative aspect-16/10 overflow-hidden rounded-2xl bg-gray-100 shadow-xl shadow-black/5">
                <img 
                  src={blogs[0].image} 
                  alt={blogs[0].title}
                  className="w-full h-full object-cover  brightness-90 group-hover:-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-[#E32219] text-white text-[10px] font-bold uppercase tracking-widest rounded-sm">
                  {blogs[0].category}
                </div>
              </div>
              
              <div className="pt-8 flex-1 flex flex-col justify-between">
                <div>
                   <div className="flex items-center gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                      <div className="flex items-center gap-2"><Calendar size={12} className="text-[#E32219]" /> {blogs[0].date}</div>
                      <div className="flex items-center gap-2"><User size={12} className="text-[#E32219]" /> By {blogs[0].author}</div>
                   </div>
                   <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 group-hover:text-[#E32219] transition-colors duration-300 mb-6 leading-tight tracking-tight">
                      {blogs[0].title}
                   </h3>
                   <p className="text-gray-500 font-light text-lg leading-relaxed max-w-xl mb-8">
                      {blogs[0].excerpt}
                   </p>
                </div>
                
                <div>
                   <button className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-900 group-hover:gap-5 transition-all duration-300 border-b border-gray-200 pb-2">
                      Read Full Article <ArrowUpRight size={16} className="text-[#E32219]" />
                   </button>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Posts (Right Column) */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div className="space-y-10">
              {blogs.slice(1).map((blog) => (
                <div key={blog.id} className="blog-card group cursor-pointer border-b border-gray-100 pb-10 last:border-0 last:pb-0">
                  <div className="flex flex-col md:flex-row gap-6">
                     <div className="w-full md:w-44 aspect-square shrink-0 overflow-hidden rounded-xl bg-gray-100 shadow-sm">
                        <img 
                          src={blog.image} 
                          alt={blog.title}
                          className="w-full h-full object-cover  brightness-95 group-hover:-0 group-hover:brightness-100 group-hover:scale-110 transition-all duration-700"
                        />
                     </div>
                     
                     <div className="flex flex-col justify-center">
                        <span className="text-[10px] font-bold text-[#E32219] uppercase tracking-widest mb-2 block">{blog.category}</span>
                        <h3 className="text-xl lg:text-2xl font-medium text-gray-900 group-hover:text-[#E32219] transition-colors duration-300 mb-3 tracking-tight leading-snug">
                           {blog.title}
                        </h3>
                        <div className="flex items-center gap-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                           <Calendar size={12} /> {blog.date}
                        </div>
                     </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All CTA - Strategic Placement */}
            <div className="mt-6">
    
               
                <button className="relative px-8 sm:px-12 py-4 sm:py-5 bg-gray-900 text-white text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] rounded-sm group overflow-hidden shadow-xl transition-all duration-300">
                <span className="relative z-10 flex items-center gap-4">
        View All Insights
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </span>
                <div className="absolute inset-0 bg-[#E32219] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
