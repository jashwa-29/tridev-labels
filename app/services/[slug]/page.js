import { notFound } from 'next/navigation';
import { servicesData } from '@/lib/servicesData';
import ServiceContent from '@/components/services/ServiceContent';

/**
 * Generate Metadata for each service page
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) {
    return {
      title: 'Service Not Found | Tridev Labels',
    };
  }

  return {
    title: `${service.title} | Premium Labeling Solutions`,
    description: service.description,
    openGraph: {
      title: service.title,
      description: service.description,
      images: [{ url: service.heroImage }],
    },
  };
}

/**
 * Static params generation for performance (Static Site Generation)
 */
export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug: slug,
  }));
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) {
    notFound();
  }

  return <ServiceContent service={service} />;
}
