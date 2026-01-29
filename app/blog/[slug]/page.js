import { notFound } from 'next/navigation';
import { blogService } from '@/services/blog.service';
import BlogContent from './BlogContent';

// SEO Metadata Generation
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await blogService.getBySlug(slug);

  if (!blog) {
    return {
      title: 'Guide Not Found',
    };
  }

  return {
    title: `${blog.title} | Tridev Labels Insights`,
    description: blog.metaDescription || blog.title,
    openGraph: {
      title: blog.title,
      description: blog.metaDescription,
      images: [blog.featuredImage || '/default-og.jpg'],
      type: 'article',
      publishedTime: blog.publishedDate || blog.createdAt,
      authors: [blog.author],
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  
  // Use the efficient reusable API call
  const blog = await blogService.getBySlug(slug);

  if (!blog) {
    notFound();
  }

  return <BlogContent blog={blog} />;
}
