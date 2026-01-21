import { Link } from 'react-router-dom';
import logo from '@/assets/logo-main.svg';

const footerLinks = {
  services: [
    { href: '/services/car-leasing', label: 'Car Leasing' },
    { href: '/services/financing', label: 'Financing' },
    { href: '/services/trade-in', label: 'Trade-In' },
    { href: '/services/wear-and-tear', label: 'Wear & Tear Repair' },
    { href: '/services/wheel-repair', label: 'Wheel & Tire Repair' },
    { href: '/services/detailing', label: 'Car Detailing' },
  ],
  company: [
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
  legal: [
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms-of-service', label: 'Terms of Service' },
  ],
};

export function Footer() {
  return (
    <footer style={{ backgroundColor: 'hsl(216 27% 6%)' }} className="text-white">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img 
                src={logo} 
                alt="Capital Motor Cars" 
                className="h-10 w-auto brightness-0 invert" 
              />
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: 'hsl(213 27% 84%)' }}>
              Simple, stress-free automotive solutions.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-white transition-colors"
                    style={{ color: 'hsl(213 27% 70%)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-white transition-colors"
                    style={{ color: 'hsl(213 27% 70%)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-white transition-colors"
                    style={{ color: 'hsl(213 27% 70%)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8" style={{ borderTop: '1px solid hsl(213 27% 20%)' }}>
          <p className="text-sm text-center" style={{ color: 'hsl(213 27% 50%)' }}>
            © {new Date().getFullYear()} Capital Motor Cars. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
