import { motion } from 'framer-motion';

const ORBIT_DOT_COUNT = 3;

export function NoteOrbits() {
  return (
    <div className="note-orbit">
      {[...Array(ORBIT_DOT_COUNT)].map((_, i) => (
        <motion.div
          key={i}
          className="orbit-dot"
          style={{
            '--orbit-delay': `${i * 0.3}s`,
          } as React.CSSProperties}
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 0.3,
          }}
        >
          <motion.div
            className="dot"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
