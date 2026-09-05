import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Filter } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { ItineraryCard } from '@/components/cards/ItineraryCard';
import { itineraries as staticItineraries, itineraryTypes, type Itinerary } from '@/content/itineraries';
import { cn } from '@/lib/utils';
import { generateItemListSchema, SEO_KEYWORDS } from '@/lib/seo';
import { contentApi } from '@/lib/api';

export default function Itineraries() {
  const [selectedType, setSelectedType] = useState<Itinerary['type'] | 'all'>('all');
  const [itineraries, setItineraries] = useState<any[]>(staticItineraries);

  useEffect(() => {
    contentApi.itineraries.list()
      .then((data) => { if (data && data.length > 0) setItineraries(data); })
      .catch(() => {});
  }, []);

  const filteredItineraries = selectedType === 'all'
    ? itineraries
    : itineraries.filter((i: any) => i.type === selectedType);

  const typeList = Object.entries(itineraryTypes) as [Itinerary['type'], { name: string; icon: string }][];

  // Generate ItemList schema for itineraries
  const itineraryListSchema = generateItemListSchema({
    name: 'Sri Lanka Travel Itineraries',
    description: 'Curated Sri Lanka tour packages and travel itineraries for all types of travelers',
    items: itineraries.map((itin: any, index: number) => ({
      name: itin.title,
      url: `/itineraries/${itin.slug}`,
      image: itin.heroImage,
      position: index + 1,
    })),
  });

  return (
    <>
      <SEOHead
        title="Sri Lanka Itineraries 2026 | Tour Packages & Travel Plans (5-14 Days)"
        description="Plan your Sri Lanka trip with our expertly curated itineraries. 5-day highlights, 7-day cultural tours, 10-day adventures & more. Best routes, accommodations & insider tips for 2026."
        keywords={`${SEO_KEYWORDS.itineraries}, 5 days Sri Lanka, 7 days Sri Lanka, 10 days Sri Lanka, 2 weeks Sri Lanka, Sri Lanka tour package, Sri Lanka honeymoon, Sri Lanka family trip`}
        jsonLd={itineraryListSchema}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Itineraries', url: '/itineraries' },
        ]}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1548013146-72479768bada?w=1920&q=80" 
            alt="Sri Lanka Train Ride" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60" />
        </div>

        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-600/90 text-white text-sm font-medium border border-white/10 shadow-lg">
                <Calendar className="w-4 h-4 text-white" />
                {itineraries.length} Curated Tours
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 drop-shadow-lg">Sri Lanka Itineraries</h1>
            <p className="mt-4 text-lg md:text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed shadow-sm">
              Expertly planned routes covering the best of Sri Lanka, from quick highlights to comprehensive adventures.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="container-custom py-4">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide no-scrollbar py-2">
            <span className="flex items-center gap-2 text-gray-500 font-medium text-sm flex-shrink-0 uppercase tracking-wider mr-2">
              <Filter className="w-4 h-4" />
              Filter
            </span>

            <button
              onClick={() => setSelectedType('all')}
              className={cn(
                'px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap border',
                selectedType === 'all'
                  ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-600/25'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-primary-600 hover:text-primary-600'
              )}
            >
              All Types
            </button>

            {typeList.map(([key, type]) => (
              <button
                key={key}
                onClick={() => setSelectedType(key)}
                className={cn(
                  'px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap border',
                  selectedType === key
                    ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-600/25'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-primary-600 hover:text-primary-600'
                )}
              >
                {type.icon} {type.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Itineraries Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {filteredItineraries.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No itineraries found for this filter.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItineraries.map((itinerary, index) => (
                <ItineraryCard
                  key={itinerary.slug}
                  itinerary={itinerary}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
