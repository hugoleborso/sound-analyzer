import { NOTE_NAMES, A4_FREQUENCY, A4_MIDI_NUMBER } from "./audioConstants";

export function frequencyToNote(frequency: number): string {
  const midiNumber = Math.round(
    12 * Math.log2(frequency / A4_FREQUENCY) + A4_MIDI_NUMBER
  );
  const octave = Math.floor(midiNumber / 12) - 1;
  const noteIndex = midiNumber % 12;
  const noteName = NOTE_NAMES[noteIndex];
  return `${noteName}${octave}`;
}

export function binToFrequency(
  bin: number,
  sampleRate: number,
  fftSize: number
): number {
  return (bin * sampleRate) / fftSize;
}
