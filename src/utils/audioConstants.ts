export const NOTE_NAMES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

export const A4_FREQUENCY = 440;
export const A4_MIDI_NUMBER = 69;

export const A1_FREQUENCY = 55;
export const C8_FREQUENCY = 4186;

export interface AudioAnalyzerConfig {
  fftSize: number;
  minVolume: number;
  sampleRate: number;
  minFrequency: number;
  maxFrequency: number;
  peakThreshold: number;
}

export const DEFAULT_CONFIG: AudioAnalyzerConfig = {
  fftSize: 4096,
  minVolume: 0.01,
  sampleRate: 44100,
  minFrequency: A1_FREQUENCY,
  maxFrequency: C8_FREQUENCY,
  peakThreshold: 0.3,
};

export interface DetectedNote {
  note: string;
  frequency: number;
  amplitude: number;
}
