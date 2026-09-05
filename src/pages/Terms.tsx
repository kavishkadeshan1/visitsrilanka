import { motion } from 'framer-motion';
import { SEOHead } from '@/components/seo/SEOHead';

export default function Terms() {
  return (
    <>
      <SEOHead
        title="Terms of Service"
        description="Terms of Service for Visit Sri Lanka. Please read these terms carefully before using our website."
        noindex
      />

      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center pt-20 bg-primary-950 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1711389552655-9230667c6338?q=80&w=1935&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-950/80 via-primary-950/60 to-primary-950" />
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="heading-1 text-white mb-6">Terms of Service</h1>
            <p className="text-xl text-white/80 font-light">Last updated: January 2026</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white relative z-10 -mt-10 rounded-t-[2.5rem]">
        <div className="container-custom max-w-4xl pt-10">
          <div className="prose prose-lg prose-slate max-w-none 
            prose-headings:font-display prose-headings:font-bold prose-headings:text-primary-950
            prose-p:text-slate-600 prose-p:leading-relaxed
            prose-li:text-slate-600">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Visit Sri Lanka website (visitsrilanka.online),
              you accept and agree to be bound by these Terms of Service. If you do not
              agree to these terms, please do not use our website.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              Visit Sri Lanka provides travel information, destination guides, itinerary
              suggestions, and travel planning assistance for visitors to Sri Lanka. Our
              services include connecting travelers with local guides, drivers, and
              accommodation providers.
            </p>

            <h2>3. User Responsibilities</h2>
            <p>When using our website, you agree to:</p>
            <ul>
              <li>Provide accurate information when contacting us</li>
              <li>Use the website for lawful purposes only</li>
              <li>Not attempt to disrupt website functionality</li>
              <li>Respect intellectual property rights</li>
            </ul>

            <h2>4. Content and Intellectual Property</h2>
            <p>
              All content on this website, including text, images, graphics, and logos,
              is the property of Visit Sri Lanka or its content suppliers. You may not
              reproduce, distribute, or create derivative works without written permission.
            </p>

            <h2>5. Travel Services Disclaimer</h2>
            <p>
              While we strive to provide accurate information, we cannot guarantee that
              all details (prices, availability, conditions) are current or complete.
              Travel conditions can change, and we recommend verifying information
              directly with service providers.
            </p>

            <h2>6. Third-Party Services</h2>
            <p>
              We may recommend or connect you with third-party service providers
              (hotels, drivers, guides). These providers operate independently, and
              their services are subject to their own terms and conditions. We are
              not responsible for the quality or delivery of third-party services.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              Visit Sri Lanka shall not be liable for any direct, indirect, incidental,
              or consequential damages arising from your use of our website or services.
              This includes, but is not limited to, travel disruptions, personal injury,
              or property damage.
            </p>

            <h2>8. Booking and Payments</h2>
            <p>
              When booking services through our recommendations, payment terms and
              cancellation policies are set by the individual service providers.
              Please review these terms before making any bookings.
            </p>

            <h2>9. Privacy</h2>
            <p>
              Your use of our website is also governed by our Privacy Policy. Please
              review our Privacy Policy to understand how we collect and use your
              personal information.
            </p>

            <h2>10. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time.
              Changes will be effective immediately upon posting to the website.
              Continued use of the website after changes constitutes acceptance
              of the modified terms.
            </p>

            <h2>11. Governing Law</h2>
            <p>
              These Terms of Service shall be governed by and construed in accordance
              with the laws of Sri Lanka, without regard to conflict of law principles.
            </p>

            <h2>12. Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact us at
              info@visitsrilanka.online.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
