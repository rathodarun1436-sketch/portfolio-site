import { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { Mail, ArrowDown, Download, ExternalLink, Code2, Zap, Globe } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { useTypewriter } from '../hooks/useTypewriter';
import { personal } from '../data';

import profilePhoto from '../assets/profile.jpg';

/* ── Floating particles ─────────────────────────────────────────── */
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  dur: Math.random() * 8 + 6,
  delay: Math.random() * 5,
}));

/* ── Right-side developer card ──────────────────────────────────── */
function DevCard() {
  const ref = useRef<HTMLDivElement>(null);
  const rX = useSpring(0, { stiffness: 280, damping: 28 });
  const rY = useSpring(0, { stiffness: 280, damping: 28 });
  const sc = useSpring(1, { stiffness: 250, damping: 24 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    rY.set(((e.clientX - r.left) / r.width - 0.5) * 30);
    rX.set(-((e.clientY - r.top) / r.height - 0.5) * 30);
  };

  const CODE_LINES = [
    { tokens: [{ t: 'const ', c: '#c792ea' }, { t: 'developer', c: '#82aaff' }, { t: ' = {', c: '#fff' }] },
    { tokens: [{ t: '  name', c: '#f07178' }, { t: ': ', c: '#fff' }, { t: '"Arun Rathod"', c: '#c3e88d' }, { t: ',', c: '#fff' }] },
    { tokens: [{ t: '  role', c: '#f07178' }, { t: ': ', c: '#fff' }, { t: '"Full Stack Dev"', c: '#c3e88d' }, { t: ',', c: '#fff' }] },
    { tokens: [{ t: '  stack', c: '#f07178' }, { t: ': [', c: '#fff' }] },
    { tokens: [{ t: '    ', c: '#fff' }, { t: '"Java"', c: '#c3e88d' }, { t: ', ', c: '#fff' }, { t: '"React"', c: '#c3e88d' }, { t: ',', c: '#fff' }] },
    { tokens: [{ t: '    ', c: '#fff' }, { t: '"Kafka"', c: '#c3e88d' }, { t: ', ', c: '#fff' }, { t: '"Spring"', c: '#c3e88d' }] },
    { tokens: [{ t: '  ],', c: '#fff' }] },
    { tokens: [{ t: '  available', c: '#f07178' }, { t: ': ', c: '#fff' }, { t: 'true', c: '#ff9cac' }] },
    { tokens: [{ t: '}', c: '#fff' }] },
  ];

  const BADGES = [
    { label: 'Java 21',    color: '#f59e0b', icon: <Zap size={11} />,   top: '-18px', left: '-22px' },
    { label: 'React',      color: '#6366f1', icon: <Code2 size={11} />, top: '-18px', right: '10px' },
    { label: 'Kafka',      color: '#10b981', icon: <Globe size={11} />, bottom: '60px', left: '-28px' },
    { label: 'Spring Boot',color: '#ec4899', icon: <Zap size={11} />,  bottom: '20px', right: '-20px' },
  ];

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => sc.set(1.04)}
      onMouseLeave={() => { rX.set(0); rY.set(0); sc.set(1); }}
      style={{ rotateX: rX, rotateY: rY, scale: sc, transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      <div style={{ position: 'relative' }}>
        {/* Floating tech badges */}
        {BADGES.map(({ label, color, icon, ...pos }) => (
          <motion.div
            key={label}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 2 }}
            style={{
              position: 'absolute', zIndex: 10, ...pos,
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '5px 10px', borderRadius: 20,
              background: `${color}22`, border: `1px solid ${color}60`,
              color, fontSize: '0.7rem', fontWeight: 700,
              backdropFilter: 'blur(8px)',
              boxShadow: `0 4px 16px ${color}30`,
            }}
          >
            {icon} {label}
          </motion.div>
        ))}

        {/* Running border wrapper */}
        <div style={{
          position: 'relative', borderRadius: '1.6rem',
          padding: '2px', overflow: 'hidden', width: 340,
          boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(99,102,241,0.3)',
        }}>
          {/* Continuously spinning gradient border */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute', inset: 0,
              background: 'conic-gradient(from 0deg, #6366f1 0deg, #ec4899 60deg, #10b981 120deg, transparent 160deg, transparent 360deg)',
              transformOrigin: 'center',
            }}
          />
          {/* Main card */}
          <div style={{
            position: 'relative', zIndex: 1,
            background: 'linear-gradient(135deg, rgba(10,10,28,0.97) 0%, rgba(20,10,50,0.95) 100%)',
            borderRadius: '1.4rem',
            overflow: 'hidden',
          }}>
          {/* Window bar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '12px 16px',
            background: 'rgba(255,255,255,0.04)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            {['#ff5f57','#febc2e','#28c840'].map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
            ))}
            <span style={{ marginLeft: 8, fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace' }}>
              developer.ts
            </span>
          </div>

          {/* Profile row */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '18px 20px 14px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', inset: -3, borderRadius: '50%',
                  background: 'conic-gradient(#6366f1, #ec4899, #10b981, #6366f1)',
                }}
              />
              <img
                src={profilePhoto}
                alt="Arun Rathod"
                style={{
                  width: 54, height: 54, borderRadius: '50%',
                  objectFit: 'cover', objectPosition: 'top',
                  display: 'block', position: 'relative',
                  border: '2px solid rgba(10,10,28,0.97)',
                }}
              />
            </div>
            <div>
              <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>Arun Rathod</div>
              <div style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%', background: '#10b981',
                  boxShadow: '0 0 6px #10b981', animation: 'heroPulse 2s infinite',
                  display: 'inline-block',
                }} />
                Available for work
              </div>
            </div>
          </div>

          {/* Code snippet */}
          <div style={{ padding: '16px 20px 20px', fontFamily: 'monospace', fontSize: '0.76rem', lineHeight: 1.7 }}>
            {CODE_LINES.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.8 + i * 0.07 }}
                style={{ display: 'flex', flexWrap: 'wrap' }}
              >
                <span style={{ color: 'rgba(255,255,255,0.18)', marginRight: 12, userSelect: 'none', minWidth: 16, textAlign: 'right' }}>
                  {i + 1}
                </span>
                {line.tokens.map((tok, j) => (
                  <span key={j} style={{ color: tok.c }}>{tok.t}</span>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Stats strip */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}>
            {[
              { label: 'Projects', val: '10+' },
              { label: 'Experience', val: '4 Yrs' },
              { label: 'Technologies', val: '20+' },
            ].map(({ label, val }, i) => (
              <div key={label} style={{
                padding: '12px 8px', textAlign: 'center',
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#6366f1' }}>{val}</div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
        </div>

        {/* Glow beneath card */}
        <div style={{
          position: 'absolute', bottom: -30, left: '50%',
          transform: 'translateX(-50%)',
          width: '80%', height: 40,
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.35) 0%, transparent 70%)',
          filter: 'blur(12px)',
          pointerEvents: 'none',
        }} />
      </div>
    </motion.div>
  );
}

/* ── Main Hero ──────────────────────────────────────────────────── */
export default function Hero() {
  const role = useTypewriter(personal.roles, 90, 50, 2000);
  const sectionRef = useRef<HTMLDivElement>(null);
  const spotX = useSpring(-1000, { stiffness: 100, damping: 25 });
  const spotY = useSpring(-1000, { stiffness: 100, damping: 25 });
  const [, setMoved] = useState(false);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = sectionRef.current?.getBoundingClientRect();
    if (!r) return;
    spotX.set(e.clientX - r.left - 300);
    spotY.set(e.clientY - r.top - 300);
    setMoved(true);
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.13 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      onMouseMove={onMouseMove}
      onMouseLeave={() => { spotX.set(-1000); spotY.set(-1000); }}
      style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}
    >
      {/* ── Mouse spotlight ── */}
      <motion.div
        style={{
          position: 'absolute', width: 600, height: 600, borderRadius: '50%',
          x: spotX, y: spotY, pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, rgba(236,72,153,0.05) 40%, transparent 70%)',
        }}
      />

      {/* ── Animated orbs ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {[
          { style: { top: '8%', left: '5%', width: 500, height: 500 }, colors: 'rgba(99,102,241,0.18)', dur: 12 },
          { style: { bottom: '5%', right: '5%', width: 420, height: 420 }, colors: 'rgba(236,72,153,0.14)', dur: 15 },
          { style: { top: '45%', right: '30%', width: 300, height: 300 }, colors: 'rgba(16,185,129,0.12)', dur: 18 },
        ].map((orb, i) => (
          <motion.div
            key={i}
            animate={{ x: [0, 30 + i * 10, 0], y: [0, -20 - i * 10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: orb.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 3 }}
            style={{
              position: 'absolute', borderRadius: '50%',
              ...orb.style,
              background: `radial-gradient(circle, ${orb.colors} 0%, transparent 70%)`,
              filter: 'blur(50px)',
            }}
          />
        ))}
      </div>

      {/* ── Floating particles ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {PARTICLES.map(p => (
          <motion.div
            key={p.id}
            animate={{ y: [0, -40, 0], opacity: [0, 0.6, 0] }}
            transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              left: `${p.x}%`, top: `${p.y}%`,
              width: p.size, height: p.size,
              borderRadius: '50%',
              background: p.id % 3 === 0 ? '#6366f1' : p.id % 3 === 1 ? '#ec4899' : '#10b981',
              boxShadow: `0 0 ${p.size * 3}px currentColor`,
            }}
          />
        ))}
      </div>

      {/* ── Grid overlay ── */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.025,
        backgroundImage: 'linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)',
        backgroundSize: '50px 50px', pointerEvents: 'none',
      }} />

      {/* ── Main content: 2-column ── */}
      <div className="max-w-7xl mx-auto px-6 w-full hero-content" style={{ paddingTop: '6rem', paddingBottom: '4rem', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: '4rem' }}
          className="hero-grid">

          {/* Left: text */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible">

            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-6 inline-flex">
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '0.35rem 1rem', borderRadius: 100,
                border: '1px solid rgba(16,185,129,0.4)',
                background: 'rgba(16,185,129,0.08)',
                fontSize: '0.82rem', color: 'var(--green)', fontWeight: 500,
              }}>
                <span style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: 'var(--green)',
                  boxShadow: '0 0 0 3px rgba(16,185,129,0.3)',
                  animation: 'heroPulse 2s infinite',
                }} />
                Available for opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1 variants={itemVariants} style={{
              fontSize: 'clamp(2.8rem, 5.5vw, 5rem)',
              fontWeight: 900, lineHeight: 1.05, margin: '0 0 0.5rem',
              color: 'var(--text-heading)', letterSpacing: '-0.03em',
            }}>
              Hi, I'm
            </motion.h1>
            <motion.h1 variants={itemVariants} style={{
              fontSize: 'clamp(2.8rem, 5.5vw, 5rem)',
              fontWeight: 900, lineHeight: 1.05, margin: '0 0 1.2rem',
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Arun Rathod
            </motion.h1>

            {/* Typewriter */}
            <motion.div variants={itemVariants} style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
              fontWeight: 600, marginBottom: '1.5rem',
              color: 'var(--text)',
              minHeight: '2.4rem',
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              <span style={{ color: 'var(--accent)' }}>{'<'}</span>
              <span style={{ color: 'var(--text-heading)' }}>{role}</span>
              <span style={{
                display: 'inline-block', width: 2, height: '1.3em',
                background: 'var(--accent)', marginLeft: 2,
                animation: 'blink 1s step-end infinite',
              }} />
              <span style={{ color: 'var(--accent)' }}>{' />'}</span>
            </motion.div>

            {/* Bio */}
            <motion.p variants={itemVariants} style={{
              fontSize: '1rem', lineHeight: 1.8,
              color: 'var(--text)', maxWidth: 520,
              marginBottom: '2.5rem',
            }}>
              {personal.bio}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-8">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(99,102,241,0.6)' }}
                whileTap={{ scale: 0.96 }}
                onClick={() => scrollTo('projects')}
                style={{
                  padding: '0.8rem 2rem',
                  background: 'linear-gradient(135deg, #6366f1, #ec4899)',
                  color: '#fff', border: 'none', cursor: 'pointer',
                  borderRadius: '0.65rem', fontWeight: 700,
                  fontSize: '0.95rem',
                  display: 'flex', alignItems: 'center', gap: 8,
                  boxShadow: '0 4px 20px rgba(99,102,241,0.35)',
                }}
              >
                View My Work <ExternalLink size={16} />
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.05, borderColor: 'var(--accent)' }}
                whileTap={{ scale: 0.96 }}
                href="#"
                style={{
                  padding: '0.8rem 2rem',
                  background: 'transparent',
                  color: 'var(--text-heading)',
                  border: '1px solid var(--border)',
                  cursor: 'pointer', borderRadius: '0.65rem',
                  fontWeight: 700, fontSize: '0.95rem',
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  textDecoration: 'none',
                  transition: 'border-color 0.2s',
                }}
              >
                Download CV <Download size={16} />
              </motion.a>
            </motion.div>

            {/* Socials */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              {[
                { icon: <GithubIcon size={20} />, href: personal.github, label: 'GitHub' },
                { icon: <LinkedinIcon size={20} />, href: personal.linkedin, label: 'LinkedIn' },
                { icon: <Mail size={20} />, href: `mailto:${personal.email}`, label: 'Email' },
              ].map(({ icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.18, borderColor: 'var(--accent)', color: 'var(--accent)' }}
                  style={{
                    color: 'var(--text)', display: 'flex', alignItems: 'center',
                    padding: '0.5rem', borderRadius: '0.5rem',
                    border: '1px solid var(--border)',
                    background: 'var(--surface)',
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                  title={label}
                >
                  {icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Dev card */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="hero-card-col"
          >
            <DevCard />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={() => scrollTo('about')}
        style={{
          position: 'absolute', bottom: '2rem', left: '50%',
          transform: 'translateX(-50%)',
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--text)', display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 6, fontSize: '0.75rem', zIndex: 2,
        }}
      >
        <span>Scroll</span>
        <ArrowDown size={18} />
      </motion.button>

      <style>{`
        @keyframes blink { 0%,100% { opacity:1 } 50% { opacity:0 } }
        @keyframes heroPulse {
          0%,100% { box-shadow: 0 0 0 3px rgba(16,185,129,0.3); }
          50%      { box-shadow: 0 0 0 6px rgba(16,185,129,0.08); }
        }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-card-col { display: none; }
        }
        @media (max-width: 640px) {
          .hero-content { padding-top: 5rem !important; padding-bottom: 3rem !important; gap: 1.5rem !important; }
          .hero-bio { font-size: 0.92rem !important; }
        }
      `}</style>
    </section>
  );
}
