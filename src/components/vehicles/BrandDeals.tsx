import { motion } from 'motion/react';
import { useDeals } from '@/hooks/useDeals';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight, Calendar, Car, CreditCard, Star } from 'lucide-react';
import { JsonLd, createVehicleSchema } from '@/components/JsonLd';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ContactForm } from '@/components/forms/ContactForm';

interface BrandDealsProps {
    brand: string;
    bodyStyle?: string;
    fuelTypes?: string[];
    className?: string;
}

function normalizeBrand(value: string | null | undefined) {
    return (value || '')
        .toLowerCase()
        .replace(/[\s-]/g, '');
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
            <JsonLd data={createVehicleSchema(deal)} />
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

export function BrandDeals({ brand, bodyStyle, fuelTypes, className }: BrandDealsProps) {
    const { data: deals, isLoading } = useDeals();
    const [selectedDeal, setSelectedDeal] = useState<any>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    if (isLoading) return null;

    const targetBrand = normalizeBrand(brand);

    const filteredDeals = deals?.filter(deal => {
        const matchesBrand = normalizeBrand(deal.make) === targetBrand;
        if (!matchesBrand) return false;

        const model = deal.model.toLowerCase();

        // Automatic Fuel Type Filtering for Deals (keyword based)
        if (fuelTypes && fuelTypes.length > 0) {
            const matchesFuel = fuelTypes.some(f => {
                const type = f.toLowerCase();
                if (type === 'electric') return model.includes('electric') || model.includes('ev') || model.includes('eq');
                if (type === 'hybrid') return model.includes('hybrid') || model.includes('phev');
                if (type === 'diesel') return model.includes('diesel') || model.includes('tdi');
                if (type === 'gasoline') return !model.includes('electric') && !model.includes('ev') && !model.includes('hybrid');
                return false;
            });
            if (!matchesFuel) return false;
        }

        const style = bodyStyle?.toLowerCase();

        if (!style) return true;

        if (style.includes('suv')) {
            return (
                model.includes('suv') ||
                model.includes('x') || // BMW X series, Tesla Model X, etc.
                model.includes('q') || // Audi Q series, Infiniti QX
                model.includes('gl') || // Mercedes GL series (GLA, GLB, GLC, GLE, GLS)
                model.includes('xc') || // Volvo XC series
                model.includes('gx') || // Lexus GX
                model.includes('lx') || // Lexus LX
                model.includes('rx') || // Lexus RX
                model.includes('mdx') || // Acura MDX
                model.includes('rdx') || // Acura RDX
                model.includes('pathfinder') ||
                model.includes('tahoe') ||
                model.includes('suburban') ||
                model.includes('expedition') ||
                model.includes('range rover') ||
                model.includes('navigator')
            );
        }

        if (style.includes('sedan')) {
            return (
                model.includes('sedan') ||
                model.includes('series') || // BMW 3, 5, 7 series
                model.includes('class') || // Mercedes C, E, S class
                model.includes('is') || // Lexus IS
                model.includes('es') || // Lexus ES
                model.includes('ls') || // Lexus LS
                model.includes('tlx') || // Acura TLX
                model.includes('accord') ||
                model.includes('camry')
            );
        }

        return model.includes(style);
    }) || [];

    if (filteredDeals.length === 0) return null;

    const handleClaimClick = (deal: any) => {
        setSelectedDeal(deal);
        setIsDialogOpen(true);
    };

    return (
        <div className={cn("mt-12 space-y-8", className)}>
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
