import { motion } from 'framer-motion';
import type { DetectedNote } from '../utils/audioConstants';

interface NoteContentProps {
  note: DetectedNote;
  index: number;
}

export function NoteContent({ note, index }: NoteContentProps) {
  return (
    <div className="note-content">
      <motion.div
        className="note-name"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: 'reverse',
          delay: index * 0.1,
        }}
      >
        {note.note}
      </motion.div>

      <div className="note-frequency">
        {note.frequency.toFixed(1)} Hz
      </div>

      <div className="amplitude-bar-container">
        <motion.div
          className="amplitude-bar"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: note.amplitude }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </div>
  );
}
