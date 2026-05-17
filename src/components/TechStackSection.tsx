import { lazy, Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import type { SkillCategory } from '../types/portfolio';
import * as THREE from 'three';

// Mini 3D rotating cube for the section header
function SkillCube() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (ref.current) {
      ref.current.rotation.x += d * 0.5;
      ref.current.rotation.y += d * 0.7;
    }
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <meshBasicMaterial color="#6D1F1F" wireframe transparent opacity={0.6} />
    </mesh>
  );
}

interface Props { skills: SkillCategory[]; techIcons: string[] }

const categoryColors: Record<string, string> = {
  Frontend: '#4A0E0E',
  Backend: '#6D1F1F',
  'Data & AI': '#8B0000',
  'Database & Cloud': '#B22222',
};

export default function TechStackSection({ skills, techIcons }: Props) {
  const doubled = [...techIcons, ...techIcons];

  return (
    <section id="stack" className="relative py-32 bg-[#F2F0EE]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center gap-6 mb-4">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-xs font-kanit font-medium tracking-[0.4em] text-maroon-crimson/60"
          >
            02 / TECH STACK
          </motion.p>
        </div>

        <div className="flex items-end gap-6 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-kanit font-black text-5xl md:text-6xl tracking-tighter leading-[0.95] chrome-text"
          >
            Technical<br />Arsenal.
          </motion.h2>

          {/* Mini 3D Cube */}
          <div className="w-20 h-20 flex-shrink-0 mb-2">
            <Canvas camera={{ position: [0, 0, 3], fov: 50 }} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
              <ambientLight intensity={0.5} />
              <SkillCube />
            </Canvas>
          </div>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {skills.map((cat, ci) => {
            const color = categoryColors[cat.name] ?? '#4A0E0E';
            return (
              <motion.div
                key={ci}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: ci * 0.1 }}
                whileHover={{ y: -4 }}
                className="glass-card p-6 transition-all duration-300"
              >
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                  <p className="text-[10px] font-kanit font-bold tracking-[0.3em] uppercase" style={{ color }}>
                    {cat.name}
                  </p>
                </div>
                <div className="flex flex-col gap-2.5">
                  {cat.skills.map((s, si) => (
                    <motion.div
                      key={si}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-2.5 text-sm font-kanit text-slate/70 hover:text-charcoal transition-colors cursor-default"
                    >
                      <span className="text-base">{s.icon}</span>
                      <span>{s.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Infinite marquee */}
        <div className="marquee-wrap py-2">
          <div className="marquee-track">
            {doubled.map((tech, i) => (
              <div
                key={i}
                className="flex-shrink-0 mx-6 px-5 py-2.5 glass-card text-sm font-kanit font-medium text-slate/60 tracking-wide whitespace-nowrap hover:text-maroon-deep transition-colors"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
