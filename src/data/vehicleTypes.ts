import hatchbackAudiImg from '@/assets/audi.png';
import truckRaptorImg from '@/assets/raptor.png';
import coupeCoupeImg from '@/assets/bmw.png';
import minivanOdysseyImg from '@/assets/minivan-odyssey.png';
import sedanBmwImg from '@/assets/sedan.png';
import sedanMercedesImg from '@/assets/sedan-mercedes.png';
import sedanAudiImg from '@/assets/sedan-audi.png';
import suvToyotaImg from '@/assets/mercedes.png';
import wagonBmwImg from '@/assets/wagon.png';
import cuvImg from '@/assets/cuv.png';
import porscheImg from '@/assets/porschee.png';
import cayenneElectricImg from '@/assets/cayanne.png';
export type FuelType = 'gasoline' | 'diesel' | 'hybrid' | 'electric';
export type Drivetrain = 'FWD' | 'RWD' | 'AWD' | '4x4';

export interface VehicleTypeData {
  slug: string;
  name: string;
  bodyStyle: string;
  image: string;
  ogImage?: string;
  icon?: string;

  description: string;
  highlights: string[];
  idealFor: string[];
  popularBrands: string[];
  features: string[];
  badge?: 'Popular' | 'New' | 'Best Seller' | 'Eco Friendly';
  ctaText?: string;

  startingPrice?: number;
  priceRange?: {
    min: number;
    max: number;
  };
  fuelTypes: FuelType[];
  drivetrain: Drivetrain[];
  passengerCapacity: number;
  cargoSpace: 'small' | 'medium' | 'large';
  range?: string;
  mpge?: string;
  mpg?: string;

  metaTitle: string;
  metaDescription: string;
  seoKeywords?: string[];
  canonicalPath?: string;

  sortOrder?: number;
  isFeatured?: boolean;
  isLuxury?: boolean;
  trackingCategory?: string;
}
export const vehicleTypes: VehicleTypeData[] = [

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
    popularBrands: [ 'Rivian', 'Lucid', 'BMW', 'Porsche'],
    features: ['Fast charging', 'Regenerative braking', 'OTA updates'],
    startingPrice: 699,
    priceRange: { min: 600, max: 1300 },
    fuelTypes: ['electric'],
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
    fuelTypes: ['gasoline', 'hybrid'],
    drivetrain: ['FWD'],
    passengerCapacity: 5,
    cargoSpace: 'small',
    mpg: '24-34 MPG',
    mpge: '28 MPG Combined',
    metaTitle: 'Hatchback Leasing',
    metaDescription: 'Affordable hatchbacks ideal for city driving.',
    canonicalPath: '/vehicles/hatchback',
    sortOrder: 2,
    trackingCategory: 'vehicle_hatchback',
  },

  {
    slug: 'coupe',
    name: 'Coupe',
    bodyStyle: 'Coupe',
    image: coupeCoupeImg,
    badge: 'Popular',
    ctaText: 'Explore Coupes',
    description: 'Sleek two-door vehicles focused on style and performance.',
    highlights: ['Sporty design', 'Driver-focused'],
    idealFor: ['Solo drivers', 'Style lovers'],
    popularBrands: ['BMW', 'Mercedes-Benz', 'Audi', 'Lexus', 'Genesis', 'Toyota', 'Honda', 'Acura', 'Infiniti', 'Cadillac'],
    features: ['Sport suspension', 'Premium interiors'],
    startingPrice: 599,
    priceRange: { min: 550, max: 1200 },
    fuelTypes: ['gasoline', 'hybrid'],
    drivetrain: ['RWD', 'AWD'],
    passengerCapacity: 4,
    cargoSpace: 'small',
    mpg: '15-22 MPG',
    mpge: '17 MPG Combined',
    metaTitle: 'Coupe Leasing',
    metaDescription: 'Stylish coupes built for driving pleasure.',
    canonicalPath: '/vehicles/coupe',
    sortOrder: 3,
    isLuxury: true,
    trackingCategory: 'vehicle_coupe',
  },

  {
    slug: 'sedan',
    name: 'Sedan',
    bodyStyle: 'Sedan',
    image: sedanBmwImg,
    ctaText: 'Explore Sedans',
    description: 'Luxury performance sedan with 335 horsepower, elegant Gran Coupe design, and cutting-edge BMW technology.',
    highlights: ['335 horsepower', 'Luxury interior', 'Advanced technology', 'Premium comfort'],
    idealFor: ['Luxury sedan buyers', 'Performance enthusiasts', 'Executive drivers'],
    popularBrands: ['BMW', 'Mercedes-Benz', 'Audi', 'Lexus', 'Genesis', 'Toyota', 'Honda', 'Acura', 'Infiniti', 'Cadillac'],
    features: ['3.0L turbocharged 6-cylinder', '8-speed automatic', 'Leather seats', 'Navigation system', 'Collision warning'],
    startingPrice: 909,
    priceRange: { min: 900, max: 1200 },
    fuelTypes: ['gasoline'],
    drivetrain: ['RWD', 'AWD'],
    passengerCapacity: 5,
    cargoSpace: 'medium',
    mpg: '20-27 MPG (EPA)',
    mpge: '42-48 MPGe Comb.',
    metaTitle: 'BMW 8 Series Gran Coupe 840i Leasing',
    metaDescription: 'Lease the 2026 BMW 8 Series Gran Coupe 840i - luxury performance sedan with 335 hp.',
    canonicalPath: '/vehicles/sedan',
    sortOrder: 4,
    isLuxury: true,
    trackingCategory: 'vehicle_sedan',
  },
  {
    slug: 'sedan-mercedes-e350',
    name: 'Sedan',
    bodyStyle: 'Sedan',
    image: sedanMercedesImg,
    ctaText: 'Explore Sedans',
    description: 'Luxury meets performance in the Mercedes E 350 Sedan, featuring advanced technology, premium comfort, and refined driving dynamics.',
    highlights: ['Premium luxury', 'Advanced MBUX technology', '4MATIC all-wheel drive', 'Heated leather seats'],
    idealFor: ['Luxury sedan buyers', 'Professionals', 'Executive drivers'],
    popularBrands: ['BMW', 'Mercedes-Benz', 'Audi', 'Lexus', 'Genesis', 'Toyota', 'Honda', 'Acura', 'Infiniti', 'Cadillac'],
    features: ['MBUX infotainment system', 'Ambient interior lighting', 'Heated steering wheel', 'Navigation system', 'Blind-spot monitoring'],
    startingPrice: 699,
    priceRange: { min: 679, max: 999 },
    fuelTypes: ['gasoline'],
    drivetrain: ['RWD', 'AWD'],
    passengerCapacity: 5,
    cargoSpace: 'medium',
    mpg: '24-33 MPG (EPA)',
    mpge: '48-55 MPGe Comb.',
    metaTitle: 'Mercedes E 350 Sedan Leasing',
    metaDescription: 'Lease the 2026 Mercedes E 350 Sedan - luxury, technology, and performance in one refined package.',
    canonicalPath: '/vehicles/sedan',
    sortOrder: 4,
    isLuxury: true,
    trackingCategory: 'vehicle_sedan',
  },
  {
    slug: 'sedan-audi-rs3',
    name: 'Sedan',
    bodyStyle: 'Sedan',
    image: sedanAudiImg,
    ctaText: 'Explore Sedans',
    description: 'High-performance sport sedan with 394 horsepower, quattro all-wheel drive, and track-ready capabilities for the driving enthusiast.',
    highlights: ['394 horsepower', '0-60 in 3.6 seconds', 'quattro AWD', 'Sport-tuned suspension'],
    idealFor: ['Performance enthusiasts', 'Sport sedan lovers', 'Track day drivers'],
    popularBrands: ['BMW', 'Mercedes-Benz', 'Audi', 'Lexus', 'Genesis', 'Toyota', 'Honda', 'Acura', 'Infiniti', 'Cadillac'],
    features: ['2.5L turbocharged 5-cylinder', '7-speed DSG transmission', 'RS sport mode', 'Matrix LED headlights', 'Nappa leather seats'],
    startingPrice: 799,
    priceRange: { min: 779, max: 1099 },
    fuelTypes: ['gasoline'],
    drivetrain: ['AWD'],
    passengerCapacity: 5,
    cargoSpace: 'medium',
    mpg: '20-29 MPG (EPA)',
    mpge: '40-46 MPGe Comb.',
    metaTitle: 'Audi RS 3 quattro Sedan Leasing',
    metaDescription: 'Lease the 2026 Audi RS 3 quattro - ultimate performance sedan with 394 hp and quattro all-wheel drive.',
    canonicalPath: '/vehicles/sedan',
    sortOrder: 4,
    isLuxury: true,
    trackingCategory: 'vehicle_sedan',
  },
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
    image: wagonBmwImg,
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
      mpg: '15-18 MPG',
      mpge: '50-60 MPGe Comb.',
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
