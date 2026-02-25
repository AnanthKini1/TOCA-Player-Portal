import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Player, TrainingSession } from '../types';

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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease },
  }),
};

function Stats() {
  const getPlayerFromStorage = (): Player | null => {
    const playerString = sessionStorage.getItem('player');
    if (!playerString) return null;
    return JSON.parse(playerString);
  };

  const [player] = useState<Player | null>(() => getPlayerFromStorage());
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!player) {
      window.location.href = '/';
      return;
    }
    const fetchSessions = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/players/${player.id}/sessions`
        );
        const data = await response.json();
        setSessions(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sessions:', error);
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

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
          Loading stats...
        </p>
      </div>
    );
  }

  // ── Calculations ─────────────────────────────────────────────────────────

  const totalSessions = sessions.length;

  const avgScore =
    totalSessions > 0
      ? sessions.reduce((sum, s) => sum + s.score, 0) / totalSessions
      : null;

  const bestScore =
    totalSessions > 0 ? Math.max(...sessions.map((s) => s.score)) : null;

  // Performance trend — sessions are sorted most-recent first
  let trendLabel = 'Building History';
  let trendColor = '#94a3b8';
  let trendSubtitle = 'Need 4+ sessions';

  if (totalSessions >= 4) {
    const recent2avg =
      sessions.slice(0, 2).reduce((sum, s) => sum + s.score, 0) / 2;
    const prior2avg =
      sessions.slice(2, 4).reduce((sum, s) => sum + s.score, 0) / 2;
    const delta = recent2avg - prior2avg;

    if (delta > 2) {
      trendLabel = '↑ Improving';
      trendColor = '#4ADE80';
      trendSubtitle = `+${delta.toFixed(1)} points`;
    } else if (delta < -2) {
      trendLabel = '↓ Focus Area';
      trendColor = '#FBBF24';
      trendSubtitle = `${delta.toFixed(1)} points`;
    } else {
      trendLabel = '→ Steady';
      trendColor = '#60a5fa';
      trendSubtitle = 'Consistent performance';
    }
  }

  // Consistency — average days between consecutive sessions
  let consistencyLabel = 'Just Started';
  let consistencyColor = '#94a3b8';
  let consistencySubtitle = '';

  if (totalSessions >= 2) {
    let totalGapDays = 0;
    for (let i = 0; i < sessions.length - 1; i++) {
      const gapMs =
        new Date(sessions[i].startTime).getTime() -
        new Date(sessions[i + 1].startTime).getTime();
      totalGapDays += gapMs / (1000 * 60 * 60 * 24);
    }
    const avgGap = totalGapDays / (sessions.length - 1);

    if (avgGap <= 7) {
      consistencyLabel = '🔥 Very Consistent';
      consistencyColor = '#4ADE80';
      consistencySubtitle = 'Weekly training';
    } else if (avgGap <= 14) {
      consistencyLabel = '✓ Consistent';
      consistencyColor = '#60a5fa';
      consistencySubtitle = 'Bi-weekly training';
    } else if (avgGap <= 21) {
      consistencyLabel = '○ Occasional';
      consistencyColor = '#FBBF24';
      consistencySubtitle = 'Every 2-3 weeks';
    } else {
      consistencyLabel = 'Sporadic';
      consistencyColor = '#94a3b8';
      consistencySubtitle = 'Infrequent training';
    }
  }

  // Total training hours
  const totalHours = sessions.reduce((sum, s) => {
    const diffMs =
      new Date(s.endTime).getTime() - new Date(s.startTime).getTime();
    return sum + diffMs / (1000 * 60 * 60);
  }, 0);

  // ── Stat card definitions ─────────────────────────────────────────────────

  const stats = [
    {
      label: 'Total Sessions',
      value: totalSessions.toString(),
      subtitle: totalSessions === 1 ? 'session completed' : 'sessions completed',
      color: 'white',
      smallValue: false,
    },
    {
      label: 'Average Score',
      value: avgScore !== null ? avgScore.toFixed(1) : '—',
      subtitle: 'avg across all sessions',
      color: '#60a5fa',
      smallValue: false,
    },
    {
      label: 'Personal Best',
      value: bestScore !== null ? bestScore.toFixed(1) : '—',
      subtitle: 'highest score',
      color: '#4ADE80',
      smallValue: false,
    },
    {
      label: 'Performance',
      value: trendLabel,
      subtitle: trendSubtitle,
      color: trendColor,
      smallValue: false,
    },
    {
      label: 'Consistency',
      value: consistencyLabel,
      subtitle: consistencySubtitle,
      color: consistencyColor,
      smallValue: false,
    },
    {
      label: 'Training Hours',
      value: totalHours.toFixed(1),
      subtitle: 'total hours',
      color: 'white',
      smallValue: false,
    },
  ];

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease }}
        className="text-5xl md:text-6xl font-bebas tracking-widest text-white mb-12 drop-shadow-lg"
      >
        PLAYER{' '}
        <span style={{ color: '#4ADE80' }}>STATISTICS</span>
      </motion.h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ y: -3 }}
            className="p-6 rounded-xl transition-all duration-300"
            style={glassBase}
            onMouseEnter={(e) =>
              Object.assign((e.currentTarget as HTMLElement).style, glassHover)
            }
            onMouseLeave={(e) =>
              Object.assign((e.currentTarget as HTMLElement).style, glassBase)
            }
          >
            <p
              className="font-bebas tracking-widest text-sm mb-3"
              style={{ color: 'rgba(74, 222, 128, 0.75)' }}
            >
              {stat.label}
            </p>
            <p
              className="font-bebas tracking-wider leading-tight text-4xl"
              style={{ color: stat.color }}
            >
              {stat.value}
            </p>
            {stat.subtitle && (
              <p
                className="font-inter text-xs mt-2 capitalize"
                style={{ color: 'rgba(255, 255, 255, 0.4)' }}
              >
                {stat.subtitle}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Stats;
