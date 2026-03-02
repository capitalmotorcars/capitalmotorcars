import { Link } from 'react-router-dom';
import { MapPin, Phone, Building, Facebook, Instagram, Twitter } from 'lucide-react';
import logo from '@/assets/logo-main-footer.png';

const locations = [
  {
    name: 'Corporate Office',
    city: 'Springfield, NJ',
    address: '251 Morris Avenue, Springfield Township, NJ 07081',
    phone: '201-509-5555',
    fax: '201-603-6588',
  },
  {
    name: 'The View',
    city: 'Marlton, NJ',
    address: '105 Merchant Way Marlton, NJ 08053',
    phone: '856-553-5555',
    fax: '856-295-8442',
  }
];

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
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/credit-application', label: 'Credit Application' },
  ],
  legal: [
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms-of-service', label: 'Terms of Service' },
  ],
};

const socialLinks = [
  { href: 'https://facebook.com', icon: Facebook, label: 'Facebook' },
  { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
  { href: 'https://twitter.com', icon: Twitter, label: 'X (Twitter)' },
];

// Yelp icon (not in Lucide)
function YelpIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.271 6.403c-.003-.602-.396-1.025-.872-1.025-.152 0-.312.037-.475.116L4.42 8.62c-.536.26-.808.713-.796 1.13.012.374.249.706.631.898l2.395 1.207c.225.114.458.17.687.17.462 0 .899-.248 1.123-.678l3.695-7.192c.073-.143.116-.277.116-.397v-.005zm.057 5.612c-.008-.38-.232-.694-.587-.851l-2.395-1.053c-.17-.075-.344-.112-.515-.112-.407 0-.791.207-1.012.563l-2.47 3.967c-.142.228-.213.469-.213.716 0 .47.252.914.681 1.166l.632.371c.227.134.47.2.721.2.465 0 .894-.238 1.131-.627l3.863-3.674c.11-.104.164-.229.164-.366v-.3zm-.019 2.457c-.004-.247-.119-.467-.315-.604l-.314-.219c-.15-.104-.32-.156-.497-.156-.287 0-.559.137-.728.374l-1.925 2.715c-.11.156-.166.335-.166.534 0 .325.175.623.469.799l.486.29c.168.101.353.15.55.15.358 0 .69-.187.883-.498l1.447-2.738c.063-.119.11-.252.11-.397v-.25zm2.138-2.014c-.006-.22-.083-.427-.22-.601l-.217-.274c-.19-.239-.47-.377-.77-.377-.218 0-.428.066-.609.192l-2.174 1.525c-.223.156-.355.406-.355.668 0 .286.156.552.405.693l2.525 1.428c.144.081.302.122.469.122.306 0 .585-.148.765-.398l.116-.163c.165-.232.26-.509.26-.795v-2.02h.005zm2.989-.695c-.121-.48-.514-.802-.982-.802-.097 0-.196.013-.295.041l-2.512.708c-.355.1-.604.395-.636.754-.03.332.14.649.435.818l2.885 1.649c.136.078.285.116.44.116.311 0 .597-.156.775-.424l.064-.097c.121-.181.186-.391.186-.612v-1.404c0-.268-.12-.52-.36-.747z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer>
      {/* Main Footer */}
      <div className="text-section border-t border-section">
        <div className="container mx-auto px-4 lg:px-8 py-6 md:py-8 lg:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-14">
            {/* Brand & Social */}
            <div className="text-center ">
              <Link to="/" className="inline-block  mt-4 ">
                <img
                  src={logo}
                  alt="Capital Motor Cars"
                  loading="lazy"
                  decoding="async"
                  className="h-20 w-20 "
                // style={{ transform: 'scale(1.7)' }}
                />
              </Link>
              <div className="mb-4 space-y-1">
                <h3 className="text-lg font-black tracking-wider text-section">
                  CAPITAL MOTOR CARS
                </h3>
                <p className="text-xs font-semibold tracking-widest text-section-muted">
                  AUTO SALES AND LEASING
                </p>
                <p className="text-sm font-bold tracking-wide text-section">
                  (877)-CMC-8866
                </p>
              </div>
              <p className="text-sm font-medium leading-relaxed mb-4 tracking-[0.15em] text-section-muted text-center ">
                Car leasing made easy.
              </p>
              <div className="flex items-center justify-center  gap-3 text-section-muted opacity-85 hover:opacity-100">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
                <a
                  href="https://yelp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-300 hover:scale-110"
                  aria-label="Yelp"
                >
                  <YelpIcon className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Locations */}
            <div className="lg:col-span-1">
              <h3 className="text-sm font-semibold tracking-wide mb-4 text-section">
                Locations
              </h3>
              <div className="space-y-6">
                {locations.map((loc, idx) => (
                  <div
                    key={loc.name}
                    className={`text-xs leading-relaxed text-section-muted ${idx === 0 ? '' : 'pt-4 border-t border-section'}`}
                  >
                    <p className="text-sm font-semibold text-section mb-2">
                      {loc.name} – {loc.city}
                    </p>
                    <div className="flex items-start gap-2 mb-2">
                      <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0 text-section-muted" />
                      <span>{loc.address}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="h-3.5 w-3.5 shrink-0 text-section-muted" />
                      <a
                        href={`tel:${loc.phone.replace(/\D/g, '')}`}
                        className="hover:underline underline-offset-4"
                      >
                        {loc.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="h-3.5 w-3.5 shrink-0 text-section-muted" />
                      <span>Fax: {loc.fax}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-sm font-semibold tracking-wide mb-4 text-section">
                Services
              </h3>
              <ul className="space-y-1">
                {footerLinks.services.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="inline-flex items-center min-h-[44px] py-2 text-sm text-section-muted hover:underline underline-offset-4 transition-colors duration-200 hover:text-section"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm font-semibold tracking-wide mb-4 text-section">
                Company
              </h3>
              <ul className="space-y-1">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="inline-flex items-center min-h-[44px] py-2 text-sm text-section-muted hover:underline underline-offset-4 transition-colors duration-200 hover:text-section"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-section">
          <div className="container mx-auto px-4 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-section-muted">
                © {new Date().getFullYear()} Capital Motor Cars. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                {footerLinks.legal.map((link, idx) => (
                  <span key={link.href} className="flex items-center gap-4">
                    <Link
                      to={link.href}
                      className="inline-flex items-center min-h-[44px] py-2 text-sm text-section-muted hover:underline underline-offset-4"
                    >
                      {link.label}
                    </Link>
                    {idx < footerLinks.legal.length - 1 && (
                      <span className="text-section-muted opacity-60">|</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
