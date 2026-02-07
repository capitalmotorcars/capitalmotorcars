import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { ChevronLeft, ChevronRight, Briefcase, ShoppingBag, Compass, Users, Car, DollarSign, Calendar, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

type QuizAnswer = {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

type QuizQuestion = {
  id: string;
  question: string;
  answers: QuizAnswer[];
};

const quizQuestions: QuizQuestion[] = [
  {
    id: 'usage',
    question: 'How will you use the vehicle most of the time?',
    answers: [
      {
        id: 'daily-commute',
        label: 'Daily commute',
        description: 'Getting to and from work',
        icon: Briefcase,
      },
      {
        id: 'errands',
        label: 'Errands and shopping',
        description: 'Around town trips',
        icon: ShoppingBag,
      },
      {
        id: 'weekend',
        label: 'Weekend adventures',
        description: 'Road trips and exploration',
        icon: Compass,
      },
      {
        id: 'family',
        label: 'Family transportation',
        description: 'School runs and activities',
        icon: Users,
      },
    ],
  },
  {
    id: 'budget',
    question: 'What is your monthly budget?',
    answers: [
      {
        id: 'budget-low',
        label: 'Under $500',
        description: 'Affordable options',
        icon: DollarSign,
      },
      {
        id: 'budget-mid',
        label: '$500 - $800',
        description: 'Mid-range selection',
        icon: DollarSign,
      },
      {
        id: 'budget-high',
        label: '$800 - $1,200',
        description: 'Premium vehicles',
        icon: DollarSign,
      },
      {
        id: 'budget-luxury',
        label: '$1,200+',
        description: 'Luxury and performance',
        icon: DollarSign,
      },
    ],
  },
  {
    id: 'frequency',
    question: 'How often will you drive?',
    answers: [
      {
        id: 'frequency-low',
        label: 'Occasionally',
        description: 'Few times per week',
        icon: Calendar,
      },
      {
        id: 'frequency-mid',
        label: 'Regularly',
        description: 'Daily use',
        icon: Calendar,
      },
      {
        id: 'frequency-high',
        label: 'Frequently',
        description: 'Multiple times daily',
        icon: Calendar,
      },
    ],
  },
  {
    id: 'location',
    question: 'Where will you primarily drive?',
    answers: [
      {
        id: 'location-city',
        label: 'City',
        description: 'Urban areas',
        icon: MapPin,
      },
      {
        id: 'location-suburban',
        label: 'Suburban',
        description: 'Mixed driving',
        icon: MapPin,
      },
      {
        id: 'location-highway',
        label: 'Highway',
        description: 'Long distance',
        icon: MapPin,
      },
    ],
  },
  {
    id: 'priority',
    question: 'What matters most to you?',
    answers: [
      {
        id: 'priority-comfort',
        label: 'Comfort',
        description: 'Smooth ride and luxury',
        icon: Car,
      },
      {
        id: 'priority-efficiency',
        label: 'Fuel efficiency',
        description: 'Lower running costs',
        icon: Car,
      },
      {
        id: 'priority-performance',
        label: 'Performance',
        description: 'Power and speed',
        icon: Car,
      },
      {
        id: 'priority-space',
        label: 'Space',
        description: 'Room for passengers and cargo',
        icon: Car,
      },
    ],
  },
];

export default function QuizPage() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
  const isMultiSelect = currentQuestion.id === 'budget'; // Question 2 allows multiple selection

  const handleAnswerSelect = (answerId: string) => {
    if (isMultiSelect) {
      // Toggle selection for multi-select question
      setAnswers((prev) => {
        const currentAnswers = (prev[currentQuestion.id] as string[]) || [];
        const isSelected = currentAnswers.includes(answerId);
        
        return {
          ...prev,
          [currentQuestion.id]: isSelected
            ? currentAnswers.filter((id) => id !== answerId)
            : [...currentAnswers, answerId],
        };
      });
    } else {
      // Single selection for other questions
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: answerId,
      }));

      setTimeout(() => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
        } else {
          handleComplete();
        }
      }, 300);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else {
      navigate(-1);
    }
  };

  const handleComplete = () => {
    navigate('/vehicles/sedan');
  };

  const selectedAnswer = answers[currentQuestion.id];
  const selectedAnswers = isMultiSelect 
    ? (selectedAnswer as string[] || [])
    : [];
  const hasSelection = isMultiSelect 
    ? selectedAnswers.length > 0 
    : !!selectedAnswer;

  return (
    <Layout>
      <SEO
        title="Vehicle Quiz | Find Your Perfect Car | Capital Motor Cars"
        description="Answer 5 quick questions to find the perfect vehicle for your needs. Get personalized recommendations based on your lifestyle and preferences."
      />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center p-4 py-12 md:py-20">
        <div className="w-full max-w-2xl">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">
                Question {currentQuestionIndex + 1} of {quizQuestions.length}
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent to-accent/80 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className=" border border-border rounded-2xl p-6 md:p-8 shadow-lg"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                {currentQuestion.question}
              </h2>

              <div className="space-y-3 md:space-y-4">
                {currentQuestion.answers.map((answer, index) => {
                  const Icon = answer.icon;
                  const isSelected = isMultiSelect
                    ? selectedAnswers.includes(answer.id)
                    : selectedAnswer === answer.id;

                  return (
                    <motion.button
                      key={answer.id}
                      onClick={() => handleAnswerSelect(answer.id)}
                      className={cn(
                        'w-full p-4 md:p-5 rounded-xl border-2 transition-all duration-300 text-left group relative overflow-hidden',
                        'hover:scale-[1.02] hover:shadow-lg',
                        isSelected
                          ? 'border-accent bg-accent/10 shadow-lg shadow-accent/20'
                          : 'border-border bg-card dark:bg-white/[0.04] hover:border-accent/50 hover:bg-accent/5'
                      )}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            'flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center transition-all duration-300',
                            isSelected
                              ? 'bg-accent text-accent-foreground'
                              : 'bg-muted text-muted-foreground group-hover:bg-accent/20 group-hover:text-accent'
                          )}
                        >
                          <Icon className="w-6 h-6 md:w-7 md:h-7" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3
                            className={cn(
                              'text-base md:text-lg font-semibold mb-1 transition-colors',
                              isSelected ? 'text-accent' : 'text-foreground'
                            )}
                          >
                            {answer.label}
                          </h3>
                          <p className="text-sm md:text-base text-muted-foreground">
                            {answer.description}
                          </p>
                        </div>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex-shrink-0 w-6 h-6 md:w-7 md:h-7 rounded-full bg-accent flex items-center justify-center"
                          >
                            <svg
                              className="w-4 h-4 md:w-5 md:h-5 text-accent-foreground"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-8">
            <button
              onClick={handlePrevious}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>

            {isMultiSelect && hasSelection && (
              <motion.button
                onClick={currentQuestionIndex === quizQuestions.length - 1 ? handleComplete : handleNext}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg transition-all shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40"
              >
                <span>{currentQuestionIndex === quizQuestions.length - 1 ? 'Complete' : 'Next'}</span>
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            )}

            {currentQuestionIndex === quizQuestions.length - 1 && hasSelection && !isMultiSelect && (
              <motion.button
                onClick={handleComplete}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg transition-all shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40"
              >
                <span>Complete</span>
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
