"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { MathUtils } from "three";

function Sculpture() {
  const group = useRef(); const ring = useRef();
  useFrame((state, delta) => {
    if (!group.current) return;
    const progress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1.35);
    group.current.rotation.y += delta * .18 + state.pointer.x * delta * .12;
    group.current.rotation.x = MathUtils.lerp(group.current.rotation.x, state.pointer.y * .14 + progress * .42, .045);
    group.current.rotation.z = MathUtils.lerp(group.current.rotation.z, progress * -.28, .035);
    group.current.position.y = MathUtils.lerp(group.current.position.y, progress * -.42, .04);
    const scale = 1 + progress * .13;
    group.current.scale.setScalar(MathUtils.lerp(group.current.scale.x, scale, .035));
    ring.current.rotation.z -= delta * (.2 + progress * .18);
  });
  return <group ref={group}><mesh><icosahedronGeometry args={[1.58, 3]} /><meshBasicMaterial color="#c5a05a" wireframe transparent opacity={.82} /></mesh><mesh ref={ring} rotation={[1.12, .3, 0]}><torusGeometry args={[2.08, .018, 10, 100]} /><meshBasicMaterial color="#5e8a70" transparent opacity={.9} /></mesh><mesh rotation={[.45, -.75, 0]}><torusGeometry args={[1.08, .012, 8, 80]} /><meshBasicMaterial color="#e3d0a1" transparent opacity={.65} /></mesh></group>;
}

function Dust() {
  const points = useRef(); const positions = new Float32Array(420);
  for (let i = 0; i < positions.length; i += 3) { positions[i] = (Math.random() - .5) * 7; positions[i + 1] = (Math.random() - .5) * 5.5; positions[i + 2] = (Math.random() - .5) * 2; }
  useFrame((_, delta) => { points.current.rotation.z += delta * .012; });
  return <points ref={points}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><pointsMaterial color="#c5a05a" size={.024} transparent opacity={.55} sizeAttenuation /></points>;
}

export default function ThreeHero({ label = "Interactive 3D geometric sculpture" }) { return <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6.4], fov: 38 }} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }} aria-label={label}><Sculpture /><Dust /></Canvas>; }
