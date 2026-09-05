import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Filter } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { DestinationCard } from '@/components/cards/DestinationCard';
import { destinations as staticDestinations, regions, type Destination } from '@/content/destinations';
import { cn } from '@/lib/utils';
import { generateItemListSchema, SEO_KEYWORDS } from '@/lib/seo';
import { contentApi } from '@/lib/api';

export default function Destinations() {
  const [selectedRegion, setSelectedRegion] = useState<Destination['region'] | 'all'>('all');
  const [destinations, setDestinations] = useState<any[]>(staticDestinations);

  useEffect(() => {
    contentApi.destinations.list()
      .then((data) => {
        if (data && data.length > 0) setDestinations(data);
      })
      .catch(() => {});
  }, []);

  const filteredDestinations = selectedRegion === 'all'
    ? destinations
    : destinations.filter((d: any) => d.region === selectedRegion);

  const regionList = Object.entries(regions) as [Destination['region'], { name: string; description: string }][];

  // Generate ItemList schema for destinations
  const destinationListSchema = generateItemListSchema({
    name: 'Tourist Destinations in Sri Lanka',
    description: 'Complete guide to all major tourist destinations in Sri Lanka including beaches, temples, national parks and cultural sites',
    items: destinations.map((dest: any, index: number) => ({
      name: dest.title,
      url: `/destinations/${dest.slug}`,
      image: dest.heroImage,
      position: index + 1,
    })),
  });

  return (
    <>
      <SEOHead
        title="Best Destinations in Sri Lanka 2026 | Tourist Attractions & Places to Visit"
        description="Explore Sri Lanka's top destinations - Sigiriya Rock Fortress, Galle Fort, Ella, Kandy, Yala Safari & more. Complete guide to the best places to visit in Sri Lanka with photos, tips & travel info."
        keywords={`${SEO_KEYWORDS.destinations}, Sigiriya, Galle Fort, Ella, Kandy, Yala National Park, Mirissa, Nuwara Eliya, Anuradhapura, Polonnaruwa`}
        jsonLd={destinationListSchema}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Destinations', url: '/destinations' },
        ]}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1711389552655-9230667c6338?q=80&w=1935&auto=format&fit=crop" 
            alt="Sigiriya Rock Fortress" 
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
                <MapPin className="w-4 h-4 text-white" />
                {destinations.length} Destinations
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 drop-shadow-lg">Explore Sri Lanka</h1>
            <p className="mt-4 text-lg md:text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed shadow-sm">
              Discover ancient temples, pristine beaches, misty mountains, and incredible wildlife across this tropical paradise.
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
              onClick={() => setSelectedRegion('all')}
              className={cn(
                'px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap border',
                selectedRegion === 'all'
                  ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-600/25'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-primary-600 hover:text-primary-600'
              )}
            >
              All Regions
            </button>

            {regionList.map(([key, region]) => (
              <button
                key={key}
                onClick={() => setSelectedRegion(key)}
                className={cn(
                  'px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap border',
                  selectedRegion === key
                    ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-600/25'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-primary-600 hover:text-primary-600'
                )}
              >
                {region.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {filteredDestinations.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No destinations found for this filter.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDestinations.map((destination, index) => (
                <DestinationCard
                  key={destination.slug}
                  destination={destination}
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
