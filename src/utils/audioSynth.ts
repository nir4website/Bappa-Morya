// Web Audio API Synthesizer for Authentic Handheld Pooja Ghanti, Maharashtrian Bhajan Brass Taal (टाळ), Temple Sounds and Aarti Melodies

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
 * Play Authentic Brass Bell / Taal - Single "Tong" Stroke (एकल खणखणीत 'टण...' नाद)
 * As requested: Exactly ONE single "tong" strike with immediate crisp brass clapper impact
 * and a serene, lingering singing resonance (झंकार).
 */
export function playBhajanTaal(volume: number = 0.85, _rhythmicPattern: boolean = false) {
  try {
    const ctx = getAudioContext();
    const startTime = ctx.currentTime;
    const safeVolume = Math.min(Math.max(volume, 0.1), 1.0);

    // Master bus with crisp, luminous brass EQ shaping
    const masterGain = ctx.createGain();
    const presenceFilter = ctx.createBiquadFilter();
    presenceFilter.type = 'peaking';
    presenceFilter.frequency.setValueAtTime(2600, startTime);
    presenceFilter.gain.setValueAtTime(3.0, startTime);
    presenceFilter.Q.setValueAtTime(1.0, startTime);

    masterGain.connect(presenceFilter);
    presenceFilter.connect(ctx.destination);

    // Single "Tong" Strike only:
    const strike = {
      velocity: 1.00,
      decay: 3.40 // Peaceful, lingering singing resonance
    };

    // Authentic resonant brass bell / taal fundamental (~1175 Hz / D6)
    const baseFundamental = 1174.66;
    const strikeVol = safeVolume * strike.velocity;

    // =========================================================================
    // 1. Physical Impact: Clean Brass "Tong" Attack Transient (खणखणीत टण आघात)
    // =========================================================================
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    clickOsc.type = 'triangle';
    clickOsc.frequency.setValueAtTime(2800, startTime);
    clickOsc.frequency.exponentialRampToValueAtTime(1175, startTime + 0.015);

    clickGain.gain.setValueAtTime(0.0001, startTime);
    clickGain.gain.linearRampToValueAtTime(0.24 * strikeVol, startTime + 0.001);
    clickGain.gain.exponentialRampToValueAtTime(0.00001, startTime + 0.022);

    clickOsc.connect(clickGain);
    clickGain.connect(masterGain);
    clickOsc.start(startTime);
    clickOsc.stop(startTime + 0.03);

    // Micro noise burst for authentic brass rim contact
    const bufferSize = Math.floor(ctx.sampleRate * 0.02);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    }
    const noiseSrc = ctx.createBufferSource();
    noiseSrc.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(2400, startTime);
    noiseFilter.Q.setValueAtTime(3.0, startTime);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.14 * strikeVol, startTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.02);

    noiseSrc.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);
    noiseSrc.start(startTime);

    // =========================================================================
    // 2. Pure Consonant Brass Bell Harmonics (एकच गोड, शांत, संथ झंकार)
    // =========================================================================
    const modalPartials = [
      // Deep soothing hum undertone (0.50x)
      { ratio: 0.50, gain: 0.35, decayMult: 3.2, detune: 0 },
      // Primary Strike Fundamental (1.00x) - Twin detuned waves for subtle natural shimmer
      { ratio: 1.00, gain: 0.90, decayMult: strike.decay, detune: -1.2 },
      { ratio: 1.00, gain: 0.85, decayMult: strike.decay * 0.98, detune: +1.5 },
      // Minor third tierce (1.19x) - classic brass bell characteristic
      { ratio: 1.19, gain: 0.42, decayMult: strike.decay * 0.80, detune: 0.5 },
      // Perfect fifth (1.50x) - sacred sweetness
      { ratio: 1.50, gain: 0.48, decayMult: strike.decay * 0.85, detune: -0.8 },
      // Super-octave (2.00x) - luminous clarity
      { ratio: 2.00, gain: 0.28, decayMult: strike.decay * 0.65, detune: 0.4 },
      // High brass shimmer mode (2.76x)
      { ratio: 2.76, gain: 0.16, decayMult: strike.decay * 0.45, detune: 0 }
    ];

    modalPartials.forEach((p) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFundamental * p.ratio, startTime);
      if (p.detune) {
        osc.detune.setValueAtTime(p.detune * 4, startTime);
      }

      const peakGain = p.gain * strikeVol * 0.36;
      const dur = p.decayMult;

      // Clean, soft 3ms rise avoids clicks while giving immediate crisp "tong" attack
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(peakGain, startTime + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.00001, startTime + dur);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(startTime);
      osc.stop(startTime + dur + 0.05);
    });

    // =========================================================================
    // 3. High Silvery Air Shimmer (हवेशीर झंकार)
    // =========================================================================
    const shimmerOsc = ctx.createOscillator();
    const shimmerFilter = ctx.createBiquadFilter();
    const shimmerGain = ctx.createGain();

    shimmerOsc.type = 'triangle';
    shimmerOsc.frequency.setValueAtTime(baseFundamental * 2.0, startTime);

    shimmerFilter.type = 'highpass';
    shimmerFilter.frequency.setValueAtTime(3600, startTime);

    shimmerGain.gain.setValueAtTime(0.0001, startTime);
    shimmerGain.gain.linearRampToValueAtTime(0.035 * strikeVol, startTime + 0.003);
    shimmerGain.gain.exponentialRampToValueAtTime(0.00001, startTime + 1.2);

    shimmerOsc.connect(shimmerFilter);
    shimmerFilter.connect(shimmerGain);
    shimmerGain.connect(masterGain);

    shimmerOsc.start(startTime);
    shimmerOsc.stop(startTime + 1.25);

  } catch (err) {
    console.warn('Bell audio could not be played:', err);
  }
}

/**
 * State tracking for Continuous House Puja Bell (घरगुती पूजा घंटी)
 */
let activeGhantiGain: GainNode | null = null;
let activeGhantiOscillators: OscillatorNode[] = [];
let activeGhantiTimer: ReturnType<typeof setTimeout> | null = null;

/**
 * Stop active continuous house puja bell ringing smoothly
 */
export function stopHousePujaGhanti() {
  if (activeGhantiTimer) {
    clearTimeout(activeGhantiTimer);
    activeGhantiTimer = null;
  }
  if (activeGhantiGain && audioCtx) {
    try {
      const now = audioCtx.currentTime;
      activeGhantiGain.gain.cancelScheduledValues(now);
      activeGhantiGain.gain.setValueAtTime(activeGhantiGain.gain.value, now);
      activeGhantiGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
      setTimeout(() => {
        activeGhantiOscillators.forEach(osc => {
          try { osc.stop(); } catch {}
        });
        activeGhantiOscillators = [];
        activeGhantiGain = null;
      }, 400);
    } catch {
      activeGhantiGain = null;
    }
  }
}

/**
 * Play Authentic Continuous House Puja Bell Sound "Ghanti" (घरगुती पूजा घंटी अखंड नाद)
 * Recreates the lively, continuous hand-ringing of a domestic brass puja ghanti
 * during daily aartis and rituals:
 * - Rapid alternating strikes (~6 strikes per second, oscillating left and right).
 * - Authentic domestic brass bell acoustic harmonics (fundamental ~1660 Hz).
 * - Overlapping singing resonance forming a continuous shimmering sound.
 * - Prolonged sweet trailing ring when the ringing slows down.
 */
export function playHousePujaGhantiContinuous(durationSeconds: number = 3.5, volume: number = 0.85) {
  try {
    stopHousePujaGhanti();
    const ctx = getAudioContext();
    const startTime = ctx.currentTime;
    const safeVolume = Math.min(Math.max(volume, 0.1), 1.0);

    const masterGain = ctx.createGain();
    
    // High-pass filter to ensure clear, silvery brass tone without mud
    const hpFilter = ctx.createBiquadFilter();
    hpFilter.type = 'highpass';
    hpFilter.frequency.setValueAtTime(450, startTime);

    // Presence peaking filter for that bright, sacred Indian brass ghanti presence
    const presenceFilter = ctx.createBiquadFilter();
    presenceFilter.type = 'peaking';
    presenceFilter.frequency.setValueAtTime(3200, startTime);
    presenceFilter.gain.setValueAtTime(4.5, startTime);
    presenceFilter.Q.setValueAtTime(1.2, startTime);

    masterGain.connect(hpFilter);
    hpFilter.connect(presenceFilter);
    presenceFilter.connect(ctx.destination);

    activeGhantiGain = masterGain;
    activeGhantiOscillators = [];

    // Master volume envelope: instant rise, sustained ringing, and a sweet natural trailing decay
    masterGain.gain.setValueAtTime(0.0001, startTime);
    masterGain.gain.linearRampToValueAtTime(safeVolume, startTime + 0.03);
    masterGain.gain.setValueAtTime(safeVolume, startTime + durationSeconds);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, startTime + durationSeconds + 2.0);

    // Domestic handheld brass ghanti base fundamental (~1660 Hz / G#6)
    const baseFreq = 1661.2;
    // Rhythmic cadence of human hand ringing: ~0.165s between strikes (approx 6 strikes/sec)
    const strikeInterval = 0.165;
    const totalStrikes = Math.max(Math.floor(durationSeconds / strikeInterval), 8);

    for (let i = 0; i < totalStrikes; i++) {
      const strikeTime = startTime + i * strikeInterval;
      // Slight natural human oscillation micro-variance
      const jitter = (Math.random() - 0.5) * 0.01;
      const t = Math.max(startTime, strikeTime + jitter);

      // Alternating left/right clapper strike inside the bell cup
      const isLeft = i % 2 === 0;
      const strikeFreq = isLeft ? baseFreq : baseFreq * 1.018; // ~30 cents micro-shift between sides
      const strikeVel = isLeft ? 0.96 : 0.88;

      // 1. Crisp brass clapper impact transient
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      clickOsc.type = 'triangle';
      clickOsc.frequency.setValueAtTime(3600, t);
      clickOsc.frequency.exponentialRampToValueAtTime(1660, t + 0.012);

      clickGain.gain.setValueAtTime(0.0001, t);
      clickGain.gain.linearRampToValueAtTime(0.18 * strikeVel, t + 0.001);
      clickGain.gain.exponentialRampToValueAtTime(0.00001, t + 0.018);

      clickOsc.connect(clickGain);
      clickGain.connect(masterGain);
      clickOsc.start(t);
      clickOsc.stop(t + 0.025);
      activeGhantiOscillators.push(clickOsc);

      // 2. Harmonic modal partials of the domestic brass bell cup
      // Decay of 0.42s overlaps continuously across strokes!
      // The final stroke rings out for 2.2s for a peaceful spiritual resolution
      const isLast = i === totalStrikes - 1;
      const decay = isLast ? 2.2 : 0.42;

      const partials = [
        { ratio: 0.50, gain: 0.28 }, // hum tone
        { ratio: 1.00, gain: 0.90 }, // fundamental
        { ratio: 1.19, gain: 0.42 }, // tierce
        { ratio: 1.50, gain: 0.48 }, // quint
        { ratio: 2.00, gain: 0.32 }, // nominal
        { ratio: 2.76, gain: 0.20 }, // silvery shimmer
      ];

      partials.forEach(p => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(strikeFreq * p.ratio, t);

        const peak = p.gain * strikeVel * 0.26;
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.linearRampToValueAtTime(peak, t + 0.002);
        gain.gain.exponentialRampToValueAtTime(0.00001, t + decay);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(t);
        osc.stop(t + decay + 0.05);
        activeGhantiOscillators.push(osc);
      });
    }

    activeGhantiTimer = setTimeout(() => {
      activeGhantiGain = null;
      activeGhantiOscillators = [];
    }, (durationSeconds + 2.2) * 1000);

  } catch (err) {
    console.warn('Continuous house puja ghanti audio could not be played:', err);
  }
}

/**
 * Play Single Brass Taal / Bell Stroke (एकल 'टण...' आघात)
 */
export function playTaalSingleStroke(volume: number = 0.85) {
  playBhajanTaal(volume, false);
}

/**
 * Universal Bell Sound Mappings
 */
export function playTempleBell(frequency: number = 784, volume: number = 0.85) {
  playBhajanTaal(volume, false);
}

/**
 * House Puja Bell Sound "Ghanti" - Continuous ringing
 */
export function playHandheldPoojaBell(durationSeconds: number = 3.5, volume: number = 0.85) {
  playHousePujaGhantiContinuous(durationSeconds, volume);
}

export function playTraditionalTempleBell(pitchFreq: number = 784, volume: number = 0.85) {
  playBhajanTaal(volume, false);
}

export function playGhantinaad(durationSeconds: number = 3.5, volume: number = 0.85) {
  playHousePujaGhantiContinuous(durationSeconds, volume);
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
export function playKartal(volume: number = 0.5) {
  playTaalSingleStroke(volume);
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
