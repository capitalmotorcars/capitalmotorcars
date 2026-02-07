import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';
import logo from '@/assets/logo-main.png';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/brands', label: 'Brands' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md py-3 shadow-lg dark:bg-black/80 dark:backdrop-blur-md'
          : 'bg-background py-3 dark:bg-black'
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src={logo}
              alt="Capital Motor Cars"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="h-10 sm:h-12 md:h-14 w-auto transition-all duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'group relative px-4 py-2.5 text-sm font-medium rounded-md transition-colors duration-200',
                    'text-primary hover:text-accent dark:text-white/90 dark:hover:text-white',
                    active && 'text-accent dark:text-white',
                    'hover:bg-black/5 dark:hover:bg-white/5'
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      'absolute bottom-1 left-4 right-4 h-0.5 rounded-full bg-accent transition-opacity duration-200',
                      active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    )}
                    aria-hidden
                  />
                </Link>
              );
            })}
          </nav>

          {/* Theme toggle + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <Button asChild variant="ghost" size="sm" className="border border-black/50 dark:border-white/50 hover:border-black/80 hover:text-black bg-white/20 dark:bg-white/[0.06] text-black/90 dark:text-white/90 hover:bg-white/15 dark:hover:bg-white/10 font-medium shadow-md shadow-black/5 dark:shadow-black/20 backdrop-blur-sm hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-black/30">
              <Link to="/quiz" className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Start Quiz
              </Link>
            </Button>
            <Button asChild size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium shadow-sm">
              <Link to="/contact">Schedule a Call</Link>
            </Button>
          </div>

          {/* Mobile: theme toggle + menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-primary dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300 ease-out',
            isMobileMenuOpen ? 'max-h-[450px] opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="mt-4 pt-4 pb-2 border-t border-border dark:border-white/10 bg-background dark:bg-black">
            <nav className="flex flex-col gap-0.5 px-2" aria-label="Mobile navigation">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      'flex items-center min-h-[48px] px-4 py-3 text-sm font-medium rounded-lg transition-colors border-l-2 border-transparent -ml-0.5 pl-[18px]',
                      active
                        ? 'bg-accent/10 text-accent dark:bg-white/10 dark:text-white border-accent'
                        : 'text-primary hover:bg-accent/10 hover:text-accent dark:text-white/90 dark:hover:bg-white/10 dark:hover:text-white hover:border-accent'
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-3 pt-3 mx-2 border-t border-border dark:border-white/10 space-y-2">
              <Button asChild variant="outline" className="w-full min-h-[48px] border-accent/40 dark:border-white/40 text-accent dark:text-white font-medium">
                <Link to="/quiz" className="flex items-center justify-center gap-2">
                  <Search className="w-4 h-4" />
                  Find Your Vehicle
                </Link>
              </Button>
              <Button asChild className="w-full min-h-[48px] bg-accent hover:bg-accent/90 text-accent-foreground font-medium">
                <Link to="/contact">Schedule a Call</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
