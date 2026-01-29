import SolutionsSection from '@/components/home/SolutionsSection';
import AboutUs from '@/components/home/AboutUs';
import FinishesGallery from '@/components/home/FinishesGallery';
import WhyChooseSection from '@/components/home/WhyChooseSection';
import OurProcessSection from '@/components/home/OurProcess';
import Testimonials from '@/components/home/Testimonials';
import BlogsSection from '@/components/home/BlogsSection';
import FooterSection from '@/components/layout/FooterSection';
import HeroSection from '@/components/home/HeroSection';

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

    </div>
  );
}
