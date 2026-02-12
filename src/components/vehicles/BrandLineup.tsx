import { motion } from 'motion/react';
import { useVehicleTypes } from '@/hooks/useVehicleTypes';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight, Car } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BrandLineupProps {
    brand: string;
    bodyStyle?: string;
    fuelTypes?: string[];
    excludeVehicleId?: string;
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
                        className="w-full h-full object-cover p-4 transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
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
                {vehicle.year && (
                    <span className="text-[10px] font-bold text-accent uppercase tracking-widest">
                        {vehicle.year}
                    </span>
                )}
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

export function BrandLineup({ brand, bodyStyle, fuelTypes, excludeVehicleId, className }: BrandLineupProps) {
    const { data: vehicles, isLoading } = useVehicleTypes();

    if (isLoading) return null;

    const filteredVehicles = vehicles?.filter(v => {
        if (excludeVehicleId && v.id === excludeVehicleId) return false;

        const vName = (v.vehicleName || '').toLowerCase();
        const vCat = (v.name || '').toLowerCase();
        const vSlug = (v.slug || '').toLowerCase();
        const vDesc = (v.description || '').toLowerCase();
        const vMeta = (v.metaTitle || '').toLowerCase();
        const targetBrand = brand.toLowerCase().trim();

        const matchesBrand = vName.includes(targetBrand) ||
            vCat.includes(targetBrand) ||
            vSlug.includes(targetBrand) ||
            vDesc.includes(targetBrand) ||
            vMeta.includes(targetBrand);

        if (!matchesBrand) return false;

        // Show only vehicles with the same body style
        const matchesBodyStyle = !bodyStyle ||
            v.bodyStyle?.toLowerCase().includes(bodyStyle.toLowerCase()) ||
            bodyStyle.toLowerCase().includes(v.bodyStyle?.toLowerCase() || '');
        if (!matchesBodyStyle) return false;

        // Purely Data-Driven Strict Fuel Filtering
        if (fuelTypes !== undefined) {
            const altKeywords = ['electric', 'hybrid', 'plugin-hybrid', 'diesel'];
            const clean = (arr: string[] | null) => (arr || []).map(f => f.toLowerCase().trim()).filter(Boolean);

            const target = clean(fuelTypes);
            const source = clean(v.fuelTypes);

            const isAlt = (tags: string[]) => tags.some(t => altKeywords.includes(t));

            // Contextual Logic:
            // 1. If we are in an Alternative energy context (EV/Hybrid), require a strict tag match
            if (isAlt(target)) {
                if (!target.some(t => source.includes(t))) return false;
            }
            // 2. If we are in a Standard context (Gas/Unleaded/Empty), exclude any Alternative models
            else if (isAlt(source)) {
                return false;
            }
            // 3. Otherwise (Standard vs Standard), they match regardless of specific tags or empty arrays
        }

        return true;
    }) || [];

    if (filteredVehicles.length === 0) return (
        <div className="text-center py-12">
            <p className="text-muted-foreground text-sm font-medium">No specialized {brand} {bodyStyle} models found at this time.</p>
        </div>
    );

    return (
        <div className={cn("mt-12 space-y-12", className)}>
            <div className="space-y-8">
                <div className="flex flex-col items-start px-2">
                    <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Available Models</span>
                    <h3 className="text-2xl md:text-3xl font-black tracking-tighter text-foreground uppercase leading-none">
                        The <span className="text-accent italic pr-1">{brand}</span> Lineup
                    </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredVehicles.map((vehicle, index) => (
                        <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}
