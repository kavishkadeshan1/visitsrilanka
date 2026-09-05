import { useParams, Navigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, HelpCircle } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { TipCard } from '@/components/cards/TipCard';
import { getTipBySlug, travelTips as staticTravelTips, tipCategories } from '@/content/travel-tips';
import { generateFAQSchema } from '@/lib/seo';
import { simpleMarkdownToHtml, formatDate } from '@/lib/utils';
import { contentApi } from '@/lib/api';

export default function TravelTipDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [tip, setTip] = useState<any>(getTipBySlug(slug || ''));
  const [allTips, setAllTips] = useState<any[]>(staticTravelTips);

  useEffect(() => {
    if (slug) {
      contentApi.travelTips.get(slug)
        .then((data) => { if (data) setTip(data); })
        .catch(() => {});
    }
    contentApi.travelTips.list()
      .then((data) => { if (data && data.length > 0) setAllTips(data); })
      .catch(() => {});
  }, [slug]);

  if (!tip) {
    return <Navigate to="/travel-tips" replace />;
  }

  const categoryInfo = tipCategories[tip.category as keyof typeof tipCategories];
  const relatedTips = allTips
    .filter((t: any) => t.category === tip.category && t.slug !== tip.slug)
    .slice(0, 3);

  const faqSchema = tip.faqs && tip.faqs.length > 0 ? generateFAQSchema(tip.faqs) : undefined;

  return (
    <>
      <SEOHead
        title={tip.title}
        description={tip.shortDescription}
        image={tip.heroImage}
        jsonLd={faqSchema}
      />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${tip.heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
        </div>

        <div className="relative container-custom z-10 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                             bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium">
                <span>{categoryInfo.icon}</span>
                {categoryInfo.name}
              </span>
            </div>

            <h1 className="heading-1 text-white mb-6 leading-tight">{tip.title}</h1>
            
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              {tip.shortDescription}
            </p>

            <div className="flex items-center justify-center gap-6 text-white/70">
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Last updated {formatDate(tip.lastUpdated)}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white relative z-10 -mt-20 rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
        <div className="container-custom pt-10">
          <div className="grid lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-2 hidden lg:block">
              <div className="sticky top-32">
                 <Link to="/travel-tips" className="flex items-center gap-2 text-primary-600 hover:text-primary-800 transition-colors mb-8 font-medium">
                  <span className="rotate-180"><ArrowRight className="w-5 h-5" /></span>
                  Back to Tips
                </Link>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-8">
              <div className="prose prose-lg prose-slate max-w-none 
                prose-headings:font-display prose-headings:font-bold prose-headings:text-primary-950
                prose-p:text-slate-600 prose-p:leading-relaxed
                prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-slate-900 prose-strong:font-bold
                prose-li:text-slate-600">
                <div dangerouslySetInnerHTML={{ __html: simpleMarkdownToHtml(tip.longContent) }} />
              </div>

              {/* FAQs */}
              {tip.faqs.length > 0 && (
                <div className="mt-16 pt-12 border-t border-slate-100">
                  <h2 className="heading-3 flex items-center gap-3 mb-8">
                    <span className="bg-primary-50 p-3 rounded-full text-primary-600">
                      <HelpCircle className="w-6 h-6" />
                    </span>
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-6">
                    {tip.faqs.map((faq: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-slate-50 rounded-2xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300 border border-slate-100"
                      >
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{faq.question}</h3>
                        <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="lg:col-span-2 hidden lg:block">
               {/* Right railing - mostly empty to narrow content for readability */}
               <div className="sticky top-32 space-y-6">
                 {/* Tags */}
                <div className="space-y-3">
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Related Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {tip.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-slate-100 rounded-full text-xs font-medium text-slate-600 hover:bg-primary-50 hover:text-primary-600 transition-colors cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                 
                 <div className="bg-primary-50 rounded-2xl p-6 mt-8">
                    <h3 className="font-bold text-primary-900 mb-2">Need Help?</h3>
                    <p className="text-sm text-primary-700/80 mb-4">Planning your trip to Sri Lanka?</p>
                    <Link to="/contact" className="btn-primary w-full justify-center text-sm py-2">
                      Contact Us
                    </Link>
                 </div>
               </div>
            </div>
          </div>

          {/* Related Tips */}
          {relatedTips.length > 0 && (
            <div className="mt-24 pt-16 border-t border-slate-200">
              <div className="flex items-center justify-between mb-10">
                <h2 className="heading-2">More {categoryInfo.name} Tips</h2>
                <Link to="/travel-tips" className="text-primary-600 font-medium hover:underline flex items-center gap-2">
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedTips.map((relatedTip, idx) => (
                  <TipCard key={relatedTip.slug} tip={relatedTip} index={idx} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
