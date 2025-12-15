export class AudioContextManager {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private microphone: MediaStreamAudioSourceNode | null = null;

  async startListening(
    sampleRate: number,
    fftSize: number
  ): Promise<AnalyserNode> {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
      },
    });

    this.audioContext = new AudioContext({ sampleRate });
    this.microphone = this.audioContext.createMediaStreamSource(stream);
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = fftSize;
    this.analyser.smoothingTimeConstant = 0.8;
    this.microphone.connect(this.analyser);

    return this.analyser;
  }

  stopListening(): void {
    if (this.microphone) {
      this.microphone.disconnect();
      this.microphone.mediaStream.getTracks().forEach((track) => track.stop());
      this.microphone = null;
    }

    if (this.analyser) {
      this.analyser.disconnect();
      this.analyser = null;
    }

    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }

  getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }
}
