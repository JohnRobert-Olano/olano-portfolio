"use client";

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Model(props: any) {
  // We can just load the entire scene from the GLTF file
  const { scene } = useGLTF("/model.glb");
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    // Add some gentle idle animation
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/model.glb");
