"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const satellites: [number, number, number][] = [
  [1.85, 0.42, 0.15],
  [-1.7, 0.15, 0.45],
  [0.35, 1.55, -0.15],
  [0.15, -1.4, 0.35],
  [-0.55, -0.25, 1.55],
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

function Sculpture({
  pointer,
  scroll,
}: {
  pointer: MutableRefObject<{ x: number; y: number }>;
  scroll: MutableRefObject<number>;
}) {
  const root = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const step = Math.min(delta, 0.05);
    const time = state.clock.elapsedTime;
    if (root.current) {
      root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, pointer.current.x * 0.35, 2.4, step);
      root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, pointer.current.y * -0.18, 2.4, step);
      root.current.position.y = THREE.MathUtils.damp(root.current.position.y, scroll.current * 0.28, 2.2, step);
    }
    if (spin.current) spin.current.rotation.y = time * 0.12;
    if (core.current) {
      const scale = 1 + Math.sin(time * 1.3) * 0.035;
      core.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={root}>
      <group ref={spin} scale={0.72} position={[0, 0.15, 0]}>
        <mesh>
          <sphereGeometry args={[1.42, 48, 48]} />
          <meshPhysicalMaterial
            color="#d5e4ee"
            metalness={0}
            roughness={0.08}
            transmission={0.9}
            thickness={0.7}
            ior={1.45}
            transparent
            opacity={1}
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.05, 0]} />
          <meshStandardMaterial color="#d5dde8" metalness={1} roughness={0.2} wireframe />
        </mesh>
        <mesh position={[0.48, -0.12, 0.28]} rotation={[0.5, 0.2, 0.4]}>
          <octahedronGeometry args={[0.62, 0]} />
          <meshStandardMaterial color="#8e99a8" metalness={1} roughness={0.28} flatShading />
        </mesh>
        <mesh ref={core}>
          <sphereGeometry args={[0.42, 32, 32]} />
          <meshStandardMaterial color="#73e5f7" emissive="#73e5f7" emissiveIntensity={2.4} toneMapped={false} />
        </mesh>
        <mesh rotation={[Math.PI / 2.35, 0.2, 0.4]}>
          <torusGeometry args={[1.72, 0.012, 12, 96]} />
          <meshStandardMaterial color="#d5dde6" metalness={1} roughness={0.25} />
        </mesh>
        <mesh rotation={[1.05, 0.8, 0.15]}>
          <torusGeometry args={[2.02, 0.008, 12, 96]} />
          <meshStandardMaterial color="#8173fa" metalness={0.8} roughness={0.32} />
        </mesh>
        {satellites.map((position) => (
          <group key={position.join("-")}>
            <Beam to={position} />
            <mesh position={position}>
              <octahedronGeometry args={[0.08, 0]} />
              <meshStandardMaterial color="#f4f6fa" metalness={0.85} roughness={0.2} />
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
      camera={{ position: [0.15, 0.05, 7.1], fov: 30 }}
      dpr={[1, 1.5]}
      frameloop={active && pageVisible ? "always" : "demand"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.08;
      }}
    >
      <Staging />
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 4, 5]} intensity={3.2} color="#f7f8fb" />
      <directionalLight position={[-5, 1, 2]} intensity={0.7} color="#c9d4e4" />
      <directionalLight position={[-2, -3, -4]} intensity={1.1} color="#8173fa" />
      <pointLight position={[0, 0, 0]} intensity={8} distance={5} decay={2} color="#73e5f7" />
      <Sculpture pointer={pointer} scroll={scroll} />
    </Canvas>
  );
}
