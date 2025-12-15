import { AudioContextManager } from "./audioContext";
import { PeakDetector } from "./peakDetector";
import { frequencyToNote, binToFrequency } from "./frequencyConverter";
import {
  type AudioAnalyzerConfig,
  DEFAULT_CONFIG,
  type DetectedNote,
} from "./audioConstants";

export type { DetectedNote };

export class AudioAnalyzer {
  private contextManager = new AudioContextManager();
  private peakDetector: PeakDetector;
  private config: AudioAnalyzerConfig;
  private isInitialized = false;

  constructor(config: Partial<AudioAnalyzerConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.peakDetector = new PeakDetector(
      this.config.sampleRate,
      this.config.fftSize,
      this.config.minFrequency,
      this.config.maxFrequency,
      this.config.peakThreshold
    );
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    this.isInitialized = true;
  }

  async startListening(): Promise<void> {
    if (!this.isInitialized) {
      throw new Error("AudioAnalyzer must be initialized before starting");
    }

    try {
      await this.contextManager.startListening(
        this.config.sampleRate,
        this.config.fftSize
      );
    } catch (error) {
      console.error("Error accessing microphone:", error);
      throw new Error("Microphone access denied or unavailable");
    }
  }

  stopListening(): void {
    this.contextManager.stopListening();
  }

  analyzeAudio(): DetectedNote[] {
    const analyser = this.contextManager.getAnalyser();
    if (!analyser) return [];

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    const volume = this.calculateVolume(dataArray);
    const isTooQuiet = volume < this.config.minVolume;
    if (isTooQuiet) return [];

    const floatArray = this.convertToFloatArray(dataArray);
    const peaks = this.peakDetector.detectPeaks(floatArray);
    const notes = this.peaksToNotes(peaks);

    notes.sort((a, b) => a.frequency - b.frequency);
    return notes;
  }

  private calculateVolume(dataArray: Uint8Array): number {
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      const normalized = dataArray[i] / 255.0;
      sum += normalized * normalized;
    }
    return Math.sqrt(sum / dataArray.length);
  }

  private convertToFloatArray(dataArray: Uint8Array): Float32Array {
    const floatArray = new Float32Array(dataArray.length);
    for (let i = 0; i < dataArray.length; i++) {
      floatArray[i] = dataArray[i] / 255.0;
    }
    return floatArray;
  }

  private peaksToNotes(
    peaks: Array<{ bin: number; amplitude: number }>
  ): DetectedNote[] {
    return peaks.map((peak) => {
      const frequency = binToFrequency(
        peak.bin,
        this.config.sampleRate,
        this.config.fftSize
      );
      const note = frequencyToNote(frequency);

      return {
        note,
        frequency,
        amplitude: peak.amplitude,
      };
    });
  }

  updateConfig(config: Partial<AudioAnalyzerConfig>): void {
    this.config = { ...this.config, ...config };
    const analyser = this.contextManager.getAnalyser();
    if (analyser) {
      analyser.fftSize = this.config.fftSize;
    }
  }

  setVolumeThreshold(threshold: number): void {
    this.config.minVolume = Math.max(0, Math.min(1, threshold));
  }

  getMostProminentNote(notes: DetectedNote[]): DetectedNote | null {
    if (notes.length === 0) return null;
    return notes.reduce((strongest, current) =>
      current.amplitude > strongest.amplitude ? current : strongest
    );
  }
}
