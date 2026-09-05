import { useParams, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Star, MapPin, Clock, Check, ArrowRight } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { getItineraryBySlug, itineraryTypes } from '@/content/itineraries';
import { simpleMarkdownToHtml, getWhatsAppLink } from '@/lib/utils';
import { contentApi } from '@/lib/api';

export default function ItineraryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [itinerary, setItinerary] = useState<any>(getItineraryBySlug(slug || ''));

  useEffect(() => {
    if (slug) {
      contentApi.itineraries.get(slug)
        .then((data) => { if (data) setItinerary(data); })
        .catch(() => {});
    }
  }, [slug]);

  if (!itinerary) {
    return <Navigate to="/itineraries" replace />;
  }

  const typeInfo = itineraryTypes[itinerary.type as keyof typeof itineraryTypes];

  return (
    <>
      <SEOHead
        title={itinerary.title}
        description={itinerary.shortDescription}
        image={itinerary.heroImage}
      />

      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={itinerary.heroImage} 
            alt={itinerary.title} 
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
             <div className="flex justify-center flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full 
                            bg-primary-600 text-sm font-semibold text-white uppercase tracking-wider shadow-lg shadow-primary-600/30">
                {typeInfo.icon} {typeInfo.name}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full 
                            bg-white/20 backdrop-blur-md border border-white/20 
                            text-sm font-semibold text-white uppercase tracking-wider">
                 {itinerary.duration} Days
                </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 text-shadow-lg">{itinerary.title}</h1>

            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 text-white/90 text-lg font-medium">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-secondary-400" />
                {itinerary.duration} Days / {itinerary.duration - 1} Nights
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-5 h-5 text-secondary-400" />
                {itinerary.groupSize}
              </span>
              <span className="flex items-center gap-2">
                <Star className="w-5 h-5 text-secondary-400" />
                {itinerary.difficulty}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
           <div className="mb-8">
             <Breadcrumbs items={[
              { label: 'Itineraries', href: '/itineraries' },
              { label: itinerary.title },
            ]} />
            </div>
            
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Description */}
              <div
                className="prose prose-lg prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 leading-relaxed mb-12"
                dangerouslySetInnerHTML={{ __html: simpleMarkdownToHtml(itinerary.longContent) }}
              />

              {/* Day by Day */}
              <div className="mt-12">
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-10 border-b pb-4">Day by Day Itinerary</h2>
                <div className="relative border-l-2 border-primary-200 ml-4 space-y-12">
                  {itinerary.days.map((day: any, index: number) => (
                    <motion.div
                      key={day.day}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="relative pl-12"
                    >
                      {/* Day number */}
                      <div className="absolute -left-[21px] top-0 w-11 h-11 rounded-full bg-primary-600 text-white 
                                    flex items-center justify-center font-bold text-lg shadow-lg shadow-primary-600/30 border-4 border-gray-50 z-10">
                        {day.day}
                      </div>

                      <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center justify-between mb-4">
                             <h3 className="text-2xl font-bold text-gray-900">{day.title}</h3>
                        </div>
                        
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">{day.description}</p>

                        {day.activities.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-sm font-semibold text-gray-500 mb-2">Activities</h4>
                            <ul className="space-y-1">
                              {day.activities.map((activity: string) => (
                                <li key={activity} className="flex items-center gap-2 text-sm text-gray-700">
                                  <Check className="w-4 h-4 text-accent-600" />
                                  {activity}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="mt-4 flex flex-wrap gap-4 text-sm">
                          {day.accommodation !== 'None (end of tour)' && day.accommodation !== 'End' && day.accommodation !== 'End of tour' && (
                            <span className="flex items-center gap-1.5 text-gray-500">
                              <MapPin className="w-4 h-4" />
                              {day.accommodation}
                            </span>
                          )}
                          {day.meals.length > 0 && (
                            <span className="flex items-center gap-1.5 text-gray-500">
                              <Clock className="w-4 h-4" />
                              {day.meals.join(', ')}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Price Card */}
                <div className="card p-6 bg-primary-50 border-primary-100">
                  <div className="text-sm text-primary-700 mb-1">Starting from</div>
                  <div className="text-3xl font-bold text-primary-900">{itinerary.startingPrice}</div>
                  <div className="text-sm text-primary-700 mt-1">per person</div>

                  <a
                    href={getWhatsAppLink(`Hi! I'm interested in the "${itinerary.title}" tour.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full justify-center mt-6"
                  >
                    Book This Tour
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Inclusions */}
                <div className="card p-6">
                  <h3 className="text-lg font-bold mb-4">What's Included</h3>
                  <ul className="space-y-2">
                    {itinerary.inclusions.map((item: string) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-accent-600 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Highlights */}
                <div className="card p-6">
                  <h3 className="text-lg font-bold mb-4">Highlights</h3>
                  <ul className="space-y-2">
                    {itinerary.highlights.map((item: string) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <Star className="w-4 h-4 text-secondary-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
