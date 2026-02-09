import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RelatedLink {
  href: string;
  title: string;
  description?: string;
}

interface RelatedLinksProps {
  title?: string;
  links: RelatedLink[];
  className?: string;
  /** @deprecated Use theme; kept for backward compatibility, ignored */
  dark?: boolean;
}

/**
 * Internal linking component for SEO and navigation.
 * Displays related pages to encourage deeper site exploration.
 */
export function RelatedLinks({
  title = "Related Pages",
  links,
  className,
  dark: _dark,
}: RelatedLinksProps) {
  if (links.length === 0) return null;

  return (
    <nav
      aria-label="Related pages"
      className={cn("py-8 md:py-10 lg:py-14 section-bg border-t border-section", className)}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <h3 className="text-lg font-semibold mb-6 text-section">{title}</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="group flex items-start gap-3 p-4 min-h-[44px] rounded-lg transition-colors active:opacity-90 glass-card-theme hover:border-accent/50 dark:hover:bg-white/[0.1]"
            >
              <div className="flex-1 min-w-0">
                <span className="font-medium transition-colors text-section group-hover:text-accent">
                  {link.title}
                </span>
                {link.description && (
                  <p className="mt-1 text-sm line-clamp-2 text-section-muted">{link.description}</p>
                )}
              </div>
              <ArrowRight className="w-4 h-4 transition-colors mt-1 shrink-0 text-section-muted group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

// Predefined link collections for different contexts
export const serviceLinks = {
  leasing: [
    { href: '/services/financing', title: 'Financing & Credit', description: 'Review financing options for your lease.' },
    { href: '/services/trade-in', title: 'Trade-In Services', description: 'Trade in your current vehicle as part of a new lease.' },
    { href: '/contact', title: 'Schedule a Call', description: 'Talk to us about your leasing needs.' },
  ],
  financing: [
    { href: '/services/car-leasing', title: 'Car Leasing', description: 'Find the right lease for your budget.' },
    { href: '/credit-application', title: 'Credit Application', description: 'Start your financing application.' },
    { href: '/contact', title: 'Schedule a Call', description: 'Discuss financing options with us.' },
  ],
  tradeIn: [
    { href: '/services/car-leasing', title: 'Car Leasing', description: 'Apply your trade in value to a new lease.' },
    { href: '/services/wear-and-tear', title: 'Wear & Tear Repair', description: 'Prepare your vehicle before trade-in.' },
    { href: '/contact', title: 'Get an Evaluation', description: 'Request a trade-in valuation.' },
  ],
  wearAndTear: [
    { href: '/services/wheel-repair', title: 'Wheel & Tire Repair', description: 'Fix wheel damage before lease return.' },
    { href: '/services/detailing', title: 'Professional Detailing', description: 'Clean your vehicle for inspection.' },
    { href: '/services/trade-in', title: 'Trade-In Services', description: 'Trade in instead of returning your lease.' },
  ],
  wheelRepair: [
    { href: '/services/wear-and-tear', title: 'Wear & Tear Repair', description: 'Address other end-of-lease repairs.' },
    { href: '/services/detailing', title: 'Professional Detailing', description: 'Complete your vehicle preparation.' },
    { href: '/contact', title: 'Get a Quote', description: 'Request a repair estimate.' },
  ],
  detailing: [
    { href: '/services/wear-and-tear', title: 'Wear & Tear Repair', description: 'Fix minor damage before return.' },
    { href: '/services/wheel-repair', title: 'Wheel & Tire Repair', description: 'Restore your wheels and tires.' },
    { href: '/services/trade-in', title: 'Trade-In Services', description: 'Consider trading in your vehicle.' },
  ],
};

export const aboutPageLinks = [
  { href: '/services', title: 'Our Services', description: 'See how we can help with your automotive needs.' },
  { href: '/contact', title: 'Contact Us', description: 'Get in touch to start a conversation.' },
  { href: '/credit-application', title: 'Credit Application', description: 'Begin your financing journey.' },
];

export const contactPageLinks = [
  { href: '/services', title: 'Browse Services', description: 'Explore our full range of automotive services.' },
  { href: '/credit-application', title: 'Credit Application', description: 'Apply for financing online.' },
  { href: '/about', title: 'About Us', description: 'Learn more about Capital Motor Cars.' },
];

export const servicesPageLinks = [
  { href: '/contact', title: 'Schedule a Call', description: 'Talk to us about your needs.' },
  { href: '/credit-application', title: 'Credit Application', description: 'Start your financing application.' },
  { href: '/brands', title: 'Brands We Work With', description: 'See the vehicle brands we support.' },
];
