import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  HiAcademicCap, 
  HiArrowRight, 
  HiExternalLink,
  HiClipboardCheck,
  HiChartBar,
  HiBookOpen,
  HiStar
} from 'react-icons/hi';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomePage = () => {
  const navigate = useNavigate();

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <div className="min-h-screen bg-[#FEF7F4]">
      <Header />

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-sm font-medium text-red-600 mb-6">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                <span>Học tập & Rèn luyện</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Đường lên
                <br />
                <span className="text-red-600">Chủ nghĩa Xã hội</span>
              </h1>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Khám phá, học hỏi và chinh phục kiến thức lý luận chính trị qua
                các thử thách thú vị. Nền tảng giáo dục trực tuyến dành cho thế
                hệ trẻ Việt Nam.
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                <button 
                  onClick={() => navigate('/quiz')}
                  className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-base font-semibold text-white hover:bg-red-700 transition-all"
                >
                  Bắt đầu hành trình
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
                >
                  Tìm hiểu thêm
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Content - Mockup */}
            <div className="relative">
              <div className="relative rounded-3xl bg-linear-to-br from-red-600 to-red-700 p-1 shadow-2xl">
                <div className="rounded-[calc(1.5rem-4px)] bg-[#1a1d2e] p-6">
                  {/* Browser Dots */}
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex items-center justify-center rounded-lg bg-gray-800 p-2">
                      <svg
                        className="h-5 w-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>

                  {/* Content Area with padding */}
                  <div className="space-y-6">
                    {/* User Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                          <div className="h-8 w-8 rounded-full border-2 border-[#1a1d2e] bg-linear-to-br from-blue-400 to-blue-600"></div>
                          <div className="h-8 w-8 rounded-full border-2 border-[#1a1d2e] bg-linear-to-br from-purple-400 to-purple-600"></div>
                          <div className="h-8 w-8 rounded-full border-2 border-[#1a1d2e] bg-linear-to-br from-pink-400 to-pink-600"></div>
                        </div>
                        <span className="text-sm font-medium text-white">
                          +1.2k sinh viên đang tham gia
                        </span>
                      </div>
                    </div>

                    {/* Progress Section */}
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-400">
                        Tiến độ học tập
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-700">
                        <div className="h-full w-3/4 rounded-full bg-linear-to-r from-yellow-400 to-yellow-500 shadow-lg shadow-yellow-500/50"></div>
                      </div>
                      <div className="flex justify-end text-sm font-semibold text-white">
                        75%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-red-500/20 blur-3xl"></div>
              <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-yellow-400/20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Tính năng nổi bật
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Học tập hiệu quả với phương pháp tương tác mới lạ, giúp kiến thức
              trở nên sinh động và dễ nhớ hơn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 mb-6">
                <svg
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Trắc nghiệm trực quan
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Hệ thống câu hỏi đa dạng kèm hình ảnh minh họa sinh động, bám
                sát giáo trình thực tế.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 mb-6">
                <svg
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Thi đua xếp hạng
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Cạnh tranh lành mạnh cùng bạn bè và cộng đồng sinh viên toàn
                quốc trên bảng vàng.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 mb-6">
                <svg
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Tài liệu phong phú
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Kho tàng kiến thức được biên soạn kỹ lưỡng, dễ hiểu, hỗ trợ tra
                cứu nhanh chóng.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#2a2d3a]">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Sẵn sàng chinh phục tri thức?
          </h2>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            Tham gia ngay hôm nay để nhận được lộ trình học tập cá nhân hóa và
            mở khóa những phần quà hấp dẫn.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => navigate('/quiz')}
              className="rounded-full bg-white px-8 py-3 text-base font-semibold text-gray-900 hover:bg-gray-100 transition-colors shadow-lg"
            >
              Bắt đầu Quiz
            </button>
            <button className="rounded-full border-2 border-white px-8 py-3 text-base font-semibold text-white hover:bg-white hover:text-gray-900 transition-colors">
              Đăng nhập →
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
