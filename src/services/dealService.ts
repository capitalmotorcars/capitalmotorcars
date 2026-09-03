import { supabase } from '@/lib/supabase';
import type { LeaseDeal, DealFormData, ApiResponse } from '@/types/deals';

export const fallbackDeals: LeaseDeal[] = [
  {
    id: 'deal-sep-bmw-330i',
    make: 'BMW',
    model: '330i xDrive',
    year: 2026,
    trim: 'Sedan AWD',
    monthly_price: 489,
    down_payment: 0,
    lease_term: 36,
    highlights: 'September Labor Day clearance special. Subvented money factor, M Sport styling, curved display, and ambient lighting.',
    image_url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop',
    display_order: 1,
    is_active: true,
    created_at: '2026-09-01T08:00:00.000Z',
    updated_at: '2026-09-01T08:00:00.000Z',
  },
  {
    id: 'deal-sep-benz-c300',
    make: 'Mercedes-Benz',
    model: 'C300 4MATIC',
    year: 2026,
    trim: 'Executive Sedan',
    monthly_price: 519,
    down_payment: 0,
    lease_term: 36,
    highlights: 'End-of-summer model year clearance. 4MATIC all-wheel drive, panoramic sunroof, and driver assistance suite.',
    image_url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop',
    display_order: 2,
    is_active: true,
    created_at: '2026-09-01T08:00:00.000Z',
    updated_at: '2026-09-01T08:00:00.000Z',
  },
  {
    id: 'deal-sep-audi-q5',
    make: 'Audi',
    model: 'Q5 45 TFSI',
    year: 2026,
    trim: 'Quattro Premium Plus',
    monthly_price: 539,
    down_payment: 0,
    lease_term: 36,
    highlights: 'Season of Audi customer credit applied. Quattro AWD, virtual cockpit plus, and Bang & Olufsen audio.',
    image_url: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=2070&auto=format&fit=crop',
    display_order: 3,
    is_active: true,
    created_at: '2026-09-01T08:00:00.000Z',
    updated_at: '2026-09-01T08:00:00.000Z',
  },
  {
    id: 'deal-sep-porsche-macan',
    make: 'Porsche',
    model: 'Macan',
    year: 2026,
    trim: 'All-Wheel Drive',
    monthly_price: 799,
    down_payment: 0,
    lease_term: 39,
    highlights: 'High-performance luxury crossover. $7,500 clean vehicle credit pass-through applied, sport chrono package, 20" wheels.',
    image_url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop',
    display_order: 4,
    is_active: true,
    created_at: '2026-09-01T08:00:00.000Z',
    updated_at: '2026-09-01T08:00:00.000Z',
  },
  {
    id: 'deal-sep-genesis-gv70',
    make: 'Genesis',
    model: 'GV70 2.5T',
    year: 2026,
    trim: 'Select AWD',
    monthly_price: 479,
    down_payment: 0,
    lease_term: 36,
    highlights: 'Unmatched luxury value in September. 300-hp turbocharged powertrain, 14.5-inch navigation, complimentary maintenance.',
    image_url: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop',
    display_order: 5,
    is_active: true,
    created_at: '2026-09-01T08:00:00.000Z',
    updated_at: '2026-09-01T08:00:00.000Z',
  },
  {
    id: 'deal-sep-kia-telluride',
    make: 'Kia',
    model: 'Telluride EX',
    year: 2026,
    trim: 'AWD 8-Passenger',
    monthly_price: 439,
    down_payment: 0,
    lease_term: 36,
    highlights: 'Top-rated 3-row family SUV with exceptional 63% residual value. Leather seating, smart power liftgate, highway driving assist.',
    image_url: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=2071&auto=format&fit=crop',
    display_order: 6,
    is_active: true,
    created_at: '2026-09-01T08:00:00.000Z',
    updated_at: '2026-09-01T08:00:00.000Z',
  },
  {
    id: 'deal-sep-hyundai-ioniq5',
    make: 'Hyundai',
    model: 'IONIQ 5 SEL',
    year: 2026,
    trim: 'AWD Electric',
    monthly_price: 299,
    down_payment: 0,
    lease_term: 24,
    highlights: 'Nationwide lowest EV lease. $7,500 EV rebate pass-through + 0% NJ state sales tax. Ultra-fast 800V charging.',
    image_url: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop',
    display_order: 7,
    is_active: true,
    created_at: '2026-09-01T08:00:00.000Z',
    updated_at: '2026-09-01T08:00:00.000Z',
  },
  {
    id: 'deal-sep-lexus-rx350',
    make: 'Lexus',
    model: 'RX 350',
    year: 2026,
    trim: 'Premium AWD',
    monthly_price: 569,
    down_payment: 0,
    lease_term: 36,
    highlights: 'Golden Opportunity clearance rebate. Wireless Apple CarPlay, NuLuxe interior, ultra-smooth whisper-quiet ride.',
    image_url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2070&auto=format&fit=crop',
    display_order: 8,
    is_active: true,
    created_at: '2026-09-01T08:00:00.000Z',
    updated_at: '2026-09-01T08:00:00.000Z',
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
