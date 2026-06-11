import { Link } from 'react-router-dom';
import type { BlogPost } from '@/types/blog';
import { cn } from '@/lib/utils';
import { Calendar, ArrowRight } from 'lucide-react';

function formatDate(value?: string | null) {
    if (!value) return 'Unscheduled';
    const date = new Date(value);
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(date);
}

export function BlogCard({ post, className, isFeatured }: { post: BlogPost; className?: string; isFeatured?: boolean }) {
    const postUrl = `/${post.slug}`;

    return (
        <article className={cn(
            "group relative overflow-hidden rounded-3xl border border-border/60 dark:border-white/10 bg-muted/5 dark:bg-white/[0.02] shadow-sm transition-all duration-300 hover:border-accent hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.3)]",
            className
        )}>
            <Link to={postUrl} className={cn("block", isFeatured && "relative")}>
                <div className={cn("relative overflow-hidden", isFeatured ? "h-[350px] md:h-[500px] rounded-[2.5rem]" : "h-48 md:h-56")}>
                    {post.cover_image_url ? (
                        <img
                            src={post.cover_image_url}
                            alt={post.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            loading={isFeatured ? undefined : "lazy"}
                            decoding="async"
                            fetchPriority={isFeatured ? "high" : "auto"}
                        />
                    ) : (
                        <div className="w-full h-full bg-slate-800/10 flex items-center justify-center text-muted-foreground/40">
                            <span className="text-xs font-bold uppercase tracking-widest">Capital Motor Cars</span>
                        </div>
                    )}
                    <div className={cn("absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent", isFeatured ? "opacity-100" : "opacity-70")} />
                </div>

                    {isFeatured && (
                        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14">
                            <div className="space-y-4 max-w-3xl">
                                <span className="bg-accent text-accent-foreground text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full shadow-lg inline-block mb-2">
                                    Featured Story
                                </span>
                                <div className="flex items-center gap-2 text-xs font-semibold text-white/70 uppercase tracking-wider">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>{formatDate(post.published_at)}</span>
                                </div>
                                <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                                    {post.title}
                                </h3>
                                <p className="text-white/80 text-base md:text-xl leading-relaxed line-clamp-2 max-w-2xl font-medium">
                                    {post.excerpt || post.content}
                                </p>
                                <span className="inline-flex items-center gap-2 text-base font-bold text-white group-hover:text-accent transition-colors pt-4">
                                    Read full story <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                                </span>
                            </div>
                        </div>
                    )}

                {!isFeatured && (
                    <div className="p-6 md:p-8 space-y-4">
                        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{formatDate(post.published_at)}</span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-black text-foreground tracking-tight group-hover:text-accent transition-colors">
                            {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                            {post.excerpt || post.content}
                        </p>
                        <span className="inline-flex items-center gap-2 text-sm font-bold text-accent">
                            Read article <ArrowRight className="w-4 h-4" />
                        </span>
                    </div>
                )}
            </Link>
        </article>
    );
}
