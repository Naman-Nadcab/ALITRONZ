"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const modules: { position: [number, number, number]; size: [number, number, number] }[] = [
  { position: [1.72, 0.48, 0.18], size: [0.46, 0.14, 0.16] },
  { position: [-1.48, 0.22, 0.55], size: [0.18, 0.38, 0.14] },
  { position: [0.28, 1.52, -0.2], size: [0.32, 0.12, 0.24] },
  { position: [-0.18, -1.42, 0.32], size: [0.36, 0.12, 0.18] },
];

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

function Beam({ to }: { to: [number, number, number] }) {
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
      <meshStandardMaterial color="#9eb0c0" metalness={0.6} roughness={0.3} transparent opacity={0.55} />
    </mesh>
  );
}

function ArchitecturalLayer() {
  const fins = Array.from({ length: 10 }, (_, index) => {
    const angle = (index / 10) * Math.PI * 2;
    return {
      angle,
      position: [Math.cos(angle) * 1.34, Math.sin(angle) * 1.34, Math.sin(angle * 2) * 0.28] as [number, number, number],
    };
  });
  return (
    <group>
      <mesh rotation={[0.7, 0.35, 0.25]}>
        <torusKnotGeometry args={[0.86, 0.045, 140, 12, 2, 3]} />
        <meshPhysicalMaterial color="#82a7ff" metalness={0.72} roughness={0.18} emissive="#445da8" emissiveIntensity={0.22} />
      </mesh>
      {fins.map((fin, index) => (
        <mesh key={fin.angle} position={fin.position} rotation={[0.2, 0.4, fin.angle]}>
          <boxGeometry args={[index % 2 ? 0.34 : 0.5, 0.08, 0.22]} />
          <meshPhysicalMaterial
            color={index % 3 === 0 ? "#ff927e" : index % 2 ? "#71e6e4" : "#c8baff"}
            metalness={index % 3 === 0 ? 0.35 : 0.82}
            roughness={0.16}
            clearcoat={1}
            emissive={index % 2 ? "#2b807d" : "#5d4a98"}
            emissiveIntensity={0.16}
          />
        </mesh>
      ))}
    </group>
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
  const spin = useRef<THREE.Group>(null);
  const rings = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const step = Math.min(delta, 0.05);
    const time = state.clock.elapsedTime;
    if (root.current) {
      root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, pointer.current.x * 0.28, 2.2, step);
      root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, pointer.current.y * -0.14, 2.2, step);
      root.current.position.y = THREE.MathUtils.damp(root.current.position.y, scroll.current * 0.22, 2.2, step);
    }
    if (spin.current) spin.current.rotation.y = time * 0.08;
    if (rings.current) rings.current.rotation.z = time * 0.05;
    if (core.current) {
      const scale = 1 + Math.sin(time * 1.1) * 0.04;
      core.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={root}>
      <ShadowDisc />
      <group ref={spin} scale={0.94} position={[0, 0, 0]}>
        <ArchitecturalLayer />
        <mesh>
          <icosahedronGeometry args={[1.22, 1]} />
          <meshPhysicalMaterial
            color="#d9d2ff"
            metalness={0.02}
            roughness={0.12}
            transmission={0.42}
            thickness={0.8}
            ior={1.45}
            iridescence={1}
            iridescenceIOR={1.4}
            iridescenceThicknessRange={[180, 520]}
            clearcoat={1}
            clearcoatRoughness={0.08}
            envMapIntensity={0.7}
          />
        </mesh>
        <mesh>
          <octahedronGeometry args={[0.78, 0]} />
          <meshPhysicalMaterial color="#dbe2ff" metalness={0.94} roughness={0.12} clearcoat={1} flatShading envMapIntensity={1.2} />
        </mesh>
        <mesh rotation={[0.4, 0.8, 0.2]}>
          <dodecahedronGeometry args={[0.96, 0]} />
          <meshPhysicalMaterial color="#ad94ff" transmission={0.48} transparent opacity={0.38} roughness={0.08} thickness={0.45} iridescence={1} wireframe />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.05, 0]} />
          <meshStandardMaterial color="#9aa8bb" metalness={0.9} roughness={0.25} wireframe />
        </mesh>
        <mesh ref={core}>
          <icosahedronGeometry args={[0.28, 1]} />
          <meshStandardMaterial color="#73dfd0" emissive="#73dfd0" emissiveIntensity={0.7} />
        </mesh>
        <group ref={rings}>
          <mesh rotation={[Math.PI / 2.2, 0.35, 0.15]}>
            <torusGeometry args={[1.72, 0.012, 12, 120]} />
            <meshStandardMaterial color="#e7eef6" metalness={1} roughness={0.22} />
          </mesh>
          <mesh rotation={[1.15, 0.85, 0.2]}>
            <torusGeometry args={[2.05, 0.008, 12, 120]} />
            <meshStandardMaterial color="#8173fa" metalness={0.85} roughness={0.28} />
          </mesh>
          <mesh rotation={[0.45, 0.2, 1.1]}>
            <torusGeometry args={[1.48, 0.01, 12, 96]} />
            <meshStandardMaterial color="#73e5f7" metalness={0.7} roughness={0.2} />
          </mesh>
        </group>
        {modules.map((module) => (
          <group key={module.position.join("-")}>
            <Beam to={module.position} />
            <mesh position={module.position}>
              <boxGeometry args={module.size} />
              <meshStandardMaterial color="#d5deea" metalness={0.92} roughness={0.18} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

export default function CoreCanvas({ active }: { active: boolean }) {
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
