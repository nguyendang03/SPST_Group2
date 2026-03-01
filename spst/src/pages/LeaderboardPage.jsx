import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaMedal, FaAward } from 'react-icons/fa';
import { HiClock, HiCheckCircle } from 'react-icons/hi';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getLeaderboard } from '../services/scoreService';
import toast from 'react-hot-toast';

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    setLoading(true);
    const result = await getLeaderboard(20);
    setLoading(false);

    if (result.success) {
      setLeaderboard(result.leaderboard);
    } else {
      toast.error('Không thể tải bảng xếp hạng');
    }
  };

  const getRankIcon = (index) => {
    if (index === 0) return <FaTrophy className="w-6 h-6 text-yellow-500" />;
    if (index === 1) return <FaMedal className="w-6 h-6 text-gray-400" />;
    if (index === 2) return <FaAward className="w-6 h-6 text-amber-700" />;
    return null;
  };

  const getRankBadgeColor = (index) => {
    if (index === 0) return 'bg-yellow-500 text-white';
    if (index === 1) return 'bg-gray-400 text-white';
    if (index === 2) return 'bg-amber-700 text-white';
    return 'bg-gray-200 text-gray-700';
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#FEF7F4]">
      <Header />

      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaTrophy className="w-10 h-10 text-yellow-500" />
            <h1 className="text-4xl font-bold text-gray-900">Bảng Xếp Hạng</h1>
          </div>
          <p className="text-lg text-gray-600">
            Top những người chơi xuất sắc nhất
          </p>
        </motion.div>

        {/* Leaderboard Content */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        ) : leaderboard.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-500 text-lg">Chưa có dữ liệu bảng xếp hạng</p>
            <p className="text-gray-400 mt-2">Hãy là người đầu tiên hoàn thành quiz!</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Top 3 Podium */}
            {leaderboard.length >= 3 && (
              <div className="bg-linear-to-br from-red-50 to-orange-50 p-8">
                <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
                  {/* 2nd Place */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col items-center pt-8"
                  >
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-linear-to-br from-gray-300 to-gray-500 flex items-center justify-center text-white font-bold text-xl mb-2">
                        {leaderboard[1]?.userName?.charAt(0).toUpperCase() || '?'}
                      </div>
                      <div className="absolute -bottom-2 -right-2">
                        <FaMedal className="w-6 h-6 text-gray-400" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mt-3 text-center truncate max-w-full">
                      {leaderboard[1]?.userName}
                    </h3>
                    <p className="text-2xl font-bold text-gray-700 mt-1">
                      {leaderboard[1]?.score}
                    </p>
                    <p className="text-xs text-gray-500">điểm</p>
                  </motion.div>

                  {/* 1st Place */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center"
                  >
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-linear-to-br from-yellow-300 to-yellow-600 flex items-center justify-center text-white font-bold text-2xl mb-2 ring-4 ring-yellow-200">
                        {leaderboard[0]?.userName?.charAt(0).toUpperCase() || '?'}
                      </div>
                      <div className="absolute -bottom-2 -right-2">
                        <FaTrophy className="w-8 h-8 text-yellow-500" />
                      </div>
                    </div>
                    <h3 className="font-bold text-gray-900 mt-3 text-lg text-center truncate max-w-full">
                      {leaderboard[0]?.userName}
                    </h3>
                    <p className="text-3xl font-bold text-yellow-600 mt-1">
                      {leaderboard[0]?.score}
                    </p>
                    <p className="text-sm text-gray-500">điểm</p>
                  </motion.div>

                  {/* 3rd Place */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center pt-12"
                  >
                    <div className="relative">
                      <div className="w-14 h-14 rounded-full bg-linear-to-br from-amber-600 to-amber-800 flex items-center justify-center text-white font-bold text-lg mb-2">
                        {leaderboard[2]?.userName?.charAt(0).toUpperCase() || '?'}
                      </div>
                      <div className="absolute -bottom-2 -right-2">
                        <FaAward className="w-5 h-5 text-amber-700" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mt-3 text-center truncate max-w-full text-sm">
                      {leaderboard[2]?.userName}
                    </h3>
                    <p className="text-xl font-bold text-amber-700 mt-1">
                      {leaderboard[2]?.score}
                    </p>
                    <p className="text-xs text-gray-500">điểm</p>
                  </motion.div>
                </div>
              </div>
            )}

            {/* Full Leaderboard Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Hạng
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Người chơi
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Điểm
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Đúng/Tổng
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Thời gian
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {leaderboard.map((entry, index) => (
                    <motion.tr
                      key={entry.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {/* Rank */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getRankIcon(index)}
                          <span className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold text-sm ${getRankBadgeColor(index)}`}>
                            {index + 1}
                          </span>
                        </div>
                      </td>

                      {/* Player Name */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-linear-to-br from-red-400 to-red-600 flex items-center justify-center text-white font-bold">
                            {entry.userName?.charAt(0).toUpperCase() || '?'}
                          </div>
                          <span className="font-medium text-gray-900">{entry.userName || 'Anonymous'}</span>
                        </div>
                      </td>

                      {/* Score */}
                      <td className="px-6 py-4 text-center">
                        <span className="text-2xl font-bold text-red-600">
                          {entry.score}
                        </span>
                      </td>

                      {/* Correct Answers */}
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <HiCheckCircle className="w-4 h-4 text-green-500" />
                          <span className="font-medium text-gray-700">
                            {entry.correctAnswers}/{entry.totalQuestions}
                          </span>
                        </div>
                      </td>

                      {/* Time */}
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <HiClock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {formatTime(entry.timeSpent)}
                          </span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default LeaderboardPage;
