"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const membraneData = [
  {
    color: "#bbadff",
    opacity: 0.48,
    points: [[-1.75, 0.9, -0.2], [-0.3, 1.62, 0.24], [0.35, 0.12, 0.68], [-1.28, -0.26, 0.18]],
  },
  {
    color: "#83a5ff",
    opacity: 0.38,
    points: [[0.12, 1.48, -0.44], [1.72, 0.72, -0.12], [1.18, -0.7, 0.52], [0.16, 0.06, 0.7]],
  },
  {
    color: "#58dcd1",
    opacity: 0.34,
    points: [[-1.52, -0.28, -0.35], [0.1, -0.02, 0.64], [0.92, -1.38, 0.14], [-0.7, -1.62, -0.24]],
  },
] satisfies { color: string; opacity: number; points: number[][] }[];

const ribbonPaths = [
  { color: "#e8edf9", radius: 0.105, points: [[-2, -0.5, 0], [-1.2, 0.65, 0.3], [0, 0.1, 0.74], [1.05, -0.72, 0.32], [2, 0.28, -0.18]] },
  { color: "#8995ad", radius: 0.075, points: [[-1.7, 1.1, -0.46], [-0.7, 0.22, 0.46], [0.12, 0.06, 0.78], [0.82, 0.82, 0.26], [1.74, 1.16, -0.34]] },
] satisfies { color: string; radius: number; points: number[][] }[];

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

function CurvedPath({ points, color, radius = 0.018, glow = false }: {
  points: number[][];
  color: string;
  radius?: number;
  glow?: boolean;
}) {
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(points.map((point) => new THREE.Vector3(point[0], point[1], point[2]))),
    [points],
  );
  return (
    <mesh>
      <tubeGeometry args={[curve, 72, radius, 10, false]} />
      <meshPhysicalMaterial
        color={color}
        metalness={glow ? 0.25 : 0.94}
        roughness={glow ? 0.18 : 0.12}
        clearcoat={1}
        emissive={glow ? color : "#000000"}
        emissiveIntensity={glow ? 1.2 : 0}
        toneMapped={!glow}
      />
    </mesh>
  );
}

function GlassMembrane({ points, color, opacity }: { points: number[][]; color: string; opacity: number }) {
  const geometry = useMemo(() => {
    const shape = new THREE.BufferGeometry();
    const positions = new Float32Array(points.flat());
    shape.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    shape.setIndex([0, 1, 2, 0, 2, 3]);
    shape.computeVertexNormals();
    return shape;
  }, [points]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return (
    <mesh geometry={geometry}>
      <meshPhysicalMaterial
        side={THREE.DoubleSide}
        color={color}
        roughness={0.08}
        metalness={0.03}
        transmission={0.7}
        thickness={0.55}
        transparent
        opacity={opacity}
        iridescence={1}
        iridescenceIOR={1.35}
        iridescenceThicknessRange={[180, 520]}
        clearcoat={1}
        clearcoatRoughness={0.05}
      />
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
    gradient.addColorStop(0, "rgba(0,0,0,0.45)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 128, 128);
    const map = new THREE.CanvasTexture(canvas);
    map.colorSpace = THREE.SRGBColorSpace;
    return map;
  }, []);
  if (!texture) return null;
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.85, 0]}>
      <circleGeometry args={[2.4, 48]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} />
    </mesh>
  );
}

function IntelligentAssembly({
  pointer,
  scroll,
}: {
  pointer: MutableRefObject<{ x: number; y: number }>;
  scroll: MutableRefObject<number>;
}) {
  const root = useRef<THREE.Group>(null);
  const assembly = useRef<THREE.Group>(null);
  const field = useRef<THREE.Group>(null);
  const core = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const step = Math.min(delta, 0.05);
    const time = state.clock.elapsedTime;
    if (root.current) {
      root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, pointer.current.x * 0.28, 2.2, step);
      root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, pointer.current.y * -0.14, 2.2, step);
      root.current.position.y = THREE.MathUtils.damp(root.current.position.y, scroll.current * 0.22, 2.2, step);
    }
    if (assembly.current) assembly.current.rotation.y = time * 0.055;
    if (field.current) field.current.rotation.z = Math.sin(time * 0.24) * 0.035;
    if (core.current) {
      const scale = 1 + Math.sin(time * 1.1) * 0.04;
      core.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={root} rotation={[0.06, -0.18, -0.03]}>
      <ShadowDisc />
      <group ref={assembly} scale={1.08}>
        {membraneData.map((membrane) => (
          <GlassMembrane key={membrane.color} {...membrane} />
        ))}
        {ribbonPaths.map((ribbon) => (
          <CurvedPath key={ribbon.color} {...ribbon} />
        ))}
        <group ref={field}>
          <CurvedPath color="#58dcd1" glow points={[[-2.15, -0.8, 0.4], [-1.1, -0.1, 0.8], [0, 0.08, 0.96], [1.18, 0.64, 0.58], [2.14, 1.22, 0.04]]} />
          <CurvedPath color="#bbadff" glow points={[[-1.72, 1.45, -0.2], [-0.8, 0.68, 0.62], [0.02, 0.06, 1.02], [0.92, -0.72, 0.48], [1.7, -1.42, 0.08]]} />
          <CurvedPath color="#ff825e" glow radius={0.012} points={[[-2, 0.68, 0.18], [-0.92, 0.42, 0.78], [0.02, 0.08, 1.04], [1.06, -0.3, 0.64], [2.08, -0.92, 0.12]]} />
        </group>
        <group ref={core} position={[0.02, 0.08, 0.94]}>
          <mesh>
            <icosahedronGeometry args={[0.48, 2]} />
            <meshPhysicalMaterial color="#f6f4fc" roughness={0.08} transmission={0.24} thickness={0.8} clearcoat={1} iridescence={0.7} />
          </mesh>
          <mesh scale={0.62}>
            <icosahedronGeometry args={[0.48, 1]} />
            <meshStandardMaterial color="#d0f28c" emissive="#58dcd1" emissiveIntensity={1.2} roughness={0.2} />
          </mesh>
        </group>
        {[
          [-2.15, -0.8, 0.4, "#58dcd1"],
          [2.14, 1.22, 0.04, "#58dcd1"],
          [-1.72, 1.45, -0.2, "#bbadff"],
          [1.7, -1.42, 0.08, "#bbadff"],
          [-2, 0.68, 0.18, "#ff825e"],
          [2.08, -0.92, 0.12, "#ff825e"],
        ].map(([x, y, z, color]) => (
          <mesh key={`${x}-${y}`} position={[x as number, y as number, z as number]}>
            <sphereGeometry args={[0.065, 18, 18]} />
            <meshStandardMaterial color={color as string} emissive={color as string} emissiveIntensity={0.8} />
          </mesh>
        ))}
        <mesh rotation={[Math.PI / 2.6, 0.35, 0.1]} position={[0, 0.02, 0.1]}>
          <torusGeometry args={[1.62, 0.026, 12, 120]} />
          <meshPhysicalMaterial color="#83a5ff" metalness={0.72} roughness={0.15} transparent opacity={0.45} />
        </mesh>
      </group>
    </group>
  );
}

export default function CoreCanvas({ active, onFailure }: { active: boolean; onFailure: () => void }) {
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const [pageVisible, setPageVisible] = useState(true);

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
      camera={{ position: [0, 0.2, 8.1], fov: 30 }}
      dpr={[1, 1.5]}
      frameloop={active && pageVisible ? "always" : "demand"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
    >
      <ContextLossGuard onFailure={onFailure} />
      <Staging />
      <ambientLight intensity={0.34} color="#bbadff" />
      <directionalLight position={[4.6, 6.5, 5]} intensity={1.55} color="#f6f4fc" />
      <directionalLight position={[-5, 2.5, 3]} intensity={1.35} color="#58dcd1" />
      <directionalLight position={[1, -3, -4]} intensity={1.05} color="#6355c9" />
      <pointLight position={[2.3, 0.5, 1.6]} intensity={1.7} distance={7} decay={2} color="#ff825e" />
      <pointLight position={[0, 0.2, 1.2]} intensity={2.1} distance={5} decay={2} color="#d0f28c" />
      <IntelligentAssembly pointer={pointer} scroll={scroll} />
    </Canvas>
  );
}
