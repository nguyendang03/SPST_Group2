import { motion } from 'framer-motion';

const ExplanationScreen = ({ 
  currentQuestion, 
  selectedAnswer, 
  lastAnswerCorrect,
  currentQuestionIndex,
  totalQuestions,
  onNext
}) => {
  const answerLabels = ['A', 'B', 'C', 'D'];

  return (
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
          <span className="text-sm font-medium text-gray-500">
            CÂU HỎI {currentQuestionIndex + 1}/{totalQuestions}
          </span>
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
          onClick={onNext}
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
  );
};

export default ExplanationScreen;
