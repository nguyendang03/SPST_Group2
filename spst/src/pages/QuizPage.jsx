import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import gameData from '../../gameData.json';
import ResultScreen from '../components/ResultScreen';
import ExplanationScreen from '../components/ExplanationScreen';
import { useAuth } from '../contexts/AuthContext';
import { saveScore } from '../services/scoreService';

const QuizPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showExplanationScreen, setShowExplanationScreen] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [quizStartTime] = useState(Date.now());
  const [scoreSaved, setScoreSaved] = useState(false);

  const currentQuestion = gameData[currentQuestionIndex];
  const totalQuestions = gameData.length;

  const handleAnswerSelect = (index) => {
    if (!showExplanation) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null && timeLeft > 0) {
      toast.error('Vui lòng chọn một đáp án!');
      return;
    }

    const isCorrect = selectedAnswer === currentQuestion.correctAnswerIndex;
    const pointsEarned = isCorrect ? timeLeft * 10 : 0;

    setUserAnswers([...userAnswers, {
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect,
      pointsEarned
    }]);

    setLastAnswerCorrect(isCorrect);
    setShowExplanation(true);
    setShowExplanationScreen(true);
  };

  const handleNextQuestion = useCallback(async () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed
      const timeSpent = Math.floor((Date.now() - quizStartTime) / 1000);
      setTotalTimeSpent(timeSpent);
      setQuizCompleted(true);
      
      // Save score to Firestore if user is logged in
      const correctCount = [...userAnswers, {
        questionId: currentQuestion.id,
        selectedAnswer,
        isCorrect: selectedAnswer === currentQuestion.correctAnswerIndex,
        pointsEarned: selectedAnswer === currentQuestion.correctAnswerIndex ? timeLeft * 10 : 0
      }].filter(a => a.isCorrect).length;
      
      if (user) {
        const result = await saveScore(
          user.uid,
          user.displayName || 'Anonymous',
          score,
          correctCount,
          totalQuestions,
          timeSpent
        );
        
        if (result.success) {
          setScoreSaved(true);
          toast.success('Điểm đã được lưu!');
        } else {
          toast.error('Không thể lưu điểm');
        }
      }
      
      toast.success('Hoàn thành bài quiz!');
    }
  }, [currentQuestionIndex, totalQuestions, quizStartTime, userAnswers, currentQuestion, selectedAnswer, timeLeft, user, score]);
  
  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !showExplanation) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showExplanation) {
      handleSubmitAnswer();
    }
  }, [timeLeft, showExplanation]);

  // Reset timer when question changes
  useEffect(() => {
    setTimeLeft(30);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setShowExplanationScreen(false);
  }, [currentQuestionIndex]);

  // Keyboard navigation for explanation screen
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && showExplanationScreen) {
        handleNextQuestion();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showExplanationScreen, handleNextQuestion]);

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const answerLabels = ['A', 'B', 'C', 'D'];

  // Calculate results
  const correctAnswers = userAnswers.filter(a => a.isCorrect).length;
  const totalTimeMinutes = Math.floor(totalTimeSpent / 60);
  const totalTimeSeconds = totalTimeSpent % 60;

  const handlePlayAgain = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setTimeLeft(30);
    setUserAnswers([]);
    setShowExplanation(false);
    setShowExplanationScreen(false);
    setQuizCompleted(false);
    setTotalTimeSpent(0);
    setScoreSaved(false);
  };

  // Result Screen
  if (quizCompleted) {
    return (
      <ResultScreen
        score={score}
        correctAnswers={correctAnswers}
        totalQuestions={totalQuestions}
        totalTimeSpent={totalTimeSpent}
        onPlayAgain={handlePlayAgain}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FEF7F4]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600">
                <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Đường lên CNXH</h1>
            </div>

            {/* Score and User */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2">
                <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-bold text-blue-600">{score} pts</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">Student</span>
                <div className="h-10 w-10 rounded-full bg-linear-to-br from-red-400 to-red-600 flex items-center justify-center text-white font-bold">
                  A
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Explanation Screen */}
      {showExplanationScreen ? (
        <ExplanationScreen
          currentQuestion={currentQuestion}
          selectedAnswer={selectedAnswer}
          lastAnswerCorrect={lastAnswerCorrect}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
          onNext={handleNextQuestion}
        />
      ) : (
        /* Quiz Content */
        <div className="mx-auto max-w-4xl px-6 py-8">`
        {/* Progress Bar and Question Info */}
        <div className="mb-8">
          {/* Progress Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
              </svg>
              <span className="text-lg font-bold text-gray-900">
                Question {currentQuestionIndex + 1}<span className="text-gray-500">/{totalQuestions}</span>
              </span>
            </div>
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
              Economy
            </span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <motion.div
              className="h-full rounded-full bg-blue-600"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Timer */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center rounded-2xl bg-blue-50 border-2 border-blue-200 px-6 py-3">
              <span className={`text-3xl font-bold tabular-nums ${timeLeft <= 10 ? 'text-red-600' : 'text-blue-600'}`}>
                {String(minutes).padStart(2, '0')}
              </span>
              <span className="text-sm font-medium text-gray-500 ml-1">MIN</span>
            </div>
          </div>
          <span className="text-2xl font-bold text-gray-400">:</span>
          <div className="text-center">
            <div className="inline-flex items-center justify-center rounded-2xl bg-blue-600 border-2 border-blue-700 px-6 py-3">
              <span className={`text-3xl font-bold tabular-nums text-white`}>
                {String(seconds).padStart(2, '0')}
              </span>
              <span className="text-sm font-medium text-blue-100 ml-1">SEC</span>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-lg p-8 mb-8"
          >
            {/* Question Type Badge */}
            <div className="flex items-center gap-2 mb-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5">
                <svg className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm font-bold text-blue-600 uppercase">Multiple Choice</span>
              </div>
            </div>

            {/* Question Text */}
            <h2 className="text-2xl font-bold text-gray-900 mb-8 leading-relaxed">
              {currentQuestion.question}
            </h2>

            {/* Answer Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswerIndex;
                const showCorrect = showExplanation && isCorrect;
                const showIncorrect = showExplanation && isSelected && !isCorrect;

                return (
                  <motion.button
                    key={index}
                    whileHover={!showExplanation ? { scale: 1.02 } : {}}
                    whileTap={!showExplanation ? { scale: 0.98 } : {}}
                    onClick={() => handleAnswerSelect(index)}
                    className={`
                      relative flex items-start gap-4 rounded-2xl border-2 p-5 text-left transition-all
                      ${showCorrect ? 'border-green-500 bg-green-50' : ''}
                      ${showIncorrect ? 'border-red-500 bg-red-50' : ''}
                      ${isSelected && !showExplanation ? 'border-blue-600 bg-blue-50' : ''}
                      ${!isSelected && !showCorrect && !showIncorrect ? 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50' : ''}
                    `}
                  >
                    {/* Answer Label */}
                    <div className={`
                      flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg font-bold
                      ${showCorrect ? 'bg-green-500 text-white' : ''}
                      ${showIncorrect ? 'bg-red-500 text-white' : ''}
                      ${isSelected && !showExplanation ? 'bg-blue-600 text-white' : ''}
                      ${!isSelected && !showCorrect && !showIncorrect ? 'bg-gray-100 text-gray-700' : ''}
                    `}>
                      {answerLabels[index]}
                    </div>

                    {/* Answer Text */}
                    <span className="flex-1 text-base font-medium text-gray-900 pt-1.5">
                      {option}
                    </span>

                    {/* Checkmark or X icon */}
                    {showCorrect && (
                      <svg className="h-6 w-6 text-green-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                    )}
                    {showIncorrect && (
                      <svg className="h-6 w-6 text-red-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                      </svg>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6 rounded-xl bg-blue-50 border border-blue-200 p-5"
              >
                <div className="flex items-start gap-3">
                  <svg className="h-6 w-6 text-blue-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <h3 className="text-sm font-bold text-blue-900 mb-2">Giải thích:</h3>
                    <p className="text-sm text-blue-800 leading-relaxed">{currentQuestion.explanation}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="inline-flex items-center gap-2 rounded-full border-2 border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
            </svg>
            Previous
          </button>

          {!showExplanation ? (
            <button
              onClick={handleSubmitAnswer}
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3 text-base font-semibold text-white hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
            >
              Submit Answer
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="inline-flex items-center gap-2 rounded-full bg-green-600 px-8 py-3 text-base font-semibold text-white hover:bg-green-700 transition-all shadow-lg hover:shadow-xl"
            >
              {currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'Finish Quiz'}
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          )}
        </div>

        {/* Exit Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
          >
            Thoát về trang chủ
          </button>
        </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
