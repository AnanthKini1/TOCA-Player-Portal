import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Player, TrainingSession, Appointment } from '../types';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

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

function Home() {
  const getPlayerFromStorage = (): Player | null => {
    const playerString = sessionStorage.getItem('player');
    if (!playerString) return null;
    return JSON.parse(playerString);
  };

  const [player] = useState<Player | null>(() => getPlayerFromStorage());
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (playerId: string) => {
    try {
      // Fetch training sessions
      const sessionsResponse = await fetch(
        `http://localhost:3000/api/players/${playerId}/sessions`
      );
      const sessionsData = await sessionsResponse.json();
      setSessions(sessionsData);

      // Fetch appointments
      const appointmentsResponse = await fetch(
        `http://localhost:3000/api/players/${playerId}/appointments`
      );
      const appointmentsData = await appointmentsResponse.json();
      setAppointments(appointmentsData);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!player) {
      // No player found - shouldn't happen, but redirect to sign in
      window.location.href = '/';
      return;
    }

    // Fetch sessions and appointments
    fetchData(player.id);
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
          Loading your data...
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Welcome heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="text-5xl md:text-6xl font-bebas tracking-widest text-white mb-12 drop-shadow-lg"
      >
        WELCOME BACK,{' '}
        <span style={{ color: '#4ADE80' }}>{player?.firstName?.toUpperCase()}</span>!
      </motion.h1>

      {/* Past Training Sessions */}
      <section className="mb-14">
        <motion.h2
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl font-bebas tracking-widest text-white mb-6"
        >
          PAST TRAINING SESSIONS
        </motion.h2>

        <div className="grid gap-4">
          {sessions.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white/40 font-inter"
            >
              No past sessions found.
            </motion.p>
          ) : (
            sessions.map((session, i) => (
              <motion.div
                key={session.id}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              >
                <Link to={`/sessions/${session.id}`} className="block">
                  <div
                    className="p-6 rounded-xl transition-all duration-300"
                    style={glassBase}
                    onMouseEnter={(e) => Object.assign((e.currentTarget as HTMLElement).style, glassHover)}
                    onMouseLeave={(e) => Object.assign((e.currentTarget as HTMLElement).style, glassBase)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bebas tracking-wider text-xl text-white mb-1">
                          {session.trainerName}
                        </h3>
                        <p className="text-white/45 font-inter text-sm">
                          {new Date(session.startTime).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}{' '}
                          at{' '}
                          {new Date(session.startTime).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0 ml-6">
                        <p
                          className="text-4xl font-bebas tracking-wider"
                          style={{ color: '#4ADE80' }}
                        >
                          {session.score}
                        </p>
                        <p className="text-white/35 font-inter text-xs uppercase tracking-widest">
                          Score
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* Upcoming Appointments */}
      <section>
        <motion.h2
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-3xl font-bebas tracking-widest text-white mb-6"
        >
          UPCOMING APPOINTMENTS
        </motion.h2>

        <div className="grid gap-4">
          {appointments.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white/40 font-inter"
            >
              No upcoming appointments.
            </motion.p>
          ) : (
            appointments.map((appointment, i) => (
              <motion.div
                key={appointment.id}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                className="p-6 rounded-xl transition-all duration-300"
                style={glassBase}
                onMouseEnter={(e) => Object.assign((e.currentTarget as HTMLElement).style, glassHover)}
                onMouseLeave={(e) => Object.assign((e.currentTarget as HTMLElement).style, glassBase)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bebas tracking-wider text-xl text-white mb-1">
                      {appointment.trainerName}
                    </h3>
                    <p className="text-white/45 font-inter text-sm">
                      {new Date(appointment.startTime).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}{' '}
                      at{' '}
                      {new Date(appointment.startTime).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div
                    className="flex-shrink-0 ml-6 px-3 py-1 rounded-full font-inter text-xs uppercase tracking-widest"
                    style={{
                      background: 'rgba(74, 222, 128, 0.12)',
                      border: '1px solid rgba(74, 222, 128, 0.3)',
                      color: '#4ADE80',
                    }}
                  >
                    Upcoming
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
