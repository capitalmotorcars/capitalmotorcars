import { Link } from 'react-router-dom';
import { Clock, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FormSuccessMessageProps {
  title?: string;
  subtitle?: string;
  timing?: string;
  /** When false, hides the "Answer quick questions" CTA (e.g. after completing the credit application). Default true for lead-capture success. */
  showQuickQuestionsCta?: boolean;
}

export function FormSuccessMessage({
  title = "You're all set!",
  subtitle = "A team member will reach out to you shortly.",
  timing = "Usually within a few hours",
  showQuickQuestionsCta = true,
}: FormSuccessMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center px-4 sm:px-6 min-h-[50dvh] max-md:min-h-[40dvh] max-md:py-10">
      {/* Animated Success Icon */}
      <div className="relative mb-4 sm:mb-6">
        {/* Outer glow ring */}
        <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent/20 animate-success-ring" />
        
        {/* Main circle with check */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-lg">
          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-accent-foreground" viewBox="0 0 24 24">
            <path 
              className="animate-check-draw"
              stroke="currentColor" 
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>
      
      {/* Title */}
      <h3 className="text-xl sm:text-2xl max-md:text-2xl font-semibold text-white mb-2 opacity-0 animate-fade-in-up animation-delay-200">
        {title}
      </h3>
      
      {/* Subtitle */}
      <p className="text-white/90 text-base sm:text-lg mb-4 max-w-sm opacity-0 animate-fade-in-up animation-delay-300">
        {subtitle}
      </p>
      
      {/* Timing badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-full bg-accent/15 text-xs sm:text-sm text-white/90 opacity-0 animate-fade-in-up animation-delay-400">
        <Clock className="w-4 h-4 shrink-0" />
        {timing}
      </div>

      {/* CTA: answer questions to speed up (only when relevant, e.g. after lead capture, not after credit application) */}
      {showQuickQuestionsCta && (
        <>
          <p className="text-white/85 text-sm sm:text-base max-w-md mt-6 sm:mt-8 mb-4 opacity-0 animate-fade-in-up animation-delay-500">
            Until we get back to you, you can answer a few questions to speed up the process.
          </p>
          <Button
            variant="outline"
            className="w-full max-w-xs sm:max-w-sm min-h-[44px] sm:min-h-[48px] rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white hover:border-white/50 font-medium text-sm sm:text-base opacity-0 animate-fade-in-up animation-delay-500"
            asChild
          >
            <Link to="/credit-application" className="inline-flex items-center justify-center gap-2">
              <HelpCircle className="w-4 h-4 shrink-0" />
              Answer quick questions
            </Link>
          </Button>
        </>
      )}
    </div>
  );
}
