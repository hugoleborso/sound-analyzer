import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudioAnalysis } from './hooks/useAudioAnalysis';
import { ListeningButton } from './components/ListeningButton';
import { VolumeSlider } from './components/VolumeSlider';
import { NotesDisplay } from './components/NotesDisplay';
import { ParticleEffect } from './components/ParticleEffect';
import { ModeSelector, type AnalysisMode } from './components/ModeSelector';
import { ANIMATION_DURATION } from './utils/animationConstants';
import './App.css';

const DEFAULT_VOLUME_THRESHOLD = 0.01;
const DEFAULT_ANALYSIS_MODE: AnalysisMode = 'band';
const UPDATE_INTERVAL_MS = 300;

function App() {
  const [volumeThreshold, setVolumeThreshold] = useState(DEFAULT_VOLUME_THRESHOLD);
  const [analysisMode, setAnalysisMode] = useState<AnalysisMode>(DEFAULT_ANALYSIS_MODE);
  
  const { isListening, isInitialized, detectedNotes, error, toggleListening } = useAudioAnalysis({
    volumeThreshold,
    analysisMode,
    intervalMs: UPDATE_INTERVAL_MS,
  });

  const getStatusText = () => {
    if (!isInitialized) return 'Initializing...';
    if (isListening) return 'Listening';
    return 'Ready';
  };

  return (
    <div className="app">
      <div className="background-gradient" />
      <ParticleEffect isListening={isListening} />

      <div className="container">
        <motion.h1
          className="title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATION.NORMAL, ease: 'easeOut' }}
        >
          Sound Analyzer
        </motion.h1>

        <motion.p
          className="subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: ANIMATION_DURATION.NORMAL }}
        >
          Real-time polyphonic pitch detection
        </motion.p>

        <AnimatePresence>
          {error && (
            <motion.div
              className="error-message"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              ⚠️ {error}
            </motion.div>
          )}
        </AnimatePresence>

        <ListeningButton
          isListening={isListening}
          isDisabled={!isInitialized}
          onClick={toggleListening}
        />

        <ModeSelector
          mode={analysisMode}
          onChange={setAnalysisMode}
          isVisible={!isListening}
        />

        <VolumeSlider
          value={volumeThreshold}
          onChange={setVolumeThreshold}
          isVisible={isListening}
        />

        <NotesDisplay notes={detectedNotes} isListening={isListening} />

        <motion.div
          className="status-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className={`status-dot ${isListening ? 'listening' : ''}`}
            animate={{
              scale: isListening ? [1, 1.2, 1] : 1,
              opacity: isListening ? [1, 0.7, 1] : 0.5,
            }}
            transition={{
              duration: ANIMATION_DURATION.SLOW,
              repeat: isListening ? Infinity : 0,
              ease: 'easeInOut',
            }}
          />
          <span className="status-text">{getStatusText()}</span>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
