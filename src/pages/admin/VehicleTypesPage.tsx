import { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VehicleTypeForm } from '@/components/admin/VehicleTypeForm';
import { getAllVehicleTypes, createVehicleType, updateVehicleType, deleteVehicleType, reorderVehicleTypes } from '@/services/vehicleTypeService';
import { VehicleType } from '@/types/vehicle';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { GripVertical, Pencil, Trash2, Plus, Sparkles, CheckCircle, Search, X, Loader2, RefreshCw, Car, DollarSign } from 'lucide-react';

// --- Sortable Item Component ---
function VehicleTypeCard({
    vehicle,
    onEdit,
    onDelete,
    isDragEnabled
}: {
    vehicle: VehicleType;
    onEdit: () => void;
    onDelete: () => void;
    isDragEnabled: boolean;
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: vehicle.id, disabled: !isDragEnabled });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 'auto',
    };

    const startingPrice = vehicle.startingPrice || (vehicle as any).starting_price || 0;

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                "group relative bg-muted/5 dark:bg-white/[0.03] backdrop-blur-sm border-2 border-transparent rounded-3xl p-1 transition-all duration-200",
                isDragging ? "shadow-2xl border-accent/50 scale-[1.02] bg-accent/5" : "hover:bg-white/[0.05] hover:border-white/10"
            )}
        >
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-4 p-3 sm:pr-4">
                {/* Main Content Area */}
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                    {/* Drag Handle */}
                    {isDragEnabled ? (
                        <button
                            {...attributes}
                            {...listeners}
                            className="p-2 -ml-2 sm:ml-0 text-muted-foreground/40 hover:text-white cursor-grab active:cursor-grabbing transition-colors rounded-xl hover:bg-white/5 shrink-0"
                        >
                            <GripVertical className="w-6 h-6" />
                        </button>
                    ) : (
                        <div className="hidden sm:block p-2 w-10 shrink-0" />
                    )}

                    {/* Thumbnail */}
                    <div className="relative w-24 h-20 sm:w-32 sm:h-auto sm:aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-black/40 border border-white/5 shrink-0 group-hover:border-white/20 transition-colors">
                        {vehicle.image || (vehicle as any).image_url ? (
                            <img
                                src={vehicle.image || (vehicle as any).image_url}
                                alt={vehicle.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground/20">
                                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 py-1 space-y-1">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <h3 className="text-base sm:text-lg font-black text-white tracking-tight truncate leading-tight">
                                {vehicle.name}
                            </h3>
                            {vehicle.isLuxury && (
                                <span className="text-[10px] sm:text-xs font-bold text-amber-500 px-1.5 py-0.5 rounded bg-amber-500/10 uppercase tracking-wider">
                                    Luxury
                                </span>
                            )}
                            {vehicle.isFeatured && (
                                <span className="text-[10px] sm:text-xs font-bold text-accent px-1.5 py-0.5 rounded bg-accent/10 uppercase tracking-wider">
                                    Featured
                                </span>
                            )}
                            {(() => {
                                const rawCategory =
                                    vehicle.displayCategory || (vehicle as any).display_category;

                                if (!rawCategory) return null;

                                const category = rawCategory.toLowerCase();

                                if (category === "luxury") return null;

                                const label = category === "none" ? "All" : rawCategory;

                                return (
                                    <span className="text-[10px] sm:text-xs font-bold text-slate-400 px-1.5 py-0.5 rounded bg-white/5 border border-white/5 uppercase tracking-wider">
                                        Tab: {label}
                                    </span>
                                );
                            })()}

                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                                <Car className="w-3.5 h-3.5 opacity-50" />
                                <span className="font-medium">{vehicle.bodyStyle || (vehicle as any).body_style}</span>
                            </span>
                            <span className="flex items-center gap-1.5">
                                <DollarSign className="w-3.5 h-3.5 opacity-50" />
                                <span className="font-bold text-white">${startingPrice.toLocaleString()}<span className="text-[10px] opacity-60 ml-0.5">/mo</span></span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 pt-3 mt-1 border-t border-white/5 sm:pt-0 sm:mt-0 sm:border-t-0 sm:border-l sm:pl-4">
                    <Button
                        onClick={onEdit}
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-xl hover:bg-blue-500/20 hover:text-blue-400 text-muted-foreground transition-colors"
                    >
                        <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                        onClick={onDelete}
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-xl hover:bg-red-500/20 hover:text-red-400 text-muted-foreground transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export function VehicleTypesPage() {
    const [vehicles, setVehicles] = useState<VehicleType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState<VehicleType | null>(null);
    const [vehicleToDelete, setVehicleToDelete] = useState<VehicleType | null>(null);
    const [saving, setSaving] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState('all');

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        loadVehicles();
    }, []);

    async function loadVehicles() {
        setIsLoading(true);
        const { success, data, error } = await getAllVehicleTypes();
        if (success && data) {
            setVehicles(data);
        } else {
            console.error(error);
            toast.error('Failed to load vehicle types');
        }
        setIsLoading(false);
    }

    const filteredVehicles = useMemo(() => {
        return vehicles.filter(v => {
            const name = v.name.toLowerCase();
            const vehicleName = v.vehicleName.toLowerCase();
            const bodyStyle = (v.bodyStyle || (v as any).body_style || '').toLowerCase();
            const query = searchQuery.toLowerCase();
            const category = (v.displayCategory || (v as any).display_category || 'none').toLowerCase();

            const matchesSearch = name.includes(query) || vehicleName.includes(query) || bodyStyle.includes(query);

            let matchesCategory = true;
            if (categoryFilter !== 'all') {
                if (categoryFilter === 'luxury') {
                    matchesCategory = v.isLuxury || category === 'luxury';
                } else {
                    matchesCategory = category === categoryFilter;
                }
            }

            return matchesSearch && matchesCategory;
        });
    }, [vehicles, searchQuery, categoryFilter]);

    const isDragEnabled = searchQuery === '' && categoryFilter === 'all';

    async function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = vehicles.findIndex((i) => i.id === active.id);
            const newIndex = vehicles.findIndex((i) => i.id === over.id);
            const newOrder = arrayMove(vehicles, oldIndex, newIndex);
            setVehicles(newOrder);

            // Persist order optimistically
            const ids = newOrder.map(v => v.id);
            const res = await reorderVehicleTypes(ids);
            if (!res.success) {
                toast.error('Reorder failed: ' + res.error);
                loadVehicles(); // Revert
            }
        }
    }

    async function handleDeleteConfirm() {
        if (!vehicleToDelete) return;
        const { success, error } = await deleteVehicleType(vehicleToDelete.id);
        if (success) {
            toast.success('Vehicle configuration deleted');
            loadVehicles();
        } else {
            toast.error('Failed to delete: ' + error);
        }
        setVehicleToDelete(null);
    }

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-muted-foreground animate-pulse">
                <div className="w-16 h-16 rounded-full border-4 border-slate-700 border-t-accent animate-spin mb-6" />
                <p className="font-medium tracking-wide text-white/50 uppercase text-sm">Synchronizing fleet data...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            {/* Header Action Bar */}
            <div className="flex flex-col gap-6 pb-6 border-b border-white/5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">
                            Fleet Manager
                        </h1>
                        <p className="text-muted-foreground flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            {vehicles.filter(v => v.isLuxury).length} Luxury Models
                            <span className="w-1 h-1 rounded-full bg-slate-600" />
                            {vehicles.length} Total Configurations
                        </p>
                    </div>
                    <Button
                        onClick={() => setIsCreateOpen(true)}
                        size="lg"
                        className="rounded-xl px-6 bg-accent hover:bg-accent/90 text-accent-foreground font-bold shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-0.5 transition-all w-full sm:w-auto"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Add New Vehicle
                    </Button>
                </div>

                {/* Filters Toolbar */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white/[0.02] p-2 rounded-2xl border border-white/5">
                    {/* Search */}
                    <div className="relative w-full sm:max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by name, model..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 bg-transparent border-transparent hover:bg-white/5 focus:bg-white/5 transition-colors h-10 rounded-xl text-white placeholder:text-muted-foreground/50"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Category Tabs */}
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <Tabs value={categoryFilter} onValueChange={setCategoryFilter} className="w-full sm:w-auto">
                            <TabsList className="bg-black/40 border border-white/5 p-1 h-auto rounded-xl w-full sm:w-auto grid grid-cols-4 sm:flex">
                                <TabsTrigger value="all" className="rounded-lg text-[10px] font-bold uppercase tracking-wider data-[state=active]:bg-accent data-[state=active]:text-white">
                                    All
                                </TabsTrigger>
                                <TabsTrigger value="suv" className="rounded-lg text-[10px] font-bold uppercase tracking-wider data-[state=active]:bg-accent data-[state=active]:text-white">
                                    SUV
                                </TabsTrigger>
                                <TabsTrigger value="sedan" className="rounded-lg text-[10px] font-bold uppercase tracking-wider data-[state=active]:bg-accent data-[state=active]:text-white">
                                    Sedan
                                </TabsTrigger>
                                <TabsTrigger value="luxury" className="rounded-lg text-[10px] font-bold uppercase tracking-wider data-[state=active]:bg-accent data-[state=active]:text-white">
                                    Luxury
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>

                        <Button variant="ghost" size="sm" onClick={() => loadVehicles()} title="Refresh Fleet" className="text-muted-foreground hover:text-white hidden sm:flex">
                            <RefreshCw className={cn("w-4 h-4 mr-2", isLoading && "animate-spin")} />
                            Refresh
                        </Button>
                    </div>
                </div>
            </div>

            {/* List */}
            {vehicles.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white/[0.02] border border-white/5 rounded-3xl text-center">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 text-muted-foreground/40">
                        <Car className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Hangar is empty</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto mb-8">
                        The dream car collection is empty. Configure your first vehicle type to get started.
                    </p>
                    <Button
                        onClick={() => setIsCreateOpen(true)}
                        variant="outline"
                        className="rounded-xl border-white/10 hover:bg-white/5 text-white"
                    >
                        Assemble First Vehicle
                    </Button>
                </div>
            ) : (
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext items={filteredVehicles.map(v => v.id)} strategy={verticalListSortingStrategy} disabled={!isDragEnabled}>
                        <div className="space-y-3">
                            {filteredVehicles.length === 0 ? (
                                <div className="text-center py-12 text-muted-foreground">
                                    No fleet units match your search filters.
                                </div>
                            ) : (
                                filteredVehicles.map((vehicle) => (
                                    <VehicleTypeCard
                                        key={vehicle.id}
                                        vehicle={vehicle}
                                        onEdit={() => setEditingVehicle(vehicle)}
                                        onDelete={() => setVehicleToDelete(vehicle)}
                                        isDragEnabled={isDragEnabled}
                                    />
                                ))
                            )}
                        </div>
                    </SortableContext>
                </DndContext>
            )}

            {/* Create/Edit Dialog */}
            <Dialog open={isCreateOpen || !!editingVehicle} onOpenChange={(open) => { if (!open) { setIsCreateOpen(false); setEditingVehicle(null); } }} >
                <DialogContent className="max-w-4xl bg-[#0a0a0a] border-white/10 text-white p-0 overflow-hidden shadow-2xl block">
                    <div className="p-4 md:p-6 border-b border-white/10 bg-white/[0.02]">
                        <DialogHeader>
                            <DialogTitle className="text-lg md:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                                <Plus className="w-6 h-6 text-accent" />
                                {editingVehicle ? `Configure ${editingVehicle.name}` : 'Assemble New Vehicle'}
                            </DialogTitle>
                        </DialogHeader>
                    </div>
                    <div className="p-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
                        <VehicleTypeForm
                            vehicleType={editingVehicle || undefined}
                            isLoading={saving}
                            onSubmit={async (data) => {
                                setSaving(true);
                                if (editingVehicle) {
                                    const res = await updateVehicleType(editingVehicle.id, data);
                                    if (res.success) toast.success('Configuration updated');
                                    else toast.error('Update failed: ' + res.error);
                                } else {
                                    const res = await createVehicleType(data);
                                    if (res.success) toast.success('New vehicle deployed');
                                    else toast.error('Deployment failed: ' + res.error);
                                }
                                setSaving(false);
                                loadVehicles();
                                setIsCreateOpen(false);
                                setEditingVehicle(null);
                            }}
                            onCancel={() => { setIsCreateOpen(false); setEditingVehicle(null); }}
                        />
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Alert - Red Warning Style */}
            <AlertDialog open={!!vehicleToDelete} onOpenChange={(open) => !open && setVehicleToDelete(null)}>
                <AlertDialogContent className="bg-[#0a0a0a] border-white/10 shadow-2xl">
                    <AlertDialogHeader>
                        <div className="flex items-center gap-3 text-red-500 mb-2">
                            <Trash2 className="w-6 h-6" />
                            <AlertDialogTitle className="text-white text-xl">Decommission Vehicle?</AlertDialogTitle>
                        </div>
                        <AlertDialogDescription className="text-slate-400 text-base">
                            You are about to permanently remove <strong>{vehicleToDelete?.name}</strong> from the hangar.
                            <br /><br />
                            This configuration will be permanently purged from the database.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-4">
                        <AlertDialogCancel className="bg-transparent border-white/10 text-slate-300 hover:bg-white/5 hover:text-white rounded-lg">
                            Cancel Protocol
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteConfirm}
                            className="bg-red-600 hover:bg-red-700 text-white rounded-lg border-0 shadow-lg shadow-red-900/20"
                        >
                            Decommission Forever
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
