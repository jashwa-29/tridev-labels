import Link from 'next/link';
import Image from 'next/image';

// Force dynamic rendering since we are fetching data that might change
export const dynamic = 'force-dynamic';

async function getBlogs() {
  // Assuming backend is running on localhost:5000
  const res = await fetch('http://localhost:5000/api/blogs', { cache: 'no-store' });
  
  if (!res.ok) {
    throw new Error('Failed to fetch blogs');
  }
  
  return res.json();
}

export const metadata = {
  title: 'Blog - Tridev Labels',
  description: 'Read our latest insights and updates.',
};

export default async function BlogListingPage() {
  let blogs = [];
  try {
    const data = await getBlogs();
    blogs = data.blogs || [];
  } catch (error) {
    console.error("Error loading blogs:", error);
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600">Error loading blogs</h2>
        <p>Please make sure the backend server is running.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 pt-32">
      <h1 className="text-4xl font-bold mb-8 text-center">Latest Blogs</h1>
      
      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {blog.featuredImage && (
                <div className="relative h-48 w-full">
                  <Image 
                    src={blog.featuredImage} 
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="text-sm text-blue-600 font-semibold mb-2">{blog.category}</div>
                <h2 className="text-xl font-bold mb-2 line-clamp-2">
                  <Link href={`/blog/${blog.slug}`} className="hover:text-blue-600 transition-colors">
                    {blog.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {blog.metaDescription || "Click to read more..."}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  <Link href={`/blog/${blog.slug}`} className="font-semibold text-blue-600 hover:underline">
                    Read More &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
