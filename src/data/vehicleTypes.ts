import hatchbackAudiImg from '@/assets/audi.png';
import truckRaptorImg from '@/assets/raptor.png';
import coupeCoupeImg from '@/assets/bmw.png';
import minivanOdysseyImg from '@/assets/minivan-odyssey.png';
import sedanBmwHybridImg from '@/assets/hybrid.png';
import sedanMercedesImg from '@/assets/sedan-mercedes.png';
import sedanAudiImg from '@/assets/electric.png';
import suvToyotaImg from '@/assets/mercedes.png';
import wagonBmwImg from '@/assets/wagon.png';
import cuvImg from '@/assets/cuv.png';
import porscheImg from '@/assets/porschee.png';
import cayenneElectricImg from '@/assets/cayanne.png';
import convertibleImg from '@/assets/corvette.png';
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
export const vehicleTypes: VehicleTypeData[] = [
  // 1. ELECTRIC - 2026 Porsche Cayenne Electric
  {
    slug: 'cayenne-e-hybrid',
    name: 'Hybrid SUV',
    bodyStyle: 'SUV',
    image: cayenneElectricImg,
    isLuxury: true,
    vehicleName: 'Porsche Cayenne E-Hybrid',
    badge: 'PHEV Performance',
    description: 'The best of both worlds. The Cayenne E-Hybrid pairs a turbocharged V6 with a potent electric motor, delivering 463 hp and the ability to handle daily commutes on pure electricity.',
    startingPrice: 1962.89,
    fuelTypes: ['gasoline', 'electric'],
    drivetrain: ['AWD'],
    passengerCapacity: 5,
    cargoSpace: 'large',
    fuelEconomy: { city: 17, hwy: 23, avg: 19, range: 430 }, // Gas-only; MPGe varies
    performance: {
      hp: 463,
      torque: 479,
      engine: '3.0L Turbo V6 PHEV',
      transmission: '8-Speed Tiptronic S',
      drivetrain: 'All-Wheel Drive',
      zeroToSixty: '4.6 sec'
    },
    specs: {
      exterior: { length: '194.1″', height: '66.8″', weight: '5,348 lbs', wheels: '20" AeroDesign' },
      interior: { headroom: '39.6″', legroom: '41.2″', cargo: '22.1 cu. ft.', passengers: 5 },
      warranty: { comprehensive: '4 years / 50k miles', powertrain: '4 years / 50k miles', roadside: '4 years / 50k miles' }
    },
    featureGroups: [
      { category: "Hybrid Tech", items: ["25.9 kWh Battery", "11kW On-board Charger", "E-Power & Hybrid Modes"] },
      { category: "Handling", items: ["PASM (Active Suspension)", "Power Steering Plus", "Optional Rear-Axle Steering"] },
      { category: "Cabin", items: ["12.6-inch Curved Display", "12.3-inch PCM", "Matrix LED Headlights"] }
    ],
    highlights: ['48-Mile Electric Range', '463 HP Combined Output', '11kW AC Charging'],
    popularBrands: ['BMW', 'Mercedes-Benz', 'Lexus', 'Toyota', 'Honda', 'Porsche'],
    metaTitle: '2026 Porsche Cayenne E-Hybrid Leasing',
    metaDescription: 'Lease the versatile and powerful 2026 Porsche Cayenne E-Hybrid plug-in SUV.',
    idealFor: [
      'Eco-conscious drivers not ready for a full EV',
      'Families needing 7,700+ lbs of towing capacity',
      'Daily commuters looking to drive gas-free on weekdays'
    ],
    features: [
      '3.0L V6 Turbo combined with 174 hp Electric Motor',
      '12.6-inch Curved Digital Instrument Cluster',
      'Standard PASM (Porsche Active Suspension Management)',
      'Warn & Brake Assist with Pedestrian Protection',
      'Available 10.9-inch Passenger Side Display'
    ],
  },


  // HYPERCAR - 2026 Chevrolet Corvette Z06
  {
    slug: 'corvette-z06-1lz',
    name: 'American Hypercar Coupe',
    bodyStyle: 'Coupe',
    image: convertibleImg,
    isLuxury: true,
    badge: 'Track Ready',
    description: 'The soul of a race car in a street-legal body. The Z06 features the hand-assembled LT6 V8—the most powerful naturally aspirated production V8 in history.',
    startingPrice: 2272.85,
    vehicleName: 'Chevrolet Corvette Z06 1LZ',
    fuelTypes: ['gasoline'],
    drivetrain: ['RWD'],
    passengerCapacity: 2,
    cargoSpace: 'small',
    fuelEconomy: { city: 12, hwy: 21, avg: 15, range: 278 },
    performance: {
      hp: 670,
      torque: 460,
      engine: '5.5L LT6 V8 (Flat-Plane Crank)',
      transmission: '8-Speed Dual-Clutch (DCT)',
      drivetrain: 'Rear-Wheel Drive',
      zeroToSixty: '2.6 sec'
    },
    specs: {
      exterior: { length: '184.6″', height: '48.6″', weight: '3,500 lbs', wheels: '20" Front / 21" Rear Forged Aluminum' },
      interior: { headroom: '37.9″', legroom: '42.8″', cargo: '12.6 cu. ft.', passengers: 2 },
      warranty: { comprehensive: '3 years / 36k miles', powertrain: '5 years / 60k miles', roadside: '5 years / 60k miles' }
    },
    featureGroups: [
      { category: "Performance", items: ["Magnetic Ride Control 4.0", "Performance Exhaust", "8,600 RPM Redline"] },
      { category: "Interior", items: ["GT1 Bucket Seats", "Bose® 10-Speaker Audio", "8-way Power Seats"] },
      { category: "Technology", items: ["12.7-inch Touchscreen", "14-inch Digital Cluster", "Wireless Charging Pad"] }
    ],
    highlights: ['670 HP Naturally Aspirated V8', '2.6s 0-60 mph', 'Flat-Plane Crank Sound'],
    popularBrands: ['Porsche', 'BMW', 'Mercedes-Benz', 'Corvette'],
    metaTitle: '2026 Corvette Z06 1LZ Leasing & Specs',
    metaDescription: 'Lease the 670 horsepower naturally aspirated 2026 Corvette Z06 1LZ.',
    idealFor: [
      'Driving purists seeking a high-revving, naturally aspirated V8',
      'Track enthusiasts wanting a mid-engine platform with razor-sharp handling',
      'Supercar buyers looking for exotic performance at an American price point'
    ],
    features: [
      '5.5L LT6 V8 Engine with 8,600 RPM Redline',
      'Bose® Premium 10-Speaker Audio System',
      'Magnetic Selective Ride Control™ 4.0',
      '12.7-inch Infotainment Screen with Google Built-In',
      'Removable Body-Color Roof Panel'
    ],
  },
  {
    slug: 'sedan-mercedes-e350',
    name: 'Sedan',
    bodyStyle: 'Sedan',
    vehicleName: 'AMG E 53 4MATIC Sedan',
    isLuxury: true,
    image: sedanMercedesImg,
    description: 'The benchmark of luxury. The 2026 E 350 features the MBUX Superscreen and a 48V mild-hybrid system for seamless power delivery.',
    startingPrice: 1510.10,
    fuelTypes: ['gasoline'],
    drivetrain: ['AWD'],
    passengerCapacity: 5,
    cargoSpace: 'medium',
    fuelEconomy: { city: 24, hwy: 33, avg: 27, range: 470 },
    performance: {
      hp: 255,
      torque: 295,
      engine: '2.0L I-4 Turbo w/ Mild Hybrid',
      transmission: '9G-TRONIC 9-Speed Automatic',
      drivetrain: '4MATIC All-Wheel Drive',
      zeroToSixty: '6.1 sec'
    },
    specs: {
      exterior: { length: '194.9″', height: '58.3″', weight: '4,198 lbs', wheels: '18" 5-Spoke Standard' },
      interior: { headroom: '37.9″', legroom: '41.5″', cargo: '12.7 cu. ft.', passengers: 5 },
      warranty: { comprehensive: '4 years / 50k miles', powertrain: '4 years / 50k miles', roadside: '4 years / 50k miles' }
    },
    featureGroups: [
      { category: "Tech", items: ["MBUX Superscreen", "Selfie Camera", "AI Routine Learning"] },
      { category: "Safety", items: ["PRE-SAFE Impulse Side", "Active Brake Assist", "Car-to-X Comm."] }
    ],
    highlights: ['MBUX Superscreen', '48V Mild Hybrid', '4MATIC AWD'],
    popularBrands: ['BMW', 'Mercedes', 'Audi', 'Lexus', 'Genesis', 'Toyota', 'Honda', 'Acura', 'Cadillac', 'Alfa Romeo', 'Mazda'],
    metaTitle: '2026 Mercedes E 350 Sedan Leasing',
    metaDescription: 'Lease the tech-forward 2026 Mercedes-Benz E-Class.',
    idealFor: [
      'Corporate executives prioritizing comfort and status',
      'Tech-forward drivers who want AI-assisted features',
      'Small families looking for top-tier safety ratings'
    ],
    features: [
      'MBUX Superscreen with Passenger Display',
      'AI-Powered "Routines" (Automation for Climate/Music)',
      '64-Color Active Ambient Lighting (Syncs with Sound)',
      'Burmester® 4D Surround Sound with Dolby Atmos',
      'Digital Vehicle Key (iPhone/Watch compatible)'
    ],
  },
  // COUPE - 2026 BMW M8 Coupe Competition
  {
    slug: 'm8-coupe-competition',
    name: 'Coupe',
    bodyStyle: 'Coupe',
    isLuxury: true,
    image: coupeCoupeImg, // Keep existing ref or update to M8 asset
    badge: 'Flagship M',
    description: 'The pinnacle of BMW M engineering. The M8 Competition combines grand touring luxury with a 617-hp V8 and the advanced M xDrive system for supercar-level performance.',
    startingPrice: 2178.80,
    vehicleName: 'BMW M8 Coupe Competition',
    fuelTypes: ['gasoline'],
    drivetrain: ['AWD'],
    passengerCapacity: 4,
    cargoSpace: 'small',
    fuelEconomy: { city: 15, hwy: 22, avg: 17, range: 342 },
    performance: {
      hp: 617,
      torque: 553,
      engine: '4.4L TwinPower Turbo V8',
      transmission: '8-Speed M Steptronic',
      drivetrain: 'M xDrive AWD (with 2WD mode)',
      zeroToSixty: '3.0 sec'
    },
    specs: {
      exterior: { length: '191.8″', height: '53.6″', weight: '4,295 lbs', wheels: '20" M Star-Spoke' },
      interior: { headroom: '38.9″', legroom: '42.1″ (Front)', cargo: '14.8 cu. ft.', passengers: 4 },
      warranty: { comprehensive: '4 years / 50k miles', powertrain: '4 years / 50k miles', roadside: '4 years / Unlimited' }
    },
    featureGroups: [
      { category: "M Dynamics", items: ["M xDrive with 2WD Mode", "Active M Differential", "Adaptive M Suspension"] },
      { category: "Luxury", items: ["Merino Leather", "Harman Kardon® 16-Speaker", "Carbon Fiber Roof"] },
      { category: "Advanced Tech", items: ["Live Cockpit Professional", "Laserlight Headlights", "M Track Mode"] }
    ],
    highlights: ['617 HP Twin-Turbo V8', '3.0s 0-60 mph', 'M xDrive AWD System'],
    popularBrands: ['Porsche', 'BMW', 'Mercedes-Benz', 'Lexus', 'Toyota', 'Honda'],
    metaTitle: '2026 BMW M8 Coupe Competition Leasing',
    metaDescription: 'Experience the 617-hp 2026 BMW M8 Competition. The ultimate luxury athlete.',
    idealFor: [
      'High-performance enthusiasts who want a "track-ready" grand tourer',
      'Executives who demand an aggressive presence and top-tier luxury',
      'Drivers looking for supercar acceleration with everyday usability'
    ],
    features: [
      'M xDrive with selectable 2WD mode for pure RWD feel',
      'BMW Laserlight Headlights for superior night visibility',
      'Adaptive M Suspension for optimized track and street comfort',
      'Harman Kardon® 16-speaker Surround Sound System',
      'Carbon Fiber Reinforced Plastic (CFRP) Roof for weight reduction'
    ],
  },

  // 3. PERFORMANCE SEDAN - 2026 Audi RS 3
  {
    slug: 'sedan-rs-etron-gt',
    name: 'Electric',
    bodyStyle: 'Electric Sedan',
    image: sedanAudiImg,
    isLuxury: true,
    badge: 'New',
    description: 'The pinnacle of Audi electric performance. With 912-hp and a 0-60 mph time of just 2.4 seconds, the RS e-tron GT Performance is the most powerful production Audi ever built.',
    startingPrice: 3017.77,
    vehicleName: 'Audi RS e-tron GT',
    fuelTypes: ['electric'],
    drivetrain: ['AWD'],
    passengerCapacity: 5,
    cargoSpace: 'small',
    fuelEconomy: {
      city: 85,
      hwy: 82,
      avg: 84,
      range: 278
    },
    performance: {
      hp: 912,
      torque: 612,
      engine: 'Dual-Motor Electric (97.0 kWh usable)',
      transmission: '2-Speed Automatic (Rear), 1-Speed (Front)',
      drivetrain: 'quattro All-Wheel Drive with Torque Vectoring',
      zeroToSixty: '2.4 sec'
    },
    specs: {
      exterior: {
        length: '196.7″',
        height: '54.9″',
        weight: '5,162 lbs',
        wheels: '21" 5-Spoke RS Design'
      },
      interior: {
        headroom: '38.2″',
        legroom: '41.9″',
        cargo: '9.2 cu. ft.',
        passengers: 5
      },
      warranty: {
        comprehensive: '4 years / 50k miles',
        powertrain: '4 years / 50k miles',
        roadside: '4 years / Unlimited',
      }
    },
    featureGroups: [
      {
        category: "Electric Performance",
        items: ["800V Architecture", "320kW DC Fast Charging", "Launch Control", "Single-Pedal Driving"]
      },
      {
        category: "Luxury & Audio",
        items: ["16-Speaker Bang & Olufsen 3D Sound", "18-Way Massage Seats", "Carbon Fiber Roof", "Nappa Leather"]
      },
      {
        category: "Driver Assist",
        items: ["Remote Park Assist Plus", "360° View Camera", "Adaptive Cruise Assist", "Intersection Assist"]
      }
    ],
    highlights: ['912 HP Electric quattro', '2.4s 0-60 MPH', '800V Ultra-Fast Charging'],
    popularBrands: ['BMW', 'Mercedes-Benz', 'Audi', 'Genesis', 'Porsche', 'Dodge'],
    metaTitle: '2026 Audi RS e-tron GT Performance Leasing',
    metaDescription: 'Lease the 912-hp Audi RS e-tron GT Performance. 0-60 in 2.4 seconds with ultra-fast charging.',
    idealFor: [
      'Tech-forward enthusiasts seeking the ultimate electric grand tourer',
      'Luxury buyers wanting hypercar acceleration with sedan practicality',
      'Drivers prioritizing ultra-fast charging and advanced thermal management'
    ],
    features: [
      'Bang & Olufsen® 3D Premium Sound System',
      'Audi Virtual Cockpit with RS Performance Layout',
      '18-Way Power Front Sport Seats with Massage and Ventilation',
      'Matrix LED Headlights with Audi Laser Light',
      'Panoramic Carbon Fiber Roof and Active Rear Spoiler'
    ],
  },
  // 2. SEDAN - BMW 7 Series Express
  {
    slug: 'sedan-750e',
    name: 'Hybrid',
    bodyStyle: 'Sedan',
    image: sedanBmwHybridImg, // Updated to reference the 7 Series
    isLuxury: true,
    description: 'The pinnacle of BMW’s electrified luxury. The 750e xDrive combines a silky-smooth 3.0L inline-six with a powerful electric motor for silent city cruising and effortless highway power.',
    startingPrice: 1685.13,
    vehicleName: 'BMW 750e xDrive',
    fuelTypes: ['gasoline', 'electric'],
    drivetrain: ['AWD'],
    passengerCapacity: 5,
    cargoSpace: 'medium',
    fuelEconomy: { city: 68, hwy: 74, avg: 70, range: 470 }, // MPGe focus
    performance: {
      hp: 483,
      torque: 516,
      engine: '3.0L Turbo 6-Cylinder Plug-in Hybrid',
      transmission: '8-Speed Steptronic Sport',
      drivetrain: 'xDrive Intelligent AWD',
      zeroToSixty: '4.6 sec'
    },
    specs: {
      exterior: { length: '212.2″', height: '60.8″', weight: '5,331 lbs', wheels: '20" M Aero Bicolor' },
      interior: { headroom: '39.8″', legroom: '42.8″ (Rear)', cargo: '18.5 cu. ft.', passengers: 5 },
      warranty: {
        comprehensive: '4 years / 50k miles',
        powertrain: '4 years / 50k miles',
        roadside: '4 years / Unlimited',
      }
    },
    featureGroups: [
      { category: "Electrification", items: ["34 Mile Electric Range", "7.4kW Onboard Charger", "Regenerative Braking"] },
      { category: "Luxury", items: ["Bowers & Wilkins Surround Sound", "Panoramic Sky Lounge LED Roof", "Merino Leather Seating"] },
      { category: "Technology", items: ["BMW Interaction Bar", "Live Cockpit Pro", "Augmented Reality Nav"] }
    ],
    highlights: ['483 HP Hybrid System', '34 Mile EV Range', 'BMW Theater Screen Available'],
    popularBrands: ['BMW', 'Mercedes-Benz', 'Lexus', 'Toyota', 'Honda'],
    metaTitle: '2026 BMW 750e xDrive PHEV Leasing',
    metaDescription: 'Lease the 483hp BMW 750e xDrive. Experience 34 miles of pure electric range in the ultimate luxury sedan.',
    idealFor: [
      'Eco-conscious executives who want zero-emission city commuting',
      'Long-distance travelers requiring high fuel efficiency and range',
      'Tech enthusiasts looking for the MBUX-rivalling Interaction Bar'
    ],
    features: [
      'BMW Interaction Bar with Dynamic Ambient Lighting',
      'Panoramic Sky Lounge LED Roof with 1st and 2nd Row Sunroof',
      '18-Speaker Bowers & Wilkins Surround Sound System',
      'Soft-Close Automatic Doors and Power Liftgate',
      'Digital Key Plus for smartphone-based vehicle access'
    ],
  },
  // 4. TRUCK - 2026 Ford F-150 Regular Cab
  {
    slug: 'f150-regular-cab-xl',
    name: 'Truck',
    bodyStyle: 'Truck',
    image: truckRaptorImg, // Assuming variable name follows previous convention
    description: 'The quintessential workhorse. Featuring a massive 8-foot bed, a fuel-efficient 2.7L EcoBoost V6, and advanced towing tech, it’s built for those who value utility and reliability.',
    startingPrice: 676.80, // Adjusted based on typical XL trim + delivery
    vehicleName: 'Ford F-150 Regular Cab XL',
    fuelTypes: ['gasoline'],
    drivetrain: ['RWD'],
    passengerCapacity: 3,
    cargoSpace: 'extra-large',
    fuelEconomy: { city: 19, hwy: 25, avg: 21, range: 756 },
    performance: {
      hp: 325,
      torque: 400,
      engine: '2.7L EcoBoost V6',
      transmission: '10-Speed Automatic',
      drivetrain: 'Rear-Wheel Drive',
      zeroToSixty: '6.0 sec' // Estimated for 2.7L RWD configuration
    },
    specs: {
      exterior: { length: '227.7″', height: '75.2″', weight: '4,396 lbs', wheels: '17" Steel' },
      interior: { headroom: '40.8″', legroom: '43.9″', cargo: '8\' 2" Bed', passengers: 3 },
      warranty: { comprehensive: '3 years / 36k miles', powertrain: '5 years / 60k miles', roadside: '5 years / 60k miles' }
    },
    featureGroups: [
      { category: "Utility", items: ["8' 2\" Long Bed", "7,400 lbs Towing", "1,775 lbs Payload"] },
      { category: "Technology", items: ["12\" Touchscreen", "Apple CarPlay / Android Auto", "5G Wi-Fi Hotspot"] },
      { category: "Safety", items: ["Pre-Collision Assist", "BLIS (Blind Spot Info)", "Lane-Keeping System"] }
    ],
    highlights: ['8.2-Foot Cargo Bed', '325 HP Twin-Turbo V6', '12-inch SYNC 4 Display'],
    popularBrands: ['Ford', 'Chevrolet', 'Ram'],
    metaTitle: '2026 Ford F-150 Regular Cab XL Leasing',
    metaDescription: 'Lease the ultimate long-bed work truck with 325 HP and 7,400 lbs towing capacity.',
    idealFor: [
      'Fleet operators and tradespeople needing maximum bed length',
      'Solo contractors looking for a high-tech but rugged workhorse',
      'Drivers prioritizing utility and towing over passenger count'
    ],
    features: [
      '2.7L EcoBoost V6 Engine',
      'Class IV Trailer Hitch',
      '12-inch Digital Instrument Cluster',
      'Automatic Emergency Braking',
      'Active Grille Shutters'
    ],
  },


  // HATCHBACK - 2026 Audi S5 Sportback
  {
    slug: 'hatchback',
    name: 'Hatchback',
    bodyStyle: 'hatchback',
    image: hatchbackAudiImg,
    description: 'The all-new 2026 S5 Sportback merges executive luxury with blistering performance. Redesigned with a 362 HP V6 and a sophisticated "panoramic stage" digital interior, it remains the ultimate versatile sport sedan.',
    startingPrice: 1141.96, // Includes $1,295 destination charge
    vehicleName: 'Audi S5 Sportback Premium quattro',
    fuelTypes: ['premium unleaded'],
    drivetrain: ['AWD'],
    passengerCapacity: 5,
    cargoSpace: 'medium',
    fuelEconomy: { city: 20, hwy: 29, avg: 23, range: 352 },
    performance: {
      hp: 362,
      torque: 406,
      engine: '3.0L TFSI Turbo V6',
      transmission: '7-Speed S tronic Dual-Clutch',
      drivetrain: 'quattro® All-Wheel Drive',
      zeroToSixty: '4.3 sec'
    },
    specs: {
      exterior: { length: '187.2″', height: '54.5″', weight: '3,924 lbs', wheels: '19" 5-Double-V-Spoke' },
      interior: { headroom: '37.7″', legroom: '41.3″', cargo: '21.8 cu. ft.', passengers: 5 },
      warranty: { comprehensive: '4 years / 50k miles', powertrain: '4 years / 50k miles', roadside: '4 years / unlimited miles' }
    },
    featureGroups: [
      { category: "Performance", items: ["quattro® AWD", "S Sport Suspension", "Red Brake Calipers"] },
      { category: "Tech", items: ["14.5-inch MMI Touchscreen", "11.9-inch Virtual Cockpit", "Adaptive Cruise Assist"] },
      { category: "Luxury", items: ["Panoramic Glass Roof", "Heated Steering Wheel", "Diamond-Stitched Sport Seats"] }
    ],
    highlights: ['362 HP Turbo V6', '4.3s 0-60 MPH', 'quattro® AWD System'],
    popularBrands: ['Volkswagen', 'Audi', 'BMW', 'Mercedes-Benz', 'Lexus', 'Toyota', 'Honda'],
    metaTitle: '2026 Audi S5 Sportback Leasing',
    metaDescription: 'Lease the redesigned 2026 Audi S5 Sportback with 362 HP and quattro AWD.',
    idealFor: [
      'Executives who demand performance without sacrificing 4-door utility',
      'Tech-forward drivers looking for the latest "Digital Stage" interior',
      'Driving enthusiasts needing year-round capability via quattro AWD'
    ],
    features: [
      '3.0L TFSI® V6 Engine with 362 HP',
      '14.5-inch MMI® center touch display',
      'Adaptive Cruise Control with Traffic Jam Assist',
      'Power Liftgate for hatchback utility',
      'Panoramic Roof with variable light control'
    ],
  },

  // SUV - 2026 Mercedes-AMG GLA 35 4MATIC SUV
  {
    slug: 'suv',
    name: 'SUV',
    bodyStyle: 'SUV',
    image: suvToyotaImg, // Update this reference to your AMG GLA image asset
    isLuxury: true,
    vehicleName: 'Mercedes-AMG GLA 35 4MATIC SUV',
    badge: 'Best Seller',
    description: 'The AMG GLA 35 balances compact versatility with high-performance engineering, featuring a 302-hp turbocharged engine and agile 4MATIC All-Wheel Drive.',
    startingPrice: 842.11,
    fuelTypes: ['gasoline'],
    drivetrain: ['AWD'],
    passengerCapacity: 5,
    cargoSpace: 'large',
    fuelEconomy: { city: 22, hwy: 30, avg: 25, range: 338 },
    performance: {
      hp: 302,
      torque: 295,
      engine: '2.0L Turbo 4-Cylinder Mild Hybrid',
      transmission: '8-Speed Dual Clutch Sequential (DCT)',
      drivetrain: '4MATIC® All-Wheel Drive',
      zeroToSixty: '5.1 sec'
    },
    specs: {
      exterior: { length: '174.6″', height: '62.5″', weight: '3,869 lbs', wheels: '19" AMG 10-Spoke' },
      interior: { headroom: '39.0″', legroom: '41.0″', cargo: '50.5 cu. ft.', passengers: 5 },
      warranty: { comprehensive: '4 years / 50k miles', powertrain: '4 years / 50k miles', roadside: '4 years / 50k miles' }
    },
    featureGroups: [
      { category: "Performance", items: ["AMG Sport Suspension", "Sport Exhaust System", "4MATIC AWD with Descent Control"] },
      { category: "Luxury", items: ["Panoramic Glass Roof", "64-Color Ambient Lighting", "Burmester® Surround Sound"] },
      { category: "Technology", items: ["MBUX with AI Voice Control", "10.25-inch Digital Cluster", "Wireless Charging"] }
    ],
    highlights: ['302 HP AMG Engine', '0-60 in 5.1 Seconds', 'MBUX Infotainment System'],
    popularBrands: ['Range Rover', 'BMW', 'Mercedes', 'Lexus', 'Acura', 'Infinity', 'Cadillac', 'GMC', 'Jaguar', 'Maserati', 'Alfa Romeo', 'Mazda'],
    metaTitle: '2026 AMG GLA 35 4MATIC SUV Leasing',
    metaDescription: 'Experience performance and luxury with the 2026 AMG GLA 35 SUV.',
    idealFor: [
      'Driving enthusiasts needing a compact yet powerful SUV',
      'Urban professionals looking for a stylish, high-performance daily driver',
      'Small families who value advanced safety and sporty dynamics'
    ],
    features: [
      'AMG Sport Exhaust with driver-controlled valve flaps',
      'Burmester® Surround Sound System with 12 speakers',
      'Panoramic Electric Glass Moonroof',
      'Heated and Ventilated Front Sports Seats with 14-way adjustment',
      'Active Brake Assist and Blind Spot Assist for maximum safety'
    ],
  },

  // MINIVAN - 2026 Honda Odyssey EX-L
  {
    slug: 'minivan',
    name: 'minivan',
    bodyStyle: 'Minivan',
    vehicleName: 'Honda Odyssey EX-L',
    image: minivanOdysseyImg,
    isLuxury: false,
    badge: 'Family Choice',
    description: 'The 2026 Odyssey EX-L balances premium comfort with legendary utility. Featuring a refreshed 9-inch touchscreen and wireless smartphone integration, it remains the ultimate tool for busy families.',
    startingPrice: 626.86,
    fuelTypes: ['gasoline'],
    drivetrain: ['FWD'],
    passengerCapacity: 8,
    cargoSpace: 'large',
    fuelEconomy: { city: 19, hwy: 28, avg: 22, range: 430 },
    performance: {
      hp: 280,
      torque: 262,
      engine: '3.5L i-VTEC V6',
      transmission: '10-Speed Automatic',
      drivetrain: 'Front-Wheel Drive',
      zeroToSixty: '6.4 sec'
    },
    specs: {
      exterior: { length: '205.2″', height: '69.6″', weight: '4,526 lbs', wheels: '18" Machined Alloy' },
      interior: { headroom: '38.7″', legroom: '40.9″', cargo: '155.8 cu. ft.', passengers: 8 },
      warranty: { comprehensive: '3 years / 36k miles', powertrain: '5 years / 60k miles', roadside: '3 years / 36k miles' }
    },
    featureGroups: [
      { category: "Interior", items: ["Leather-Trimmed Seats", "Magic Slide® 2nd-Row", "Tri-Zone Climate"] },
      { category: "Technology", items: ["9-inch Color Touchscreen", "Wireless Apple CarPlay", "CabinTalk® Intercom"] },
      { category: "Safety", items: ["Honda Sensing® Suite", "Blind Spot Information", "Rear Seat Reminder"] }
    ],
    highlights: ['8-Passenger Leather Interior', 'Magic Slide® 2nd-Row Seats', 'Wireless Phone Charger'],
    popularBrands: ['Honda', 'Toyota', 'Chrysler', 'RAM'],
    metaTitle: '2026 Honda Odyssey EX-L Leasing',
    metaDescription: 'Lease the 2026 Honda Odyssey EX-L. The most reliable 8-passenger family van.',
    idealFor: [
      'Large families requiring flexible 8-passenger seating',
      'Daily carpoolers who prioritize ease of entry and exit',
      'Road trippers looking for a quiet V6 engine and high safety ratings'
    ],
    features: [
      'Magic Slide® 2nd-Row Seats with Walk-in Feature',
      'Power Tailgate with Programmable Height',
      'Smart Entry with Walk Away Auto Lock®',
      'Heated Front Seats with 12-Way Power Driver Adjustment',
      'One-Touch Power Moonroof with Tilt'
    ],
  },

  // WAGON - 2026 BMW 5 Series Touring (G61)
  {
    slug: 'wagon',
    name: 'Wagon',
    bodyStyle: 'Wagon',
    image: wagonBmwImg,
    vehicleName: 'BMW M5 Touring',
    description: 'The return of the long-roof legend. The 2026 M5 Touring combines a monstrous 717-hp electrified V8 with high-end executive luxury and enough cargo space for a cross-country sprint.',
    startingPrice: 2174.41,
    fuelTypes: ['gasoline', 'plug-in hybrid'],
    drivetrain: ['AWD'],
    passengerCapacity: 5,
    cargoSpace: 'large',
    fuelEconomy: { city: 52, hwy: 57, avg: 54, range: 450 }, // MPGe based on hybrid operation
    performance: {
      hp: 717,
      torque: 738,
      engine: '4.4L Twin-Turbo V8 Plug-in Hybrid',
      transmission: '8-Speed M Steptronic',
      drivetrain: 'M xDrive All-Wheel Drive',
      zeroToSixty: '3.5 sec'
    },
    specs: {
      exterior: { length: '200.6″', height: '59.7″', weight: '5,530 lbs', wheels: '20"/21" M Double-Spoke' },
      interior: { headroom: '40.7″', legroom: '41.3″', cargo: '16.5 - 57.6 cu. ft.', passengers: 5 },
      warranty: { comprehensive: '4 years / 50k miles', powertrain: '4 years / 50k miles', roadside: '4 years / Unlimited' }
    },
    featureGroups: [
      { category: "Performance", items: ["Adaptive M Suspension", "M Compound Brakes", "Active M Differential"] },
      { category: "Tech", items: ["BMW Curved Display", "Operating System 8.5", "Charging Rate up to 11kW"] },
      { category: "Luxury", items: ["Bowers & Wilkins Surround Sound", "Panoramic Sky Lounge", "M Multifunction Seats"] }
    ],
    highlights: ['717 HP Hybrid V8', '3.5s 0-60 MPH', 'M xDrive AWD System'],
    popularBrands: ['BMW M', 'Audi RS', 'Mercedes-AMG'],
    metaTitle: '2026 BMW M5 Touring Leasing',
    metaDescription: 'Lease the ultra-high-performance 2026 BMW M5 Touring wagon.',
    idealFor: [
      'Performance purists who refuse to sacrifice family utility',
      'Tech-savvy drivers wanting high-performance electrification',
      'Collectors seeking the first M5 wagon ever offered in the U.S.'
    ],
    features: [
      'M Hybrid Power Unit with 717 HP',
      'Adaptive M Suspension with electronically controlled dampers',
      '14.9-inch BMW Curved Display with M-specific graphics',
      'Bowers & Wilkins 18-speaker Surround Sound System',
      'Carbon Fiber Interior Trim and M Leather Steering Wheel'
    ],
  },

  // CROSSOVER - 2026 Lexus GX 550 Premium
  {
    slug: 'crossover',
    name: 'Crossover',
    bodyStyle: 'SUV',
    vehicleName: 'Lexus GX 550 Premium',
    image: cuvImg, // Update this reference to your Lexus GX image asset
    isLuxury: true,
    badge: 'Adventure Luxury',
    description: 'A rugged icon reborn. The 2026 GX 550 Premium combines a potent 349-hp twin-turbo V6 with a sophisticated 14-inch touchscreen and legendary body-on-frame capability.',
    startingPrice: 940.72,
    fuelTypes: ['gasoline'],
    drivetrain: ['4WD'],
    passengerCapacity: 7,
    cargoSpace: 'medium',
    fuelEconomy: { city: 15, hwy: 21, avg: 17, range: 357 },
    performance: {
      hp: 349,
      torque: 479,
      engine: '3.4L Twin-Turbo V6',
      transmission: '10-Speed Automatic',
      drivetrain: 'Full-Time 4WD',
      zeroToSixty: '6.5 sec'
    },
    specs: {
      exterior: { length: '197.0″', height: '75.6″', weight: '5,585 lbs', wheels: '20" Alloy' },
      interior: { headroom: '39.4″', legroom: '41.2″', cargo: '76.9 cu. ft. (Max)', passengers: 7 },
      warranty: { comprehensive: '4 years / 50k miles', powertrain: '6 years / 70k miles', roadside: '4 years / Unlimited' }
    },
    featureGroups: [
      { category: "Off-Road", items: ["Full-Time 4WD", "Torsen® Center Diff", "8,000 lbs Towing"] },
      { category: "Luxury", items: ["NuLuxe® Trim", "Heated/Ventilated Seats", "Ambient Lighting"] },
      { category: "Tech", items: ["14.0-inch Display", "Wireless Apple CarPlay", "Lexus Safety System+ 3.0"] }
    ],
    highlights: ['349 HP Twin-Turbo V6', 'Full-Time 4WD System', '14-inch Touchscreen'],
    popularBrands: ['Lexus', 'BMW', 'Audi', 'Volvo'],
    metaTitle: '2026 Lexus GX 550 Premium Leasing',
    metaDescription: 'Lease the all-new 2026 Lexus GX 550. Unmatched luxury meets off-road dominance.',
    idealFor: [
      'Outdoor enthusiasts requiring high-capacity towing and 4WD',
      'Families looking for a safe, 3-row luxury SUV with a commanding view',
      'Luxury buyers wanting a "go-anywhere" vehicle with refined road manners'
    ],
    features: [
      'Lexus Interface with 14.0-inch Touchscreen Display',
      'Heated and Ventilated 8-Way Power Front Seats',
      'Full-Time 4WD with Torsen® Limited-Slip Center Differential',
      'Lexus Safety System+ 3.0 with Pedestrian Detection',
      'Power Tilt-and-Slide Moonroof with Roof Rails'
    ],
  },
  // PERFORMANCE COUPE - 2026 Porsche 911 Carrera (992.2)
  {
    slug: '911-gts-hybrid-cabriolet',
    name: 'Hybrid Convertible',
    bodyStyle: 'Convertible',
    image: porscheImg,
    isLuxury: true,
    vehicleName: 'Porsche 911 Carrera GTS Cabriolet',
    badge: 'T-Hybrid',
    description: 'The first-ever electrified 911. The GTS T-Hybrid utilizes a motorsport-derived 3.6L flat-six and an electric exhaust gas turbocharger to eliminate lag and provide instantaneous torque.',
    startingPrice: 3449.57,
    fuelTypes: ['gasoline', 'hybrid'],
    drivetrain: ['RWD'],
    passengerCapacity: 4,
    cargoSpace: 'small',
    fuelEconomy: { city: 17, hwy: 23, avg: 19, range: 315 },
    performance: {
      hp: 532,
      torque: 449,
      engine: '3.6L T-Hybrid Flat-6',
      transmission: '8-Speed PDK Dual-Clutch',
      drivetrain: 'Rear-Wheel Drive',
      zeroToSixty: '3.0 sec'
    },
    specs: {
      exterior: { length: '179.3″', height: '50.9″', weight: '3,724 lbs', wheels: '20" Front / 21" Rear GTS Center-Lock' },
      interior: { headroom: '38.0″', legroom: '41.6″', cargo: '4.8 cu. ft. (Frunk)', passengers: 4 },
      warranty: { comprehensive: '4 years / 50k miles', powertrain: '4 years / 50k miles', roadside: '4 years / 50k miles' }
    },
    featureGroups: [
      { category: "T-Hybrid Tech", items: ["Electric Turbocharger", "400V High-Voltage System", "Energy Recuperation"] },
      { category: "Chassis", items: ["Rear-Axle Steering", "PASM Sport Suspension", "Sport Chrono Package"] },
      { category: "Digital", items: ["12.6-inch Curved Display", "Apple CarPlay® Integration", "Matrix LED Headlights"] }
    ],
    highlights: ['3.0s 0-60 mph', 'Electrified Turbocharger', 'Standard Rear-Axle Steering'],
    popularBrands: ['Porsche', 'BMW', 'Mercedes-Benz', 'Corvette'],
    metaTitle: '2026 Porsche 911 Carrera GTS Hybrid Leasing',
    metaDescription: 'Lease the new 532-hp 2026 Porsche 911 Carrera GTS with T-Hybrid technology.',
    idealFor: [
      'Tech-forward enthusiasts wanting the latest in hybrid performance',
      'Drivers looking for supercar-rivaling acceleration in a convertible',
      'Porsche purists who want the most powerful GTS ever produced'
    ],
    features: [
      'T-Hybrid Powertrain with Integrated Starter Generator',
      'Electric exhaust gas turbocharger for instant response',
      'Standard Rear-Axle Steering for enhanced agility',
      'Fully Digital 12.6-inch Curved Instrument Cluster',
      'Sport Exhaust System with high-gloss black tailpipes'
    ],
  },


];
export const getVehicleTypeBySlug = (slug: string): VehicleTypeData | undefined => {
  return vehicleTypes.find((v) => v.slug === slug);
};
