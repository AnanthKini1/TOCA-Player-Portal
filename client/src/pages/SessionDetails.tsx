import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { TrainingSession } from '../types';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const glassBase: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.07)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  border: '1px solid rgba(255, 255, 255, 0.11)',
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.22)',
};

const glassHover: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.11)',
  border: '1px solid rgba(74, 222, 128, 0.28)',
  boxShadow: '0 10px 36px rgba(0, 0, 0, 0.32), 0 0 18px rgba(74, 222, 128, 0.07)',
};

const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.5,
      ease,
    },
  }),
};

function SessionDetails() {
  const { sessionId } = useParams();
  const [session, setSession] = useState<TrainingSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/sessions/${sessionId}`
        );
        const data = await response.json();
        setSession(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching session:', error);
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5">
        <div className="relative w-14 h-14">
          <div
            className="absolute inset-0 rounded-full"
            style={{ border: '3px solid rgba(74, 222, 128, 0.15)' }}
          />
          <div
            className="absolute inset-0 rounded-full animate-spin"
            style={{ border: '3px solid transparent', borderTopColor: '#4ADE80' }}
          />
        </div>
        <p className="text-white/40 font-inter text-xs tracking-[0.2em] uppercase">
          Loading session details...
        </p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] gap-5">
        <p className="text-red-400 font-inter">Session not found.</p>
        <Link to="/home">
          <motion.div
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            className="font-bebas tracking-widest text-base px-5 py-2 rounded-lg cursor-pointer"
            style={{
              background: 'rgba(74, 222, 128, 0.12)',
              border: '1px solid rgba(74, 222, 128, 0.3)',
              color: '#4ADE80',
            }}
          >
            ← BACK TO HOME
          </motion.div>
        </Link>
      </div>
    );
  }

  const stats = [
    { label: 'Score', value: session.score, accent: true },
    { label: 'Total Balls', value: session.numberOfBalls, accent: false },
    { label: 'Goals', value: session.numberOfGoals, accent: false },
    { label: 'Best Streak', value: session.bestStreak, accent: false },
    { label: 'Avg Speed of Play', value: session.avgSpeedOfPlay, accent: false },
    { label: 'Exercises', value: session.numberOfExercises, accent: false },
  ];

  return (
    <div>
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease }}
        className="mb-6"
      >
        <Link to="/home">
          <motion.div
            whileHover={{ scale: 1.04, x: -2 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 font-bebas tracking-widest text-base px-5 py-2 rounded-lg cursor-pointer"
            style={{
              background: 'rgba(74, 222, 128, 0.12)',
              border: '1px solid rgba(74, 222, 128, 0.3)',
              color: '#4ADE80',
            }}
          >
            ← BACK TO HOME
          </motion.div>
        </Link>
      </motion.div>

      {/* Session header card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.05, ease }}
        className="p-7 rounded-2xl mb-6"
        style={glassBase}
      >
        <h1 className="text-4xl font-bebas tracking-widest text-white mb-2">
          TRAINING SESSION
        </h1>
        <p className="text-white/45 font-inter text-sm mb-2">
          {new Date(session.startTime).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}{' '}
          at{' '}
          {new Date(session.startTime).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
          })}
        </p>
        <p className="font-bebas tracking-wider text-xl" style={{ color: '#4ADE80' }}>
          {session.trainerName}
        </p>
      </motion.div>

      {/* Stats grid — 2 cols on mobile, 3 on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={statVariants}
            whileHover={{ y: -3 }}
            className="p-6 rounded-xl transition-all duration-300"
            style={glassBase}
            onMouseEnter={(e) => Object.assign((e.currentTarget as HTMLElement).style, glassHover)}
            onMouseLeave={(e) => Object.assign((e.currentTarget as HTMLElement).style, glassBase)}
          >
            <p
              className="font-bebas tracking-widest text-sm mb-2"
              style={{ color: 'rgba(74, 222, 128, 0.75)' }}
            >
              {stat.label}
            </p>
            <p
              className="text-4xl font-bebas tracking-wider"
              style={{ color: stat.accent ? '#4ADE80' : 'white' }}
            >
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default SessionDetails;
