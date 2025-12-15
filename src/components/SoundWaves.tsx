import { motion } from 'framer-motion';

export function SoundWaves() {
  return (
    <motion.div className="sound-waves">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="sound-wave"
          initial={{ scaleY: 0.3, opacity: 0 }}
          animate={{
            scaleY: [0.3, 1, 0.3],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}
    </motion.div>
  );
}
