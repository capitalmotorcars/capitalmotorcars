// Types only - data comes from Supabase API
export type FuelType = 'gasoline' | 'diesel' | 'hybrid' | 'electric' | 'premium unleaded' | 'plug-in hybrid';
export type Drivetrain = 'FWD' | 'RWD' | 'AWD' | '4x4' | '4WD';

export interface VehicleTypeData {
  slug: string;
  name: string;
  bodyStyle: string;
  image: string;
  vehicleName: string;
  description: string;
  highlights: string[];
  idealFor: string[];
  popularBrands: string[];
  features: string[];
  badge?: 'Popular' | 'New' | 'Best Seller' | 'Eco Friendly' | 'Family Choice' | 'Adventure Luxury' | 'Track Ready' | 'Flagship M' | 'T-Hybrid' | 'PHEV Performance';
  ctaText?: string;
  startingPrice?: number;
  fuelTypes: FuelType[];
  drivetrain: Drivetrain[];
  passengerCapacity: number;
  cargoSpace: 'small' | 'medium' | 'large' | 'extra-large';
  priceRange?: { min: number; max: number };
  // Basic Specs (Existing)
  range?: string;
  mpge?: string;
  mpg?: string;

  // --- NEW ELITE DATA FIELDS ---
  performance?: {
    hp: number;
    torque: number;
    engine: string;
    transmission: string;
    drivetrain: string;
    zeroToSixty: string;
  };
  fuelEconomy?: {
    city: number;
    hwy: number;
    avg: number;
    range: number;
  };
  specs?: {
    exterior: { length: string; height: string; weight: string; wheels: string };
    interior: { headroom: string; legroom: string; cargo: string; passengers: number };
    warranty: { comprehensive: string; powertrain: string; roadside: string };
  };
  featureGroups?: {
    category: string;
    items: string[];
  }[];
  // ----------------------------

  metaTitle: string;
  metaDescription: string;
  canonicalPath?: string;
  seoKeywords?: string[];
  sortOrder?: number;
  isFeatured?: boolean;
  isLuxury?: boolean;
  trackingCategory?: string;
}
export const vehicleTypes: VehicleTypeData[] = [];

export const getVehicleTypeBySlug = (_slug: string): VehicleTypeData | undefined => {
  // Data now comes from Supabase API via vehicleTypeService
  
  return undefined;
};
