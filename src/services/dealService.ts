import { supabase } from '@/lib/supabase';
import type { LeaseDeal, DealFormData, ApiResponse } from '@/types/deals';

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
