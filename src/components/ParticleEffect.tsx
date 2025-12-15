import { motion, AnimatePresence } from 'framer-motion';

interface ParticleConfig {
  x: number;
  y: number;
  duration: number;
  delay: number;
}

// Generate particle configurations once at module level
const particleConfigs: ParticleConfig[] = Array.from({ length: 20 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: 3 + Math.random() * 2,
  delay: Math.random() * 2,
}));

interface ParticleEffectProps {
  isListening: boolean;
}

export function ParticleEffect({ isListening }: ParticleEffectProps) {
  return (
    <AnimatePresence>
      {isListening && (
        <motion.div
          className="particles-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {particleConfigs.map((config, i) => (
            <motion.div
              key={i}
              className="particle"
              initial={{
                x: '50vw',
                y: '50vh',
                scale: 0,
              }}
              animate={{
                x: `${config.x}vw`,
                y: `${config.y}vh`,
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: config.duration,
                repeat: Infinity,
                delay: config.delay,
                ease: 'easeOut',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
