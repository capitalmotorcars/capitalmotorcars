import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { BlogPost, BlogPostFormData, ApiResponse } from '@/types/blog';
import { mockBlogs } from '@/data/mockBlogs';

function normalizeKeywords(input?: string) {
    if (!input) return undefined;
    return input
        .split(',')
        .map((keyword) => keyword.trim())
        .filter(Boolean)
        .join(', ');
}

const BLOG_SUMMARY_COLUMNS = 'id, title, slug, excerpt, cover_image_url, seo_title, seo_description, seo_keywords, display_order, is_active, published_at, created_at, updated_at, is_featured';

export interface GetActiveBlogPostsOptions {
    limit?: number;
}

/**
 * Get active blog posts (public)
 * Queries summary fields only to prevent excessive egress bandwidth.
 */
export async function getActiveBlogPosts(options?: number | GetActiveBlogPostsOptions): Promise<ApiResponse<BlogPost[]>> {
    const limitCount = typeof options === 'number' ? options : options?.limit;

    let fallbackData = mockBlogs
        .filter(p => p.is_active)
        .sort((a, b) => {
            // Featured posts first, then newest first
            if ((b.is_featured ? 1 : 0) !== (a.is_featured ? 1 : 0)) {
                return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
            }
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });

    if (limitCount && limitCount > 0) {
        fallbackData = fallbackData.slice(0, limitCount);
    }
    
    if (!isSupabaseConfigured) {
        return { success: true, data: fallbackData };
    }

    try {
        const nowIso = new Date().toISOString();
        let query = supabase
            .from('blog_posts')
            .select(BLOG_SUMMARY_COLUMNS)
            .eq('is_active', true)
            .or(`published_at.is.null,published_at.lte.${nowIso}`)
            .order('is_featured', { ascending: false, nullsFirst: false })
            .order('created_at', { ascending: false });

        if (limitCount && limitCount > 0) {
            query = query.limit(limitCount);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Supabase error:', error);
            return { success: true, data: fallbackData };
        }

        // If Supabase returns nothing, show the mock blogs so the user can see the content
        if (!data || data.length === 0) {
            return { success: true, data: fallbackData };
        }

        const posts: BlogPost[] = data.map((p) => ({
            ...p,
            content: (p as any).content || p.excerpt || '',
            author: (p as any).author || 'Christopher Amico'
        }));

        return { success: true, data: posts };
    } catch (err) {
        return { success: true, data: fallbackData };
    }
}

export const BLOG_CATEGORIES = [
    'All Articles',
    'Leasing Guides',
    'Reliability & Reviews',
    'Problems & Maintenance',
    'Electric & Hybrid',
    'SUVs & Trucks'
] as const;

export type BlogCategory = typeof BLOG_CATEGORIES[number];

export const CATEGORY_KEYWORDS: Record<string, string[]> = {
    'Leasing Guides': ['lease', 'leasing', 'broker', 'tax', 'credit', 'money factor', 'down payment', 'sign and drive', 'contract'],
    'Reliability & Reviews': ['reliability', 'review', 'dependability', 'reliable', 'good cars', 'longevity'],
    'Problems & Maintenance': ['squeak', 'problem', 'issue', 'repair', 'maintenance', 'broken', 'fault', 'noise', 'key', 'ignition', 'skidding', 'wear'],
    'Electric & Hybrid': ['ev', 'electric', 'hybrid', 'ioniq', 'blazer ev', 'battery', 'plug-in', 'lyriq', 'phev'],
    'SUVs & Trucks': ['suv', 'crossover', 'truck', 'f150', 'ram', 'silverado', 'traverse', 'telluride', 'atlas', 'grand cherokee', 'wrangler', 'cx-5', 'cx-9', 'sienna'],
};

export interface GetPaginatedBlogPostsParams {
    page?: number;
    pageSize?: number;
    category?: string;
    search?: string;
}

export interface PaginatedBlogPostsResult {
    posts: BlogPost[];
    totalCount: number;
    featuredPost: BlogPost | null;
}

/**
 * Get paginated blog posts with database-level search and category filtering.
 * Only retrieves the requested page slice (e.g. 12 rows) to minimize egress.
 */
export async function getPaginatedBlogPosts({
    page = 1,
    pageSize = 12,
    category = 'All Articles',
    search = '',
}: GetPaginatedBlogPostsParams = {}): Promise<ApiResponse<PaginatedBlogPostsResult>> {
    const isDefaultPage1 = page === 1 && !search.trim() && category === 'All Articles';
    const isDefaultLater = page > 1 && !search.trim() && category === 'All Articles';

    let from: number;
    let to: number;
    if (isDefaultPage1) {
        from = 0;
        to = pageSize;
    } else if (isDefaultLater) {
        from = 1 + (page - 1) * pageSize;
        to = from + pageSize - 1;
    } else {
        from = (page - 1) * pageSize;
        to = from + pageSize - 1;
    }

    if (!isSupabaseConfigured) {
        let filtered = mockBlogs.filter(p => p.is_active);
        if (category && category !== 'All Articles' && CATEGORY_KEYWORDS[category]) {
            const keywords = CATEGORY_KEYWORDS[category];
            filtered = filtered.filter(p => {
                const text = (p.title + ' ' + p.slug + ' ' + (p.seo_keywords || '') + ' ' + (p.excerpt || '')).toLowerCase();
                return keywords.some(k => text.includes(k.toLowerCase()));
            });
        }
        const trimmed = search.trim().toLowerCase();
        if (trimmed) {
            filtered = filtered.filter(p => {
                const text = (p.title + ' ' + p.slug + ' ' + (p.seo_keywords || '') + ' ' + (p.excerpt || '')).toLowerCase();
                return text.includes(trimmed);
            });
        }
        const total = filtered.length;
        if (isDefaultPage1 && filtered.length > 0) {
            return {
                success: true,
                data: {
                    featuredPost: filtered[0],
                    posts: filtered.slice(1, pageSize + 1),
                    totalCount: Math.max(0, total - 1)
                }
            };
        }
        return {
            success: true,
            data: {
                featuredPost: null,
                posts: filtered.slice(from, to + 1),
                totalCount: isDefaultLater ? Math.max(0, total - 1) : total
            }
        };
    }

    try {
        const nowIso = new Date().toISOString();
        let query = supabase
            .from('blog_posts')
            .select(BLOG_SUMMARY_COLUMNS, { count: 'exact' })
            .eq('is_active', true)
            .or(`published_at.is.null,published_at.lte.${nowIso}`);

        if (category && category !== 'All Articles' && CATEGORY_KEYWORDS[category]) {
            const clauses: string[] = [];
            for (const w of CATEGORY_KEYWORDS[category]) {
                clauses.push(`title.ilike.%${w}%`);
                clauses.push(`slug.ilike.%${w}%`);
                clauses.push(`excerpt.ilike.%${w}%`);
                clauses.push(`seo_keywords.ilike.%${w}%`);
            }
            query = query.or(clauses.join(','));
        }

        const trimmedSearch = search.trim();
        if (trimmedSearch) {
            const s = trimmedSearch.replace(/[,%]/g, ' ');
            const searchClauses = [
                `title.ilike.%${s}%`,
                `slug.ilike.%${s}%`,
                `excerpt.ilike.%${s}%`,
                `seo_keywords.ilike.%${s}%`
            ].join(',');
            query = query.or(searchClauses);
        }

        query = query
            .order('is_featured', { ascending: false, nullsFirst: false })
            .order('created_at', { ascending: false })
            .order('id', { ascending: true })
            .range(from, to);

        const { data, count, error } = await query;
        if (error) {
            console.error('Supabase error in getPaginatedBlogPosts:', error);
            return { success: false, error: error.message };
        }

        const mapRow = (p: any): BlogPost => ({
            ...p,
            content: p.content || p.excerpt || '',
            author: p.author || 'Christopher Amico'
        });

        const total = count || 0;
        const mapped = (data || []).map(mapRow);

        if (isDefaultPage1 && mapped.length > 0) {
            return {
                success: true,
                data: {
                    featuredPost: mapped[0],
                    posts: mapped.slice(1),
                    totalCount: Math.max(0, total - 1)
                }
            };
        }

        return {
            success: true,
            data: {
                featuredPost: null,
                posts: mapped,
                totalCount: isDefaultLater ? Math.max(0, total - 1) : total
            }
        };
    } catch (err) {
        console.error('Error fetching paginated blog posts:', err);
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Failed to fetch posts'
        };
    }
}

/**
 * Get all blog posts including inactive (admin only)
 */
export async function getAllBlogPosts(): Promise<ApiResponse<BlogPost[]>> {
    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .order('is_featured', { ascending: false, nullsFirst: false })
            .order('created_at', { ascending: false });

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, data: data || [] };
    } catch (err) {
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Failed to fetch blog posts',
        };
    }
}

/**
 * Get a single blog post by ID
 */
export async function getBlogPostById(id: string): Promise<ApiResponse<BlogPost>> {
    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (err) {
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Failed to fetch blog post',
        };
    }
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<ApiResponse<BlogPost>> {
    if (!isSupabaseConfigured) {
        const post = mockBlogs.find(p => p.slug === slug);
        return post ? { success: true, data: post } : { success: false, error: 'Post not found' };
    }

    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error) {
            const post = mockBlogs.find(p => p.slug === slug);
            return post ? { success: true, data: post } : { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (err) {
        const post = mockBlogs.find(p => p.slug === slug);
        return post ? { success: true, data: post } : { success: false, error: err instanceof Error ? err.message : 'Failed to fetch blog post' };
    }
}

/**
 * Create a new blog post
 */
export async function createBlogPost(postData: BlogPostFormData): Promise<ApiResponse<BlogPost>> {
    try {
        const { data: maxOrderData } = await supabase
            .from('blog_posts')
            .select('display_order')
            .order('display_order', { ascending: false })
            .limit(1)
            .single();

        const nextOrder = (maxOrderData?.display_order || 0) + 1;
        const normalized = { ...postData, display_order: nextOrder, seo_keywords: normalizeKeywords(postData.seo_keywords) };

        const { data, error } = await supabase
            .from('blog_posts')
            .insert([normalized])
            .select()
            .single();

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (err) {
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Failed to create blog post',
        };
    }
}

/**
 * Update an existing blog post
 */
export async function updateBlogPost(
    id: string,
    postData: Partial<BlogPostFormData>
): Promise<ApiResponse<BlogPost>> {
    try {
        const normalized = { ...postData, seo_keywords: normalizeKeywords(postData.seo_keywords) };
        const { data, error } = await supabase
            .from('blog_posts')
            .update(normalized)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (err) {
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Failed to update blog post',
        };
    }
}

/**
 * Delete a blog post
 */
export async function deleteBlogPost(id: string): Promise<ApiResponse<void>> {
    try {
        const { error } = await supabase
            .from('blog_posts')
            .delete()
            .eq('id', id);

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (err) {
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Failed to delete blog post',
        };
    }
}

/**
 * Reorder blog posts
 */
export async function reorderBlogPosts(
    postIds: string[]
): Promise<ApiResponse<void>> {
    try {
        const updates = postIds.map((id, index) =>
            supabase
                .from('blog_posts')
                .update({ display_order: index })
                .eq('id', id)
        );

        await Promise.all(updates);
        return { success: true };
    } catch (err) {
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Failed to reorder blog posts',
        };
    }
}

/**
 * Upload an image to Supabase Storage
 */
export async function uploadBlogImage(
    file: File
): Promise<ApiResponse<string>> {
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `blog/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('blog-images')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false,
            });

        if (uploadError) {
            return { success: false, error: uploadError.message };
        }

        const { data: { publicUrl } } = supabase.storage
            .from('blog-images')
            .getPublicUrl(filePath);

        return { success: true, data: publicUrl };
    } catch (err) {
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Failed to upload image',
        };
    }
}

/**
 * Delete an image from Supabase Storage
 */
export async function deleteBlogImage(imageUrl: string): Promise<ApiResponse<void>> {
    try {
        const urlParts = imageUrl.split('/blog-images/');
        if (urlParts.length < 2) {
            return { success: false, error: 'Invalid image URL' };
        }

        const filePath = urlParts[1];
        const { error } = await supabase.storage
            .from('blog-images')
            .remove([filePath]);

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (err) {
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Failed to delete image',
        };
    }
}
