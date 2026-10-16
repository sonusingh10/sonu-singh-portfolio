"use client";

import { useEffect, useRef, useState } from "react";

const preferenceKey = "sonu-click-sounds";

function readSoundPreference() {
  try {
    return window.localStorage.getItem(preferenceKey) === "on";
  } catch {
    return false;
  }
}

function playForceWhoosh(context: AudioContext) {
  const now = context.currentTime;
  const length = Math.floor(context.sampleRate * 0.88);
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const samples = buffer.getChannelData(0);
  for (let index = 0; index < length; index += 1) {
    const envelope = 1 - index / length;
    samples[index] = (Math.random() * 2 - 1) * envelope * envelope;
  }

  const noise = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const noiseGain = context.createGain();
  noise.buffer = buffer;
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1500, now);
  filter.frequency.exponentialRampToValueAtTime(150, now + 0.78);
  noiseGain.gain.setValueAtTime(0.0001, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.07, now + 0.045);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.84);
  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(context.destination);
  noise.start(now);
  noise.stop(now + 0.86);

  const tone = context.createOscillator();
  const toneGain = context.createGain();
  tone.type = "sine";
  tone.frequency.setValueAtTime(185, now);
  tone.frequency.exponentialRampToValueAtTime(52, now + 0.72);
  toneGain.gain.setValueAtTime(0.0001, now);
  toneGain.gain.exponentialRampToValueAtTime(0.028, now + 0.04);
  toneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.77);
  tone.connect(toneGain);
  toneGain.connect(context.destination);
  tone.start(now);
  tone.stop(now + 0.79);
}

export function InteractionFeedback() {
  const [enabled, setEnabled] = useState(false);
  const audioContext = useRef<AudioContext | null>(null);

  useEffect(() => {
    setEnabled(readSoundPreference());

    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const action = event.target.closest<HTMLElement>("[data-interaction]");
      const forceClick = Boolean(event.target.closest(".hero"));

      if (action) {
        action.classList.remove("interaction-feedback-active");
        // Restart the short press animation when the same action is clicked again.
        void action.offsetWidth;
        action.classList.add("interaction-feedback-active");
        window.setTimeout(() => action.classList.remove("interaction-feedback-active"), 260);
      }

      if (!readSoundPreference() || (!action && !forceClick)) return;
      try {
        const Context = window.AudioContext;
        if (!Context) return;
        const context = audioContext.current ?? new Context();
        audioContext.current = context;
        if (context.state === "suspended") void context.resume();

        if (forceClick) {
          playForceWhoosh(context);
          return;
        }

        const now = context.currentTime;
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(740, now);
        oscillator.frequency.exponentialRampToValueAtTime(980, now + 0.055);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.035, now + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.095);
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start(now);
        oscillator.stop(now + 0.1);
      } catch {
        // Sound is an optional enhancement; unsupported or blocked audio stays silent.
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    try {
      window.localStorage.setItem(preferenceKey, next ? "on" : "off");
    } catch {
      // The control still works for this page if browser storage is unavailable.
    }
  };

  return <button className="sound-toggle" type="button" onClick={toggle} aria-label={enabled ? "Turn sound effects off" : "Turn sound effects on"} aria-pressed={enabled} title={enabled ? "Sound effects on" : "Sound effects off"}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 10v4h3l5 4V6l-5 4H4Z" />
      {enabled ? <><path d="M16 9a4 4 0 0 1 0 6" /><path d="M18.5 6.5a8 8 0 0 1 0 11" /></> : <path d="m16 9 5 6m0-6-5 6" />}
    </svg>
    <span className="sr-only">Sound effects {enabled ? "on" : "off"}</span>
  </button>;
}
