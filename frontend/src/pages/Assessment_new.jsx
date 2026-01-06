import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Sparkles, ChevronRight, ChevronLeft } from "lucide-react";
import axios from "axios";

export default function Assessment() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("/api/assessment/questions");
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      alert("Please answer all questions");
      return;
    }

    try {
      setSubmitting(true);
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await axios.post("/api/assessment/submit", {
        user_id: user.id,
        answers: answers,
      });

      const updatedUser = {
        ...user,
        assessment_completed: true,
        learning_dna: response.data.learning_dna,
        skill_level: response.data.recommended_level,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting assessment:", error);
      alert("Failed to submit assessment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
        <div className="text-center">
          <div className="loading-spinner mb-4"></div>
          <p className="text-gray-600 animate-pulse">
            Preparing your personalized assessment...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full mb-4 shadow-lg">
            <Brain className="w-6 h-6" />
            <span className="font-bold">AI-Powered Assessment</span>
            <Sparkles className="w-5 h-5" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            Personalized Learning Profile
          </h1>
          <p className="text-xl text-gray-600">
            Question {currentStep + 1} of {questions.length}
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-600">
              Progress
            </span>
            <span className="text-sm font-bold text-purple-600">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-3 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-full relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
            </motion.div>
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="bg-white p-8 rounded-2xl shadow-2xl border-2 border-purple-100"
          >
            <div className="mb-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {currentStep + 1}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                  {currentQuestion?.question}
                </h3>
              </div>
            </div>

            {currentQuestion?.type === "multiple_choice" && (
              <div className="space-y-3">
                {currentQuestion.options.map((option, optIndex) => (
                  <motion.button
                    key={optIndex}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(currentQuestion.id, option)}
                    className={`w-full text-left p-5 rounded-xl border-2 transition-all font-semibold ${
                      answers[currentQuestion.id] === option
                        ? "border-purple-600 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg"
                        : "border-gray-200 hover:border-purple-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          answers[currentQuestion.id] === option
                            ? "border-purple-600 bg-purple-600"
                            : "border-gray-300"
                        }`}
                      >
                        {answers[currentQuestion.id] === option && (
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="text-lg">{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {currentQuestion?.type === "rating" && (
              <div className="flex flex-col items-center gap-6">
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <motion.button
                      key={rating}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleAnswer(currentQuestion.id, rating)}
                      className={`w-16 h-16 rounded-2xl border-2 font-bold text-xl transition-all shadow-lg ${
                        answers[currentQuestion.id] === rating
                          ? "border-purple-600 bg-gradient-to-br from-purple-500 to-pink-500 text-white scale-110"
                          : "border-gray-300 hover:border-purple-400 bg-white hover:bg-purple-50"
                      }`}
                    >
                      {rating}
                    </motion.button>
                  ))}
                </div>
                <div className="flex items-center justify-between w-full text-sm text-gray-500 px-2">
                  <span>Not Interested</span>
                  <span>Very Interested</span>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-xl font-bold hover:bg-purple-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </motion.button>

          {currentStep < questions.length - 1 ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextStep}
              disabled={!answers[currentQuestion?.id]}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              disabled={
                submitting || Object.keys(answers).length < questions.length
              }
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
            >
              {submitting ? (
                <>
                  <div className="loading-spinner w-5 h-5 border-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Complete Assessment
                </>
              )}
            </motion.button>
          )}
        </div>

        {/* Question indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {questions.map((_, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.3 }}
              onClick={() => {
                setDirection(index > currentStep ? 1 : -1);
                setCurrentStep(index);
              }}
              className={`cursor-pointer transition-all ${
                index === currentStep
                  ? "w-8 h-3 bg-gradient-to-r from-purple-600 to-pink-600"
                  : answers[questions[index]?.id]
                  ? "w-3 h-3 bg-green-500"
                  : "w-3 h-3 bg-gray-300"
              } rounded-full`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
