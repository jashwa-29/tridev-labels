"use client";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isHoveringNav, setIsHoveringNav] = useState(false);
  
  const pathname = usePathname();
  const headerRef = useRef(null);
  const spotlightRef = useRef(null);
  const navRef = useRef(null);
  const dropdownRef = useRef(null);
  
  const services = [
    { name: "Thermal Transfer", href: "/services/thermal-transfer", desc: "Luxury foils & finishing" },
    { name: "Sustainable Labels", href: "/services/sustainable-eco-labels", desc: "Eco-friendly materials" },
    { name: "Automotive & Smart", href: "/services/automotive-durable-goods", desc: "High-durability NFC" },
    { name: "Beauty & Home", href: "/services/beauty-home-care", desc: "Chemical resistant" },
    { name: "General Products", href: "/services/general-products", desc: "Retail & volume" },
    { name: "Food & Beverage", href: "/services/food-beverage", desc: "FDA approved" },
    { name: "Pharmaceutical", href: "/services/pharmaceutical-labels", desc: "Healthcare grade" },
  ];

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/#services', hasDropdown: true },
    { name: 'Export', href: '/export-order' },
    { name: 'Our Blogs', href: '/blog' },
  ];

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
    // Also reset spotlight on clear
    gsap.to(spotlightRef.current, { opacity: 0, duration: 0.1 });
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Initial Entrance Animation
    gsap.fromTo(headerRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
    );

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  // Robust Dropdown Animation
  useEffect(() => {
    if (!dropdownRef.current) return;
    
    gsap.killTweensOf(dropdownRef.current);
    
    if (isServicesOpen) {
      gsap.fromTo(dropdownRef.current,
        { opacity: 0, scale: 0.98, y: 10, visibility: 'hidden' },
        { opacity: 1, scale: 1, y: 0, visibility: 'visible', duration: 0.4, ease: "power3.out" }
      );
    } else {
      gsap.to(dropdownRef.current, {
        opacity: 0,
        scale: 0.98,
        y: 10,
        visibility: 'hidden',
        duration: 0.2,
        ease: "power2.in"
      });
    }
  }, [isServicesOpen]);

  // Spotlight Hover Effect (Desktop only)
  const handleMouseEnter = (e) => {
    setIsHoveringNav(true);
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();
    
    gsap.killTweensOf(spotlightRef.current);
    gsap.to(spotlightRef.current, {
      width: rect.width,
      x: rect.left - navRect.left,
      opacity: 1,
      duration: 0.4,
      ease: "power3.out"
    });
  };

  const handleMouseLeaveNav = () => {
    setIsHoveringNav(false);
    // Only fade out if we aren't keeping the menu open (which might imply we are in the dropdown, 
    // but the dropdown is IN the nav, so leaving nav means leaving both).
    gsap.killTweensOf(spotlightRef.current);
    gsap.to(spotlightRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <>
      <header 
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 transition-all duration-500 ease-in-out px-4 sm:px-6 md:px-10 
          ${isMobileMenuOpen ? 'z-100 bg-transparent' : 'z-50'}
          ${isScrolled && !isMobileMenuOpen 
            ? 'py-3 bg-white/95 backdrop-blur-xl border-b border-black/5 shadow-sm' 
            : 'py-5 md:py-8 lg:py-10 bg-transparent border-b border-transparent'
          }`}
      >
        <div className="max-w-[1600px] mx-auto flex justify-between items-center relative">
          
          {/* Logo */}
          <Link href="/" className="relative z-50 flex items-center group">
            <Image 
              src="/tridev-logo.png" 
              alt="Tridev Labels Logo" 
              width={180}
              height={48}
              priority
              className={`h-7 sm:h-8 md:h-9 lg:h-10 xl:h-12 w-auto object-contain transition-all duration-500 ${(isScrolled || isMobileMenuOpen) ? 'brightness-100' : ''}`}
            />
          </Link>

          {/* Navigation - Desktop & Laptop */}
          <nav ref={navRef} className="hidden lg:flex items-center relative p-1 lg:ml-8 xl:ml-0">
            <div 
               ref={spotlightRef}
               className="absolute top-0 bottom-0 bg-[#E32219] rounded-sm opacity-0 pointer-events-none z-0" 
               style={{ height: '100%' }}
            ></div>

            <div className="flex relative z-10" onMouseLeave={handleMouseLeaveNav}>
              {navLinks.map((item) => (
                <div 
                  key={item.name}
                  className="relative group/nav"
                  onMouseEnter={() => item.hasDropdown && setIsServicesOpen(true)}
                  onMouseLeave={() => item.hasDropdown && setIsServicesOpen(false)}
                >
                  <Link 
                    href={item.href}
                    onMouseEnter={handleMouseEnter}
                    className={`px-3 xl:px-6 py-2 text-[11px] xl:text-[14px] font-medium tracking-[0.15em] uppercase transition-colors duration-300 flex items-center gap-1.5
                      ${isScrolled ? 'text-black/70 hover:text-white' : 'text-white hover:text-white'}
                    `}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <svg className={`w-3 h-3 transition-transform duration-300 ${isServicesOpen ? 'rotate-180 text-[#E32219]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>

                  {item.hasDropdown && (
                    <div 
                      ref={dropdownRef}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-[600px] invisible opacity-0"
                    >
                      <div className="bg-[#0f0f0f]/80 backdrop-blur-3xl rounded-2xl shadow-[0_40px_100px_-15px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden">
                        <div className="grid grid-cols-2 gap-x-1 p-2">
                          {services.map((service, idx) => (
                            <Link
                              key={idx}
                              href={service.href}
                              className="group/item flex flex-col gap-1.5 p-5 rounded-xl hover:bg-white/3 transition-all duration-300 border border-transparent hover:border-white/5"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-1 h-1 rounded-full bg-[#E32219] opacity-0 group-hover/item:opacity-100 group-hover/item:scale-150 transition-all duration-300"></div>
                                <span className="text-[13px] font-bold text-white group-hover/item:text-[#E32219] transition-colors leading-tight uppercase tracking-widest">
                                  {service.name}
                                </span>
                              </div>
                              <span className="text-[11px] text-white/40 font-light pl-4 tracking-wide group-hover/item:text-white/70 transition-colors">
                                {service.desc}
                              </span>
                            </Link>
                          ))}
                        </div>
                        <div className="bg-black/40 px-8 py-5 flex items-center justify-between border-t border-white/5">
                          <div className="flex flex-col gap-1">
                            <span className="text-[11px] font-bold text-white uppercase tracking-[0.25em] flex items-center gap-2">
                              Global Labeling Portfolio
                              <span className="px-1.5 py-0.5 rounded-full bg-[#E32219] text-[8px] tracking-normal">Pro</span>
                            </span>
                            <span className="text-[10px] text-white/30 font-medium">Precision engineered in India since 2008</span>
                          </div>
                          <div className="flex items-center gap-4 group/btn cursor-pointer">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 group-hover/btn:text-white transition-colors">Experience All</span>
                            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white group-hover/btn:bg-[#E32219] group-hover/btn:border-[#E32219] transition-all duration-300">
                              <svg className="w-5 h-5 transition-transform group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Action Area - Desktop & Laptop */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-8">
             <Link 
              href="/contact"
              className={`relative px-4 xl:px-8 py-2 xl:py-3 border text-[14px] xl:text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 overflow-hidden group
                ${isScrolled 
                  ? 'border-[#E32219] text-[#E32219] hover:text-white' 
                  : 'border-[#E32219] text-white hover:text-white'
                }`}
            >
              <span className="relative z-10">Contact Us</span>
              <div className={`absolute inset-0 bg-[#E32219] transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 z-0 
                ${isScrolled ? 'bg-[#E32219]' : 'bg-[#E32219]'}`}></div>
            </Link>
          </div>

          {/* Mobile & Tablet & Touch Mini Toggle */}
          <button 
            className="lg:hidden relative z-50 p-2 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <div className="space-y-1.5 w-6 sm:w-7">
                <span className={`block h-[2px] transition-all duration-300 ${isMobileMenuOpen ? 'w-full rotate-45 translate-y-2 bg-white' : `w-full ${isScrolled ? 'bg-black' : 'bg-white'}`}`}></span>
                <span className={`block h-[2px] transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : `w-2/3 ml-auto ${isScrolled ? 'bg-black' : 'bg-white'}`}`}></span>
                <span className={`block h-[2px] transition-all duration-300 ${isMobileMenuOpen ? 'w-full -rotate-45 -translate-y-1.5 bg-white' : `w-full ${isScrolled ? 'bg-black' : 'bg-white'}`}`}></span>
            </div>
          </button>

        </div>
      </header>

      {/* Modern Mobile Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 bg-[#0a0a0a] z-55 transition-all duration-500 cubic-bezier(0.85, 0, 0.15, 1) ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
         <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}
         ></div>
         
         <div className="flex flex-col h-full justify-between p-8 sm:p-12 md:p-20 relative z-10">
            {/* Top Spacer to avoid logo overlap */}
            <div className="h-20 sm:h-24"></div>

            {/* Navigation Links Area */}
            <div className={`flex flex-col items-start ${isMobileMenuOpen ? 'overflow-y-auto' : ''} space-y-6 sm:space-y-8 w-full scrollbar-hide grow pt-8`}>
              {navLinks.map((item, idx) => (
                <div key={item.name} className="flex flex-col items-start w-full group">
                  <Link 
                    href={item.href}
                    onClick={() => !item.hasDropdown && setIsMobileMenuOpen(false)}
                    className="flex items-center gap-6 text-4xl sm:text-5xl md:text-7xl font-bold text-white/20 hover:text-white transition-all duration-500 uppercase tracking-tighter w-full"
                  >
                    <span className="text-xs sm:text-sm font-bold text-[#E32219] w-6">0{idx+1}</span>
                    {item.name}
                  </Link>
                  
                  {item.hasDropdown && (
                    <div className="mt-4 ml-12 sm:ml-16 flex flex-col items-start space-y-3 border-l border-white/5 pl-8">
                      {services.map((service, sIdx) => (
                        <Link
                          key={sIdx}
                          href={service.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-white/30 hover:text-[#E32219] text-sm sm:text-base font-medium transition-colors tracking-widest uppercase"
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link 
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-6 text-4xl sm:text-5xl md:text-7xl font-bold text-white/20 hover:text-white transition-all duration-500 uppercase tracking-tighter w-full"
              >
                <span className="text-xs sm:text-sm font-bold text-[#E32219] w-6">0{navLinks.length + 1}</span>
                Contact
              </Link>
            </div>

            {/* Bottom Contact Bar - Re-added for utility but made elegant */}
            <div className="mt-12 pt-10 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-10">
               <div className="space-y-4">
                  <h4 className="text-[#E32219] text-[10px] font-bold uppercase tracking-[0.3em] mb-2">Engage</h4>
                  <div className="flex flex-col gap-2">
                    <p className="text-white/50 hover:text-white transition-colors text-sm font-light">+91 96000 07995</p>
                    <p className="text-white/30 text-xs font-light lowercase">Kiruba@trridevlabelss.com</p>
                  </div>
               </div>
               
               <div className="space-y-4 max-w-[200px]">
                  <h4 className="text-[#E32219] text-[10px] font-bold uppercase tracking-[0.3em] mb-2">Location</h4>
                  <p className="text-white/40 text-[11px] leading-relaxed font-light">
                    Kottivakkam, Chennai - 600041
                  </p>
               </div>
            </div>
         </div>
      </div>
    </>
  );
}
