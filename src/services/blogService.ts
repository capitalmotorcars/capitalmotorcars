import { supabase } from '@/lib/supabase';
import type { BlogPost, BlogPostFormData, ApiResponse } from '@/types/blog';

function normalizeKeywords(input?: string) {
    if (!input) return undefined;
    return input
        .split(',')
        .map((keyword) => keyword.trim())
        .filter(Boolean)
        .join(', ');
}

/**
 * Get all active blog posts (public)
 */
export async function getActiveBlogPosts(): Promise<ApiResponse<BlogPost[]>> {
    try {
        const nowIso = new Date().toISOString();
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('is_active', true)
            .or(`published_at.is.null,published_at.lte.${nowIso}`)
            .order('display_order', { ascending: true });

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
 * Get all blog posts including inactive (admin only)
 */
export async function getAllBlogPosts(): Promise<ApiResponse<BlogPost[]>> {
    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .order('display_order', { ascending: true });

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
    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('slug', slug)
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
