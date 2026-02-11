import { motion } from 'motion/react';
import { useDeals } from '@/hooks/useDeals';
import { useVehicleTypes } from '@/hooks/useVehicleTypes';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight, Calendar, Car, CreditCard, Sparkles, Star } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ContactForm } from '@/components/forms/ContactForm';

interface BrandDealsProps {
    brand: string;
    bodyStyle?: string;
    className?: string;
}

function VehicleCard({ vehicle, index }: { vehicle: any; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative h-full flex flex-col rounded-[2.5rem] border-2 border-accent/20 bg-accent/5 overflow-hidden hover:border-accent hover:shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] transition-all duration-500"
        >
            <div className="relative h-48 overflow-hidden bg-muted/20">
                <div className="absolute inset-0 bg-accent/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {vehicle.image ? (
                    <img
                        src={vehicle.image}
                        alt={vehicle.vehicleName}
                        className="w-full h-full object-contain p-4 transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Car className="w-12 h-12 text-accent/20" />
                    </div>
                )}
                <div className="absolute top-4 left-4 z-20">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-accent-foreground text-[8px] font-black uppercase tracking-widest shadow-lg">
                        Available Model
                    </span>
                </div>
            </div>

            <div className="flex-1 p-6 flex flex-col gap-3">
                <h3 className="text-xl font-black text-foreground tracking-tight leading-tight group-hover:text-accent transition-colors">
                    {vehicle.vehicleName}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {vehicle.description}
                </p>

                <div className="mt-auto pt-4 border-t border-border/40">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex flex-col">
                            <span className="text-[8px] uppercase font-bold text-muted-foreground">Starting at</span>
                            <span className="text-sm font-black text-foreground">${vehicle.startingPrice?.toLocaleString()}<span className="text-[10px] font-medium ml-1">/mo</span></span>
                        </div>
                        {vehicle.badge && (
                            <span className="text-[8px] font-bold px-2 py-1 rounded bg-foreground text-background uppercase tracking-widest">
                                {vehicle.badge}
                            </span>
                        )}
                    </div>
                    <Button asChild size="sm" className="w-full h-10 rounded-xl bg-foreground hover:bg-foreground/90 text-background font-black tracking-wide uppercase text-[10px] transition-all">
                        <Link to={`/vehicles/${vehicle.slug}`} className="cursor-pointer">
                            Learn More <ArrowRight className="ml-2 w-3 h-3" />
                        </Link>
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}

function DealCard({ deal, index, onClaim }: { deal: any; index: number; onClaim: (deal: any) => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative h-full flex flex-col rounded-[2.5rem] border-2 border-border/60 dark:border-white/10 bg-muted/5 dark:bg-white/[0.02] overflow-hidden hover:border-accent hover:shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] transition-all duration-500"
        >
            <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-accent/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {deal.image_url ? (
                    <img
                        src={deal.image_url}
                        alt={`${deal.make} ${deal.model}`}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                ) : (
                    <div className="w-full h-full bg-slate-800/10 flex items-center justify-center">
                        <Car className="w-12 h-12 text-accent/20" />
                    </div>
                )}
                <div className="absolute top-4 right-4 z-20">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest shadow-xl">
                        <Star className="w-3 h-3 fill-accent text-accent" />
                        Special Offer
                    </span>
                </div>
            </div>

            <div className="flex-1 p-6 flex flex-col gap-4">
                <div>
                    <h3 className="text-xl font-black text-foreground tracking-tight leading-none group-hover:text-accent transition-colors duration-300">
                        {deal.make} {deal.model}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-accent/10 text-accent uppercase tracking-wider">
                            {deal.year}
                        </span>
                    </div>
                </div>

                <div className="bg-background/50 dark:bg-black/20 rounded-xl p-4 border border-border/50">
                    <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-sm font-bold text-accent">$</span>
                        <span className="text-3xl font-black text-foreground tracking-tighter">
                            {Math.floor(deal.monthly_price)}
                        </span>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">/mo</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/50">
                        <div className="flex items-center gap-2">
                            <CreditCard className="w-3 h-3 text-accent/70" />
                            <div className="flex flex-col">
                                <span className="text-[8px] uppercase font-bold text-muted-foreground/70">Down</span>
                                <span className="text-xs font-bold text-foreground">${deal.down_payment}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3 text-accent/70" />
                            <div className="flex flex-col">
                                <span className="text-[8px] uppercase font-bold text-muted-foreground/70">Term</span>
                                <span className="text-xs font-bold text-foreground">{deal.lease_term} Mos</span>
                            </div>
                        </div>
                    </div>
                </div>

                <Button
                    size="sm"
                    className="w-full h-10 rounded-lg bg-accent hover:bg-accent/90 text-accent-foreground font-black tracking-wide uppercase text-[10px] shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all cursor-pointer"
                    onClick={() => onClaim(deal)}
                >
                    Claim Offer <ArrowRight className="ml-2 w-3 h-3" />
                </Button>
            </div>
        </motion.div>
    );
}

export function BrandDeals({ brand, bodyStyle, className }: BrandDealsProps) {
    const { data: deals, isLoading: dealsLoading } = useDeals();
    const { data: vehicles, isLoading: vehiclesLoading } = useVehicleTypes();
    const [selectedDeal, setSelectedDeal] = useState<any>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    if (dealsLoading || vehiclesLoading) return null;

    const filteredDeals = deals?.filter(deal =>
        deal.make.toLowerCase() === brand.toLowerCase() &&
        (!bodyStyle || deal.model.toLowerCase().includes(bodyStyle.toLowerCase()) ||
            (bodyStyle.toLowerCase() === 'suv' && (deal.model.toLowerCase().includes('x') || deal.model.toLowerCase().includes('q')))
        )
    ) || [];

    const filteredVehicles = vehicles?.filter(v => {
        const matchesBrand = v.vehicleName?.toLowerCase().includes(brand.toLowerCase()) ||
            v.name?.toLowerCase().includes(brand.toLowerCase());

        // Show only vehicles with the same body style
        const matchesBodyStyle = !bodyStyle || v.bodyStyle?.toLowerCase() === bodyStyle.toLowerCase();

        const isSelf = bodyStyle && v.name.toLowerCase() === bodyStyle.toLowerCase();

        return matchesBrand && matchesBodyStyle && !isSelf;
    }) || [];

    if (filteredDeals.length === 0 && filteredVehicles.length === 0) return (
        <div className="text-center py-12">
            <p className="text-muted-foreground text-sm font-medium">No specialized {brand} {bodyStyle} matches found at this time.</p>
        </div>
    );

    const handleClaimClick = (deal: any) => {
        setSelectedDeal(deal);
        setIsDialogOpen(true);
    };

    return (
        <div className={cn("mt-12 space-y-12", className)}>
            {/* 1. Vehicles Showcase */}
            {filteredVehicles.length > 0 && (
                <div className="space-y-8">
                    <div className="flex flex-col items-start px-2">
                        <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Available Models</span>
                        <h3 className="text-2xl md:text-3xl font-black tracking-tighter text-foreground uppercase leading-none">
                            The <span className="text-accent italic">{brand}</span> Lineup
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredVehicles.map((vehicle, index) => (
                            <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
                        ))}
                    </div>
                </div>
            )}

            {/* 2. Deals Grid */}
            {filteredDeals.length > 0 && (
                <div className="space-y-8 pt-4 border-t border-border/40">
                    <div className="flex flex-col items-start px-2">
                        <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Current Specials</span>
                        <h3 className="text-2xl md:text-3xl font-black tracking-tighter text-foreground uppercase leading-none">
                            Limited-Time <span className="text-accent italic">{brand}</span> Deals
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredDeals.map((deal, index) => (
                            <DealCard key={deal.id} deal={deal} index={index} onClaim={handleClaimClick} />
                        ))}
                    </div>
                </div>
            )}

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-xl p-0 overflow-hidden border-none bg-transparent">
                    <div className="relative bg-background p-6 md:p-8 rounded-[2.5rem] border-2 border-border shadow-2xl overflow-y-auto max-h-[90vh]">
                        <div className="text-center mb-6">
                            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2 block">
                                Exclusive Deal
                            </span>
                            <DialogTitle className="text-3xl font-black tracking-tighter text-foreground uppercase mb-2">
                                Claim Your <span className="text-accent italic">Offer</span>
                            </DialogTitle>
                            <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
                                Inquiring about the <span className="font-bold text-foreground">{selectedDeal?.year} {selectedDeal?.make} {selectedDeal?.model}</span> at <span className="font-black text-accent">${selectedDeal?.monthly_price}/mo</span>.
                            </DialogDescription>
                        </div>

                        <ContactForm
                            source="quiz_result"
                            initialValues={{
                                message: `I'm interested in the ${selectedDeal?.year} ${selectedDeal?.make} ${selectedDeal?.model} lease deal at $${selectedDeal?.monthly_price}/mo.`
                            }}
                            hideServiceField
                            showVehicleField={false}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
