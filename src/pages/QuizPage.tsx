import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { ChevronLeft, ChevronRight, Star, ArrowRight, CheckCircle2, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { QUIZ_QUESTIONS, IntentResult } from '@/types/quiz';
import { calculateQuizResult } from '@/hooks/useQuizScoring';
import { Button } from '@/components/ui/button';
import { ContactForm } from '@/components/forms/ContactForm';
import { getAllVehicleTypes } from '@/services/vehicleTypeService';
import { VehicleType } from '@/types/vehicle';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

function QuizResults({ result, answers, setIsCompleted, setCurrentQuestionIndex }: { 
  result: IntentResult; 
  answers: Record<string, string | string[]>;
  setIsCompleted: (completed: boolean) => void;
  setCurrentQuestionIndex: (index: number) => void;
}) {
  const navigate = useNavigate();
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showVehicleDetails, setShowVehicleDetails] = useState(false);

  const handleContactClick = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setIsDialogOpen(true);
  };

  const formattedAnswers = Object.entries(answers).map(([key, value]) => {
    const question = QUIZ_QUESTIONS.find(q => q.id === key);
    const answerLabels = Array.isArray(value)
      ? value.map(v => question?.answers.find(a => a.id === v)?.label).join(', ')
      : question?.answers.find(a => a.id === value)?.label;
    return `${question?.question}: ${answerLabels}`;
  }).join(' | ');

  return (
    <>
      {showVehicleDetails && selectedVehicle ? (
        <div className="max-w-6xl mx-auto py-12 md:py-20 px-4">
          <div className="mb-8">
            <Button
              onClick={() => setShowVehicleDetails(false)}
              variant="outline"
              className="mb-6 h-10 px-6 rounded-xl border-border/50 hover:bg-muted/50 font-bold tracking-wide uppercase text-[10px]"
            >
              ← Back to Results
            </Button>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-3 block">
                Vehicle Details
              </span>
              <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-foreground uppercase mb-6">
                {selectedVehicle.year} {selectedVehicle.brand} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-600">
                  {selectedVehicle.name}
                </span>
              </h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              {selectedVehicle.image && (
                <div className="relative rounded-[2.5rem] overflow-hidden border-2 border-border/20">
                  <img 
                    src={selectedVehicle.image} 
                    alt={`${selectedVehicle.year} ${selectedVehicle.brand} ${selectedVehicle.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-xl font-black text-foreground uppercase mb-4">Overview</h3>
                <p className="text-muted-foreground leading-relaxed italic">
                  "{selectedVehicle.whyFits}"
                </p>
              </div>

              {selectedVehicle.startingPrice && (
                <div>
                  <h3 className="text-xl font-black text-foreground uppercase mb-4">Pricing</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-accent">${selectedVehicle.startingPrice}</span>
                    <span className="text-lg text-muted-foreground font-medium">/month</span>
                  </div>
                </div>
              )}

              {selectedVehicle.highlights && selectedVehicle.highlights.length > 0 && (
                <div>
                  <h3 className="text-xl font-black text-foreground uppercase mb-4">Key Features</h3>
                  <div className="space-y-3">
                    {selectedVehicle.highlights.map((highlight: string, index: number) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                        <span className="text-sm font-bold text-foreground/80 uppercase tracking-wide">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-6">
                <Button
                  onClick={() => navigate(`/vehicles/${selectedVehicle.slug}`)}
                  className="flex-1 h-12 rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground font-black tracking-wide uppercase text-xs shadow-lg"
                >
                  View More Details
                </Button>
                <Button
                  onClick={() => setShowVehicleDetails(false)}
                  variant="outline"
                  className="flex-1 h-12 rounded-xl border-border/50 hover:bg-muted/50 font-bold tracking-wide uppercase text-[10px]"
                >
                  Back to Results
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto py-12 md:py-24 px-4">
          <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-3 block">
              Your Perfect Match
            </span>
            <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-foreground uppercase mb-6">
              Everything points to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-600">
                {result.intent}
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Based on your lifestyle and preferences, we've curated the top three 2026 models that define {result.intent.toLowerCase()}.
            </p>
          </motion.div>
        </div>

        {result.needsBudgetAdjustment ? (
          <div className="text-center py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto"
            >
              <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-10 h-10 text-yellow-500" />
              </div>
              <h3 className="text-2xl font-black text-foreground uppercase mb-4">
                Budget Too <span className="text-yellow-500">Low</span>
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                We don't have any vehicles available in your selected budget range. 
                Please consider adjusting your budget to see more options.
              </p>
              {result.suggestedBudgetRange && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-8">
                  <p className="text-lg font-bold text-yellow-700 dark:text-yellow-400">
                    💡 {result.suggestedBudgetRange.message}
                  </p>
                </div>
              )}
              <Button
                onClick={() => {
                  setIsCompleted(false);
                  setCurrentQuestionIndex(4); 
                }}
                className="h-12 px-8 bg-yellow-500 hover:bg-yellow-600 text-white font-black uppercase tracking-widest text-xs rounded-xl"
              >
                Adjust Budget
              </Button>
            </motion.div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {result.vehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "group relative flex flex-col rounded-[2.5rem] border-2 bg-muted/5 dark:bg-white/[0.02] overflow-hidden transition-all duration-500",
                index === 0
                  ? "border-accent shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] scale-105 z-10"
                  : "border-border/60 dark:border-white/10 hover:border-accent/40"
              )}
            >
              {index === 0 && (
                <div className="absolute top-4 right-4 z-20">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-widest shadow-xl">
                    <Star className="w-3 h-3 fill-current" />
                    Recommended
                  </span>
                </div>
              )}

              <div className="p-8 md:p-10 flex flex-col h-full gap-4">
                <div>
                  <span className="text-xs font-bold text-accent uppercase tracking-widest mb-2 block">{vehicle.year} {vehicle.brand}</span>
                  <h3 className="text-2xl font-black text-foreground tracking-tight leading-none group-hover:text-accent transition-colors duration-300">
                    {vehicle.name}
                  </h3>
                  {vehicle.startingPrice && (
                    <div className="flex items-baseline gap-1 mt-3">
                      <span className="text-2xl font-bold text-accent">${vehicle.startingPrice}</span>
                      <span className="text-sm text-muted-foreground font-medium">/month</span>
                    </div>
                  )}
                  {vehicle.image && (
                    <div className="relative transition-opacity opacity-80 group-hover:opacity-100">
                      <img src={vehicle.image} alt="" className="w-full h-full object-contain scale-110 group-hover:scale-125 transition-all duration-300" />
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground mt-4 leading-relaxed font-medium italic">
                    "{vehicle.whyFits}"
                  </p>
                </div>

                <div className="space-y-3 flex-1">
                  {vehicle.highlights.map((highlight) => (
                    <div key={highlight} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span className="text-sm font-bold text-foreground/80 uppercase tracking-wide">{highlight}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3 pt-6 border-t border-border/50">
                  <Button
                    onClick={() => navigate(`/vehicles/${vehicle.slug}`)}
                    className="w-full h-12 rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground font-black tracking-wide uppercase text-xs shadow-lg shadow-accent/20 transition-all"
                  >
                    View Details <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleContactClick(vehicle)}
                    className="w-full h-12 rounded-xl border-border/50 hover:bg-muted/50 font-bold tracking-wide uppercase text-[10px]"
                  >
                    Contact Us
                  </Button>
                </div>
              </div>

            </motion.div>
          ))}
          </div>
        )}

      </div>
      )}
        
      {!result.needsBudgetAdjustment && !showVehicleDetails && (
        <div className="text-center mb-12">
          <Button
            onClick={() => {
              // Reset quiz to start
              window.location.reload();
            }}
            variant="outline"
            size="lg"
            className="h-12 px-8 rounded-xl border-border/50 hover:bg-muted/50 font-bold tracking-wide uppercase text-lg"
          >
            Try Quiz Again
          </Button>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden border-none bg-transparent">
          <div className="relative bg-background p-6 md:p-10 rounded-[2.5rem] border-2 border-border shadow-2xl overflow-y-auto max-h-[90vh]">
            <AnimatePresence mode="wait">
              {showSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h2 className="text-3xl font-black tracking-tighter text-foreground uppercase mb-4">
                    Thank you. <span className="text-accent italic">You're all set.</span>
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    We received your details and will contact you soon with vehicle options that match your quiz results.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button
                      onClick={() => {
                        setIsDialogOpen(false);
                        setShowSuccess(false);
                        // Reset quiz to start
                        window.location.reload();
                      }}
                      className="h-12 px-8 rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground font-black tracking-wide uppercase text-xs shadow-lg"
                    >
                      Continue
                    </Button>
                    <Button
                      onClick={() => {
                        setIsDialogOpen(false);
                        setShowSuccess(false);
                        // Show vehicle details on the same page
                        setShowVehicleDetails(true);
                      }}
                      variant="outline"
                      className="h-12 px-8 rounded-xl border-border/50 hover:bg-muted/50 font-bold tracking-wide uppercase text-[10px]"
                    >
                      View Vehicle Details
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <div key="form">
                  <div className="text-center mb-10">
                    <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-3 block">
                      Lead Capture
                    </span>
                    <DialogTitle className="text-4xl md:text-5xl font-black tracking-tighter text-foreground uppercase mb-4">
                      Let's Make it <span className="text-accent italic">Happen</span>
                    </DialogTitle>
                    <DialogDescription className="text-lg text-muted-foreground leading-relaxed">
                      You're inquiring about the <span className="font-bold text-foreground">2026 {selectedVehicle?.brand} {selectedVehicle?.name}</span>. Our team will help you secure the best deal.
                    </DialogDescription>
                  </div>

                  <ContactForm
                    source="quiz_result"
                    initialValues={{
                      service: 'leasing',
                      message: `I just completed the vehicle quiz and my result was "${result.intent}". I'm particularly interested in the 2026 ${selectedVehicle?.brand} ${selectedVehicle?.name}. My answers were: ${formattedAnswers}`
                    }}
                    onSubmitSuccess={() => setShowSuccess(true)}
                  />
                </div>
              )}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function QuizPage() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState<IntentResult | null>(null);
  const [availableVehicles, setAvailableVehicles] = useState<VehicleType[]>([]);

  useEffect(() => {
    async function loadVehicles() {
      const { success, data } = await getAllVehicleTypes();
      if (success && data) {
        setAvailableVehicles(data);
      }
    }
    loadVehicles();
  }, []);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + (isCompleted ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100;

  const handleAnswerSelect = (answerId: string) => {
    if (currentQuestion.multiSelect) {
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
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: answerId,
      }));

      if (!currentQuestion.optional) {
        setTimeout(() => {
          if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
          } else {
            handleComplete();
          }
        }, 400);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
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

  const handleSkip = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleComplete();
    }
  }

  const handleComplete = () => {
    const finalResult = calculateQuizResult(answers, availableVehicles);
    setResult(finalResult);
    setIsCompleted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedAnswerId = answers[currentQuestion.id];
  const selectedAnswerIds = currentQuestion.multiSelect
    ? (selectedAnswerId as string[] || [])
    : [];
  const hasSelection = currentQuestion.multiSelect
    ? selectedAnswerIds.length > 0
    : !!selectedAnswerId;

  if (isCompleted && result) {
    return (
      <Layout>
        <SEO
          title={`Your Perfect Match: ${result.intent} | Capital Motor Cars`}
          description={`Discover the best vehicle matches for your lifestyle: ${result.intent}.`}
        />
        <QuizResults result={result} answers={answers} setIsCompleted={setIsCompleted} setCurrentQuestionIndex={setCurrentQuestionIndex} />
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title="Vehicle Quiz | Find Your Perfect Car | Capital Motor Cars"
        description="Vehicle quiz for New Jersey and New York drivers from Capital Motor Cars. Find your ideal lease match by budget, lifestyle, and body style."
        seoKeywords={['vehicle quiz New Jersey', 'vehicle quiz New York', 'find your perfect car', 'lease match quiz', 'Capital Motor Cars quiz']}
      />
      <div className="min-h-[80vh] flex items-center justify-center p-4 py-12 md:py-20 bg-muted/30">
        <div className="w-full max-w-2xl">
          <div className="mb-8">
            <div className="flex items-center justify-between py-8">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                Step {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <div className="h-1 bg-border rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'circOut' }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: 'backOut' }}
              className="relative"
            >
              <h2 className="text-2xl md:text-4xl font-black text-foreground mb-8 tracking-tighter uppercase leading-none">
                {currentQuestion.question}
              </h2>
              {currentQuestion.multiSelect && (
                <p className="text-sm text-accent font-bold uppercase tracking-widest mb-10">Select all that apply</p>
              )}
              {currentQuestion.optional && !currentQuestion.multiSelect && (
                <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest mb-10">Optional question</p>
              )}


              <div className="grid grid-cols-1 gap-3">
                {currentQuestion.answers.map((answer, index) => {
                  const Icon = answer.icon;
                  const isSelected = currentQuestion.multiSelect
                    ? selectedAnswerIds.includes(answer.id)
                    : selectedAnswerId === answer.id;

                  return (
                    <motion.button
                      key={answer.id}
                      onClick={() => handleAnswerSelect(answer.id)}
                      className={cn(
                        'w-full p-5 md:p-6 rounded-[1.5rem] border-2 transition-all duration-300 text-left group relative flex items-center gap-5',
                        isSelected
                          ? 'border-accent bg-accent/5 shadow-[0_0_30px_-10px_rgba(59,130,246,0.2)]'
                          : 'border-border/50 bg-background hover:border-accent/40 hover:bg-muted/30'
                      )}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div
                        className={cn(
                          'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300',
                          isSelected
                            ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/20'
                            : 'bg-muted text-muted-foreground group-hover:bg-accent/10 group-hover:text-accent'
                        )}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3
                          className={cn(
                            'text-lg font-black uppercase tracking-tight transition-colors',
                            isSelected ? 'text-accent' : 'text-foreground'
                          )}
                        >
                          {answer.label}
                        </h3>
                        {answer.description && (
                          <p className="text-sm text-muted-foreground font-medium">
                            {answer.description}
                          </p>
                        )}
                      </div>

                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-accent-foreground" />
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-12">
            <button
              onClick={handlePrevious}
              className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back</span>
            </button>

            <div className="flex gap-4">
              {currentQuestion.optional && !hasSelection && (
                <button
                  onClick={handleSkip}
                  className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
                >
                  Skip for now
                </button>
              )}

              {(currentQuestion.multiSelect || currentQuestion.optional) && hasSelection && (
                <motion.button
                  onClick={handleNext}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 h-12 px-8 bg-accent hover:bg-accent/90 text-accent-foreground font-black uppercase tracking-widest text-[10px] rounded-xl transition-all shadow-lg shadow-accent/30"
                >
                  <span>{currentQuestionIndex === QUIZ_QUESTIONS.length - 1 ? 'Get Results' : 'Next'}</span>
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
