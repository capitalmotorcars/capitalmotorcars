import { Phone, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export function MobileStickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-lg border-t border-accent/10 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] p-3 safe-area-bottom">
      <div className="flex gap-3 max-w-md mx-auto">
        <a
          href="tel:+12015095555"
          className="flex-1 flex items-center justify-center gap-2 bg-accent/10 text-accent hover:bg-accent/20 transition-colors font-bold rounded-xl py-3.5 text-sm"
        >
          <Phone className="w-4 h-4" />
          Call Now
        </a>
        <Link
          to="/contact"
          className="flex-[1.5] flex items-center justify-center gap-2 bg-accent text-accent-foreground hover:bg-accent/90 transition-colors font-bold rounded-xl py-3.5 text-sm shadow-md"
        >
          <FileText className="w-4 h-4" />
          Get a Quote
        </Link>
      </div>
    </div>
  );
}
