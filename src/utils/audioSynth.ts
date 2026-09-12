// Web Audio API Synthesizer for Authentic Handheld Pooja Ghanti, Temple Sounds and Aarti Melodies

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play Traditional Household Pooja Ghanti (घरगुती पितळी पूजा घंटी - ३ वेळा शांत व गोड नाद)
 * Recreates the authentic, soft, and melodious three-stroke ringing of a handheld brass bell
 * used in Indian household devghar/mandir during daily morning & evening puja.
 * Three gentle strikes (टण... टण... टणऽऽऽ) with mellow clapper touches and a peaceful, sweet singing resonance (झंकार).
 */
export function playTempleBell(frequency: number = 784, volume: number = 0.7) {
  playGhantinaad(frequency, volume);
}

export function playHandheldPoojaBell(baseFreq: number = 784, volume: number = 0.7) {
  playGhantinaad(baseFreq, volume);
}

export function playTraditionalTempleBell(pitchFreq: number = 784, volume: number = 0.7) {
  playGhantinaad(pitchFreq, volume);
}

export function playGhantinaad(pitchFreq: number = 784, volume: number = 0.7) {
  try {
    const ctx = getAudioContext();
    const startTime = ctx.currentTime;

    // Soothing, lower G5 tone (~784 Hz), deeply peaceful and melodious for home puja
    let fundamental = 784;
    if (pitchFreq && pitchFreq >= 650 && pitchFreq <= 950) {
      fundamental = pitchFreq;
    }

    const safeVolume = Math.min(Math.max(volume, 0.1), 0.9);

    // Warm, soft acoustic filtering to make the tone velvety, mellow, and free of any sharpness
    const masterGain = ctx.createGain();
    const warmMellowFilter = ctx.createBiquadFilter();
    warmMellowFilter.type = 'lowpass';
    warmMellowFilter.frequency.setValueAtTime(2900, startTime); // Velvet smooth brass cutoff
    warmMellowFilter.Q.setValueAtTime(0.5, startTime);

    masterGain.connect(warmMellowFilter);
    warmMellowFilter.connect(ctx.destination);

    // Household Pooja Ghanti: 3 gentle, melodious rings (टण... टण... टणऽऽऽ)
    // 1st: gentle stroke
    // 2nd: warm stroke slightly developing
    // 3rd: full peaceful strike with prolonged singing resonance (झंकार) lingering in the quiet home
    const strikes = [
      { delay: 0.00, velocity: 0.65, ringDecay: 1.40, pitchMod: 0.997 },
      { delay: 0.38, velocity: 0.75, ringDecay: 1.60, pitchMod: 1.003 },
      { delay: 0.80, velocity: 0.92, ringDecay: 4.80, pitchMod: 1.000 } // Sweet, peaceful lingering resonance
    ];

    strikes.forEach((strike, index) => {
      const strikeTime = startTime + strike.delay;
      const strikeFund = fundamental * strike.pitchMod;
      const isFinal = index === strikes.length - 1;

      // 1. Soft brass clapper contact touch (हलका लंबक स्पर्श - completely soft, rounded & non-piercing)
      const clapperOsc = ctx.createOscillator();
      const clapperFilter = ctx.createBiquadFilter();
      const clapperGain = ctx.createGain();

      clapperOsc.type = 'sine'; // Pure sine for smooth, soft, round tap
      clapperOsc.frequency.setValueAtTime(strikeFund * 1.5, strikeTime);
      clapperOsc.frequency.exponentialRampToValueAtTime(strikeFund * 1.05, strikeTime + 0.035);

      clapperFilter.type = 'bandpass';
      clapperFilter.frequency.setValueAtTime(strikeFund * 1.25, strikeTime);
      clapperFilter.Q.setValueAtTime(1.5, strikeTime);

      clapperGain.gain.setValueAtTime(0.0001, strikeTime);
      clapperGain.gain.linearRampToValueAtTime(0.08 * safeVolume * strike.velocity, strikeTime + 0.004);
      clapperGain.gain.exponentialRampToValueAtTime(0.00001, strikeTime + 0.04);

      clapperOsc.connect(clapperFilter);
      clapperFilter.connect(clapperGain);
      clapperGain.connect(masterGain);
      clapperOsc.start(strikeTime);
      clapperOsc.stop(strikeTime + 0.05);

      // 2. Sweet Devotional Ghanti Harmonics (घरगुती देवघरातील अत्यंत गोड, शांत संथ झंकार)
      // Highly melodious, consonant harmonic structure of an authentic solid brass home puja bell:
      // - Sub-octave hum tone (0.50x): creates the tranquil, reverent warmth of a pooja corner
      // - Twin fundamental tones (1.00x) with micro-detuning (0.8 Hz): delicate, slow undulating singing wave
      // - Minor third tierce (1.19x): gives pure authentic bell character without sharpness
      // - Pure consonant fifth (1.50x): infuses deep, sweet, comforting musicality
      // - Gentle octave (2.00x): soft, warm silvery chime, kept at low volume for sweetness
      const partials = [
        // Peaceful foundation hum
        { ratio: 0.50, gain: 0.38, decayMult: isFinal ? 4.2 : 1.1, detune: 0 },
        // Primary strike note (A)
        { ratio: 1.00, gain: 0.88, decayMult: strike.ringDecay, detune: -0.9 },
        // Twin strike note (B) - creates sweet, gentle slow beating
        { ratio: 1.00, gain: 0.82, decayMult: strike.ringDecay * 0.95, detune: +1.1 },
        // Minor third tierce (authentic brass character)
        { ratio: 1.19, gain: 0.38, decayMult: strike.ringDecay * 0.75, detune: 0.3 },
        // Pure fifth (sacred sweetness and soothing melody)
        { ratio: 1.50, gain: 0.42, decayMult: strike.ringDecay * 0.80, detune: -0.4 },
        // Super-octave (very soft, delicate presence)
        { ratio: 2.00, gain: 0.16, decayMult: isFinal ? 2.0 : 0.6, detune: 0.5 }
      ];

      partials.forEach(p => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(strikeFund * p.ratio, strikeTime);
        if (p.detune) {
          osc.detune.setValueAtTime(p.detune * 4, strikeTime);
        }

        const peakGain = p.gain * safeVolume * strike.velocity * 0.38;
        const dur = p.decayMult;

        // Soft 6ms linear rise eliminates any click or harsh transient
        gain.gain.setValueAtTime(0.0001, strikeTime);
        gain.gain.linearRampToValueAtTime(peakGain, strikeTime + 0.006);
        gain.gain.exponentialRampToValueAtTime(0.00001, strikeTime + dur);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(strikeTime);
        osc.stop(strikeTime + dur + 0.06);
      });
    });

  } catch (err) {
    console.warn('Ghantinaad audio could not be played:', err);
  }
}

/**
 * Play Shankha (शंख नाद - Divine Conch Sound)
 */
export function playShankha(duration: number = 3.5, volume: number = 0.6) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const fundamental = 220; // A3 base pitch
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    // Swell attack
    masterGain.gain.exponentialRampToValueAtTime(volume * 0.5, now + 0.8);
    masterGain.gain.setValueAtTime(volume * 0.5, now + duration - 1.0);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    masterGain.connect(ctx.destination);

    const harmonics = [1, 2, 3, 4, 5, 6];
    harmonics.forEach((h, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = idx % 2 === 0 ? 'sawtooth' : 'triangle';
      
      // Pitch modulation of blowing a conch
      osc.frequency.setValueAtTime(fundamental * h * 0.96, now);
      osc.frequency.exponentialRampToValueAtTime(fundamental * h * 1.03, now + 0.6);
      osc.frequency.setValueAtTime(fundamental * h * 1.0, now + 1.2);
      osc.frequency.exponentialRampToValueAtTime(fundamental * h * 0.94, now + duration);

      const amp = 0.5 / (h * 1.2);
      gain.gain.setValueAtTime(amp, now);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(now);
      osc.stop(now + duration);
    });
  } catch (err) {
    console.warn('Shankha audio error:', err);
  }
}

/**
 * Play Kartal / Taal Chime (झांज / टाळ)
 */
export function playKartal(volume: number = 0.4) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const highPass = ctx.createBiquadFilter();
    highPass.type = 'highpass';
    highPass.frequency.setValueAtTime(4500, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(volume * 0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    // Metallic shimmer
    [2400, 3600, 5200, 7800].forEach(f => {
      const osc = ctx.createOscillator();
      osc.type = 'square';
      osc.frequency.setValueAtTime(f, now);
      osc.connect(highPass);
      osc.start(now);
      osc.stop(now + 0.35);
    });

    highPass.connect(gain);
    gain.connect(ctx.destination);
  } catch (err) {
    console.warn('Kartal audio error:', err);
  }
}

/**
 * Background Devotional Tanpura Drone Generator
 */
class TanpuraDrone {
  private isRunning: boolean = false;
  private nodes: { osc: OscillatorNode; gain: GainNode }[] = [];
  private masterGain: GainNode | null = null;
  private intervalId: number | null = null;

  start(volume: number = 0.25) {
    if (this.isRunning) return;
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      this.masterGain = ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, now);
      this.masterGain.gain.exponentialRampToValueAtTime(volume * 0.3, now + 2.0);
      this.masterGain.connect(ctx.destination);

      // Pitch in D (Sa = 146.83 Hz, Pa = 220 Hz, High Sa = 293.66 Hz)
      const basePitches = [
        { freq: 220.0, label: 'Pa' },
        { freq: 293.66, label: 'Sa High 1' },
        { freq: 293.66 * 1.002, label: 'Sa High 2' },
        { freq: 146.83, label: 'Sa Low' }
      ];

      basePitches.forEach(p => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(p.freq, now);

        gain.gain.setValueAtTime(0.15, now);
        osc.connect(gain);
        gain.connect(this.masterGain!);
        osc.start(now);
        this.nodes.push({ osc, gain });
      });

      this.isRunning = true;
    } catch (err) {
      console.warn('Tanpura drone error:', err);
    }
  }

  setVolume(vol: number) {
    if (this.masterGain && audioCtx) {
      this.masterGain.gain.setValueAtTime(vol * 0.3, audioCtx.currentTime);
    }
  }

  stop() {
    if (!this.isRunning) return;
    try {
      if (this.masterGain && audioCtx) {
        const now = audioCtx.currentTime;
        this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.0);
      }
      setTimeout(() => {
        this.nodes.forEach(n => {
          try {
            n.osc.stop();
            n.osc.disconnect();
          } catch {}
        });
        this.nodes = [];
        this.isRunning = false;
        if (this.intervalId) {
          clearInterval(this.intervalId);
          this.intervalId = null;
        }
      }, 1000);
    } catch (err) {
      console.warn('Error stopping tanpura:', err);
    }
  }

  get active(): boolean {
    return this.isRunning;
  }
}

export const tanpuraPlayer = new TanpuraDrone();

/**
 * Melodic Aarti Player Synthesizer (Sukhakarta / Durge Durgat / Lavthavati / Ghalin Lotangan)
 */
export class AartiMelodyEngine {
  private isPlaying: boolean = false;
  private currentTrackId: string | null = null;
  private step: number = 0;
  private timer: number | null = null;
  private onStepChange?: (stepIndex: number) => void;
  private volume: number = 0.5;

  private sukhaMelody = [
    { note: 293.66, dur: 350 }, { note: 329.63, dur: 350 }, { note: 369.99, dur: 450 }, { note: 392.00, dur: 500 },
    { note: 440.00, dur: 400 }, { note: 392.00, dur: 400 }, { note: 369.99, dur: 600 },
    { note: 369.99, dur: 350 }, { note: 392.00, dur: 350 }, { note: 440.00, dur: 450 }, { note: 493.88, dur: 500 },
    { note: 440.00, dur: 400 }, { note: 369.99, dur: 400 }, { note: 329.63, dur: 350 }, { note: 293.66, dur: 650 },
    { note: 293.66, dur: 350 }, { note: 329.63, dur: 350 }, { note: 369.99, dur: 450 }, { note: 392.00, dur: 500 },
    { note: 440.00, dur: 400 }, { note: 392.00, dur: 400 }, { note: 369.99, dur: 600 },
    { note: 369.99, dur: 350 }, { note: 392.00, dur: 350 }, { note: 440.00, dur: 450 }, { note: 493.88, dur: 500 },
    { note: 440.00, dur: 400 }, { note: 369.99, dur: 400 }, { note: 329.63, dur: 350 }, { note: 293.66, dur: 700 },
    { note: 440.00, dur: 450 }, { note: 493.88, dur: 450 }, { note: 587.33, dur: 600 },
    { note: 587.33, dur: 400 }, { note: 493.88, dur: 400 }, { note: 440.00, dur: 400 }, { note: 392.00, dur: 600 },
    { note: 369.99, dur: 350 }, { note: 392.00, dur: 350 }, { note: 440.00, dur: 450 }, { note: 493.88, dur: 450 },
    { note: 440.00, dur: 400 }, { note: 369.99, dur: 400 }, { note: 329.63, dur: 350 }, { note: 293.66, dur: 800 }
  ];

  play(trackId: string, onStep?: (stepIndex: number) => void) {
    this.stop();
    this.currentTrackId = trackId;
    this.isPlaying = true;
    this.step = 0;
    this.onStepChange = onStep;

    tanpuraPlayer.start(this.volume * 0.6);
    this.scheduleNextNote();
  }

  private scheduleNextNote() {
    if (!this.isPlaying) return;

    const melody = this.sukhaMelody;
    const noteData = melody[this.step % melody.length];

    this.playTone(noteData.note, noteData.dur / 1000);

    // Periodic pooja bell tinkling or kartal beat
    if (this.step % 4 === 0) {
      playHandheldPoojaBell(820, this.volume * 0.35);
    } else if (this.step % 2 === 0) {
      playKartal(this.volume * 0.35);
    }

    if (this.onStepChange) {
      this.onStepChange(this.step);
    }

    this.step++;
    this.timer = window.setTimeout(() => {
      this.scheduleNextNote();
    }, noteData.dur);
  }

  private playTone(freq: number, dur: number) {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 1.002, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1600, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(this.volume * 0.3, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

      osc.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + dur);
      osc2.stop(now + dur);
    } catch (err) {
      console.warn('Tone play error:', err);
    }
  }

  setVolume(vol: number) {
    this.volume = vol;
    tanpuraPlayer.setVolume(vol);
  }

  stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    tanpuraPlayer.stop();
  }

  get playing(): boolean {
    return this.isPlaying;
  }

  get currentTrack(): string | null {
    return this.currentTrackId;
  }
}

export const aartiAudioEngine = new AartiMelodyEngine();
