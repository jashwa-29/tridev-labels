"use client";

import PageHeader from '@/components/common/PageHeader';
import dynamic from 'next/dynamic';

const ExportIntro = dynamic(() => import('@/components/export/ExportIntro'), { ssr: false });
const SpecialtyCapabilities = dynamic(() => import('@/components/export/SpecialtyCapabilities'), { ssr: false });
const GlobalReachSection = dynamic(() => import('@/components/export/GlobalReachSection'), { ssr: false });
const ExportMetrics = dynamic(() => import('@/components/export/ExportMetrics'), { ssr: false });
const ExportProcess = dynamic(() => import('@/components/export/ExportProcess'), { ssr: false });
const ExportFAQ = dynamic(() => import('@/components/export/ExportFAQ'), { ssr: false });

export default function ExportPage() {
  return (
    <main className="bg-white">
      <PageHeader 
        title="Global Presence."
        subtitle="Indian Heritage,"
        highlightSubtitle="International Standards."
        description="Trridev Labelss bridges the gap between artisan craftsmanship and global logistics, providing world-class labeling solutions to every corner of the world."
        breadcrumb="Export Solutions"
      />
      
      <ExportIntro />
      <SpecialtyCapabilities />
      <ExportMetrics />
      <GlobalReachSection />
      <ExportProcess />
      <ExportFAQ />
    </main>
  );
}
