import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/button';
import { BlogCard } from '@/components/blog/BlogCard';
import { getActiveBlogPosts } from '@/services/blogService';
import type { BlogPost } from '@/types/blog';

export function BlogSection() {
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

    if (loading || posts.length === 0) return null;

    return (
        <section className="py-16 md:py-20">
            <div className="container mx-auto px-4 lg:px-8 space-y-10">
                <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
                    <SectionHeading
                        title="Latest Insights"
                        subtitle="Fresh leasing tips, market updates, and buying guides from Capital Motor Cars."
                    />
                    <Button asChild variant="outline" className="rounded-full border-white/15 hover:bg-white/5">
                        <Link to="/blog">View all posts</Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.slice(0, 3).map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </section>
    );
}
