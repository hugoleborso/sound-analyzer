import type { DetectedNote } from '../utils/audioConstants';
import { NoteCard } from './NoteCard';
import { ListeningIndicator } from './ListeningIndicator';
import './NotesDisplay.css';

interface NotesDisplayProps {
  notes: DetectedNote[];
  isListening: boolean;
}

export function NotesDisplay({ notes, isListening }: NotesDisplayProps) {
  const hasNotes = notes.length > 0;

  return (
    <div className="notes-display-container">
      {isListening && (
        <div className="notes-wrapper">
          {hasNotes ? (
            <div className="notes-grid">
              {notes.map((note, index) => (
                <NoteCard key={note.note} note={note} index={index} />
              ))}
            </div>
          ) : (
            <ListeningIndicator />
          )}
        </div>
      )}
    </div>
  );
}
