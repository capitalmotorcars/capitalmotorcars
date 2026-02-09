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
import convertibleImg from '@/assets/corvette.png';
export type FuelType = 'gasoline' | 'diesel' | 'hybrid' | 'electric';
export type Drivetrain = 'FWD' | 'RWD' | 'AWD' | '4x4';

export interface VehicleTypeData {
  slug: string;
  name: string;
  bodyStyle: string;
  image: string;
  description: string;
  highlights: string[];
  idealFor: string[];
  popularBrands: string[];
  features: string[];
  badge?: 'Popular' | 'New' | 'Best Seller' | 'Eco Friendly';
  ctaText?: string;
  startingPrice?: number;
  fuelTypes: FuelType[];
  drivetrain: Drivetrain[];
  passengerCapacity: number;
  cargoSpace: 'small' | 'medium' | 'large';
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
    slug: 'electric',
    name: 'Electric SUV',
    bodyStyle: 'electric SUV',
    image: cayenneElectricImg,
    badge: 'Eco Friendly',
    description: 'The first-ever all-electric Cayenne. 800V architecture allows for 400kW fast charging—10% to 80% in just 16 minutes.',
    startingPrice: 109000,

    range: '300+',
    mpge: '95+',
    fuelTypes: ['electric'],
    drivetrain: ['AWD'],
    passengerCapacity: 5,
    cargoSpace: 'large',
    performance: {
      hp: 435,
      torque: 615,
      engine: 'Dual-Motor PSM',
      transmission: 'Single-Speed Automatic',
      drivetrain: 'Porsche e-AWD',
      zeroToSixty: '4.5 sec'
    },
    specs: {
      exterior: { length: '194.2″', height: '66.1″', weight: '5,100 lbs', wheels: '21" Aero Design' },
      interior: { headroom: '39.6″', legroom: '41.2″', cargo: '27.2 cu. ft.', passengers: 5 },
      warranty: { comprehensive: '4 years / 50k miles', powertrain: '8 years / 100k miles (Battery)', roadside: '4 years / 50k miles' }
    },
    featureGroups: [
      { category: "EV Tech", items: ["400kW DC Fast Charging", "800V Architecture", "Regenerative Braking"] },
      { category: "Performance", items: ["Adaptive Air Suspension", "PASM", "Porsche Active Ride"] }
    ],
    highlights: ['400kW Fast Charging', '800V Architecture', 'Adaptive Air Suspension'],
    popularBrands: ['Porsche', 'Lucid', 'Rivian'],
    metaTitle: '2026 Porsche Cayenne Electric Leasing',
    metaDescription: 'Lease the groundbreaking 435hp all-electric Cayenne SUV.',
    idealFor: [
      'High-net-worth professionals seeking a daily-drivable luxury SUV',
      'Small families looking for a comfortable, family-friendly SUV',
      'Weekend adventurers who value a quiet, refined driving experience'
    ],
    features: [
      '400kW DC Fast Charging for fast charging',
      '800V Architecture for high-speed charging',
      'Regenerative Braking for energy recovery'
    ],
  },


  // HYPERCAR - 2026 Chevrolet Corvette ZR1
  {
    slug: 'corvette',
    name: 'American Hypercar Coupe',
    bodyStyle: 'Coupe',
    image: convertibleImg,
    isLuxury: true,
    badge: 'New',
    description: 'The most powerful production V8 ever from an American automaker. The ZR1 utilizes the LT7 twin-turbo engine to deliver hypercar performance at a supercar price.',
    startingPrice: 204495,
    fuelTypes: ['gasoline'],
    drivetrain: ['RWD'],
    passengerCapacity: 2,
    cargoSpace: 'small',
    fuelEconomy: { city: 12, hwy: 18, avg: 14, range: 250 },
    performance: {
      hp: 1064,
      torque: 828,
      engine: '5.5L LT7 Twin-Turbo V8 (Flat-Plane Crank)',
      transmission: '8-Speed Dual-Clutch',
      drivetrain: 'Rear-Wheel Drive',
      zeroToSixty: '2.3 sec'
    },
    specs: {
      exterior: { length: '186.7″', height: '48.6″', weight: '3,670 lbs', wheels: '20" Front / 21" Rear Carbon Fiber' },
      interior: { headroom: '37.9″', legroom: '42.8″', cargo: '9.1 cu. ft.', passengers: 2 },
      warranty: { comprehensive: '3 years / 36k miles', powertrain: '5 years / 60k miles', roadside: '5 years / 60k miles' }
    },
    featureGroups: [
      { category: "Aero & Cooling", items: ["Flow-Through Hood", "Carbon Fiber Aero Package", "Magnetic Ride 4.0"] },
      { category: "Track Tech", items: ["Performance Data Recorder", "Carbon Ceramic Brakes", "ZTK Track Pack Available"] }
    ],
    highlights: ['1,064 HP LT7 V8', '2.3s 0-60 mph', 'Carbon Fiber Aero'],
    popularBrands: ['Chevrolet'],
    metaTitle: '2026 Corvette ZR1 Leasing & Specs',
    metaDescription: 'Lease the 1,064 horsepower 2026 Corvette ZR1.',
    idealFor: [
      'Collectors of rare, high-performance machinery',
      'Adrenaline junkies wanting 1,000+ HP out of the box',
      'Track-day regulars needing advanced aero and downforce'
    ],
    features: [
      'LT7 Twin-Turbo V8 with Flat-Plane Crankshaft',
      'Flow-Through Carbon Fiber Hood for Downforce',
      'Performance Data Recorder (PDR) with 1080p Camera',
      'Brembo Carbon Ceramic Braking System',
      'Magnetic Selective Ride Control 4.0'
    ],
  },
  {
    slug: 'sedan-mercedes-e350',
    name: 'Sedan',
    bodyStyle: 'Sedan',
    isLuxury: true,
    image: sedanMercedesImg,
    description: 'The benchmark of luxury. The 2026 E 350 features the MBUX Superscreen and a 48V mild-hybrid system for seamless power delivery.',
    startingPrice: 62300,
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
    popularBrands: ['Mercedes-Benz', 'BMW', 'Audi'],
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
  // COUPE - 2026 BMW 430i Coupe
  {
    slug: 'coupe',
    name: 'Coupe',
    bodyStyle: 'Coupe',
    isLuxury: true,
    image: coupeCoupeImg,
    badge: 'Popular',
    description: 'The 4 Series Coupe defines the modern sports car with a 48V mild-hybrid system and a near-perfect 50/50 weight distribution.',
    startingPrice: 50700,
    fuelTypes: ['gasoline'],
    drivetrain: ['RWD', 'AWD'],
    passengerCapacity: 4,
    cargoSpace: 'small',
    fuelEconomy: { city: 28, hwy: 36, avg: 31, range: 480 },
    performance: {
      hp: 255,
      torque: 295,
      engine: '2.0L TwinPower Turbo I-4',
      transmission: '8-Speed Sport Automatic',
      drivetrain: 'Rear-Wheel Drive',
      zeroToSixty: '5.5 sec'
    },
    specs: {
      exterior: { length: '187.9″', height: '54.6″', weight: '3,578 lbs', wheels: '18" V-Spoke Bicolor' },
      interior: { headroom: '38.0″', legroom: '41.8″', cargo: '12.0 cu. ft.', passengers: 4 },
      warranty: { comprehensive: '4 years / 50k miles', powertrain: '4 years / 50k miles', roadside: '4 years / Unlimited' }
    },
    featureGroups: [
      { category: "Performance", items: ["Variable Sport Steering", "M Sport Suspension", "Launch Control"] },
      { category: "Tech", items: ["iDrive 8.5", "Curved Display", "Wireless Apple CarPlay"] }
    ],
    highlights: ['48V Mild Hybrid', 'iDrive 8.5 Curved Display', '50/50 Weight Distribution'],
    popularBrands: ['BMW', 'Audi', 'Mercedes-Benz', 'Lexus'],
    metaTitle: '2026 BMW 4 Series Coupe Leasing',
    metaDescription: 'Lease the athletic and stylish 2026 BMW 4 Series Coupe.',
    idealFor: [
      'Young professionals wanting a sporty daily driver',
      'Weekend track enthusiasts who value driving dynamics',
      'Drivers who love a unique, aggressive engine note'
    ],
    features: [
      'Variable Sport Steering for improved handling',
      'M Sport Suspension for improved ride quality',
      'Launch Control for improved acceleration',
      'iDrive 8.5 for improved navigation',
      'Curved Display for improved visibility',
      'Wireless Apple CarPlay for improved connectivity'
    ],
  },

  // 3. PERFORMANCE SEDAN - 2026 Audi RS 3
  {
    slug: 'sedan-audi-rs3',
    name: 'Electric',
    bodyStyle: 'Sedan',
    image: sedanAudiImg,
    isLuxury: true,
    description: 'The legendary 5-cylinder engine returns with a unique 1-2-4-5-3 firing order and the drift-capable RS Torque Splitter.',
    startingPrice: 799,
    fuelTypes: ['gasoline'],
    drivetrain: ['AWD'],
    passengerCapacity: 5,
    cargoSpace: 'small',
    fuelEconomy: { city: 20, hwy: 29, avg: 23, range: 330 },
    performance: {
      hp: 394,
      torque: 369,
      engine: '2.5L Turbo 5-Cylinder',
      transmission: '7-Speed S tronic Dual-Clutch',
      drivetrain: 'quattro with Torque Splitter',
      zeroToSixty: '3.6 sec'
    },
    specs: {
      exterior: { length: '178.5″', height: '54.8″', weight: '3,627 lbs', wheels: '19" RS Design' },
      interior: { headroom: '36.8″', legroom: '41.2″', cargo: '8.3 cu. ft.', passengers: 5 },
      warranty: { comprehensive: '4 years / 50k miles', powertrain: '4 years / 50k miles', roadside: '4 years / Unlimited' }
    },
    featureGroups: [
      { category: "Performance", items: ["RS Torque Splitter", "Launch Control", "Sport Exhaust"] },
      { category: "Interior", items: ["Nappa Leather RS Seats", "Sonos 3D Sound", "Virtual Cockpit Plus"] }
    ],
    highlights: ['394 HP 5-Cylinder', 'RS Torque Rear Mode', 'Matrix LED Headlights'],
    popularBrands: ['Audi Sport', 'Mercedes-AMG', 'BMW M'],
    metaTitle: '2026 Audi RS 3 Quattro Leasing',
    metaDescription: 'Lease the most aggressive sport sedan in its class.',
    idealFor: [
      'Young professionals wanting a "Wolf in Sheep\'s Clothing"',
      'AWD enthusiasts in snow-prone climates',
      'Drivers who love a unique, aggressive engine note'
    ],
    features: [
      'RS Torque Splitter (Rear-biased drift capability)',
      'Sonos 3D Premium Sound System (15 Speakers)',
      'Nappa Leather RS Honeycomb-Stitched Seats',
      'Virtual Cockpit with "RS Runway" tachometer',
      'RS Sport Exhaust System with Black Tips'
    ],
  },
  // 2. SEDAN - 2026 BMW 840i Gran Coupe
  {
    slug: 'sedan',
    name: 'Hybrid',
    bodyStyle: 'Sedan',
    image: sedanBmwImg,
    isLuxury: true,
    description: 'A masterpiece of BMW engineering. The 840i combines the elegance of a coupe with the 4-door practicality of a flagship sedan.',
    startingPrice: 909,
    fuelTypes: ['gasoline'],
    drivetrain: ['RWD', 'AWD'],
    passengerCapacity: 5,
    cargoSpace: 'medium',
    fuelEconomy: { city: 21, hwy: 29, avg: 24, range: 450 },
    performance: {
      hp: 335,
      torque: 368,
      engine: '3.0L TwinPower Turbo I-6',
      transmission: '8-Speed Steptronic Sport',
      drivetrain: 'Rear-Wheel Drive',
      zeroToSixty: '4.7 sec'
    },
    specs: {
      exterior: { length: '200.0″', height: '55.0″', weight: '4,262 lbs', wheels: '19" M Dual-Spoke' },
      interior: { headroom: '39.1″', legroom: '36.6″', cargo: '15.5 cu. ft.', passengers: 5 },
      warranty: { comprehensive: '4 years / 50k miles', powertrain: '4 years / 50k miles', roadside: '4 years / Unlimited' }
    },
    featureGroups: [
      { category: "Luxury", items: ["Merino Leather", "Panoramic Moonroof", "Harman Kardon Audio"] },
      { category: "Technology", items: ["Live Cockpit Pro", "Head-up Display", "iDrive 8.5"] }
    ],
    highlights: ['TwinPower Turbo I-6', 'Harman Kardon Sound', 'M Sport Package Standard'],
    popularBrands: ['BMW', 'Mercedes-Benz', 'Audi'],
    metaTitle: 'BMW 8 Series Gran Coupe Leasing',
    metaDescription: 'Experience luxury performance in the 2026 BMW 840i.',
    idealFor: [
      'High-net-worth professionals seeking a daily-drivable luxury grand tourer',
      'Weekend track enthusiasts who value balanced performance',
      'Tech-forward drivers who want advanced AI-assisted features'
    ],
    features: [
      'Merino Leather with Black Contrast Stitching',
      'Panoramic Moonroof with Automatic Blind Spot Detection',
      'Harman Kardon Audio System with 16 Speakers',
      'Live Cockpit Pro with Head-up Display',
      'iDrive 8.5 with Touchscreen and Natural Voice Control'
    ],
  },
  // 4. TRUCK - 2026 Ford Ranger Raptor
  {
    slug: 'truck',
    name: 'Truck',
    bodyStyle: 'Truck',
    image: truckRaptorImg,
    description: 'Built for high-speed desert running. Features FOX Live Valve Shocks and a Baja driving mode for extreme terrain.',
    startingPrice: 56990,
    fuelTypes: ['gasoline'],
    drivetrain: ['4x4'],
    passengerCapacity: 5,
    cargoSpace: 'large',
    fuelEconomy: { city: 16, hwy: 18, avg: 17, range: 345 },
    performance: {
      hp: 405,
      torque: 430,
      engine: '3.0L EcoBoost V6',
      transmission: '10-Speed Automatic',
      drivetrain: 'Advanced 4WD with Lockers',
      zeroToSixty: '5.8 sec'
    },
    specs: {
      exterior: { length: '210.9″', height: '75.9″', weight: '5,363 lbs', wheels: '17" Beadlock-Capable' },
      interior: { headroom: '41.0″', legroom: '43.7″', cargo: '5-Foot Bed', passengers: 5 },
      warranty: { comprehensive: '3 years / 36k miles', powertrain: '5 years / 60k miles', roadside: '5 years / 60k miles' }
    },
    featureGroups: [
      { category: "Off-Road", items: ["FOX 2.5 Live Valve Shocks", "Front/Rear Lockers", "Baja Mode"] },
      { category: "Utility", items: ["5,510 lbs Towing", "Zone Lighting", "Pro Trailer Backup Assist"] }
    ],
    highlights: ['FOX Racing Shocks', 'Baja Driving Mode', '405 HP EcoBoost V6'],
    popularBrands: ['Ford Performance', 'RAM TRX', 'Chevrolet ZR2'],
    metaTitle: '2026 Ford Ranger Raptor Leasing',
    metaDescription: 'Lease the ultimate mid-size off-road performance truck.',
    idealFor: [
      'Adrenaline junkies seeking a daily-drivable off-road machine',
      'Outdoor enthusiasts who value a rugged, capable daily driver',
      'Small families looking for a versatile, family-friendly truck'
    ],
    features: [
      'FOX Racing Shocks with Live Valve Technology',
      'Baja Driving Mode for extreme terrain',
      '5,510 lbs Towing Capacity',
      'Pro Trailer Backup Assist',
      'Zone Lighting for improved visibility'
    ],
  },


  // HATCHBACK - 2026 Volkswagen Golf GTI
  {
    slug: 'hatchback',
    name: 'Hatchback',
    bodyStyle: 'sedan',
    image: hatchbackAudiImg,
    description: 'The "MotorTrend Car of the Year." The 2026 GTI remains the gold standard for driving fun combined with daily hatchback utility.',
    startingPrice: 349,
    fuelTypes: ['gasoline'],
    drivetrain: ['FWD'],
    passengerCapacity: 5,
    cargoSpace: 'medium',
    fuelEconomy: { city: 24, hwy: 32, avg: 27, range: 355 },
    performance: {
      hp: 241,
      torque: 273,
      engine: '2.0L Turbocharged I-4',
      transmission: '7-Speed DSG Dual-Clutch',
      drivetrain: 'Front-Wheel Drive',
      zeroToSixty: '6.0 sec'
    },
    specs: {
      exterior: { length: '168.8″', height: '57.7″', weight: '3,133 lbs', wheels: '18" Jerez Alloy' },
      interior: { headroom: '38.5″', legroom: '41.2″', cargo: '19.9 cu. ft.', passengers: 5 },
      warranty: { comprehensive: '4 years / 50k miles', powertrain: '4 years / 50k miles', roadside: '3 years / 36k miles' }
    },
    featureGroups: [
      { category: "Performance", items: ["VAQ Limited-Slip Differential", "DCC Adaptive Damping", "Sport Exhaust"] },
      { category: "Tech", items: ["12.9-inch Touchscreen", "Digital Cockpit Pro", "App-Connect"] }
    ],
    highlights: ['241 HP Turbo', '19.9 cu ft Cargo', 'IQ.DRIVE Suite'],
    popularBrands: ['Volkswagen', 'Honda', 'Mazda'],
    metaTitle: '2026 VW Golf GTI Leasing',
    metaDescription: 'Lease the iconic 2026 Golf GTI hot hatch.',
    idealFor: [
      'Driving purists seeking a daily-drivable hot hatch',
      'Young professionals wanting a fun, sporty daily driver',
      'Weekend track enthusiasts who value driving dynamics'
    ],
    features: [
      'VAQ Limited-Slip Differential for better cornering',
      'DCC Adaptive Damping for a comfortable ride',
      'Sport Exhaust System with Black Tips',
      '12.9-inch Touchscreen with Digital Cockpit Pro',
      'App-Connect for smartphone integration'
    ],
  },

  // SUV - 2026 Lexus RX 350
  {
    slug: 'suv',
    name: 'SUV',
    bodyStyle: 'SUV',
    image: suvToyotaImg,
    isLuxury: true,
    badge: 'Best Seller',
    description: 'The best-selling luxury SUV for a reason. Unmatched reliability meets a whisper-quiet cabin and refined turbocharged power.',
    startingPrice: 51175,
    fuelTypes: ['gasoline', 'hybrid'],
    drivetrain: ['AWD'],
    passengerCapacity: 5,
    cargoSpace: 'large',
    fuelEconomy: { city: 22, hwy: 29, avg: 25, range: 445 },
    performance: {
      hp: 275,
      torque: 317,
      engine: '2.4L Turbo I-4',
      transmission: '8-Speed Automatic',
      drivetrain: 'All-Wheel Drive',
      zeroToSixty: '7.2 sec'
    },
    specs: {
      exterior: { length: '192.5″', height: '67.3″', weight: '4,310 lbs', wheels: '19" 5-Spoke Alloy' },
      interior: { headroom: '39.5″', legroom: '41.1″', cargo: '46.2 cu. ft.', passengers: 5 },
      warranty: { comprehensive: '4 years / 50k miles', powertrain: '6 years / 70k miles', roadside: '4 years / Unlimited' }
    },
    featureGroups: [
      { category: "Luxury", items: ["NuLuxe® Trim", "Multi-zone Climate", "Ambient Lighting"] },
      { category: "Safety", items: ["Lexus Safety System+ 3.0", "Blind Spot Monitor", "Road Sign Assist"] }
    ],
    highlights: ['Lexus Safety System+ 3.0', 'Turbocharged Power', 'Mark Levinson Audio Avail.'],
    popularBrands: ['Lexus', 'BMW', 'Mercedes-Benz'],
    metaTitle: '2026 Lexus RX 350 Leasing',
    metaDescription: 'Lease the versatile and luxurious 2026 Lexus RX.',
    idealFor: [
      'High-net-worth professionals seeking a daily-drivable luxury SUV',
      'Small families looking for a comfortable, family-friendly SUV',
      'Weekend adventurers who value a quiet, refined driving experience'
    ],
    features: [
      'NuLuxe® Trim for a premium look and feel',
      'Multi-zone Climate Control for personalized comfort',
      'Ambient Lighting for a relaxing atmosphere',
      'Lexus Safety System+ 3.0 for advanced safety features',
      'Mark Levinson Audio Avail. for premium sound'
    ],
  },

  // MINIVAN - 2026 Honda Odyssey
  {
    slug: 'minivan',
    name: 'Minivan',
    bodyStyle: 'Minivan',
    image: minivanOdysseyImg,
    description: 'Still the ultimate family hauler. The 2026 Odyssey features the Magic Slide® second-row seats and a class-leading rear entertainment system.',
    startingPrice: 44290,
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
      zeroToSixty: '6.5 sec'
    },
    specs: {
      exterior: { length: '205.2″', height: '69.6″', weight: '4,500 lbs', wheels: '18" Machined Alloy' },
      interior: { headroom: '38.7″', legroom: '40.9″', cargo: '140.7 cu. ft.', passengers: 8 },
      warranty: { comprehensive: '3 years / 36k miles', powertrain: '5 years / 60k miles', roadside: '3 years / 36k miles' }
    },
    featureGroups: [
      { category: "Family Tech", items: ["12.8-inch Rear Screen", "CabinWatch®", "Magic Slide® Seats"] },
      { category: "Comfort", items: ["Tri-Zone Climate", "Leather Seats", "Power Tailgate"] }
    ],
    highlights: ['8-Passenger Seating', 'Magic Slide® Seats', 'V6 Performance'],
    popularBrands: ['Honda', 'Toyota', 'Chrysler'],
    metaTitle: '2026 Honda Odyssey Leasing',
    metaDescription: 'The perfect family van: Lease the 2026 Honda Odyssey.',
    idealFor: [
      'Small families looking for a comfortable, family-friendly minivan',
      'Weekend adventurers who value a quiet, refined driving experience',
      'Outdoor enthusiasts who value a rugged, capable daily driver'
    ],
    features: [
      'Magic Slide® Seats for easy access to the third row',
      '12.8-inch Rear Screen for rear-seat entertainment',
      'CabinWatch® for rear-seat monitoring',
      'Tri-Zone Climate Control for personalized comfort',
      'Leather Seats for a premium look and feel',
      'Power Tailgate for easy loading and unloading'
    ],
  },

  // WAGON - 2026 BMW 5 Series Touring (G61)
  {
    slug: 'wagon',
    name: 'Wagon',
    bodyStyle: 'Wagon',
    image: wagonBmwImg,
    description: 'The ultimate "do-everything" vehicle. The 5 Series Touring offers executive sedan comfort with a massive 1,700-liter cargo capacity.',
    startingPrice: 68500,
    fuelTypes: ['gasoline', 'hybrid'],
    drivetrain: ['AWD'],
    passengerCapacity: 5,
    cargoSpace: 'large',
    fuelEconomy: { city: 24, hwy: 31, avg: 27, range: 430 },
    performance: {
      hp: 255,
      torque: 295,
      engine: '2.0L Turbo I-4 w/ 48V Hybrid',
      transmission: '8-Speed Steptronic',
      drivetrain: 'xDrive All-Wheel Drive',
      zeroToSixty: '6.3 sec'
    },
    specs: {
      exterior: { length: '199.2″', height: '59.6″', weight: '4,100 lbs', wheels: '19" Aerodynamic Wheels' },
      interior: { headroom: '39.1″', legroom: '37.0″', cargo: '20.1 - 60.0 cu. ft.', passengers: 5 },
      warranty: { comprehensive: '4 years / 50k miles', powertrain: '4 years / 50k miles', roadside: '4 years / Unlimited' }
    },
    featureGroups: [
      { category: "Utility", items: ["40/20/40 Split Seats", "Power Tailgate", "Integrated Roof Rails"] },
      { category: "Luxury", items: ["Veganza Upholstery", "Harman Kardon Audio", "Interaction Bar"] }
    ],
    highlights: ['60 cu ft Max Cargo', 'xDrive All-Wheel Drive', 'Executive Comfort'],
    popularBrands: ['BMW', 'Audi', 'Volvo', 'Mercedes-Benz'],
    metaTitle: '2026 BMW 5 Series Touring Leasing',
    metaDescription: 'Luxury meets utility in the 2026 BMW 5 Series Wagon.',
    idealFor: [
      'High-net-worth professionals seeking a daily-drivable luxury wagon',
      'Small families looking for a comfortable, family-friendly wagon',
      'Weekend adventurers who value a quiet, refined driving experience'
    ],
    features: [
      '40/20/40 Split Seats for flexible seating',
      'Power Tailgate for easy loading and unloading',
      'Integrated Roof Rails for added cargo space',
      'Veganza Upholstery for a premium look and feel',
      'Harman Kardon Audio for premium sound',
      'Interaction Bar for rear-seat entertainment'
    ],
  },

  // CROSSOVER - 2026 Toyota Grand Highlander
  {
    slug: 'crossover',
    name: 'Crossover',
    bodyStyle: 'Crossover SUV',
    image: cuvImg,
    description: 'The definitive three-row crossover. The Grand Highlander provides adult-sized third-row seating and up to 97.5 cubic feet of cargo space.',
    startingPrice: 43300,
    fuelTypes: ['gasoline', 'hybrid'],
    drivetrain: ['FWD', 'AWD'],
    passengerCapacity: 8,
    cargoSpace: 'large',
    fuelEconomy: { city: 21, hwy: 28, avg: 24, range: 410 },
    performance: {
      hp: 265,
      torque: 310,
      engine: '2.4L Turbo 4-Cylinder',
      transmission: '8-Speed Automatic',
      drivetrain: 'All-Wheel Drive Available',
      zeroToSixty: '7.5 sec'
    },
    specs: {
      exterior: { length: '201.4″', height: '70.1″', weight: '4,290 lbs', wheels: '18" Silver Alloy' },
      interior: { headroom: '41.5″', legroom: '33.5″ (3rd Row)', cargo: '97.5 cu. ft. (Max)', passengers: 8 },
      warranty: { comprehensive: '3 years / 36k miles', powertrain: '5 years / 60k miles', roadside: '2 years / Unlimited' }
    },
    featureGroups: [
      { category: "Family", items: ["13 Cup Holders", "Toyota Safety Sense 3.0", "7 USB-C Ports"] },
      { category: "Tech", items: ["12.3-inch Multimedia", "Wireless Charging", "Digital Key"] }
    ],
    highlights: ['97.5 cu ft Max Cargo', 'Adult-Sized 3rd Row', 'Toyota Safety Sense 3.0'],
    popularBrands: ['Toyota', 'Honda', 'Lexus', 'Mazda'],
    metaTitle: '2026 Toyota Grand Highlander Leasing',
    metaDescription: 'Lease the spacious and safe 2026 Grand Highlander.',
    idealFor: [
      'High-net-worth professionals seeking a daily-drivable luxury crossover',
      'Small families looking for a comfortable, family-friendly crossover',
      'Weekend adventurers who value a quiet, refined driving experience'
    ],
    features: [
      '13 Cup Holders for added storage',
      'Toyota Safety Sense 3.0 for advanced safety features',
      '7 USB-C Ports for charging devices',
      '12.3-inch Multimedia for entertainment',
      'Wireless Charging for wireless device charging',
      'Digital Key for keyless entry and start'
    ],
  },
  // PERFORMANCE COUPE - 2026 Porsche 911 Carrera (992.2)
  {
    slug: 'sports',
    name: 'Sports Coupe',
    bodyStyle: 'Coupe',
    image: porscheImg,
    isLuxury: true,
    badge: 'New',
    description: 'The 992.2 evolution. Featuring a refined twin-turbo flat-six and a digital-first cockpit, the 2026 911 remains the gold standard for everyday performance.',
    startingPrice: 122300,
    fuelTypes: ['gasoline'],
    drivetrain: ['RWD'],
    passengerCapacity: 4, // 2+2 Seating
    cargoSpace: 'small',
    fuelEconomy: { city: 18, hwy: 24, avg: 20, range: 340 },
    performance: {
      hp: 388,
      torque: 331,
      engine: '3.0L Twin-Turbo Flat-6',
      transmission: '8-Speed PDK Dual-Clutch',
      drivetrain: 'Rear-Wheel Drive',
      zeroToSixty: '3.7 sec' // With Sport Chrono
    },
    specs: {
      exterior: { length: '178.8″', height: '51.3″', weight: '3,342 lbs', wheels: '19" Front / 20" Rear' },
      interior: { headroom: '38.4″', legroom: '41.6″', cargo: '4.7 cu. ft. (Frunk)', passengers: 4 },
      warranty: { comprehensive: '4 years / 50k miles', powertrain: '4 years / 50k miles', roadside: '4 years / 50k miles' }
    },
    featureGroups: [
      { category: "Driving Dynamics", items: ["PASM Sport Suspension", "Porsche Torque Vectoring Plus", "Wet Mode"] },
      { category: "Tech", items: ["12.6-inch Curved Display", "Porsche Communication Mgmt", "Dolby Atmos Audio"] }
    ],
    highlights: ['3.7s 0-60 mph', '12.6" Digital Cluster', 'Classic Rear-Engine Layout'],
    popularBrands: ['Porsche'],
    metaTitle: '2026 Porsche 911 Carrera Leasing',
    metaDescription: 'Lease the newly updated 2026 Porsche 911 Carrera.',
    idealFor: [
      'Driving purists seeking a daily-drivable supercar',
      'High-net-worth professionals celebrating a milestone',
      'Weekend track enthusiasts who value resale value'
    ],
    features: [
      '12.6-inch Curved Digital Instrument Cluster',
      'Porsche Communication Management (PCM) with Online Nav',
      'LED-Matrix Design Headlights with 4-Point DRL',
      'PASM Sport Suspension (10mm lower)',
      'Wet Mode Acoustic Sensors for stability'
    ],
  }



];
export const getVehicleTypeBySlug = (slug: string): VehicleTypeData | undefined => {
  return vehicleTypes.find((v) => v.slug === slug);
};
