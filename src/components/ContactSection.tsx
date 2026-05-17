import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle2, Loader2 } from 'lucide-react';
import type { Profile } from '../types/portfolio';

interface Props { profile: Profile }

export default function ContactSection({ profile }: Props) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    // Simulate send (replace with real email service)
    await new Promise(r => setTimeout(r, 1800));
    setStatus('sent');
    setTimeout(() => {
      setStatus('idle');
      setForm({ name: '', email: '', message: '' });
    }, 3500);
  };

  const inputClass = (field: string) => `
    w-full bg-white/60 backdrop-blur-sm border rounded-xl px-4 py-3.5 text-sm font-kanit text-charcoal
    placeholder:text-slate/40 outline-none transition-all duration-200
    ${focused === field ? 'border-maroon-royal/40 shadow-[0_0_0_3px_rgba(109,31,31,0.08)]' : 'border-black/10 hover:border-black/20'}
  `;

  return (
    <section id="contact" className="relative py-32 bg-[#F2F0EE]">
      {/* Subtle gradient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(74,14,14,0.04) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-xs font-kanit font-medium tracking-[0.4em] text-maroon-crimson/60 mb-4"
        >
          06 / CONTACT
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-kanit font-black text-5xl md:text-6xl tracking-tighter leading-[0.95] chrome-text mb-20"
        >
          Let's Build<br />Something.
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Info */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="font-kanit font-light text-base text-slate/70 leading-relaxed mb-10 max-w-sm"
            >
              Available for full-time roles, freelance projects, and research collaborations. Let's connect and create something extraordinary.
            </motion.p>

            <div className="flex flex-col gap-5 mb-10">
              {[
                { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
                { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone}` },
                { icon: MapPin, label: 'Location', value: profile.location, href: '#' },
              ].map(({ icon: Icon, label, value, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl glass-card flex items-center justify-center flex-shrink-0 group-hover:shadow-luxury transition-shadow">
                    <Icon size={15} className="text-maroon-deep" />
                  </div>
                  <div>
                    <p className="text-[10px] font-kanit font-medium tracking-widest text-slate/40 uppercase">{label}</p>
                    <p className="text-sm font-kanit font-medium text-charcoal/80 group-hover:text-maroon-deep transition-colors">{value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="flex items-center gap-3"
            >
              {profile.socials.github && (
                <a href={profile.socials.github} target="_blank" rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl glass-card flex items-center justify-center text-slate hover:text-maroon-deep hover:shadow-luxury transition-all">
                  <Github size={17} />
                </a>
              )}
              {profile.socials.linkedin && (
                <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl glass-card flex items-center justify-center text-slate hover:text-maroon-deep hover:shadow-luxury transition-all">
                  <Linkedin size={17} />
                </a>
              )}
              <a href={`mailto:${profile.email}`}
                className="btn-maroon px-6 py-2.5 text-xs font-kanit font-semibold tracking-widest flex items-center gap-2">
                <span>EMAIL DIRECTLY</span>
                <Mail size={12} />
              </a>
            </motion.div>
          </div>

          {/* Right: Glass form */}
          <motion.div
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="glass-card p-8 relative overflow-hidden"
          >
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{ backgroundImage: 'linear-gradient(rgba(74,14,14,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(74,14,14,0.5) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center h-full min-h-[320px] gap-5 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                    <CheckCircle2 size={28} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-kanit font-bold text-xl text-charcoal mb-2">Message Sent!</p>
                    <p className="font-kanit font-light text-sm text-slate/60">
                      Thanks for reaching out. I'll get back to you within 24 hours.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="relative z-10 flex flex-col gap-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-kanit font-medium tracking-[0.3em] text-slate/50 uppercase block mb-2">
                        Name
                      </label>
                      <input
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                        placeholder="Your name"
                        className={inputClass('name')}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-kanit font-medium tracking-[0.3em] text-slate/50 uppercase block mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                        placeholder="your@email.com"
                        className={inputClass('email')}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-kanit font-medium tracking-[0.3em] text-slate/50 uppercase block mb-2">
                      Message
                    </label>
                    <textarea
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      placeholder="Tell me about your project..."
                      rows={5}
                      className={`${inputClass('message')} resize-none`}
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileHover={status !== 'sending' ? { scale: 1.02, y: -2 } : {}}
                    whileTap={status !== 'sending' ? { scale: 0.98 } : {}}
                    className="btn-maroon w-full py-4 text-sm font-kanit font-semibold tracking-widest flex items-center justify-center gap-2.5 disabled:opacity-70"
                  >
                    <span>
                      {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}
                    </span>
                    {status === 'sending'
                      ? <Loader2 size={15} className="animate-spin" />
                      : <Send size={14} />
                    }
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
