import { useState } from 'react';
import type { Player } from '../types';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fieldVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.45,
      ease,
    },
  }),
};

function Profile() {
  const getPlayerFromStorage = (): Player | null => {
    const playerString = sessionStorage.getItem('player');
    if (!playerString) return null;
    return JSON.parse(playerString);
  };

  const [player] = useState<Player | null>(() => getPlayerFromStorage());

  if (!player) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400 font-inter">No player data found.</p>
      </div>
    );
  }

  const initials = `${player.firstName[0]}${player.lastName[0]}`.toUpperCase();

  const fields = [
    { label: 'First Name', value: player.firstName },
    { label: 'Last Name', value: player.lastName },
    { label: 'Email', value: player.email },
    { label: 'Phone', value: player.phone },
    { label: 'Gender', value: player.gender },
    { label: 'Date of Birth', value: new Date(player.dob).toLocaleDateString() },
    { label: 'Training Center', value: player.centerName },
    { label: 'Member Since', value: new Date(player.createdAt).toLocaleDateString() },
  ];

  return (
    <div className="max-w-2xl mx-auto">

      {/* Page title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="text-5xl font-bebas tracking-widest text-white mb-8 drop-shadow-lg"
      >
        PLAYER PROFILE
      </motion.h1>

      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.1, ease }}
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.07)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: '1px solid rgba(255, 255, 255, 0.11)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.28)',
        }}
      >

        {/* Blue gradient header — preserves the original blue identity */}
        <div
          className="p-8 flex items-center gap-5"
          style={{
            background: 'linear-gradient(135deg, rgba(22, 163, 74, 0.45) 0%, rgba(10, 70, 30, 0.65) 100%)',
            borderBottom: '1px solid rgba(74, 222, 128, 0.15)',
          }}
        >
          {/* Avatar circle with initials */}
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: '2px solid rgba(255, 255, 255, 0.28)',
            }}
          >
            <span className="font-bebas tracking-wider text-white text-2xl">
              {initials}
            </span>
          </div>

          <div>
            <h2 className="font-bebas tracking-widest text-3xl text-white leading-tight">
              {player.firstName} {player.lastName}
            </h2>
            <p className="font-inter text-sm mt-0.5" style={{ color: 'rgba(134, 239, 172, 0.7)' }}>
              {player.email}
            </p>
          </div>
        </div>

        {/* Info grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {fields.map((field, i) => (
              <motion.div
                key={field.label}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fieldVariants}
                className="p-4 rounded-xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <p className="font-bebas tracking-widest text-sm mb-1.5" style={{ color: 'rgba(74, 222, 128, 0.7)' }}>
                  {field.label}
                </p>
                <p className="text-white font-inter font-medium text-base">
                  {field.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </motion.div>
    </div>
  );
}

export default Profile;
