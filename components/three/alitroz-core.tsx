"use client";

import dynamic from "next/dynamic";
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
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

class CoreErrorBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onFailure();
  }

  render() {
    return this.state.failed ? <CoreFallback /> : this.props.children;
  }
}

export function AlitrozCore() {
  const host = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"pending" | "webgl" | "fallback">("pending");
  const [active, setActive] = useState(true);
  const onFailure = useCallback(() => setMode("fallback"), []);

  useEffect(() => {
    const hostNode = host.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactLayout = window.matchMedia("(max-width: 799px)");
    const decide = () => {
      setMode(!reducedMotion.matches && !compactLayout.matches && canUseWebGL() ? "webgl" : "fallback");
    };
    const idle = window.requestIdleCallback?.(decide, { timeout: 900 });
    const timer = typeof idle === "number" ? undefined : window.setTimeout(decide, 280);
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.08 });
    if (hostNode) observer.observe(hostNode);
    reducedMotion.addEventListener("change", decide);
    compactLayout.addEventListener("change", decide);
    return () => {
      if (typeof idle === "number") window.cancelIdleCallback(idle);
      if (timer) window.clearTimeout(timer);
      reducedMotion.removeEventListener("change", decide);
      compactLayout.removeEventListener("change", decide);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={host} className="core-frame">
      {mode === "webgl" ? (
        <CoreErrorBoundary onFailure={onFailure}>
          <CoreCanvas active={active} onFailure={onFailure} />
        </CoreErrorBoundary>
      ) : (
        <CoreFallback />
      )}
    </div>
  );
}
