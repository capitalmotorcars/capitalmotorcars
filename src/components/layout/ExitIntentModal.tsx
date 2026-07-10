import { useState, useEffect } from 'react';
import { X, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // Check if it already fired this session
    if (sessionStorage.getItem('exitIntentTriggered')) {
      setHasTriggered(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Fire if the mouse leaves the top of the viewport
      if (e.clientY <= 0 && !hasTriggered) {
        setIsOpen(true);
        setHasTriggered(true);
        sessionStorage.setItem('exitIntentTriggered', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasTriggered]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-background shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 z-10 rounded-full bg-black/5 p-2 text-muted-foreground hover:bg-black/10 hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-8 md:p-10 text-center">
          <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
            <Phone className="w-8 h-8 text-accent" />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground mb-4">
            Leaving so soon?
          </h2>
          
          <p className="text-muted-foreground leading-relaxed mb-8">
            Don't leave money on the table. Talk to a Capital Motor Cars Leasing Expert today to see how much you could save on your next vehicle with zero down.
          </p>
          
          <div className="flex flex-col gap-3">
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-6 rounded-xl w-full text-lg">
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                Talk to a Leasing Expert
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground py-6 rounded-xl font-medium"
              onClick={() => setIsOpen(false)}
            >
              No thanks, I prefer paying retail
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
