import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { TipCard } from '@/components/cards/TipCard';
import { travelTips as staticTravelTips, tipCategories } from '@/content/travel-tips';
import { generateFAQSchema, generateItemListSchema, SEO_KEYWORDS } from '@/lib/seo';
import { contentApi } from '@/lib/api';

export default function TravelTips() {
  const [travelTips, setTravelTips] = useState<any[]>(staticTravelTips);

  useEffect(() => {
    contentApi.travelTips.list()
      .then((data) => { if (data && data.length > 0) setTravelTips(data); })
      .catch(() => {});
  }, []);

  // Group tips by category
  const tipsByCategory = Object.entries(tipCategories).map(([key, category]) => ({
    key: key as keyof typeof tipCategories,
    ...category,
    tips: travelTips.filter((t: any) => t.category === key),
  })).filter(group => group.tips.length > 0);

  // Generate FAQ schema from travel tips
  const faqSchema = generateFAQSchema([
    { question: 'Do I need a visa to visit Sri Lanka?', answer: 'Most visitors need an Electronic Travel Authorization (ETA) which can be obtained online. It costs around $50 USD and allows a 30-day stay.' },
    { question: 'What is the best time to visit Sri Lanka?', answer: 'Sri Lanka can be visited year-round. The west and south coasts are best from December to April, while the east coast is ideal from May to September.' },
    { question: 'Is Sri Lanka safe for tourists?', answer: 'Yes, Sri Lanka is considered one of the safest destinations in Asia. The locals are friendly and tourism infrastructure is well-developed.' },
    { question: 'What currency is used in Sri Lanka?', answer: 'The Sri Lankan Rupee (LKR) is the local currency. ATMs are widely available and credit cards are accepted in major establishments.' },
    { question: 'How do I get around Sri Lanka?', answer: 'Options include trains (scenic and affordable), tuk-tuks, private drivers, buses, and domestic flights. Many tourists hire a driver for flexibility.' },
  ]);

  const tipsListSchema = generateItemListSchema({
    name: 'Sri Lanka Travel Tips',
    description: 'Essential travel guides and tips for visiting Sri Lanka',
    items: travelTips.map((tip: any, index: number) => ({
      name: tip.title,
      url: `/travel-tips/${tip.slug}`,
      image: tip.heroImage,
      position: index + 1,
    })),
  });

  return (
    <>
      <SEOHead
        title="Sri Lanka Travel Tips 2026 | Visa, Safety, Money & Essential Guides"
        description="Complete Sri Lanka travel guide with visa requirements, safety tips, money advice, transport options, cultural etiquette & packing lists. Everything you need for your trip!"
        keywords={`${SEO_KEYWORDS.travelTips}, Sri Lanka visa, Sri Lanka ETA, Sri Lanka currency, Sri Lanka safety, Sri Lanka transport, Sri Lanka packing list, Sri Lanka customs`}
        jsonLd={[faqSchema, tipsListSchema]}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Travel Tips', url: '/travel-tips' },
        ]}
      />

      <section className="relative min-h-[60vh] flex items-center pt-32 pb-20 overflow-hidden bg-primary-950">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1711389552655-9230667c6338?q=80&w=1935&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-950/80 via-primary-950/60 to-primary-950" />
        
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-600/90 text-white text-sm font-medium border border-white/10 shadow-lg">
                <BookOpen className="w-4 h-4 text-white" />
                {travelTips.length} Helpful Guides
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 drop-shadow-lg">Essential Travel Tips</h1>
            <p className="mt-4 text-lg md:text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed shadow-sm">
              Everything you need to know for a smooth and memorable journey through the pearl of the Indian Ocean, from visas to local etiquette.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tips by Category */}
      <section className="section-padding bg-zinc-50 relative z-10 -mt-20 rounded-t-[2.5rem]">
        <div className="container-custom space-y-20 pt-10">
          {tipsByCategory.map((group) => (
            <div key={group.key} className="space-y-8">
              <div className="flex items-center gap-4 pb-4 border-b border-primary-100">
                <span className="text-3xl p-3 bg-white rounded-2xl shadow-sm">{group.icon}</span>
                <h2 className="heading-2 !mb-0 text-primary-900">{group.name}</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {group.tips.map((tip, index) => (
                  <TipCard key={tip.slug} tip={tip} index={index} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
