import { motion } from 'framer-motion';
import { ANIMATION_DURATION } from '../utils/animationConstants';

export function ListeningIndicator() {
  return (
    <motion.div
      className="no-notes-message"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <motion.div
        className="listening-indicator"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: ANIMATION_DURATION.SLOW,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        🎵
      </motion.div>
      <p>Play or sing something...</p>
    </motion.div>
  );
}
