"use client";

import { useEffect, useRef } from "react";

export function ChromaticAmbient() {
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");

    const move = (event: PointerEvent) => {
      if (reduce.matches || !finePointer.matches) return;
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        root.style.setProperty("--cd-pointer-x", `${(event.clientX / window.innerWidth) * 100}%`);
        root.style.setProperty("--cd-pointer-y", `${(event.clientY / window.innerHeight) * 100}%`);
      });
    };

    const scroll = () => {
      const range = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      root.style.setProperty("--cd-scroll", String(Math.min(1, window.scrollY / range)));
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    scroll();
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  return <div className="chromatic-ambient" aria-hidden="true" />;
}
