import { motion } from 'framer-motion';

export function CornerAccents() {
  return (
    <>
      <motion.div
        className="corner-accent top-left"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="corner-accent bottom-right"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
    </>
  );
}
