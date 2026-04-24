import { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
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
import { Switch } from '@/components/ui/switch';
import { SEO } from '@/components/SEO';
import { DealForm } from '@/components/admin/DealForm';
import {
    getAllDeals,
    createDeal,
    updateDeal,
    deleteDeal,
    reorderDeals,
} from '@/services/dealService';
import type { LeaseDeal, DealFormData } from '@/types/deals';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { GripVertical, Pencil, Trash2, Plus, Sparkles, CheckCircle, AlertCircle, Search, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

function SortableDealCard({ deal, onEdit, onDelete, onToggleStatus, isDragEnabled }: {
    deal: LeaseDeal;
    onEdit: () => void;
    onDelete: () => void;
    onToggleStatus: (active: boolean) => void;
    isDragEnabled: boolean;
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: deal.id, disabled: !isDragEnabled });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 'auto',
    };

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
                    <div className="relative w-20 h-16 sm:w-24 sm:h-auto sm:aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-black/40 border border-white/5 shrink-0 group-hover:border-white/20 transition-colors">
                        {deal.image_url ? (
                            <img
                                src={deal.image_url}
                                alt={`${deal.make} ${deal.model}`}
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
                            <span className="text-[10px] sm:text-xs font-bold text-accent px-1.5 py-0.5 rounded bg-accent/10 uppercase tracking-wider">
                                {deal.year}
                            </span>
                            <h3 className="text-base sm:text-lg font-black text-white tracking-tight truncate leading-tight">
                                {deal.make} <span className="font-medium text-slate-300">{deal.model}</span>
                            </h3>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                                <span className="font-bold text-white">${Math.floor(deal.monthly_price)}<span className="text-[10px] opacity-60 ml-0.5">/mo</span></span>
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span className="font-bold text-white">{deal.lease_term}mo</span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer / Right Action Area */}
                <div className="flex items-center justify-end gap-3 pt-3 mt-1 border-t border-white/5 sm:pt-0 sm:mt-0 sm:border-t-0 sm:border-l sm:pl-4">

                    {/* Status Toggle */}
                    <div className="flex items-center gap-3">
                        <span className={cn(
                            "text-[10px] font-bold uppercase tracking-wider transition-colors",
                            deal.is_active ? "text-green-500" : "text-muted-foreground"
                        )}>
                            {deal.is_active ? 'Visible' : 'Hidden'}
                        </span>
                        <Switch
                            checked={deal.is_active}
                            onCheckedChange={onToggleStatus}
                            className="scale-90 sm:scale-100 data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-slate-700"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                        <Button
                            onClick={onEdit}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl hover:bg-blue-500/20 hover:text-blue-400 text-muted-foreground transition-colors"
                            title="Edit Deal"
                        >
                            <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                            onClick={onDelete}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl hover:bg-red-500/20 hover:text-red-400 text-muted-foreground transition-colors"
                            title="Delete Deal"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function DealsPage() {
    const [deals, setDeals] = useState<LeaseDeal[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingDeal, setEditingDeal] = useState<LeaseDeal | undefined>();
    const [deletingDeal, setDeletingDeal] = useState<LeaseDeal | undefined>();
    const [saving, setSaving] = useState(false);

    // Filters
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        loadDeals();
    }, []);

    async function loadDeals() {
        setLoading(true);
        const result = await getAllDeals();
        if (result.success && result.data) {
            setDeals(result.data);
        }
        setLoading(false);
    }

    // Toggle Status
    async function handleToggleStatus(deal: LeaseDeal, isActive: boolean) {
        // Optimistic update
        const updatedDeals = deals.map(d =>
            d.id === deal.id ? { ...d, is_active: isActive } : d
        );
        setDeals(updatedDeals);

        // API Call
        const result = await updateDeal(deal.id, { is_active: isActive });
        if (!result.success) {
            // Revert on failure
            alert('Failed to update status: ' + result.error);
            loadDeals();
        }
    }

    async function handleCreateDeal(data: DealFormData) {
        setSaving(true);
        const result = await createDeal(data);
        setSaving(false);

        if (result.success) {
            setShowForm(false);
            loadDeals();
        } else {
            alert('Failed to create deal: ' + result.error);
        }
    }

    async function handleUpdateDeal(data: DealFormData) {
        if (!editingDeal) return;

        setSaving(true);
        const result = await updateDeal(editingDeal.id, data);
        setSaving(false);

        if (result.success) {
            setEditingDeal(undefined);
            loadDeals();
        } else {
            alert('Failed to update deal: ' + result.error);
        }
    }

    async function handleDeleteDeal() {
        if (!deletingDeal) return;

        const result = await deleteDeal(deletingDeal.id);

        if (result.success) {
            setDeletingDeal(undefined);
            loadDeals();
        } else {
            alert('Failed to delete deal: ' + result.error);
        }
    }

    async function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = deals.findIndex((d) => d.id === active.id);
            const newIndex = deals.findIndex((d) => d.id === over.id);

            const newDeals = arrayMove(deals, oldIndex, newIndex);
            setDeals(newDeals);

            // Update order in database - optimistically
            await reorderDeals(newDeals.map((d) => d.id));
        }
    }

    // Filter Logic
    const filteredDeals = useMemo(() => {
        return deals.filter(deal => {
            const matchesSearch =
                deal.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
                deal.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                deal.year.toString().includes(searchQuery);

            const matchesStatus =
                statusFilter === 'all' ? true :
                    statusFilter === 'active' ? deal.is_active :
                        !deal.is_active;

            return matchesSearch && matchesStatus;
        });
    }, [deals, searchQuery, statusFilter]);

    const isDragEnabled = searchQuery === '' && statusFilter === 'all';

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-muted-foreground animate-pulse">
                <div className="w-16 h-16 rounded-full border-4 border-slate-700 border-t-accent animate-spin mb-6" />
                <p className="font-medium tracking-wide">Loading mission data...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <SEO
                title="Lease Deals Management | Capital Motor Cars Admin Dashboard"
                description="Manage featured lease deals in the Capital Motor Cars dashboard."
            />
            {/* Header Action Bar */}
            <div className="flex flex-col gap-6 pb-6 border-b border-white/5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">
                            Active Deals
                        </h1>
                        <p className="text-muted-foreground flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            {deals.filter(d => d.is_active).length} Active
                            <span className="w-1 h-1 rounded-full bg-slate-600" />
                            {deals.length} Total Vehicles
                        </p>
                    </div>
                    <Button
                        onClick={() => setShowForm(true)}
                        size="lg"
                        className="rounded-xl px-6 bg-accent hover:bg-accent/90 text-accent-foreground font-bold shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-0.5 transition-all w-full sm:w-auto"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        New Deal
                    </Button>
                </div>

                {/* Filters Toolbar */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white/[0.02] p-2 rounded-2xl border border-white/5">
                    {/* Search */}
                    <div className="relative w-full sm:max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search make, model, year..."
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

                    {/* Status Tabs */}
                    <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-full sm:w-auto">
                        <TabsList className="bg-black/40 border border-white/5 p-1 h-auto rounded-xl w-full sm:w-auto grid grid-cols-3 sm:flex">
                            <TabsTrigger value="all" className="rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-accent data-[state=active]:text-white">
                                All
                            </TabsTrigger>
                            <TabsTrigger value="active" className="rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-accent data-[state=active]:text-white">
                                Active
                            </TabsTrigger>
                            <TabsTrigger value="inactive" className="rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-accent data-[state=active]:text-white">
                                Inactive
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </div>

            {/* Leads List */}
            {deals.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white/[0.02] border border-white/5 rounded-3xl text-center">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 text-muted-foreground/40">
                        <Sparkles className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Ready for deployment</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto mb-8">
                        The showroom is currently empty. Add your first vehicle lease deal to get started.
                    </p>
                    <Button
                        onClick={() => setShowForm(true)}
                        variant="outline"
                        className="rounded-xl border-white/10 hover:bg-white/5"
                    >
                        Create First Deal
                    </Button>
                </div>
            ) : (
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext items={filteredDeals.map((d) => d.id)} strategy={verticalListSortingStrategy} disabled={!isDragEnabled}>
                        <div className="space-y-3">
                            {filteredDeals.length === 0 ? (
                                <div className="text-center py-12 text-muted-foreground">
                                    No deals match your search filters.
                                </div>
                            ) : (
                                filteredDeals.map((deal) => (
                                    <SortableDealCard
                                        key={deal.id}
                                        deal={deal}
                                        onEdit={() => setEditingDeal(deal)}
                                        onDelete={() => setDeletingDeal(deal)}
                                        onToggleStatus={(isActive) => handleToggleStatus(deal, isActive)}
                                        isDragEnabled={isDragEnabled}
                                    />
                                ))
                            )}
                        </div>
                    </SortableContext>
                </DndContext>
            )}

            {/* Create Dialog */}
            <Dialog open={showForm} onOpenChange={setShowForm}>
                <DialogContent className="max-w-4xl bg-[#0a0a0a] border-white/10 text-white p-0 overflow-hidden shadow-2xl block">
                    <div className="p-4 md:p-6 border-b border-white/10 bg-white/[0.02]">
                        <DialogHeader>
                            <DialogTitle className="text-lg md:text-2xl font-black text-white uppercase tracking-tight">Deploy New Deal</DialogTitle>
                        </DialogHeader>
                    </div>
                    <div className="p-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
                        <DealForm
                            onSubmit={handleCreateDeal}
                            onCancel={() => setShowForm(false)}
                            isLoading={saving}
                        />
                    </div>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={!!editingDeal} onOpenChange={(open) => !open && setEditingDeal(undefined)}>
                <DialogContent className="max-w-4xl bg-[#0a0a0a] border-white/10 text-white p-0 overflow-hidden shadow-2xl block">
                    <div className="p-4 md:p-6 border-b border-white/10 bg-white/[0.02]">
                        <DialogHeader>
                            <DialogTitle className="text-lg md:text-2xl font-black text-white uppercase tracking-tight">Edit Configuration</DialogTitle>
                        </DialogHeader>
                    </div>
                    <div className="p-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
                        {editingDeal && (
                            <DealForm
                                deal={editingDeal}
                                onSubmit={handleUpdateDeal}
                                onCancel={() => setEditingDeal(undefined)}
                                isLoading={saving}
                            />
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation - Updated Style */}
            <AlertDialog open={!!deletingDeal} onOpenChange={(open) => !open && setDeletingDeal(undefined)}>
                <AlertDialogContent className="bg-[#0a0a0a] border-white/10 shadow-2xl">
                    <AlertDialogHeader>
                        <div className="flex items-center gap-3 text-red-500 mb-2">
                            <AlertCircle className="w-6 h-6" />
                            <AlertDialogTitle className="text-white text-xl">Confirm Deletion</AlertDialogTitle>
                        </div>
                        <AlertDialogDescription className="text-slate-400 text-base">
                            You are about to permanently remove the <strong>{deletingDeal?.year} {deletingDeal?.make} {deletingDeal?.model}</strong> from the database.
                            <br /><br />
                            This action implies valid data loss and cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-4">
                        <AlertDialogCancel className="bg-transparent border-white/10 text-slate-300 hover:bg-white/5 hover:text-white rounded-lg">
                            Cancel Protocol
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteDeal}
                            className="bg-red-600 hover:bg-red-700 text-white rounded-lg border-0 shadow-lg shadow-red-900/20"
                        >
                            Delete Forever
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
