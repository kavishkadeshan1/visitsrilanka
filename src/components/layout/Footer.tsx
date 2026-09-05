import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Phone, MapPin } from 'lucide-react';
import { getWhatsAppLink, getContactEmail } from '@/lib/utils';

const footerLinks = {
  destinations: [
    { label: 'Sigiriya', href: '/destinations/sigiriya' },
    { label: 'Galle Fort', href: '/destinations/galle' },
    { label: 'Ella', href: '/destinations/ella' },
    { label: 'Kandy', href: '/destinations/kandy' },
    { label: 'Yala National Park', href: '/destinations/yala-national-park' },
    { label: 'All Destinations', href: '/destinations' },
  ],
  itineraries: [
    { label: '5-Day Highlights', href: '/itineraries/5-day-highlights' },
    { label: '7-Day Cultural', href: '/itineraries/7-day-cultural-heritage' },
    { label: '10-Day Ultimate', href: '/itineraries/10-day-ultimate-sri-lanka' },
    { label: 'Budget Backpacker', href: '/itineraries/budget-backpacker' },
    { label: 'Luxury Wellness', href: '/itineraries/luxury-wellness-retreat' },
    { label: 'All Itineraries', href: '/itineraries' },
  ],
  resources: [
    { label: 'Visa & ETA Guide', href: '/travel-tips/sri-lanka-visa-eta' },
    { label: 'Best Time to Visit', href: '/travel-tips/best-time-to-visit' },
    { label: 'Travel Tips', href: '/travel-tips' },
    { label: 'Blog', href: '/blog' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/visitsrilanka', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/visitsrilanka', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com/visitsrilanka', label: 'Twitter' },
  { icon: Youtube, href: 'https://youtube.com/visitsrilanka', label: 'YouTube' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappLink = getWhatsAppLink();
  const email = getContactEmail();

  return (
    <footer className="bg-primary-950 text-white/80 relative overflow-hidden" role="contentinfo">
      {/* Scenic background overlay */}
      <div className="absolute inset-0 opacity-[0.04]">
        <img
          src="/images/hero-nine-arch.jpg"
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
      </div>

      {/* Decorative gradient blobs */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-800/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[400px] h-[400px] bg-secondary-900/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Content */}
      <div className="container-custom py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-block group">
              <span className="font-display text-3xl font-bold tracking-tight text-white">
                Visit{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-secondary-500 group-hover:from-secondary-300 group-hover:to-secondary-400 transition-all">
                  Sri Lanka
                </span>
              </span>
            </Link>
            <p className="text-neutral-400 max-w-sm text-lg leading-relaxed">
              Your gateway to exploring the wonders of Sri Lanka. From ancient temples to pristine beaches,
              we help you discover the Pearl of the Indian Ocean.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 pt-2">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary-600 transition-colors border border-white/10">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="font-medium">WhatsApp Us</span>
              </a>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary-600 transition-colors border border-white/10">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="font-medium">{email}</span>
              </a>
              <div className="flex items-center gap-3 text-neutral-400 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="font-medium">Colombo, Sri Lanka</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center 
                           text-neutral-400 hover:bg-secondary-500 hover:text-white transition-all 
                           duration-300 hover:scale-110 border border-white/10 hover:border-secondary-500"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="font-display font-semibold text-white text-lg mb-6 relative">
              <span className="relative">
                Destinations
                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-secondary-500" />
              </span>
            </h3>
            <ul className="space-y-3">
              {footerLinks.destinations.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-neutral-400 hover:text-secondary-400 transition-colors inline-block hover:translate-x-1 duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Itineraries */}
          <div>
            <h3 className="font-display font-semibold text-white text-lg mb-6 relative">
              <span className="relative">
                Itineraries
                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-secondary-500" />
              </span>
            </h3>
            <ul className="space-y-3">
              {footerLinks.itineraries.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-neutral-400 hover:text-secondary-400 transition-colors inline-block hover:translate-x-1 duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-display font-semibold text-white text-lg mb-6 relative">
              <span className="relative">
                Resources
                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-secondary-500" />
              </span>
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-neutral-400 hover:text-secondary-400 transition-colors inline-block hover:translate-x-1 duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 relative z-10">
        <div className="container-custom py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-500 font-medium">
            © {currentYear} Visit Sri Lanka. All rights reserved.
          </p>
          <div className="flex gap-8">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-neutral-500 hover:text-white transition-colors hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
