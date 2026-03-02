import { useEffect, useState, type ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { getBlogPostBySlug } from '@/services/blogService';
import type { BlogPost } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowLeft } from 'lucide-react';

function formatDate(value?: string | null) {
    if (!value) return '';
    const date = new Date(value);
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(date);
}

function parseKeywords(value?: string) {
    if (!value) return undefined;
    return value.split(',').map((keyword) => keyword.trim()).filter(Boolean);
}

/** Renders **bold** text as <strong> */
function renderInlineBold(text: string) {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, idx) =>
        part.startsWith('**') && part.endsWith('**')
            ? <strong key={idx} className="text-foreground font-semibold">{part.slice(2, -2)}</strong>
            : part
    );
}

/** Renders plain text with section headings and bullet lists styled properly */
function BlogContent({ content }: { content: string }) {
    const lines = content.split('\n');
    const blocks: ReactNode[] = [];
    let i = 0;
    let key = 0;

    while (i < lines.length) {
        const line = lines[i];
        if (line.trim() === '') {
            i++;
            continue;
        }

        // Bullet list (lines starting with - or *)
        if (/^[\-\*]\s+/.test(line)) {
            const items: string[] = [];
            while (i < lines.length && /^[\-\*]\s+/.test(lines[i])) {
                items.push(lines[i].replace(/^[\-\*]\s+/, '').trim());
                i++;
            }
            blocks.push(
                <ul key={key++} className="list-disc pl-6 space-y-2 my-4 text-muted-foreground leading-relaxed">
                    {items.map((item, j) => (
                        <li key={j}>{renderInlineBold(item)}</li>
                    ))}
                </ul>
            );
            continue;
        }

        // Section heading: short line ending with : (e.g. "Leasing is best if you:")
        const trimmed = line.trim();
        const isHeading = trimmed.endsWith(':') && trimmed.length < 80 && !trimmed.startsWith('http');
        if (isHeading) {
            blocks.push(
                <h3 key={key++} className="text-lg font-bold text-foreground mt-8 mb-3 first:mt-0">
                    {trimmed}
                </h3>
            );
            i++;
            continue;
        }

        // Paragraph: collect consecutive non-empty, non-bullet, non-heading lines
        const paraLines: string[] = [];
        while (i < lines.length) {
            const l = lines[i];
            if (l.trim() === '') break;
            if (/^[\-\*]\s+/.test(l)) break;
            if (l.trim().endsWith(':') && l.trim().length < 80) break;
            paraLines.push(l);
            i++;
        }
        if (paraLines.length > 0) {
            blocks.push(
                <p key={key++} className="text-muted-foreground leading-[1.75] mb-4">
                    {renderInlineBold(paraLines.join('\n'))}
                </p>
            );
        }
    }

    return <div className="text-base sm:text-[17px]">{blocks}</div>;
}

export default function BlogPostPage() {
    const { slug } = useParams();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadPost() {
            if (!slug) return;
            const result = await getBlogPostBySlug(slug);
            if (result.success && result.data) {
                setPost(result.data);
            }
            setLoading(false);
        }

        loadPost();
    }, [slug]);

    if (loading) {
        return (
            <Layout>
                <section className="pt-32 pb-20">
                    <div className="container mx-auto px-4 lg:px-8 text-muted-foreground">
                        Loading post...
                    </div>
                </section>
            </Layout>
        );
    }

    if (!post) {
        return (
            <Layout>
                <section className="pt-32 pb-20">
                    <div className="container mx-auto px-4 lg:px-8 text-muted-foreground">
                        Post not found.
                    </div>
                </section>
            </Layout>
        );
    }

    return (
        <Layout>
            <SEO
                title={post.seo_title || post.title}
                description={post.seo_description || post.excerpt || 'Capital Motor Cars blog post'}
                canonicalPath={`/blog/${post.slug}`}
                seoKeywords={parseKeywords(post.seo_keywords)}
                ogTitle={post.seo_title || post.title}
                ogDescription={post.seo_description || post.excerpt || post.title}
                ogImage={post.cover_image_url}
                ogType="article"
            />
            <section className="pt-32 pb-20">
                <div className="container mx-auto px-4 lg:px-8">
                    <Button asChild variant="ghost" className="mb-6 text-muted-foreground ">
                        <Link to="/blog" className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Back to blog
                        </Link>
                    </Button>

                    <div className="max-w-3xl mx-auto space-y-6">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{formatDate(post.published_at || post.created_at)}</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tight">{post.title}</h1>
                            {post.excerpt && (
                                <p className="text-lg text-muted-foreground">{post.excerpt}</p>
                            )}
                        </div>

                        {post.cover_image_url && (
                            <div className="overflow-hidden rounded-3xl border border-white/10">
                                <img
                                    src={post.cover_image_url}
                                    alt={post.title}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        )}

                        <BlogContent content={post.content} />
                    </div>
                </div>
            </section>
        </Layout>
    );
}
