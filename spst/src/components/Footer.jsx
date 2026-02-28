import { motion } from 'framer-motion';
import { FaFacebook, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#FEF7F4] border-t border-gray-200 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Footer Links */}
        <nav className="flex flex-wrap justify-center gap-8 mb-8">
          <motion.a
            href="#"
            className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
            whileHover={{ y: -2 }}
          >
            Giới thiệu
          </motion.a>
          <motion.a
            href="#"
            className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
            whileHover={{ y: -2 }}
          >
            Điều khoản
          </motion.a>
          <motion.a
            href="#"
            className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
            whileHover={{ y: -2 }}
          >
            Bảo mật
          </motion.a>
          <motion.a
            href="#"
            className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
            whileHover={{ y: -2 }}
          >
            Liên hệ
          </motion.a>
        </nav>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mb-8">
          <motion.a
            href="#"
            className="text-gray-400 hover:text-red-600 transition-colors"
            aria-label="Facebook"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaFacebook className="h-6 w-6" />
          </motion.a>
          <motion.a
            href="#"
            className="text-gray-400 hover:text-red-600 transition-colors"
            aria-label="YouTube"
            whileHover={{ scale: 1.2, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaYoutube className="h-6 w-6" />
          </motion.a>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500">
          © 2025 Đường lên Chủ nghĩa Xã hội. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
