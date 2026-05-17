import { motion } from 'framer-motion';
import { MapPin, Zap, Code2, Award } from 'lucide-react';
import type { Profile } from '../types/portfolio';

interface Props { profile: Profile }

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

export default function AboutSection({ profile }: Props) {
  return (
    <section id="about" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Label */}
        <motion.p {...fadeUp(0)} className="text-xs font-kanit font-medium tracking-[0.4em] text-maroon-crimson/60 mb-4">
          01 / ABOUT
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <motion.h2
              {...fadeUp(0.1)}
              className="font-kanit font-black text-5xl md:text-6xl tracking-tighter leading-[0.95] mb-8 chrome-text"
            >
              Engineering<br />Intelligence.
            </motion.h2>

            <motion.p {...fadeUp(0.2)} className="font-kanit font-light text-base text-slate leading-relaxed mb-6">
              {profile.bio}
            </motion.p>

            <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-2 mb-8">
              {[
                { icon: MapPin, text: profile.location, color: '#B22222' },
                { icon: Zap, text: 'AI-First Engineer', color: '#6D1F1F' },
                { icon: Code2, text: 'MERN Stack', color: '#4A0E0E' },
                { icon: Award, text: '7 Certifications', color: '#8B0000' },
              ].map(({ icon: Icon, text, color }, i) => (
                <div key={i} className="glass-card px-4 py-2 flex items-center gap-2 text-sm font-kanit text-slate">
                  <Icon size={13} style={{ color }} />
                  {text}
                </div>
              ))}
            </motion.div>

            {/* Education */}
            <motion.div {...fadeUp(0.35)} className="glass-card-dark p-6">
              <p className="text-[10px] font-kanit font-medium tracking-[0.3em] text-maroon-crimson/60 mb-3">EDUCATION</p>
              <p className="font-kanit font-bold text-charcoal text-base leading-snug">
                B.Tech – Computer Science &amp; Engineering (AI)
              </p>
              <p className="font-kanit text-sm text-slate mt-1">
                Karunya Institute of Technology &amp; Sciences, Coimbatore
              </p>
            </motion.div>
          </div>

          {/* Right: Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {profile.stats.map((stat, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.15 + i * 0.08)}
                whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(74,14,14,0.12)' }}
                className="glass-card p-7 flex flex-col justify-between min-h-[140px] transition-all duration-300"
              >
                <p className="font-kanit font-black text-4xl md:text-5xl tracking-tighter chrome-text">
                  {stat.value}<span className="text-2xl">{stat.suffix}</span>
                </p>
                <p className="font-kanit text-xs font-medium tracking-widest text-slate/60 uppercase mt-3">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="divider mt-24" />
      </div>
    </section>
  );
}
