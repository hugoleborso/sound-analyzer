import { motion } from 'framer-motion';
import { ANIMATION_DURATION, GRADIENT_COLORS } from '../utils/animationConstants';

interface ValueDisplayProps {
  percentage: string;
}

export function ValueDisplay({ percentage }: ValueDisplayProps) {
  return (
    <motion.div
      className="value-display"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
    >
      <motion.div
        className="value-background"
        animate={{
          background: [
            GRADIENT_COLORS.PRIMARY,
            GRADIENT_COLORS.ALTERNATE,
            GRADIENT_COLORS.PRIMARY,
          ],
        }}
        transition={{
          duration: ANIMATION_DURATION.GRADIENT,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <span className="value-text">{percentage}%</span>
    </motion.div>
  );
}
