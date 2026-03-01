import { motion } from 'framer-motion';
import { HiStar, HiMenu, HiX } from 'react-icons/hi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { logoutUser } from '../services/authService';
import toast from 'react-hot-toast';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      toast.success('Đã đăng xuất');
      navigate('/');
    }
  };

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
          </nav>

          {/* Auth Section */}
          <div className="flex items-center gap-3">
            {user ? (
              /* Logged in user */
              <div className="hidden md:flex items-center gap-3 relative">
                <span className="text-sm font-medium text-gray-700">
                  {user.displayName || 'User'}
                </span>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="relative"
                >
                  <div className="h-10 w-10 rounded-full bg-linear-to-br from-red-400 to-red-600 flex items-center justify-center text-white font-bold cursor-pointer hover:from-red-500 hover:to-red-700 transition-all">
                    {(user.displayName || 'U').charAt(0).toUpperCase()}
                  </div>
                </button>
                
                {/* User dropdown menu */}
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-200"
                  >
                    <button
                      onClick={() => {
                        navigate('/leaderboard');
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Bảng xếp hạng
                    </button>
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    >
                      Đăng xuất
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              /* Not logged in */
              <>
                <button 
                  onClick={() => navigate('/login')}
                  className="hidden md:block text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
                >
                  Đăng nhập
                </button>
                <motion.button 
                  onClick={() => navigate('/register')}
                  className="rounded-full bg-red-600 px-6 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Đăng ký
                </motion.button>
              </>
            )}
            
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
              <button
                onClick={() => {navigate('/'); setMobileMenuOpen(false);}}
                className="text-left text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
              >
                Trang chủ
              </button>
              <button
                onClick={() => {navigate('/leaderboard'); setMobileMenuOpen(false);}}
                className="text-left text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
              >
                Bảng xếp hạng
              </button>
              {user ? (
                <>
                  <div className="text-sm font-medium text-gray-900 pt-2 border-t">
                    {user.displayName || 'User'}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-left text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {navigate('/login'); setMobileMenuOpen(false);}}
                    className="text-left text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
                  >
                    Đăng nhập
                  </button>
                  <button
                    onClick={() => {navigate('/register'); setMobileMenuOpen(false);}}
                    className="text-left text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                  >
                    Đăng ký
                  </button>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
