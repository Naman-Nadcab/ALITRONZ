"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const glassBlades = [
  { position: [-0.72, 0.52, 0.12], rotation: [0.18, -0.34, 0.48], size: [0.38, 2.9, 0.22], color: "#c8baff" },
  { position: [0.62, -0.36, 0.2], rotation: [-0.22, 0.28, -0.56], size: [0.34, 2.65, 0.18], color: "#71e6e4" },
  { position: [0.1, 0.28, -0.62], rotation: [0.12, 0.2, 1.12], size: [0.28, 2.35, 0.16], color: "#82a7ff" },
] satisfies {
  position: [number, number, number];
  rotation: [number, number, number];
  size: [number, number, number];
  color: string;
}[];

const suspendedSlabs = [
  { position: [-1.68, 0.78, 0.22], rotation: [0.08, 0.18, -0.22], size: [0.86, 0.12, 0.46], color: "#ff927e" },
  { position: [1.55, 0.86, -0.22], rotation: [-0.1, -0.25, 0.18], size: [0.72, 0.14, 0.52], color: "#71e6e4" },
  { position: [-1.28, -1.08, -0.36], rotation: [0.12, 0.38, 0.34], size: [0.72, 0.11, 0.38], color: "#82a7ff" },
  { position: [1.25, -1.18, 0.28], rotation: [-0.18, -0.28, -0.3], size: [0.92, 0.12, 0.34], color: "#d0f28c" },
] satisfies {
  position: [number, number, number];
  rotation: [number, number, number];
  size: [number, number, number];
  color: string;
}[];

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

function Beam({ to, color = "#9eb0c0" }: { to: [number, number, number]; color?: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const end = new THREE.Vector3(...to);
    mesh.position.copy(end.clone().multiplyScalar(0.5));
    mesh.scale.set(1, end.length(), 1);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), end.clone().normalize());
  }, [to]);
  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.012, 1, 0.012]} />
      <meshStandardMaterial color={color} metalness={0.6} roughness={0.22} emissive={color} emissiveIntensity={0.28} transparent opacity={0.68} />
    </mesh>
  );
}

function LuminousPath({
  points,
  color,
}: {
  points: [number, number, number][];
  color: string;
}) {
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(points.map((point) => new THREE.Vector3(...point))),
    [points],
  );
  return (
    <mesh>
      <tubeGeometry args={[curve, 56, 0.014, 8, false]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.35} toneMapped={false} />
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

function Sculpture({
  pointer,
  scroll,
}: {
  pointer: MutableRefObject<{ x: number; y: number }>;
  scroll: MutableRefObject<number>;
}) {
  const root = useRef<THREE.Group>(null);
  const architecture = useRef<THREE.Group>(null);
  const pathways = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const step = Math.min(delta, 0.05);
    const time = state.clock.elapsedTime;
    if (root.current) {
      root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, pointer.current.x * 0.28, 2.2, step);
      root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, pointer.current.y * -0.14, 2.2, step);
      root.current.position.y = THREE.MathUtils.damp(root.current.position.y, scroll.current * 0.22, 2.2, step);
    }
    if (architecture.current) architecture.current.rotation.y = time * 0.045;
    if (pathways.current) pathways.current.position.y = Math.sin(time * 0.7) * 0.035;
    if (core.current) {
      const scale = 1 + Math.sin(time * 1.1) * 0.04;
      core.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={root}>
      <ShadowDisc />
      <group ref={architecture} scale={0.94} rotation={[0.05, -0.12, 0]}>
        <mesh position={[0.02, 0, 0.04]} rotation={[0.1, 0.08, -0.22]}>
          <boxGeometry args={[0.36, 3.35, 0.38]} />
          <meshPhysicalMaterial color="#d7deed" metalness={0.96} roughness={0.12} clearcoat={1} envMapIntensity={1.4} />
        </mesh>
        <mesh position={[0.12, 0.05, -0.08]} rotation={[0.05, -0.18, 1.03]}>
          <boxGeometry args={[0.3, 2.85, 0.32]} />
          <meshPhysicalMaterial color="#aeb8cb" metalness={0.98} roughness={0.16} clearcoat={1} envMapIntensity={1.5} />
        </mesh>
        {glassBlades.map((blade) => (
          <mesh key={blade.position.join("-")} position={blade.position} rotation={blade.rotation}>
            <boxGeometry args={blade.size} />
            <meshPhysicalMaterial
              color={blade.color}
              metalness={0.04}
              roughness={0.08}
              transmission={0.72}
              transparent
              opacity={0.82}
              thickness={0.9}
              ior={1.48}
              iridescence={1}
              iridescenceIOR={1.4}
              iridescenceThicknessRange={[180, 540]}
              clearcoat={1}
              clearcoatRoughness={0.06}
              envMapIntensity={1.1}
            />
          </mesh>
        ))}
        <mesh ref={core} position={[0.04, 0.04, 0.46]} rotation={[0.35, 0.1, 0.58]} scale={[0.58, 1.08, 0.58]}>
          <octahedronGeometry args={[0.42, 0]} />
          <meshStandardMaterial color="#71e6e4" emissive="#71e6e4" emissiveIntensity={0.85} metalness={0.28} roughness={0.18} />
        </mesh>
        {suspendedSlabs.map((slab, index) => (
          <group key={slab.position.join("-")}>
            <Beam to={slab.position} color={slab.color} />
            <mesh position={slab.position} rotation={slab.rotation}>
              <boxGeometry args={slab.size} />
              <meshPhysicalMaterial
                color={slab.color}
                metalness={index % 2 ? 0.76 : 0.34}
                roughness={0.14}
                transmission={index % 2 ? 0.08 : 0.28}
                transparent
                opacity={0.94}
                clearcoat={1}
                emissive={slab.color}
                emissiveIntensity={0.08}
              />
            </mesh>
          </group>
        ))}
        <group ref={pathways}>
          <LuminousPath
            color="#71e6e4"
            points={[[-1.95, -0.72, 0.5], [-1.1, -0.22, 0.72], [0.04, 0.04, 0.66], [1.12, 0.52, 0.5], [1.9, 1.08, 0.12]]}
          />
          <LuminousPath
            color="#ad94ff"
            points={[[-1.46, 1.38, -0.28], [-0.6, 0.72, -0.52], [0.04, 0.04, -0.42], [0.72, -0.62, -0.18], [1.54, -1.42, 0.22]]}
          />
          <LuminousPath
            color="#ff927e"
            points={[[-1.7, 0.96, 0.08], [-0.84, 0.54, 0.28], [0.12, 0.05, 0.5], [0.98, -0.66, 0.46], [1.62, -1.12, 0.3]]}
          />
        </group>
        {[-1, 1].map((side) => (
          <mesh key={side} position={[side * 1.05, 0.08, -0.58]} rotation={[0.05, side * 0.22, side * -0.18]}>
            <boxGeometry args={[0.08, 2.2, 0.9]} />
            <meshPhysicalMaterial color="#9aa8bb" metalness={0.82} roughness={0.22} transparent opacity={0.46} />
          </mesh>
        ))}
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
      <ambientLight intensity={0.38} color="#c8baff" />
      <directionalLight position={[4.2, 6, 5]} intensity={1.35} color="#f4f0ff" />
      <directionalLight position={[-5, 2, 3]} intensity={1.25} color="#71e6e4" />
      <directionalLight position={[1, -2, -4]} intensity={0.85} color="#ad94ff" />
      <pointLight position={[2.2, 0.4, 1.2]} intensity={1.4} distance={6} decay={2} color="#ff927e" />
      <pointLight position={[0, 0.2, 0.4]} intensity={1.6} distance={5} decay={2} color="#c8baff" />
      <Sculpture pointer={pointer} scroll={scroll} />
    </Canvas>
  );
}
