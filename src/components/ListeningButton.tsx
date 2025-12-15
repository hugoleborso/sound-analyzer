import { motion } from 'framer-motion';
import { ButtonRings } from './ButtonRings';
import { MicrophoneIcon } from './MicrophoneIcon';
import { SoundWaves } from './SoundWaves';
import { OrbitingParticles } from './OrbitingParticles';
import './ListeningButton.css';

interface ListeningButtonProps {
  isListening: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

const BOX_SHADOW_ANIMATION = {
  listening: [
    '0 0 0 0 rgba(139, 92, 246, 0)',
    '0 0 0 20px rgba(139, 92, 246, 0)',
    '0 0 0 0 rgba(139, 92, 246, 0)',
  ],
  idle: '0 8px 32px rgba(0, 0, 0, 0.3)',
};

export function ListeningButton({ isListening, isDisabled, onClick }: ListeningButtonProps) {
  const buttonLabel = isListening ? 'Listening...' : 'Start Listening';

  return (
    <div className="listening-button-wrapper">
      <motion.button
        className={`listening-button ${isListening ? 'active' : ''}`}
        onClick={onClick}
        disabled={isDisabled}
        whileHover={{ scale: isDisabled ? 1 : 1.05 }}
        whileTap={{ scale: isDisabled ? 1 : 0.95 }}
        animate={{
          boxShadow: isListening ? BOX_SHADOW_ANIMATION.listening : BOX_SHADOW_ANIMATION.idle,
        }}
        transition={{
          boxShadow: {
            duration: 1.5,
            repeat: isListening ? Infinity : 0,
            ease: 'easeOut',
          },
        }}
      >
        <ButtonRings isListening={isListening} />

        <motion.div
          className="button-content"
          animate={{ scale: isListening ? [1, 1.05, 1] : 1 }}
          transition={{
            duration: 2,
            repeat: isListening ? Infinity : 0,
            ease: 'easeInOut',
          }}
        >
          <MicrophoneIcon isListening={isListening} />
          {isListening && <SoundWaves />}
        </motion.div>

        <motion.span
          className="button-label"
          animate={{ opacity: isListening ? [1, 0.7, 1] : 1 }}
          transition={{
            duration: 2,
            repeat: isListening ? Infinity : 0,
            ease: 'easeInOut',
          }}
        >
          {buttonLabel}
        </motion.span>
      </motion.button>

      {isListening && <OrbitingParticles />}
    </div>
  );
}
