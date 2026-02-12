import { Intent, QUIZ_QUESTIONS, IntentResult } from '@/types/quiz';
import { VehicleType } from '@/types/vehicle';

export function calculateQuizResult(
    answers: Record<string, string | string[]>,
    availableVehicles: VehicleType[]
): IntentResult {
    const scores: Record<Intent, number> = {
        'Family & Practical': 0,
        'Daily Comfort': 0,
        'Premium & Luxury': 0,
        'Performance & Fun': 0,
        'Work & Utility': 0,
    };

    // 1. Calculate the Winning Intent (same as before)
    QUIZ_QUESTIONS.slice(0, 5).forEach((question) => {
        const answerIds = answers[question.id];
        if (!answerIds) return;
        const ids = Array.isArray(answerIds) ? answerIds : [answerIds];
        ids.forEach((id) => {
            const answer = question.answers.find((a) => a.id === id);
            if (answer) {
                Object.entries(answer.scoring).forEach(([intent, score]) => {
                    scores[intent as Intent] += score;
                });
            }
        });
    });

    const q6AnswerId = answers['prioritize'] as string;
    if (q6AnswerId && q6AnswerId !== 'surprise') {
        const q6Question = QUIZ_QUESTIONS.find((q) => q.id === 'prioritize');
        const answer = q6Question?.answers.find((a) => a.id === q6AnswerId);
        if (answer) {
            Object.entries(answer.scoring).forEach(([intent, score]) => {
                scores[intent as Intent] += score;
            });
        }
    } else if (q6AnswerId === 'surprise') {
        const sortedIntents = Object.entries(scores)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 2);
        sortedIntents.forEach(([intent]) => {
            scores[intent as Intent] += 1;
        });
    }

    const winningIntent = Object.entries(scores).reduce((prev, curr) =>
        curr[1] > prev[1] ? curr : prev
    )[0] as Intent;

    // 2. Score and Rank REAL Vehicles
    const scoredVehicles = availableVehicles.map(vehicle => {
        let vehicleScore = 0;

        // A. Intent Alignment (High Weight)
        if (winningIntent === 'Premium & Luxury' && (vehicle.isLuxury || (vehicle as any).is_luxury)) vehicleScore += 10;
        if (winningIntent === 'Family & Practical') {
            if (vehicle.passengerCapacity >= 5) vehicleScore += 5;
            if (vehicle.bodyStyle.toLowerCase().includes('suv') || vehicle.bodyStyle.toLowerCase().includes('van')) vehicleScore += 5;
        }
        if (winningIntent === 'Performance & Fun') {
            if (vehicle.performance?.hp && vehicle.performance.hp > 300) vehicleScore += 10;
            if (['coupe', 'sedan'].includes(vehicle.bodyStyle.toLowerCase())) vehicleScore += 3;
        }
        if (winningIntent === 'Work & Utility' && (vehicle.bodyStyle.toLowerCase().includes('truck') || vehicle.bodyStyle.toLowerCase().includes('suv'))) vehicleScore += 10;
        if (winningIntent === 'Daily Comfort' && (vehicle.bodyStyle.toLowerCase().includes('sedan') || vehicle.bodyStyle.toLowerCase().includes('suv'))) vehicleScore += 10;

        // B. Budget Alignment
        const budgetId = answers['budget'] as string;
        const price = vehicle.startingPrice;
        if (budgetId === 'low' && price <= 350) vehicleScore += 10;
        else if (budgetId === 'medium' && price > 350 && price <= 500) vehicleScore += 10;
        else if (budgetId === 'high' && price > 500 && price <= 700) vehicleScore += 10;
        else if (budgetId === 'very-high' && price > 700) vehicleScore += 10;
        else vehicleScore -= 5; // Penalty for wrong budget range

        // C. Style Alignment
        const styleId = answers['style'] as string;
        if (styleId && vehicle.bodyStyle.toLowerCase().includes(styleId.toLowerCase())) vehicleScore += 8;

        // D. Passenger Capacity
        const passengersId = answers['passengers'] as string;
        const cap = vehicle.passengerCapacity;
        if (passengersId === '1' && cap >= 1) vehicleScore += 2;
        if (passengersId === '2-3' && cap >= 2) vehicleScore += 3;
        if (passengersId === '4-5' && cap >= 4) vehicleScore += 4;
        if (passengersId === '6+' && cap >= 6) vehicleScore += 8;

        return { ...vehicle, calculatedScore: vehicleScore };
    });

    // Sort by score descending and take top 3
    const topVehicles = scoredVehicles
        .sort((a, b) => b.calculatedScore - a.calculatedScore)
        .slice(0, 3)
        .map(v => ({
            name: v.vehicleName,
            brand: v.popularBrands[0] || 'Premium Brand',
            year: 2026,
            whyFits: v.description?.slice(0, 100) + '...' || 'This vehicle matches your lifestyle perfectly.',
            highlights: v.highlights.slice(0, 3),
            type: v.bodyStyle,
            image: v.image,
            slug: v.slug,
            startingPrice: v.startingPrice
        }));

    return {
        intent: winningIntent,
        vehicles: topVehicles as any, // Cast for now, we'll update the render component to handle this
    };
}
