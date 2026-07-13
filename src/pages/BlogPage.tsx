import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createWebPageSchema } from '@/components/JsonLd';
import { BlogCard } from '@/components/blog/BlogCard';
import { getActiveBlogPosts } from '@/services/blogService';
import type { BlogPost } from '@/types/blog';


export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadPosts() {
            const result = await getActiveBlogPosts();
            if (result.success && result.data) {
                setPosts(result.data);
            }
            setLoading(false);
        }

        loadPosts();
    }, []);

    // Explicit featured post as hero; all others in grid (already sorted newest-first by service)
    const featuredPost = posts.find(p => p.is_featured) ?? posts[0];
    const gridPosts = posts.filter(p => p !== featuredPost);

    return (
        <Layout>
            <SEO
                title="Capital Motor Cars Blog | Leasing Tips & Auto Insights"
                description="Car leasing blog for New Jersey and New York drivers from Capital Motor Cars. Read lease tips, credit guides, and vehicle insights."
                canonicalPath="/blog"
                seoKeywords={['car leasing blog New Jersey', 'car leasing blog New York', 'lease tips', 'auto leasing guides', 'Capital Motor Cars blog']}
                ogType="website"
                ogImage="https://www.capitalmotorcars.com/shared-img.png"
            />
            <JsonLd data={createWebPageSchema({
                name: 'Capital Motor Cars Blog | Leasing Tips & Auto Insights',
                description: 'Car leasing blog for New Jersey and New York drivers from Capital Motor Cars. Read lease tips, credit guides, and vehicle insights.',
                url: 'https://www.capitalmotorcars.com/blog',
            })} />
            <section className="pt-32 pb-16 md:pb-20">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="mb-10 text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Capital Motor Cars Blog
                        </h1>
                        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                            Practical insights on leasing and the vehicles you love.
                        </p>
                    </div>

                    {loading ? (
                        <div className="mt-10 text-muted-foreground">Loading posts...</div>
                    ) : posts.length === 0 ? (
                        <div className="mt-10 text-muted-foreground">No posts available yet.</div>
                    ) : (
                        <div className="mt-10 space-y-12 md:space-y-16">
                            {/* Featured Post Hero */}
                            {featuredPost && (
                                <div className="relative group">
                                    <BlogCard post={featuredPost} className="!bg-transparent !border-none !shadow-none p-0 overflow-visible" isFeatured />
                                </div>
                            )}

                            <div className="h-px w-full bg-border/40" />

                            {/* Remaining Posts Grid - sorted newest first */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {gridPosts.map((post) => (
                                    <BlogCard key={post.id} post={post} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    );
}
