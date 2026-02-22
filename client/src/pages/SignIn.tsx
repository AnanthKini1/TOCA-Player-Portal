import { useState } from 'react';
import type { Player } from '../types';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function SignIn() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/api/players/email/${email}`);

      if (!response.ok) {
        setError('Email not registered. Please check and try again.');
        setLoading(false);
        return;
      }

      const player: Player = await response.json();
      console.log('Player found:', player);

      sessionStorage.setItem('player', JSON.stringify(player));

      navigate('/home');

    } catch (err) {
      console.error('Error:', err);
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: "url('/images/Toca Background 2.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 flex flex-col items-center w-full px-4">
        {/* Title slides in from top */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-white text-6xl md:text-7xl font-bebas tracking-widest mb-12 text-center drop-shadow-2xl"
        >
          TOCA PLAYER PORTAL
        </motion.h1>

        {/* Card fades in and scales up */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md rounded-2xl p-10"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        >
          <h2 className="text-white/90 text-xl font-inter font-semibold mb-8 text-center tracking-wide">
            Sign In to Your Account
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-white/60 text-sm font-inter font-medium mb-2 tracking-wide uppercase">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl font-inter text-white placeholder-white/30 outline-none transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.07)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  fontSize: '15px',
                }}
                placeholder="your.email@example.com"
                required
                onFocus={(e) => {
                  e.target.style.border = '1px solid rgba(74, 222, 128, 0.55)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.11)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(74, 222, 128, 0.12)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '1px solid rgba(255, 255, 255, 0.12)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.07)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-5 p-3 rounded-xl font-inter text-sm"
                style={{
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#fca5a5',
                }}
              >
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={loading ? {} : { scale: 1.02, y: -2 }}
              whileTap={loading ? {} : { scale: 0.98 }}
              className="w-full py-3.5 rounded-xl font-bebas text-xl tracking-widest transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
                color: 'white',
                boxShadow: loading ? 'none' : '0 6px 20px rgba(34, 197, 94, 0.35)',
              }}
            >
              {loading ? 'SIGNING IN...' : 'SIGN IN'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default SignIn;
