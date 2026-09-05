import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { TravelTip } from '@/content/travel-tips';
import { tipCategories } from '@/content/travel-tips';

interface TipCardProps {
  tip: TravelTip;
  index?: number;
}

export function TipCard({ tip, index = 0 }: TipCardProps) {
  const categoryInfo = tipCategories[tip.category];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link
        to={`/travel-tips/${tip.slug}`}
        className="group block bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full border border-gray-100"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={tip.heroImage}
            alt={tip.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full 
                           bg-white/95 backdrop-blur-md shadow-sm text-sm font-medium text-primary-900 border border-white/20">
              <span className="text-base">{categoryInfo.icon}</span>
              {categoryInfo.name}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="heading-4 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
            {tip.title}
          </h3>
          <p className="text-gray-600 line-clamp-2 mb-4 text-sm leading-relaxed">
            {tip.shortDescription}
          </p>

          {/* FAQ Preview */}
          {tip.faqs.length > 0 && (
            <div className="mb-4 text-sm text-gray-500 bg-gray-50 py-1 px-3 rounded-lg inline-block">
              Answers {tip.faqs.length} common questions
            </div>
          )}

          <div className="flex items-center text-primary-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
            <span>Read Guide</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
