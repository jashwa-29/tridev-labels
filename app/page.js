import SolutionsSection from '@/components/SolutionsSection';
import AboutUs from '@/components/AboutUs';

import FinishesGallery from '@/components/FinishesGallery';
import WhyChooseSection from '@/components/WhyChooseSection';
import OurProcessSection from '@/components/OurProcess';
import HistoryTimeline from '@/components/HistoryTimeline';
import Testimonials from '@/components/Testimonials';
import BlogsSection from '@/components/BlogsSection';
import FooterSection from '@/components/FooterSection';
import HeroSection from '@/components/HeroSection';

export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
      <HeroSection />
      <AboutUs />

      <SolutionsSection />
      <FinishesGallery />
      <WhyChooseSection />
      <OurProcessSection />
      <Testimonials />
      <BlogsSection />
      <FooterSection />
    </div>
  );
}
