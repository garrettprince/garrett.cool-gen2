import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import * as THREE from "three";
import FloatingHead from "../3D/FloatingHead";

function AnimatedHead({ z }) {
  const ref = useRef();
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);

  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2),
    y: THREE.MathUtils.randFloatSpread(height),
    rX: Math.random() * Math.PI,
    rY: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  });

  useFrame((state) => {
    ref.current.rotation.set(
      (data.rX += 0.001),
      (data.rY += 0.001),
      (data.rZ += 0.001)
    );
    ref.current.position.set(data.x * width, (data.y += 0.01), z);

    if (data.y > height) {
      data.y = -height;
    }
  });

  return <FloatingHead ref={ref} />;
}

function ObjectContainer() {
  const count = 80; // Increased count to match banana example
  const depth = 80;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen">
      <Canvas gl={{ alpha: false }} camera={{ near: 0.01, far: 110, fov: 30 }}>
        <color attach="background" args={["#fff"]} />
        <spotLight position={[10, 10, 10]} intensity={1} />
        <Suspense fallback={null}>
          <Environment preset="sunset" />
          {Array.from({ length: count }, (_, i) => (
            <AnimatedHead key={i} z={-(i / count) * depth - 20} />
          ))}
          <EffectComposer>
            <DepthOfField
              target={[0, 0, depth / 2]}
              focalLength={0.5}
              bokehScale={11}
              height={700}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default ObjectContainer;
