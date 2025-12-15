import { motion } from 'framer-motion';

const PARTICLE_COUNT = 8;
const ORBIT_DURATION = 4;

export function OrbitingParticles() {
  return (
    <div className="orbit-container">
      {[...Array(PARTICLE_COUNT)].map((_, i) => (
        <motion.div
          key={i}
          className="orbit-particle"
          style={{
            '--orbit-angle': `${(i * 360) / PARTICLE_COUNT}deg`,
          } as React.CSSProperties}
          animate={{ rotate: 360 }}
          transition={{
            duration: ORBIT_DURATION,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 0.1,
          }}
        >
          <motion.div
            className="particle-dot"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.1,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
