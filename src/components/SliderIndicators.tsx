import { motion } from 'framer-motion';

const INDICATOR_POSITIONS = [0, 0.25, 0.5, 0.75, 1];

interface SliderIndicatorsProps {
  currentValue: number;
}

export function SliderIndicators({ currentValue }: SliderIndicatorsProps) {
  return (
    <div className="slider-indicators">
      {INDICATOR_POSITIONS.map((position, index) => {
        const isActive = currentValue >= position;
        return (
          <motion.div
            key={position}
            className={`indicator ${isActive ? 'active' : ''}`}
            style={{ left: `${position * 100}%` }}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.05 }}
          >
            <motion.div
              className="indicator-dot"
              animate={{
                scale: isActive ? [1, 1.3, 1] : 1,
              }}
              transition={{
                duration: 1,
                repeat: isActive ? Infinity : 0,
                ease: 'easeInOut',
                delay: index * 0.1,
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
