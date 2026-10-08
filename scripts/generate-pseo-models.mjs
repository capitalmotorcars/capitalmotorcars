import fs from "fs";
import path from "path";

const models = [
  {
    fileName: "PorscheMacanLeasePage.tsx",
    componentName: "PorscheMacanLeasePage",
    make: "Porsche",
    model: "Macan",
    fullName: "Porsche Macan",
    slug: "porsche-macan-lease-nj",
    heroImage: "/model-images/porsche-macan.jpg",
    category: "Compact Luxury SUV",
    isEV: false,
    msrpStart: 62900,
    leaseStart: 799,
    leaseEnd: 1150,
    highlights: [
      "Macan Base: 261hp turbocharged inline-4 with standard Porsche Traction Management AWD",
      "Macan T: Touring trim featuring Porsche Active Suspension Management and Sport Chrono Package",
      "Macan S: 375hp twin-turbo V6 accelerating from 0 to 60 mph in just 4.6 seconds",
      "Macan GTS: 434hp twin-turbo V6 with sport exhaust and lowered adaptive air suspension",
      "Porsche Financial Services supports Macan leases with high 63% residual values at 36 months",
      "Class-leading sports car steering precision blended with compact luxury SUV versatility"
    ],
    whyLease: "The Porsche Macan delivers authentic sports car pedigree in a practical crossover body. For drivers in Bergen County, Essex County, and northern New Jersey, leasing a Macan through Capital Motor Cars unlocks wholesale fleet pricing that bypasses retail dealership showroom markups. High residual value retention from Porsche Financial Services ensures predictable monthly outlays, while full factory warranty coverage protects you throughout the 36-month lease term.",
    trims: [
      { name: "Macan Base", leasePrice: 799, keyFeatures: ["19-inch Macan wheels", "Porsche Communication Management with 10.9-inch display", "Wireless Apple CarPlay", "Lane Departure Warning", "Tri-zone automatic climate control"] },
      { name: "Macan T", leasePrice: 899, popular: true, keyFeatures: ["Sport Chrono Package", "Porsche Active Suspension Management", "20-inch Macan S wheels in Dark Titanium", "Sport heated steering wheel", "Agate Grey exterior accents"] },
      { name: "Macan S", leasePrice: 1049, keyFeatures: ["2.9-liter twin-turbo V6 (375 hp)", "Upgraded brakes with red calipers", "20-inch wheels", "Porsche Dynamic Light System", "Dual twin-tube sport tailpipes"] },
      { name: "Macan GTS", leasePrice: 1299, keyFeatures: ["434 hp twin-turbo V6", "Adaptive air suspension (10mm lower)", "Sport exhaust system in black", "GTS sport seats with 8-way power", "21-inch RS Spyder Design wheels"] }
    ],
    faqs: [
      { question: "What is the typical monthly payment for a Porsche Macan lease in NJ?", answer: "A Porsche Macan lease in New Jersey typically starts between $799 and $899 per month for a standard 36-month, 10,000-mile term on base and Macan T models. Macan S and GTS performance variants range from $1,049 to $1,299 per month depending on optional equipment and current Porsche Financial money factors." },
      { question: "How does Capital Motor Cars get lower Porsche Macan lease prices than franchise dealers?", answer: "Franchise Porsche centers frequently add substantial dealer documentation charges and mark up money factor finance rates. Capital Motor Cars sources allocations directly through regional dealer fleet departments, locking in true bank buy-rates and transparent zero-down structures." },
      { question: "What credit score is required to lease a Porsche Macan in New Jersey?", answer: "Porsche Financial Services reserves Tier 1 promotional lease programs for applicants with a FICO auto score of 720 or higher. Tier 2 programs remain available for scores between 680 and 719 with minor rate adjustments." },
      { question: "Can I lease a Porsche Macan with zero down payment in NJ?", answer: "Yes. Capital Motor Cars specializes in true $0 down leases where only first month payment, bank acquisition fee, and motor vehicle registration are due at signing. This prevents losing cash in the event of an early total-loss accident." }
    ],
    relatedComparisons: [
      { label: "BMW X3 vs Audi Q5 Comparison", path: "/comparisons/audi-q5-vs-bmw-x3-lease" },
      { label: "BMW X5 vs Mercedes GLE Comparison", path: "/comparisons/bmw-x5-vs-mercedes-gle-lease" }
    ],
    relatedBrandPage: { label: "All Porsche Lease Deals in NJ", path: "/brand/porsche" }
  },
  {
    fileName: "PorscheCayenneLeasePage.tsx",
    componentName: "PorscheCayenneLeasePage",
    make: "Porsche",
    model: "Cayenne",
    fullName: "Porsche Cayenne",
    slug: "porsche-cayenne-lease-nj",
    heroImage: "/model-images/porsche-cayenne.jpg",
    category: "Midsize Luxury SUV",
    isEV: false,
    msrpStart: 80800,
    leaseStart: 1049,
    leaseEnd: 1599,
    highlights: [
      "Cayenne Base: 348hp turbocharged 3.0L V6 with standard all-wheel drive and 8-speed Tiptronic S",
      "Cayenne E-Hybrid: 468hp combined output with plug-in efficiency and NJ EV sales tax advantages",
      "Cayenne S: 468hp twin-turbo 4.0L V8 delivering thrilling exhaust notes and rapid acceleration",
      "Cayenne GTS: 493hp twin-turbo V8 with lowered air suspension and standard Sport Chrono",
      "Porsche Driver Experience interior with curved digital instrument cluster and optional passenger display",
      "Towing capacity up to 7,700 lbs makes it ideal for weekend recreation and family road trips"
    ],
    whyLease: "The Porsche Cayenne represents the benchmark for midsize luxury performance SUVs. Pairing sports car dynamics with genuine executive comfort, the Cayenne holds remarkably high residual values through Porsche Financial Services. By leasing with Capital Motor Cars, executives and families across New Jersey and New York benefit from wholesale vehicle acquisition, customized annual mileage terms, and free doorstep delivery.",
    trims: [
      { name: "Cayenne Base", leasePrice: 1049, keyFeatures: ["20-inch Cayenne Design wheels", "Matrix LED headlights", "Porsche Active Suspension Management", "Wireless smartphone charging", "12.3-inch touchscreen display"] },
      { name: "Cayenne E-Hybrid", leasePrice: 1099, popular: true, keyFeatures: ["468 hp plug-in hybrid powertrain", "Electric-only driving mode", "Sport Chrono Package standard", "Mobile charging cable", "NJ 0% EV sales tax savings"] },
      { name: "Cayenne S", leasePrice: 1349, keyFeatures: ["4.0-liter twin-turbo V8 (468 hp)", "20-inch Cayenne S wheels", "Upgraded 6-piston brake calipers", "Dual twin-tube brushed steel tailpipes", "Driver memory package"] },
      { name: "Cayenne GTS", leasePrice: 1599, keyFeatures: ["493 hp twin-turbo V8", "Sport Design package in black", "21-inch RS Spyder wheels in Anthracite Grey", "Sport exhaust with dark bronze tips", "Adaptive air suspension"] }
    ],
    faqs: [
      { question: "What is the monthly payment on a Porsche Cayenne lease in NJ?", answer: "Monthly lease payments on a 2026 Porsche Cayenne start around $1,049 to $1,199 per month for Base and E-Hybrid configurations on 36-month terms. High-performance Cayenne S and GTS V8 models lease between $1,349 and $1,599 per month depending on options." },
      { question: "Does the Porsche Cayenne E-Hybrid qualify for tax savings in New Jersey?", answer: "Yes. New Jersey provides an exemption on state sales tax for qualified zero-emission plug-in vehicles, saving lessees $60 to $90 every month compared to gasoline models of equal MSRP." },
      { question: "Can I order a custom-spec Porsche Cayenne through Capital Motor Cars?", answer: "Yes. Our concierge consultants work directly with factory ordering systems to build your Cayenne to exact paint, leather, and option specifications while locking in wholesale pricing." }
    ],
    relatedComparisons: [
      { label: "BMW X5 vs Audi Q7 Comparison", path: "/comparisons/bmw-x5-vs-audi-q7-lease" },
      { label: "BMW X5 vs Mercedes GLE Comparison", path: "/comparisons/bmw-x5-vs-mercedes-gle-lease" }
    ],
    relatedBrandPage: { label: "All Porsche Lease Deals in NJ", path: "/brand/porsche" }
  },
  {
    fileName: "LandRoverDefenderLeasePage.tsx",
    componentName: "LandRoverDefenderLeasePage",
    make: "Land Rover",
    model: "Defender 110",
    fullName: "Land Rover Defender 110",
    slug: "land-rover-defender-lease-nj",
    heroImage: "/blog-images/2026-land-rover-defender.jpg",
    category: "Luxury Off-Road SUV",
    isEV: false,
    msrpStart: 62000,
    leaseStart: 799,
    leaseEnd: 1250,
    highlights: [
      "Defender 110: The iconic four-door British luxury off-roader with seating for up to seven",
      "P300: 296hp turbocharged four-cylinder combining daily efficiency with capable trail performance",
      "P400: 395hp mild-hybrid inline-6 offering smooth highway passing power and 8,201 lbs towing capacity",
      "Standard Electronic Air Suspension with Terrain Response ensures plush highway cruising",
      "Pivi Pro infotainment with 11.4-inch touchscreen and wireless smartphone mirroring",
      "Strong secondary market demand keeps Land Rover Financial lease residuals high at 62%"
    ],
    whyLease: "The Land Rover Defender 110 has become one of the most sought-after luxury family SUVs in suburban New Jersey. Offering legendary heritage styling and military-grade durability alongside British luxury, leasing a Defender protects you from steep post-warranty depreciation. Capital Motor Cars tracks regional allocation across dealer networks, ensuring you secure wholesale lease rates without paying showroom market adjustments.",
    trims: [
      { name: "Defender S P300", leasePrice: 799, keyFeatures: ["19-inch Style 6010 gloss sparkle silver wheels", "Grained leather seat facings", "Interactive Driver Display", "LED headlights with auto high beam", "Keyless entry"] },
      { name: "Defender X-Dynamic SE P400", leasePrice: 929, popular: true, keyFeatures: ["395 hp inline-6 turbo mild hybrid", "20-inch Satin Dark Grey wheels", "Silicon Silver exterior accents", "Meridian sound system (400W)", "Ebony Morzine headlining"] },
      { name: "Defender X P400", leasePrice: 1189, keyFeatures: ["Gloss Black hood and lower claddings", "Electronic Active Differential with torque vectoring", "Terrain Response 2 with configurable terrain modes", "Sliding panoramic roof", "Orange brake calipers"] },
      { name: "Defender V8", leasePrice: 1499, keyFeatures: ["518 hp supercharged 5.0L V8", "22-inch gloss black wheels", "Quad outboard exhaust tailpipes", "Windsor leather with Dinamica suedecloth", "Illuminated metal treadplates"] }
    ],
    faqs: [
      { question: "What is the average lease cost for a Land Rover Defender 110 in NJ?", answer: "A 36-month lease on a Land Rover Defender 110 P300 in NJ averages $799 to $879 per month with zero down payment. Popular P400 X-Dynamic models range between $929 and $1,050 per month based on equipment." },
      { question: "Is the Land Rover Defender reliable to lease?", answer: "Leasing is the ideal way to drive a Land Rover. Because leases typically run 36 months, the entire duration of your contract is fully covered by Land Rover's 4-year, 50,000-mile factory warranty and complimentary roadside assistance." },
      { question: "Does the Defender 110 offer three rows of seating?", answer: "Yes. Land Rover offers an optional 5+2 seating configuration on the Defender 110, providing two fold-flat third-row seats suitable for children or quick trips." }
    ],
    relatedComparisons: [
      { label: "BMW X5 vs Mercedes GLE Comparison", path: "/comparisons/bmw-x5-vs-mercedes-gle-lease" },
      { label: "BMW X5 vs Audi Q7 Comparison", path: "/comparisons/bmw-x5-vs-audi-q7-lease" }
    ],
    relatedBrandPage: { label: "All Land Rover Lease Deals in NJ", path: "/brand/land-rover" }
  },
  {
    fileName: "BmwX7LeasePage.tsx",
    componentName: "BmwX7LeasePage",
    make: "BMW",
    model: "X7",
    fullName: "BMW X7",
    slug: "bmw-x7-lease-nj",
    heroImage: "/model-images/bmw-x7.jpg",
    category: "3-Row Luxury Flagship SUV",
    isEV: false,
    msrpStart: 83500,
    leaseStart: 989,
    leaseEnd: 1499,
    highlights: [
      "xDrive40i: 375hp turbocharged inline-6 with 48V mild hybrid efficiency and standard all-wheel drive",
      "M60i: 523hp twin-turbo 4.4-liter V8 with M Sport differential and active rear-axle steering",
      "Standard three-row seating for seven, with optional second-row luxury captain chairs",
      "Standard two-axle adaptive air suspension delivers exceptional highway bump absorption",
      "Panoramic glass sunroof with Panoramic Sky Lounge LED lighting creates an opulent cabin",
      "BMW Financial Services backs the X7 with high contract residual percentages"
    ],
    whyLease: "The BMW X7 stands as the flagship luxury three-row SUV for families who refuse to compromise on driving engagement. Balancing cavernous interior passenger room with athletic Bavarian dynamics, the X7 is a perennial favorite across Bergen County, Morris County, and Monmouth County. Capital Motor Cars secures direct fleet pricing and wholesale money factors, delivering your new X7 straight to your home.",
    trims: [
      { name: "X7 xDrive40i", leasePrice: 989, popular: true, keyFeatures: ["21-inch bi-color ferric grey wheels", "BMW Curved Display with iDrive 8.5", "Sport seats in Sensafin upholstery", "Comfort Access keyless entry", "Wireless device charging"] },
      { name: "X7 xDrive40i M Sport", leasePrice: 1099, keyFeatures: ["M Sport aerodynamic body styling", "21-inch M double-spoke wheels", "M steering wheel and Shadowline trim", "Anthracite Alcantara headliner", "Sport exhaust accents"] },
      { name: "X7 M60i", leasePrice: 1399, keyFeatures: ["523 hp 4.4L twin-turbo V8", "Integral Active Steering (4-wheel steer)", "M Sport differential", "Harman Kardon surround sound", "Illuminated kidney grille"] },
      { name: "ALPINA XB7", leasePrice: 2199, keyFeatures: ["631 hp handcrafted bi-turbo V8", "ALPINA bespoke sport suspension", "23-inch forged multi-spoke wheels", "Lavalina luxury leather interior", "High-performance Brembo brake system"] }
    ],
    faqs: [
      { question: "How much does it cost to lease a BMW X7 in NJ?", answer: "A BMW X7 xDrive40i in New Jersey leases for approximately $989 to $1,150 per month on a 36-month term with 10,000 annual miles and $0 down payment. The high-performance M60i V8 runs $1,399 to $1,550 per month." },
      { question: "Does the BMW X7 have captain chairs in the second row?", answer: "Yes. The X7 offers optional six-passenger seating with power-adjustable second-row captain chairs, complete with armrests, integrated cup holders, and walk-through third-row access." },
      { question: "How does the BMW X7 compare to the Mercedes GLS lease?", answer: "BMW Financial Services consistently maintains higher residual values on the X7 compared to Mercedes-Benz Financial on the GLS 450, resulting in monthly lease payments that are frequently $75 to $125 lower on vehicles with identical MSRPs." }
    ],
    relatedComparisons: [
      { label: "BMW X5 vs Audi Q7 Comparison", path: "/comparisons/bmw-x5-vs-audi-q7-lease" },
      { label: "BMW X5 vs Mercedes GLE Comparison", path: "/comparisons/bmw-x5-vs-mercedes-gle-lease" }
    ],
    relatedBrandPage: { label: "All BMW Lease Deals in NJ", path: "/brand/bmw" }
  },
  {
    fileName: "AudiQ7LeasePage.tsx",
    componentName: "AudiQ7LeasePage",
    make: "Audi",
    model: "Q7",
    fullName: "Audi Q7",
    slug: "audi-q7-lease-nj",
    heroImage: "/model-images/audi-q7.jpg",
    category: "3-Row Luxury SUV",
    isEV: false,
    msrpStart: 60500,
    leaseStart: 679,
    leaseEnd: 989,
    highlights: [
      "Standard three-row 7-passenger luxury seating with power-folding third-row seatbacks",
      "45 TFSI: 261hp turbocharged four-cylinder delivering solid fuel economy and daily commuting punch",
      "55 TFSI: 335hp turbocharged 3.0L V6 with 48V mild hybrid system and 7,700 lbs towing capacity",
      "Standard Quattro all-wheel drive with self-locking center differential for supreme winter traction",
      "Audi Virtual Cockpit Plus with high-resolution 12.3-inch instrument display and Google Earth maps",
      "Aggressive Audi Financial dealer volume allowances make the Q7 one of the best 3-row lease values"
    ],
    whyLease: "The Audi Q7 represents the premier German value in the three-row midsize luxury crossover class. Known for its quiet passenger compartment, impeccable interior fit and finish, and surefooted all-weather confidence, the Q7 offers lower monthly lease payments than the BMW X5 and Mercedes GLE. Capital Motor Cars sources wholesale allocations from top Audi regional centers, delivering your new Q7 directly to your doorstep.",
    trims: [
      { name: "Q7 Premium 45 TFSI", leasePrice: 679, keyFeatures: ["19-inch 5-arm star design wheels", "Audi Virtual Cockpit Plus", "Leather seating surfaces with heated front seats", "Audi pre sense front and lane departure warning", "Power tailgate"] },
      { name: "Q7 Premium Plus 55 TFSI", leasePrice: 799, popular: true, keyFeatures: ["335 hp turbocharged V6", "Bang and Olufsen 3D Premium Sound System", "Top view camera system with Virtual 360 view", "Matrix-design LED headlights", "Wireless phone charging pad"] },
      { name: "Q7 Prestige 55 TFSI", leasePrice: 949, keyFeatures: ["Adaptive air suspension", "Head-up display with traffic sign recognition", "Power soft-closing doors", "Remote park assist plus", "Comfort front seats with ventilation"] },
      { name: "SQ7 Performance", leasePrice: 1299, keyFeatures: ["500 hp twin-turbo 4.0L V8", "Sport adaptive air suspension with all-wheel steering", "21-inch 5-double-spoke modular wheels", "Diamond-stitched Valcona leather sport seats", "Quad exhaust tailpipes"] }
    ],
    faqs: [
      { question: "What is the monthly lease payment for an Audi Q7 in New Jersey?", answer: "An Audi Q7 45 TFSI in NJ leases from $679 to $749 per month for a standard 36-month, 10,000-mile contract. The more powerful 55 TFSI V6 Premium Plus averages $799 to $889 per month with zero down payment." },
      { question: "Does the Audi Q7 come standard with three rows?", answer: "Yes. Every Audi Q7 comes factory-equipped with 7-passenger seating across three rows, featuring a standard power-folding 50/50 split third row that tucks into the cargo floor at the push of a button." },
      { question: "Audi Q7 vs BMW X5: Which is cheaper to lease?", answer: "Because the Audi Q7 has a lower starting MSRP and Audi Financial Services regularly provides higher captive trunk money incentives, an Audi Q7 lease typically costs $50 to $100 less per month than a comparably equipped BMW X5." }
    ],
    relatedComparisons: [
      { label: "BMW X5 vs Audi Q7 Comparison", path: "/comparisons/bmw-x5-vs-audi-q7-lease" },
      { label: "Audi Q5 vs BMW X3 Comparison", path: "/comparisons/audi-q5-vs-bmw-x3-lease" }
    ],
    relatedBrandPage: { label: "All Audi Lease Deals in NJ", path: "/brand/audi" }
  },
  {
    fileName: "GenesisGv70LeasePage.tsx",
    componentName: "GenesisGv70LeasePage",
    make: "Genesis",
    model: "GV70",
    fullName: "Genesis GV70",
    slug: "genesis-gv70-lease-nj",
    heroImage: "/model-images/genesis-gv70.jpg",
    category: "Compact Luxury SUV",
    isEV: false,
    msrpStart: 45700,
    leaseStart: 549,
    leaseEnd: 799,
    highlights: [
      "2.5T: 300hp turbocharged four-cylinder with standard all-wheel drive and launch control",
      "3.5T Sport: 375hp twin-turbo V6 with sport-tuned suspension and electronic limited-slip differential",
      "Aviation-inspired luxury interior featuring fingerprint authentication and dual-tier dashboard",
      "Standard 14.5-inch HD navigation display with cloud-based voice commands",
      "Highway Driving Assist 2 with automated lane change assistance",
      "Genesis Finance delivers aggressive money factors that undercut German competitors by $150/month"
    ],
    whyLease: "The Genesis GV70 has emerged as the definitive luxury disruptor in the compact executive SUV category. Delivering concept-car exterior design, exquisite Nappa leather options, and whisper-quiet cabin insulation, the GV70 easily challenges the BMW X3 and Audi Q5. Leasing through Capital Motor Cars locks in competitive Genesis Finance buy-rates with free doorstep delivery across New Jersey and New York.",
    trims: [
      { name: "GV70 2.5T Standard", leasePrice: 549, keyFeatures: ["19-inch alloy wheels", "Standard all-wheel drive", "14.5-inch HD navigation screen", "Highway Driving Assist", "Smart power liftgate"] },
      { name: "GV70 2.5T Advanced", leasePrice: 629, popular: true, keyFeatures: ["Leather seating surfaces", "Surround View Monitor and Blind-Spot View Monitor", "Lexicon 16-speaker premium audio", "Remote Smart Parking Assist", "Panoramic sunroof"] },
      { name: "GV70 3.5T Sport", leasePrice: 729, keyFeatures: ["375 hp twin-turbo V6", "21-inch Sport dark alloy wheels", "Electronically Controlled Suspension with Road Preview", "Sport appearance package with dual round exhausts", "Panoramic glass roof"] },
      { name: "Electrified GV70", leasePrice: 599, keyFeatures: ["429 hp dual-motor electric powertrain (483 hp Boost mode)", "18-minute fast charging capability", "NJ 0% EV sales tax savings", "White-glove home charging support", "Ultra-quiet luxury ride"] }
    ],
    faqs: [
      { question: "How much does it cost to lease a Genesis GV70 in NJ?", answer: "A Genesis GV70 2.5T in New Jersey leases for approximately $549 to $629 per month on a 36-month, 10,000-mile term with zero down payment. The 375hp twin-turbo 3.5T Sport ranges from $729 to $799 per month." },
      { question: "Is Genesis maintenance included in a lease?", answer: "Yes. Every new Genesis lease includes Genesis Complimentary Maintenance for 3 years or 36,000 miles, along with complimentary Genesis Service Valet that picks up your vehicle and leaves a loaner car." },
      { question: "Does the Electrified GV70 qualify for New Jersey tax breaks?", answer: "Yes. The all-electric Genesis GV70 qualifies for New Jersey's 0% sales tax on clean energy vehicles, saving drivers $35 to $55 per month compared to leasing the gasoline model." }
    ],
    relatedComparisons: [
      { label: "Audi Q5 vs BMW X3 Comparison", path: "/comparisons/audi-q5-vs-bmw-x3-lease" },
      { label: "BMW X5 vs Mercedes GLE Comparison", path: "/comparisons/bmw-x5-vs-mercedes-gle-lease" }
    ],
    relatedBrandPage: { label: "All Genesis Lease Deals in NJ", path: "/brand/genesis" }
  },
  {
    fileName: "GenesisGv80LeasePage.tsx",
    componentName: "GenesisGv80LeasePage",
    make: "Genesis",
    model: "GV80",
    fullName: "Genesis GV80",
    slug: "genesis-gv80-lease-nj",
    heroImage: "/model-images/genesis-gv80.jpg",
    category: "Midsize Luxury SUV",
    isEV: false,
    msrpStart: 58700,
    leaseStart: 699,
    leaseEnd: 999,
    highlights: [
      "Stately midsize luxury executive presence featuring crest grille and signature two-line LED architecture",
      "2.5T: 300hp turbocharged inline-4 with standard all-wheel drive and paddle shifters",
      "3.5T: 375hp twin-turbo V6 with Electronically Controlled Suspension that previews road imperfections using cameras",
      "Stunning 27-inch seamless OLED display combining gauge cluster and navigation in one sweeping panel",
      "Available third-row seating package for expanding families",
      "Genesis Finance residuals and low money factor subsidies deliver exceptional monthly lease value"
    ],
    whyLease: "The Genesis GV80 proves that full executive luxury does not need to cost $1,200 a month. Combining palatial cabin appointments, Bentley-like road authority, and intuitive cutting-edge technology, the GV80 delivers superior equipment per dollar than the Mercedes GLE or BMW X5. Capital Motor Cars negotiates pre-discounted fleet pricing, eliminating dealer markups and delivering your vehicle directly to your doorstep.",
    trims: [
      { name: "GV80 2.5T Standard", leasePrice: 699, keyFeatures: ["19-inch alloy wheels", "27-inch OLED integrated display", "Wireless Apple CarPlay and Android Auto", "Highway Driving Assist 2", "Hands-free smart power tailgate"] },
      { name: "GV80 2.5T Advanced", leasePrice: 769, popular: true, keyFeatures: ["Leather seating surfaces", "Surround View Monitor", "Bang and Olufsen premium audio", "Panoramic sunroof", "Heated steering wheel"] },
      { name: "GV80 3.5T Advanced", leasePrice: 879, keyFeatures: ["375 hp twin-turbo V6", "20-inch alloy wheels", "Electronically Controlled Suspension with Road Preview", "Ventilated front seats", "Monobloc front brakes"] },
      { name: "GV80 3.5T Prestige", leasePrice: 999, keyFeatures: ["22-inch alloy wheels", "Nappa leather seating with Ergo Motion massaging driver seat", "Head-up display", "Remote Smart Parking Assist 2", "Power rear sunshades"] }
    ],
    faqs: [
      { question: "What is the monthly lease payment on a Genesis GV80 in NJ?", answer: "A 2026 Genesis GV80 2.5T leases from $699 to $769 per month on a 36-month, 10,000-mile lease with zero cash down payment. The 3.5T twin-turbo V6 runs between $879 and $999 per month for fully loaded Prestige models." },
      { question: "Can I get a Genesis GV80 with a third row in New Jersey?", answer: "Yes. Genesis offers an available third-row seat package on select 3.5T Advanced trims, expanding passenger capacity to seven. Capital Motor Cars can locate 3-row GV80 inventory across our regional network." },
      { question: "How does the Genesis GV80 compare to the BMW X5?", answer: "The GV80 starts roughly $9,000 lower in MSRP than a comparably equipped BMW X5 while including more standard luxury amenities such as the 27-inch OLED screen and all-wheel drive, resulting in monthly lease savings of $70 to $120." }
    ],
    relatedComparisons: [
      { label: "BMW X5 vs Mercedes GLE Comparison", path: "/comparisons/bmw-x5-vs-mercedes-gle-lease" },
      { label: "BMW X5 vs Audi Q7 Comparison", path: "/comparisons/bmw-x5-vs-audi-q7-lease" }
    ],
    relatedBrandPage: { label: "All Genesis Lease Deals in NJ", path: "/brand/genesis" }
  },
  {
    fileName: "CadillacEscaladeLeasePage.tsx",
    componentName: "CadillacEscaladeLeasePage",
    make: "Cadillac",
    model: "Escalade",
    fullName: "Cadillac Escalade",
    slug: "cadillac-escalade-lease-nj",
    heroImage: "/model-images/cadillac-escalade.jpg",
    category: "Full-Size Luxury SUV",
    isEV: false,
    msrpStart: 89500,
    leaseStart: 1199,
    leaseEnd: 1799,
    highlights: [
      "The undisputed crown jewel of full-size American luxury SUVs with three massive rows of passenger comfort",
      "Standard 6.2-liter V8 engine producing 420hp and 460 lb-ft of torque paired with a smooth 10-speed transmission",
      "Available 3.0-liter Duramax turbo-diesel offering smooth cruising torque and extended highway range",
      "Curved 38-inch total diagonal OLED display with twice the pixel density of a 4K television",
      "Available Super Cruise hands-free driving technology compatible with thousands of miles of divided highways",
      "Substantial gross vehicle weight rating (GVWR over 6,000 lbs) qualifies for business Section 179 tax deductions"
    ],
    whyLease: "The Cadillac Escalade represents the pinnacle of executive road authority and American luxury craftsmanship. Perfect for large families and corporate livery executives across New Jersey and the New York metropolitan area, leasing an Escalade through Capital Motor Cars delivers pre-negotiated wholesale pricing without retail dealer markup. We handle all logistics, paperwork, and white-glove doorstep delivery.",
    trims: [
      { name: "Escalade Luxury", leasePrice: 1199, keyFeatures: ["22-inch 14-spoke alloy wheels", "38-inch curved OLED display", "AKG Studio 19-speaker audio system", "Heated and ventilated front seats", "HD Surround Vision camera"] },
      { name: "Escalade Premium Luxury", leasePrice: 1349, popular: true, keyFeatures: ["Super Cruise hands-free driver assistance", "Panoramic power sunroof", "Rear Camera Mirror", "Full-color Head-Up Display", "Enhanced Automatic Parking Assist"] },
      { name: "Escalade Sport Platinum", leasePrice: 1649, keyFeatures: ["Gloss Black exterior trim and dark finish wheels", "AKG Studio Reference 36-speaker sound system", "Air Ride Adaptive Suspension", "Magnetic Ride Control 4.0", "Semi-Aniline leather seating with massage"] },
      { name: "Escalade-V Series", leasePrice: 2499, keyFeatures: ["682 hp supercharged 6.2L V8", "Brembo high-performance front brakes", "V-Series performance exhaust with active valves", "Exclusive V-Mode driving settings", "Bespoke interior sport detailing"] }
    ],
    faqs: [
      { question: "What is the typical lease price for a Cadillac Escalade in NJ?", answer: "A 2026 Cadillac Escalade lease in New Jersey starts around $1,199 to $1,349 per month for Luxury and Premium Luxury models on 36-month terms with $0 down payment. Sport Platinum models range from $1,599 to $1,799 per month." },
      { question: "Can a business lease a Cadillac Escalade as a tax write-off?", answer: "Yes. Because the Cadillac Escalade has a Gross Vehicle Weight Rating (GVWR) exceeding 6,000 pounds, it qualifies for advantageous business vehicle tax write-offs under IRS Section 179 and bonus depreciation rules. Consult your tax professional for details." },
      { question: "Does the Escalade lease include Super Cruise hands-free driving in NJ?", answer: "Yes. Super Cruise is available on Premium Luxury and Sport trims and standard on Platinum trims. It supports hands-free driving on mapped highways including the Garden State Parkway, New Jersey Turnpike, and I-80." }
    ],
    relatedComparisons: [
      { label: "BMW X5 vs Audi Q7 Comparison", path: "/comparisons/bmw-x5-vs-audi-q7-lease" },
      { label: "BMW X5 vs Mercedes GLE Comparison", path: "/comparisons/bmw-x5-vs-mercedes-gle-lease" }
    ],
    relatedBrandPage: { label: "All Cadillac Lease Deals in NJ", path: "/brand/cadillac" }
  }
];

// Check zero forbidden dashes across all content
for (const m of models) {
  const allText = [
    m.whyLease,
    ...m.highlights,
    ...m.faqs.map(f => f.question + " " + f.answer)
  ].join("\n");

  if (/[—–]/.test(allText)) {
    throw new Error(`Forbidden unicode dash in ${m.fullName}`);
  }
  const lines = allText.split("\n");
  if (lines.some(l => /--/.test(l))) {
    throw new Error(`Forbidden double hyphen in ${m.fullName}`);
  }
}
console.log("✅ Zero em dashes, zero en dashes, and zero double hyphens verified across all 8 model pages!");

// Write each page file in src/pages/models/
for (const m of models) {
  const filePath = path.join("src/pages/models", m.fileName);
  const code = `import { VehicleModelLandingTemplate } from '@/components/local/VehicleModelLandingTemplate';
import type { VehicleModelData } from '@/components/local/VehicleModelLandingTemplate';

const data: VehicleModelData = {
  make: ${JSON.stringify(m.make)},
  model: ${JSON.stringify(m.model)},
  fullName: ${JSON.stringify(m.fullName)},
  slug: ${JSON.stringify(m.slug)},
  heroImage: ${JSON.stringify(m.heroImage)},
  category: ${JSON.stringify(m.category)},
  isEV: ${m.isEV},
  msrpStart: ${m.msrpStart},
  leaseStart: ${m.leaseStart},
  leaseEnd: ${m.leaseEnd},
  highlights: ${JSON.stringify(m.highlights, null, 2)},
  whyLease: ${JSON.stringify(m.whyLease)},
  trims: ${JSON.stringify(m.trims, null, 2)},
  faqs: ${JSON.stringify(m.faqs, null, 2)},
  relatedComparisons: ${JSON.stringify(m.relatedComparisons, null, 2)},
  relatedBrandPage: ${JSON.stringify(m.relatedBrandPage, null, 2)},
};

export default function ${m.componentName}() {
  return <VehicleModelLandingTemplate data={data} />;
}
`;
  fs.writeFileSync(filePath, code, "utf8");
  console.log(`Created ${filePath}`);
}

// Update src/App.tsx with lazy imports and routes
const appPath = "src/App.tsx";
let appCode = fs.readFileSync(appPath, "utf8");

// Add lazy imports if not present
const importMarker = "const HyundaiIoniq6LeasePage = lazy(() => import(\"./pages/models/HyundaiIoniq6LeasePage\"));";
const newImports = models
  .filter(m => !appCode.includes(`import("./pages/models/${m.componentName}")`))
  .map(m => `const ${m.componentName} = lazy(() => import("./pages/models/${m.componentName}"));`)
  .join("\n");

if (newImports) {
  appCode = appCode.replace(importMarker, `${importMarker}\n${newImports}`);
  console.log("Added lazy imports to src/App.tsx");
}

// Add route tags if not present
const routeMarker = "<Route path=\"/hyundai-ioniq-6-lease-nj\" element={<HyundaiIoniq6LeasePage />} />";
const newRoutes = models
  .filter(m => !appCode.includes(`path="/${m.slug}"`))
  .map(m => `                <Route path="/${m.slug}" element={<${m.componentName} />} />`)
  .join("\n");

if (newRoutes) {
  appCode = appCode.replace(routeMarker, `${routeMarker}\n${newRoutes}`);
  console.log("Added routes to src/App.tsx");
}

fs.writeFileSync(appPath, appCode, "utf8");

// Update public/sitemap.xml
const sitemapPath = "public/sitemap.xml";
let sitemapXml = fs.readFileSync(sitemapPath, "utf8");
for (const m of models) {
  if (!sitemapXml.includes(m.slug)) {
    const entry = `  <url>\n    <loc>https://www.capitalmotorcars.com/${m.slug}</loc>\n    <lastmod>2026-10-08</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>\n</urlset>`;
    sitemapXml = sitemapXml.replace("</urlset>", entry);
    console.log(`Added /${m.slug} to public/sitemap.xml`);
  }
}
fs.writeFileSync(sitemapPath, sitemapXml, "utf8");
console.log("✅ All 8 programmatic models generated, verified, and wired!");
