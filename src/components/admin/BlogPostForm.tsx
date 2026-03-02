import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { uploadBlogImage } from '@/services/blogService';
import type { BlogPost, BlogPostFormData } from '@/types/blog';
import { Loader2, UploadCloud, FileText, Image as ImageIcon, CheckCircle, Hash, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

const blogSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required'),
    excerpt: z.string().optional(),
    content: z.string().min(10, 'Content should be at least 10 characters'),
    seo_title: z.string().optional(),
    seo_description: z.string().optional(),
    seo_keywords: z.string().optional(),
    is_active: z.boolean().optional(),
    published_at: z.string().optional(),
});

type BlogPostFormValues = BlogPostFormData & {
    published_at?: string;
};

interface BlogPostFormProps {
    post?: BlogPost;
    onSubmit: (data: BlogPostFormData) => Promise<void>;
    onCancel: () => void;
    isLoading?: boolean;
}

function slugify(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
}

function normalizePublishedAt(value?: string) {
    if (!value) return null;
    const iso = new Date(`${value}T00:00:00`).toISOString();
    return iso;
}

export function BlogPostForm({ post, onSubmit, onCancel, isLoading }: BlogPostFormProps) {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | undefined>(post?.cover_image_url);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [slugEdited, setSlugEdited] = useState(false);

    const defaultDate = useMemo(() => {
        return new Date().toISOString().split('T')[0];
    }, []);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<BlogPostFormValues>({
        resolver: zodResolver(blogSchema),
        defaultValues: post
            ? {
                ...post,
                published_at: post.published_at ? new Date(post.published_at).toISOString().split('T')[0] : undefined,
            }
            : {
                is_active: true,
                published_at: defaultDate,
            },
    });

    const titleValue = watch('title');
    const isActive = watch('is_active');

    useEffect(() => {
        if (!slugEdited && titleValue) {
            setValue('slug', slugify(titleValue), { shouldValidate: true });
        }
    }, [titleValue, slugEdited, setValue]);

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            processFile(file);
        }
    }

    function processFile(file: File) {
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    }

    function handleDrop(e: React.DragEvent) {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            processFile(file);
        }
    }

    async function handleFormSubmit(values: BlogPostFormValues) {
        let imageUrl = post?.cover_image_url;

        if (imageFile) {
            setUploadingImage(true);
            const result = await uploadBlogImage(imageFile);
            setUploadingImage(false);

            if (result.success && result.data) {
                imageUrl = result.data;
            } else {
                alert('Failed to upload image: ' + result.error);
                return;
            }
        }

        await onSubmit({
            ...values,
            cover_image_url: imageUrl,
            published_at: normalizePublishedAt(values.published_at),
        });
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                            <FileText className="w-5 h-5 text-accent" />
                            <h3 className="text-lg font-bold text-white">Post Details</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="title" className="text-xs uppercase font-bold text-muted-foreground tracking-wider">Title</Label>
                                <Input
                                    id="title"
                                    {...register('title')}
                                    placeholder="Add a strong headline"
                                    className="bg-white/5 border-white/10 focus:border-accent text-white h-11"
                                />
                                {errors.title && <p className="text-xs text-red-400">{errors.title.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="slug" className="text-xs uppercase font-bold text-muted-foreground tracking-wider">Slug</Label>
                                <div className="relative">
                                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="slug"
                                        {...register('slug', {
                                            onChange: () => setSlugEdited(true),
                                        })}
                                        placeholder="post-url-slug"
                                        className="pl-9 bg-white/5 border-white/10 focus:border-accent text-white h-11"
                                    />
                                </div>
                                {errors.slug && <p className="text-xs text-red-400">{errors.slug.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="published_at" className="text-xs uppercase font-bold text-muted-foreground tracking-wider">Publish Date</Label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="published_at"
                                        type="date"
                                        {...register('published_at')}
                                        className="pl-9 bg-white/5 border-white/10 focus:border-accent text-white h-11"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="excerpt" className="text-xs uppercase font-bold text-muted-foreground tracking-wider">Excerpt</Label>
                                <Textarea
                                    id="excerpt"
                                    {...register('excerpt')}
                                    placeholder="Short summary for landing and SEO previews..."
                                    rows={3}
                                    className="bg-white/5 border-white/10 focus:border-accent text-white resize-none"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="content" className="text-xs uppercase font-bold text-muted-foreground tracking-wider">Content</Label>
                                <Textarea
                                    id="content"
                                    {...register('content')}
                                    placeholder="Write the full article..."
                                    rows={10}
                                    className="bg-white/5 border-white/10 focus:border-accent text-white resize-none"
                                />
                                {errors.content && <p className="text-xs text-red-400">{errors.content.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <h3 className="text-lg font-bold text-white">SEO Controls</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="seo_title" className="text-xs uppercase font-bold text-muted-foreground tracking-wider">SEO Title</Label>
                                <Input
                                    id="seo_title"
                                    {...register('seo_title')}
                                    placeholder="Optional SEO title override"
                                    className="bg-white/5 border-white/10 focus:border-green-500/50 text-white h-11"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="seo_description" className="text-xs uppercase font-bold text-muted-foreground tracking-wider">SEO Description</Label>
                                <Textarea
                                    id="seo_description"
                                    {...register('seo_description')}
                                    placeholder="Short SEO description for search results"
                                    rows={3}
                                    className="bg-white/5 border-white/10 focus:border-green-500/50 text-white resize-none"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="seo_keywords" className="text-xs uppercase font-bold text-muted-foreground tracking-wider">SEO Keywords</Label>
                                <Input
                                    id="seo_keywords"
                                    {...register('seo_keywords')}
                                    placeholder="comma, separated, keywords"
                                    className="bg-white/5 border-white/10 focus:border-green-500/50 text-white h-11"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                        <Label className="text-xs uppercase font-bold text-muted-foreground tracking-wider mb-4 block">Publish Status</Label>
                        <div className="flex items-center justify-between gap-4">
                            <span className={cn(
                                "text-sm font-bold transition-colors",
                                isActive ? "text-green-500" : "text-muted-foreground"
                            )}>
                                {isActive ? 'Visible on Website' : 'Hidden / Draft'}
                            </span>
                            <Switch
                                checked={isActive}
                                onCheckedChange={(checked) => setValue('is_active', checked)}
                                className="data-[state=checked]:bg-green-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                            <ImageIcon className="w-5 h-5 text-purple-400" />
                            <h3 className="text-lg font-bold text-white">Cover Image</h3>
                        </div>

                        <div
                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={handleDrop}
                            className={cn(
                                "group relative aspect-[4/3] rounded-2xl border-2 border-dashed transition-all duration-200 overflow-hidden flex flex-col items-center justify-center cursor-pointer",
                                isDragging ? "border-accent bg-accent/10" : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10",
                                imagePreview ? "border-solid border-white/20" : ""
                            )}
                        >
                            {imagePreview ? (
                                <>
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <p className="text-white font-bold text-sm">Click to Change</p>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center p-6 space-y-2 pointer-events-none">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                                        <UploadCloud className="w-6 h-6 text-muted-foreground group-hover:text-white" />
                                    </div>
                                    <p className="text-sm font-bold text-white">Click or Drop Image</p>
                                    <p className="text-xs text-muted-foreground">JPG/PNG, max 1MB</p>
                                </div>
                            )}

                            <Input
                                id="cover_image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-6 mt-8 border-t border-white/10">
                <Button
                    type="button"
                    onClick={onCancel}
                    variant="ghost"
                    className="text-muted-foreground hover:text-white hover:bg-white/10"
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={isLoading || uploadingImage}
                    className="bg-accent hover:bg-accent/90 text-white min-w-[150px] font-bold"
                >
                    {(isLoading || uploadingImage) && (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    )}
                    {isLoading || uploadingImage ? 'Saving...' : post ? 'Update Post' : 'Publish Post'}
                </Button>
            </div>
        </form>
    );
}
