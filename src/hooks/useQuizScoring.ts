import { Intent, INTENT_VEHICLE_MIX, QUIZ_QUESTIONS, IntentResult } from '@/types/quiz';

export function calculateQuizResult(answers: Record<string, string | string[]>): IntentResult {
    const scores: Record<Intent, number> = {
        'Family & Practical': 0,
        'Daily Comfort': 0,
        'Premium & Luxury': 0,
        'Performance & Fun': 0,
        'Work & Utility': 0,
    };

    // Process Questions 1-5
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

    // Process Optional Question 6
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
        // Surprise me: +1 to the top two current intents
        const sortedIntents = Object.entries(scores)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 2);

        sortedIntents.forEach(([intent]) => {
            scores[intent as Intent] += 1;
        });
    }

    // Find the highest-scoring intent
    const winningIntent = Object.entries(scores).reduce((prev, curr) =>
        curr[1] > prev[1] ? curr : prev
    )[0] as Intent;

    return {
        intent: winningIntent,
        vehicles: INTENT_VEHICLE_MIX[winningIntent],
    };
}
