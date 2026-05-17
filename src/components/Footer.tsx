import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Github, Linkedin, MapPin } from 'lucide-react';
import type { Profile } from '../types/portfolio';

interface Props { profile: Profile }

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Projects', href: '#projects' },
  { label: 'Analytics', href: '#analytics' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer({ profile }: Props) {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const go = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-black/6 bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-14">
          {/* Col 1 */}
          <div>
            <h3 className="font-kanit font-black text-3xl tracking-tighter chrome-text mb-2">{profile.name}</h3>
            <p className="font-kanit text-sm text-slate/60 mb-4">{profile.title} &amp; Data Analyst</p>
            <div className="flex items-center gap-2 text-sm font-kanit text-slate/40">
              <MapPin size={12} className="text-maroon-crimson/60" />
              {profile.location}
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <p className="text-[10px] font-kanit font-medium tracking-[0.3em] text-slate/40 uppercase mb-5">Navigation</p>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              {navLinks.map(l => (
                <button
                  key={l.label}
                  onClick={() => go(l.href)}
                  className="text-left text-sm font-kanit text-slate/60 hover:text-maroon-deep transition-colors"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Col 3 */}
          <div>
            <p className="text-[10px] font-kanit font-medium tracking-[0.3em] text-slate/40 uppercase mb-5">Contact</p>
            <div className="flex flex-col gap-3">
              <div>
                <p className="font-kanit text-sm text-charcoal/70">{profile.email}</p>
                <button onClick={copyEmail} className="flex items-center gap-1.5 text-xs font-kanit text-slate/40 hover:text-maroon-deep transition-colors mt-1">
                  {copied ? <><Check size={11} className="text-emerald-500" /><span className="text-emerald-600">Copied!</span></> : <><Copy size={11} />Copy email</>}
                </button>
              </div>
              <p className="font-kanit text-sm text-slate/60">{profile.phone}</p>
              <div className="flex items-center gap-2 mt-1">
                {profile.socials.github && (
                  <a href={profile.socials.github} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-slate hover:text-maroon-deep transition-colors">
                    <Github size={15} />
                  </a>
                )}
                {profile.socials.linkedin && (
                  <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-slate hover:text-maroon-deep transition-colors">
                    <Linkedin size={15} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="divider mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-kanit text-xs text-slate/40">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="font-kanit text-xs text-slate/30">
            Built with React · TypeScript · Three.js · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
