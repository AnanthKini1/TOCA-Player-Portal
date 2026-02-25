import { Link, useNavigate, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

const navButtonStyle: React.CSSProperties = {
  background: 'rgba(22, 163, 74, 0.2)',
  border: '1px solid rgba(74, 222, 128, 0.4)',
  color: '#4ADE80',
  boxShadow: '0 0 12px rgba(74, 222, 128, 0.08)',
};

function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('player');
    navigate('/');
  };

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: "url('/images/TOCA Background.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Subtle dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />

      {/* Header */}
      <header
        className="relative z-50 sticky top-0"
        style={{
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        {/* 4 items spread evenly: Logo | About TOCA | Profile | Logout */}
        <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* 1. Logo — TOP LEFT → /home */}
          <Link to="/home">
            <motion.img
              src="/images/toca logo.png"
              alt="TOCA"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="h-10 object-contain cursor-pointer"
            />
          </Link>

          {/* 2. About TOCA */}
          <Link to="/about">
            <motion.div
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              className="font-bebas tracking-widest text-base px-5 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
              style={navButtonStyle}
            >
              ABOUT TOCA
            </motion.div>
          </Link>

          {/* 3. Profile */}
          <Link to="/profile">
            <motion.div
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              className="font-bebas tracking-widest text-base px-5 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
              style={navButtonStyle}
            >
              PROFILE
            </motion.div>
          </Link>

          {/* 4. Stats */}
          <Link to="/stats">
            <motion.div
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              className="font-bebas tracking-widest text-base px-5 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
              style={navButtonStyle}
            >
              STATS
            </motion.div>
          </Link>

          {/* 5. Logout — TOP RIGHT */}
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            className="font-bebas tracking-widest text-base px-5 py-2 rounded-lg transition-colors duration-200"
            style={{
              background: 'rgba(74, 222, 128, 0.15)',
              border: '1px solid rgba(74, 222, 128, 0.35)',
              color: '#86efac',
            }}
          >
            LOGOUT
          </motion.button>

        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 max-w-screen-2xl mx-auto px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
