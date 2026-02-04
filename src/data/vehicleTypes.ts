import luxurySedanImg from '@/assets/luxury-sedan.png';
import electricEqcImg from '@/assets/electric-mercedes-eqc.png';
import hatchbackAudiImg from '@/assets/hatchback-audi-rs5.png';
import truckRaptorImg from '@/assets/truck-ford-raptor.png';
import mercedesSedanImg from '@/assets/mercedes-luxury-sedan.png';
import minivanOdysseyImg from '@/assets/minivan-odyssey.png';
import crossoverLexusImg from '@/assets/crossover-lexus-ux.png';

export type FuelType = 'gasoline' | 'diesel' | 'hybrid' | 'electric';
export type Drivetrain = 'FWD' | 'RWD' | 'AWD' | '4x4';

export interface VehicleTypeData {
  // Core
  slug: string;
  name: string;
  bodyStyle: string;
  image: string;
  ogImage?: string;
  icon?: string;

  // Marketing
  description: string;
  highlights: string[];
  idealFor: string[];
  popularBrands: string[];
  features: string[];
  badge?: 'Popular' | 'New' | 'Best Seller' | 'Eco Friendly';
  ctaText?: string;

  // Leasing / business
  startingPrice?: number; // monthly
  priceRange?: {
    min: number;
    max: number;
  };
  fuelTypes: FuelType[];
  drivetrain: Drivetrain[];
  passengerCapacity: number;
  cargoSpace: 'small' | 'medium' | 'large';

  // SEO
  metaTitle: string;
  metaDescription: string;
  seoKeywords?: string[];
  canonicalPath?: string;

  // Internal
  sortOrder?: number;
  isFeatured?: boolean;
  trackingCategory?: string;
}
export const vehicleTypes: VehicleTypeData[] = [
  {
    slug: 'luxury',
    name: 'Luxury',
    bodyStyle: 'Luxury Sedan',
    image: luxurySedanImg,
    badge: 'Best Seller',
    ctaText: 'Explore Luxury Vehicles',
    description:
      'Experience the pinnacle of automotive excellence with our curated selection of luxury vehicles. Premium craftsmanship meets cutting-edge technology.',
    highlights: [
      'Premium materials and craftsmanship',
      'Advanced technology and safety features',
      'Superior comfort and ride quality',
      'Prestigious brand heritage',
    ],
    idealFor: [
      'Executive professionals',
      'Drivers who value comfort and prestige',
      'Long-distance commuters',
      'Premium lifestyle seekers',
    ],
    popularBrands: ['Mercedes-Benz', 'BMW', 'Audi', 'Lexus', 'Porsche'],
    features: [
      'Leather interiors',
      'Adaptive air suspension',
      'Advanced driver assistance',
      'Panoramic sunroof',
      'Massaging seats',
    ],
    startingPrice: 899,
    priceRange: { min: 800, max: 1500 },
    fuelTypes: ['gasoline', 'hybrid', 'electric'],
    drivetrain: ['RWD', 'AWD'],
    passengerCapacity: 5,
    cargoSpace: 'medium',
    metaTitle: 'Luxury Car Leasing | Capital Motor Cars',
    metaDescription: 'Lease premium luxury vehicles from top brands.',
    canonicalPath: '/vehicles/luxury',
    isFeatured: true,
    sortOrder: 1,
    trackingCategory: 'vehicle_luxury',
  },

  {
    slug: 'electric',
    name: 'Electric',
    bodyStyle: 'Electric Vehicle',
    image: electricEqcImg,
    badge: 'Eco Friendly',
    ctaText: 'Browse Electric Vehicles',
    description:
      'Drive into the future with zero emissions, instant torque, and cutting-edge electric technology.',
    highlights: [
      'Zero emissions',
      'Instant acceleration',
      'Lower running costs',
      'Advanced autonomous features',
    ],
    idealFor: [
      'Eco-conscious drivers',
      'Tech enthusiasts',
      'Daily commuters',
    ],
    popularBrands: ['Rivian', 'Lucid', 'BMW', 'Porsche'],
    features: [
      'Fast charging',
      'Regenerative braking',
      'OTA updates',
      'Smart navigation',
    ],
    startingPrice: 699,
    priceRange: { min: 600, max: 1300 },
    fuelTypes: ['electric'],
    drivetrain: ['RWD', 'AWD'],
    passengerCapacity: 5,
    cargoSpace: 'medium',
    metaTitle: 'Electric Vehicle Leasing | Capital Motor Cars',
    metaDescription: 'Discover the latest electric vehicles with flexible leasing.',
    canonicalPath: '/vehicles/electric',
    isFeatured: true,
    sortOrder: 2,
    trackingCategory: 'vehicle_electric',
  },

  {
    slug: 'hatchback',
    name: 'Hatchback',
    bodyStyle: 'Hatchback',
    image: hatchbackAudiImg,
    ctaText: 'View Hatchbacks',
    description:
      'Compact, efficient, and versatile. Perfect for city driving with flexible cargo space.',
    highlights: [
      'Easy city maneuvering',
      'Fuel efficient',
      'Affordable leasing',
    ],
    idealFor: [
      'Urban commuters',
      'First-time lessees',
      'Budget-conscious drivers',
    ],
    popularBrands: ['Volkswagen', 'Honda', 'Mazda', 'MINI'],
    features: [
      'Fold-down rear seats',
      'Compact footprint',
      'Modern infotainment',
    ],
    startingPrice: 349,
    priceRange: { min: 300, max: 600 },
    fuelTypes: ['gasoline', 'hybrid'],
    drivetrain: ['FWD'],
    passengerCapacity: 5,
    cargoSpace: 'small',
    metaTitle: 'Hatchback Leasing | Capital Motor Cars',
    metaDescription: 'Affordable hatchbacks ideal for city driving.',
    canonicalPath: '/vehicles/hatchback',
    sortOrder: 3,
    trackingCategory: 'vehicle_hatchback',
  },
  {
    slug: 'coupe',
    name: 'Coupe',
    bodyStyle: 'Coupe',
    image: mercedesSedanImg,
    badge: 'Popular',
    ctaText: 'Explore Coupes',
    description:
      'A sleek two-door design focused on style, performance, and driving excitement.',
    highlights: [
      'Two-door sporty profile',
      'Aggressive styling',
      'Engaging driving dynamics',
      'Personal style statement',
    ],
    idealFor: [
      'Style-focused drivers',
      'Couples or solo drivers',
      'Sporty daily driving',
      'Driving enthusiasts',
    ],
    popularBrands: ['BMW', 'Mercedes-Benz', 'Audi', 'Lexus', 'Infiniti'],
    features: [
      'Sport-tuned suspension',
      'Performance engines',
      'Frameless doors',
      'Premium interiors',
    ],
    startingPrice: 599,
    priceRange: { min: 550, max: 1200 },
    fuelTypes: ['gasoline', 'hybrid'],
    drivetrain: ['RWD', 'AWD'],
    passengerCapacity: 4,
    cargoSpace: 'small',
    metaTitle: 'Coupe Leasing | Capital Motor Cars',
    metaDescription: 'Stylish two-door coupes built for performance and design.',
    canonicalPath: '/vehicles/coupe',
    sortOrder: 5,
    trackingCategory: 'vehicle_coupe',
  },
  
  {
    slug: 'sedan',
    name: 'Sedan',
    bodyStyle: 'Sedan',
    image: mercedesSedanImg,
    ctaText: 'Explore Sedans',
    description:
      'A timeless four-door design offering comfort, balance, and refined daily driving.',
    highlights: [
      'Four-door practicality',
      'Comfortable rear seating',
      'Smooth highway ride',
      'Refined interior quality',
    ],
    idealFor: [
      'Families',
      'Business professionals',
      'Daily commuters',
      'Long-distance driving',
    ],
    popularBrands: ['Audi', 'BMW', 'Mercedes-Benz', 'Toyota', 'Honda'],
    features: [
      'Spacious trunk',
      'Quiet cabin',
      'Advanced safety systems',
      'Comfort-focused suspension',
    ],
    startingPrice: 499,
    priceRange: { min: 450, max: 900 },
    fuelTypes: ['gasoline', 'hybrid'],
    drivetrain: ['FWD', 'AWD'],
    passengerCapacity: 5,
    cargoSpace: 'medium',
    metaTitle: 'Sedan Leasing | Capital Motor Cars',
    metaDescription: 'Comfortable and practical sedans ideal for everyday driving.',
    canonicalPath: '/vehicles/sedan',
    sortOrder: 4,
    trackingCategory: 'vehicle_sedan',
  },

  {
    slug: 'truck',
    name: 'Truck',
    bodyStyle: 'Pickup Truck',
    image: truckRaptorImg,
    badge: 'Popular',
    ctaText: 'Browse Trucks',
    description:
      'Powerful, durable, and built to handle work and adventure.',
    highlights: [
      'High towing capacity',
      'Off-road capability',
      'Durable construction',
    ],
    idealFor: [
      'Contractors',
      'Outdoor enthusiasts',
      'Heavy-duty needs',
    ],
    popularBrands: ['Ford', 'RAM', 'Chevrolet', 'GMC'],
    features: [
      '4x4 systems',
      'Crew cab options',
      'Advanced towing tech',
    ],
    startingPrice: 749,
    priceRange: { min: 700, max: 1200 },
    fuelTypes: ['gasoline', 'diesel'],
    drivetrain: ['RWD', '4x4'],
    passengerCapacity: 5,
    cargoSpace: 'large',
    metaTitle: 'Truck Leasing | Capital Motor Cars',
    metaDescription: 'Lease powerful trucks built for work and play.',
    canonicalPath: '/vehicles/truck',
    sortOrder: 5,
    trackingCategory: 'vehicle_truck',
  },

  {
    slug: 'sports',
    name: 'Sports',
    bodyStyle: 'Sports Car',
    image: 'https://pngimg.com/uploads/porsche/porsche_PNG10620.png',
    badge: 'New',
    ctaText: 'View Sports Cars',
    description:
      'Pure performance and adrenaline-packed driving experiences.',
    highlights: [
      'High performance engines',
      'Precision handling',
      'Aggressive styling',
    ],
    idealFor: [
      'Car enthusiasts',
      'Weekend drivers',
      'Performance seekers',
    ],
    popularBrands: ['Porsche', 'BMW M', 'Mercedes-AMG', 'Audi RS'],
    features: [
      'Launch control',
      'Sport suspension',
      'Performance brakes',
    ],
    startingPrice: 999,
    priceRange: { min: 900, max: 2000 },
    fuelTypes: ['gasoline'],
    drivetrain: ['RWD', 'AWD'],
    passengerCapacity: 2,
    cargoSpace: 'small',
    metaTitle: 'Sports Car Leasing | Capital Motor Cars',
    metaDescription: 'Lease high-performance sports cars.',
    canonicalPath: '/vehicles/sports',
    sortOrder: 6,
    trackingCategory: 'vehicle_sports',
  },

  {
    slug: 'suv',
    name: 'SUV',
    bodyStyle: 'SUV',
    image: 'https://pngimg.com/uploads/land_rover/land_rover_PNG55.png',
    badge: 'Best Seller',
    ctaText: 'Browse SUVs',
    description:
      'Spacious, powerful, and versatile for families and adventure.',
    highlights: [
      'Elevated driving position',
      'Spacious interiors',
      'AWD capability',
    ],
    idealFor: [
      'Families',
      'Outdoor lifestyles',
      'All-weather driving',
    ],
    popularBrands: ['Land Rover', 'BMW', 'Mercedes-Benz', 'Lexus'],
    features: [
      'Third-row seating',
      'Power liftgate',
      'Terrain modes',
    ],
    startingPrice: 649,
    priceRange: { min: 600, max: 1100 },
    fuelTypes: ['gasoline', 'hybrid'],
    drivetrain: ['AWD'],
    passengerCapacity: 7,
    cargoSpace: 'large',
    metaTitle: 'SUV Leasing | Capital Motor Cars',
    metaDescription: 'Lease spacious and capable SUVs.',
    canonicalPath: '/vehicles/suv',
    sortOrder: 7,
    trackingCategory: 'vehicle_suv',
  },

  {
    slug: 'minivan',
    name: 'Minivan',
    bodyStyle: 'Minivan',
    image: minivanOdysseyImg,
    ctaText: 'View Minivans',
    description:
      'Maximum space, comfort, and convenience for families.',
    highlights: [
      'Sliding doors',
      'Flexible seating',
      'Family-focused tech',
    ],
    idealFor: [
      'Large families',
      'Carpooling',
      'Road trips',
    ],
    popularBrands: ['Honda', 'Toyota', 'Chrysler'],
    features: [
      '7–8 passenger seating',
      'Rear entertainment',
      'Hands-free liftgate',
    ],
    startingPrice: 599,
    priceRange: { min: 550, max: 900 },
    fuelTypes: ['gasoline', 'hybrid'],
    drivetrain: ['FWD'],
    passengerCapacity: 8,
    cargoSpace: 'large',
    metaTitle: 'Minivan Leasing | Capital Motor Cars',
    metaDescription: 'Family-friendly minivans with unmatched space.',
    canonicalPath: '/vehicles/minivan',
    sortOrder: 8,
    trackingCategory: 'vehicle_minivan',
  },

  {
    slug: 'crossover',
    name: 'Crossover',
    bodyStyle: 'Crossover',
    image: crossoverLexusImg,
    ctaText: 'Explore Crossovers',
    description:
      'Car-like comfort with SUV versatility — the perfect middle ground.',
    highlights: [
      'Fuel efficient',
      'Compact yet spacious',
      'Easy to drive',
    ],
    idealFor: [
      'Urban families',
      'Daily drivers',
      'Style-conscious buyers',
    ],
    popularBrands: ['Lexus', 'BMW', 'Audi', 'Volvo'],
    features: [
      'Flexible cargo space',
      'AWD options',
      'Modern safety tech',
    ],
    startingPrice: 549,
    priceRange: { min: 500, max: 850 },
    fuelTypes: ['gasoline', 'hybrid'],
    drivetrain: ['FWD', 'AWD'],
    passengerCapacity: 5,
    cargoSpace: 'medium',
    metaTitle: 'Crossover Leasing | Capital Motor Cars',
    metaDescription: 'Versatile crossovers with modern styling.',
    canonicalPath: '/vehicles/crossover',
    sortOrder: 9,
    trackingCategory: 'vehicle_crossover',
  },
];


export const getVehicleTypeBySlug = (slug: string): VehicleTypeData | undefined => {
  return vehicleTypes.find((v) => v.slug === slug);
};
