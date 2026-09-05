import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Sun, Shield, Heart, ArrowRight, Star, Camera,
  ChevronDown, ChevronLeft, ChevronRight, Play, Compass,
  TreePalm, Mountain, Waves, Plus, Minus
} from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { DestinationCard } from '@/components/cards/DestinationCard';
import { ItineraryCard } from '@/components/cards/ItineraryCard';
import { destinations as staticDestinations } from '@/content/destinations';
import { itineraries as staticItineraries } from '@/content/itineraries';
import { getSiteUrl } from '@/lib/utils';
import { generateFAQSchema, generateItemListSchema, SEO_KEYWORDS } from '@/lib/seo';
import { contentApi } from '@/lib/api';

// ─── Icon map for dynamic categories from API ───
const iconMap: Record<string, any> = {
  Waves, Compass, Camera, Mountain, Play, TreePalm, MapPin, Sun, Shield, Heart, Star
};

// ─── Fallback Category Data ───
const fallbackCategories = [
  { title: 'Beach & Coast', image: '/images/beach-category.jpg', link: '/destinations', icon: 'Waves' },
  { title: 'Cultural Heritage', image: 'https://images.unsplash.com/photo-1588258524675-65b32578a837?w=600&q=80', link: '/destinations', icon: 'Compass' },
  { title: 'Wildlife Safari', image: '/images/wildlife-category.jpg', link: '/destinations', icon: 'Camera' },
  { title: 'Hill Country', image: 'https://images.unsplash.com/photo-1566296440364-3a9fb1df10a8?w=600&q=80', link: '/destinations', icon: 'Mountain' },
  { title: 'Adventure', image: 'https://images.unsplash.com/photo-1540202404-a2f29016b523?w=600&q=80', link: '/destinations', icon: 'Play' },
  { title: 'Ayurveda & Wellness', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80', link: '/destinations', icon: 'TreePalm' },
];

// ─── Fallback Testimonials ───
const fallbackTestimonials = [
  { name: 'Sarah M.', location: 'London, UK', text: 'Sri Lanka exceeded all our expectations. From the ancient temples to the pristine beaches, every day was an adventure.', rating: 5, avatar: 'https://i.pravatar.cc/100?img=1' },
  { name: 'James & Emily', location: 'Sydney, Australia', text: 'The 10-day itinerary was perfectly planned. Seeing blue whales in Mirissa and spotting leopards at Yala - memories we\'ll treasure forever.', rating: 5, avatar: 'https://i.pravatar.cc/100?img=3' },
  { name: 'Michael T.', location: 'New York, USA', text: 'The train ride from Kandy to Ella was worth the trip alone. Incredible scenery, friendly locals, and amazing food.', rating: 5, avatar: 'https://i.pravatar.cc/100?img=4' },
];

// ─── Why Choose Data (static — not in admin settings) ───
const whyChoose = [
  { icon: Sun, title: 'Year-Round Paradise', description: 'Two monsoon seasons on opposite coasts means perfect weather always somewhere on the island.', stat: '300+', statLabel: 'Sunny Days' },
  { icon: Shield, title: 'Safe & Welcoming', description: 'Renowned for hospitality, Sri Lanka is one of Asia\'s safest destinations for travelers.', stat: '#1', statLabel: 'Friendliest' },
  { icon: Heart, title: 'Incredible Value', description: 'World-class experiences from budget hostels to luxury resorts at exceptional prices.', stat: '$50', statLabel: 'Avg. Daily' },
  { icon: Camera, title: 'Diverse Experiences', description: 'Ancient ruins, wildlife safaris, golden beaches, misty mountains — all in one small island.', stat: '8', statLabel: 'UNESCO Sites' },
];

// ─── Fallback FAQ Data ───
const fallbackFAQs = [
  { question: 'What is the best time to visit Sri Lanka?', answer: 'Sri Lanka can be visited year-round. The west and south coasts are best December to April, while the east coast is best from May to September.' },
  { question: 'How many days do I need in Sri Lanka?', answer: 'We recommend at least 7-10 days. For a comprehensive trip, 14 days is ideal.' },
  { question: 'Is Sri Lanka safe for tourists?', answer: 'Yes, Sri Lanka is considered one of the safest countries in Asia for tourists.' },
  { question: 'Do I need a visa to visit Sri Lanka?', answer: 'Most nationalities need an Electronic Travel Authorization (ETA), available online.' },
  { question: 'What are the must-visit places?', answer: 'Sigiriya Rock Fortress, Galle Fort, Kandy Temple of the Tooth, Ella, Yala National Park, and Mirissa.' },
];

// ─── FAQ Accordion Item ───
function FAQItem({ faq, index }: { faq: { question: string; answer: string }; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="border-b border-gray-200 last:border-b-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors pr-4">
          {faq.question}
        </span>
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
          {isOpen ? (
            <Minus className="w-4 h-4 text-primary-600" />
          ) : (
            <Plus className="w-4 h-4 text-primary-600" />
          )}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-600 leading-relaxed pr-12">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ═══════════════════════════════════════════
// HOME PAGE
// ═══════════════════════════════════════════
export default function Home() {
  const siteUrl = getSiteUrl();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // ─── Dynamic state from API ───
  const [heroImage, setHeroImage] = useState('/images/hero-nine-arch.jpg');
  const [heroTitle, setHeroTitle] = useState('Discover the Wonder of Sri Lanka');
  const [heroSubtitle, setHeroSubtitle] = useState('Ancient temples. Pristine beaches. Misty mountains. A journey curated for the curious soul.');
  const [heroBadge, setHeroBadge] = useState('The Pearl of the Indian Ocean');
  const [categories, setCategories] = useState(fallbackCategories);
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [homeFAQs, setHomeFAQs] = useState(fallbackFAQs);
  const [topDestinations, setTopDestinations] = useState(staticDestinations.slice(0, 6));
  const [popularItineraries, setPopularItineraries] = useState(staticItineraries.slice(0, 3));

  // ─── Fetch settings + content from API on mount ───
  useEffect(() => {
    // Fetch site settings (hero, categories, testimonials, FAQs)
    contentApi.settings.getAll()
      .then((settings) => {
        if (settings.hero_image) setHeroImage(settings.hero_image);
        if (settings.hero_title) setHeroTitle(settings.hero_title);
        if (settings.hero_subtitle) setHeroSubtitle(settings.hero_subtitle);
        if (settings.hero_badge) setHeroBadge(settings.hero_badge);
        if (Array.isArray(settings.categories) && settings.categories.length > 0) {
          setCategories(settings.categories);
        }
        if (Array.isArray(settings.testimonials) && settings.testimonials.length > 0) {
          setTestimonials(settings.testimonials);
        }
        if (Array.isArray(settings.faqs) && settings.faqs.length > 0) {
          setHomeFAQs(settings.faqs);
        }
      })
      .catch(() => { /* fallback to hardcoded defaults silently */ });

    // Fetch destinations from API
    contentApi.destinations.list()
      .then((data) => {
        if (data && data.length > 0) setTopDestinations(data.slice(0, 6));
      })
      .catch(() => {});

    // Fetch itineraries from API
    contentApi.itineraries.list()
      .then((data) => {
        if (data && data.length > 0) setPopularItineraries(data.slice(0, 3));
      })
      .catch(() => {});
  }, []);

  // Structured data
  const destinationListSchema = generateItemListSchema({
    name: 'Top Destinations in Sri Lanka',
    description: 'Most popular tourist destinations in Sri Lanka',
    items: topDestinations.map((dest: any, index: number) => ({
      name: dest.title,
      url: `/destinations/${dest.slug}`,
      image: dest.heroImage,
      position: index + 1,
    })),
  });
  const faqSchema = generateFAQSchema(homeFAQs);

  return (
    <>
      <SEOHead
        title="Visit Sri Lanka | Travel Guide, Tours & Best Destinations 2026"
        description="Plan your perfect Sri Lanka trip! Discover ancient temples, pristine beaches, wildlife safaris, tea plantations & more. Expert travel guides, itineraries & tips for 2026."
        keywords={SEO_KEYWORDS.home}
        image={`${siteUrl}/og-image.jpg`}
        jsonLd={[destinationListSchema, faqSchema]}
        breadcrumbs={[{ name: 'Home', url: '/' }]}
      />

      {/* ═══════════════════════════════════════
          SECTION 1: CINEMATIC HERO
          ═══════════════════════════════════════ */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        {/* Background Image with slow pan */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Sri Lanka Hero"
            className="w-full h-full object-cover animate-slow-pan"
          />
          {/* Cinematic overlays */}
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-transparent to-primary-950/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-950/50 via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container-custom w-full pt-32 pb-24">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Subtitle chip */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white/90 text-sm font-medium tracking-wide mb-8 border border-white/15">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary-500" />
                </span>
                {heroBadge}
              </div>

              {/* Main headline */}
              <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-bold text-white mb-6 leading-[1.05] text-shadow-hero">
                {heroTitle.split(' ').map((word, i) => (
                  i === Math.floor(heroTitle.split(' ').length / 2) ? (
                    <span key={i}><span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-300 via-secondary-400 to-secondary-500">{word}</span>{' '}</span>
                  ) : <span key={i}>{word}{' '}</span>
                ))}
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-white/85 mb-12 leading-relaxed max-w-xl font-light">
                {heroSubtitle}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/destinations"
                  className="group px-8 py-4 bg-secondary-500 hover:bg-secondary-600 
                           text-white rounded-2xl font-bold text-lg transition-all duration-300
                           hover:shadow-[0_0_40px_-5px_rgba(232,168,73,0.5)] flex items-center justify-center gap-3"
                >
                  <Compass className="w-5 h-5" />
                  Explore Destinations
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/itineraries"
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md
                           text-white rounded-2xl font-bold text-lg border border-white/20
                           transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Play className="w-5 h-5" />
                  Plan Your Trip
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator (Love Sri Lanka style bounce) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer animate-bounce-gentle"
          onClick={() => {
            document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-white/60 text-xs font-semibold uppercase tracking-[0.2em]">
            Explore
          </span>
          <ChevronDown className="w-5 h-5 text-white/60" />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 2: DESTINATION CATEGORIES
          (Walkers Tours horizontal scroll)
          ═══════════════════════════════════════ */}
      <section id="categories" className="py-20 md:py-28 bg-sand-50 relative overflow-hidden">
        {/* Watermark text */}
        <div className="watermark-text -left-10 top-1/2 -translate-y-1/2 -rotate-90 origin-left">
          explore
        </div>

        <div className="container-custom mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">Tour Categories</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mt-4 mb-4">
              Choose Your <span className="text-primary-600">Experience</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl">
              From golden coastlines to misty highlands, discover the many faces of Sri Lanka.
            </p>
          </motion.div>
        </div>

        {/* Horizontal scroll cards */}
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 pb-4 snap-x snap-mandatory">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="snap-start flex-shrink-0 first:ml-auto last:mr-auto"
              >
                <Link
                  to={cat.link}
                  className="group relative block w-[260px] md:w-[300px] h-[400px] rounded-3xl overflow-hidden"
                >
                  {/* Image */}
                  <img
                    src={cat.image}
                    alt={cat.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {/* Decorative line (Walkers Tours style) */}
                    <div className="w-8 h-0.5 bg-secondary-400 mb-4 group-hover:w-16 transition-all duration-500" />
                    <div className="flex items-center gap-3">
                      {(() => {
                        const IconComp = typeof cat.icon === 'string' ? (iconMap[cat.icon] || Compass) : cat.icon;
                        return <IconComp className="w-5 h-5 text-secondary-400" />;
                      })()}
                      <h3 className="text-xl font-display font-bold text-white">
                        {cat.title}
                      </h3>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-6 py-3 bg-white/90 text-primary-900 font-bold rounded-xl text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      Explore →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 3: WHY VISIT SRI LANKA
          (Split layout with stats)
          ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        {/* Watermark */}
        <div className="watermark-text right-0 top-1/2 -translate-y-1/2">
          unforgettable
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — Text content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="section-label">Why Visit</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mt-4 mb-6">
                A Land Like <br />
                <span className="text-primary-600">No Other</span>
              </h2>
              <p className="text-gray-500 text-lg mb-10 leading-relaxed max-w-lg">
                Sri Lanka packs an extraordinary variety of experiences within its
                compact borders. From 8 UNESCO World Heritage Sites to over 1,340km
                of coastline, every turn reveals a new wonder.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {whyChoose.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group p-5 rounded-2xl bg-sand-50 hover:bg-white border border-transparent 
                             hover:border-sand-200 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 
                                    flex items-center justify-center group-hover:bg-primary-600 
                                    group-hover:text-white transition-colors">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-2xl font-display font-bold text-primary-600">{item.stat}</span>
                        <span className="text-xs text-gray-400 block -mt-0.5">{item.statLabel}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right — Stacked images */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative hidden lg:block"
            >
              <div className="relative h-[600px]">
                {/* Main image */}
                <div className="absolute top-0 right-0 w-[75%] h-[65%] rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1588258524675-65b32578a837?w=800&q=80"
                    alt="Sigiriya Rock Fortress"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Offset second image */}
                <div className="absolute bottom-0 left-0 w-[65%] h-[55%] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src="/images/beach-category.jpg"
                    alt="Sri Lanka Beach"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating stat card */}
                <div className="absolute top-[40%] left-[15%] bg-white rounded-2xl shadow-xl p-5 border border-sand-200">
                  <div className="text-3xl font-display font-bold text-primary-600">10K+</div>
                  <div className="text-sm text-gray-500">Happy Travelers</div>
                  <div className="flex mt-2 -space-x-2">
                    <img src="https://i.pravatar.cc/40?img=1" alt="" className="w-7 h-7 rounded-full border-2 border-white" />
                    <img src="https://i.pravatar.cc/40?img=2" alt="" className="w-7 h-7 rounded-full border-2 border-white" />
                    <img src="https://i.pravatar.cc/40?img=3" alt="" className="w-7 h-7 rounded-full border-2 border-white" />
                    <div className="w-7 h-7 rounded-full border-2 border-white bg-primary-100 text-primary-600 text-[10px] font-bold flex items-center justify-center">
                      +
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 4: POPULAR DESTINATIONS GRID
          ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-sand-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="section-label">Destinations</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mt-4">
                Popular Places
              </h2>
            </motion.div>
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors group"
            >
              View all places
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topDestinations.map((destination, index) => (
              <DestinationCard key={destination.slug} destination={destination} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 5: THALARAMBA BEACH SPOTLIGHT
          ═══════════════════════════════════════ */}
      <section className="py-16 bg-gradient-to-r from-primary-950 to-primary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
            alt="Thalaramba Beach Mirissa"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-500/20 text-secondary-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-secondary-500/30">
                <MapPin className="w-3.5 h-3.5" /> Spotlight • Mirissa
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                Discover Thalaramba Beach
              </h2>
              <p className="text-gray-200 text-lg mb-6 leading-relaxed">
                Experience Sri Lanka's hidden coastal paradise. Famous for its natural coral rock pools,
                golden palm-fringed shores, and tranquil sunset views away from tourist crowds.
              </p>
              <Link
                to="/thalaramba-beach"
                className="px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-bold rounded-xl transition-all shadow-lg inline-flex items-center gap-2"
              >
                Explore Thalaramba Beach
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 aspect-video">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"
                  alt="Thalaramba Beach"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl text-xs text-white flex items-center gap-2 border border-white/20">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-sm">4.6 / 5</span>
                  <span className="text-gray-300">(208 Reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 6: FEATURED ITINERARIES
          ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white overflow-hidden">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="section-label">Itineraries</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mt-4">
                Curated Trips
              </h2>
            </motion.div>
            <Link
              to="/itineraries"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors group"
            >
              View all trips
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {popularItineraries.map((itinerary, index) => (
              <ItineraryCard key={itinerary.slug} itinerary={itinerary} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 7: TESTIMONIALS
          (Full-bleed scenic background)
          ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1566296440364-3a9fb1df10a8?w=1920&q=80"
            alt="Sri Lanka mountains"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary-950/85 backdrop-blur-sm" />
        </div>

        {/* Watermark */}
        <div className="watermark-text left-0 bottom-0 text-white/[0.03]">
          real stories
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <span className="section-label text-primary-300">Testimonials</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mt-4 mb-4">
              Traveler Stories
            </h2>
            <p className="text-primary-100/70 text-lg max-w-2xl mx-auto">
              Hear from people who have experienced the magic of Sri Lanka.
            </p>
          </div>

          {/* Testimonial carousel */}
          <div className="max-w-3xl mx-auto relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/10 text-center"
              >
                {/* Stars */}
                <div className="flex items-center justify-center gap-1 mb-8">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-secondary-400 fill-secondary-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-white/90 text-xl md:text-2xl mb-10 leading-relaxed font-light italic">
                  "{testimonials[activeTestimonial].text}"
                </p>

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  <img
                    src={testimonials[activeTestimonial].avatar}
                    alt={testimonials[activeTestimonial].name}
                    className="w-14 h-14 rounded-full border-3 border-secondary-400"
                  />
                  <div className="text-left">
                    <h4 className="font-bold text-white text-lg">
                      {testimonials[activeTestimonial].name}
                    </h4>
                    <span className="text-sm text-primary-200/80">
                      {testimonials[activeTestimonial].location}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === activeTestimonial ? 'w-8 bg-secondary-400' : 'w-2 bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 8: FAQ ACCORDION
          (Walkers Tours split layout)
          ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left — Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="hidden lg:block sticky top-28"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl relative h-[550px]">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"
                  alt="Sri Lanka Beach FAQ"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6">
                    <h3 className="font-display font-bold text-gray-900 text-lg mb-2">
                      Still have questions?
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">
                      Our travel experts are here to help plan your perfect trip.
                    </p>
                    <Link
                      to="/contact"
                      className="btn-primary text-sm w-full justify-center"
                    >
                      Get in Touch
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right — FAQ Accordion */}
            <div>
              <span className="section-label">FAQ</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mt-4 mb-4">
                Frequently Asked <span className="text-primary-600">Questions</span>
              </h2>
              <p className="text-gray-500 text-lg mb-10">
                Everything you need to know before planning your Sri Lanka adventure.
              </p>

              <div className="divide-y divide-gray-200 border-t border-gray-200">
                {homeFAQs.map((faq, index) => (
                  <FAQItem key={faq.question} faq={faq} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 9: CTA BANNER
          ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-sand-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 rounded-[2.5rem] p-8 md:p-16 overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-400/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path fill="white" d="M44.7,-76.4C59.3,-69.2,73.3,-59.1,82.7,-45.5C92.1,-31.9,97,-14.8,95.3,1C93.6,16.7,85.3,31.1,75.6,44.5C65.9,57.9,54.8,70.3,41.1,77.3C27.4,84.3,11.1,85.9,-4.3,82.5C-19.6,79,-39.2,70.5,-53.3,58.5C-67.4,46.5,-76,31,-81.6,13.5C-87.2,-4,-89.8,-23.5,-82.7,-37.9C-75.6,-52.3,-58.8,-61.6,-42.8,-67.9C-26.8,-74.2,-11.7,-77.5,2.5,-81.6C16.8,-85.7,30.1,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
              </svg>
            </div>

            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                Ready for Your <span className="text-secondary-400">Adventure?</span>
              </h2>
              <p className="text-xl text-primary-100/80 mb-10 max-w-2xl mx-auto">
                Let us help you plan the perfect trip to Sri Lanka. Whether you seek relaxation on pristine beaches
                or adventure in the highlands, your journey starts here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/itineraries"
                  className="group px-8 py-4 bg-secondary-500 hover:bg-secondary-600 
                           text-white rounded-2xl font-bold text-lg transition-all duration-300
                           hover:shadow-[0_0_40px_-5px_rgba(232,168,73,0.5)] inline-flex items-center justify-center gap-3"
                >
                  Start Planning
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/destinations"
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md
                           text-white rounded-2xl font-bold text-lg border border-white/20
                           transition-all duration-300 inline-flex items-center justify-center gap-3"
                >
                  Browse Destinations
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
