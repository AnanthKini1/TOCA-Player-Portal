import { motion } from 'framer-motion';

const glassCard: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.07)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  border: '1px solid rgba(255, 255, 255, 0.11)',
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.25)',
};

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease },
  },
};

function About() {
  return (
    <div className="max-w-5xl mx-auto">

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease }}
        className="mb-14"
      >
        <h1 className="text-6xl md:text-7xl font-bebas tracking-widest text-white mb-4 drop-shadow-lg">
          The Next Generation of{' '}
          <span style={{ color: '#4ADE80' }}>Soccer Training</span>
        </h1>
        <p className="text-lg text-white/85 font-inter leading-relaxed max-w-2xl">
          TOCA Football provides a one-of-a-kind, tech-enhanced soccer experience
          for players of all ages and skill levels.
        </p>
      </motion.div>

      {/* Section 1: Image LEFT — Text RIGHT */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="mb-8 rounded-2xl overflow-hidden"
        style={glassCard}
      >
        <div className="flex flex-col md:flex-row">

          {/* Image — LEFT */}
          <div className="md:w-5/12 flex-shrink-0 overflow-hidden">
            <motion.img
              src="/images/toca future.jpg"
              alt="Changing the Future of Soccer Training"
              className="w-full h-full object-cover"
              style={{ minHeight: '340px' }}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.6, ease }}
            />
          </div>

          {/* Text — RIGHT */}
          <div className="md:w-7/12 p-8 md:p-10 flex flex-col justify-center">
            <h2 className="text-4xl font-bebas tracking-widest text-white mb-5 leading-tight">
              Changing the{' '}
              <span style={{ color: '#4ADE80' }}>Future</span>{' '}
              of Soccer Training
            </h2>
            <p className="text-white/60 font-inter leading-relaxed mb-4 text-sm">
              Serving local communities throughout the United States and Canada, our
              training centers welcome players and families to find their best with
              classes, training sessions, and league play that meet players'
              respective skill-sets.
            </p>
            <p className="text-white/60 font-inter leading-relaxed mb-4 text-sm">
              Our soccer classes for ages 1 to 13 are engaging and educational,
              while individual or group training sessions for ages 7 onwards offer
              progressive levels of training for players looking to challenge
              themselves while also having fun.
            </p>
            <p className="text-white/60 font-inter leading-relaxed text-sm">
              From training sessions and group classes to camps, leagues, and more,
              TOCA offers community soccer experiences you won't find anywhere else!
            </p>
          </div>

        </div>
      </motion.section>

      {/* Section 2: Text LEFT — Image RIGHT */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="rounded-2xl overflow-hidden"
        style={glassCard}
      >
        <div className="flex flex-col md:flex-row-reverse">

          {/* Image — RIGHT (rendered first in DOM, placed right via flex-row-reverse) */}
          <div className="md:w-5/12 flex-shrink-0 overflow-hidden">
            <motion.img
              src="/images/toca eddie.jpg"
              alt="Eddie Lewis — TOCA Founder"
              className="w-full h-full object-cover"
              style={{ minHeight: '340px' }}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.6, ease }}
            />
          </div>

          {/* Text — LEFT */}
          <div className="md:w-7/12 p-8 md:p-10 flex flex-col justify-center">
            <h2 className="text-4xl font-bebas tracking-widest text-white mb-5 leading-tight">
              It All Started with a{' '}
              <span style={{ color: '#4ADE80' }}>Tennis Ball</span>{' '}
              and a Garage
            </h2>
            <p className="text-white/60 font-inter leading-relaxed mb-4 text-sm">
              When our founder, Eddie Lewis, was a soccer player at UCLA, he was
              obsessed with getting the most out of his abilities. After learning
              that the UCLA Basketball Team practiced shooting on smaller hoops, he
              realized he could achieve similar benefits by practicing his soccer
              touch with a smaller ball.
            </p>
            <p className="text-white/60 font-inter leading-relaxed mb-4 text-sm">
              He began taking reps with a tennis ball against garages to perfect his
              technique. This small-is-harder methodology made him better faster, and
              it was his secret weapon to outpacing the competition.
            </p>
            <p className="text-white/60 font-inter leading-relaxed mb-4 text-sm">
              Countless hours and thousands of reps later, he embarked on a career
              spanning from the MLS to the Premier League and two World Cups. At the
              end of his playing days, Eddie realized that he had established a
              unique set of fundamentals that he could pass on to others.
            </p>
            <p className="text-white/60 font-inter leading-relaxed text-sm">
              That led to the creation of the one-of-a-kind training experience and a
              soccer brand he wished he had growing up. Today, what started with a
              tennis ball has transformed into a world class soccer experience you
              won't find anywhere else.
            </p>
          </div>

        </div>
      </motion.section>

    </div>
  );
}

export default About;
