import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, Check } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { getWhatsAppLink, getContactEmail } from '@/lib/utils';
import { generateLocalBusinessSchema, SEO_KEYWORDS } from '@/lib/seo';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const whatsappLink = getWhatsAppLink("Hi! I'm interested in planning a trip to Sri Lanka.");
  const email = getContactEmail();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate form submission (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <>
      <SEOHead
        title="Contact Visit Sri Lanka | Plan Your Trip & Get Travel Help"
        description="Contact us to plan your perfect Sri Lanka trip! Get expert travel advice, custom itineraries & booking assistance. Reach us via WhatsApp, email or contact form."
        keywords={`${SEO_KEYWORDS.contact}, plan Sri Lanka trip, Sri Lanka travel help, book Sri Lanka tour, Sri Lanka travel agent`}
        jsonLd={generateLocalBusinessSchema()}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Contact', url: '/contact' },
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[50vh] pt-32 pb-20 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1590602392437-04c9339e7284?w=1920&q=80" 
            alt="Sri Lanka Coast" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>

        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
             className="max-w-3xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-600/90 text-white text-sm font-medium border border-white/10 shadow-lg">
                <MessageCircle className="w-4 h-4 text-white" />
                Get in Touch
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 drop-shadow-lg">Let's Plan Your Trip</h1>
            <p className="mt-4 text-xl text-white/90 leading-relaxed text-balance">
              Have questions? Want a custom itinerary? We're here to help make your
              Sri Lanka adventure unforgettable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-24 bg-white/10 relative -mt-10 rounded-t-[3rem] backdrop-blur-3xl z-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-gray-100">
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">Send Us a Message</h2>
                <p className="text-gray-500 mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-100 mb-4">
                      <Check className="w-8 h-8 text-accent-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="btn-outline"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-300'
                          } focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors`}
                        placeholder="John Smith"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-300'
                          } focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-500' : 'border-gray-300'
                          } focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors resize-none`}
                        placeholder="Tell us about your travel plans..."
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {/* WhatsApp CTA */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block card p-6 bg-[#25D366] text-white hover:bg-[#20bd5a] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <MessageCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Chat on WhatsApp</h3>
                    <p className="text-white/80">Quick responses, usually within 1 hour</p>
                  </div>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${email}`}
                className="block card p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary-100 rounded-xl">
                    <Mail className="w-8 h-8 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Email Us</h3>
                    <p className="text-gray-600">{email}</p>
                  </div>
                </div>
              </a>

              {/* Phone */}
              <div className="card p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary-100 rounded-xl">
                    <Phone className="w-8 h-8 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Call Us</h3>
                    <p className="text-gray-600">Available during Sri Lanka business hours</p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="card p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary-100 rounded-xl">
                    <MapPin className="w-8 h-8 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Based in Sri Lanka</h3>
                    <p className="text-gray-600">Colombo, Sri Lanka (GMT+5:30)</p>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="card p-6 bg-primary-50 border-primary-100">
                <h3 className="font-bold text-primary-900 mb-2">We Typically Reply Within</h3>
                <ul className="space-y-2 text-primary-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent-600" />
                    WhatsApp: 1 hour
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent-600" />
                    Email: 24 hours
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent-600" />
                    Custom itinerary: 48 hours
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
