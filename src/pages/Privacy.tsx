import { motion } from 'framer-motion';
import { SEOHead } from '@/components/seo/SEOHead';

export default function Privacy() {
  return (
    <>
      <SEOHead
        title="Privacy Policy"
        description="Privacy Policy for Visit Sri Lanka. Learn how we collect, use, and protect your personal information."
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
            <h1 className="heading-1 text-white mb-6">Privacy Policy</h1>
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
            <h2>1. Introduction</h2>
            <p>
              Visit Sri Lanka ("we," "us," or "our") is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our website visitsrilanka.online.
            </p>

            <h2>2. Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>We may collect personal information that you voluntarily provide, including:</p>
            <ul>
              <li>Name and email address (when you contact us)</li>
              <li>Phone number (when you request a call back)</li>
              <li>Travel preferences and requirements</li>
              <li>Any other information you choose to provide</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <p>When you visit our website, we may automatically collect:</p>
            <ul>
              <li>IP address and browser type</li>
              <li>Pages visited and time spent</li>
              <li>Referring website</li>
              <li>Device information</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Respond to your inquiries and requests</li>
              <li>Provide travel planning assistance</li>
              <li>Improve our website and services</li>
              <li>Send relevant travel information (with your consent)</li>
              <li>Analyze website usage patterns</li>
            </ul>

            <h2>4. Sharing Your Information</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties.
              We may share information with trusted partners who assist us in operating
              our website and providing services, subject to confidentiality agreements.
            </p>

            <h2>5. Cookies and Tracking</h2>
            <p>
              Our website may use cookies and similar tracking technologies to enhance
              user experience and analyze website traffic. You can control cookie settings
              through your browser preferences.
            </p>

            <h2>6. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information.
              However, no method of transmission over the internet is 100% secure, and we
              cannot guarantee absolute security.
            </p>

            <h2>7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt out of marketing communications</li>
            </ul>

            <h2>8. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible
              for the privacy practices of these external sites.
            </p>

            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted
              on this page with an updated revision date.
            </p>

            <h2>10. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at
              info@visitsrilanka.online.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
