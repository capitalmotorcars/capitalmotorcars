export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    author?: string;
    excerpt?: string;
    content: string;
    cover_image_url?: string;
    seo_title?: string;
    seo_description?: string;
    seo_keywords?: string;
    display_order: number;
    is_active: boolean;
    is_featured?: boolean;
    published_at?: string | null;
    created_at: string;
    updated_at: string;
}

export interface BlogPostFormData {
    title: string;
    slug: string;
    author?: string;
    excerpt?: string;
    content: string;
    cover_image_url?: string;
    seo_title?: string;
    seo_description?: string;
    seo_keywords?: string;
    is_active?: boolean;
    is_featured?: boolean;
    published_at?: string | null;
}

export interface ApiResponse<T> {
    data?: T;
    error?: string;
    success: boolean;
}
