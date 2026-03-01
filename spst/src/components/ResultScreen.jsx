import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiStar, HiSparkles } from 'react-icons/hi';
import { FaTrophy, FaGem } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const ResultScreen = ({ 
  score, 
  correctAnswers, 
  totalQuestions, 
  totalTimeSpent,
  maxCombo,
  onPlayAgain 
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const totalTimeMinutes = Math.floor(totalTimeSpent / 60);
  const totalTimeSeconds = totalTimeSpent % 60;

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
              <button 
                onClick={() => navigate('/')}
                className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
              >
                Trang chủ
              </button>
              <button 
                onClick={() => navigate('/leaderboard')}
                className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
              >
                Bảng xếp hạng
              </button>
              {user && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    {user.displayName || 'User'}
                  </span>
                  <div className="h-10 w-10 rounded-full bg-linear-to-br from-red-400 to-red-600 flex items-center justify-center text-white font-bold">
                    {(user.displayName || 'U').charAt(0).toUpperCase()}
                  </div>
                </div>
              )}
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
            className="absolute top-0 left-20"
          >
            <HiStar className="w-16 h-16 text-yellow-400" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute top-10 right-20"
          >
            <HiSparkles className="w-12 h-12 text-pink-500" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-20 left-10"
          >
            <FaGem className="w-10 h-10 text-cyan-500" />
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

            {/* Max Combo Display */}
            {maxCombo > 0 && (
              <div className="mt-4 bg-linear-to-r from-orange-50 to-red-50 rounded-2xl p-4 text-center border-2 border-orange-200">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-r from-orange-500 to-red-500 mb-3">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-2xl font-bold bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  x{(1 + maxCombo * 0.5).toFixed(1)}
                </div>
                <div className="text-sm font-medium text-gray-600">Combo cao nhất</div>
              </div>
            )}
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
                <FaTrophy className="relative w-20 h-20 text-yellow-600" />
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
            onClick={() => navigate('/leaderboard')}
            className="inline-flex items-center gap-2 rounded-full border-2 border-yellow-400 bg-white px-8 py-3 text-base font-semibold text-yellow-600 hover:bg-yellow-50 transition-all"
          >
            <FaTrophy className="w-5 h-5" />
            Bảng xếp hạng
          </button>
          
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
            onClick={onPlayAgain}
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
};

export default ResultScreen;
