// Synthesized audio feedback using the Web Audio API — no external assets.
let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function tone(
  freq: number,
  duration: number,
  type: OscillatorType = "sine",
  startGain = 0.18,
  startTime = 0,
) {
  const ac = getCtx();
  if (!ac) return;
  const t = ac.currentTime + startTime;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  gain.gain.setValueAtTime(startGain, t);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  osc.connect(gain).connect(ac.destination);
  osc.start(t);
  osc.stop(t + duration);
}

export const heroAudio = {
  click() {
    tone(880, 0.08, "square", 0.08);
  },
  navigate() {
    tone(1200, 0.06, "triangle", 0.1);
  },
  rumble() {
    const ac = getCtx();
    if (!ac) return;
    tone(80, 0.6, "sawtooth", 0.22);
    tone(120, 0.5, "sine", 0.12);
  },
  victory() {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      tone(f, 0.4, "triangle", 0.16, i * 0.12);
    });
  },
};
