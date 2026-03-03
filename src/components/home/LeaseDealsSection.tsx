import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { useDeals } from '@/hooks/useDeals';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight, Calendar, Car, CreditCard, DollarSign, Sparkles, Star, X } from 'lucide-react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi
} from '@/components/ui/carousel';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { ContactForm } from '@/components/forms/ContactForm';

function DealCard({ deal, onClaim }: { deal: any; onClaim: (deal: any) => void }) {
    return (
        <div
            className="group relative h-full flex flex-col rounded-[2.5rem] border-2 border-border/60 dark:border-white/10 bg-muted/5 dark:bg-white/[0.02] overflow-hidden hover:border-accent hover:shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] transition-all duration-500"
        >
            {/* Image Container */}
            <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-accent/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {deal.image_url ? (
                    <img
                        src={deal.image_url}
                        alt={`${deal.make} ${deal.model}`}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                ) : (
                    <div className="w-full h-full bg-slate-800/10 flex items-center justify-center">
                        <Car className="w-16 h-16 text-accent/20" />
                    </div>
                )}

                {/* Floating Badge */}
                <div className="absolute top-4 right-4 z-20">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest shadow-xl">
                        <Star className="w-3 h-3 fill-accent text-accent" />
                        Special Offer
                    </span>
                </div>
            </div>

            {/* Content Container */}
            <div className="flex-1 p-6 md:p-8 flex flex-col gap-6">

                {/* Title & Year */}
                <div>
                    <h3 className="text-2xl font-black text-foreground tracking-tight leading-none group-hover:text-accent transition-colors duration-300">
                        {deal.make} {deal.model}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-accent/10 text-accent uppercase tracking-wider">
                            {deal.year}
                        </span>
                        {deal.trim && (
                            <span className="text-sm font-medium text-muted-foreground">
                                {deal.trim}
                            </span>
                        )}
                    </div>
                </div>

                {/* Pricing Block */}
                <div className="bg-background/50 dark:bg-black/20 rounded-2xl p-4 border border-border/50">
                    <div className="flex items-baseline gap-1 mb-3">
                        <span className="text-lg font-bold text-accent">$</span>
                        <span className="text-4xl font-black text-foreground tracking-tighter">
                            {Math.floor(deal.monthly_price)}
                        </span>
                        <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider ml-1">/mo</span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 pt-3 border-t border-border/50">
                        <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-accent/70" />
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase font-bold text-muted-foreground/70">Down</span>
                                <span className="text-sm font-bold text-foreground">${deal.down_payment}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-accent/70" />
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase font-bold text-muted-foreground/70">Term</span>
                                <span className="text-sm font-bold text-foreground">{deal.lease_term} Mos</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Highlights */}
                {deal.highlights && (
                    <div className="flex-1">
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                            {deal.highlights}
                        </p>
                    </div>
                )}

                {/* CTA Button */}
                <Button
                    className="w-full h-12 rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground font-black tracking-wide uppercase text-xs shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all hover:-translate-y-0.5"
                    onClick={() => onClaim(deal)}
                >
                    Claim Offer <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}

export function LeaseDealsSection() {
    const { data: deals, isLoading, error } = useDeals();
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);
    const [selectedDeal, setSelectedDeal] = useState<any>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const onSelect = useCallback(() => {
        if (!api) return;
        setCurrent(api.selectedScrollSnap());
    }, [api]);

    useEffect(() => {
        if (!api) return;

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());

        api.on("select", onSelect);

        const intervalId = setInterval(() => {
            api.scrollNext();
        }, 5000);

        return () => {
            clearInterval(intervalId);
            api.off("select", onSelect);
        };
    }, [api, onSelect]);

    const handleClaimClick = (deal: any) => {
        setSelectedDeal(deal);
        setIsDialogOpen(true);
    };

    if (isLoading || error || !deals || deals.length === 0) return null;

    return (
        <section className="py-16 md:py-20 relative overflow-hidden">
            <div className="container relative mx-auto px-4 z-10">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-3 block">
                            Limited Time Offers
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground uppercase mb-6">
                            This Month's <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-600 block mt-2">
                                Lease Deals
                            </span>
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Drive your dream car for less. Exclusive offers on our most popular vehicles, curated just for you.
                        </p>
                    </motion.div>
                </div>

                {/* Deals Display */}
                <div className="max-w-7xl mx-auto relative group/carousel">
                    <Carousel
                        setApi={setApi}
                        opts={{
                            align: 'start',
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-6 py-4">
                            {deals.map((deal, index) => (
                                <CarouselItem key={deal.id} className="pl-6 md:basis-1/2 lg:basis-1/3">
                                    <DealCard deal={deal} onClaim={handleClaimClick} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        {/* Custom Arrows */}
                        <div className="hidden md:block">
                            <CarouselPrevious className="absolute -left-16 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border-2 border-border/50 bg-background/50 backdrop-blur-sm hover:border-accent hover:text-accent transition-all" />
                            <CarouselNext className="absolute -right-16 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border-2 border-border/50 bg-background/50 backdrop-blur-sm hover:border-accent hover:text-accent transition-all" />
                        </div>
                    </Carousel>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-6">
                        {Array.from({ length: count }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => api?.scrollTo(i)}
                                className={cn(
                                    "h-2 transition-all rounded-full bg-border",
                                    current === i ? "w-8 bg-accent" : "w-2 hover:bg-border/80"
                                )}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="max-w-2xl p-0 overflow-hidden border-none bg-transparent">
                        <div className="relative bg-background p-6 md:p-10 rounded-[2.5rem] border-2 border-border shadow-2xl overflow-y-auto max-h-[90vh]">
                            <div className="text-center mb-10">
                                <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-3 block">
                                    Exclusive Deal
                                </span>
                                <DialogTitle className="text-4xl md:text-5xl font-black tracking-tighter text-foreground uppercase mb-4">
                                    Claim Your <span className="text-accent italic">Offer</span>
                                </DialogTitle>
                                <DialogDescription className="text-lg text-muted-foreground leading-relaxed">
                                    You're inquiring about the <span className="font-bold text-foreground">{selectedDeal?.year} {selectedDeal?.make} {selectedDeal?.model}</span> at <span className="font-black text-accent">${selectedDeal?.monthly_price}/mo</span>.
                                </DialogDescription>
                            </div>

                            <ContactForm
                                source="vehicle_dialog"
                                initialValues={{
                                    message: `I'm interested in the ${selectedDeal?.year} ${selectedDeal?.make} ${selectedDeal?.model} lease deal at $${selectedDeal?.monthly_price}/mo with $${selectedDeal?.down_payment} down for ${selectedDeal?.lease_term} months.`
                                }}
                                hideServiceField
                                showVehicleField={false}
                            />
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </section>
    );
}
