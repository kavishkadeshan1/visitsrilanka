import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Search, Phone, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const navLinks = [
  {
    href: '/destinations',
    label: 'Destinations',
    children: [
      { href: '/destinations', label: 'All Destinations' },
      { href: '/destinations/sigiriya', label: 'Sigiriya' },
      { href: '/destinations/galle', label: 'Galle Fort' },
      { href: '/destinations/ella', label: 'Ella' },
      { href: '/destinations/kandy', label: 'Kandy' },
      { href: '/destinations/yala-national-park', label: 'Yala National Park' },
    ],
  },
  { href: '/itineraries', label: 'Itineraries' },
  { href: '/travel-tips', label: 'Travel Tips' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

interface NavbarProps {
  onSearchOpen: () => void;
}

export function Navbar({ onSearchOpen }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-sand-200/60 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <nav className="container-custom" aria-label="Main navigation">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-1.5 font-display text-xl md:text-2xl font-bold relative z-10"
            aria-label="Visit Sri Lanka - Home"
          >
            <span className={cn(
              'transition-colors duration-300',
              isScrolled ? 'text-primary-700' : 'text-white'
            )}>
              Visit
            </span>
            <span className={cn(
              'transition-colors duration-300',
              isScrolled ? 'text-secondary-500' : 'text-secondary-400'
            )}>
              Sri Lanka
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative group"
                onMouseEnter={() => link.children && setOpenDropdown(link.href)}
                onMouseLeave={() => link.children && setOpenDropdown(null)}
              >
                <NavLink
                  to={link.href}
                  className={({ isActive }: { isActive: boolean }) =>
                    cn(
                      'px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-1',
                      isScrolled
                        ? isActive
                          ? 'text-primary-700 bg-primary-50'
                          : 'text-gray-700 hover:text-primary-700 hover:bg-sand-100'
                        : isActive
                          ? 'text-white bg-white/15'
                          : 'text-white/85 hover:text-white hover:bg-white/10'
                    )
                  }
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown className={cn(
                      'w-3.5 h-3.5 transition-transform',
                      openDropdown === link.href && 'rotate-180'
                    )} />
                  )}
                </NavLink>

                {/* Dropdown (Love Sri Lanka style) */}
                {link.children && (
                  <AnimatePresence>
                    {openDropdown === link.href && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-1 w-56 bg-white rounded-2xl shadow-xl border border-sand-200/60 overflow-hidden z-50"
                      >
                        <div className="py-2">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              to={child.href}
                              className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-primary-700 hover:bg-primary-50 transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Search Button */}
            <button
              onClick={onSearchOpen}
              className={cn(
                'p-2.5 rounded-xl transition-colors',
                isScrolled
                  ? 'text-gray-500 hover:text-primary-700 hover:bg-sand-100'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              )}
              aria-label="Open search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Contact CTA */}
            <Link
              to="/contact"
              className={cn(
                'inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-semibold text-sm transition-all duration-300',
                isScrolled
                  ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-500/20'
                  : 'bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm border border-white/20'
              )}
            >
              <Phone className="w-4 h-4" />
              Plan My Trip
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onSearchOpen}
              className={cn(
                'p-2 rounded-lg',
                isScrolled ? 'text-gray-600' : 'text-white'
              )}
              aria-label="Open search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                'p-2 rounded-lg',
                isScrolled ? 'text-gray-600' : 'text-white'
              )}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/50 md:hidden z-40 backdrop-blur-sm"
              />

              {/* Drawer */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 bottom-0 w-[300px] bg-white shadow-2xl md:hidden z-50 flex flex-col"
              >
                <div className="flex items-center justify-between p-5 border-b border-sand-100">
                  <span className="font-display text-xl font-bold text-primary-700">Menu</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-xl text-gray-500 hover:bg-sand-100 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
                  {navLinks.map((link) => (
                    <div key={link.href}>
                      <NavLink
                        to={link.href}
                        onClick={() => !link.children && setIsMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          cn(
                            'block px-4 py-3 rounded-xl font-medium transition-colors',
                            isActive
                              ? 'bg-primary-50 text-primary-700'
                              : 'text-gray-700 hover:bg-sand-50 hover:text-primary-600'
                          )
                        }
                      >
                        {link.label}
                      </NavLink>
                      {link.children && (
                        <div className="ml-4 mt-1 space-y-0.5">
                          {link.children.slice(1).map((child) => (
                            <Link
                              key={child.href}
                              to={child.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block px-4 py-2 text-sm text-gray-500 hover:text-primary-600 rounded-lg hover:bg-sand-50 transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="pt-4 mt-4 border-t border-sand-100">
                    <button
                      onClick={() => {
                        onSearchOpen();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 text-left text-gray-700 rounded-xl hover:bg-sand-50 font-medium"
                    >
                      <Search className="w-5 h-5 text-gray-500" />
                      Search
                    </button>
                  </div>
                </div>

                <div className="p-4 border-t border-sand-100 bg-sand-50">
                  <Link
                    to="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex justify-center w-full btn-primary"
                  >
                    <Phone className="w-4 h-4" />
                    Plan My Trip
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
