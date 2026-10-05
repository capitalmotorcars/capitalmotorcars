import { supabase } from '@/lib/supabase';
import type { LeaseDeal, DealFormData, ApiResponse } from '@/types/deals';

export const fallbackDeals: LeaseDeal[] = [
  {
    id: 'deal-bmw-330i',
    make: 'BMW',
    model: '3 Series',
    year: 2026,
    trim: '330i',
    monthly_price: 499,
    down_payment: 3500,
    lease_term: 36,
    highlights: 'Premium package, Navigation, Heated seats',
    image_url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop',
    display_order: 1,
    is_active: true,
    created_at: '2026-02-11T08:00:00.000Z',
    updated_at: '2026-02-11T08:00:00.000Z',
  },
  {
    id: 'deal-benz-c300',
    make: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2026,
    trim: 'C300',
    monthly_price: 549,
    down_payment: 4000,
    lease_term: 36,
    highlights: 'AMG Line, Panoramic roof, Premium audio',
    image_url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop',
    display_order: 2,
    is_active: true,
    created_at: '2026-02-11T08:00:00.000Z',
    updated_at: '2026-02-11T08:00:00.000Z',
  },
  {
    id: 'deal-audi-a4',
    make: 'Audi',
    model: 'A4',
    year: 2026,
    trim: 'Premium Plus',
    monthly_price: 479,
    down_payment: 3200,
    lease_term: 36,
    highlights: 'Virtual cockpit, S-Line package, Apple CarPlay',
    image_url: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=2070&auto=format&fit=crop',
    display_order: 3,
    is_active: true,
    created_at: '2026-02-11T08:00:00.000Z',
    updated_at: '2026-02-11T08:00:00.000Z',
  },
];

/**
 * Get all active deals (public)
 */
export async function getActiveDeals(): Promise<ApiResponse<LeaseDeal[]>> {
    try {
        const { data, error } = await supabase
            .from('lease_deals')
            .select('*')
            .eq('is_active', true)
            .order('display_order', { ascending: true });

        if (error || !data || data.length === 0) {
            return { success: true, data: fallbackDeals };
        }

        return { success: true, data };
    } catch (err) {
        return {
            success: true,
            data: fallbackDeals,
        };
    }
}

/**
 * Get all deals including inactive (admin only)
 */
export async function getAllDeals(): Promise<ApiResponse<LeaseDeal[]>> {
    try {
        const { data, error } = await supabase
            .from('lease_deals')
            .select('*')
            .order('display_order', { ascending: true });

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, data: data || [] };
    } catch (err) {
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Failed to fetch deals',
        };
    }
}

/**
 * Get a single deal by ID
 */
export async function getDealById(id: string): Promise<ApiResponse<LeaseDeal>> {
    try {
        const { data, error } = await supabase
            .from('lease_deals')
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
            error: err instanceof Error ? err.message : 'Failed to fetch deal',
        };
    }
}

/**
 * Create a new deal
 */
export async function createDeal(dealData: DealFormData): Promise<ApiResponse<LeaseDeal>> {
    try {
        // Get the highest display_order and increment
        const { data: maxOrderData } = await supabase
            .from('lease_deals')
            .select('display_order')
            .order('display_order', { ascending: false })
            .limit(1)
            .single();

        const nextOrder = (maxOrderData?.display_order || 0) + 1;

        const { data, error } = await supabase
            .from('lease_deals')
            .insert([{ ...dealData, display_order: nextOrder }])
            .select()
            .single();

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (err) {
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Failed to create deal',
        };
    }
}

/**
 * Update an existing deal
 */
export async function updateDeal(
    id: string,
    dealData: Partial<DealFormData>
): Promise<ApiResponse<LeaseDeal>> {
    try {
        const { data, error } = await supabase
            .from('lease_deals')
            .update(dealData)
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
            error: err instanceof Error ? err.message : 'Failed to update deal',
        };
    }
}

/**
 * Delete a deal
 */
export async function deleteDeal(id: string): Promise<ApiResponse<void>> {
    try {
        const { error } = await supabase
            .from('lease_deals')
            .delete()
            .eq('id', id);

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (err) {
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Failed to delete deal',
        };
    }
}

/**
 * Reorder deals
 */
export async function reorderDeals(
    dealIds: string[]
): Promise<ApiResponse<void>> {
    try {
        // Update display_order for each deal
        const updates = dealIds.map((id, index) =>
            supabase
                .from('lease_deals')
                .update({ display_order: index })
                .eq('id', id)
        );

        await Promise.all(updates);

        return { success: true };
    } catch (err) {
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Failed to reorder deals',
        };
    }
}

/**
 * Upload an image to Supabase Storage
 */
export async function uploadDealImage(
    file: File
): Promise<ApiResponse<string>> {
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `deals/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('deal-images')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false,
            });

        if (uploadError) {
            return { success: false, error: uploadError.message };
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('deal-images')
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
export async function deleteDealImage(imageUrl: string): Promise<ApiResponse<void>> {
    try {
        // Extract file path from URL
        const urlParts = imageUrl.split('/deal-images/');
        if (urlParts.length < 2) {
            return { success: false, error: 'Invalid image URL' };
        }

        const filePath = urlParts[1];

        const { error } = await supabase.storage
            .from('deal-images')
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
