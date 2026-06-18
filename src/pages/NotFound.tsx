import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { ArrowRight, Phone, MapPin, Car } from 'lucide-react';

const popularPages = [
  { label: 'Car Leasing New Jersey', path: '/car-leasing-new-jersey', desc: 'Browse all NJ lease deals and county pages' },
  { label: 'BMW Lease NJ', path: '/bmw-car-lease', desc: 'BMW 3 Series, X3, X5, and more' },
  { label: 'Lease Calculator', path: '/lease-calculator', desc: 'Estimate your monthly payment instantly' },
  { label: 'Best NJ Lease Deals', path: '/best-lease-deals-new-jersey', desc: "This month's top deals" },
  { label: 'Bad Credit Car Lease NJ', path: '/bad-credit-car-lease-new-jersey', desc: 'Options for every credit tier' },
  { label: 'Contact Us', path: '/contact', desc: 'Get a custom quote in 1 business day' },
];

const countyPages = [
  { label: 'Bergen County', path: '/car-leasing-bergen-county-nj' },
  { label: 'Hudson County', path: '/car-leasing-hudson-county-nj' },
  { label: 'Essex County', path: '/car-leasing-essex-county-nj' },
  { label: 'Union County', path: '/car-leasing-union-county-nj' },
  { label: 'Middlesex County', path: '/car-leasing-middlesex-county-nj' },
  { label: 'Morris County', path: '/car-leasing-morris-county-nj' },
  { label: 'Monmouth County', path: '/car-leasing-monmouth-county-nj' },
];

const modelPages = [
  { label: 'BMW 3 Series Lease NJ', path: '/bmw-3-series-lease-nj' },
  { label: 'BMW X3 Lease NJ', path: '/bmw-x3-lease-nj' },
  { label: 'Audi Q5 Lease NJ', path: '/audi-q5-lease-nj' },
  { label: 'Mercedes C-Class Lease NJ', path: '/mercedes-c-class-lease-nj' },

  { label: 'Toyota RAV4 Lease NJ', path: '/toyota-rav4-lease-nj' },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <SEO
        title="Page Not Found | Capital Motor Cars"
        description="The page you were looking for does not exist. Browse our NJ lease deals, county pages, or contact Capital Motor Cars for a custom quote."
        noindex
      />

      {/* Hero */}
      <section className="relative py-24 md:py-32 border-b border-border/40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <span className="inline-block text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-6 bg-accent/10 px-4 py-2 rounded-full border border-accent/20">
            404 Error
          </span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-black dark:text-white mb-4">
            Page <span className="text-accent italic">Not Found</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-8">
            The page <code className="text-accent font-mono text-sm bg-accent/10 px-2 py-0.5 rounded">{location.pathname}</code> does not exist. Use the links below to get back on track.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/" className="inline-flex items-center gap-2 bg-accent text-white font-black uppercase tracking-wider px-8 py-4 rounded-full hover:bg-accent/80 transition-colors">
              Go Home <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:+12015095555" className="inline-flex items-center gap-2 border-2 border-border/60 text-foreground font-black uppercase tracking-wider px-8 py-4 rounded-full hover:border-accent hover:text-accent transition-colors">
              <Phone className="w-5 h-5" /> Call Us
            </a>
          </div>
        </div>
      </section>

      {/* Popular Pages */}
      <section className="py-12 md:py-20 border-b border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-10 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Start Here</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-black dark:text-white uppercase">
              Popular <span className="text-accent italic">Pages</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {popularPages.map((page, i) => (
              <Link
                key={i}
                to={page.path}
                className="group p-6 rounded-[1.5rem] border-2 border-border/60 bg-muted/5 hover:border-accent hover:bg-accent/5 transition-all"
              >
                <div className="font-black text-base text-black dark:text-white group-hover:text-accent transition-colors mb-1">{page.label}</div>
                <div className="text-sm text-muted-foreground">{page.desc}</div>
                <div className="mt-3 flex items-center gap-1 text-accent text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  Go there <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* County + Model quick links */}
      <section className="py-12 md:py-20 border-b border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <MapPin className="w-5 h-5 text-accent" />
                <h3 className="font-black text-xl text-black dark:text-white uppercase">NJ County Hubs</h3>
              </div>
              <div className="space-y-2">
                {countyPages.map((p, i) => (
                  <Link key={i} to={p.path} className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent transition-colors py-1">
                    <ArrowRight className="w-4 h-4 text-accent shrink-0" /> {p.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Car className="w-5 h-5 text-accent" />
                <h3 className="font-black text-xl text-black dark:text-white uppercase">Popular Models</h3>
              </div>
              <div className="space-y-2">
                {modelPages.map((p, i) => (
                  <Link key={i} to={p.path} className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent transition-colors py-1">
                    <ArrowRight className="w-4 h-4 text-accent shrink-0" /> {p.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-12 bg-accent/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-6 justify-between max-w-4xl mx-auto">
            <div>
              <p className="font-black text-xl text-black dark:text-white">Still can't find what you need?</p>
              <p className="text-muted-foreground text-sm mt-1">Call or message us directly. We respond within one business day.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 bg-accent text-white font-black uppercase tracking-wider px-6 py-3 rounded-full hover:bg-accent/80 transition-colors text-sm">
                Send a Message <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:+12015095555" className="inline-flex items-center gap-2 border-2 border-border/60 font-black uppercase tracking-wider px-6 py-3 rounded-full hover:border-accent hover:text-accent transition-colors text-sm">
                <Phone className="w-4 h-4" /> 201-509-5555
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
