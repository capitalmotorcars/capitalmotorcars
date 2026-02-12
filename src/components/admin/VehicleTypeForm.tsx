import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { uploadVehicleImage } from '@/services/vehicleTypeService';
import type { VehicleType, VehicleTypeFormData } from '@/types/vehicle';
import { Loader2, UploadCloud, Car, DollarSign, FileText, Image as ImageIcon, Save, X, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { AlertCircle } from 'lucide-react';

// --- Zod Schemas ---

const performanceSchema = z.object({
    hp: z.number().min(0).default(0),
    torque: z.number().min(0).default(0),
    engine: z.string().default(''),
    transmission: z.string().default(''),
    drivetrain: z.string().default(''),
    zeroToSixty: z.string().default(''),
});

const fuelEconomySchema = z.object({
    city: z.number().min(0).default(0),
    hwy: z.number().min(0).default(0),
    avg: z.number().min(0).default(0),
    range: z.number().min(0).default(0),
});

const specsSchema = z.object({
    exterior: z.object({
        length: z.string().default(''),
        height: z.string().default(''),
        weight: z.string().default(''),
        wheels: z.string().default(''),
    }),
    interior: z.object({
        headroom: z.string().default(''),
        legroom: z.string().default(''),
        cargo: z.string().default(''),
        passengers: z.number().min(1).default(0),
    }),
    warranty: z.object({
        comprehensive: z.string().default(''),
        powertrain: z.string().default(''),
        roadside: z.string().default(''),
    }),
});

const featureGroupSchema = z.object({
    category: z.string().min(1, 'Category is required'),
    items: z.array(z.string()).default([]), // Handling array of strings might need a transform or simpler handling
});

const vehicleTypeSchema = z.object({
    slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with dashes'),
    name: z.string().min(1, 'Name is required'),
    bodyStyle: z.string().min(1, 'Body Style is required'),
    display_category: z.string().nullable().optional(),
    image_url: z.string().nullable().optional(),
    vehicle_name: z.string().min(1, 'Full Vehicle Name is required'),
    description: z.string().nullable().optional(),
    starting_price: z.number().min(0),
    fuel_types: z.array(z.string()).default([]),
    drivetrain: z.array(z.string()).default([]),
    passenger_capacity: z.number().min(1).default(5),
    cargo_space: z.string().default('medium'),
    highlights: z.array(z.string()).default([]),
    popular_brands: z.array(z.string()).default([]),
    ideal_for: z.array(z.string()).default([]),
    features: z.array(z.string()).default([]),
    badge: z.string().nullable().optional(),
    is_luxury: z.boolean().default(false),
    is_featured: z.boolean().default(false),
    show_in_hero: z.boolean().default(true),
    year: z.number().min(2020).max(2030).default(2026),
    meta_title: z.string().nullable().optional(),
    meta_description: z.string().nullable().optional(),

    // Nested Objects
    performance: performanceSchema,
    fuel_economy: fuelEconomySchema,
    specs: specsSchema,
    feature_groups: z.array(z.object({
        category: z.string(),
        items: z.array(z.string())
    })).default([]),
});

// Custom helper for handling nested array inputs for features/highlights since they are just array of strings in DB
const ArrayInput = ({ label, value, onChange }: { label: string, value: string[], onChange: (val: string[]) => void }) => (
    <div className="space-y-2">
        <Label className="text-xs uppercase font-bold text-muted-foreground tracking-wider text-white">{label}</Label>
        <Textarea
            className="bg-white/5 border-white/10 focus:border-accent text-white"
            placeholder="Separate items with commas..."
            defaultValue={value?.join(', ')}
            onChange={(e) => {
                const val = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                onChange(val);
            }}
        />
        <p className="text-[10px] text-muted-foreground">Comma separated values</p>
    </div>
);

interface VehicleTypeFormProps {
    vehicleType?: VehicleType;
    onSubmit: (data: Partial<VehicleTypeFormData>) => Promise<void>;
    onCancel: () => void;
    isLoading?: boolean;
}

export function VehicleTypeForm({ vehicleType, onSubmit, onCancel, isLoading }: VehicleTypeFormProps) {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | undefined>(vehicleType?.image);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [activeTab, setActiveTab] = useState('basic');
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    // Helper to transform initial data
    // Logic: VehicleType interface (camelCase) -> VehicleTypeFormData (mostly snake_case for DB)
    // Actually, I should have consistent typing. My Zod schema uses snake_case keys where DB uses them.
    // But usage in Form defaultValues needs to match schema.
    const defaultValues: any = vehicleType ? {
        slug: vehicleType.slug,
        name: vehicleType.name,
        bodyStyle: vehicleType.bodyStyle,
        display_category: vehicleType.displayCategory || null,
        image_url: vehicleType.image || null,
        vehicle_name: vehicleType.vehicleName,
        description: vehicleType.description || null,
        starting_price: vehicleType.startingPrice,
        fuel_types: vehicleType.fuelTypes,
        year: vehicleType.year,
        drivetrain: vehicleType.drivetrain,
        passenger_capacity: vehicleType.passengerCapacity,
        cargo_space: vehicleType.cargoSpace,
        highlights: vehicleType.highlights,
        popular_brands: vehicleType.popularBrands,
        ideal_for: vehicleType.idealFor,
        features: vehicleType.features,
        badge: vehicleType.badge,
        is_luxury: vehicleType.isLuxury,
        is_featured: vehicleType.isFeatured,
        show_in_hero: vehicleType.showInHero ?? true,
        meta_title: vehicleType.metaTitle || null,
        meta_description: vehicleType.metaDescription || null,
        performance: vehicleType.performance || { hp: 0, torque: 0, engine: '', transmission: '', drivetrain: '', zeroToSixty: '' },
        fuel_economy: vehicleType.fuelEconomy || { city: 0, hwy: 0, avg: 0, range: 0 },
        specs: vehicleType.specs || {
            exterior: { length: '', height: '', weight: '', wheels: '' },
            interior: { headroom: '', legroom: '', cargo: '', passengers: 0 },
            warranty: { comprehensive: '', powertrain: '', roadside: '' }
        },
        feature_groups: vehicleType.featureGroups || [],
    } : {
        slug: '',
        name: '',
        bodyStyle: '',
        display_category: null,
        vehicle_name: '',
        description: null,
        starting_price: 0,
        fuel_types: [],
        year: new Date().getFullYear(),
        drivetrain: [],
        passenger_capacity: 0,
        cargo_space: 'medium',
        highlights: [],
        popular_brands: [],
        ideal_for: [],
        features: [],
        is_luxury: false,
        is_featured: false,
        show_in_hero: true,
        performance: { hp: 0, torque: 0, engine: '', transmission: '', drivetrain: '', zeroToSixty: '' },
        fuel_economy: { city: 0, hwy: 0, avg: 0, range: 0 },
        specs: {
            exterior: { length: '', height: '', weight: '', wheels: '' },
            interior: { headroom: '', legroom: '', cargo: '', passengers: 0 },
            warranty: { comprehensive: '', powertrain: '', roadside: '' }
        },
        feature_groups: [],
    };

    const {
        register,
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<VehicleTypeFormData>({
        resolver: zodResolver(vehicleTypeSchema),
        defaultValues,
    });

    const { fields: featureGroupFields, append: appendFeatureGroup, remove: removeFeatureGroup } = useFieldArray({
        control,
        name: "feature_groups"
    });

    const watchHighlights = watch('highlights');
    const watchFeatures = watch('features');
    const watchIdealFor = watch('ideal_for');
    const watchPopularBrands = watch('popular_brands');
    const watchFuelTypes = watch('fuel_types');
    const watchDrivetrain = watch('drivetrain');
    const watchYear = watch('year');

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }

    async function onFormSubmit(data: any) {
        try {
            let finalImageUrl = data.image_url;

            if (imageFile) {
                setUploadingImage(true);
                const res = await uploadVehicleImage(imageFile);
                setUploadingImage(false);
                if (res.success && res.data) {
                    finalImageUrl = res.data;
                } else {
                    console.error("Image upload failed", res.error);
                    toast.error("Image upload failed: " + res.error);
                    setUploadingImage(false);
                    return; // Stop if image upload was intended but failed
                }
            }

            await onSubmit({ ...data, image_url: finalImageUrl });
        } catch (err) {
            console.error("Form submit error", err);
        }
    }

    const onInvalid = (errors: any) => {
        const errorList: string[] = [];
        // Recursively find errors
        const flattenErrors = (obj: any, prefix = '') => {
            for (const key in obj) {
                const error = obj[key];
                if (error.message) {
                    const label = key.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').toLowerCase();
                    errorList.push(`${prefix}${label}: ${error.message}`);
                } else if (typeof error === 'object') {
                    flattenErrors(error, `${prefix}${key} > `);
                }
            }
        };
        flattenErrors(errors);
        setValidationErrors(errorList);
        setShowErrorDialog(true);
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit, onInvalid)} className="space-y-6 h-full flex flex-col">
            <div className="flex-1 overflow-y-auto pr-2 ">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full overflow-hidden">
                    <TabsList className="w-full grid grid-cols-4 bg-white/5 border-b border-white/10 p-1 mb-6 rounded-xl">
                        <TabsTrigger value="basic">Basic Info</TabsTrigger>
                        <TabsTrigger value="performance">Performance</TabsTrigger>
                        <TabsTrigger value="specs">Specs</TabsTrigger>
                        <TabsTrigger value="features">Features</TabsTrigger>
                    </TabsList>

                    {/* --- Basic Info Tab --- */}
                    <TabsContent value="basic" className="space-y-8 animate-in fade-in-50 slide-in-from-bottom-2">
                        {/* Identity */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="vehicle_name">Full Vehicle Name</Label>
                                    <Input id="vehicle_name" {...register('vehicle_name')} className="bg-white/5 border-white/10" />
                                    {errors.vehicle_name && <p className="text-red-500 text-xs">{errors.vehicle_name.message as string}</p>}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Short Name</Label>
                                        <Input id="name" {...register('name')} className="bg-white/5 border-white/10" placeholder="e.g. SUV" />
                                        {errors.name && <p className="text-red-500 text-xs">{errors.name.message as string}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="slug">Slug (URL)</Label>
                                        <Input id="slug" {...register('slug')} className="bg-white/5 border-white/10" placeholder="e.g. bmw-x5" />
                                        {errors.slug && <p className="text-red-500 text-xs">{errors.slug.message as string}</p>}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="badge">Badge (Optional Label)</Label>
                                    <Input id="badge" {...register('badge')} className="bg-white/5 border-white/10" placeholder="e.g. NEW, BEST SELLER" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bodyStyle">Body Style</Label>
                                    <Select onValueChange={(val) => setValue('bodyStyle', val)} defaultValue={defaultValues.bodyStyle}>
                                        <SelectTrigger className="bg-white/5 border-white/10"><SelectValue placeholder="Select Body Style" /></SelectTrigger>
                                        <SelectContent>
                                            {['SUV', 'Sedan', 'Coupe', 'Convertible', 'Truck', 'Crossover', 'Minivan', 'Wagon', 'Hatchback'].map(s => (
                                                <SelectItem key={s} value={s}>{s}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="fuel_types">Fuel Type</Label>
                                        <Select
                                            onValueChange={(val) => setValue('fuel_types', [val])}
                                            defaultValue={watchFuelTypes?.[0] || 'gasoline'}
                                        >
                                            <SelectTrigger className="bg-white/5 border-white/10"><SelectValue placeholder="Select Fuel Type" /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="gasoline">Gasoline</SelectItem>
                                                <SelectItem value="diesel">Diesel</SelectItem>
                                                <SelectItem value="electric">Electric</SelectItem>
                                                <SelectItem value="hybrid">Hybrid</SelectItem>
                                                <SelectItem value="plugin-hybrid">Plug-in Hybrid</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="year">Year</Label>
                                        <Select
                                            onValueChange={(val) => setValue('year', parseInt(val))}
                                            defaultValue={String(watchYear) || String(new Date().getFullYear())}
                                        >
                                            <SelectTrigger className="bg-white/5 border-white/10"><SelectValue placeholder="Select Year" /></SelectTrigger>
                                            <SelectContent>
                                                {Array.from({ length: 11 }, (_, i) => 2020 + i).map(year => (
                                                    <SelectItem key={year} value={String(year)}>{year}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="display_category">Display Category (Homepage Tabs)</Label>
                                    <Select
                                        onValueChange={(val) => setValue('display_category', val)}
                                        defaultValue={defaultValues.display_category || 'none'}
                                    >
                                        <SelectTrigger className="bg-white/5 border-white/10"><SelectValue placeholder="Select Display Category" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">None (All)</SelectItem>
                                            <SelectItem value="suv">SUV / CUV / MPV</SelectItem>
                                            <SelectItem value="sedan">Sedan</SelectItem>
                                            <SelectItem value="luxury">Luxury</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <p className="text-[10px] text-muted-foreground">Sets which tab this vehicle appears in on the homepage "Dream Car" section.</p>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description (Marketing Copy)</Label>
                                    <Textarea id="description" {...register('description')} rows={4} className="bg-white/5 border-white/10" />
                                </div>
                            </div>

                            {/* Image & Price */}
                            <div className="space-y-6">
                                {/* Image Upload */}
                                <div
                                    className={cn(
                                        "group relative aspect-video rounded-xl border-2 border-dashed transition-all duration-200 overflow-hidden flex flex-col items-center justify-center cursor-pointer",
                                        imagePreview ? "border-solid border-white/20" : "border-white/10 bg-white/5 hover:bg-white/10"
                                    )}

                                >
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-center p-4">
                                            <UploadCloud className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                                            <p className="text-sm font-medium">Upload Image</p>
                                        </div>
                                    )}
                                    <Input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="starting_price">Starting Price ($)</Label>
                                    <Input type="number" step="0.01" {...register('starting_price', { valueAsNumber: true })} className="bg-white/5 border-white/10" />
                                </div>

                                <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10">
                                    <Label>Is Luxury Vehicle?</Label>
                                    <Switch checked={watch('is_luxury')} onCheckedChange={(c) => setValue('is_luxury', c)} />
                                </div>
                                <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10">
                                    <div className="space-y-0.5">
                                        <Label>Show in Discover Section</Label>
                                        <p className="text-[10px] text-muted-foreground italic">Display this vehicle on the homepage carousel</p>
                                    </div>
                                    <Switch checked={watch('show_in_hero')} onCheckedChange={(c) => setValue('show_in_hero', c)} />
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* --- Performance Tab --- */}
                    <TabsContent value="performance" className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold flex items-center gap-2 text-white"><Car className="w-5 h-5 text-accent" /> Engine & Power</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Horsepower</Label>
                                        <Input type="number" {...register('performance.hp', { valueAsNumber: true })} className="bg-white/5 border-white/10" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Torque (lb-ft)</Label>
                                        <Input type="number" {...register('performance.torque', { valueAsNumber: true })} className="bg-white/5 border-white/10" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Engine Description</Label>
                                    <Input {...register('performance.engine')} className="bg-white/5 border-white/10" placeholder="e.g. 3.0L Twin-Turbo V6" />
                                </div>
                                <div className="space-y-2">
                                    <Label>0-60 MPH Time</Label>
                                    <Input {...register('performance.zeroToSixty')} className="bg-white/5 border-white/10" placeholder="e.g. 3.5 sec" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-bold flex items-center gap-2 text-white"><DollarSign className="w-5 h-5 text-green-400" /> Drivetrain & Fuel</h3>
                                <div className="space-y-2">
                                    <Label>Transmission</Label>
                                    <Input {...register('performance.transmission')} className="bg-white/5 border-white/10" placeholder="e.g. 8-Speed Automatic" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Drivetrain Type</Label>
                                    <Input {...register('performance.drivetrain')} className="bg-white/5 border-white/10" placeholder="e.g. AWD" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Fuel Economy (City/Hwy/Avg/Range)</Label>
                                    <div className="grid grid-cols-4 gap-2">
                                        <Input type="number" placeholder="City" {...register('fuel_economy.city', { valueAsNumber: true })} className="bg-white/5 border-white/10" />
                                        <Input type="number" placeholder="Hwy" {...register('fuel_economy.hwy', { valueAsNumber: true })} className="bg-white/5 border-white/10" />
                                        <Input type="number" placeholder="Avg" {...register('fuel_economy.avg', { valueAsNumber: true })} className="bg-white/5 border-white/10" />
                                        <Input type="number" placeholder="Range" {...register('fuel_economy.range', { valueAsNumber: true })} className="bg-white/5 border-white/10" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* --- Specs Tab --- */}
                    <TabsContent value="specs" className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-2">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Exterior */}
                            <div className="space-y-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                <h3 className="font-bold text-accent uppercase text-xs tracking-wider">Exterior</h3>
                                <div className="space-y-2">
                                    <Label>Length</Label>
                                    <Input {...register('specs.exterior.length')} className="bg-black/20 border-white/10" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Height</Label>
                                    <Input {...register('specs.exterior.height')} className="bg-black/20 border-white/10" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Weight</Label>
                                    <Input {...register('specs.exterior.weight')} className="bg-black/20 border-white/10" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Wheels</Label>
                                    <Input {...register('specs.exterior.wheels')} className="bg-black/20 border-white/10" />
                                </div>
                            </div>
                            {/* Interior */}
                            <div className="space-y-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                <h3 className="font-bold text-accent uppercase text-xs tracking-wider">Interior</h3>
                                <div className="space-y-2">
                                    <Label>Headroom</Label>
                                    <Input {...register('specs.interior.headroom')} className="bg-black/20 border-white/10" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Legroom</Label>
                                    <Input {...register('specs.interior.legroom')} className="bg-black/20 border-white/10" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Cargo Space</Label>
                                    <Input {...register('specs.interior.cargo')} className="bg-black/20 border-white/10" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Passenger Capacity</Label>
                                    <Input type="number" {...register('specs.interior.passengers', { valueAsNumber: true })} className="bg-black/20 border-white/10" />
                                </div>
                            </div>
                            {/* Warranty */}
                            <div className="space-y-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                <h3 className="font-bold text-accent uppercase text-xs tracking-wider">Warranty</h3>
                                <div className="space-y-2">
                                    <Label>Comprehensive</Label>
                                    <Input {...register('specs.warranty.comprehensive')} className="bg-black/20 border-white/10" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Powertrain</Label>
                                    <Input {...register('specs.warranty.powertrain')} className="bg-black/20 border-white/10" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Roadside</Label>
                                    <Input {...register('specs.warranty.roadside')} className="bg-black/20 border-white/10" />
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* --- Features Tab --- */}
                    <TabsContent value="features" className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ArrayInput label="Highlights" value={watchHighlights} onChange={(val) => setValue('highlights', val)} />
                            <ArrayInput label="Ideal For" value={watchIdealFor} onChange={(val) => setValue('ideal_for', val)} />
                            <ArrayInput label="Popular Brands" value={watchPopularBrands} onChange={(val) => setValue('popular_brands', val)} />
                            <ArrayInput label="Drivetrain Options" value={watchDrivetrain} onChange={(val) => setValue('drivetrain', val)} />
                            <ArrayInput label="Generic Features" value={watchFeatures} onChange={(val) => setValue('features', val)} />
                        </div>

                        <div className="space-y-4 pt-6 border-t border-white/10">
                            <div className="flex items-center justify-between">
                                <Label className="text-lg font-bold">Feature Groups (Categorized)</Label>
                                <Button type="button" size="sm" onClick={() => appendFeatureGroup({ category: '', items: [] })} variant="outline">
                                    <Plus className="w-4 h-4 mr-2" /> Add Group
                                </Button>
                            </div>
                            {featureGroupFields.map((field, index) => (
                                <div key={field.id} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4 relative">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-2 right-2 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                        onClick={() => removeFeatureGroup(index)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                    <div className="space-y-2">
                                        <Label>Category Name</Label>
                                        <Input {...register(`feature_groups.${index}.category`)} placeholder="e.g. Technology" className="bg-black/20" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Items (Comma separated)</Label>
                                        <Textarea
                                            className="bg-black/20"
                                            placeholder="Item 1, Item 2..."
                                            defaultValue={field.items?.join(', ')}
                                            // We need to properly bind this. Since it's a field array, we might need a custom change handler or Controller. 
                                            // For simplicity using the same transform pattern:
                                            onChange={(e) => {
                                                const val = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                                                setValue(`feature_groups.${index}.items`, val);
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                </Tabs>
            </div>
            <Dialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
                <DialogContent className="bg-slate-900 border-white/10 text-white max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-red-400">
                            <AlertCircle className="w-5 h-5" />
                            Form Validation Error
                        </DialogTitle>
                        <DialogDescription className="text-white/60">
                            Please correct the following issues before saving:
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-2">
                        {validationErrors.map((err, i) => (
                            <div key={i} className="flex gap-2 text-sm bg-red-500/10 border border-red-500/20 p-2 rounded-lg text-red-200">
                                <span className="font-bold">•</span>
                                <span className="capitalize">{err}</span>
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setShowErrorDialog(false)} className="bg-white/10 hover:bg-white/20 text-white">
                            Got it
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
                <Button type="submit" disabled={isLoading || uploadingImage} className="bg-accent hover:bg-accent/90 text-white font-bold">
                    {(isLoading || uploadingImage) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Save Vehicle Type
                </Button>
            </div>

        </form >
    );
}
