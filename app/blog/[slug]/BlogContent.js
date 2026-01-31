"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, User, Tag, Share2, Facebook, Twitter, Linkedin, Copy } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import PageHeader from '@/components/common/PageHeader';

gsap.registerPlugin(ScrollTrigger);

export default function BlogContent({ blog }) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image Parallax/Scale - simplified since Header animations are handled by PageHeader
      gsap.from(".blog-featured-image", {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.2
      });

      // Content Reveal
      gsap.from(contentRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%"
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  if (!blog) return null;

  return (
    <article ref={containerRef} className="min-h-screen bg-white">
      
      <PageHeader 
         title={blog.title}
         subtitle=""
         highlightSubtitle={blog.category || "Article"}
         breadcrumb="Journal"
         description={`Published on ${blog.publishedDate ? format(new Date(blog.publishedDate), 'MMMM dd, yyyy') : 'Recently'} by ${blog.author || 'Tridev Team'}`}
      />

      {/* Featured Image */}
      <div className="container mx-auto px-4 max-w-6xl -mt-20 relative z-20 mb-16 md:mb-24">
        <div className="aspect-21/9 md:aspect-[3/1.2] w-full overflow-hidden rounded-4xl shadow-2xl relative border-4 border-white">
          <Image 
            src={blog.featuredImage || "https://images.unsplash.com/photo-1557804506-669a67965ba0"} 
            alt={blog.title} 
            fill
            priority
            className="blog-featured-image object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl relative">
         
         {/* Vertical Share Bar - Sticky Desktop */}
         <div className="hidden xl:flex flex-col gap-6 absolute left-[-100px] top-0 sticky-share opacity-0">
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 -rotate-90 origin-center translate-y-8">Share</div>
            <div className="w-px h-12 bg-gray-200 mx-auto mt-8"></div>
            <button aria-label="Share on LinkedIn" className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:border-[#E32219] hover:text-white hover:bg-[#E32219] transition-all shadow-sm">
               <Linkedin className="w-4 h-4" />
            </button>
            <button aria-label="Share on Twitter" className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:border-[#E32219] hover:text-white hover:bg-[#E32219] transition-all shadow-sm">
               <Twitter className="w-4 h-4" />
            </button>
            <button aria-label="Copy link" className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:border-[#E32219] hover:text-white hover:bg-[#E32219] transition-all shadow-sm">
               <Copy className="w-4 h-4" />
            </button>
         </div>

         {/* Main Content Area */}
         <div ref={contentRef} className="pb-24">
            
            <Link href="/blog" className="inline-flex xl:hidden items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E32219] mb-8">
               <ArrowLeft className="w-4 h-4" /> Back to Journal
            </Link>

            {/* Highlight Box - Dark Technical Card */}
            {blog.highlightBox && (
              <div className="my-16 p-1 bg-[#050505] rounded-3xl shadow-2xl overflow-hidden relative group">
                 <div className="absolute inset-0 bg-linear-to-br from-[#E32219]/20 via-transparent to-transparent opacity-50"></div>
                 <div className="relative bg-[#0a0a0a] rounded-[22px] p-8 md:p-12 overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                       <Tag className="w-24 h-24 text-white" />
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-light text-white mb-8 flex items-center gap-4">
                       <span className="w-2 h-2 bg-[#E32219] rounded-full shadow-[0_0_10px_#E32219]"></span>
                       {blog.highlightBox.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-10 font-light leading-relaxed text-lg border-l-2 border-white/10 pl-6">
                       {blog.highlightBox.intro}
                    </p>

                    <div className="grid grid-cols-1 gap-4">
                       {blog.highlightBox.points.map((p, i) => (
                          <div key={i} className="flex items-center gap-6 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group/item">
                             <div className="text-[#E32219] font-bold text-xl opacity-50 group-hover/item:opacity-100 transition-opacity">0{i+1}</div>
                             <span className="text-gray-300 font-light text-base">{p}</span>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
            )}

            {/* Main HTML Content - Rich Typography */}
            <div 
               className="prose prose-lg md:prose-xl prose-gray max-w-none 
                 prose-headings:font-light prose-headings:tracking-tighter prose-headings:text-gray-900 
                 prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:flex prose-h2:items-center prose-h2:gap-4 prose-h2:before:content-[''] prose-h2:before:w-8 prose-h2:before:h-1 prose-h2:before:bg-[#E32219]
                 prose-h3:text-2xl prose-h3:font-normal prose-h3:text-gray-800
                 prose-p:text-gray-600 prose-p:leading-loose prose-p:font-light prose-p:mb-8
                 prose-a:text-[#E32219] prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-a:decoration-1 prose-a:underline-offset-4
                 prose-blockquote:border-l-0 prose-blockquote:pl-0 prose-blockquote:my-16 prose-blockquote:relative prose-blockquote:font-light prose-blockquote:text-3xl prose-blockquote:leading-tight prose-blockquote:text-gray-900 prose-blockquote:not-italic
                 prose-li:text-gray-600 prose-li:font-light
                 prose-img:rounded-4xl prose-img:shadow-2xl prose-img:my-16 prose-img:w-full prose-img:border prose-img:border-gray-100"
               dangerouslySetInnerHTML={{ __html: blog.content }} 
            />

            {/* Dynamic Sections - Distinct Visual Blocks */}
            {blog.sections?.map((section, idx) => (
               <div key={idx} className="mt-24 pt-12 relative">
                  <div className="absolute -left-4 top-12 w-1 h-24 bg-gray-200 hidden xl:block"></div>
                  <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-10 tracking-tight leading-[1.1]">{section.heading}</h2>
                   <div 
                     className="prose prose-lg md:prose-xl prose-gray max-w-none text-gray-600 font-light leading-loose"
                     dangerouslySetInnerHTML={{ __html: section.content }} 
                   />
               </div>
            ))}

            {/* FAQs - Architectural Grid */}
            {blog.faqs?.length > 0 && (
               <div className="mt-32">
                  <h2 className="text-4xl font-light text-gray-900 mb-16 flex items-center gap-6">
                     <span className="w-12 h-12 rounded-full bg-[#E32219] text-white flex items-center justify-center text-xl font-bold">?</span>
                     Common Questions
                  </h2>
                  <div className="grid grid-cols-1 gap-8">
                     {blog.faqs.map((faq, i) => (
                        <div key={i} className="flex gap-8 group">
                           <div className="hidden md:flex flex-col items-center">
                              <span className="w-px h-full bg-gray-200 group-last:h-0"></span>
                           </div>
                           <div className="flex-1 pb-12 border-b border-gray-100 group-last:border-0">
                              <h3 className="text-xl md:text-2xl font-normal text-gray-900 mb-4 group-hover:text-[#E32219] transition-colors">{faq.question}</h3>
                              <p className="text-gray-500 font-light text-lg leading-relaxed">{faq.answer}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            )}

            {/* Tags & Footer Navigation */}
            <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
               <div className="flex flex-wrap gap-2">
                  {blog.tags?.map((tag, i) => (
                     <span key={i} className="px-4 py-2 border border-gray-100 text-gray-500 rounded-full text-xs font-bold uppercase tracking-widest hover:border-[#E32219] hover:text-[#E32219] transition-colors cursor-default">
                        {tag}
                     </span>
                  ))}
               </div>
               
               <div className="flex items-center gap-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Share Article</span>
                  <div className="flex gap-2">
                     <button aria-label="Share on Facebook" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-[#E32219] hover:text-white transition-all">
                        <Facebook className="w-4 h-4" />
                     </button>
                     <button aria-label="Share on LinkedIn" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-[#E32219] hover:text-white transition-all">
                        <Linkedin className="w-4 h-4" />
                     </button>
                  </div>
               </div>
            </div>

         </div>

      </div>
    </article>
  );
}
