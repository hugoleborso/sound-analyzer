import type { DetectedNote } from '../utils/audioConstants';
import { NoteBackground } from './NoteBackground';
import { NoteContent } from './NoteContent';
import { NoteOrbits } from './NoteOrbits';
import { CornerAccents } from './CornerAccents';

interface NoteCardProps {
  note: DetectedNote;
  index: number;
}

export function NoteCard({ note, index }: NoteCardProps) {
  return (
    <div className="note-card">
      <NoteBackground index={index} />
      <NoteContent note={note} index={index} />
      <NoteOrbits />
      <CornerAccents />
    </div>
  );
}
