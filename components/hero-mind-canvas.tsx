"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  phase: number;
  phaseTwo: number;
  radius: number;
  tone: number;
};

type Link = [number, number];
type Burst = {
  startedAt: number;
  directions: Array<{ x: number; y: number }>;
};

const SHAPE_CHANGE_SECONDS = 11;
const SHAPE_TRANSITION_SECONDS = 2.4;
const BURST_DURATION = 1500;

function smoothstep(value: number) {
  const clamped = Math.max(0, Math.min(1, value));
  return clamped * clamped * (3 - 2 * clamped);
}

function shapePoint(particle: Particle, mode: number) {
  if (mode === 0) return { x: particle.x, y: particle.y };

  const angle = Math.atan2(particle.y, particle.x);
  const radius = Math.sqrt(particle.x ** 2 + (particle.y / 0.8) ** 2);

  if (mode === 1) {
    // A compact orbital form gives the brain mesh a clear, rounded silhouette.
    return {
      x: Math.cos(angle) * radius * 0.88,
      y: Math.sin(angle) * radius * 0.67,
    };
  }

  // A softly faceted signal star is a second distinct network silhouette.
  const edge = 0.76 + 0.19 * Math.cos(angle * 5 + particle.phase * 0.12);
  return {
    x: particle.x * edge * 0.94,
    y: particle.y * edge * 0.94,
  };
}

function isInsideMind(x: number, y: number) {
  const absX = Math.abs(x);
  const top = -0.7 + 0.15 * Math.exp(-((absX / 0.16) ** 2)) + 0.12 * absX;
  const bottom = 0.59 + 0.1 * absX + 0.035 * Math.sin(x * 9);
  const centerSplit = 0.025 + 0.025 * (1 - Math.abs(y) / 0.8);

  return y > top && y < bottom && Math.abs(x) > centerSplit && x * x + (y / 0.8) ** 2 < 1.08;
}

function createParticles(count: number): Particle[] {
  const particles: Particle[] = [];
  let seed = 451;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  for (let attempt = 0; attempt < count * 18 && particles.length < count; attempt += 1) {
    const x = random() * 2 - 1;
    const y = random() * 1.5 - 0.75;
    if (!isInsideMind(x, y)) continue;

    particles.push({
      x,
      y,
      phase: random() * Math.PI * 2,
      phaseTwo: random() * Math.PI * 2,
      radius: 1.2 + random() * 1.8,
      tone: random(),
    });
  }

  return particles;
}

function createLinks(particles: Particle[]): Link[] {
  const links: Link[] = [];
  const maxDistanceSquared = 0.13 ** 2;

  for (let first = 0; first < particles.length; first += 1) {
    for (let second = first + 1; second < particles.length; second += 1) {
      const dx = particles[first].x - particles[second].x;
      const dy = particles[first].y - particles[second].y;
      if (dx * dx + dy * dy < maxDistanceSquared) links.push([first, second]);
    }
  }

  return links;
}

export function HeroMindCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const particles = createParticles(window.matchMedia("(max-width: 640px)").matches ? 145 : 250);
    const links = createLinks(particles);
    const positions = particles.map(() => ({ x: 0, y: 0 }));
    let width = 0;
    let height = 0;
    let frame = 0;
    let animationStartedAt = 0;
    let running = false;
    let inView = true;
    let pageVisible = !document.hidden;
    let burst: Burst | null = null;
    let accent = "#a54028";
    let sage = "#6d8872";

    const readColors = () => {
      const styles = getComputedStyle(canvas);
      accent = styles.getPropertyValue("--accent").trim() || accent;
      sage = styles.getPropertyValue("--hero-mind-secondary").trim() || sage;
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      readColors();
      draw(0);
    };

    const draw = (elapsed: number) => {
      if (!width || !height) return;
      // Use a deliberate but calm pace: the mesh should visibly travel and
      // reshape over a few seconds, without competing with the hero copy.
      const time = Math.max(0, elapsed - animationStartedAt) * 0.0012;
      const isNarrow = width < 640;
      const centerX = width * (isNarrow ? 0.5 : 0.37) + Math.sin(time * 0.48) * width * (isNarrow ? 0.2 : 0.21);
      const centerY = height * 0.5 + Math.cos(time * 0.37) * height * (isNarrow ? 0.12 : 0.14);
      const radiusX = Math.min(width * (isNarrow ? 0.46 : 0.29), 300);
      const radiusY = Math.min(height * (isNarrow ? 0.25 : 0.34), 230);
      const breath = 1 + Math.sin(time * 0.72) * 0.085;
      const rotation = Math.sin(time * 0.42) * 0.2 + Math.sin(time * 0.19) * 0.1;
      const cosine = Math.cos(rotation);
      const sine = Math.sin(rotation);
      const shapeIndex = Math.floor(time / SHAPE_CHANGE_SECONDS) % 3;
      const shapeCycleTime = time % SHAPE_CHANGE_SECONDS;
      const shapeBlend = smoothstep((shapeCycleTime - (SHAPE_CHANGE_SECONDS - SHAPE_TRANSITION_SECONDS)) / SHAPE_TRANSITION_SECONDS);
      const burstAge = burst ? Math.max(0, elapsed - burst.startedAt) : BURST_DURATION;
      const burstProgress = Math.min(1, burstAge / BURST_DURATION);
      const burstStrength = burst ? Math.sin(burstProgress * Math.PI) : 0;

      context.clearRect(0, 0, width, height);

      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index];
        const from = shapePoint(particle, shapeIndex);
        const to = shapePoint(particle, (shapeIndex + 1) % 3);
        const shapeX = from.x + (to.x - from.x) * shapeBlend;
        const shapeY = from.y + (to.y - from.y) * shapeBlend;
        const wave = Math.sin(time * 1.15 + particle.phase) * 0.04;
        const drift = Math.sin(time * 0.83 + particle.phaseTwo) * 0.032;
        const lobe = Math.sin(time * 0.62 + Math.abs(shapeX) * 3 + particle.phase) * 0.045;
        const localX = (shapeX * (breath + lobe) + wave) * radiusX;
        const localY = (shapeY * (breath - lobe * 0.45) + drift) * radiusY;
        positions[index].x = centerX + localX * cosine - localY * sine;
        positions[index].y = centerY + localX * sine + localY * cosine;
        if (burst && burstStrength > 0) {
          positions[index].x += burst.directions[index].x * burstStrength;
          positions[index].y += burst.directions[index].y * burstStrength;
        }
      }

      context.lineWidth = 0.85;
      for (const [first, second] of links) {
        const a = positions[first];
        const b = positions[second];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.hypot(dx, dy);
        const opacity = Math.max(0, 0.5 - distance / 115);
        if (opacity <= 0) continue;
        context.globalAlpha = opacity;
        context.strokeStyle = particles[first].tone > 0.78 ? sage : accent;
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();
      }

      context.save();
      context.translate(centerX, centerY);
      context.rotate(rotation);
      context.scale(radiusX * breath, radiusY * breath);
      context.globalAlpha = 0.3;
      context.strokeStyle = accent;
      context.lineWidth = 1.15 / Math.max(radiusX, radiusY);
      context.beginPath();
      context.moveTo(0, -0.58);
      context.bezierCurveTo(-0.17, -0.84, -0.55, -0.82, -0.7, -0.56);
      context.bezierCurveTo(-0.96, -0.43, -0.92, -0.15, -0.84, 0.02);
      context.bezierCurveTo(-0.98, 0.27, -0.78, 0.62, -0.51, 0.64);
      context.bezierCurveTo(-0.32, 0.82, -0.12, 0.76, 0, 0.63);
      context.bezierCurveTo(0.15, 0.78, 0.39, 0.82, 0.53, 0.64);
      context.bezierCurveTo(0.83, 0.61, 0.97, 0.26, 0.83, 0.02);
      context.bezierCurveTo(0.93, -0.16, 0.96, -0.43, 0.7, -0.56);
      context.bezierCurveTo(0.54, -0.82, 0.16, -0.84, 0, -0.58);
      context.stroke();

      context.globalAlpha = 0.19;
      context.lineWidth = 0.9 / Math.max(radiusX, radiusY);
      context.beginPath();
      context.moveTo(0, -0.57);
      context.bezierCurveTo(0.045, -0.32, -0.04, -0.14, 0.02, 0.04);
      context.bezierCurveTo(-0.035, 0.24, 0.05, 0.45, 0, 0.62);
      context.stroke();
      context.restore();

      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index];
        const pulse = 0.74 + (Math.sin(time * 1.8 + particle.phaseTwo) + 1) * 0.2;
        context.globalAlpha = particle.tone > 0.78 ? 0.9 * pulse : 0.8 * pulse;
        context.fillStyle = particle.tone > 0.78 ? sage : accent;
        context.beginPath();
        context.arc(positions[index].x, positions[index].y, particle.radius * pulse, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;
    };

    const animate = (time: number) => {
      if (!running) return;
      draw(time);
      if (motionQuery.matches && burst && time - burst.startedAt >= BURST_DURATION) {
        burst = null;
        stop();
        draw(0);
        return;
      }
      frame = window.requestAnimationFrame(animate);
    };

    const stop = () => {
      running = false;
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const start = () => {
      if (running || (motionQuery.matches && !burst) || !inView || !pageVisible) return;
      if (!animationStartedAt) animationStartedAt = performance.now();
      running = true;
      frame = window.requestAnimationFrame(animate);
    };

    const triggerBurst: EventListener = (event) => {
      if (!inView || !pageVisible) return;
      if (!(event instanceof MouseEvent)) return;
      const bounds = canvas.getBoundingClientRect();
      const originX = event.clientX - bounds.left;
      const originY = event.clientY - bounds.top;
      const directions = particles.map((particle, index) => {
        const dx = positions[index].x - originX;
        const dy = positions[index].y - originY;
        const length = Math.hypot(dx, dy) || 1;
        const variation = 0.78 + Math.random() * 0.52;
        return { x: (dx / length) * 150 * variation, y: (dy / length) * 150 * variation };
      });
      burst = { startedAt: performance.now(), directions };
      document.dispatchEvent(new CustomEvent("sonu:force-burst", {
        detail: { x: event.clientX, y: event.clientY },
      }));
      start();
    };

    const updateVisibility = () => {
      if (document.hidden) {
        pageVisible = false;
        stop();
      } else {
        pageVisible = true;
        start();
      }
    };

    const updateMotion = () => {
      if (motionQuery.matches) {
        stop();
        draw(0);
      } else {
        start();
      }
    };

    const updateTheme = () => {
      readColors();
      if (motionQuery.matches) draw(0);
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    }, { threshold: 0.01 });

    const themeObserver = new MutationObserver(updateTheme);
    const hero = canvas.closest(".hero");
    observer.observe(canvas);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    hero?.addEventListener("click", triggerBurst);
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", updateVisibility);
    motionQuery.addEventListener("change", updateMotion);
    resize();
    if (!motionQuery.matches) start();

    return () => {
      stop();
      observer.disconnect();
      themeObserver.disconnect();
      hero?.removeEventListener("click", triggerBurst);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", updateVisibility);
      motionQuery.removeEventListener("change", updateMotion);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-mind-canvas" aria-hidden="true" />;
}
