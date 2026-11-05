"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * The Product Stack — an original Alitroz installation.
 *
 * Four layers of an engineered digital product, read from the top down:
 *   1. Experience layer      — floating interface panels (web, mobile, assistant)
 *   2. Application and AI    — service blocks and a luminous model core
 *   3. Integration and APIs  — chrome rings and routed conduits
 *   4. Data and infrastructure — satin-metal slab with database cylinders
 *
 * Every element is procedural. No external models or textures are used.
 */

const LAYER_GAP = 0.98;
const layers = [
  { id: "experience", y: 1.5, color: "#e9e6ff", tint: "#b5a4ff", opacity: 0.42, transmission: 0.9, metalness: 0.02, roughness: 0.06 },
  { id: "application", y: 1.5 - LAYER_GAP, color: "#866cff", tint: "#866cff", opacity: 0.62, transmission: 0.55, metalness: 0.1, roughness: 0.12 },
  { id: "integration", y: 1.5 - LAYER_GAP * 2, color: "#3cb9a8", tint: "#61ded5", opacity: 0.55, transmission: 0.62, metalness: 0.08, roughness: 0.1 },
  { id: "data", y: 1.5 - LAYER_GAP * 3, color: "#27335c", tint: "#72a4ff", opacity: 1, transmission: 0, metalness: 0.88, roughness: 0.28 },
] as const;

const SLAB_W = 3.6;
const SLAB_D = 2.3;
const SLAB_H = 0.12;

function mountRoom(gl: THREE.WebGLRenderer, target: THREE.Scene) {
  const pmrem = new THREE.PMREMGenerator(gl);
  const room = new RoomEnvironment();
  const env = pmrem.fromScene(room).texture;
  target.environment = env;
  return () => {
    env.dispose();
    pmrem.dispose();
  };
}

function Staging() {
  const { gl, scene } = useThree();
  useLayoutEffect(() => mountRoom(gl, scene), [gl, scene]);
  return null;
}

function Precompile({ onReady }: { onReady: () => void }) {
  const { gl, scene, camera } = useThree();
  useEffect(() => {
    let cancelled = false;
    // Compile the shaders off the critical path (KHR_parallel_shader_compile where available) before the first frame.
    gl.compileAsync(scene, camera)
      .catch(() => undefined)
      .then(() => {
        if (!cancelled) onReady();
      });
    return () => {
      cancelled = true;
    };
  }, [gl, scene, camera, onReady]);
  return null;
}

function ContextLossGuard({ onFailure }: { onFailure: () => void }) {
  const { gl } = useThree();
  useEffect(() => {
    const canvas = gl.domElement;
    const onContextLost = (event: Event) => {
      event.preventDefault();
      onFailure();
    };
    canvas.addEventListener("webglcontextlost", onContextLost);
    return () => canvas.removeEventListener("webglcontextlost", onContextLost);
  }, [gl, onFailure]);
  return null;
}

function roundedRect(width: number, depth: number, radius: number) {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -depth / 2;
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + depth - radius);
  shape.quadraticCurveTo(x + width, y + depth, x + width - radius, y + depth);
  shape.lineTo(x + radius, y + depth);
  shape.quadraticCurveTo(x, y + depth, x, y + depth - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  return shape;
}

function useSlabGeometry(width: number, depth: number, height: number, radius = 0.22) {
  const geometry = useMemo(() => {
    const shape = roundedRect(width, depth, radius);
    const extruded = new THREE.ExtrudeGeometry(shape, { depth: height, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 3, curveSegments: 12 });
    extruded.rotateX(-Math.PI / 2);
    extruded.translate(0, -height / 2, 0);
    extruded.computeVertexNormals();
    return extruded;
  }, [width, depth, height, radius]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return geometry;
}

function Slab({ layer }: { layer: (typeof layers)[number] }) {
  const body = useSlabGeometry(SLAB_W, SLAB_D, SLAB_H);
  const frame = useSlabGeometry(SLAB_W + 0.08, SLAB_D + 0.08, 0.03, 0.26);
  return (
    <group position={[0, layer.y, 0]}>
      <mesh geometry={body} castShadow receiveShadow>
        {layer.transmission > 0 ? (
          <meshPhysicalMaterial
            color={layer.color}
            roughness={layer.roughness}
            metalness={layer.metalness}
            transparent
            opacity={layer.opacity + 0.18}
            iridescence={layer.id === "application" ? 0.9 : 0.35}
            iridescenceIOR={1.3}
            iridescenceThicknessRange={[140, 420]}
            clearcoat={1}
            clearcoatRoughness={0.06}
            sheen={0.4}
            sheenColor={layer.tint}
            envMapIntensity={1.4}
            depthWrite={false}
          />
        ) : (
          <meshStandardMaterial color={layer.color} metalness={layer.metalness} roughness={layer.roughness} envMapIntensity={1.2} />
        )}
      </mesh>
      <mesh geometry={frame} position={[0, -SLAB_H / 2 - 0.02, 0]}>
        <meshStandardMaterial color="#e3e7f5" metalness={0.96} roughness={0.14} />
      </mesh>
    </group>
  );
}

function ensureRoundRect(context: CanvasRenderingContext2D) {
  if (typeof context.roundRect === "function") return;
  context.roundRect = function roundRect(this: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
    this.rect(x, y, width, height);
  } as CanvasRenderingContext2D["roundRect"];
}

function drawPanel(kind: "dashboard" | "assistant" | "mobile") {
  const canvas = document.createElement("canvas");
  canvas.width = kind === "mobile" ? 160 : 320;
  canvas.height = kind === "mobile" ? 300 : 200;
  const context = canvas.getContext("2d");
  if (!context) return null;
  ensureRoundRect(context);
  const { width, height } = canvas;
  const radius = 18;
  context.fillStyle = "#101428";
  context.beginPath();
  context.roundRect(0, 0, width, height, radius);
  context.fill();
  context.strokeStyle = "rgba(247,246,255,0.32)";
  context.lineWidth = 2;
  context.stroke();
  context.fillStyle = "rgba(247,246,255,0.08)";
  context.fillRect(0, 0, width, 30);
  context.font = "600 12px Manrope, Avenir Next, sans-serif";
  if (kind === "dashboard") {
    context.fillStyle = "#c6c8dc";
    context.fillText("Orders · live", 16, 20);
    context.fillStyle = "#f7f6ff";
    context.font = "700 22px Manrope, sans-serif";
    context.fillText("1,284 / min", 16, 64);
    context.font = "500 11px Manrope, sans-serif";
    context.fillStyle = "#61ded5";
    context.fillText("+6.2% vs last hour", 16, 82);
    const bars = [36, 52, 44, 66, 58, 74, 70, 86, 80, 92];
    bars.forEach((bar, index) => {
      context.fillStyle = index === bars.length - 1 ? "#61ded5" : "rgba(134,108,255,0.85)";
      context.beginPath();
      context.roundRect(16 + index * 29, 180 - bar, 18, bar, 5);
      context.fill();
    });
  } else if (kind === "assistant") {
    context.fillStyle = "#c6c8dc";
    context.fillText("Operations assistant", 16, 20);
    context.fillStyle = "rgba(247,246,255,0.1)";
    context.beginPath();
    context.roundRect(92, 44, 212, 36, 12);
    context.fill();
    context.fillStyle = "#f7f6ff";
    context.font = "500 11px Manrope, sans-serif";
    context.fillText("Which refund policy applies here?", 104, 66);
    context.fillStyle = "rgba(134,108,255,0.28)";
    context.beginPath();
    context.roundRect(16, 94, 250, 76, 12);
    context.fill();
    context.fillStyle = "#61ded5";
    context.font = "700 9px Manrope, sans-serif";
    context.fillText("CITED · 2 SOURCES", 28, 112);
    context.fillStyle = "#f7f6ff";
    context.font = "500 11px Manrope, sans-serif";
    context.fillText("Policy 4.2: pro-rata refund within", 28, 132);
    context.fillText("30 days. A person approves changes.", 28, 148);
    context.fillStyle = "rgba(247,246,255,0.14)";
    context.beginPath();
    context.roundRect(28, 154, 96, 12, 6);
    context.fill();
  } else {
    context.fillStyle = "#8d90aa";
    context.font = "600 10px Manrope, sans-serif";
    context.fillText("TODAY", 16, 58);
    context.fillStyle = "#f7f6ff";
    context.font = "700 20px Manrope, sans-serif";
    context.fillText("14 tasks", 16, 84);
    context.fillStyle = "rgba(97,222,213,0.22)";
    context.beginPath();
    context.roundRect(16, 104, 128, 56, 12);
    context.fill();
    context.fillStyle = "#61ded5";
    context.font = "600 10px Manrope, sans-serif";
    context.fillText("NEXT ACTION", 28, 124);
    context.fillStyle = "#f7f6ff";
    context.font = "600 12px Manrope, sans-serif";
    context.fillText("Approve order", 28, 144);
    [184, 218, 252].forEach((y, index) => {
      context.fillStyle = "rgba(247,246,255,0.08)";
      context.beginPath();
      context.roundRect(16, y, 128, 26, 8);
      context.fill();
      context.fillStyle = index === 1 ? "#ff8b75" : "#72a4ff";
      context.beginPath();
      context.arc(30, y + 13, 5, 0, Math.PI * 2);
      context.fill();
    });
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function InterfacePanel({ kind, position, rotation, size }: { kind: "dashboard" | "assistant" | "mobile"; position: [number, number, number]; rotation: [number, number, number]; size: [number, number] }) {
  const texture = useMemo(() => drawPanel(kind), [kind]);
  useEffect(() => () => texture?.dispose(), [texture]);
  if (!texture) return null;
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <planeGeometry args={size} />
        <meshStandardMaterial map={texture} transparent roughness={0.35} metalness={0.05} emissive="#ffffff" emissiveMap={texture} emissiveIntensity={0.42} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0, -0.012]}>
        <planeGeometry args={[size[0] + 0.05, size[1] + 0.05]} />
        <meshStandardMaterial color="#d8dcf2" metalness={0.9} roughness={0.2} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function ServiceBlocks({ y }: { y: number }) {
  const blocks = useMemo(
    () => [
      [-1.15, -0.55],
      [-0.55, -0.6],
      [0.05, -0.5],
      [-1.0, 0.45],
      [-0.4, 0.55],
      [0.95, 0.5],
      [1.2, -0.45],
    ],
    [],
  );
  return (
    <group position={[0, y, 0]}>
      {blocks.map(([x, z], index) => (
        <mesh key={`${x}-${z}`} position={[x, SLAB_H / 2 + 0.11, z]}>
          <boxGeometry args={[0.34, 0.22, 0.34]} />
          <meshStandardMaterial color={index % 3 === 0 ? "#b5a4ff" : "#f0eeff"} metalness={0.2} roughness={0.18} transparent opacity={0.92} />
        </mesh>
      ))}
      <group position={[0.5, SLAB_H / 2 + 0.26, 0]}>
        <mesh>
          <icosahedronGeometry args={[0.26, 2]} />
          <meshStandardMaterial color="#f7f6ff" roughness={0.05} metalness={0.3} transparent opacity={0.9} />
        </mesh>
        <mesh scale={0.58}>
          <icosahedronGeometry args={[0.26, 1]} />
          <meshStandardMaterial color="#bfe98c" emissive="#61ded5" emissiveIntensity={1.6} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

function IntegrationRings({ y }: { y: number }) {
  const rings: [number, number, string][] = [
    [-1.05, 0.35, "#61ded5"],
    [0.1, -0.55, "#ff8b75"],
    [1.15, 0.4, "#72a4ff"],
  ];
  return (
    <group position={[0, y, 0]}>
      {rings.map(([x, z, color]) => (
        <group key={`${x}-${z}`} position={[x, SLAB_H / 2 + 0.08, z]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.28, 0.035, 14, 48]} />
            <meshStandardMaterial color="#e6e9f7" metalness={0.95} roughness={0.12} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} scale={0.55}>
            <torusGeometry args={[0.28, 0.03, 14, 48]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.3} toneMapped={false} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, SLAB_H / 2 + 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.3, 1.32, 64]} />
        <meshBasicMaterial color="#61ded5" transparent opacity={0.45} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function DataStores({ y }: { y: number }) {
  const stores: [number, number][] = [
    [-1.1, 0.3],
    [-0.4, -0.5],
    [0.9, 0.35],
  ];
  return (
    <group position={[0, y, 0]}>
      {stores.map(([x, z]) => (
        <group key={`${x}-${z}`} position={[x, SLAB_H / 2 + 0.2, z]}>
          <mesh>
            <cylinderGeometry args={[0.26, 0.26, 0.4, 36]} />
            <meshStandardMaterial color="#72a4ff" metalness={0.75} roughness={0.22} />
          </mesh>
          {[-0.08, 0.06].map((offset) => (
            <mesh key={offset} position={[0, offset, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.262, 0.012, 8, 48]} />
              <meshStandardMaterial color="#bfe98c" emissive="#bfe98c" emissiveIntensity={0.9} />
            </mesh>
          ))}
        </group>
      ))}
      <mesh position={[0.3, SLAB_H / 2 + 0.06, -0.3]}>
        <boxGeometry args={[0.9, 0.12, 0.42]} />
        <meshStandardMaterial color="#1f2a4d" metalness={0.9} roughness={0.3} />
      </mesh>
    </group>
  );
}

function Conduit({ points, color, radius = 0.022 }: { points: number[][]; color: string; radius?: number }) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points.map((point) => new THREE.Vector3(point[0], point[1], point[2]))), [points]);
  return (
    <mesh>
      <tubeGeometry args={[curve, 48, radius, 10, false]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.4} roughness={0.2} toneMapped={false} transparent opacity={0.92} />
    </mesh>
  );
}

function ShadowDisc() {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext("2d");
    if (!context) return null;
    const gradient = context.createRadialGradient(64, 64, 8, 64, 64, 64);
    gradient.addColorStop(0, "rgba(0,0,0,0.5)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 128, 128);
    const map = new THREE.CanvasTexture(canvas);
    map.colorSpace = THREE.SRGBColorSpace;
    return map;
  }, []);
  useEffect(() => () => texture?.dispose(), [texture]);
  if (!texture) return null;
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, layers[3].y - 0.55, 0]} scale={[1.6, 1, 1]}>
      <circleGeometry args={[2.2, 48]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} />
    </mesh>
  );
}

function ProductStack({ pointer, scroll }: { pointer: MutableRefObject<{ x: number; y: number }>; scroll: MutableRefObject<number> }) {
  const root = useRef<THREE.Group>(null);
  const stack = useRef<THREE.Group>(null);
  const panels = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const step = Math.min(delta, 0.05);
    const time = state.clock.elapsedTime;
    if (root.current) {
      root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, -0.62 + pointer.current.x * 0.22, 2.4, step);
      root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, 0.38 + pointer.current.y * -0.08, 2.4, step);
      root.current.position.y = THREE.MathUtils.damp(root.current.position.y, -0.2 + scroll.current * 0.3, 2.4, step);
    }
    if (stack.current) stack.current.position.y = Math.sin(time * 0.6) * 0.04;
    if (panels.current) {
      panels.current.position.y = Math.sin(time * 0.9 + 1) * 0.05;
      panels.current.children.forEach((child, index) => {
        child.rotation.z = Math.sin(time * 0.7 + index) * 0.02;
      });
    }
  });

  return (
    <group ref={root} rotation={[0.38, -0.62, 0]} position={[-0.7, -0.2, 0]} scale={0.88}>
      <ShadowDisc />
      <group ref={stack}>
        {layers.map((layer) => (
          <Slab key={layer.id} layer={layer} />
        ))}
        <ServiceBlocks y={layers[1].y} />
        <IntegrationRings y={layers[2].y} />
        <DataStores y={layers[3].y} />
        <Conduit color="#61ded5" points={[[-1.05, layers[3].y + 0.3, 0.3], [-1.05, layers[2].y + 0.1, 0.35], [-1.0, layers[1].y + 0.1, 0.45], [-1.0, layers[0].y - 0.06, 0.45]]} />
        <Conduit color="#ff8b75" points={[[0.1, layers[2].y + 0.1, -0.55], [0.05, layers[1].y + 0.1, -0.5], [0.4, layers[0].y + 0.3, -0.3]]} />
        <Conduit color="#bfe98c" points={[[0.9, layers[3].y + 0.3, 0.35], [1.15, layers[2].y + 0.1, 0.4], [0.95, layers[1].y + 0.1, 0.5], [0.5, layers[1].y + 0.4, 0.1]]} radius={0.018} />
        <Conduit color="#b5a4ff" points={[[-0.4, layers[3].y + 0.3, -0.5], [-0.55, layers[1].y + 0.1, -0.6], [-0.7, layers[0].y + 0.5, -0.5]]} radius={0.016} />
        <group ref={panels}>
          <InterfacePanel kind="dashboard" position={[-0.55, layers[0].y + 0.78, 0.25]} rotation={[-0.12, 0.42, 0.02]} size={[1.5, 0.94]} />
          <InterfacePanel kind="assistant" position={[0.95, layers[0].y + 1.02, -0.5]} rotation={[-0.1, 0.3, -0.03]} size={[1.42, 0.89]} />
          <InterfacePanel kind="mobile" position={[1.35, layers[0].y + 0.52, 0.62]} rotation={[-0.08, 0.5, 0.04]} size={[0.56, 1.05]} />
        </group>
      </group>
    </group>
  );
}

export default function CoreCanvas({ active, onFailure }: { active: boolean; onFailure: () => void }) {
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const [pageVisible, setPageVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      scroll.current = Math.min(window.scrollY / 800, 1);
    };
    const onVisibility = () => setPageVisible(document.visibilityState === "visible");
    onScroll();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0.3, 11.2], fov: 30 }}
      dpr={[1, 1.5]}
      frameloop={!ready ? "never" : active && pageVisible ? "always" : "demand"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.08;
      }}
    >
      <ContextLossGuard onFailure={onFailure} />
      <Staging />
      <Precompile onReady={onReady} />
      <ambientLight intensity={0.3} color="#b5a4ff" />
      <directionalLight position={[4.5, 7, 5]} intensity={1.7} color="#f7f6ff" />
      <directionalLight position={[-5.5, 3, 2.5]} intensity={1.2} color="#61ded5" />
      <directionalLight position={[2, -3, -4]} intensity={0.9} color="#866cff" />
      <pointLight position={[2.6, 1.4, 2]} intensity={2} distance={8} decay={2} color="#ff8b75" />
      <pointLight position={[-1.4, 2.6, 1.8]} intensity={1.6} distance={7} decay={2} color="#72a4ff" />
      <ProductStack pointer={pointer} scroll={scroll} />
    </Canvas>
  );
}
