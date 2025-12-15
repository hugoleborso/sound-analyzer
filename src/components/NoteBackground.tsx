import { motion } from 'framer-motion';
import { ANIMATION_DURATION, GRADIENT_COLORS } from '../utils/animationConstants';

interface NoteBackgroundProps {
  index: number;
}

export function NoteBackground({ index }: NoteBackgroundProps) {
  return (
    <motion.div
      className="note-background"
      animate={{
        background: [
          GRADIENT_COLORS.PRIMARY,
          GRADIENT_COLORS.SECONDARY,
          GRADIENT_COLORS.PRIMARY,
        ],
      }}
      transition={{
        duration: ANIMATION_DURATION.GRADIENT,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: index * 0.2,
      }}
    />
  );
}
