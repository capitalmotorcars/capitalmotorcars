import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function CountyHubs() {
  return (
    <section className="py-10 border-t border-border/40 bg-muted/5">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <div className="shrink-0">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-accent font-bold text-xs">NJ</span>
              </div>
              <span className="font-black text-sm uppercase tracking-[0.2em] text-black dark:text-white">We Serve All NJ Counties</span>
            </div>
            <p className="text-xs text-muted-foreground max-w-xs">Free delivery to every county. No dealership visit required.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Bergen County', path: '/car-leasing-bergen-county-nj' },
              { label: 'Hudson County', path: '/car-leasing-hudson-county-nj' },
              { label: 'Essex County', path: '/car-leasing-essex-county-nj' },
              { label: 'Union County', path: '/car-leasing-union-county-nj' },
              { label: 'Middlesex County', path: '/car-leasing-middlesex-county-nj' },
              { label: 'Morris County', path: '/car-leasing-morris-county-nj' },
              { label: 'Monmouth County', path: '/car-leasing-monmouth-county-nj' },
            ].map((county) => (
              <Link
                key={county.path}
                to={county.path}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-border/60 bg-background text-xs font-semibold text-foreground hover:border-accent hover:text-accent transition-colors"
              >
                {county.label} <ArrowRight className="w-3 h-3" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
