import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, BarChart3, Brain, Database } from 'lucide-react';
import type { AnalyticsStat } from '../types/portfolio';

interface Props { analyticsStats: AnalyticsStat[] }

// Animated bar chart
function MiniBarChart() {
  const bars = [
    { h: 40, label: 'Q1' },
    { h: 65, label: 'Q2' },
    { h: 55, label: 'Q3' },
    { h: 85, label: 'Q4' },
    { h: 72, label: 'Q5' },
    { h: 90, label: 'Q6' },
  ];
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimated(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex items-end justify-between gap-2 h-24 px-2">
      {bars.map((b, i) => (
        <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={animated ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.1 }}
            style={{
              height: `${b.h}%`,
              transformOrigin: 'bottom',
              background: 'linear-gradient(180deg, #B22222, #4A0E0E)',
              borderRadius: '4px 4px 0 0',
            }}
            className="w-full"
          />
          <span className="text-[9px] font-kanit text-slate/40">{b.label}</span>
        </div>
      ))}
    </div>
  );
}

// Animated line path
function MiniLineChart() {
  const [drawn, setDrawn] = useState(false);
  const ref = useRef<SVGPathElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setDrawn(true); }, { threshold: 0.5 });
    if (wrapRef.current) obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, []);

  const path = 'M0,60 C20,55 40,20 60,30 S100,50 120,35 S160,10 180,20 L200,15';

  return (
    <div ref={wrapRef} className="relative h-20 w-full">
      <svg viewBox="0 0 200 70" preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4A0E0E" />
            <stop offset="100%" stopColor="#B22222" />
          </linearGradient>
          <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B22222" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#B22222" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${path} L200,70 L0,70 Z`} fill="url(#area-grad)" />
        <motion.path
          ref={ref}
          d={path}
          fill="none"
          stroke="url(#line-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={drawn ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
    </div>
  );
}

// Animated donut
function DonutChart() {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimated(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const radius = 36;
  const circ = 2 * Math.PI * radius;
  const segments = [
    { pct: 0.45, color: '#4A0E0E' },
    { pct: 0.30, color: '#8B0000' },
    { pct: 0.15, color: '#B22222' },
    { pct: 0.10, color: '#D4A0A0' },
  ];

  let offset = 0;
  return (
    <div ref={ref} className="flex flex-col items-center">
      <svg width="88" height="88" viewBox="0 0 88 88">
        <circle cx="44" cy="44" r={radius} fill="none" stroke="#ECECEC" strokeWidth="10" />
        {segments.map((s, i) => {
          const dash = s.pct * circ;
          const currentOffset = offset;
          offset += dash;
          return (
            <motion.circle
              key={i}
              cx="44" cy="44" r={radius}
              fill="none"
              stroke={s.color}
              strokeWidth="10"
              strokeLinecap="butt"
              strokeDasharray={`${dash} ${circ}`}
              strokeDashoffset={-(currentOffset - circ * 0.25)}
              initial={{ opacity: 0 }}
              animate={animated ? { opacity: 1 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            />
          );
        })}
        <text x="44" y="48" textAnchor="middle" className="font-kanit" fontSize="12" fontWeight="800" fill="#4A0E0E">
          88%
        </text>
      </svg>
      <p className="text-[10px] font-kanit text-slate/50 tracking-wider mt-1">ACCURACY</p>
    </div>
  );
}

export default function AnalyticsSection({ analyticsStats }: Props) {
  return (
    <section id="analytics" className="relative py-32 bg-[#F2F0EE]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-xs font-kanit font-medium tracking-[0.4em] text-maroon-crimson/60 mb-4"
        >
          04 / DATA ANALYTICS
        </motion.p>

        <div className="flex items-end justify-between gap-6 mb-16 flex-wrap">
          <motion.h2
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-kanit font-black text-5xl md:text-6xl tracking-tighter leading-[0.95] chrome-text"
          >
            Data-Driven<br />Insights.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="font-kanit font-light text-sm text-slate/60 max-w-xs"
          >
            Predictive modeling, NLP pipelines, and business intelligence at enterprise scale.
          </motion.p>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {analyticsStats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
              whileHover={{ y: -3 }}
              className="glass-card p-6 transition-all duration-300 hover:shadow-luxury"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-kanit font-medium tracking-[0.3em] text-slate/50 uppercase">{stat.label}</p>
                <div className={`flex items-center gap-1 text-[10px] font-kanit font-medium px-2 py-0.5 rounded-full ${
                  stat.positive ? 'text-emerald-700 bg-emerald-50' : 'text-red-700 bg-red-50'
                }`}>
                  {stat.positive ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
                  {stat.delta}
                </div>
              </div>
              <p className="font-kanit font-black text-2xl md:text-3xl tracking-tighter chrome-text">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Chart showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Bar chart card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 size={14} className="text-maroon-crimson" />
              <p className="text-xs font-kanit font-medium tracking-widest text-slate/60">READMISSION RISK</p>
            </div>
            <p className="font-kanit font-bold text-sm text-charcoal mb-5">30-Day Clinical Forecast</p>
            <MiniBarChart />
          </motion.div>

          {/* Line chart card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={14} className="text-maroon-crimson" />
              <p className="text-xs font-kanit font-medium tracking-widest text-slate/60">COST SAVINGS TREND</p>
            </div>
            <p className="font-kanit font-bold text-sm text-charcoal mb-5">$2.4M Surfaced</p>
            <MiniLineChart />
            <div className="flex items-center justify-between mt-3">
              <span className="text-[10px] font-kanit text-slate/40">Jan</span>
              <span className="text-[10px] font-kanit text-slate/40">Jun</span>
              <span className="text-[10px] font-kanit text-slate/40">Dec</span>
            </div>
          </motion.div>

          {/* Donut + AI panel */}
          <motion.div
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="glass-card p-6 flex flex-col gap-5"
          >
            <div className="flex items-center gap-2 mb-1">
              <Brain size={14} className="text-maroon-crimson" />
              <p className="text-xs font-kanit font-medium tracking-widest text-slate/60">NLP MODEL PERFORMANCE</p>
            </div>
            <div className="flex items-center gap-5">
              <DonutChart />
              <div className="flex flex-col gap-2">
                {[
                  { label: 'Logistic Reg.', color: '#4A0E0E' },
                  { label: 'Naive Bayes', color: '#8B0000' },
                  { label: 'SVM', color: '#B22222' },
                  { label: 'Ensemble', color: '#D4A0A0' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ background: item.color }} />
                    <span className="text-[11px] font-kanit text-slate/60">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insight panel */}
            <div className="glass-card-dark p-4 mt-auto">
              <div className="flex items-center gap-2 mb-2">
                <Database size={11} className="text-maroon-crimson" />
                <p className="text-[10px] font-kanit font-bold tracking-widest text-maroon-deep">AI INSIGHT</p>
              </div>
              <p className="text-[11px] font-kanit text-slate/60 leading-relaxed">
                Ensemble model on 5,000+ headlines achieves 88%+ accuracy for real-time market signal generation.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
