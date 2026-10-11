"use client";

import { useEffect, useState } from "react";
import Magnet from "@/components/react-bits/Magnet";

export function MagnetAction({ href, children }: { href: string; children: React.ReactNode }) {
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const update = () => setDisabled(reduce.matches || coarse.matches);
    update();
    reduce.addEventListener("change", update);
    coarse.addEventListener("change", update);
    return () => { reduce.removeEventListener("change", update); coarse.removeEventListener("change", update); };
  }, []);
  return <Magnet className="magnet-wrap" padding={35} magnetStrength={12} disabled={disabled}><a className="hero-cta" href={href} data-interaction>{children}</a></Magnet>;
}
