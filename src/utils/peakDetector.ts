import { binToFrequency } from "./frequencyConverter";

interface Peak {
  bin: number;
  amplitude: number;
}

export class PeakDetector {
  private sampleRate: number;
  private fftSize: number;
  private minFrequency: number;
  private maxFrequency: number;
  private peakThreshold: number;

  constructor(
    sampleRate: number,
    fftSize: number,
    minFrequency: number,
    maxFrequency: number,
    peakThreshold: number
  ) {
    this.sampleRate = sampleRate;
    this.fftSize = fftSize;
    this.minFrequency = minFrequency;
    this.maxFrequency = maxFrequency;
    this.peakThreshold = peakThreshold;
  }

  detectPeaks(spectrum: Float32Array): Peak[] {
    const peaks: Peak[] = [];
    const maxAmplitude = Math.max(...Array.from(spectrum));
    const threshold = maxAmplitude * this.peakThreshold;

    for (let i = 2; i < spectrum.length - 2; i++) {
      const current = spectrum[i];
      const isLocalMaximum =
        current > threshold &&
        current > spectrum[i - 1] &&
        current > spectrum[i - 2] &&
        current > spectrum[i + 1] &&
        current > spectrum[i + 2];

      if (isLocalMaximum) {
        const frequency = binToFrequency(i, this.sampleRate, this.fftSize);
        const isInMusicalRange =
          frequency >= this.minFrequency && frequency <= this.maxFrequency;

        if (isInMusicalRange) {
          peaks.push({ bin: i, amplitude: current });
        }
      }
    }

    return this.filterHarmonics(peaks);
  }

  private filterHarmonics(peaks: Peak[]): Peak[] {
    const filtered: Peak[] = [];

    for (const peak of peaks) {
      const frequency = binToFrequency(peak.bin, this.sampleRate, this.fftSize);
      let isFundamental = true;

      for (const existingPeak of filtered) {
        const existingFreq = binToFrequency(
          existingPeak.bin,
          this.sampleRate,
          this.fftSize
        );
        const ratio = frequency / existingFreq;
        const isHarmonic =
          Math.abs(ratio - Math.round(ratio)) < 0.1 && ratio > 1.5;

        if (isHarmonic) {
          isFundamental = false;
          break;
        }
      }

      if (isFundamental) {
        filtered.push(peak);
      }
    }

    return filtered;
  }
}
