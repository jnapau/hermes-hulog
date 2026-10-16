/** Tiny synthesized sounds + haptics — no audio files needed. */
let ctx: AudioContext | null = null;

function audio(): AudioContext | null {
  try {
    if (!ctx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(freq: number, start: number, dur: number, type: OscillatorType = 'sine', gain = 0.15) {
  const a = audio();
  if (!a) return;
  const osc = a.createOscillator();
  const g = a.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, a.currentTime + start);
  g.gain.setValueAtTime(0.0001, a.currentTime + start);
  g.gain.exponentialRampToValueAtTime(gain, a.currentTime + start + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + start + dur);
  osc.connect(g).connect(a.destination);
  osc.start(a.currentTime + start);
  osc.stop(a.currentTime + start + dur + 0.02);
}

export function playClink(enabled = true) {
  if (!enabled) return;
  tone(2093, 0, 0.18, 'triangle', 0.12);
  tone(3136, 0.05, 0.22, 'sine', 0.08);
  vibrate(30);
}

/** Unlock during the click gesture, before an asynchronous score request. */
export function unlockAudio(enabled = true) { if (enabled) audio(); }

export function playSoft(enabled = true) {
  if (!enabled) return;
  tone(392, 0, 0.18, 'sine', 0.08);
  vibrate(15);
}

export function playBasag(enabled = true) {
  if (!enabled) return;
  [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.09, 0.25, 'triangle', 0.1));
  vibrate([40, 40, 80]);
}

function vibrate(pattern: number | number[]) {
  try {
    navigator.vibrate?.(pattern);
  } catch {
    /* not supported */
  }
}
