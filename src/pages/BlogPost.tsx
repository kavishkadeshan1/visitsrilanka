import { useParams, Navigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, User, Calendar, ArrowRight, Tag } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { BlogCard } from '@/components/cards/BlogCard';
import { getBlogPostBySlug, blogPosts as staticBlogPosts, blogCategories } from '@/content/blog-posts';
import { generateArticleSchema } from '@/lib/seo';
import { simpleMarkdownToHtml, formatDate, getSiteUrl } from '@/lib/utils';
import { contentApi } from '@/lib/api';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(getBlogPostBySlug(slug || ''));
  const [allPosts, setAllPosts] = useState<any[]>(staticBlogPosts);

  useEffect(() => {
    if (slug) {
      contentApi.blog.get(slug)
        .then((data) => { if (data) setPost(data); })
        .catch(() => {});
    }
    contentApi.blog.list()
      .then((data) => { if (data && data.length > 0) setAllPosts(data); })
      .catch(() => {});
  }, [slug]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const categoryInfo = blogCategories[post.category as keyof typeof blogCategories];
  const relatedPosts = allPosts
    .filter((p: any) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.shortDescription,
    image: post.heroImage,
    publishedDate: post.publishedDate,
    modifiedDate: post.lastUpdated,
    author: post.author,
    url: `${getSiteUrl()}/blog/${post.slug}`,
  });

  return (
    <>
      <SEOHead
        title={`${post.title} | Sri Lanka Travel Blog`}
        description={post.shortDescription}
        keywords={`${post.tags.join(', ')}, Sri Lanka travel blog, Sri Lanka ${categoryInfo.name.toLowerCase()}`}
        image={post.heroImage}
        type="article"
        publishedDate={post.publishedDate}
        modifiedDate={post.lastUpdated}
        author={post.author}
        jsonLd={articleSchema}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={post.heroImage} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        </div>

        <div className="relative container-custom text-center z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
             className="max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full 
                        bg-white/20 backdrop-blur-md border border-white/20 
                        text-sm font-semibold text-white uppercase tracking-wider">
                {categoryInfo.icon} {categoryInfo.name}
                </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-8 leading-tight text-shadow-lg">{post.title}</h1>

            <div className="flex flex-wrap justify-center items-center gap-6 text-white/90 text-sm font-medium">
               <span className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <User className="w-4 h-4" />
                </div>
                {post.author}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span className="flex items-center gap-2">
                 <Calendar className="w-4 h-4 text-secondary-400" />
                {formatDate(post.publishedDate)}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span className="flex items-center gap-2">
                 <Clock className="w-4 h-4 text-secondary-400" />
                {post.readingTime} min read
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="container-custom">
            <div className="mb-10">
             <Breadcrumbs items={[
              { label: 'Blog', href: '/blog' },
              { label: post.title },
            ]} />
            </div>
            
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-8">
              <div
                className="prose prose-lg prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-primary-600 hover:prose-a:text-primary-700 prose-img:rounded-3xl prose-img:shadow-xl"
                dangerouslySetInnerHTML={{ __html: simpleMarkdownToHtml(post.longContent) }}
              />

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-gray-900">
                  <Tag className="w-5 h-5 text-primary-600" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:bg-white hover:border-primary-200 hover:text-primary-600 transition-colors cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                {/* Author */}
                <div className="card p-6">
                  <h3 className="font-bold mb-4">About the Author</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                      <User className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <div className="font-medium">{post.author}</div>
                      <div className="text-sm text-gray-500">Travel Writer</div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="card p-6 bg-primary-50 border-primary-100">
                  <h3 className="font-bold text-primary-900 mb-2">Plan Your Trip</h3>
                  <p className="text-sm text-primary-700 mb-4">
                    Ready to experience Sri Lanka? Let us help you create the perfect itinerary.
                  </p>
                  <Link
                    to="/contact"
                    className="btn-primary w-full justify-center text-sm"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <h2 className="heading-3">Related Articles</h2>
              <Link
                to="/blog"
                className="hidden md:flex items-center gap-2 text-primary-600 hover:text-primary-700"
              >
                All Articles
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((p, index) => (
                <BlogCard key={p.slug} post={p} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
