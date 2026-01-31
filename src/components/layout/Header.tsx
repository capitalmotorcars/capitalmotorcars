import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background py-3 shadow-md' : 'bg-[hsl(0_0%_3%)] py-3'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
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
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors ${
                  isScrolled
                    ? (location.pathname === link.href ? 'text-accent' : 'text-primary hover:text-accent')
                    : (location.pathname === link.href ? 'text-accent' : 'text-white/90 hover:text-white')
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link to="/contact">Schedule a Call</Link>
            </Button>
          </div>

          {/* Mobile Menu Button - 44px min touch target for accessibility */}
          <button
            className={`lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2 -m-2 transition-colors ${isScrolled ? 'text-primary' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu - animated open/close */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${
            isMobileMenuOpen ? 'max-h-[320px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className={`mt-4 pb-4 border-t ${isScrolled ? 'border-border bg-background' : 'border-white/20 bg-[hsl(0_0%_3%)]'}`}>
            <nav className="flex flex-col gap-1 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`flex items-center min-h-[44px] px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    isScrolled
                      ? (location.pathname === link.href ? 'bg-muted text-accent' : 'text-primary hover:bg-muted')
                      : (location.pathname === link.href ? 'bg-white/10 text-accent' : 'text-white/90 hover:bg-white/10')
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-4 pt-2">
                <Button asChild className="w-full min-h-[44px] bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link to="/contact">Schedule a Call</Link>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
