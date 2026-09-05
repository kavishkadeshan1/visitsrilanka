import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, X, MapPin, Calendar, BookOpen, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { searchContent, type SearchResult } from '@/content';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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
  blog: 'Blog',
};

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Handle search
  useEffect(() => {
    const searchResults = searchContent(query);
    setResults(searchResults);
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          if (results[selectedIndex]) {
            navigate(results[selectedIndex].url);
            onClose();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, navigate, onClose]);

  // Open with Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (!isOpen) {
          // Parent should handle opening
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-x-4 top-20 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 
                       md:w-full md:max-w-2xl z-50"
            role="dialog"
            aria-modal="true"
            aria-label="Search"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 p-4 border-b">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search destinations, itineraries, tips..."
                  className="flex-1 text-lg outline-none placeholder:text-gray-400"
                  aria-label="Search query"
                />
                <button
                  onClick={onClose}
                  className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {query.length > 1 && results.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    No results found for "{query}"
                  </div>
                ) : results.length > 0 ? (
                  <ul className="py-2">
                    {results.map((result, index) => {
                      const Icon = typeIcons[result.type];
                      return (
                        <li key={`${result.type}-${result.slug}`}>
                          <Link
                            to={result.url}
                            onClick={onClose}
                            className={`flex items-start gap-3 px-4 py-3 transition-colors ${index === selectedIndex
                                ? 'bg-primary-50'
                                : 'hover:bg-gray-50'
                              }`}
                          >
                            <div className="flex-shrink-0 p-2 rounded-lg bg-primary-100 text-primary-600">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 truncate">
                                {result.title}
                              </div>
                              <div className="text-sm text-gray-500 truncate">
                                {result.description}
                              </div>
                              <div className="text-xs text-primary-600 mt-1">
                                {typeLabels[result.type]}
                              </div>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ) : query.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    Start typing to search...
                  </div>
                ) : null}
              </div>

              {/* Footer */}
              <div className="p-3 border-t bg-gray-50 flex items-center justify-between text-xs text-gray-500">
                <span>Press Enter to select</span>
                <span className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-white rounded border text-gray-700">↑</kbd>
                  <kbd className="px-2 py-1 bg-white rounded border text-gray-700">↓</kbd>
                  <span>to navigate</span>
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
