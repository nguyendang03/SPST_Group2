import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import gameData from '../../gameData.json';

const QuizPage = () => {
  const navigate = useNavigate();
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

  const currentQuestion = gameData[currentQuestionIndex];
  const totalQuestions = gameData.length;

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
  }, [showExplanationScreen, currentQuestionIndex]);

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

    if (isCorrect) {
      setScore(score + pointsEarned);
      toast.success(`Chính xác! +${pointsEarned} điểm`);
    } else {
      toast.error('Sai rồi!');
    }

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

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed
      const timeSpent = Math.floor((Date.now() - quizStartTime) / 1000);
      setTotalTimeSpent(timeSpent);
      setQuizCompleted(true);
      toast.success('Hoàn thành bài quiz!');
    }
  };

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
  };

  // Result Screen
  if (quizCompleted) {
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

              {/* Navigation */}
              <div className="flex items-center gap-4">
                <button className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
                  Trang chủ
                </button>
                <button className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
                  Bảng xếp hạng
                </button>
                <button className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
                  Tài khoản
                </button>
                <div className="h-10 w-10 rounded-full bg-linear-to-br from-red-400 to-red-600 flex items-center justify-center text-white font-bold cursor-pointer">
                  A
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Result Content */}
        <div className="mx-auto max-w-6xl px-6 py-12">
          {/* Decorative elements */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-0 left-20 text-6xl"
            >
              ⭐
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute top-10 right-20 text-4xl"
            >
              🎉
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-20 left-10 text-3xl"
            >
              💎
            </motion.div>
          </div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold text-blue-600 mb-4">
              Chúc mừng bạn đã hoàn thành!
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Bạn đã xuất sắc vượt qua các thử thách lý luận và tiến gần hơn tới mục tiêu.
            </p>
            <p className="text-base text-gray-500">
              Kiến thức của bạn về Chủ nghĩa Mác - Lênin thật vững chắc.
            </p>
          </motion.div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Left Card - Statistics */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Kết quả chặng đường
              </h2>

              {/* Circular Progress */}
              <div className="flex justify-center mb-8">
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="#E5E7EB"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="#3B82F6"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${(correctAnswers / totalQuestions) * 552} 552`}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-5xl font-bold text-gray-900">
                      {correctAnswers}<span className="text-2xl text-gray-500">/{totalQuestions}</span>
                    </div>
                    <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      Câu đúng
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-orange-50 rounded-2xl p-4 text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 mb-3">
                    <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {String(totalTimeMinutes).padStart(2, '0')}:{String(totalTimeSeconds).padStart(2, '0')}
                  </div>
                  <div className="text-sm font-medium text-gray-600">Thời gian</div>
                </div>

                <div className="bg-purple-50 rounded-2xl p-4 text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 mb-3">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{score}</div>
                  <div className="text-sm font-medium text-gray-600">Điểm kiểm nghiệm</div>
                </div>
              </div>
            </motion.div>

            {/* Right Card - Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center justify-center relative overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute inset-0 bg-linear-to-br from-green-50 to-blue-50 opacity-50"></div>
              
              <div className="relative z-10 text-center">
                {/* Badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  className="relative inline-flex items-center justify-center w-40 h-40 rounded-full bg-linear-to-br from-yellow-300 via-yellow-400 to-yellow-500 shadow-2xl mb-6"
                >
                  <div className="absolute inset-2 rounded-full bg-linear-to-br from-yellow-200 to-yellow-300"></div>
                  <div className="relative text-5xl">🏆</div>
                  <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                    MỚI NHẬN
                  </div>
                </motion.div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Huy hiệu Chiến sĩ Lý luận
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed max-w-sm mx-auto">
                  Chúc mừng! Bạn đã mở khóa huy hiệu này nhờ hoàn thành xuất sắc chặng đường đầu tiên.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-8"
          >
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 rounded-full border-2 border-gray-300 bg-white px-8 py-3 text-base font-semibold text-gray-700 hover:bg-gray-50 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              Về trang chủ
            </button>

            <button
              onClick={handlePlayAgain}
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3 text-base font-semibold text-white hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Chơi lại
            </button>
          </motion.div>

          {/* Share Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <p className="text-sm text-gray-500 mb-4">Chia sẻ thành tích:</p>
            <div className="flex items-center justify-center gap-3">
              <button className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                </svg>
              </button>
              <button className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5.5 16H11V13h2.5v6zm1.5-8.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                </svg>
              </button>
            </div>
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 text-center"
          >
            <p className="text-sm italic text-gray-500">
              "Học tập là hạt giống của kiến thức, kiến thức là hạt giống của hạnh phúc."
            </p>
          </motion.div>
        </div>
      </div>
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
        <div className="mx-auto max-w-5xl px-6 py-12">
          {/* Result Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-12"
          >
            <div className={`inline-flex h-24 w-24 items-center justify-center rounded-full mb-6 ${
              lastAnswerCorrect ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {lastAnswerCorrect ? (
                <svg className="h-12 w-12 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              ) : (
                <svg className="h-12 w-12 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              )}
            </div>
            <h2 className={`text-4xl font-bold mb-3 ${
              lastAnswerCorrect ? 'text-green-600' : 'text-red-600'
            }`}>
              {lastAnswerCorrect ? 'Chính xác!' : 'Sai rồi!'}
            </h2>
            <p className="text-lg text-gray-600">
              {lastAnswerCorrect 
                ? 'Bạn đã nắm vững kiến thức nền tảng.' 
                : 'Đừng lo, hãy xem giải thích bên dưới nhé.'}
            </p>
          </motion.div>

          {/* Question Info */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium text-gray-500">CÂU HỎI {currentQuestionIndex + 1}/{totalQuestions}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {currentQuestion.question}
            </h3>
            
            {/* Show selected answer and correct answer */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white border-2 border-green-200">
                <svg className="h-6 w-6 text-green-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <div>
                  <div className="text-sm font-bold text-green-800 mb-1">Đáp án đúng</div>
                  <div className="text-base font-medium text-gray-900">
                    {answerLabels[currentQuestion.correctAnswerIndex]}. {currentQuestion.options[currentQuestion.correctAnswerIndex]}
                  </div>
                </div>
              </div>

              {!lastAnswerCorrect && selectedAnswer !== null && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white border-2 border-red-200">
                  <svg className="h-6 w-6 text-red-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <div className="text-sm font-bold text-red-800 mb-1">Bạn đã chọn</div>
                    <div className="text-base font-medium text-gray-900">
                      {answerLabels[selectedAnswer]}. {currentQuestion.options[selectedAnswer]}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Detailed Explanation */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
              </svg>
              <h3 className="text-xl font-bold text-gray-900">GIẢI THÍCH CHI TIẾT</h3>
            </div>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              {currentQuestion.explanation}
            </p>

            {/* Quick Notes */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl">
              <div className="flex items-center gap-2 mb-4">
                <svg className="h-5 w-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <h4 className="text-base font-bold text-yellow-900">Ghi nhớ nhanh</h4>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-yellow-800">
                  <span className="text-yellow-600 font-bold shrink-0">•</span>
                  <span>Nắm vững kiến thức: {currentQuestion.options[currentQuestion.correctAnswerIndex]}</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-yellow-800">
                  <span className="text-yellow-600 font-bold shrink-0">•</span>
                  <span>Áp dụng vào thực tế và bài thi</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => {/* Report question functionality */}}
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/>
              </svg>
              Báo cáo câu hỏi lỗi
            </button>

            <button
              onClick={handleNextQuestion}
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-10 py-4 text-lg font-semibold text-white hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
            >
              {currentQuestionIndex < totalQuestions - 1 ? 'Tiếp tục' : 'Hoàn thành'}
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          {/* Progress indicator */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Nhấn <kbd className="px-2 py-1 bg-gray-100 rounded font-mono text-xs">Enter</kbd> để tiếp tục
            </p>
          </div>
        </div>
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
