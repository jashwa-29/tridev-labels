"use client";

import PageHeader from '@/components/common/PageHeader';
import ContactSection from '@/components/contact/ContactSection';
import ContactMap from '@/components/contact/ContactMap';
import FooterSection from '@/components/layout/FooterSection';

export default function ContactPage() {
  return (
    <main className="bg-white">
      <PageHeader 
        title="Connect with"
        subtitle="Industrial"
        highlightSubtitle="Precision."
        description="Reach out to our specialist team for custom labeling solutions, technical consultations, or project inquiries. We are here to engineer your brand's success."
        breadcrumb="Contact Us"
      />
      <ContactSection />
      <ContactMap />
  
    </main>
  );
}
