import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Car, Banknote, RefreshCw, ShieldCheck, Droplets, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const services = [
    {
        id: 'car-leasing',
        title: 'Car Leasing',
        description: 'Find the perfect lease with expert guidance and transparent terms.',
        href: '/services/car-leasing',
        icon: Car,
    },
    {
        id: 'credit',
        title: 'Auto Leasing & Credit',
        description: 'Simple credit applications and wholesale rates for your next vehicle.',
        href: '/services/credit',
        icon: Banknote,
    },
    {
        id: 'trade-in',
        title: 'Trade In',
        description: 'Get a fair market value evaluation and competitive offer for your car.',
        href: '/services/trade-in',
        icon: RefreshCw,
    },
    {
        id: 'wear-and-tear',
        title: 'Protection',
        description: 'Expert repairs and end of lease protection to save you money.',
        href: '/services/wear-and-tear',
        icon: ShieldCheck,
    },
    {
        id: 'wheel-repair',
        title: 'Wheel Repair',
        description: 'Elite wheel refinishing and tire repair to restore factory showroom look.',
        href: '/services/wheel-repair',
        icon: Droplets,
    },
    {
        id: 'detailing',
        title: 'Auto Detailing',
        description: 'Showroom level detailing that protects your investment and turns heads.',
        href: '/services/detailing',
        icon: Sparkles,
    },
];

interface RelatedServicesProps {
    excludeId: string;
}

export function RelatedServices({ excludeId }: RelatedServicesProps) {
    const filteredServices = services.filter((service) => service.id !== excludeId);

    return (
        <section className="py-20 md:py-32 border-t border-border/40  overflow-hidden relative">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] aspect-square pointer-events-none opacity-20 dark:opacity-10">
                <div className="w-full h-full bg-accent/20 blur-[140px] rounded-full" />
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <div className="flex flex-col mb-16 justify-center items-start md:items-center">
                    <span className="text-accent font-black tracking-[0.4rem] uppercase text-[10px] mb-2">Discovery</span>
                    <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-black dark:text-white uppercase leading-none">
                        Related <span className="text-accent italic">Services</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredServices.map((service, idx) => {
                        const Icon = service.icon;
                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.6 }}
                            >
                                <Link
                                    to={service.href}
                                    className={cn(
                                        "group relative flex flex-col p-8 rounded-[2.5rem] border-2 transition-all duration-500",
                                        "bg-white dark:bg-white/[0.02] border-border dark:border-white/10",
                                        "hover:border-accent hover:dark:border-accent/40 hover:bg-accent/5 dark:hover:bg-accent/10 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.3)]"
                                    )}
                                >
                                    <div className="flex flex-col gap-6 h-full">
                                        {/* Icon Container */}
                                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-muted dark:bg-white/5 group-hover:bg-accent text-accent group-hover:text-accent-foreground transition-all duration-500 shadow-sm">
                                            <Icon className="w-8 h-8" />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <h3 className="font-black text-2xl tracking-tighter uppercase leading-none mb-3 transition-colors duration-300 group-hover:text-accent">
                                                {service.title}
                                            </h3>
                                            <p className="text-sm font-bold text-muted-foreground/80 leading-relaxed group-hover:text-foreground/90 transition-colors uppercase tracking-tight">
                                                {service.description}
                                            </p>
                                        </div>

                                        {/* Action */}
                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-accent/60 group-hover:text-accent transition-all duration-300 pt-4 border-t border-border/40 dark:border-white/5">
                                            Explore {service.id.split('-').join(' ')}
                                            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>

                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
