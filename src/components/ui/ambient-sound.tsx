"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/*
 * Generative ambient music, synthesised live with the Web Audio API — no audio file, no licensing.
 * Warm detuned pads move slowly through four chords while a soft bell-like melody drifts over them,
 * all washed through a long synthetic reverb. Browsers only allow sound after a tap, so it starts
 * from the toggle (or the first tap on the page if the visitor turned it on during a past visit).
 */

const STORAGE_KEY = "aliign-ambient";
const VOLUME = 0.16;
const CHORD_SECONDS = 9;

// Fmaj9 → Am7 → Dm9 → B♭maj7 (Hz) — open voicings in a calm register.
const CHORDS = [
  [87.31, 174.61, 261.63, 329.63, 392.0],
  [110.0, 164.81, 261.63, 329.63, 392.0],
  [73.42, 146.83, 220.0, 261.63, 329.63],
  [58.27, 116.54, 233.08, 293.66, 349.23],
];
// F major pentatonic, upper register, for the melody.
const MELODY = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66];

interface Engine {
  ctx: AudioContext;
  master: GainNode;
  timers: number[];
}

function impulse(ctx: AudioContext, seconds: number) {
  const len = ctx.sampleRate * seconds;
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
  }
  return buf;
}

function startEngine(): Engine {
  const ctx = new AudioContext();
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  const reverb = ctx.createConvolver();
  reverb.buffer = impulse(ctx, 5);
  const wet = ctx.createGain();
  wet.gain.value = 0.55;
  reverb.connect(wet).connect(master);

  // Soft low-pass with a slow sweep keeps the pads gently moving.
  const tone = ctx.createBiquadFilter();
  tone.type = "lowpass";
  tone.frequency.value = 900;
  tone.Q.value = 0.4;
  const lfo = ctx.createOscillator();
  const lfoDepth = ctx.createGain();
  lfo.frequency.value = 0.05;
  lfoDepth.gain.value = 350;
  lfo.connect(lfoDepth).connect(tone.frequency);
  lfo.start();
  const dry = ctx.createGain();
  dry.gain.value = 0.5;
  tone.connect(dry).connect(master);
  tone.connect(reverb);

  const timers: number[] = [];

  const playChord = (index: number) => {
    const now = ctx.currentTime;
    for (const f of CHORDS[index % CHORDS.length]) {
      for (const [type, detune] of [["sine", -5], ["triangle", 5]] as const) {
        const osc = ctx.createOscillator();
        const env = ctx.createGain();
        osc.type = type;
        osc.frequency.value = f;
        osc.detune.value = detune;
        env.gain.setValueAtTime(0, now);
        env.gain.linearRampToValueAtTime(type === "sine" ? 0.07 : 0.035, now + 3.5);
        env.gain.setValueAtTime(type === "sine" ? 0.07 : 0.035, now + CHORD_SECONDS - 1);
        env.gain.linearRampToValueAtTime(0, now + CHORD_SECONDS + 3.5);
        osc.connect(env).connect(tone);
        osc.start(now);
        osc.stop(now + CHORD_SECONDS + 4);
      }
    }
  };

  const playNote = () => {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const env = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = MELODY[Math.floor(Math.random() * MELODY.length)];
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(0.045, now + 0.04);
    env.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);
    osc.connect(env);
    env.connect(reverb);
    env.connect(master);
    osc.start(now);
    osc.stop(now + 3.4);
  };

  let chord = 0;
  playChord(chord);
  timers.push(window.setInterval(() => playChord(++chord), CHORD_SECONDS * 1000));
  const scheduleNote = () => {
    timers.push(
      window.setTimeout(() => {
        playNote();
        scheduleNote();
      }, 2200 + Math.random() * 3800),
    );
  };
  scheduleNote();

  master.gain.linearRampToValueAtTime(VOLUME, ctx.currentTime + 4);
  return { ctx, master, timers };
}

function stopEngine(e: Engine) {
  const t = e.ctx.currentTime;
  e.master.gain.cancelScheduledValues(t);
  e.master.gain.setValueAtTime(e.master.gain.value, t);
  e.master.gain.linearRampToValueAtTime(0, t + 1.5);
  window.setTimeout(() => {
    e.timers.forEach((id) => {
      clearInterval(id);
      clearTimeout(id);
    });
    e.ctx.close();
  }, 1700);
}

export function AmbientSound() {
  const pathname = usePathname();
  const engine = useRef<Engine | null>(null);
  const [playing, setPlaying] = useState(false);
  const hidden = pathname?.startsWith("/admin");

  const start = useCallback(() => {
    if (engine.current) return;
    try {
      engine.current = startEngine();
      setPlaying(true);
    } catch {
      // No Web Audio support — the toggle simply does nothing.
    }
  }, []);

  const stop = useCallback(() => {
    if (!engine.current) return;
    stopEngine(engine.current);
    engine.current = null;
    setPlaying(false);
  }, []);

  const toggle = () => {
    const next = !playing;
    if (next) start();
    else stop();
    try {
      localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
    } catch {}
  };

  // Returning visitors who left it on: resume on their first tap (browsers block sound before that).
  useEffect(() => {
    let wanted = false;
    try {
      wanted = localStorage.getItem(STORAGE_KEY) === "on";
    } catch {}
    if (!wanted || hidden) return;
    const resume = () => start();
    window.addEventListener("pointerdown", resume, { once: true });
    window.addEventListener("keydown", resume, { once: true });
    return () => {
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("keydown", resume);
    };
  }, [hidden, start]);

  // Step aside for videos and background tabs.
  useEffect(() => {
    const quiet = (on: boolean) => {
      const e = engine.current;
      if (!e) return;
      const t = e.ctx.currentTime;
      e.master.gain.cancelScheduledValues(t);
      e.master.gain.setValueAtTime(e.master.gain.value, t);
      e.master.gain.linearRampToValueAtTime(on ? 0 : VOLUME, t + (on ? 0.6 : 2.5));
    };
    const onPlay = (ev: Event) => ev.target instanceof HTMLMediaElement && !ev.target.muted && quiet(true);
    const onPause = (ev: Event) => ev.target instanceof HTMLMediaElement && quiet(false);
    const onVisibility = () => {
      const e = engine.current;
      if (!e) return;
      document.hidden ? e.ctx.suspend() : e.ctx.resume();
    };
    document.addEventListener("play", onPlay, true);
    document.addEventListener("pause", onPause, true);
    document.addEventListener("ended", onPause, true);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("play", onPlay, true);
      document.removeEventListener("pause", onPause, true);
      document.removeEventListener("ended", onPause, true);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => () => stop(), [stop]);

  if (hidden) return null;
  const onLanding = pathname?.startsWith("/lp/");

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? "Turn ambient music off" : "Turn ambient music on"}
      title={playing ? "Ambient music on" : "Play ambient music"}
      // Stacked above the floating WhatsApp button (bottom-right); on ads pages, above the sticky call bar.
      className={`group fixed right-6 z-50 flex items-center gap-2.5 rounded-full border border-white/15 bg-[#16141f]/80 py-2.5 pl-3 pr-4 text-white shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-md transition hover:border-[#D4A853]/60 ${
        onLanding ? "bottom-24 lg:bottom-6" : "bottom-[5.5rem]"
      }`}
    >
      <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`w-[3px] rounded-full bg-[#D4A853] ${playing ? "animate-[ambient-bar_1.2s_ease-in-out_infinite]" : ""}`}
            style={{ height: playing ? undefined : `${[5, 9, 6, 8][i]}px`, animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </span>
      <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em]">
        {playing ? "Sound on" : "Sound"}
      </span>
    </button>
  );
}
