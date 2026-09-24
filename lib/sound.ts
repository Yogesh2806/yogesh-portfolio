// Tiny synthesized sound kit: no audio files, everything is generated with the Web Audio API.
// Sounds stay silent until the visitor's first click (browsers require a gesture anyway),
// then switch on automatically unless the visitor muted them before (remembered per browser).

type Name = "hover" | "click" | "pop" | "swish" | "whoosh" | "chime" | "tick" | "paper";

const KEY = "yj-sound";

class SoundKit {
  ctx: AudioContext | null = null;
  master: GainNode | null = null;
  noise: AudioBuffer | null = null;
  windSrc: AudioBufferSourceNode | null = null;
  windGain: GainNode | null = null;
  windFilter: BiquadFilterNode | null = null;
  enabled = false;
  unlocked = false;
  last: Record<string, number> = {};
  listeners = new Set<(on: boolean) => void>();

  get mutedByUser() {
    try { return localStorage.getItem(KEY) === "off"; } catch { return false; }
  }

  unlock() {
    if (this.unlocked || typeof window === "undefined") return;
    this.unlocked = true;
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.9;
    const comp = this.ctx.createDynamicsCompressor();
    this.master.connect(comp).connect(this.ctx.destination);
    // one second of white noise, reused by every noisy sound
    const len = this.ctx.sampleRate;
    this.noise = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const d = this.noise.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    if (!this.mutedByUser) this.set(true, false);
  }

  set(on: boolean, remember = true) {
    this.enabled = on;
    if (remember) { try { localStorage.setItem(KEY, on ? "on" : "off"); } catch {} }
    if (on && this.ctx?.state === "suspended") this.ctx.resume();
    if (!on) this.wind(0);
    this.listeners.forEach((l) => l(on));
    if (on && remember) this.play("chime");
  }

  toggle() {
    if (!this.unlocked) this.unlock();
    this.set(!this.enabled);
  }

  onChange(fn: (on: boolean) => void) {
    this.listeners.add(fn);
    return () => { this.listeners.delete(fn); };
  }

  private throttle(name: string, ms: number) {
    const now = performance.now();
    if (now - (this.last[name] || 0) < ms) return false;
    this.last[name] = now;
    return true;
  }

  private env(g: GainNode, t: number, peak: number, attack: number, decay: number) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
  }

  private tone(freq: number, to: number, dur: number, peak: number, type: OscillatorType = "sine", delay = 0) {
    const c = this.ctx!, t = c.currentTime + delay;
    const o = c.createOscillator(), g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    o.frequency.exponentialRampToValueAtTime(to, t + dur);
    this.env(g, t, peak, 0.004, dur);
    o.connect(g).connect(this.master!);
    o.start(t); o.stop(t + dur + 0.05);
  }

  private hiss(type: BiquadFilterType, f0: number, f1: number, dur: number, peak: number, q = 0.8) {
    const c = this.ctx!, t = c.currentTime;
    const s = c.createBufferSource(); s.buffer = this.noise;
    const f = c.createBiquadFilter(); f.type = type; f.Q.value = q;
    f.frequency.setValueAtTime(f0, t);
    f.frequency.exponentialRampToValueAtTime(f1, t + dur);
    const g = c.createGain();
    this.env(g, t, peak, dur * 0.35, dur * 0.65);
    s.connect(f).connect(g).connect(this.master!);
    s.start(t, Math.random() * 0.5); s.stop(t + dur + 0.05);
  }

  play(name: Name) {
    if (!this.enabled || !this.ctx || !this.master) return;
    switch (name) {
      case "hover": if (this.throttle(name, 70)) this.hiss("highpass", 5200, 4200, 0.03, 0.05, 0.6); break;
      case "tick": if (this.throttle(name, 40)) this.tone(1800, 1500, 0.025, 0.03, "triangle"); break;
      case "click": this.tone(700, 320, 0.08, 0.09); break;
      case "pop": this.tone(420, 900, 0.09, 0.08); this.tone(900, 1200, 0.06, 0.03, "triangle", 0.03); break;
      case "swish": if (this.throttle(name, 90)) this.hiss("bandpass", 900, 3200, 0.28, 0.06, 1.2); break;
      case "paper": if (this.throttle(name, 60)) this.hiss("bandpass", 2400, 1400, 0.16, 0.05, 2); break;
      case "whoosh": this.hiss("lowpass", 250, 1800, 0.5, 0.09, 0.9); break;
      case "chime": this.tone(880, 880, 0.35, 0.06); this.tone(1320, 1320, 0.45, 0.045, "sine", 0.09); break;
    }
  }

  // soft air noise while the intro film is scrubbed: level 0..1 follows scroll speed
  wind(level: number) {
    if (!this.ctx || !this.master) return;
    if (!this.windSrc && level > 0 && this.enabled) {
      const c = this.ctx;
      this.windSrc = c.createBufferSource(); this.windSrc.buffer = this.noise; this.windSrc.loop = true;
      this.windFilter = c.createBiquadFilter(); this.windFilter.type = "lowpass"; this.windFilter.frequency.value = 380; this.windFilter.Q.value = 0.7;
      this.windGain = c.createGain(); this.windGain.gain.value = 0;
      this.windSrc.connect(this.windFilter).connect(this.windGain).connect(this.master);
      this.windSrc.start();
    }
    if (!this.windGain || !this.windFilter || !this.ctx) return;
    const v = this.enabled ? Math.min(1, Math.max(0, level)) : 0;
    const t = this.ctx.currentTime;
    this.windGain.gain.setTargetAtTime(v * 0.07, t, 0.12);
    this.windFilter.frequency.setTargetAtTime(300 + v * 900, t, 0.15);
  }
}

export const sound = typeof window !== "undefined" ? ((window as unknown as { __yjSound?: SoundKit }).__yjSound ??= new SoundKit()) : new SoundKit();
export type SoundName = Name;
