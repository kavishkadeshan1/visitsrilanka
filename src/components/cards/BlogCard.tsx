import { Link } from 'react-router-dom';
import { Clock, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDate } from '@/lib/utils';
import type { BlogPost } from '@/content/blog-posts';
import { blogCategories } from '@/content/blog-posts';

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  featured?: boolean;
}

export function BlogCard({ post, index = 0, featured = false }: BlogCardProps) {
  const categoryInfo = blogCategories[post.category];

  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Link
          to={`/blog/${post.slug}`}
           className="group block rounded-[2.5rem] overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative aspect-video md:aspect-auto overflow-hidden">
              <img
                src={post.heroImage}
                alt={post.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
               <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full 
                               bg-white/20 backdrop-blur-md border border-white/20 
                               text-xs font-bold text-white uppercase tracking-wider">
                  {categoryInfo.icon} {categoryInfo.name}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
              <h3 className="text-2xl md:text-4xl font-display font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors leading-tight">
                {post.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {post.shortDescription}
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-primary-600" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-primary-600" />
                  {post.readingTime} min read
                </span>
              </div>

               <div className="flex items-center text-primary-600 font-bold group/btn">
                <span className="group-hover/btn:mr-2 transition-all">Read Article</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:ml-0 transition-all transform group-hover/btn:translate-x-1" />
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group flex flex-col h-full bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {/* Image */}
         <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={post.heroImage}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full 
                           bg-white/20 backdrop-blur-md border border-white/20 
                           text-[10px] font-bold text-white uppercase tracking-wider">
              {categoryInfo.icon} {categoryInfo.name}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
            <span>{formatDate(post.publishedDate)}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-primary-600" />
              {post.readingTime} min
            </span>
          </div>

          <h3 className="text-xl font-display font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
            {post.shortDescription}
          </p>
          
           <div className="pt-4 border-t border-gray-100 mt-auto flex items-center justify-between text-primary-600 text-sm font-semibold">
            <span>Read More</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
