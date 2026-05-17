import { useRef, useEffect, lazy, Suspense } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import type { Profile } from '../types/portfolio';

const Scene3D = lazy(() => import('./Scene3D'));

interface Props { profile: Profile }

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
});

export default function HeroSection({ profile }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const rotateX = useTransform(springY, [-300, 300], [8, -8]);
  const rotateY = useTransform(springX, [-300, 300], [-8, 8]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section id="hero" ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* 3D Background */}
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>

      {/* Subtle gradient mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(178,34,34,0.05) 0%, transparent 70%)' }} />
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(74,14,14,0.06) 0%, transparent 70%)' }} />
      </div>

      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT: Text */}
        <div>
          {/* Availability badge */}
          <motion.div {...fadeUp(0.1)} className="inline-flex items-center gap-2.5 mb-8">
            <div className="glass-card px-4 py-2 flex items-center gap-2.5 text-xs font-kanit font-medium tracking-widest text-slate">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              AVAILABLE FOR OPPORTUNITIES
            </div>
          </motion.div>

          {/* Chrome heading */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="font-kanit font-black text-6xl md:text-7xl xl:text-8xl tracking-tighter leading-[0.92]"
            >
              <span className="chrome-text">{profile.title}</span>
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-6">
            <motion.h2
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="font-kanit font-black text-6xl md:text-7xl xl:text-8xl tracking-tighter leading-[0.92]"
            >
              <span className="text-slate/40">{profile.subtitle}</span>
            </motion.h2>
          </div>

          {/* Location / Name */}
          <motion.div {...fadeUp(0.45)} className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-maroon-crimson/50" />
            <span className="text-sm font-kanit font-medium tracking-widest text-slate/60">
              {profile.name} · {profile.location}
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p {...fadeUp(0.5)} className="text-base md:text-lg font-kanit font-light text-slate/60 max-w-lg leading-relaxed mb-10">
            {profile.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.6)} className="flex flex-wrap items-center gap-4 mb-10">
            <a href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="btn-maroon px-8 py-3.5 text-sm font-semibold tracking-widest">
              <span>VIEW WORK</span>
            </a>
            <a href={`mailto:${profile.email}`}
              className="btn-outline px-8 py-3.5 text-sm font-semibold tracking-widest">
              GET IN TOUCH
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div {...fadeUp(0.7)} className="flex items-center gap-3">
            {profile.socials.github && (
              <a href={profile.socials.github} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-slate hover:text-maroon-deep transition-colors">
                <Github size={16} />
              </a>
            )}
            {profile.socials.linkedin && (
              <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-slate hover:text-maroon-deep transition-colors">
                <Linkedin size={16} />
              </a>
            )}
            <a href={`mailto:${profile.email}`}
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-slate hover:text-maroon-deep transition-colors">
              <Mail size={16} />
            </a>
          </motion.div>
        </div>

        {/* RIGHT: Photo + floating stats */}
        <motion.div
          {...fadeUp(0.4)}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="relative flex items-center justify-center"
        >
          {/* Photo */}
          <div className="relative z-10">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-[2rem] border border-maroon-royal/20 scale-105" />
            <div className="absolute inset-0 rounded-[2rem] border border-maroon-royal/10 scale-110" />

            <div className="w-72 h-80 md:w-80 md:h-[380px] rounded-[2rem] overflow-hidden glass-card shadow-luxury-lg">
              <img
                src="/src/assets/photo.jpg"
                alt={profile.name}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                  const p = e.currentTarget.parentElement;
                  if (p) {
                    p.style.background = 'linear-gradient(135deg, #4A0E0E, #B22222)';
                    p.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-family:Kanit;font-size:4rem;font-weight:900;color:rgba(255,255,255,0.9)">JR</div>`;
                  }
                }}
              />
            </div>

            {/* Floating stat badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -left-6 top-1/4 glass-card px-4 py-3 shadow-luxury"
            >
              <p className="font-kanit font-black text-xl text-maroon-deep">$2.4M+</p>
              <p className="font-kanit text-xs text-slate/60 tracking-wide">Cost Savings</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 1 }}
              className="absolute -right-6 bottom-1/4 glass-card px-4 py-3 shadow-luxury"
            >
              <p className="font-kanit font-black text-xl text-maroon-deep">88%+</p>
              <p className="font-kanit text-xs text-slate/60 tracking-wide">ML Accuracy</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -right-4 top-6 glass-card px-4 py-3 shadow-luxury"
            >
              <p className="font-kanit font-black text-xl text-maroon-deep">10+</p>
              <p className="font-kanit text-xs text-slate/60 tracking-wide">Projects</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate/40"
      >
        <span className="text-[10px] font-kanit tracking-[0.4em]">SCROLL</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
