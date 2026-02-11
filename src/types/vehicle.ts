export type FuelType = 'gasoline' | 'diesel' | 'hybrid' | 'electric' | 'premium unleaded' | 'plug-in hybrid';
export type Drivetrain = 'FWD' | 'RWD' | 'AWD' | '4x4' | '4WD';

export interface VehiclePerformance {
    hp: number;
    torque: number;
    engine: string;
    transmission: string;
    drivetrain: string;
    zeroToSixty: string;
}

export interface VehicleFuelEconomy {
    city: number;
    hwy: number;
    avg: number;
    range: number;
}

export interface VehicleSpecs {
    exterior: { length: string; height: string; weight: string; wheels: string };
    interior: { headroom: string; legroom: string; cargo: string; passengers: number };
    warranty: { comprehensive: string; powertrain: string; roadside: string };
}

export interface FeatureGroup {
    category: string;
    items: string[];
}

export interface VehicleType {
    id: string; // UUID from Supabase
    slug: string;
    name: string;
    bodyStyle: string;
    image: string | null; // Mapped from image_url
    vehicleName: string; // Mapped from vehicle_name
    description: string | null;
    highlights: string[];
    idealFor: string[]; // Mapped from ideal_for
    popularBrands: string[]; // Mapped from popular_brands
    features: string[];
    badge?: string | null;
    ctaText?: string | null; // Optional, might not be in DB
    startingPrice: number; // Mapped from starting_price
    fuelTypes: FuelType[]; // Mapped from fuel_types
    drivetrain: Drivetrain[]; // Mapped from drivetrain
    passengerCapacity: number; // Mapped from passenger_capacity
    cargoSpace: 'small' | 'medium' | 'large' | 'extra-large'; // Mapped from cargo_space

    // Complex Objects (JSONB)
    performance?: VehiclePerformance;
    fuelEconomy?: VehicleFuelEconomy;
    specs?: VehicleSpecs;
    featureGroups?: FeatureGroup[]; // Mapped from feature_groups

    // Metadata
    metaTitle: string | null; // Mapped from meta_title
    metaDescription: string | null; // Mapped from meta_description
    canonicalPath?: string | null;
    seoKeywords?: string[];

    // System
    sortOrder?: number; // Mapped from sort_order
    displayCategory?: 'suv' | 'sedan' | 'luxury'; // Mapped from display_category
    isFeatured?: boolean; // Mapped from is_featured
    isLuxury?: boolean; // Mapped from is_luxury
    showInHero?: boolean; // Mapped from show_in_hero
    createdAt?: string;
    updatedAt?: string;
}

export interface VehicleTypeFormData {
    slug: string;
    name: string;
    bodyStyle: string;
    display_category: string | null;
    image_url: string | null;
    vehicle_name: string;
    description: string | null;
    starting_price: number;
    fuel_types: string[];
    drivetrain: string[];
    passenger_capacity: number;
    cargo_space: string;
    highlights: string[];
    popular_brands: string[];
    ideal_for: string[];
    features: string[];
    badge?: string;
    is_luxury: boolean;
    is_featured: boolean;
    show_in_hero: boolean;

    // JSONB fields as strings or objects depending on form state, but specifically we'll use objects for the API
    performance: VehiclePerformance;
    fuel_economy: VehicleFuelEconomy;
    specs: VehicleSpecs;
    feature_groups: FeatureGroup[];

    meta_title: string | null;
    meta_description: string | null;
}
