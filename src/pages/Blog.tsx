import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { BlogCard } from '@/components/cards/BlogCard';
import { blogPosts as staticBlogPosts } from '@/content/blog-posts';
import { generateItemListSchema, SEO_KEYWORDS } from '@/lib/seo';
import { contentApi } from '@/lib/api';

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<any[]>(staticBlogPosts);

  useEffect(() => {
    contentApi.blog.list()
      .then((data) => { if (data && data.length > 0) setBlogPosts(data); })
      .catch(() => {});
  }, []);

  const featuredPosts = blogPosts.filter((p: any) => p.featured);
  const regularPosts = blogPosts.filter((p: any) => !p.featured);

  // Generate ItemList schema for blog posts
  const blogListSchema = generateItemListSchema({
    name: 'Sri Lanka Travel Blog',
    description: 'Travel guides, tips, and stories about visiting Sri Lanka',
    items: blogPosts.map((post: any, index: number) => ({
      name: post.title,
      url: `/blog/${post.slug}`,
      image: post.heroImage,
      position: index + 1,
    })),
  });

  return (
    <>
      <SEOHead
        title="Sri Lanka Travel Blog 2026 | Guides, Tips & Travel Stories"
        description="Expert Sri Lanka travel blog with insider guides, tips & stories. First-timer guides, train journeys, food tours, wildlife safaris & more. Plan your perfect trip!"
        keywords={`${SEO_KEYWORDS.blog}, Sri Lanka travel stories, Sri Lanka travel advice, visiting Sri Lanka, Sri Lanka trip report, Sri Lanka travel experience`}
        jsonLd={blogListSchema}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[50vh] pt-32 pb-20 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544256718-3bcf237f3974?w=1920&q=80" 
            alt="Sri Lanka Travel Journal" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60" />
        </div>

        <div className="relative container-custom text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-600/90 text-white text-sm font-medium border border-white/10 shadow-lg">
                <FileText className="w-4 h-4 text-white" />
                {blogPosts.length} Articles
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 drop-shadow-lg">Travel Blog</h1>
            <p className="mt-4 text-lg md:text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed shadow-sm">
              Stories, guides, and inspiration for your Sri Lanka adventure. Dive deep into the culture and beauty.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-10">Featured Articles</h2>
            <div className="space-y-12">
              {featuredPosts.map(post => (
                <BlogCard key={post.slug} post={post} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
           <div className="flex justify-between items-end mb-10">
              <div>
                 <h2 className="text-3xl font-display font-bold text-gray-900">Latest Stories</h2>
                 <p className="text-gray-500 mt-2">More travel inspiration for your journey</p>
              </div>
           </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
