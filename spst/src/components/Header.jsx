import { motion } from 'framer-motion';
import { HiStar, HiMenu, HiX } from 'react-icons/hi';
import { useState } from 'react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600">
              <HiStar className="h-5 w-5 text-white" />
            </div>
            <span className="text-base font-semibold text-gray-900">
              Đường lên CNXH
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
            >
              Trang chủ
            </a>
            <a
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
            >
              Giới thiệu
            </a>
            <a
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
            >
              Bảng xếp hạng
            </a>
            <a
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
            >
              Tài liệu
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <button className="hidden md:block text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
              Đăng nhập
            </button>
            <motion.button 
              className="rounded-full bg-red-600 px-6 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Đăng ký
            </motion.button>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-4 border-t border-gray-200"
          >
            <nav className="flex flex-col gap-4">
              <a
                href="#"
                className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
              >
                Trang chủ
              </a>
              <a
                href="#"
                className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
              >
                Giới thiệu
              </a>
              <a
                href="#"
                className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
              >
                Bảng xếp hạng
              </a>
              <a
                href="#"
                className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
              >
                Tài liệu
              </a>
              <button className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors text-left">
                Đăng nhập
              </button>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
