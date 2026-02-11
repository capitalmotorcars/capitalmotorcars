import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { uploadDealImage } from '@/services/dealService';
import type { DealFormData, LeaseDeal } from '@/types/deals';
import { Loader2, UploadCloud, Car, DollarSign, Calendar, FileText, Image as ImageIcon, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';

const dealSchema = z.object({
    make: z.string().min(1, 'Make is required'),
    model: z.string().min(1, 'Model is required'),
    year: z.number().min(2020).max(2030),
    trim: z.string().optional(),
    monthly_price: z.number().min(0, 'Price must be positive'),
    down_payment: z.number().min(0, 'Down payment must be positive'),
    lease_term: z.number().min(12).max(60, 'Lease term must be between 12-60 months'),
    highlights: z.string().optional(),
    is_active: z.boolean().optional(),
});

interface DealFormProps {
    deal?: LeaseDeal;
    onSubmit: (data: DealFormData) => Promise<void>;
    onCancel: () => void;
    isLoading?: boolean;
}

export function DealForm({ deal, onSubmit, onCancel, isLoading }: DealFormProps) {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | undefined>(deal?.image_url);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<DealFormData>({
        resolver: zodResolver(dealSchema),
        defaultValues: deal || {
            is_active: true,
            lease_term: 36,
            year: new Date().getFullYear(),
        },
    });

    const isActive = watch('is_active');

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

    async function handleFormSubmit(data: DealFormData) {
        let imageUrl = deal?.image_url;

        // Upload image if a new one was selected
        if (imageFile) {
            setUploadingImage(true);
            const result = await uploadDealImage(imageFile);
            setUploadingImage(false);

            if (result.success && result.data) {
                imageUrl = result.data;
            } else {
                alert('Failed to upload image: ' + result.error);
                return;
            }
        }

        await onSubmit({ ...data, image_url: imageUrl });
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Column - Form Fields */}
                <div className="lg:col-span-8 space-y-8">

                    {/* Vehicle Identity Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                            <Car className="w-5 h-5 text-accent" />
                            <h3 className="text-lg font-bold text-white">Vehicle Identity</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="year" className="text-xs uppercase font-bold text-muted-foreground tracking-wider">Year</Label>
                                <Input
                                    id="year"
                                    type="number"
                                    {...register('year', { valueAsNumber: true })}
                                    className="bg-white/5 border-white/10 focus:border-accent text-white h-11"
                                />
                                {errors.year && <p className="text-xs text-red-400">{errors.year.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="make" className="text-xs uppercase font-bold text-muted-foreground tracking-wider">Make</Label>
                                <Input
                                    id="make"
                                    {...register('make')}
                                    placeholder="e.g. BMW"
                                    className="bg-white/5 border-white/10 focus:border-accent text-white h-11"
                                />
                                {errors.make && <p className="text-xs text-red-400">{errors.make.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="model" className="text-xs uppercase font-bold text-muted-foreground tracking-wider">Model</Label>
                                <Input
                                    id="model"
                                    {...register('model')}
                                    placeholder="e.g. X5"
                                    className="bg-white/5 border-white/10 focus:border-accent text-white h-11"
                                />
                                {errors.model && <p className="text-xs text-red-400">{errors.model.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="trim" className="text-xs uppercase font-bold text-muted-foreground tracking-wider">Trim Level</Label>
                                <Input
                                    id="trim"
                                    {...register('trim')}
                                    placeholder="e.g. M Competition"
                                    className="bg-white/5 border-white/10 focus:border-accent text-white h-11"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Lease Terms Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                            <DollarSign className="w-5 h-5 text-green-400" />
                            <h3 className="text-lg font-bold text-white">Lease Terms</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="monthly_price" className="text-xs uppercase font-bold text-muted-foreground tracking-wider">Monthly Payment</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">$</span>
                                    <Input
                                        id="monthly_price"
                                        type="number"
                                        step="0.01"
                                        {...register('monthly_price', { valueAsNumber: true })}
                                        className="pl-7 bg-white/5 border-white/10 focus:border-green-500/50 text-white font-mono h-11"
                                    />
                                </div>
                                {errors.monthly_price && <p className="text-xs text-red-400">{errors.monthly_price.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="down_payment" className="text-xs uppercase font-bold text-muted-foreground tracking-wider">Down Payment</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">$</span>
                                    <Input
                                        id="down_payment"
                                        type="number"
                                        step="0.01"
                                        {...register('down_payment', { valueAsNumber: true })}
                                        className="pl-7 bg-white/5 border-white/10 focus:border-green-500/50 text-white font-mono h-11"
                                    />
                                </div>
                                {errors.down_payment && <p className="text-xs text-red-400">{errors.down_payment.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="lease_term" className="text-xs uppercase font-bold text-muted-foreground tracking-wider">Term (Months)</Label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="lease_term"
                                        type="number"
                                        {...register('lease_term', { valueAsNumber: true })}
                                        className="pl-9 bg-white/5 border-white/10 focus:border-green-500/50 text-white font-mono h-11"
                                    />
                                </div>
                                {errors.lease_term && <p className="text-xs text-red-400">{errors.lease_term.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Highlights Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                            <FileText className="w-5 h-5 text-blue-400" />
                            <h3 className="text-lg font-bold text-white">Highlights & Notes</h3>
                        </div>
                        <Textarea
                            id="highlights"
                            {...register('highlights')}
                            placeholder="Key features, packages, or limited time offers..."
                            rows={4}
                            className="bg-white/5 border-white/10 focus:border-blue-500/50 text-white resize-none"
                        />
                    </div>
                </div>

                {/* Right Column - Image & Status */}
                <div className="lg:col-span-4 space-y-8">

                    {/* Status Card */}
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                        <Label className="text-xs uppercase font-bold text-muted-foreground tracking-wider mb-4 block">Deployment Status</Label>
                        <div className="flex items-center justify-between gap-4">
                            <span className={cn(
                                "text-sm font-bold transition-colors",
                                isActive ? "text-green-500" : "text-muted-foreground"
                            )}>
                                {isActive ? 'Active on Website' : 'Hidden / Draft'}
                            </span>
                            <Switch
                                checked={isActive}
                                onCheckedChange={(checked) => setValue('is_active', checked)}
                                className="data-[state=checked]:bg-green-500"
                            />
                        </div>
                    </div>

                    {/* Image Upload Card */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                            <ImageIcon className="w-5 h-5 text-purple-400" />
                            <h3 className="text-lg font-bold text-white">Vehicle Image</h3>
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
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
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
                    {isLoading || uploadingImage ? 'Saving...' : deal ? 'Update Deal' : 'Deploy Deal'}
                </Button>
            </div>
        </form>
    );
}
