import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { SectionHeading } from '@/components/ui/SectionHeading';
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

    return (
        <Layout>
            <SEO
                title="Capital Motor Cars Blog | Leasing Tips & Auto Insights"
                description="Explore leasing advice, market insights, and vehicle guides from Capital Motor Cars."
                canonicalPath="/blog"
                seoKeywords={['car leasing tips', 'auto leasing blog', 'vehicle guides', 'Capital Motor Cars']}
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
                        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {posts.map((post) => (
                                <BlogCard key={post.id} post={post} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    );
}
