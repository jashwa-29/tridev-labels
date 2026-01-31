"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { X, Send, Store, User, Mail, Phone, FileText } from 'lucide-react';
import { quoteService } from '@/services/quote.service';

export default function QuoteModal({ isOpen, onClose, serviceTitle }) {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    details: `I'm interested in a quote for ${serviceTitle || 'your services'}.`
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  // Reset details when serviceTitle changes
  useEffect(() => {
    if (serviceTitle) {
       setFormData(prev => ({...prev, details: `I'm interested in a quote for ${serviceTitle}.`}));
    }
  }, [serviceTitle]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await quoteService.submit({
        ...formData,
        service: serviceTitle,
        source: 'service'
      });
      setSubmitStatus('success');
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        details: ''
      });
      // Optionally close modal after slight delay
      setTimeout(() => {
        onClose();
        setSubmitStatus(null);
      }, 2500);
    } catch (err) {
      console.error('Submission failed:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Entrance Animation
      document.body.style.overflow = 'hidden'; // Lock scroll
      
      const ctx = gsap.context(() => {
        gsap.to(overlayRef.current, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out"
        });
        
        gsap.fromTo(contentRef.current,
          { y: 50, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.2)", delay: 0.1 }
        );

        gsap.from(".form-item", {
           y: 20,
           opacity: 0,
           duration: 0.4,
           stagger: 0.1,
           delay: 0.3,
           ease: "power2.out"
        });

      }, modalRef);
      return () => ctx.revert();
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div ref={modalRef} className="fixed inset-0 z-100 flex items-center justify-center px-4 sm:px-6">
      
      {/* Backdrop */}
      <div 
        ref={overlayRef}
        onClick={onClose}
        className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-md opacity-0 cursor-pointer"
      ></div>

      {/* Modal Content */}
      <div 
        ref={contentRef}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden opacity-0"
      >
         {/* Decorative Top Bar */}
         <div className="h-2 w-full bg-[#E32219]"></div>
         
         <button 
           onClick={onClose}
           className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
         >
           <X className="w-5 h-5 text-gray-400 hover:text-gray-900" />
         </button>

         <div className="p-8 md:p-10">
            <div className="mb-8 text-center">
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E32219] mb-3 block">Start Your Project</span>
               <h3 className="text-2xl md:text-3xl font-light text-gray-900">Request a Quote</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
               <div className="space-y-4">
                  <div className="form-item grid grid-cols-2 gap-4">
                     <div className="relative group">
                        <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-400 group-focus-within:text-[#E32219] transition-colors" />
                        <input 
                           type="text" 
                           placeholder="Name" 
                           required
                           className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-[#E32219] focus:bg-white transition-all"
                           value={formData.name}
                           onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                     </div>
                     <div className="relative group">
                        <Store className="absolute left-3 top-3.5 w-4 h-4 text-gray-400 group-focus-within:text-[#E32219] transition-colors" />
                        <input 
                           type="text" 
                           placeholder="Company" 
                           className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-[#E32219] focus:bg-white transition-all"
                           value={formData.company}
                           onChange={e => setFormData({...formData, company: e.target.value})}
                        />
                     </div>
                  </div>

                  <div className="form-item relative group">
                     <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400 group-focus-within:text-[#E32219] transition-colors" />
                     <input 
                        type="email" 
                        placeholder="Work Email" 
                        required
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-[#E32219] focus:bg-white transition-all"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                     />
                  </div>

                  <div className="form-item relative group">
                     <Phone className="absolute left-3 top-3.5 w-4 h-4 text-gray-400 group-focus-within:text-[#E32219] transition-colors" />
                     <input 
                        type="tel" 
                        placeholder="Phone Number" 
                        required
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-[#E32219] focus:bg-white transition-all"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                     />
                  </div>
                  
                  <div className="form-item relative group">
                     <FileText className="absolute left-3 top-3.5 w-4 h-4 text-gray-400 group-focus-within:text-[#E32219] transition-colors" />
                     <textarea 
                        rows="3"
                        placeholder="Project Details..." 
                        required
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-[#E32219] focus:bg-white transition-all resize-none"
                        value={formData.details}
                        onChange={e => setFormData({...formData, details: e.target.value})}
                     ></textarea>
                  </div>
               </div>

               <button 
                type="submit"
                disabled={isSubmitting}
                className={`form-item w-full py-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 group
                  ${submitStatus === 'success' ? 'bg-green-600 text-white' : 
                    submitStatus === 'error' ? 'bg-red-600 text-white' : 
                    'bg-black text-white hover:bg-[#E32219]'}`}
               >
                  {isSubmitting ? 'Sending Request...' : 
                   submitStatus === 'success' ? 'Request Sent!' : 
                   submitStatus === 'error' ? 'Failed to Send' : 
                   'Submit Request'}
                  <Send className={`w-4 h-4 transition-transform ${isSubmitting ? 'animate-pulse' : 'group-hover:translate-x-1 group-hover:-translate-y-1'}`} />
               </button>
            </form>
            
            <p className="form-item mt-6 text-center text-[10px] text-gray-400">
               {submitStatus === 'success' ? 'Thank you! We will contact you shortly.' : 
                submitStatus === 'error' ? 'Something went wrong. Please try again later.' : 
                'Protected by secure encryption and our Privacy Policy.'}
            </p>
         </div>
      </div>
    </div>
  );
}
