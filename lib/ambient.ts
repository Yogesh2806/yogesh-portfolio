// Soft seaside ambience, synthesised with the Web Audio API (no audio files).
// Off by default; it only starts after the visitor presses the sound button.

const KEY = "yj-ambient";

class Ambient {
  ctx: AudioContext | null = null;
  out: GainNode | null = null;
  on = false;
  audible = true;
  timers: number[] = [];

  get saved() { try { return localStorage.getItem(KEY) === "on"; } catch { return false; } }

  private build() {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return false;
    const ctx = new AC(); this.ctx = ctx;
    const out = ctx.createGain(); out.gain.value = 0; this.out = out;
    out.connect(ctx.destination);
    // 4 s of brown noise for the sea, 4 s of pink noise for the wind
    const len = ctx.sampleRate * 4;
    const brown = ctx.createBuffer(2, len, ctx.sampleRate), pink = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const b = brown.getChannelData(c), p = pink.getChannelData(c);
      let last = 0, b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < len; i++) {
        const w = Math.random() * 2 - 1;
        last = (last + 0.02 * w) / 1.02; b[i] = last * 3.2;
        b0 = 0.99765 * b0 + w * 0.099; b1 = 0.963 * b1 + w * 0.2965; b2 = 0.57 * b2 + w * 1.0526; p[i] = (b0 + b1 + b2 + w * 0.1848) * 0.08;
      }
    }
    const loop = (buf: AudioBuffer) => { const s = ctx.createBufferSource(); s.buffer = buf; s.loop = true; s.start(); return s; };

    // sea: brown noise through a breathing low-pass, swelling like waves
    const seaF = ctx.createBiquadFilter(); seaF.type = "lowpass"; seaF.frequency.value = 420; seaF.Q.value = 0.4;
    const seaG = ctx.createGain(); seaG.gain.value = 0.35;
    loop(brown).connect(seaF).connect(seaG).connect(out);
    // foam: a hiss that only rises at the crest of each wave
    const foamF = ctx.createBiquadFilter(); foamF.type = "highpass"; foamF.frequency.value = 2400;
    const foamG = ctx.createGain(); foamG.gain.value = 0;
    loop(pink).connect(foamF).connect(foamG).connect(out);
    // wind: pink noise, band-passed, drifting slowly
    const windF = ctx.createBiquadFilter(); windF.type = "bandpass"; windF.frequency.value = 520; windF.Q.value = 0.6;
    const windG = ctx.createGain(); windG.gain.value = 0.05;
    loop(pink).connect(windF).connect(windG).connect(out);

    const wave = () => {
      if (!this.ctx) return;
      const t = ctx.currentTime, rise = 2.6 + Math.random() * 1.6, fall = 3.4 + Math.random() * 2;
      seaG.gain.cancelScheduledValues(t); seaG.gain.setTargetAtTime(0.75 + Math.random() * 0.25, t, rise / 3); seaG.gain.setTargetAtTime(0.3, t + rise, fall / 3);
      seaF.frequency.cancelScheduledValues(t); seaF.frequency.setTargetAtTime(900 + Math.random() * 300, t, rise / 3); seaF.frequency.setTargetAtTime(380, t + rise, fall / 3);
      foamG.gain.cancelScheduledValues(t); foamG.gain.setTargetAtTime(0.02, t + rise * 0.8, 0.5); foamG.gain.setTargetAtTime(0, t + rise + 0.6, fall / 4);
      windF.frequency.setTargetAtTime(380 + Math.random() * 360, t, 4);
      windG.gain.setTargetAtTime(0.03 + Math.random() * 0.04, t, 4);
      this.timers.push(window.setTimeout(wave, (rise + fall) * 1000));
    };
    wave();
    return true;
  }

  private level() {
    if (!this.ctx || !this.out) return;
    const target = this.on && this.audible ? 0.22 : 0;
    this.out.gain.setTargetAtTime(target, this.ctx.currentTime, target ? 0.8 : 0.35);
  }

  set(on: boolean) {
    this.on = on;
    try { localStorage.setItem(KEY, on ? "on" : "off"); } catch {}
    if (on && !this.ctx && !this.build()) { this.on = false; return; }
    if (on && this.ctx?.state === "suspended") this.ctx.resume();
    this.level();
  }

  // the hero calls this as it scrolls in and out of view, or the tab hides
  setAudible(v: boolean) { this.audible = v; this.level(); }
}

export const ambient = new Ambient();
