"use client";

import { useEffect, useState } from "react";

const introWords = [
  "Hi,",
  "I'm",
  "Sonu",
  "Singh.",
  "I",
  "love",
  "building",
  "things",
  "and",
  "helping",
  "people.",
  "Mind",
  "the",
  "Limits.",
  "Become",
  "the",
  "Wave.",
];

type IntroPhase = "name" | "typing" | "holding" | "fading";

export function AnimatedWordmarkIntro({ name }: { name: string }) {
  const [phase, setPhase] = useState<IntroPhase>("name");
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compactHeader = window.matchMedia("(max-width: 760px)").matches;

    if (reduceMotion || compactHeader) return;

    const timers: number[] = [];
    const later = (callback: () => void, delay: number) => {
      timers.push(window.setTimeout(callback, delay));
    };

    later(() => {
      setPhase("typing");
      setWordCount(1);

      let nextWord = 1;
      const interval = window.setInterval(() => {
        nextWord += 1;
        setWordCount(nextWord);

        if (nextWord >= introWords.length) {
          window.clearInterval(interval);
          setPhase("holding");
          later(() => {
            setPhase("fading");
            later(() => setPhase("name"), 380);
          }, 1500);
        }
      }, 230);

      timers.push(interval);
    }, 450);

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const introVisible = phase !== "name";

  return (
    <span className="wordmark-copy">
      <span className={`wordmark-name${introVisible ? " is-hidden" : ""}`}>{name}</span>
      <span
        className={`wordmark-intro${introVisible ? " is-visible" : ""}${phase === "fading" ? " is-fading" : ""}`}
        aria-hidden="true"
      >
        {introWords.slice(0, wordCount).join(" ")}
      </span>
    </span>
  );
}
