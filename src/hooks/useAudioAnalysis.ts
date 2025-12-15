import { useState, useEffect, useRef } from "react";
import { AudioAnalyzer, type DetectedNote } from "../utils/audioAnalyzer";
import type { AnalysisMode } from "../components/ModeSelector";

interface UseAudioAnalysisOptions {
  volumeThreshold: number;
  analysisMode: AnalysisMode;
  intervalMs?: number;
}

const DEFAULT_INTERVAL_MS = 300;
const MAX_DISPLAYED_NOTES = 12;
const NOTE_DISPLAY_DURATION_MS = 5000;

export function useAudioAnalysis({
  volumeThreshold,
  analysisMode,
  intervalMs = DEFAULT_INTERVAL_MS,
}: UseAudioAnalysisOptions) {
  const [isListening, setIsListening] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [detectedNotes, setDetectedNotes] = useState<DetectedNote[]>([]);
  const [error, setError] = useState<string | null>(null);

  const analyzerRef = useRef<AudioAnalyzer | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const isListeningRef = useRef<boolean>(false);
  const intervalBufferRef = useRef<DetectedNote[]>([]);
  const lastUpdateTimeRef = useRef<number>(0);
  const clearNotesTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const initAnalyzer = async () => {
      try {
        const analyzer = new AudioAnalyzer();
        await analyzer.initialize();
        analyzerRef.current = analyzer;
        setIsInitialized(true);
      } catch {
        setError("Failed to initialize audio analyzer");
      }
    };

    initAnalyzer();

    return () => {
      if (analyzerRef.current) {
        analyzerRef.current.stopListening();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (clearNotesTimeoutRef.current) {
        clearTimeout(clearNotesTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (analyzerRef.current) {
      analyzerRef.current.setVolumeThreshold(volumeThreshold);
    }
  }, [volumeThreshold]);

  const analyzeLoop = () => {
    if (!analyzerRef.current || !isListeningRef.current) {
      return;
    }

    const notes = analyzerRef.current.analyzeAudio();

    if (notes.length > 0) {
      intervalBufferRef.current.push(...notes);
    }

    // eslint-disable-next-line react-hooks/purity
    const currentTime = performance.now();
    const shouldUpdateDisplay =
      currentTime - lastUpdateTimeRef.current >= intervalMs;

    if (shouldUpdateDisplay) {
      // Only update if we have new notes detected in this interval
      if (intervalBufferRef.current.length > 0) {
        let notesToDisplay: DetectedNote[] = [];
        const isVoiceMode = analysisMode === "voice";

        if (isVoiceMode) {
          const mostProminent = analyzerRef.current.getMostProminentNote(
            intervalBufferRef.current
          );
          if (mostProminent) {
            notesToDisplay = [mostProminent];
          }
        } else {
          const noteMap = new Map<string, DetectedNote>();
          intervalBufferRef.current.forEach((note) => {
            const existing = noteMap.get(note.note);
            const shouldReplace =
              !existing || note.amplitude > existing.amplitude;
            if (shouldReplace) {
              noteMap.set(note.note, note);
            }
          });
          notesToDisplay = Array.from(noteMap.values())
            .sort((a, b) => b.amplitude - a.amplitude)
            .slice(0, MAX_DISPLAYED_NOTES)
            .sort((a, b) => a.frequency - b.frequency);
        }

        // Clear existing timeout when new notes are detected
        if (clearNotesTimeoutRef.current) {
          clearTimeout(clearNotesTimeoutRef.current);
          clearNotesTimeoutRef.current = null;
        }

        setDetectedNotes(notesToDisplay);

        // Set timeout to clear notes after 5 seconds if no new notes come in
        if (notesToDisplay.length > 0) {
          clearNotesTimeoutRef.current = window.setTimeout(() => {
            setDetectedNotes([]);
            clearNotesTimeoutRef.current = null;
          }, NOTE_DISPLAY_DURATION_MS);
        }
      }

      intervalBufferRef.current = [];
      lastUpdateTimeRef.current = currentTime;
    }

    animationFrameRef.current = requestAnimationFrame(analyzeLoop);
  };

  const toggleListening = async () => {
    if (!analyzerRef.current || !isInitialized) return;

    try {
      if (isListening) {
        isListeningRef.current = false;
        analyzerRef.current.stopListening();
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        if (clearNotesTimeoutRef.current) {
          clearTimeout(clearNotesTimeoutRef.current);
          clearNotesTimeoutRef.current = null;
        }
        setIsListening(false);
        setDetectedNotes([]);
        setError(null);
      } else {
        await analyzerRef.current.startListening();
        intervalBufferRef.current = [];
        lastUpdateTimeRef.current = performance.now();
        setError(null);
        isListeningRef.current = true;
        setIsListening(true);
        analyzeLoop();
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to access microphone"
      );
      setIsListening(false);
    }
  };

  return {
    isListening,
    isInitialized,
    detectedNotes,
    error,
    toggleListening,
  };
}
