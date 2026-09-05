import { Link } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Destination } from '@/content/destinations';
import { regions } from '@/content/destinations';

interface DestinationCardProps {
  destination: Destination;
  index?: number;
}

export function DestinationCard({ destination, index = 0 }: DestinationCardProps) {
  const regionInfo = regions[destination.region];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link
        to={`/destinations/${destination.slug}`}
        className="group relative block h-[420px] rounded-[2rem] overflow-hidden bg-gray-900 shadow-lg hover:shadow-2xl transition-all duration-500"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={destination.heroImage}
            alt={destination.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-300" />
        </div>

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full 
                         bg-white/20 backdrop-blur-md border border-white/20 
                         text-xs font-bold text-white uppercase tracking-wider shadow-sm">
            <MapPin className="w-3.5 h-3.5" />
            {regionInfo.name}
          </span>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <div className="glass-dark rounded-2xl p-5 transform transition-all duration-500 translate-y-4 group-hover:translate-y-0 group-hover:bg-black/60 group-hover:backdrop-blur-xl">
            <h3 className="text-2xl font-display font-bold text-white mb-1 leading-tight group-hover:text-secondary-400 transition-colors">
              {destination.title}
            </h3>
            
            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500">
              <div className="overflow-hidden">
                <p className="text-white/80 line-clamp-2 text-sm leading-relaxed mt-2 mb-3">
                  {destination.shortDescription}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-white/90 text-sm font-medium pt-3 border-t border-white/10 mt-1">
              <span className="flex items-center gap-1.5">
                 <Clock className="w-4 h-4 text-secondary-400" />
                 {destination.recommendedDays} Days
              </span>
              <div className="flex gap-2">
                {destination.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded text-[10px] bg-white/10 border border-white/20 text-white/80">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
