import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { renderSEOHeading } from '@/utils/seoUtils';

interface ServiceHeroProps {
    badge: string;
    title: string;
    highlightedTitle: string;
    subtitle: string;
    heroImage: string;
    primaryAction: {
        label: string;
        href: string;
    };
    secondaryAction?: {
        label: string;
        href: string;
        icon?: LucideIcon;
    };
}

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
} as const;

export function ServiceHero({
    badge,
    title,
    highlightedTitle,
    subtitle,
    heroImage,
    primaryAction,
    secondaryAction
}: ServiceHeroProps) {
    const SecondaryIcon = secondaryAction?.icon;

    return (
        <section className="pt-12 md:pt-20 ">
            <div className="relative h-full flex flex-col">
                {/* Top half: Blurred background */}
                <div className="absolute top-0 left-0 right-0 h-[40vh] md:h-[45vh] overflow-hidden">
                    <motion.img
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1.05, opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        src={heroImage}
                        alt={`${title} ${highlightedTitle}`}
                        className="w-full h-full object-cover object-center blur-[2px]"
                        aria-hidden
                    />
                </div>

                {/* Dark overlay for text readability */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="absolute top-0 left-0 right-0 h-[40vh] md:h-[45vh] bg-black/40"
                    aria-hidden
                />

                {/* Gradient fade to bottom content */}
                <div
                    className="absolute top-[20vh] md:top-[22.5vh] left-0 right-0 h-[20vh] md:h-[22.5vh] bg-gradient-to-b from-transparent via-white/20 to-white dark:to-[hsl(0,0%,4%)]"
                    aria-hidden
                />

                {/* Bottom half: Solid background */}
                <div
                    className="absolute top-[40vh] md:top-[45vh] left-0 right-0 bottom-0 bg-white dark:bg-[hsl(0,0%,4%)]"
                    aria-hidden
                />

                {/* Content */}
                <div className="relative z-10 flex-1 flex flex-col dark:bg-white/[0.02] ">
                    {/* Hero Header */}
                    <div className="mx-auto h-[45vh]  px-4 gap-1 md:gap-2 lg:px-8 flex flex-col items-center justify-center text-center">
                        <motion.span
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            className="inline-block px-4 py-1.5 mb-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-[0.2em] "
                        >
                            {badge}
                        </motion.span>
                        <motion.h1
                            {...fadeInUp}
                            transition={{ ...fadeInUp.transition, delay: 0.3 }}
                            className="text-3xl md:text-5xl font-bold text-white tracking-tighter"
                        >
                            {renderSEOHeading(title)} {highlightedTitle && <span className="text-white/90 italic">{renderSEOHeading(highlightedTitle)}</span>}
                        </motion.h1>
                        <motion.p
                            {...fadeInUp}
                            transition={{ ...fadeInUp.transition, delay: 0.4 }}
                            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-medium leading-relaxed"
                        >
                            {subtitle}
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="flex flex-row gap-2 sm:gap-4 p-1.5 sm:p-2 rounded-2xl md:rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
                        >
                            <Button
                                asChild
                                size="default"
                                className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-sm md:text-lg h-10 md:h-14 px-6 md:px-8 rounded-xl md:rounded-2xl shadow-xl shadow-accent/20"
                            >
                                <Link to={primaryAction.href}>{primaryAction.label}</Link>
                            </Button>

                            {secondaryAction && (
                                <Button
                                    asChild
                                    variant="ghost"
                                    size="default"
                                    className="text-white border border-white/20 hover:text-white/80 hover:bg-white/10 dark:hover:bg-white/5 dark:hover:text-white/80 font-bold text-sm md:text-lg h-10 md:h-14 px-6 md:px-8 rounded-xl md:rounded-2xl"
                                >
                                    {secondaryAction.href.startsWith('tel:') ? (
                                        <a href={secondaryAction.href} className="flex items-center gap-2">
                                            {SecondaryIcon && <SecondaryIcon className="w-4 h-4 md:w-5 md:h-5" />} {secondaryAction.label}
                                        </a>
                                    ) : (
                                        <Link to={secondaryAction.href} className="flex items-center gap-2">
                                            {SecondaryIcon && <SecondaryIcon className="w-4 h-4 md:w-5 md:h-5" />} {secondaryAction.label}
                                        </Link>
                                    )}
                                </Button>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
