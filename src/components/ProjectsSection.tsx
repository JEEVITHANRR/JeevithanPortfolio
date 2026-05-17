import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import type { Project } from '../types/portfolio';

interface Props { projects: Project[] }

export default function ProjectsSection({ projects }: Props) {
  return (
    <section id="projects" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-xs font-kanit font-medium tracking-[0.4em] text-maroon-crimson/60 mb-4"
        >
          03 / PROJECTS
        </motion.p>

        <div className="flex items-end justify-between gap-6 mb-16 flex-wrap">
          <motion.h2
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-kanit font-black text-5xl md:text-6xl tracking-tighter leading-[0.95] chrome-text"
          >
            Selected<br />Work.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-kanit font-light text-sm text-slate/60 max-w-xs"
          >
            Production-deployed AI systems, SaaS platforms, and enterprise analytics tools.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
