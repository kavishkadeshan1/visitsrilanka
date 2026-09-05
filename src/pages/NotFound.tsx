import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, MapPin, Calendar, BookOpen, Mail } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';

const quickLinks = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: MapPin, label: 'Destinations', href: '/destinations' },
  { icon: Calendar, label: 'Itineraries', href: '/itineraries' },
  { icon: BookOpen, label: 'Travel Tips', href: '/travel-tips' },
  { icon: Mail, label: 'Contact Us', href: '/contact' },
];

export default function NotFound() {
  return (
    <>
      <SEOHead
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Explore our destinations, itineraries, and travel tips instead."
        noindex
      />

      <section className="min-h-screen flex items-center justify-center py-32">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* 404 Illustration */}
            <div className="relative inline-block mb-8">
              <span className="text-[8rem] md:text-[12rem] font-bold text-gray-100 select-none">
                404
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl">🏝️</span>
              </div>
            </div>

            <h1 className="heading-2 text-gray-900">Page Not Found</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-md mx-auto">
              Looks like you've wandered off the beaten path.
              Let's get you back to exploring Sri Lanka!
            </p>

            {/* Quick Links */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4 max-w-3xl mx-auto">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Link
                    to={link.href}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 
                             hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    <link.icon className="w-6 h-6" />
                    <span className="text-sm font-medium">{link.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12"
            >
              <Link to="/" className="btn-primary inline-flex">
                <Home className="w-5 h-5" />
                Back to Homepage
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
