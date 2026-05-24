"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";
import { Model } from "./Model";

function SpatialBlob() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    // 1. Slow continuous rotation
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
      meshRef.current.rotation.x += delta * 0.1;
    }

    // 2. Smooth interpolation towards mouse cursor
    if (groupRef.current) {
      const targetX = (state.pointer.y * Math.PI) / 6;
      const targetY = (state.pointer.x * Math.PI) / 6;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -targetX,
        0.05
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetY,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[2.5, 64, 64]} />
          <meshPhysicalMaterial 
            transmission={1}
            opacity={1}
            transparent={true}
            roughness={0.1}
            thickness={2}
            ior={1.6} /* High IOR for heavy background distortion */
            color="#080a15" /* Dark, smoky blue-grey tint */
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.1}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full bg-transparent">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        {/* Soft, cool-toned lighting */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#ffffff" />
        
        <Model position={[0, -1, 0]} scale={1.5} />
        
        {/* Environment map to provide the bright highlights for the glass edges */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
