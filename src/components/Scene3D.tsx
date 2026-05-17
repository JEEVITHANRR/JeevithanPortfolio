import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Torus, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

function WireframeSphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.12;
      ref.current.rotation.x += delta * 0.06;
    }
  });
  return (
    <mesh ref={ref} position={[2.5, 0, -1]} scale={1.8}>
      <sphereGeometry args={[1, 24, 24]} />
      <meshBasicMaterial
        color="#6D1F1F"
        wireframe
        transparent
        opacity={0.15}
      />
    </mesh>
  );
}

function FloatingTorus() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.5;
      ref.current.rotation.z += 0.008;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={ref} position={[-2.5, 0.5, -2]}>
        <torusGeometry args={[0.9, 0.3, 16, 60]} />
        <MeshDistortMaterial
          color="#B22222"
          transparent
          opacity={0.18}
          distort={0.3}
          speed={2}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

function FloatingIcosahedron() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.014;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.2 + 0.5;
    }
  });
  return (
    <mesh ref={ref} position={[0, -1.5, -3]}>
      <icosahedronGeometry args={[0.7, 0]} />
      <meshBasicMaterial color="#4A0E0E" wireframe transparent opacity={0.2} />
    </mesh>
  );
}

function ParticleField() {
  const count = 120;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 3;
    }
    return arr;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial color="#8B0000" size={0.025} transparent opacity={0.4} />
    </points>
  );
}

function DistortSphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.005;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      <Sphere ref={ref} args={[1, 64, 64]} position={[0.5, 0.3, -1.5]} scale={0.8}>
        <MeshDistortMaterial
          color="#4A0E0E"
          transparent
          opacity={0.08}
          distort={0.5}
          speed={2}
        />
      </Sphere>
    </Float>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} color="#B22222" />
        <pointLight position={[-3, 2, 2]} intensity={0.4} color="#6D1F1F" />

        <ParticleField />
        <WireframeSphere />
        <FloatingTorus />
        <FloatingIcosahedron />
        <DistortSphere />
      </Canvas>
    </div>
  );
}
