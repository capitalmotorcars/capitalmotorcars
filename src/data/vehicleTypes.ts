import hatchbackAudiImg from '@/assets/hatchback.png';
import truckRaptorImg from '@/assets/truck.png';
import coupeNissanImg from '@/assets/coupe.png';
import minivanOdysseyImg from '@/assets/minivan-odyssey.png';
import sedanBmwImg from '@/assets/sedan.png';
import suvToyotaImg from '@/assets/suv.png';
import wagonMiniImg from '@/assets/wagon.png';
import cuvImg from '@/assets/cuv.png';
import porscheImg from '@/assets/porschee.png';
import cayenneElectricImg from '@/assets/cayanne.png';
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
  // Vehicle specs
  range?: string; // Electric range in miles (e.g., "305")
  mpge?: string; // MPGe for electric/hybrid (e.g., "82-89 MPGe Comb.")
  mpg?: string; // MPG for gasoline vehicles (e.g., "25-30 MPG")

  // SEO
  metaTitle: string;
  metaDescription: string;
  seoKeywords?: string[];
  canonicalPath?: string;

  // Internal
  sortOrder?: number;
  isFeatured?: boolean;
  isLuxury?: boolean;
  trackingCategory?: string;
}
export const vehicleTypes: VehicleTypeData[] = [

  // =========================
  // ELECTRIC (PURE EV)
  // =========================
  {
    slug: 'electric',
    name: 'Electric',
    bodyStyle: 'Electric Vehicle',
    image: cayenneElectricImg,
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
    idealFor: ['Eco-conscious drivers', 'Tech enthusiasts', 'Daily commuters'],
    popularBrands: ['Tesla', 'Rivian', 'Lucid', 'BMW', 'Porsche'],
    features: ['Fast charging', 'Regenerative braking', 'OTA updates'],
    startingPrice: 699,
    priceRange: { min: 600, max: 1300 },
    fuelTypes: ['electric'], // ✅ correct
    drivetrain: ['RWD', 'AWD'],
    passengerCapacity: 5,
    cargoSpace: 'medium',
    range: '305',
    mpge: '82-89 MPGe Comb.',
    metaTitle: 'Electric Vehicle Leasing | Capital Motor Cars',
    metaDescription: 'Discover the latest electric vehicles.',
    canonicalPath: '/vehicles/electric',
    isFeatured: true,
    sortOrder: 1,
    trackingCategory: 'vehicle_electric',
  },

  // =========================
  // HATCHBACK
  // =========================
  {
    slug: 'hatchback',
    name: 'Hatchback',
    bodyStyle: 'Hatchback',
    image: hatchbackAudiImg,
    ctaText: 'View Hatchbacks',
    description: 'Compact, efficient, and perfect for city driving.',
    highlights: ['Easy to park', 'Fuel efficient', 'Affordable'],
    idealFor: ['Urban commuters', 'First-time drivers'],
    popularBrands: ['Volkswagen', 'Honda', 'Mazda', 'MINI'],
    features: ['Fold-down rear seats', 'Compact size'],
    startingPrice: 349,
    priceRange: { min: 300, max: 600 },
    fuelTypes: ['gasoline', 'hybrid'], // ✅ realistic
    drivetrain: ['FWD'],
    passengerCapacity: 5,
    cargoSpace: 'small',
    mpg: '32-38 MPG',
    mpge: '45-52 MPGe Comb.',
    metaTitle: 'Hatchback Leasing',
    metaDescription: 'Affordable hatchbacks ideal for city driving.',
    canonicalPath: '/vehicles/hatchback',
    sortOrder: 2,
    trackingCategory: 'vehicle_hatchback',
  },

  // =========================
  // COUPE
  // =========================
  {
    slug: 'coupe',
    name: 'Coupe',
    bodyStyle: 'Coupe',
    image: coupeNissanImg,
    badge: 'Popular',
    ctaText: 'Explore Coupes',
    description: 'Sleek two-door vehicles focused on style and performance.',
    highlights: ['Sporty design', 'Driver-focused'],
    idealFor: ['Solo drivers', 'Style lovers'],
    popularBrands: ['BMW', 'Mercedes-Benz', 'Audi'],
    features: ['Sport suspension', 'Premium interiors'],
    startingPrice: 599,
    priceRange: { min: 550, max: 1200 },
    fuelTypes: ['gasoline', 'hybrid'],
    drivetrain: ['RWD', 'AWD'],
    passengerCapacity: 4,
    cargoSpace: 'small',
    mpg: '22-28 MPG',
    mpge: '38-45 MPGe Comb.',
    metaTitle: 'Coupe Leasing',
    metaDescription: 'Stylish coupes built for driving pleasure.',
    canonicalPath: '/vehicles/coupe',
    sortOrder: 3,
    isLuxury: true,
    trackingCategory: 'vehicle_coupe',
  },

  // =========================
  // SEDAN
  // =========================
  {
    slug: 'sedan',
    name: 'Sedan',
    bodyStyle: 'Sedan',
    image: sedanBmwImg,
    ctaText: 'Explore Sedans',
    description: 'Balanced, comfortable, and perfect for daily driving.',
    highlights: ['Comfort', 'Efficiency', 'Practicality'],
    idealFor: ['Families', 'Professionals'],
    popularBrands: ['BMW', 'Mercedes-Benz', 'Toyota', 'Honda'],
    features: ['Quiet cabin', 'Spacious trunk'],
    startingPrice: 499,
    priceRange: { min: 450, max: 900 },
    fuelTypes: ['gasoline', 'hybrid'], // ✅ correct
    drivetrain: ['FWD', 'AWD'],
    passengerCapacity: 5,
    cargoSpace: 'medium',
    mpg: '28-35 MPG',
    mpge: '48-55 MPGe Comb.',
    metaTitle: 'Sedan Leasing',
    metaDescription: 'Comfortable sedans for everyday use.',
    canonicalPath: '/vehicles/sedan',
    sortOrder: 4,
    trackingCategory: 'vehicle_sedan',
  },

  // =========================
  // SPORTS
  // =========================
  {
    slug: 'sports',
    name: 'Sports',
    bodyStyle: 'Sports Car',
    image: porscheImg,
    badge: 'New',
    ctaText: 'View Sports Cars',
    description: 'High-performance vehicles built for excitement.',
    highlights: ['Performance', 'Precision handling'],
    idealFor: ['Enthusiasts', 'Weekend drivers'],
    popularBrands: ['Porsche', 'BMW M', 'Mercedes-AMG'],
    features: ['Launch control', 'Performance brakes'],
    startingPrice: 999,
    priceRange: { min: 900, max: 2000 },
    fuelTypes: ['gasoline', 'hybrid'],
    drivetrain: ['RWD', 'AWD'],
    passengerCapacity: 2,
    cargoSpace: 'small',
    mpg: '18-24 MPG',
    mpge: '35-42 MPGe Comb.',
    metaTitle: 'Sports Car Leasing',
    metaDescription: 'Lease adrenaline-packed sports cars.',
    canonicalPath: '/vehicles/sports',
    sortOrder: 5,
    isLuxury: true,
    trackingCategory: 'vehicle_sports',
  },

 
  {
    slug: 'suv',
    name: 'SUV',
    bodyStyle: 'SUV',
    image: suvToyotaImg,
    badge: 'Best Seller',
    ctaText: 'Browse SUVs',
    description: 'Spacious, capable, and family-friendly.',
    highlights: ['AWD capability', 'Spacious interior'],
    idealFor: ['Families', 'Adventure seekers'],
    popularBrands: ['Land Rover', 'BMW', 'Mercedes-Benz', 'Lexus'],
    features: ['Third-row seating', 'Terrain modes'],
    startingPrice: 649,
    priceRange: { min: 600, max: 1100 },
    fuelTypes: ['gasoline', 'hybrid'], // ✅ correct
    drivetrain: ['AWD'],
    passengerCapacity: 7,
    cargoSpace: 'large',
    mpg: '20-26 MPG',
    mpge: '42-48 MPGe Comb.',
    metaTitle: 'SUV Leasing',
    metaDescription: 'Lease powerful and versatile SUVs.',
    canonicalPath: '/vehicles/suv',
    sortOrder: 6,
    isLuxury: true,
    trackingCategory: 'vehicle_suv',
  },

  // =========================
  // MINIVAN (MPV)
  // =========================
  {
    slug: 'minivan',
    name: 'Minivan',
    bodyStyle: 'Minivan',
    image: minivanOdysseyImg,
    ctaText: 'View Minivans',
    description: 'Maximum space and comfort for families.',
    highlights: ['Sliding doors', 'Flexible seating'],
    idealFor: ['Large families', 'Road trips'],
    popularBrands: ['Honda', 'Toyota', 'Chrysler'],
    features: ['8-passenger seating', 'Rear entertainment'],
    startingPrice: 599,
    priceRange: { min: 550, max: 900 },
    fuelTypes: ['gasoline', 'hybrid'], // ✅ correct
    drivetrain: ['FWD'],
    passengerCapacity: 8,
    cargoSpace: 'large',
    mpg: '22-28 MPG',
    mpge: '38-45 MPGe Comb.',
    metaTitle: 'Minivan Leasing',
    metaDescription: 'Family-focused minivans.',
    canonicalPath: '/vehicles/minivan',
    sortOrder: 7,
    trackingCategory: 'vehicle_minivan',
  },

  // =========================
  // CROSSOVER (CUV)
  // =========================
  {
    slug: 'crossover',
    name: 'Crossover',
    bodyStyle: 'Crossover',
    image: cuvImg,
    ctaText: 'Explore Crossovers',
    description: 'SUV versatility with car-like comfort.',
    highlights: ['Fuel efficient', 'Easy to drive'],
    idealFor: ['Urban families', 'Daily drivers'],
    popularBrands: ['Lexus', 'BMW', 'Audi', 'Volvo'],
    features: ['Flexible cargo space', 'AWD options'],
    startingPrice: 549,
    priceRange: { min: 500, max: 850 },
    fuelTypes: ['gasoline', 'hybrid'], // ✅ correct
    drivetrain: ['FWD', 'AWD'],
    passengerCapacity: 5,
    cargoSpace: 'medium',
    mpg: '26-32 MPG',
    mpge: '44-50 MPGe Comb.',
    metaTitle: 'Crossover Leasing',
    metaDescription: 'Modern crossovers with versatility.',
    canonicalPath: '/vehicles/crossover',
    sortOrder: 8,
    trackingCategory: 'vehicle_crossover',
  },
  
 
  {
    slug: 'truck',
    name: 'Truck',
    bodyStyle: 'Truck',
    image: truckRaptorImg,
    ctaText: 'Explore Trucks',
    description: 'Powerful and capable trucks for any job.',
    highlights: ['Powerful engine', 'Towing capacity'],
    idealFor: ['Workers', 'Adventure seekers'],
    popularBrands: ['Ford', 'Chevrolet', 'Ram'],
    features: ['Powerful engine', 'Towing capacity'],
    startingPrice: 799,
    priceRange: { min: 750, max: 1500 },
    fuelTypes: ['gasoline', 'diesel', 'hybrid'],
    drivetrain: ['4x4'],
    passengerCapacity: 5,
    cargoSpace: 'large',
    mpg: '16-22 MPG',
    mpge: '28-35 MPGe Comb.',
    metaTitle: 'Truck Leasing',
    metaDescription: 'Lease powerful and capable trucks.',
    canonicalPath: '/vehicles/truck',
    sortOrder: 10,
    trackingCategory: 'vehicle_truck',
  },
  {
    slug: 'wagon',
    name: 'Wagon',
    bodyStyle: 'Wagon',
    image: wagonMiniImg,
    ctaText: 'Explore Wagons',
    description: 'Wagons for the discerning driver.',
    highlights: ['Wagon'],
    idealFor: ['Wagon drivers', 'Wagon buyers'],
    popularBrands: ['Mini', 'Volkswagen'],
    features: ['Wagon', 'Wagon'],
    startingPrice: 799,
    priceRange: { min: 750, max: 1500 },
    fuelTypes: ['gasoline', 'hybrid'],
    drivetrain: ['FWD'],
    passengerCapacity: 5,
    cargoSpace: 'medium',
    mpg: '28-34 MPG',
    mpge: '46-52 MPGe Comb.',
    metaTitle: 'Wagon Leasing',
    metaDescription: 'Lease wagons.',
    canonicalPath: '/vehicles/wagon',
    sortOrder: 11,
    trackingCategory: 'vehicle_wagon',
  },
];



export const getVehicleTypeBySlug = (slug: string): VehicleTypeData | undefined => {
  return vehicleTypes.find((v) => v.slug === slug);
};
