import { CheckCircle2, Star } from 'lucide-react';

export interface ServiceSEOBlockProps {
  title: string;
  paragraphs: string[];
  bullets: string[];
  imageSrc: string;
  imageAlt: string;
  testimonialQuote: string;
}

export function ServiceSEOBlock({
  title,
  paragraphs,
  bullets,
  imageSrc,
  imageAlt,
  testimonialQuote,
}: ServiceSEOBlockProps) {
  return (
    <section className="py-20 section-bg-alt border-t border-border/40">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-section mb-6">
              {title}
            </h2>
            <div className="space-y-6 text-section-muted text-lg leading-relaxed">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {bullets && bullets.length > 0 && (
                <ul className="space-y-4 mt-6">
                  {bullets.map((bullet, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                      <span className="text-foreground font-medium">{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent rounded-[3rem] transform rotate-3" />
            <img 
              src={imageSrc} 
              alt={imageAlt} 
              className="relative rounded-[3rem] border border-white/10 shadow-2xl object-cover h-[500px] w-full"
            />
            
            {testimonialQuote && (
              <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-2xl border border-border/50 shadow-xl max-w-[250px]">
                <div className="flex gap-1 mb-2">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-accent text-accent" />)}
                </div>
                <p className="text-sm italic text-muted-foreground">"{testimonialQuote}"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
