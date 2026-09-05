import { motion } from 'framer-motion';
import { Heart, Users, Award, Globe } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { generateWebPageSchema } from '@/lib/seo';

const stats = [
  { value: '500+', label: 'Happy Travelers' },
  { value: '50+', label: 'Custom Itineraries' },
  { value: '5★', label: 'Average Rating' },
  { value: '24/7', label: 'Support' },
];

const values = [
  {
    icon: Heart,
    title: 'Passion for Sri Lanka',
    description: 'We love our island and can\'t wait to share its wonders with you.',
  },
  {
    icon: Users,
    title: 'Local Expertise',
    description: 'Our team knows every hidden gem, best restaurant, and secret beach.',
  },
  {
    icon: Award,
    title: 'Quality First',
    description: 'We partner only with trusted guides, drivers, and accommodations.',
  },
  {
    icon: Globe,
    title: 'Sustainable Travel',
    description: 'We promote responsible tourism that benefits local communities.',
  },
];

export default function About() {
  const aboutPageSchema = generateWebPageSchema({
    name: 'About Visit Sri Lanka',
    description: 'Learn about Visit Sri Lanka - your trusted travel partner for exploring Sri Lanka',
    url: '/about',
    type: 'AboutPage',
  });

  return (
    <>
      <SEOHead
        title="About Visit Sri Lanka | Your Trusted Sri Lanka Travel Partner"
        description="Discover Visit Sri Lanka - your expert travel partner for the Pearl of the Indian Ocean. Local expertise, sustainable tourism & personalized itineraries since 2024."
        keywords="about Visit Sri Lanka, Sri Lanka travel company, Sri Lanka tour operator, Sri Lanka travel experts, sustainable Sri Lanka tourism"
        jsonLd={aboutPageSchema}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'About', url: '/about' },
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[50vh] pt-32 pb-20 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1707236606614-fbee3070f156?q=80&w=2127&auto=format&fit=crop" 
            alt="Sri Lanka Landscape" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60" />
        </div>

        <div className="relative container-custom text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
             className="max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-600/90 text-white text-sm font-medium border border-white/10 shadow-lg">
                <Users className="w-4 h-4 text-white" />
                Who We Are
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 drop-shadow-lg">About Us</h1>
            <p className="mt-4 text-lg md:text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed shadow-sm">
              Your trusted travel partner for discovering the wonders of Sri Lanka. We turn moments into memories.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-white relative">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg"
            >
              <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">Helping You Experience the <span className="text-primary-600">Real</span> Sri Lanka</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                We believe that travel should be transformative. Not just ticking off landmarks,
                but truly connecting with a place—its people, its culture, its story.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                That's why we created Visit Sri Lanka: to help travelers like you go beyond
                the tourist trail and discover the authentic heart of our beautiful island.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Whether you're seeking ancient temples, pristine beaches, thrilling safaris,
                or simply a peaceful retreat, we're here to make it happen.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
                 <img
                  src="https://images.unsplash.com/photo-1566766189268-ecac9118f2b7?q=80&w=2070&auto=format&fit=crop"
                  alt="Sri Lanka landscape"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              
              <div className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-md p-8 rounded-[2rem] shadow-xl border border-white/20 max-w-xs">
                <div className="flex items-center gap-4 mb-2">
                   <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-lg">24</div>
                   <div>
                      <div className="text-3xl font-display font-bold text-gray-900">Est.</div>
                      <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">2024</div>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary-600">{stat.value}</div>
                <div className="mt-2 text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-semibold">What We Stand For</span>
            <h2 className="heading-2 mt-2">Our Values</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card p-6 text-center"
              >
                <div className="inline-flex p-4 rounded-2xl bg-primary-100 mb-4">
                  <value.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{value.title}</h3>
                <p className="mt-2 text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="section-padding bg-primary-900 text-white">
        <div className="container-custom text-center">
          <h2 className="heading-2">Why Travelers Trust Us</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-secondary-400 font-bold text-lg">Local Knowledge</div>
              <p className="mt-2 text-white/80">
                We're Sri Lankan. We know the best spots, the real prices, and the hidden gems.
              </p>
            </div>
            <div>
              <div className="text-secondary-400 font-bold text-lg">Personalized Service</div>
              <p className="mt-2 text-white/80">
                No cookie-cutter tours. Every itinerary is crafted around your interests.
              </p>
            </div>
            <div>
              <div className="text-secondary-400 font-bold text-lg">Honest Advice</div>
              <p className="mt-2 text-white/80">
                We'll tell you what's worth your time (and what's overrated).
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
