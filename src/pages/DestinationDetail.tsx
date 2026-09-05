import { useParams, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar, Camera, ArrowRight } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { DestinationCard } from '@/components/cards/DestinationCard';
import { getDestinationBySlug, destinations as staticDestinations, regions } from '@/content/destinations';
import { generateDestinationSchema, generateFAQSchema } from '@/lib/seo';
import { simpleMarkdownToHtml, getWhatsAppLink } from '@/lib/utils';
import { contentApi } from '@/lib/api';

interface DestinationDetailProps {
  overrideSlug?: string;
  disableSEO?: boolean;
}

export default function DestinationDetail({ overrideSlug, disableSEO = false }: DestinationDetailProps = {}) {
  const { slug: paramSlug } = useParams<{ slug: string }>();
  const slug = overrideSlug || paramSlug || '';

  // Start with static data, then try API
  const [destination, setDestination] = useState<any>(getDestinationBySlug(slug));
  const [allDestinations, setAllDestinations] = useState<any[]>(staticDestinations);

  useEffect(() => {
    contentApi.destinations.get(slug)
      .then((data) => { if (data) setDestination(data); })
      .catch(() => {});
    contentApi.destinations.list()
      .then((data) => { if (data && data.length > 0) setAllDestinations(data); })
      .catch(() => {});
  }, [slug]);

  if (!destination) {
    return <Navigate to="/destinations" replace />;
  }

  const regionInfo = regions[destination.region as keyof typeof regions];
  const relatedDestinations = allDestinations
    .filter((d: any) => d.region === destination.region && d.slug !== destination.slug)
    .slice(0, 3);

  const destinationSchema = generateDestinationSchema({
    name: destination.title,
    description: destination.shortDescription,
    image: destination.heroImage,
    url: `/destinations/${destination.slug}`,
    coordinates: destination.coordinates,
    highlights: destination.highlights,
  });

  // Generate FAQ schema from highlights
  const faqSchema = generateFAQSchema([
    {
      question: `What are the highlights of ${destination.title}?`,
      answer: destination.highlights.join(', '),
    },
    {
      question: `What is the best time to visit ${destination.title}?`,
      answer: destination.bestTimeToVisit,
    },
    {
      question: `How many days should I spend at ${destination.title}?`,
      answer: `We recommend ${destination.recommendedDays} day${destination.recommendedDays > 1 ? 's' : ''} to fully explore ${destination.title}.`,
    },
  ]);

  return (
    <>
      {!disableSEO && (
        <SEOHead
          title={`${destination.title} Travel Guide 2026 | Things to Do, Tips & Photos`}
          description={`Complete guide to ${destination.title} in Sri Lanka. ${destination.shortDescription} Best time to visit, how to get there, entry fees & insider tips.`}
          keywords={`${destination.title}, ${destination.title} Sri Lanka, visit ${destination.title}, ${destination.title} travel guide, things to do ${destination.title}, ${destination.tags.join(', ')}`}
          image={destination.heroImage}
          jsonLd={[destinationSchema, faqSchema]}
          breadcrumbs={[
            { name: 'Home', url: '/' },
            { name: 'Destinations', url: '/destinations' },
            { name: destination.title, url: `/destinations/${destination.slug}` },
          ]}
        />
      )}

      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={destination.heroImage} 
            alt={destination.title} 
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
                <MapPin className="w-4 h-4" />
                {regionInfo.name}
                </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 text-shadow-lg">{destination.title}</h1>
            
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 text-white/90 text-lg font-medium">
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-secondary-400" />
                {destination.recommendedDays} Days
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-secondary-400" />
                {destination.bestTimeToVisit}
              </span>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70"
        >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
                <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
            </div>
        </motion.div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="container-custom">
            <div className="mb-8">
             <Breadcrumbs items={[
              { label: 'Destinations', href: '/destinations' },
              { label: destination.title },
            ]} />
            </div>
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div
                className="prose prose-lg prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-primary-600 hover:prose-a:text-primary-700 prose-img:rounded-3xl prose-img:shadow-xl"
                dangerouslySetInnerHTML={{ __html: simpleMarkdownToHtml(destination.longContent) }}
              />

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Experience Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {destination.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:bg-white hover:border-primary-200 hover:text-primary-600 transition-colors cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Quick Info Card */}
                <div className="card p-6">
                  <h3 className="text-lg font-bold mb-4">Quick Info</h3>
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Region</dt>
                      <dd className="font-medium">{regionInfo.name}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Time Needed</dt>
                      <dd className="font-medium">{destination.recommendedDays} days</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Best Time</dt>
                      <dd className="font-medium">{destination.bestTimeToVisit}</dd>
                    </div>
                  </dl>
                </div>

                {/* Highlights */}
                <div className="card p-6">
                  <h3 className="text-lg font-bold mb-4">Highlights</h3>
                  <ul className="space-y-2">
                    {destination.highlights.map((highlight: string) => (
                      <li key={highlight} className="flex items-start gap-2 text-sm">
                        <Camera className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="card p-6 bg-primary-50 border-primary-100">
                  <h3 className="text-lg font-bold text-primary-900 mb-2">
                    Want to visit {destination.title}?
                  </h3>
                  <p className="text-sm text-primary-700 mb-4">
                    Let us help you plan the perfect trip including this destination.
                  </p>
                  <a
                    href={getWhatsAppLink(`Hi! I'm interested in visiting ${destination.title} in Sri Lanka.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full justify-center text-sm"
                  >
                    Plan My Trip
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Destinations */}
      {relatedDestinations.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <h2 className="heading-3">More in {regionInfo.name}</h2>
              <Link
                to="/destinations"
                className="hidden md:flex items-center gap-2 text-primary-600 hover:text-primary-700"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedDestinations.map((dest, index) => (
                <DestinationCard key={dest.slug} destination={dest} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
