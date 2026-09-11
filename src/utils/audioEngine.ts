/**
 * Cinematic Audio Engine
 * Supports local/remote MP3 playback with seamless fallback to
 * a built-in Web Audio API cinematic ambient drone synthesizer.
 * Provides real-time frequency analysis for animated audio equalizers.
 */

class CinematicAudioEngine {
  private audioCtx: AudioContext | null = null;
  private audioElement: HTMLAudioElement | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;

  // Synthesizer nodes
  private synthNodes: {
    oscillators: OscillatorNode[];
    gains: GainNode[];
    filter: BiquadFilterNode | null;
    lfo: OscillatorNode | null;
    lfoGain: GainNode | null;
    intervalId: number | null;
  } = {
    oscillators: [],
    gains: [],
    filter: null,
    lfo: null,
    lfoGain: null,
    intervalId: null
  };

  private isPlaying = false;
  private isMuted = false;
  private isUsingSynth = false;
  private volume = 0.7;
  private listeners: Array<(playing: boolean, muted: boolean, usingSynth: boolean) => void> = [];

  constructor() {
    // AudioContext will be initialized on first user gesture
  }

  private initContext() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();

      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.audioCtx.currentTime);

      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.85;

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.audioCtx.destination);
    }

    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  public subscribe(fn: (playing: boolean, muted: boolean, usingSynth: boolean) => void) {
    this.listeners.push(fn);
    fn(this.isPlaying, this.isMuted, this.isUsingSynth);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  private notify() {
    this.listeners.forEach(fn => fn(this.isPlaying, this.isMuted, this.isUsingSynth));
  }

  public async start(audioSrc?: string): Promise<boolean> {
    this.initContext();
    if (!this.audioCtx || !this.masterGain) return false;

    if (this.audioCtx.state === "suspended") {
      await this.audioCtx.resume();
    }

    // Try playing MP3 if audioSrc provided
    if (audioSrc) {
      try {
        const canPlay = await this.tryPlayAudioElement(audioSrc);
        if (canPlay) {
          this.isPlaying = true;
          this.isUsingSynth = false;
          this.notify();
          return true;
        }
      } catch (err) {
        console.warn("Could not load external audio file, falling back to ambient synthesizer:", err);
      }
    }

    // Fallback: start ambient cinematic synth
    this.startAmbientSynth();
    this.isPlaying = true;
    this.isUsingSynth = true;
    this.notify();
    return true;
  }

  private tryPlayAudioElement(src: string): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.audioElement) {
        this.audioElement = new Audio();
        this.audioElement.loop = true;
        this.audioElement.crossOrigin = "anonymous";

        try {
          if (this.audioCtx && this.masterGain) {
            const track = this.audioCtx.createMediaElementSource(this.audioElement);
            track.connect(this.masterGain);
          }
        } catch {
          // May fail if already connected
        }
      }

      this.audioElement.src = src;

      const onCanPlay = () => {
        cleanup();
        this.audioElement?.play()
          .then(() => resolve(true))
          .catch(() => resolve(false));
      };

      const onError = () => {
        cleanup();
        resolve(false);
      };

      const cleanup = () => {
        this.audioElement?.removeEventListener("canplaythrough", onCanPlay);
        this.audioElement?.removeEventListener("error", onError);
      };

      this.audioElement.addEventListener("canplaythrough", onCanPlay);
      this.audioElement.addEventListener("error", onError);

      this.audioElement.load();
      // Timeout after 1.5s so we don't delay the cinematic experience
      setTimeout(() => {
        cleanup();
        if (this.audioElement && !this.audioElement.paused) {
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1500);
    });
  }

  /**
   * Generates a warm, evocative cinematic atmospheric pad:
   * Root C2 (65.4Hz) + Fifth G2 (98Hz) + Minor Third Eb3 (155.6Hz) + Octave C3 (130.8Hz) + Bb3 (233Hz)
   * With gentle resonant low-pass filter modulated by a 0.08Hz LFO for breathing movement.
   */
  private startAmbientSynth() {
    this.stopAmbientSynth();
    if (!this.audioCtx || !this.masterGain) return;

    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    // Filter
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(320, now);
    filter.Q.setValueAtTime(2.5, now);

    // LFO for filter breathing
    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.setValueAtTime(0.08, now); // ~12 second slow breath cycle

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(140, now); // Modulates filter cutoff ±140Hz
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    // Cinematic chord notes (Frequencies in Hz: C2, G2, C3, Eb3, G3, Bb3)
    const chordFreqs = [65.41, 97.99, 130.81, 155.56, 196.0, 233.08];
    const oscillators: OscillatorNode[] = [];
    const gains: GainNode[] = [];

    chordFreqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      // Soft warmth using triangle and sine waves
      osc.type = i === 0 ? "sine" : (i % 2 === 0 ? "triangle" : "sine");
      // Subtle detune for rich analog chorusing effect
      osc.detune.setValueAtTime((i - 2.5) * 4, now);
      osc.frequency.setValueAtTime(freq, now);

      const gain = ctx.createGain();
      const targetGain = i === 0 ? 0.18 : (0.08 / (i + 1));
      gain.gain.setValueAtTime(0.0001, now);
      // Gentle fade-in over 3 seconds
      gain.gain.exponentialRampToValueAtTime(targetGain, now + 3.0);

      osc.connect(gain);
      gain.connect(filter);
      osc.start();

      oscillators.push(osc);
      gains.push(gain);
    });

    filter.connect(this.masterGain);

    // Subtle random high melodic shimmer every ~6 seconds
    const intervalId = window.setInterval(() => {
      if (!this.isPlaying || !this.isUsingSynth || !this.audioCtx || !this.masterGain) return;
      this.playHighShimmer();
    }, 6500);

    this.synthNodes = {
      oscillators,
      gains,
      filter,
      lfo,
      lfoGain,
      intervalId
    };
  }

  private playHighShimmer() {
    if (!this.audioCtx || !this.masterGain) return;
    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    // Pentatonic cinematic pitches: G4, Bb4, C5, D5, Eb5, G5
    const pitches = [392.0, 466.16, 523.25, 587.33, 622.25, 783.99];
    const pitch = pitches[Math.floor(Math.random() * pitches.length)];

    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(pitch, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.025, now + 1.2);
    gain.gain.exponentialRampToValueAtTime(0.00001, now + 5.0);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 5.1);
  }

  private stopAmbientSynth() {
    if (this.synthNodes.intervalId) {
      clearInterval(this.synthNodes.intervalId);
      this.synthNodes.intervalId = null;
    }

    const ctx = this.audioCtx;
    const now = ctx ? ctx.currentTime : 0;

    this.synthNodes.gains.forEach(g => {
      if (ctx) {
        try {
          g.gain.setValueAtTime(g.gain.value, now);
          g.gain.linearRampToValueAtTime(0.0001, now + 0.8);
        } catch {
          // ignore
        }
      }
    });

    setTimeout(() => {
      this.synthNodes.oscillators.forEach(o => {
        try { o.stop(); o.disconnect(); } catch { /* ignore */ }
      });
      this.synthNodes.lfo?.stop();
      this.synthNodes.lfo?.disconnect();
      this.synthNodes.filter?.disconnect();
      this.synthNodes.oscillators = [];
      this.synthNodes.gains = [];
    }, 900);
  }

  public pause() {
    if (this.audioElement && !this.audioElement.paused) {
      this.audioElement.pause();
    }
    this.stopAmbientSynth();
    this.isPlaying = false;
    this.notify();
  }

  public resume(audioSrc?: string) {
    if (this.isUsingSynth || !this.audioElement || !this.audioElement.src) {
      this.start(audioSrc);
    } else {
      this.audioElement.play().catch(() => {
        this.startAmbientSynth();
      });
      this.isPlaying = true;
      this.notify();
    }
  }

  public toggle(audioSrc?: string) {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.resume(audioSrc);
    }
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.audioCtx && this.masterGain) {
      const now = this.audioCtx.currentTime;
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(this.isMuted ? 0 : this.volume, now + 0.2);
    }
    this.notify();
  }

  public playWaxSealSound() {
    this.initContext();
    if (!this.audioCtx || !this.masterGain) return;
    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    // Authentic crisp wax seal snap: low thump + noise crackle
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.18);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  public getFrequencyData(): Uint8Array {
    if (!this.analyser) {
      return new Uint8Array(16);
    }
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);
    return dataArray;
  }

  public getPlaybackState() {
    return {
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      isUsingSynth: this.isUsingSynth,
      volume: this.volume
    };
  }
}

export const audioEngine = new CinematicAudioEngine();
