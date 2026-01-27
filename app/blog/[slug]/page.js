import Image from 'next/image';
import { notFound } from 'next/navigation';

async function getBlog(slug) {
  const res = await fetch(`http://localhost:5000/api/blogs/slug/${slug}`, { 
    cache: 'no-store' 
  });
  
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to fetch blog');
  
  return res.json();
}

// SEO Metadata Generation
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: 'Blog Not Found',
    };
  }

  return {
    title: `${blog.title} | Tridev Labels`,
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
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 pt-32">
    <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-4 md:p-8">
      {/* Header Section */}
      <header className="mb-8 text-center">
        <div className="text-blue-600 font-semibold mb-2">{blog.category}</div>
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 leading-tight">
          {blog.title}
        </h1>
        <div className="flex justify-center items-center space-x-4 text-gray-500 text-sm">
          <span>By {blog.author}</span>
          <span>•</span>
          <time dateTime={blog.publishedDate || blog.createdAt}>
            {new Date(blog.publishedDate || blog.createdAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </div>
      </header>

      {/* Featured Image */}
      {blog.featuredImage && (
        <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden shadow-lg">
          <Image
            src={blog.featuredImage}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Highlight Box */}
      {blog.highlightBox && (
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
          <h3 className="text-xl font-bold text-blue-900 mb-2">{blog.highlightBox.title}</h3>
          <p className="mb-4 text-blue-800">{blog.highlightBox.intro}</p>
          <ul className="list-disc list-inside space-y-2 text-blue-800">
            {blog.highlightBox.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Content */}
      <div 
        className="prose prose-lg max-w-none prose-blue mb-10"
        dangerouslySetInnerHTML={{ __html: blog.content }} 
      />

      {/* Dynamic Sections */}
      {blog.sections && blog.sections.length > 0 && (
        <div className="space-y-8 mb-10">
          {blog.sections.map((section, index) => (
            <section key={index}>
              <h2 className="text-2xl font-bold mb-3">{section.heading}</h2>
              <div 
                className="prose prose-lg max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: section.content }} 
              />
            </section>
          ))}
        </div>
      )}

      {/* FAQs */}
      {blog.faqs && blog.faqs.length > 0 && (
        <section className="bg-gray-50 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {blog.faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <h3 className="font-bold text-lg text-gray-800 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tags */}
      {blog.tags && blog.tags.length > 0 && (
        <div className="mt-10 pt-6 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag, index) => (
              <span key={index} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
    </div>
  );
}
