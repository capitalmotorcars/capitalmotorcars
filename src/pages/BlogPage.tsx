import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BlogCard } from '@/components/blog/BlogCard';
import { getActiveBlogPosts } from '@/services/blogService';
import type { BlogPost } from '@/types/blog';
import { primarySeoKeywords } from '@/data/seoKeywords';

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

    return (
        <Layout>
            <SEO
                title="Capital Motor Cars Blog | Leasing Tips & Auto Insights"
                description="Car leasing blog for New Jersey and New York drivers from Capital Motor Cars. Read lease tips, financing guides, and vehicle insights."
                canonicalPath="/blog"
                seoKeywords={[...primarySeoKeywords, 'car leasing blog New Jersey', 'car leasing blog New York', 'lease tips', 'auto financing guides', 'Capital Motor Cars blog']}
                ogType="article"
            />
            <section className="pt-32 pb-16 md:pb-20">
                <div className="container mx-auto px-4 lg:px-8">
                    <SectionHeading
                        title="Capital Motor Cars Blog"
                        subtitle="Practical insights on leasing, financing, and the vehicles you love."
                    />

                    {loading ? (
                        <div className="mt-10 text-muted-foreground">Loading posts...</div>
                    ) : posts.length === 0 ? (
                        <div className="mt-10 text-muted-foreground">No posts available yet.</div>
                    ) : (
                        <div className="mt-10 space-y-12 md:space-y-16">
                            {/* Featured Post */}
                            <div className="relative group">
                                <BlogCard post={posts[0]} className="!bg-transparent !border-none !shadow-none p-0 overflow-visible" isFeatured />
                            </div>

                            <div className="h-px w-full bg-border/40" />

                            {/* Remaining Posts Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {posts.slice(1).map((post) => (
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
