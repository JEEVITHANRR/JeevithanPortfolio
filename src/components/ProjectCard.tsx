import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, Star } from 'lucide-react';
import type { Project } from '../types/portfolio';

interface Props { project: Project; index: number }

export default function ProjectCard({ project, index }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-150, 150], [12, -12]), { stiffness: 150, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-150, 150], [-12, 12]), { stiffness: 150, damping: 30 });
  const glowX = useSpring(useTransform(x, [-150, 150], [0, 100]), { stiffness: 100, damping: 30 });
  const glowY = useSpring(useTransform(y, [-150, 150], [0, 100]), { stiffness: 100, damping: 30 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="glass-card overflow-hidden group cursor-default transition-shadow duration-300 hover:shadow-luxury-lg"
    >
      {/* Dynamic glow overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(178,34,34,0.08) 0%, transparent 60%)`,
        }}
      />

      {/* Color bar */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${project.color}, #B22222)` }} />

      {/* Preview area */}
      <div
        className="relative h-44 flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${project.color}10, ${project.color}20)` }}
      >
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'linear-gradient(rgba(74,14,14,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(74,14,14,0.3) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <div className="relative z-10 text-center px-6">
          <p className="font-kanit font-black text-4xl tracking-tighter chrome-text leading-none">{project.title}</p>
          <p className="font-kanit text-xs text-slate/50 tracking-widest mt-2">{project.category}</p>
        </div>

        {/* Number */}
        <div className="absolute top-3 left-4 font-kanit font-black text-6xl text-maroon-deep/5 leading-none select-none">
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Featured badge */}
        {project.highlight && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-kanit font-bold tracking-widest text-white"
            style={{ background: 'linear-gradient(135deg, #4A0E0E, #B22222)' }}>
            <Star size={9} fill="white" />
            FEATURED
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-7">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="font-kanit font-bold text-lg text-charcoal group-hover:text-maroon-deep transition-colors leading-tight">
              {project.title}
            </h3>
            <p className="font-kanit text-xs text-slate/50 mt-0.5">{project.subtitle}</p>
          </div>
          <span className="text-[10px] font-kanit font-medium text-slate/40 border border-black/8 rounded-full px-2.5 py-1 flex-shrink-0">
            {project.year}
          </span>
        </div>

        <p className="font-kanit font-light text-sm text-slate/70 leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Metrics */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.metrics.map((m, i) => (
            <div key={i} className="glass-card-dark px-3 py-1.5 text-xs font-kanit">
              <span className="font-bold text-maroon-deep">{m.value}</span>
              <span className="text-slate/50 ml-1">{m.label}</span>
            </div>
          ))}
        </div>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.stack.map((t, i) => (
            <span key={i} className="text-[11px] font-kanit text-slate/50 border border-black/8 rounded-full px-2.5 py-1">
              {t}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer"
              className="btn-maroon px-5 py-2 text-xs font-kanit font-semibold tracking-widest flex items-center gap-2">
              <span>LIVE DEMO</span>
              <ExternalLink size={11} />
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="btn-outline px-5 py-2 text-xs font-kanit font-semibold tracking-widest flex items-center gap-2">
              <Github size={12} />
              CODE
            </a>
          )}
          {!project.link && !project.github && (
            <span className="text-xs font-kanit text-slate/40 italic">Analytics / Research Project</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
