import { motion } from 'framer-motion';
import './ModeSelector.css';

export type AnalysisMode = 'voice' | 'band';

interface ModeSelectorProps {
  mode: AnalysisMode;
  onChange: (mode: AnalysisMode) => void;
  isVisible: boolean;
}

export function ModeSelector({ mode, onChange, isVisible }: ModeSelectorProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      className="mode-selector"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <span className="mode-label">Mode:</span>
      <div className="mode-buttons">
        <button
          className={`mode-button ${mode === 'voice' ? 'active' : ''}`}
          onClick={() => onChange('voice')}
        >
          🎤 Voice
        </button>
        <button
          className={`mode-button ${mode === 'band' ? 'active' : ''}`}
          onClick={() => onChange('band')}
        >
          🎸 Band
        </button>
      </div>
      <div className="mode-description">
        {mode === 'voice' 
          ? 'Shows only the strongest note'
          : 'Shows multiple simultaneous notes'
        }
      </div>
    </motion.div>
  );
}
