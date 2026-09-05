import { Link } from 'react-router-dom';
import { Calendar, Users, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Itinerary } from '@/content/itineraries';
import { itineraryTypes } from '@/content/itineraries';

interface ItineraryCardProps {
  itinerary: Itinerary;
  index?: number;
}

export function ItineraryCard({ itinerary, index = 0 }: ItineraryCardProps) {
  const typeInfo = itineraryTypes[itinerary.type];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link
        to={`/itineraries/${itinerary.slug}`}
        className="group relative block h-[450px] rounded-[2rem] overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-300"
      >
         {/* Image Container */}
         <div className="relative h-full overflow-hidden">
          <img
            src={itinerary.heroImage}
            alt={itinerary.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/95 via-black/80 to-transparent" />
          
          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full 
                           bg-white/20 backdrop-blur-md border border-white/20 
                           text-xs font-bold text-white uppercase tracking-wider shadow-sm">
              <span>{typeInfo.icon}</span>
              {typeInfo.name}
            </span>

             <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full 
                           bg-secondary-500 text-xs font-bold text-white uppercase tracking-wider shadow-sm">
              <Calendar className="w-3.5 h-3.5" />
              {itinerary.duration} Days
            </span>
          </div>

          {/* Content Body */}
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <div className="glass-dark rounded-2xl p-5 transform transition-all duration-500 translate-y-4 group-hover:translate-y-0 group-hover:bg-black/60 group-hover:backdrop-blur-xl">
              <div className="flex justify-between items-end mb-3">
                <span className="text-2xl font-bold text-secondary-400">
                  {itinerary.startingPrice}
                </span>
                 <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/90 bg-white/10 px-2 py-1 rounded-lg border border-white/20">
                  <Users className="w-3.5 h-3.5" />
                  {itinerary.groupSize}
                </span>
              </div>

              <h3 className="text-xl font-display font-bold text-white mb-1 group-hover:text-secondary-400 transition-colors">
                {itinerary.title}
              </h3>
              
              <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500">
                <div className="overflow-hidden">
                  <p className="text-white/80 line-clamp-2 text-sm leading-relaxed mt-2 mb-4">
                    {itinerary.shortDescription}
                  </p>
                  
                  {/* Highlights */}
                  <div className="space-y-2 pb-2">
                    {itinerary.highlights.slice(0, 3).map((highlight) => (
                      <div key={highlight} className="flex items-center gap-2 text-xs text-white/90">
                        <Sparkles className="w-3 h-3 text-secondary-500 flex-shrink-0" />
                        <span className="truncate">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
