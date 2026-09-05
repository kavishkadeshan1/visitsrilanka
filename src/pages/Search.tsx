import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, MapPin, Calendar, BookOpen, FileText, ArrowRight } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { searchContent, type SearchResult } from '@/content';

const typeIcons = {
  destination: MapPin,
  itinerary: Calendar,
  tip: BookOpen,
  blog: FileText,
};

const typeLabels = {
  destination: 'Destination',
  itinerary: 'Itinerary',
  tip: 'Travel Tip',
  blog: 'Blog Post',
};

const typeColors = {
  destination: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  itinerary: 'bg-sky-50 text-sky-700 border-sky-100',
  tip: 'bg-amber-50 text-amber-700 border-amber-100',
  blog: 'bg-rose-50 text-rose-700 border-rose-100',
};

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(queryParam);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'destination' | 'itinerary' | 'tip' | 'blog'>('all');

  // Synchronize state when URL parameter changes
  useEffect(() => {
    setQuery(queryParam);
  }, [queryParam]);

  // Execute search when query changes
  useEffect(() => {
    const searchResults = searchContent(query);
    setResults(searchResults);
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: query });
  };

  const filteredResults = activeTab === 'all'
    ? results
    : results.filter(r => r.type === activeTab);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
  };

  return (
    <>
      <SEOHead
        title={query ? `Search Results for "${query}" | Visit Sri Lanka` : "Search Destinations & Travel Guides | Visit Sri Lanka"}
        description="Search for the best travel destinations, itineraries, travel tips, and blog posts to plan your perfect Sri Lanka vacation."
        keywords="search Sri Lanka, Sri Lanka search engine, explore Sri Lanka, Sri Lanka vacation planning"
        noindex={true} // Keep search query results out of index to avoid duplicate content penalty
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Search', url: '/search' },
        ]}
      />

      {/* Hero Header */}
      <section className="relative min-h-[40vh] pt-32 pb-16 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1546708973-b339540b5162?w=1920&q=80" 
            alt="Search Sri Lanka Guide" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-black/20 to-black/65" />
        </div>

        <div className="relative container-custom text-center z-10 w-full max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 drop-shadow-md">
              Search Travel Guide
            </h1>
            
            <form onSubmit={handleSearchSubmit} className="relative flex items-center max-w-2xl mx-auto">
              <div className="relative w-full shadow-2xl rounded-2xl overflow-hidden bg-white/95 backdrop-blur-md border border-white/20 flex">
                <div className="flex items-center pl-4 text-gray-400">
                  <SearchIcon className="w-6 h-6" />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type destinations, travel tips, itineraries..."
                  className="w-full py-4 pl-3 pr-4 text-gray-900 placeholder:text-gray-400 outline-none text-lg"
                  aria-label="Search site content"
                />
                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-4 transition-colors flex items-center gap-1.5"
                >
                  <span>Search</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Search Results Area */}
      <section className="py-12 bg-gray-50 min-h-[50vh]">
        <div className="container-custom max-w-5xl mx-auto px-4">
          
          {/* Categories Tab Bar */}
          {results.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8 border-b pb-4">
              {[
                { id: 'all', label: `All Results (${results.length})` },
                { id: 'destination', label: `Destinations (${results.filter(r => r.type === 'destination').length})` },
                { id: 'itinerary', label: `Itineraries (${results.filter(r => r.type === 'itinerary').length})` },
                { id: 'tip', label: `Travel Tips (${results.filter(r => r.type === 'tip').length})` },
                { id: 'blog', label: `Blog Posts (${results.filter(r => r.type === 'blog').length})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 text-sm font-medium rounded-full border transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary-600 border-primary-600 text-white shadow-md shadow-primary-100'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          {/* Results Grid / List */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + '-' + query}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-6"
            >
              {filteredResults.length > 0 ? (
                filteredResults.map((result) => {
                  const IconComponent = typeIcons[result.type];
                  return (
                    <motion.div
                      key={`${result.type}-${result.slug}`}
                      variants={itemVariants}
                      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
                    >
                      <Link to={result.url} className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${typeColors[result.type]}`}>
                              <IconComponent className="w-3.5 h-3.5" />
                              {typeLabels[result.type]}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                            {result.title}
                          </h3>
                          <p className="text-gray-500 text-sm max-w-3xl line-clamp-2">
                            {result.description}
                          </p>
                        </div>
                        
                        <div className="flex items-center text-primary-600 font-semibold text-sm gap-1 group-hover:translate-x-1 transition-transform self-end md:self-auto shrink-0">
                          <span>Explore</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-2xl p-12 border border-gray-100 text-center max-w-lg mx-auto shadow-sm"
                >
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <SearchIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-500 text-sm mb-6">
                    {query.trim().length > 0 
                      ? `We couldn't find anything matching "${query}". Try searching for keywords like "Sigiriya", "Beach", "Train", or "Ella".`
                      : "Start typing above to search destinations, itineraries, travel tips, and blog posts."}
                  </p>
                  {query.trim().length > 0 && (
                    <button
                      onClick={() => setQuery('')}
                      className="px-4 py-2 text-sm font-semibold text-primary-600 hover:text-primary-700 bg-primary-50 rounded-lg transition-colors"
                    >
                      Clear Search
                    </button>
                  )}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

        </div>
      </section>
    </>
  );
}
