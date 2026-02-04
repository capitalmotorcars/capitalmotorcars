import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'motion/react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Marquee } from '@/components/ui/Marquee';
import { Star, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const dialogFadeTransition = { type: 'tween' as const, duration: 0.4, ease: 'easeOut' as const };
const cardClass = cn(
  'rounded-2xl border bg-card overflow-hidden',
  'border-border dark:border-white/20 dark:bg-white/[0.03] dark:border-white/5 dark:shadow-black/30',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
);
const dialogPanelClass = cn(
  cardClass,
  'dark:bg-[#121212] dark:border-white/5 dark:shadow-black/30',
);

const testimonials = [
  {
    quote: "I recently leased my 2024 BMW from Capital Motor Cars & I have to say my experience was 10000/10. I couldn't be more happy with the entirety of the service. From start to finish it was so good. Henry really took care of everything, he made the entire process seamless. Not only did he find the exact vehicle I wanted but he also got me a way better number than my local dealership AND delivered the vehicle to my home. Justin delivered the car and was very pleasant, he answered all of my questions. They have gained a new client and I will confidently refer them to friends and family. Thank you again Henry!",
    author: 'K L',
    stars: 5,
  },
  {
    quote: "This review serves to express my sincere appreciation for the outstanding sales service Chris at Capital Motors has given me throughout my x5 lease. Chris went above and beyond to make sure I purchased the SUV I was most comfortable with. He gave me suggestions and his advice, but was in no way pushy what-so-ever. After I decided on an X5, the process was absolutely painless and QUICK!! Chris' professional demeanor, attention to detail, and exceptional service is what will keep me coming back. I look forward to doing business with you again in the future. I would never even consider going elsewhere or working with any other sales professional. Thank you once again for being my trusted car advisor and you assessing my need accurately, exceeding my expectations and delivering on your promises. Delivery was beautiful and such a convenience - right to my home! I felt like family by the end of it all.",
    author: 'Dina Ishak Manasra',
    stars: 5,
  },
  {
    quote: "It was delightful working with Chris from Capital Motor Cars! In a time where getting a car is impossible, Chris made it possible! I was able to build my X5 and have it delivered in 4 weeks! I went to several BMW dealers that had 3-4 month wait time and no promise of having it exactly as ordered due to chip/part shortages. Chris was very patient and helpful when building my truck and suggested some items I would have never considered. I am beyond happy I went with his suggestion. Capital Motor Cars offered me a great price for my pre-owned vehicle-much higher than dealer trade in. The process from the beginning was super easy, fast and pick up/delivery was efficient. The delivery crew was professional, on time and helpful in explaining the car to me! Excellent all around and highly recommended.",
    author: 'Michelle Catalano',
    stars: 5,
  },
  {
    quote: "Dave B. was incredible! Answered my many many questions and made me feel very comfortable with my new car! Mike M. made the transaction so easy and smooth! I will certainly be working with both Dave and Mike in the future! Thank you!!! Wonderful guys!",
    author: 'Mia Carratura',
    stars: 5,
  },
  {
    quote: "Working with Chris at Capital Motors Cars was an amazing experience! It was difficult for me to find new car for a good price, but Chris made the possible for me. When wanting to build my BMW X5, they had everything I wanted and Chris answered every question I had about the car and the company. The car was delivered right on time. The delivery was extremely fast and the car is beautiful. I had no complaints at all about the car once it first arrived, and it still looks as perfect as it did when I first laid my eyes on it. Capital Motor Cars made everything convenient for me and as simple as it could get.",
    author: 'Robert Smolyansky',
    stars: 5,
  },
  {
    quote: "Been using capital motor cars since 2017. Amazing prompt service always. Capital motor cars always makes my dreams come true. Couldn't be happier with my new 2024 Acura TLX",
    author: 'Barry Stapert',
    stars: 5,
  },
  {
    quote: "CMC is a class act!! Dealing with Mike from start to finish was amazing. Attention to detail with sourcing exact cars together was professional communication along the process. No stress and everything was completed and ready to drive. The only way to go with all leases in the future will be to recommend Mike to all contacts.",
    author: 'Scott Stone',
    stars: 5,
  },
  {
    quote: "Mike Minerva from capital motors was excellent. He was patient, knowledgeable, and is passionate about his work and delivered on our goals. The truck was delivered to me and paperwork was signed. He went above and beyond. He was recommended to me and I've already recommended him to a few friends that are using him. I would not buy or lease a car the traditional way again. Mike is my guy.",
    author: 'John Termini',
    stars: 5,
  },
];

function TestimonialCard({
  quote,
  author,
  stars,
  open,
  onOpenChange,
}: {
  quote: string;
  author: string;
  stars: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className={cn(
            'relative flex w-[340px] shrink-0 cursor-pointer flex-col rounded-xl border p-5 md:p-6 text-left',
            'bg-white/90 border-border/80 shadow-black/5',
            'dark:bg-white/[0.03] dark:border-white/5 dark:shadow-black/30',
            'backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:border-accent/30',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
          )}
          aria-label={`Read full review by ${author}`}
        >
          <div className="flex gap-0.5 mb-3 text-amber-500" aria-label={`${stars} out of 5 stars`}>
            {Array.from({ length: stars }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" aria-hidden />
            ))}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4 flex-1">{quote}</p>
          <p className="mt-4 text-xs font-semibold text-foreground">{author}</p>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <motion.div
            className="fixed inset-0 z-50 bg-black/5 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={dialogFadeTransition}
          />
        </Dialog.Overlay>
        <Dialog.Content asChild>
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={dialogFadeTransition}
            onClick={(e) => e.target === e.currentTarget && onOpenChange(false)}
          >
            <div className={cn(dialogPanelClass, 'w-full max-w-lg p-6 md:p-8 max-h-[85vh] overflow-y-auto')}>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex gap-0.5 mb-3 text-amber-500" aria-label={`${stars} out of 5 stars`}>
                    {Array.from({ length: stars }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" aria-hidden />
                    ))}
                  </div>
                  <p className="text-xl font-semibold text-foreground">{author}</p>
                </div>
                <Dialog.Close asChild>
                  <button type="button" className="shrink-0 rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Close">
                    <X className="h-5 w-5" />
                  </button>
                </Dialog.Close>
              </div>
              <p className="mt-4 text-muted-foreground leading-relaxed whitespace-pre-line">{quote}</p>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}



export function TestimonialsSection() {
  const { ref, isRevealed } = useScrollReveal();
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <section className="pt-6 pb-6 md:pt-20 md:pb-24 ">
      <div ref={ref} className={cn('scroll-reveal', isRevealed && 'revealed')}>
        <div className="container mx-auto px-4 lg:px-8 mb-6 md:mb-10">
          <SectionHeading
            title="What Our Clients Say"
            subtitle="Real experiences from people who leased with us"
          />
        </div>

        <div className="relative flex w-full max-w-[100rem] items-center justify-center overflow-hidden mx-auto px-4 lg:px-8">
          <Marquee pauseOnHover className="[--duration:60s] [--gap:1.5rem]" >
            {testimonials.map((t, i) => (
              <TestimonialCard
                key={i}
                quote={t.quote}
                author={t.author}
                stars={t.stars}
                open={openIndex === i}
                onOpenChange={(open) => setOpenIndex(open ? i : null)}
              />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-muted to-transparent dark:from-[hsl(0_0%_4%)]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-muted to-transparent dark:from-[hsl(0_0%_4%)]" />
        </div>
      </div>
    </section>
  );
}
