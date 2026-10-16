"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { CoreFallback } from "@/components/three/core-fallback";

const CoreCanvas = dynamic(() => import("@/components/three/core-canvas"), {
  ssr: false,
  loading: () => <CoreFallback />,
});

function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function AlitrozCore() {
  const host = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"pending" | "webgl" | "fallback">("pending");
  const [active, setActive] = useState(true);

  useEffect(() => {
    const hostNode = host.current;
    const decide = () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      setMode(!reduced && !mobile && canUseWebGL() ? "webgl" : "fallback");
    };
    const idle = window.requestIdleCallback?.(decide, { timeout: 900 });
    const timer = typeof idle === "number" ? undefined : window.setTimeout(decide, 280);
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.08 });
    if (hostNode) observer.observe(hostNode);
    return () => {
      if (typeof idle === "number") window.cancelIdleCallback(idle);
      if (timer) window.clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={host} className="core-frame">
      {mode === "webgl" ? <CoreCanvas active={active} /> : <CoreFallback />}
    </div>
  );
}
