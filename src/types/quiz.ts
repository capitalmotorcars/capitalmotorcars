import {
    Briefcase,
    Users,
    Compass,
    Truck,
    Car,
    Zap,
    Gauge,
    ShieldCheck,
    Cpu,
    Armchair,
    Sparkles,
    User,
    DollarSign,
    Smile,
    Crown,
    Infinity,
    HelpCircle,
    LucideIcon
} from 'lucide-react';

export type Intent = 'Family & Practical' | 'Daily Comfort' | 'Premium & Luxury' | 'Performance & Fun' | 'Work & Utility';

export type ScoringMap = Partial<Record<Intent, number>>;

export interface QuizAnswer {
    id: string;
    label: string;
    description?: string;
    icon: LucideIcon;
    scoring: ScoringMap;
}

export interface QuizQuestion {
    id: string;
    question: string;
    multiSelect?: boolean;
    optional?: boolean;
    answers: QuizAnswer[];
}

export interface RecommendedVehicle {
    name: string;
    brand: string;
    year: number;
    whyFits: string;
    highlights: string[];
    type: string;
}

export interface IntentResult {
    intent: Intent;
    vehicles: RecommendedVehicle[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
    {
        id: 'usage',
        question: 'Primary vehicle usage',
        answers: [
            { id: 'commute', label: 'Daily commute', icon: Briefcase, scoring: { 'Daily Comfort': 2, 'Premium & Luxury': 1 } },
            { id: 'family', label: 'Family transportation', icon: Users, scoring: { 'Family & Practical': 3, 'Work & Utility': 1 } },
            { id: 'adventure', label: 'Weekend adventures', icon: Compass, scoring: { 'Family & Practical': 2, 'Performance & Fun': 1 } },
            { id: 'work', label: 'Work / hauling', icon: Truck, scoring: { 'Work & Utility': 3 } },
            { id: 'leisure', label: 'Leisure / fun driving', icon: Car, scoring: { 'Performance & Fun': 3, 'Premium & Luxury': 1 } },
        ],
    },
    {
        id: 'matters',
        question: 'What matters most in a vehicle',
        multiSelect: true,
        answers: [
            { id: 'efficiency', label: 'Fuel efficiency', icon: Zap, scoring: { 'Family & Practical': 2, 'Daily Comfort': 2 } },
            { id: 'performance', label: 'Performance', icon: Gauge, scoring: { 'Performance & Fun': 3, 'Premium & Luxury': 2 } },
            { id: 'safety', label: 'Safety', icon: ShieldCheck, scoring: { 'Family & Practical': 2, 'Daily Comfort': 1 } },
            { id: 'tech', label: 'Technology', icon: Cpu, scoring: { 'Premium & Luxury': 2, 'Performance & Fun': 1 } },
            { id: 'comfort', label: 'Comfort', icon: Armchair, scoring: { 'Daily Comfort': 2, 'Premium & Luxury': 2 } },
        ],
    },
    {
        id: 'style',
        question: 'Preferred vehicle style',
        answers: [
            { id: 'suv', label: 'SUV', icon: Car, scoring: { 'Family & Practical': 3 } },
            { id: 'sedan', label: 'Sedan', icon: Car, scoring: { 'Daily Comfort': 2, 'Premium & Luxury': 1 } },
            { id: 'coupe', label: 'Coupe', icon: Car, scoring: { 'Performance & Fun': 3 } },
            { id: 'luxury', label: 'Luxury styling', icon: Sparkles, scoring: { 'Premium & Luxury': 3 } },
            { id: 'truck', label: 'Truck / large vehicle', icon: Truck, scoring: { 'Work & Utility': 3 } },
        ],
    },
    {
        id: 'passengers',
        question: 'Typical number of passengers',
        answers: [
            { id: '1', label: '1 person', icon: User, scoring: { 'Performance & Fun': 2, 'Daily Comfort': 1 } },
            { id: '2-3', label: '2–3 people', icon: Users, scoring: { 'Daily Comfort': 2 } },
            { id: '4-5', label: '4–5 people', icon: Users, scoring: { 'Family & Practical': 3 } },
            { id: '6+', label: '6+ people', icon: Users, scoring: { 'Work & Utility': 3, 'Family & Practical': 1 } },
        ],
    },
    {
        id: 'budget',
        question: 'Monthly budget range',
        answers: [
            { id: 'low', label: 'Low', icon: DollarSign, scoring: { 'Daily Comfort': 2, 'Family & Practical': 1 } },
            { id: 'medium', label: 'Medium', icon: DollarSign, scoring: { 'Family & Practical': 2, 'Daily Comfort': 1 } },
            { id: 'high', label: 'High', icon: DollarSign, scoring: { 'Premium & Luxury': 3, 'Performance & Fun': 1 } },
            { id: 'very-high', label: 'Very high', icon: DollarSign, scoring: { 'Performance & Fun': 3, 'Premium & Luxury': 2 } },
        ],
    },
    {
        id: 'prioritize',
        question: 'How results should be prioritized',
        optional: true,
        answers: [
            { id: 'safe', label: 'Safe and practical choice', icon: ShieldCheck, scoring: { 'Family & Practical': 2, 'Daily Comfort': 1 } },
            { id: 'enjoy', label: 'Enjoy every drive', icon: Smile, scoring: { 'Performance & Fun': 3, 'Premium & Luxury': 1 } },
            { id: 'premium', label: 'Premium feel', icon: Crown, scoring: { 'Premium & Luxury': 3 } },
            { id: 'versatile', label: 'Do-it-all versatility', icon: Infinity, scoring: { 'Family & Practical': 2, 'Work & Utility': 2 } },
            { id: 'surprise', label: 'Surprise me', icon: HelpCircle, scoring: {} },
        ],
    },
];

export const INTENT_VEHICLE_MIX: Record<Intent, RecommendedVehicle[]> = {
    'Family & Practical': [
        {
            name: 'RX Hybrid',
            brand: 'Lexus',
            year: 2026,
            whyFits: 'Perfect blend of efficiency and room for the whole family.',
            highlights: ['Hybrid Efficiency', 'Advanced Safety', 'Spacious Interior'],
            type: 'Hybrid SUV'
        },
        {
            name: 'Accord',
            brand: 'Honda',
            year: 2026,
            whyFits: 'Reliable, comfortable, and perfect for daily family duties.',
            highlights: ['Class-leading Space', 'Fuel Efficient', 'Refined Drive'],
            type: 'Comfortable family sedan'
        },
        {
            name: 'iX',
            brand: 'BMW',
            year: 2026,
            whyFits: 'The future of family travel with zero emissions and peak luxury.',
            highlights: ['All-Electric Range', 'Futuristic Tech', 'Superb Comfort'],
            type: 'Family-friendly electric SUV'
        }
    ],
    'Daily Comfort': [
        {
            name: 'E-Class',
            brand: 'Mercedes-Benz',
            year: 2026,
            whyFits: 'Superior comfort that makes every commute feel like a getaway.',
            highlights: ['Luxury Interior', 'Smooth Ride', 'Advanced Driver Assistance'],
            type: 'Standard sedan'
        },
        {
            name: 'ES Hybrid',
            brand: 'Lexus',
            year: 2026,
            whyFits: 'Quiet, efficient, and exceptionally comfortable for daily use.',
            highlights: ['Industry-leading Reliability', 'Superb Quietness', 'Great MPG'],
            type: 'Hybrid sedan'
        },
        {
            name: 'i4',
            brand: 'BMW',
            year: 2026,
            whyFits: 'Agile electric performance paired with everyday luxury and comfort.',
            highlights: ['Dynamic Handling', 'Quick Charging', 'Premium Cabin'],
            type: 'Compact luxury electric'
        }
    ],
    'Premium & Luxury': [
        {
            name: 'Range Rover',
            brand: 'Land Rover',
            year: 2026,
            whyFits: 'The ultimate statement in luxury and off-road capability.',
            highlights: ['Unrivaled Prestige', 'Go-Anywhere Ability', 'Exquisite Craftsmanship'],
            type: 'Luxury SUV'
        },
        {
            name: 'G90',
            brand: 'Genesis',
            year: 2026,
            whyFits: 'World-class luxury and technology that rivals the best in the world.',
            highlights: ['Rear Seat Luxury', 'Elegant Design', 'Exceptional Warranty'],
            type: 'Luxury sedan'
        },
        {
            name: 'Taycan',
            brand: 'Porsche',
            year: 2026,
            whyFits: 'Electrifying performance meets unparalleled luxury and design.',
            highlights: ['Lightning Fast', 'Porsche DNA', 'Cutting-edge Tech'],
            type: 'Premium electric performance'
        }
    ],
    'Performance & Fun': [
        {
            name: '911',
            brand: 'Porsche',
            year: 2026,
            whyFits: 'The benchmark for sports cars, delivering pure driving joy.',
            highlights: ['Iconic Design', 'Incredible Handling', 'Daily Useable'],
            type: 'Sport coupe'
        },
        {
            name: 'CT5-V Blackwing',
            brand: 'Cadillac',
            year: 2026,
            whyFits: 'Unfiltered power and performance in a refined executive package.',
            highlights: ['Raw Power', 'Superb Chassis', 'V-Series Heritage'],
            type: 'Performance sedan'
        },
        {
            name: 'Charger Daytona',
            brand: 'Dodge',
            year: 2026,
            whyFits: 'The next generation of muscle, proving electric can be exciting.',
            highlights: ['Electric Muscle', 'Fratzonic Exhaust', 'Bold Styling'],
            type: 'Electric performance vehicle'
        }
    ],
    'Work & Utility': [
        {
            name: 'Yukon Denali',
            brand: 'GMC',
            year: 2026,
            whyFits: 'Towing power and massive space without compromising on luxury.',
            highlights: ['Huge Cargo Space', 'V8 Power', 'Denali Refinement'],
            type: 'Full-size SUV'
        },
        {
            name: 'Odyssey',
            brand: 'Honda',
            year: 2026,
            whyFits: 'The ultimate tool for large families and heavy utility needs.',
            highlights: ['Magic Slide Seats', 'V6 Reliability', 'Endless Cup Holders'],
            type: 'Minivan'
        },
        {
            name: 'Sienna',
            brand: 'Toyota',
            year: 2026,
            whyFits: 'All-wheel drive and hybrid efficiency for the ultimate utility vehicle.',
            highlights: ['AWD Standard', '500+ Mile Range', 'Proven Reliability'],
            type: 'Hybrid family vehicle'
        }
    ]
};
