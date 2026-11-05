"use client";

import dynamic from "next/dynamic";
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { CoreFallback } from "@/components/three/core-fallback";

const CoreCanvas = dynamic(() => import("@/components/three/core-canvas"), {
  ssr: false,
  loading: () => <CoreFallback />,
});

const softwareRenderers = /swiftshader|llvmpipe|software|mesa offscreen|microsoft basic render/i;

function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") || canvas.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return false;
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    // A software rasteriser would spend seconds compiling the physical materials; the SVG is the better experience there.
    if (softwareRenderers.test(renderer)) return false;
    const nav = navigator as Navigator & { deviceMemory?: number };
    if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 2) return false;
    if (typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency < 2) return false;
    return true;
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
    let idle: number | undefined;
    let timer: number | undefined;
    const schedule = () => {
      idle = window.requestIdleCallback?.(decide, { timeout: 1600 });
      timer = typeof idle === "number" ? undefined : window.setTimeout(decide, 600);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.08 });
    if (hostNode) observer.observe(hostNode);
    reducedMotion.addEventListener("change", decide);
    compactLayout.addEventListener("change", decide);
    return () => {
      window.removeEventListener("load", schedule);
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
      <ol className="core-legend" aria-label="The four layers of a product Alitroz engineers">
        {stackLegend.map((layer) => (
          <li key={layer.label} className={`legend-${layer.id}`}>
            <span aria-hidden="true" />
            <strong>{layer.label}</strong>
            <em>{layer.note}</em>
          </li>
        ))}
      </ol>
      <p className="core-caption">
        <span>The Product Stack</span>
        An original installation of the four layers in every product we engineer.
      </p>
    </div>
  );
}

const stackLegend = [
  { id: "experience", label: "Experience layer", note: "Web, mobile, and assistant interfaces" },
  { id: "application", label: "Application and AI", note: "Services, rules, and a replaceable model" },
  { id: "integration", label: "Integration and APIs", note: "Contracts with the systems a business already runs" },
  { id: "data", label: "Data and infrastructure", note: "Stores, queues, pipelines, and recovery" },
] as const;
