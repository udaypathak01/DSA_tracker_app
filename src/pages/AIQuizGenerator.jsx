import { motion } from 'framer-motion';
import { useState } from 'react';
import { completedTopics, mockQuizzes } from '../data/mockAIData';

/**
 * AI Quiz Generator Page
 * Generate smart quizzes based on completed topics
 */
function AIQuizGenerator() {
  const [selectedTopics, setSelectedTopics] = useState(['Arrays']);
  const [difficulty, setDifficulty] = useState('easy');
  const [isLoading, setIsLoading] = useState(false);
  const [quizState, setQuizState] = useState('selection'); // 'selection' | 'quiz' | 'results'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState([]);

  const handleTopicToggle = (topicName) => {
    if (selectedTopics.includes(topicName)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topicName));
    } else {
      setSelectedTopics([...selectedTopics, topicName]);
    }
  };

  const handleGenerateQuiz = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Get questions based on difficulty
    const questions = mockQuizzes[difficulty] || mockQuizzes.easy;
    setQuizQuestions(questions);
    setAnswers(new Array(questions.length).fill(null));
    setCurrentQuestionIndex(0);
    setQuizState('quiz');
    setIsLoading(false);
  };

  const handleAnswerSelect = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    quizQuestions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setQuizState('results');
  };

  const handleRegenerateQuiz = () => {
    setQuizState('selection');
    setSelectedTopics(['Arrays']);
    setDifficulty('easy');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  // Selection Screen
  if (quizState === 'selection') {
    const completedTopicNames = completedTopics
      .filter((t) => t.completed)
      .map((t) => t.name);

    return (
      <motion.div
        className="space-y-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center">
          <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-3">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              🤖 AI-Powered Learning
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3">
            AI Quiz Generator
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Generate smart quizzes based on your completed topics. AI-powered questions to test
            your knowledge and prepare for interviews.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Topic Selection */}
          <motion.div
            variants={itemVariants}
            className="card p-6 h-fit"
          >
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              📚 Select Topics
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Only completed topics available
            </p>

            <div className="space-y-3">
              {completedTopicNames.map((topic) => (
                <motion.button
                  key={topic}
                  onClick={() => handleTopicToggle(topic)}
                  className={`w-full p-3 rounded-lg font-medium text-left transition-all border-2 ${
                    selectedTopics.includes(topic)
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'border-slate-200 dark:border-dark-border bg-white dark:bg-dark-card text-slate-700 dark:text-slate-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <span>{topic}</span>
                    <span
                      className={`text-lg ${
                        selectedTopics.includes(topic) ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      ✓
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>

            {selectedTopics.length === 0 && (
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  ⚠️ Select at least one topic to continue
                </p>
              </div>
            )}
          </motion.div>

          {/* Difficulty Selection */}
          <motion.div
            variants={itemVariants}
            className="card p-6 h-fit"
          >
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              ⚡ Difficulty Level
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Choose your challenge level
            </p>

            <div className="space-y-3">
              {['easy', 'medium', 'hard'].map((level) => (
                <motion.button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`w-full p-4 rounded-lg font-semibold text-left transition-all border-2 ${
                    difficulty === level
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'border-slate-200 dark:border-dark-border bg-white dark:bg-dark-card text-slate-700 dark:text-slate-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {level === 'easy' ? '🟢' : level === 'medium' ? '🟡' : '🔴'}
                    </span>
                    <div>
                      <p className="capitalize font-semibold">{level}</p>
                      <p className="text-xs opacity-75">
                        {level === 'easy'
                          ? 'Perfect for warming up'
                          : level === 'medium'
                            ? 'Test your understanding'
                            : 'Push your limits'}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Generate Button */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center"
        >
          <motion.button
            onClick={handleGenerateQuiz}
            disabled={selectedTopics.length === 0 || isLoading}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg flex items-center gap-3 transition-all shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Generating Quiz...</span>
              </>
            ) : (
              <>
                <span>✨</span>
                <span>Generate AI Quiz</span>
              </>
            )}
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  // Quiz Screen
  if (quizState === 'quiz' && quizQuestions.length > 0) {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const isAnswered = answers[currentQuestionIndex] !== null;

    return (
      <motion.div
        className="max-w-3xl mx-auto space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Header */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              📝 AI Quiz ({difficulty})
            </h1>
            <span className="text-sm font-semibold px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
              Question {currentQuestionIndex + 1}/{quizQuestions.length}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 dark:bg-dark-border rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-600 to-blue-400 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          className="card p-8 space-y-6"
          key={currentQuestionIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 rounded-lg text-left font-medium transition-all border-2 ${
                  answers[currentQuestionIndex] === index
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'border-slate-200 dark:border-dark-border bg-white dark:bg-dark-card text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      answers[currentQuestionIndex] === index
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-slate-300 dark:border-slate-600'
                    }`}
                  >
                    {answers[currentQuestionIndex] === index && (
                      <span className="text-white text-sm font-bold">✓</span>
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 justify-between">
          <motion.button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 bg-slate-200 dark:bg-dark-border text-slate-700 dark:text-slate-300 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Previous
          </motion.button>

          {currentQuestionIndex === quizQuestions.length - 1 ? (
            <motion.button
              onClick={handleSubmitQuiz}
              disabled={!isAnswered}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 text-white rounded-lg font-medium flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Submit Quiz</span>
              <span>🚀</span>
            </motion.button>
          ) : (
            <motion.button
              onClick={handleNextQuestion}
              disabled={!isAnswered}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 text-white rounded-lg font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next →
            </motion.button>
          )}
        </div>
      </motion.div>
    );
  }

  // Results Screen
  if (quizState === 'results' && quizQuestions.length > 0) {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    const getGrade = (pct) => {
      if (pct >= 90) return { grade: 'A+', emoji: '🌟' };
      if (pct >= 80) return { grade: 'A', emoji: '⭐' };
      if (pct >= 70) return { grade: 'B', emoji: '👏' };
      if (pct >= 60) return { grade: 'C', emoji: '💪' };
      return { grade: 'F', emoji: '📚' };
    };

    const { grade, emoji } = getGrade(percentage);

    return (
      <motion.div
        className="max-w-3xl mx-auto space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Score Card */}
        <motion.div
          className="card p-8 text-center space-y-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <div className="space-y-2">
            <p className="text-6xl">{emoji}</p>
            <p className="text-5xl font-bold text-slate-900 dark:text-white">
              {score}/{quizQuestions.length}
            </p>
            <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
              {percentage}% - Grade {grade}
            </p>
          </div>

          {/* Performance Message */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            {percentage >= 80 ? (
              <p className="text-blue-900 dark:text-blue-200">
                🎉 Excellent work! You've mastered this topic.
              </p>
            ) : percentage >= 60 ? (
              <p className="text-blue-900 dark:text-blue-200">
                👀 Good effort! Review the questions you missed to improve.
              </p>
            ) : (
              <p className="text-blue-900 dark:text-blue-200">
                💡 Keep practicing! Review the concepts and try again.
              </p>
            )}
          </div>
        </motion.div>

        {/* Review Section */}
        <motion.div
          className="card p-6 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">📋 Review</h2>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {quizQuestions.map((question, index) => {
              const isCorrect = answers[index] === question.correctAnswer;
              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${
                    isCorrect
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/10'
                      : 'border-red-500 bg-red-50 dark:bg-red-900/10'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl">{isCorrect ? '✅' : '❌'}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 dark:text-white mb-2">
                        Q{index + 1}: {question.question}
                      </p>
                      <div className="bg-white dark:bg-dark-card p-3 rounded mb-2">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          <strong>Your answer:</strong>{' '}
                          {question.options[answers[index]]}
                        </p>
                        {!isCorrect && (
                          <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                            <strong>Correct answer:</strong> {question.options[question.correctAnswer]}
                          </p>
                        )}
                      </div>
                      <details className="text-sm">
                        <summary className="cursor-pointer font-medium text-blue-600 dark:text-blue-400">
                          See explanation
                        </summary>
                        <p className="mt-2 text-slate-600 dark:text-slate-400">
                          {question.explanation}
                        </p>
                      </details>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <motion.button
            onClick={handleRegenerateQuiz}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔄 Generate New Quiz
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return null;
}

export default AIQuizGenerator;
