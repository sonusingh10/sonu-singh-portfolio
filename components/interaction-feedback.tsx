"use client";

import { useEffect, useRef, useState } from "react";

const preferenceKey = "sonu-click-sounds-v2";

function readSoundPreference() {
  try {
    return window.localStorage.getItem(preferenceKey) !== "off";
  } catch {
    return true;
  }
}

export function InteractionFeedback() {
  const [enabled, setEnabled] = useState(true);
  const audioContext = useRef<AudioContext | null>(null);

  useEffect(() => {
    setEnabled(readSoundPreference());

    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const action = event.target.closest<HTMLElement>("[data-interaction]");
      if (!action) return;

      action.classList.remove("interaction-feedback-active");
      // Restart the short press animation when the same action is clicked again.
      void action.offsetWidth;
      action.classList.add("interaction-feedback-active");
      window.setTimeout(() => action.classList.remove("interaction-feedback-active"), 260);

      if (!readSoundPreference()) return;
      try {
        const Context = window.AudioContext ?? (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!Context) return;
        const context = audioContext.current ?? new Context();
        audioContext.current = context;
        const playTone = () => {
          const now = context.currentTime;
          const oscillator = context.createOscillator();
          const gain = context.createGain();
          oscillator.type = "sine";
          oscillator.frequency.setValueAtTime(740, now);
          oscillator.frequency.exponentialRampToValueAtTime(980, now + 0.055);
          gain.gain.setValueAtTime(0.0001, now);
          gain.gain.exponentialRampToValueAtTime(0.085, now + 0.012);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.095);
          oscillator.connect(gain);
          gain.connect(context.destination);
          oscillator.start(now);
          oscillator.stop(now + 0.1);
        };
        if (context.state === "suspended") void context.resume().then(playTone);
        else playTone();
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

  return <button className="sound-toggle" type="button" onClick={toggle} aria-label={enabled ? "Turn click sounds off" : "Turn click sounds on"} aria-pressed={enabled} title={enabled ? "Click sounds on" : "Click sounds off"}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 10v4h3l5 4V6l-5 4H4Z" />
      {enabled ? <><path d="M16 9a4 4 0 0 1 0 6" /><path d="M18.5 6.5a8 8 0 0 1 0 11" /></> : <path d="m16 9 5 6m0-6-5 6" />}
    </svg>
    <span className="utility-tooltip" role="tooltip">{enabled ? "Turn click sounds off" : "Turn click sounds on"}</span>
    <span className="sr-only">Click sounds {enabled ? "on" : "off"}</span>
  </button>;
}
