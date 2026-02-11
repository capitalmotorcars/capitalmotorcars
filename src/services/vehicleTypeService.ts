import { supabase } from '@/lib/supabase';
import { VehicleType, VehicleTypeFormData } from '@/types/vehicle';

export async function getAllVehicleTypes() {
    const { data, error } = await supabase
        .from('vehicle_types')
        .select('*')
        .order('sort_order', { ascending: true });

    if (error) {
        console.error('Error fetching vehicle types:', error);
        return { success: false, error: error.message };
    }

    // Map DB columns to Frontend Interface
    const mappedData: VehicleType[] = data.map((row) => ({
        id: row.id,
        slug: row.slug,
        name: row.name,
        bodyStyle: row.body_style,
        image: row.image_url,
        vehicleName: row.vehicle_name,
        description: row.description,
        highlights: row.highlights || [],
        idealFor: row.ideal_for || [],
        popularBrands: row.popular_brands || [],
        features: row.features || [],
        badge: row.badge,
        startingPrice: row.starting_price,
        fuelTypes: row.fuel_types || [],
        drivetrain: row.drivetrain || [],
        passengerCapacity: row.passenger_capacity,
        cargoSpace: row.cargo_space,
        performance: row.performance,
        fuelEconomy: row.fuel_economy,
        specs: row.specs,
        featureGroups: row.feature_groups,
        metaTitle: row.meta_title,
        metaDescription: row.meta_description,
        isLuxury: row.is_luxury,
        isFeatured: row.is_featured,
        showInHero: row.show_in_hero,
        sortOrder: row.sort_order,
        displayCategory: row.display_category,
    }));

    return { success: true, data: mappedData };
}

export async function getVehicleTypeBySlug(slug: string) {
    const { data, error } = await supabase
        .from('vehicle_types')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('Error fetching vehicle type:', error);
        return { success: false, error: error.message };
    }

    const mappedData: VehicleType = {
        id: data.id,
        slug: data.slug,
        name: data.name,
        bodyStyle: data.body_style,
        image: data.image_url,
        vehicleName: data.vehicle_name,
        description: data.description,
        highlights: data.highlights || [],
        idealFor: data.ideal_for || [],
        popularBrands: data.popular_brands || [],
        features: data.features || [],
        badge: data.badge,
        startingPrice: data.starting_price,
        fuelTypes: data.fuel_types || [],
        drivetrain: data.drivetrain || [],
        passengerCapacity: data.passenger_capacity,
        cargoSpace: data.cargo_space,
        performance: data.performance,
        fuelEconomy: data.fuel_economy,
        specs: data.specs,
        featureGroups: data.feature_groups,
        metaTitle: data.meta_title,
        metaDescription: data.meta_description,
        isLuxury: data.is_luxury,
        isFeatured: data.is_featured,
        showInHero: data.show_in_hero,
        sortOrder: data.sort_order,
        displayCategory: data.display_category,
    };

    return { success: true, data: mappedData };
}

export async function createVehicleType(formData: Partial<VehicleTypeFormData>) {
    // Map Camel/Form data to Snake/DB data
    const dbData = {
        slug: formData.slug,
        name: formData.name,
        body_style: formData.bodyStyle,
        image_url: formData.image_url,
        vehicle_name: formData.vehicle_name,
        description: formData.description,
        starting_price: formData.starting_price,
        fuel_types: formData.fuel_types,
        drivetrain: formData.drivetrain,
        passenger_capacity: formData.passenger_capacity,
        cargo_space: formData.cargo_space,
        highlights: formData.highlights,
        popular_brands: formData.popular_brands,
        ideal_for: formData.ideal_for,
        features: formData.features,
        badge: formData.badge,
        is_luxury: formData.is_luxury,
        is_featured: formData.is_featured,
        show_in_hero: formData.show_in_hero,
        display_category: formData.display_category,
        performance: formData.performance,
        fuel_economy: formData.fuel_economy,
        specs: formData.specs,
        feature_groups: formData.feature_groups,
        meta_title: formData.meta_title,
        meta_description: formData.meta_description,
    };

    const { data, error } = await supabase
        .from('vehicle_types')
        .insert([dbData])
        .select()
        .single();

    if (error) {
        return { success: false, error: error.message };
    }
    return { success: true, data };
}

export async function updateVehicleType(id: string, formData: Partial<VehicleTypeFormData>) {
    const dbData = {
        slug: formData.slug,
        name: formData.name,
        body_style: formData.bodyStyle,
        image_url: formData.image_url,
        vehicle_name: formData.vehicle_name,
        description: formData.description,
        starting_price: formData.starting_price,
        fuel_types: formData.fuel_types,
        drivetrain: formData.drivetrain,
        passenger_capacity: formData.passenger_capacity,
        cargo_space: formData.cargo_space,
        highlights: formData.highlights,
        popular_brands: formData.popular_brands,
        ideal_for: formData.ideal_for,
        features: formData.features,
        badge: formData.badge,
        is_luxury: formData.is_luxury,
        is_featured: formData.is_featured,
        show_in_hero: formData.show_in_hero,
        display_category: formData.display_category,
        performance: formData.performance,
        fuel_economy: formData.fuel_economy,
        specs: formData.specs,
        feature_groups: formData.feature_groups,
        meta_title: formData.meta_title,
        meta_description: formData.meta_description,
    };

    // Remove undefined keys to avoid overriding with null if not intended
    // But for partial updates we usually only pass what changed. 
    // This simple object creation assumes full form data is passed or we need to filter undefineds.
    // For now let's filter undefineds.
    const cleanDbData = Object.fromEntries(
        Object.entries(dbData).filter(([_, v]) => v !== undefined)
    );

    const { data, error } = await supabase
        .from('vehicle_types')
        .update(cleanDbData)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        return { success: false, error: error.message };
    }
    return { success: true, data };
}

export async function deleteVehicleType(id: string) {
    const { error } = await supabase
        .from('vehicle_types')
        .delete()
        .eq('id', id);

    if (error) {
        return { success: false, error: error.message };
    }
    return { success: true };
}

// ... existing code ...

export async function reorderVehicleTypes(ids: string[]) {
    // This creates a series of updates. 
    // Alternatively call a stored procedure if available, but batched updates work for small sets.
    const updates = ids.map((id, index) => ({
        id,
        sort_order: index,
    }));

    const { error } = await supabase
        .from('vehicle_types')
        .upsert(updates, { onConflict: 'id' });

    if (error) {
        return { success: false, error: error.message };
    }
    return { success: true };
}

export async function uploadVehicleImage(file: File) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `vehicle-types/${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('vehicle-images') // Ensure this bucket exists
        .upload(filePath, file);

    if (uploadError) {
        return { success: false, error: uploadError.message };
    }

    const { data } = supabase.storage
        .from('vehicle-images')
        .getPublicUrl(filePath);

    return { success: true, data: data.publicUrl };
}

