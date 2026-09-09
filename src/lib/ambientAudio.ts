/*
  A small generative ambient engine.

  Why this exists: the personal page is supposed to have calm music playing
  by default, but shipping a commercial soundtrack file is not something we
  can do. So this synthesises a slow, warm chord pad in the browser instead.
  Nothing to download, it just plays.

  If a licensed track is ever dropped at /kadhaippoma-instrumental.mp3 it is
  used instead, and this synth stays quiet.
*/

const CHORDS: number[][] = [
  [220.0, 261.63, 329.63], // Am
  [174.61, 220.0, 261.63], // F
  [130.81, 196.0, 261.63], // C
  [196.0, 246.94, 293.66], // G
];

const CHORD_SECONDS = 7;
const TRACK_URL = "/kadhaippoma-instrumental.mp3";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let loop: ReturnType<typeof setInterval> | null = null;
let chordIndex = 0;
let element: HTMLAudioElement | null = null;
let usingTrack = false;
let muted = false;

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

export function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function isMuted() {
  return muted;
}

export function isRunning() {
  return usingTrack ? !!element && !element.paused : ctx?.state === "running";
}

function playChord() {
  if (!ctx || !master) return;
  const now = ctx.currentTime;
  const notes = CHORDS[chordIndex % CHORDS.length];
  chordIndex += 1;

  notes.forEach((freq, i) => {
    const osc = ctx!.createOscillator();
    const gain = ctx!.createGain();

    osc.type = i === 0 ? "sine" : "triangle";
    osc.frequency.value = freq;
    osc.detune.value = (i - 1) * 4;

    // slow swell in, slow fade out, so chords bleed into each other
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.22 / notes.length, now + 2.6);
    gain.gain.setValueAtTime(0.22 / notes.length, now + CHORD_SECONDS - 2.4);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + CHORD_SECONDS + 1.4);

    osc.connect(gain).connect(master!);
    osc.start(now);
    osc.stop(now + CHORD_SECONDS + 1.6);
  });
}

function buildSynth() {
  const AudioCtor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioCtor) return false;

  ctx = new AudioCtor();

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 900;
  filter.Q.value = 0.6;

  const delay = ctx.createDelay(1.2);
  delay.delayTime.value = 0.5;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.32;
  const wet = ctx.createGain();
  wet.gain.value = 0.25;

  master = ctx.createGain();
  master.gain.value = muted ? 0 : 0.5;

  master.connect(filter);
  filter.connect(ctx.destination);
  filter.connect(delay);
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(wet);
  wet.connect(ctx.destination);

  playChord();
  loop = setInterval(playChord, CHORD_SECONDS * 1000);
  return true;
}

/*
  Call this from inside a click handler. Under App Router, a soft navigation
  keeps the same document, so audio started on the click that opens the
  personal page keeps playing once you land there.
*/
export function start() {
  if (typeof window === "undefined") return;

  if (usingTrack && element) {
    void element.play().catch(() => undefined);
    notify();
    return;
  }

  if (ctx) {
    void ctx.resume().then(notify);
    return;
  }

  // Prefer a real licensed track when one has been added.
  if (!element) {
    element = new Audio(TRACK_URL);
    element.loop = true;
    element.volume = muted ? 0 : 0.35;
    element.addEventListener("canplaythrough", () => {
      usingTrack = true;
      if (loop) {
        clearInterval(loop);
        loop = null;
      }
      if (ctx) {
        void ctx.close();
        ctx = null;
        master = null;
      }
      notify();
    });
  }

  void element.play().then(
    () => {
      usingTrack = true;
      notify();
    },
    () => {
      // No file, or the browser refused. Fall back to the synth pad.
      buildSynth();
      notify();
    }
  );
}

export function setMuted(next: boolean) {
  muted = next;
  if (master && ctx) {
    master.gain.setTargetAtTime(next ? 0 : 0.5, ctx.currentTime, 0.2);
  }
  if (element) element.volume = next ? 0 : 0.35;
  notify();
}

export function stop() {
  if (loop) {
    clearInterval(loop);
    loop = null;
  }
  if (ctx) {
    void ctx.close();
    ctx = null;
    master = null;
  }
  if (element) {
    element.pause();
    element = null;
  }
  usingTrack = false;
  notify();
}
