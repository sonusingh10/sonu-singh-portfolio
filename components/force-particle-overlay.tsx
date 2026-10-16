"use client";

import { useEffect, useRef } from "react";

type ForceParticle = {
  section: number;
  targetX: number;
  targetPageY: number;
  phase: number;
  radius: number;
  orbit: number;
  color: string;
};

type ForceBurst = {
  startedAt: number;
  originX: number;
  originPageY: number;
  particles: ForceParticle[];
};

const SECTION_IDS = ["about", "experience", "projects", "toolkit", "contact"];
const SECTION_DELAY = 420;
const FLIGHT_DURATION = 1600;
const BURST_DURATION = 9500;

function clamp(value: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

function smoothstep(value: number) {
  const progress = clamp(value);
  return progress * progress * (3 - 2 * progress);
}

export function ForceParticleOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;

    let width = 0;
    let height = 0;
    let ratio = 1;
    let burst: ForceBurst | null = null;
    let frame = 0;

    const resize = () => {
      ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = (now: number) => {
      context.clearRect(0, 0, width, height);
      if (!burst) return;

      const elapsed = now - burst.startedAt;
      const scrollY = window.scrollY;
      const positions = burst.particles.map(particle => {
        const delay = particle.section * SECTION_DELAY;
        const flight = smoothstep((elapsed - delay) / FLIGHT_DURATION);
        const settledFor = Math.max(0, elapsed - delay - FLIGHT_DURATION);
        const orbitAngle = particle.phase + settledFor * 0.0011;
        const opacity = clamp((elapsed - delay) / 220) * clamp((BURST_DURATION - elapsed) / 1400);
        const x = burst!.originX + (particle.targetX - burst!.originX) * flight + Math.sin(flight * Math.PI) * Math.sin(particle.phase) * 34
          + Math.cos(orbitAngle) * particle.orbit * flight;
        const pageY = burst!.originPageY + (particle.targetPageY - burst!.originPageY) * flight + Math.sin(flight * Math.PI) * Math.cos(particle.phase) * 58
          + Math.sin(orbitAngle) * particle.orbit * 0.72 * flight;
        return { x, y: pageY - scrollY, opacity, particle };
      });

      // Fine, short-lived links make each section feel like part of one signal.
      context.lineWidth = 0.8;
      for (let first = 0; first < positions.length; first += 1) {
        for (let second = first + 1; second < positions.length; second += 1) {
          if (positions[first].particle.section !== positions[second].particle.section) continue;
          const dx = positions[first].x - positions[second].x;
          const dy = positions[first].y - positions[second].y;
          const distance = Math.hypot(dx, dy);
          if (distance > 56) continue;
          context.globalAlpha = Math.min(positions[first].opacity, positions[second].opacity) * (1 - distance / 56) * 0.36;
          context.strokeStyle = positions[first].particle.color;
          context.beginPath();
          context.moveTo(positions[first].x, positions[first].y);
          context.lineTo(positions[second].x, positions[second].y);
          context.stroke();
        }
      }

      for (const position of positions) {
        if (position.opacity <= 0) continue;
        context.globalAlpha = position.opacity * 0.88;
        context.fillStyle = position.particle.color;
        context.shadowColor = position.particle.color;
        context.shadowBlur = 9;
        context.beginPath();
        context.arc(position.x, position.y, position.particle.radius, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
      context.shadowBlur = 0;
    };

    const animate = (now: number) => {
      if (!burst) {
        frame = 0;
        return;
      }
      draw(now);
      if (now - burst.startedAt >= BURST_DURATION) {
        burst = null;
        frame = 0;
        context.clearRect(0, 0, width, height);
        return;
      }
      frame = window.requestAnimationFrame(animate);
    };

    const startBurst = (event: Event) => {
      let originX: number;
      let originY: number;
      if (event.type === "click") {
        const click = event as MouseEvent;
        originX = click.clientX;
        originY = click.clientY;
      } else {
        const detail = (event as CustomEvent<{ x?: number; y?: number }>).detail;
        if (typeof detail?.x !== "number" || typeof detail?.y !== "number") return;
        originX = detail.x;
        originY = detail.y;
      }

      const sections = SECTION_IDS.map((id, section) => {
        const element = document.getElementById(id);
        if (!element) return null;
        const bounds = element.getBoundingClientRect();
        const sectionHeight = Math.max(bounds.height, 220);
        return {
          section,
          left: Math.max(14, bounds.left),
          width: Math.max(0, Math.min(width - 14, bounds.right) - Math.max(14, bounds.left)),
          pageTop: bounds.top + window.scrollY,
          height: sectionHeight,
        };
      }).filter((section): section is NonNullable<typeof section> => section !== null);

      if (!sections.length) return;
      const colors = ["#f08b68", "#b9d2bf"];
      const particles: ForceParticle[] = [];

      for (const section of sections) {
        for (let index = 0; index < 20; index += 1) {
          particles.push({
            section: section.section,
            targetX: section.left + Math.random() * Math.max(1, section.width),
            targetPageY: section.pageTop + Math.random() * section.height,
            phase: Math.random() * Math.PI * 2,
            radius: 1.2 + Math.random() * 2,
            orbit: 12 + Math.random() * 54,
            color: colors[Math.random() > 0.72 ? 1 : 0],
          });
        }
      }

      burst = {
        startedAt: performance.now(),
        originX,
        originPageY: originY + window.scrollY,
        particles,
      };
      if (frame) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(animate);
    };

    const handleSectionClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const sectionSelector = SECTION_IDS.map(id => `#${id}`).join(",");
      if (!event.target.closest(sectionSelector)) return;
      startBurst(event);
    };

    resize();
    document.addEventListener("sonu:force-burst", startBurst);
    document.addEventListener("click", handleSectionClick);
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      document.removeEventListener("sonu:force-burst", startBurst);
      document.removeEventListener("click", handleSectionClick);
      window.removeEventListener("resize", resize);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} className="force-particle-overlay" aria-hidden="true" />;
}
