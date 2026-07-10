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
    slug?: string;
    image?: string | null;
    startingPrice?: number;
}

export interface IntentResult {
    intent: Intent;
    vehicles: RecommendedVehicle[];
    needsBudgetAdjustment?: boolean;
    suggestedBudgetRange?: {
        min: number;
        max: number;
        message: string;
    };
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
            { id: '2-3', label: '2-3 people', icon: Users, scoring: { 'Daily Comfort': 2 } },
            { id: '4-5', label: '4-5 people', icon: Users, scoring: { 'Family & Practical': 3 } },
            { id: '6+', label: '6+ people', icon: Users, scoring: { 'Work & Utility': 3, 'Family & Practical': 1 } },
        ],
    },
    {
        id: 'budget',
        question: 'Monthly budget range',
        answers: [
            { id: 'low', label: '$200 - $350/month', description: 'Economy friendly', icon: DollarSign, scoring: { 'Daily Comfort': 2, 'Family & Practical': 1 } },
            { id: 'medium', label: '$350 - $500/month', description: 'Mid range options', icon: DollarSign, scoring: { 'Family & Practical': 2, 'Daily Comfort': 1 } },
            { id: 'high', label: '$500 - $700/month', description: 'Premium selection', icon: DollarSign, scoring: { 'Premium & Luxury': 3, 'Performance & Fun': 1 } },
            { id: 'very-high', label: '$700+/month', description: 'Luxury and performance', icon: DollarSign, scoring: { 'Performance & Fun': 3, 'Premium & Luxury': 2 } },
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
            { id: 'versatile', label: 'Do it all versatility', icon: Infinity, scoring: { 'Family & Practical': 2, 'Work & Utility': 2 } },
            { id: 'surprise', label: 'Surprise me', icon: HelpCircle, scoring: {} },
        ],
    },
];

