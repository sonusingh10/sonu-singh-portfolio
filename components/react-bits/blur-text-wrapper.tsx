"use client";

import { useEffect, useState, type ComponentType } from "react";

export function BlurTextWrapper({ text }: { text: string }) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [Blur, setBlur] = useState<ComponentType<{ text?: string; delay?: number; animateBy?: "words" | "letters"; direction?: "top" | "bottom"; className?: string }> | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const node = document.querySelector(".motion-support");
    if (!node) return;
    const observer = new IntersectionObserver(async ([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      setVisible(true);
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const module = await import("@/components/react-bits/BlurText");
        setBlur(() => module.default);
      }
    }, { rootMargin: "120px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  if (reduceMotion || !visible || !Blur) return <span aria-hidden="true">{text}</span>;
  return <span className="eyebrow-motion" aria-hidden="true"><Blur text={text} delay={40} animateBy="words" direction="top" /></span>;
}
