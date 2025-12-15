import { motion } from 'framer-motion';

interface ButtonRingsProps {
  isListening: boolean;
}

interface RingConfig {
  duration: number;
  rotationDuration: number;
  delay: number;
  direction: number;
}

const RING_CONFIGS: RingConfig[] = [
  { duration: 2, rotationDuration: 3, delay: 0, direction: 1 },
  { duration: 2.5, rotationDuration: 4, delay: 0.5, direction: -1 },
  { duration: 3, rotationDuration: 5, delay: 1, direction: 1 },
];

export function ButtonRings({ isListening }: ButtonRingsProps) {
  return (
    <>
      {RING_CONFIGS.map((config, index) => (
        <motion.div
          key={index}
          className={`button-ring ring-${index + 1}`}
          animate={{
            rotate: isListening ? 360 * config.direction : 0,
            scale: isListening ? [1, 1.1 + index * 0.05, 1] : 1,
          }}
          transition={{
            rotate: {
              duration: config.rotationDuration,
              repeat: isListening ? Infinity : 0,
              ease: 'linear',
            },
            scale: {
              duration: config.duration,
              repeat: isListening ? Infinity : 0,
              ease: 'easeInOut',
              delay: config.delay,
            },
          }}
        />
      ))}
    </>
  );
}
