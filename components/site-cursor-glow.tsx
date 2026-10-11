"use client";

import { useEffect } from "react";

export function SiteCursorGlow() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    if (reducedMotion.matches || !finePointer.matches) return;

    const glow = document.querySelector<HTMLElement>(".site-cursor-glow");
    if (!glow) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x = event.clientX;
      y = event.clientY;
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        glow.style.setProperty("--cursor-x", `${x}px`);
        glow.style.setProperty("--cursor-y", `${y}px`);
        glow.classList.add("is-visible");
        frame = 0;
      });
    };
    const leave = () => glow.classList.remove("is-visible");

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      if (frame) window.cancelAnimationFrame(frame);
      glow.classList.remove("is-visible");
    };
  }, []);

  return <div className="site-cursor-glow" aria-hidden="true" />;
}
