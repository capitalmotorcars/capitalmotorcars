import { Intent, QUIZ_QUESTIONS, IntentResult } from '@/types/quiz';
import { VehicleType } from '@/types/vehicle';

const INTENT_STYLE_MAP: Record<Intent, string[]> = {
  'Family & Practical': ['suv', 'crossover', 'minivan', 'wagon'],
  'Daily Comfort': ['sedan', 'crossover'],
  'Premium & Luxury': ['sedan', 'suv', 'coupe'],
  'Performance & Fun': ['coupe', 'sports'],
  'Work & Utility': ['truck', 'van', 'minivan'],
};

function scoreVehicleAgainstIntent(
  vehicle: VehicleType,
  intent: Intent
): number {
  let score = 0;

  const body = vehicle.bodyStyle?.toLowerCase() || '';
  const preferredStyles = INTENT_STYLE_MAP[intent];

  if (preferredStyles.some(style => body.includes(style))) {
    score += 3;
  }

  if (vehicle.startingPrice && vehicle.startingPrice < 400) {
    if (intent === 'Family & Practical' || intent === 'Daily Comfort') {
      score += 1;
    }
  }

  if (vehicle.startingPrice && vehicle.startingPrice > 600) {
    if (intent === 'Premium & Luxury' || intent === 'Performance & Fun') {
      score += 1;
    }
  }

  if (vehicle.passengerCapacity && vehicle.passengerCapacity >= 5) {
    if (intent === 'Family & Practical') score += 1;
  }

  return score;
}

function matchesStyle(bodyStyle: string, styleId?: string) {
    if (!styleId) return true;
    const body = bodyStyle.toLowerCase();
    const style = styleId.toLowerCase();

    if (style === 'suv') {
        return body.includes('suv') || body.includes('crossover') || body.includes('minivan') || body.includes('wagon');
    }
    if (style === 'sedan') {
        return body.includes('sedan');
    }
    if (style === 'coupe') {
        return body.includes('coupe');
    }
    if (style === 'truck') {
        return body.includes('truck');
    }
    if (style === 'luxury') {
        return body.includes('sedan') || body.includes('suv') || body.includes('coupe');
    }

    return true;
}

function matchesBudget(price: number | null | undefined, budgetId?: string) {
    if (!budgetId || price == null) return true;
    if (budgetId === 'low') return price >= 200 && price <= 350;
    if (budgetId === 'medium') return price > 350 && price <= 500;
    if (budgetId === 'high') return price > 500 && price <= 700;
    if (budgetId === 'very-high') return price > 700;
    return true;
}

function matchesPassengers(capacity: number | null | undefined, passengersId?: string) {
    if (!passengersId || capacity == null) return true;
    if (passengersId === '1') return capacity >= 1;
    if (passengersId === '2-3') return capacity >= 2;
    if (passengersId === '4-5') return capacity >= 4;
    if (passengersId === '6+') return capacity >= 6;
    return true;
}

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

    const budgetId = answers['budget'] as string | undefined;
    const styleId = answers['style'] as string | undefined;
    const passengersId = answers['passengers'] as string | undefined;

    const applyConstraints = (usePassengers: boolean, useBudget: boolean) => {
        const filtered = availableVehicles.filter((v) => {
            if (styleId && !matchesStyle(v.bodyStyle, styleId)) return false;
            if (usePassengers && !matchesPassengers(v.passengerCapacity, passengersId)) return false;
            if (useBudget && !matchesBudget(v.startingPrice, budgetId)) return false;
            return true;
        });
        console.log(`Filter results - Style: ${styleId}, Budget: ${budgetId}, Passengers: ${passengersId}, UseBudget: ${useBudget}, Found: ${filtered.length} vehicles`);
        if (filtered.length > 0) {
            console.log('Sample vehicles:', filtered.slice(0, 3).map(v => ({ name: v.vehicleName, price: v.startingPrice })));
        }
        return filtered;
    };

    const styleMatches = styleId 
        ? availableVehicles.filter(v => matchesStyle(v.bodyStyle, styleId))
        : availableVehicles;
    
    const passengerMatches = passengersId
        ? styleMatches.filter(v => matchesPassengers(v.passengerCapacity, passengersId))
        : styleMatches;
    
    const budgetMatches = passengerMatches.filter(v => matchesBudget(v.startingPrice, budgetId));
    const hasBudgetMatches = budgetMatches.length > 0;
    
    console.log(`Budget Check - Style: ${styleId}, Passengers: ${passengersId}, Budget: ${budgetId}`);
    console.log(`Style matches: ${styleMatches.length}, Passenger matches: ${passengerMatches.length}, Budget matches: ${budgetMatches.length}`);
    
    if (!hasBudgetMatches && budgetId) {
        console.log('Triggering budget adjustment logic');
        
        const matchingVehicles = passengerMatches.filter(v => v.startingPrice);
        
        console.log(`Matching vehicles with prices: ${matchingVehicles.length}`);
        
        if (matchingVehicles.length > 0) {
            const prices = matchingVehicles.map(v => v.startingPrice!).filter(p => p > 0);
            console.log('Prices found:', prices);
            if (prices.length > 0) {
                const minPrice = Math.min(...prices);
                const maxPrice = Math.max(...prices);
                
                console.log(`Price range: $${minPrice}-$${maxPrice}`);
                
                let budgetMessage = `Consider adjusting your budget to see vehicles that match your preferences`;
                
                const budgetRanges = {
                    'low': { min: 200, max: 350 },
                    'medium': { min: 350, max: 500 },
                    'high': { min: 500, max: 700 },
                    'very-high': { min: 700, max: 9999 }
                };
                
                const selectedRange = budgetRanges[budgetId as keyof typeof budgetRanges];
                if (selectedRange && minPrice > selectedRange.max) {
                    budgetMessage = `Consider a higher budget to access vehicles matching your preferences`;
                }
                
                console.log('Returning budget adjustment result');
                return {
                    intent: winningIntent,
                    vehicles: [],
                    needsBudgetAdjustment: true,
                    suggestedBudgetRange: {
                        min: minPrice,
                        max: maxPrice,
                        message: budgetMessage
                    }
                };
            }
        }
        
        console.log('No matching vehicles found, using fallback');
        return {
            intent: winningIntent,
            vehicles: [],
            needsBudgetAdjustment: true,
            suggestedBudgetRange: {
                min: 350,
                max: 700,
                message: 'Try adjusting your budget to see more vehicle options'
            }
        };
    }

    let candidates: VehicleType[] = [];

    if (styleId) {
        candidates = applyConstraints(!!passengersId, !!budgetId);

        if (candidates.length < 3 && passengersId) {
            candidates = applyConstraints(false, !!budgetId);
        }

        if (candidates.length === 0) {
            candidates = availableVehicles.filter(v => 
                matchesStyle(v.bodyStyle, styleId) && 
                matchesBudget(v.startingPrice, budgetId)
            );
        }
    } else {
        candidates = availableVehicles.filter(v =>
            matchesPassengers(v.passengerCapacity, passengersId) &&
            matchesBudget(v.startingPrice, budgetId)
        );

        if (candidates.length === 0) {
            candidates = availableVehicles.filter(v => matchesBudget(v.startingPrice, budgetId));
        }
    }

    const ranked = [...candidates]
      .map(vehicle => ({
        vehicle,
        matchScore: scoreVehicleAgainstIntent(vehicle, winningIntent),
      }))
      .sort((a, b) => {
        if (b.matchScore !== a.matchScore) {
          return b.matchScore - a.matchScore;
        }

        const pa = a.vehicle.startingPrice ?? Number.POSITIVE_INFINITY;
        const pb = b.vehicle.startingPrice ?? Number.POSITIVE_INFINITY;
        return pa - pb;
      })
      .map(item => item.vehicle);

    const topVehicles = ranked
        .slice(0, 3)
        .map(v => {
            const inferredBrand = (v.vehicleName || '').split(' ')[0] || undefined;
            return {
                name: v.vehicleName,
                brand: inferredBrand || 'Premium Brand',
                year: 2026,
                whyFits: v.description?.slice(0, 100) + '...' || 'This vehicle matches your lifestyle perfectly.',
                highlights: v.highlights.slice(0, 3),
                type: v.bodyStyle,
                image: v.image,
                slug: v.slug,
                startingPrice: v.startingPrice
            };
        });

    return {
        intent: winningIntent,
        vehicles: topVehicles as any,
    };
}
