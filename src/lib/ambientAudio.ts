/*
  Audio for the personal page only.

  Two separate steps on purpose:

  - unlock() runs inside the click on the door. Browsers only allow audio to
    begin during a real user gesture, so this primes the player silently
    while you are still on the main site. Nothing is audible yet.
  - play() runs when the personal page mounts. This is the only place sound
    actually starts, and stop() runs when you leave, so music never bleeds
    onto the rest of the site.

  If /kadhaippoma-instrumental.mp3 exists it is used. If it is ever missing,
  a slow synthesised chord pad takes over so the room is never silent.
*/

const TRACK_URL = "/kadhaippoma-instrumental.mp3";
const TRACK_VOLUME = 0.4;

const CHORDS: number[][] = [
  [220.0, 261.63, 329.63], // Am
  [174.61, 220.0, 261.63], // F
  [130.81, 196.0, 261.63], // C
  [196.0, 246.94, 293.66], // G
];
const CHORD_SECONDS = 7;

let el: HTMLAudioElement | null = null;
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let loop: ReturnType<typeof setInterval> | null = null;
let chordIndex = 0;

let mode: "idle" | "track" | "synth" = "idle";
let muted = false;
let playing = false;

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

export function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export const isMuted = () => muted;
export const isPlaying = () => playing;

/* ---------- synth fallback ---------- */

function buildSynth() {
  if (ctx) return true;
  const Ctor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctor) return false;

  ctx = new Ctor();

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 900;

  const delay = ctx.createDelay(1.2);
  delay.delayTime.value = 0.5;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.3;
  const wet = ctx.createGain();
  wet.gain.value = 0.22;

  master = ctx.createGain();
  master.gain.value = 0;

  master.connect(filter);
  filter.connect(ctx.destination);
  filter.connect(delay);
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(wet);
  wet.connect(ctx.destination);

  return true;
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

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.22 / notes.length, now + 2.6);
    gain.gain.setValueAtTime(0.22 / notes.length, now + CHORD_SECONDS - 2.4);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + CHORD_SECONDS + 1.4);

    osc.connect(gain).connect(master!);
    osc.start(now);
    osc.stop(now + CHORD_SECONDS + 1.6);
  });
}

/* ---------- public api ---------- */

/** Prime the player during a click. Stays silent. */
export function unlock() {
  if (typeof window === "undefined" || mode !== "idle") return;

  el = new Audio(TRACK_URL);
  el.loop = true;
  el.preload = "auto";
  el.volume = 0;

  void el.play().then(
    () => {
      el!.pause();
      el!.currentTime = 0;
      mode = "track";
    },
    () => {
      el = null;
      if (buildSynth()) mode = "synth";
    }
  );
}

/** Start sound. Only the personal page calls this. */
export function play() {
  if (typeof window === "undefined") return;

  if (mode === "idle") {
    // Landed here directly, no gesture yet. Try anyway; if the browser
    // refuses, MusicToggle arms the next interaction.
    unlock();
  }

  if (mode === "track" && el) {
    el.volume = muted ? 0 : TRACK_VOLUME;
    void el.play().then(
      () => {
        playing = true;
        notify();
      },
      () => undefined
    );
    return;
  }

  if (mode === "synth" && ctx && master) {
    void ctx.resume();
    master.gain.setTargetAtTime(muted ? 0 : 0.5, ctx.currentTime, 0.4);
    if (!loop) {
      playChord();
      loop = setInterval(playChord, CHORD_SECONDS * 1000);
    }
    playing = true;
    notify();
  }
}

/** Silence everything. Runs when you leave the personal page. */
export function stop() {
  if (el) {
    el.pause();
    el.currentTime = 0;
  }
  if (loop) {
    clearInterval(loop);
    loop = null;
  }
  if (master && ctx) master.gain.setTargetAtTime(0, ctx.currentTime, 0.2);
  playing = false;
  notify();
}

export function setMuted(next: boolean) {
  muted = next;
  if (el) el.volume = next ? 0 : TRACK_VOLUME;
  if (master && ctx) {
    master.gain.setTargetAtTime(next || !playing ? 0 : 0.5, ctx.currentTime, 0.2);
  }
  notify();
}
