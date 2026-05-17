import { motion } from 'framer-motion';
import { CheckCircle2, Briefcase, Award, GraduationCap } from 'lucide-react';
import type { Experience } from '../types/portfolio';

interface Props { experience: Experience[] }

const typeIcon = (type: string) => {
  if (type === 'Internship') return Briefcase;
  if (type === 'Certification') return Award;
  return GraduationCap;
};

const typeColor = (type: string) => {
  if (type === 'Internship') return '#4A0E0E';
  if (type === 'Certification') return '#6D1F1F';
  return '#8B0000';
};

export default function ExperienceSection({ experience }: Props) {
  return (
    <section id="experience" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-xs font-kanit font-medium tracking-[0.4em] text-maroon-crimson/60 mb-4"
        >
          05 / EXPERIENCE
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-kanit font-black text-5xl md:text-6xl tracking-tighter leading-[0.95] chrome-text mb-20"
        >
          Career<br />Milestones.
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'linear-gradient(180deg, #4A0E0E, #B22222, transparent)' }}
          />

          <div className="flex flex-col gap-0">
            {experience.map((exp, i) => {
              const Icon = typeIcon(exp.type);
              const color = typeColor(exp.type);

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                  className="relative flex gap-8 md:gap-12 pb-14 last:pb-0 group"
                >
                  {/* Icon bubble */}
                  <div className="flex-shrink-0 relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className="w-10 h-10 rounded-full glass-card border flex items-center justify-center shadow-luxury transition-all duration-200 group-hover:shadow-luxury-lg"
                      style={{ borderColor: `${color}30` }}
                    >
                      <Icon size={15} style={{ color }} />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-10 border-b border-black/5 last:border-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="font-kanit font-bold text-lg text-charcoal">{exp.company}</h3>
                      <span
                        className="px-3 py-1 rounded-full text-[10px] font-kanit font-medium tracking-widest"
                        style={{ background: `${color}12`, color, border: `1px solid ${color}25` }}
                      >
                        {exp.type}
                      </span>
                      <span className="px-3 py-1 rounded-full text-[10px] font-kanit font-medium tracking-widest text-slate/50 border border-black/8">
                        {exp.period}
                      </span>
                    </div>

                    <p className="font-kanit font-medium text-sm text-slate mb-3">{exp.role}</p>

                    <p className="font-kanit font-light text-sm text-slate/60 leading-relaxed mb-5 max-w-xl">
                      {exp.description}
                    </p>

                    <div className="flex flex-col gap-2">
                      {exp.highlights.map((h, hi) => (
                        <div key={hi} className="flex items-start gap-2.5">
                          <CheckCircle2 size={13} className="flex-shrink-0 mt-0.5" style={{ color }} />
                          <span className="text-sm font-kanit text-slate/60">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="divider mt-8" />
      </div>
    </section>
  );
}
