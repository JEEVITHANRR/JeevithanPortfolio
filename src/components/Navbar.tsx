import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Projects', href: '#projects' },
  { label: 'Analytics', href: '#analytics' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      for (const l of [...links].reverse()) {
        const id = l.href.replace('#', '');
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-[0_1px_24px_rgba(0,0,0,0.08)] border-b border-black/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => go('#hero')}
            className="font-kanit font-black text-2xl tracking-tighter chrome-text"
            whileHover={{ scale: 1.04 }}
          >
            JRR
          </motion.button>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const id = l.href.replace('#', '');
              const isActive = active === id;
              return (
                <button
                  key={l.label}
                  onClick={() => go(l.href)}
                  className={`relative px-4 py-2 text-xs font-kanit font-medium tracking-widest transition-colors duration-200 ${
                    isActive ? 'text-maroon-deep' : 'text-slate hover:text-charcoal'
                  }`}
                >
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-maroon-crimson"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="mailto:jeevithanr@karunya.edu.in"
              className="btn-maroon px-6 py-2.5 text-xs font-kanit font-semibold tracking-widest"
            >
              <span>HIRE ME</span>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-charcoal hover:text-maroon-deep transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-b border-black/5 md:hidden shadow-glass-lg"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {links.map((l) => (
                <button
                  key={l.label}
                  onClick={() => go(l.href)}
                  className="text-left px-3 py-3 text-sm font-kanit font-medium tracking-widest text-slate hover:text-maroon-deep border-b border-black/4 last:border-0 transition-colors"
                >
                  {l.label}
                </button>
              ))}
              <a
                href="mailto:jeevithanr@karunya.edu.in"
                className="btn-maroon mt-3 px-6 py-3 text-xs font-semibold tracking-widest text-center"
              >
                <span>HIRE ME</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
