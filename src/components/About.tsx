import { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { MapPin, Mail, Briefcase } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { personal, stats } from '../data';
import { useCountUp } from '../hooks/useCountUp';

import profilePhoto from '../assets/profile.jpg';

const TECH_WORDS = [
  { text: '<React />',  x: '4%',  y: '6%',  delay: 0,   color: 'var(--accent)' },
  { text: 'TypeScript', x: '52%', y: '4%',  delay: 0.6, color: '#3b82f6' },
  { text: 'Python',     x: '4%',  y: '78%', delay: 1.1, color: 'var(--green)' },
  { text: 'Node.js',    x: '55%', y: '82%', delay: 1.6, color: 'var(--green)' },
  { text: '{ }',        x: '2%',  y: '44%', delay: 0.4, color: 'var(--pink)' },
  { text: '=>',         x: '82%', y: '42%', delay: 0.9, color: 'var(--accent)' },
  { text: 'async',      x: '64%', y: '58%', delay: 1.3, color: '#a78bfa' },
  { text: 'const',      x: '2%',  y: '28%', delay: 0.2, color: '#f59e0b' },
  { text: 'SQL',        x: '76%', y: '18%', delay: 1.9, color: '#3b82f6' },
  { text: 'API',        x: '6%',  y: '60%', delay: 0.7, color: '#f59e0b' },
  { text: 'Git',        x: '74%', y: '70%', delay: 2.1, color: 'var(--pink)' },
  { text: '</>',        x: '40%', y: '89%', delay: 0.5, color: 'var(--accent)' },
] as const;

/* ── 3-D tilt profile card ──────────────────────────────────────── */
function ProfileCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const rX    = useSpring(0, { stiffness: 300, damping: 22 });
  const rY    = useSpring(0, { stiffness: 300, damping: 22 });
  const sc    = useSpring(1, { stiffness: 220, damping: 18 });
  const imgSc = useSpring(1, { stiffness: 200, damping: 16 });
  const shadowBlur = useSpring(0, { stiffness: 200, damping: 20 });
  const [glare, setGlare] = useState({ x: 50, y: 50, on: false });
  const [hovered, setHovered] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top)  / r.height;
    rY.set((px - 0.5) * 42);
    rX.set(-(py - 0.5) * 42);
    setGlare({ x: px * 100, y: py * 100, on: true });
  };

  const onEnter = () => {
    sc.set(1.13);
    imgSc.set(1.22);
    shadowBlur.set(1);
    setHovered(true);
  };
  const onLeave = () => {
    rX.set(0); rY.set(0); sc.set(1); imgSc.set(1); shadowBlur.set(0);
    setGlare(g => ({ ...g, on: false }));
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        rotateX: rX, rotateY: rY, scale: sc,
        transformStyle: 'preserve-3d',
        position: 'relative',
        margin: '0 auto 2rem',
        width: 'min(380px, 90vw)', aspectRatio: '380 / 420',
        cursor: 'default',
        willChange: 'transform',
        filter: hovered
          ? 'drop-shadow(0 40px 80px rgba(99,102,241,0.55)) drop-shadow(0 0 40px rgba(236,72,153,0.35))'
          : 'drop-shadow(0 10px 30px rgba(99,102,241,0.15))',
        transition: 'filter 0.4s ease',
      }}
    >
      {/* ── Running conic border ── */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', inset: -2, borderRadius: '2.2rem',
          background: 'conic-gradient(from 0deg, #6366f1 0deg, #ec4899 60deg, #10b981 120deg, transparent 160deg, transparent 360deg)',
          transformOrigin: 'center',
          zIndex: 0,
        }}
      />

      {/* ── Outer explosion glow on hover ── */}
      <motion.div
        animate={hovered
          ? { opacity: 1, scale: 1.18 }
          : { opacity: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          position: 'absolute', inset: -30, borderRadius: '3rem',
          background: 'radial-gradient(circle, rgba(99,102,241,0.22) 0%, rgba(236,72,153,0.12) 50%, transparent 75%)',
          filter: 'blur(18px)',
          pointerEvents: 'none', zIndex: 0,
        }}
      />

      {/* ── Dark tech card background ── */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '2rem',
        background: 'linear-gradient(135deg, rgba(6,6,18,0.96) 0%, rgba(20,8,50,0.93) 100%)',
        overflow: 'hidden',
        boxShadow: hovered ? 'inset 0 0 40px rgba(99,102,241,0.12)' : 'none',
        zIndex: 1,
      }}>
        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(rgba(99,102,241,0.25) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          opacity: 0.6,
        }} />
        {/* Corner accents */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: 40, height: 40, borderTop: '2px solid var(--accent)', borderLeft: '2px solid var(--accent)', borderRadius: '2rem 0 0 0' }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: 40, height: 40, borderBottom: '2px solid var(--pink)', borderRight: '2px solid var(--pink)', borderRadius: '0 0 2rem 0' }} />

        {/* Floating tech keywords */}
        {TECH_WORDS.map(({ text, x, y, delay, color }) => (
          <motion.span
            key={text}
            animate={{ y: [0, -6, 0], opacity: [0.35, 0.85, 0.35] }}
            transition={{ duration: 3 + delay * 0.5, repeat: Infinity, delay, ease: 'easeInOut' }}
            style={{
              position: 'absolute', left: x, top: y,
              fontSize: '0.68rem', fontFamily: 'monospace',
              color, fontWeight: 700, userSelect: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {text}
          </motion.span>
        ))}
      </div>

      {/* ── Pulsing glow ── */}
      <motion.div
        animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.06, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 260, height: 320, borderRadius: '2rem',
          background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
          filter: 'blur(20px)', zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* ── Photo + rotating ring ── */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
      }}>
        {/* Spinning ring — speeds up on hover */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: hovered ? 1.2 : 6, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute', inset: -4, borderRadius: '1.8rem',
            background: 'conic-gradient(from 0deg, var(--accent), var(--pink), var(--green), var(--accent))',
            zIndex: 0,
          }}
        />

        {/* Photo wrapper — pops toward viewer on hover */}
        <motion.div
          style={{
            scale: imgSc,
            position: 'relative', zIndex: 1,
            transformStyle: 'preserve-3d',
          }}
        >
          <img
            src={profilePhoto}
            alt="Arun R"
            style={{
              width: 'min(240px, 63%)', aspectRatio: '4 / 5', height: 'auto',
              borderRadius: '1.5rem',
              objectFit: 'cover',
              objectPosition: 'top center',
              display: 'block',
              border: '3px solid rgba(6,6,18,0.95)',
              filter: 'brightness(1.03) contrast(1.06)',
            }}
          />

          {/* Shimmer sweep on hover */}
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            whileHover={{ opacity: 1, x: '150%' }}
            transition={{ duration: 0.6 }}
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.22) 50%, transparent 65%)',
              borderRadius: '1.5rem', pointerEvents: 'none',
            }}
          />
        </motion.div>
      </div>

      {/* ── Cursor glare overlay (top layer) ── */}
      <div
        style={{
          position: 'absolute', inset: 0, borderRadius: '2rem',
          pointerEvents: 'none', zIndex: 10,
          background: glare.on
            ? `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 35%, transparent 65%)`
            : 'none',
          transition: 'background 0.03s',
        }}
      />

      {/* ── Hover ring pulse ── */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: [0.6, 0, 0.6], scale: [0.95, 1.12, 0.95] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: -6, borderRadius: '2.4rem',
            border: '2px solid rgba(99,102,241,0.5)',
            pointerEvents: 'none', zIndex: 11,
          }}
        />
      )}
      {hovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: [0.3, 0, 0.3], scale: [0.95, 1.22, 0.95] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          style={{
            position: 'absolute', inset: -14, borderRadius: '2.8rem',
            border: '1.5px solid rgba(236,72,153,0.3)',
            pointerEvents: 'none', zIndex: 11,
          }}
        />
      )}

      {/* ── Available badge ── */}
      {personal.available && (
        <div style={{
          position: 'absolute', bottom: 10, right: 10,
          background: 'var(--green)', color: '#fff',
          fontSize: '0.72rem', fontWeight: 600,
          padding: '0.25rem 0.75rem', borderRadius: 100,
          border: '2px solid rgba(6,6,18,0.95)',
          zIndex: 11,
          display: 'flex', alignItems: 'center', gap: 5,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: '#fff', display: 'inline-block',
            boxShadow: '0 0 0 3px rgba(255,255,255,0.3)',
            animation: 'avatarPulse 2s infinite',
          }} />
          Available
        </div>
      )}
    </motion.div>
  );
}

/* ── Stat counter card ──────────────────────────────────────────── */
function StatCard({ label, value, suffix }: { label: string; value: number; suffix: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: '0.75rem', padding: '1.25rem 1.5rem', textAlign: 'center',
    }}>
      <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: '0.82rem', color: 'var(--text)', marginTop: '0.4rem' }}>{label}</div>
    </div>
  );
}

/* ── Section ────────────────────────────────────────────────────── */
export default function About() {
  return (
    <section id="about" style={{ padding: '6rem 1.5rem', background: 'var(--surface2)' }}>
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            WHO I AM
          </p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-heading)', margin: 0 }}>
            About Me
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: 3-D profile card + info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <ProfileCard />

            {/* Info rows */}
            <div className="flex flex-col gap-3">
              {[
                { icon: <MapPin size={16} />, text: personal.location },
                { icon: <Mail size={16} />, text: personal.email },
                { icon: <Briefcase size={16} />, text: 'Software Engineer' },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text)', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--accent)' }}>{icon}</span>
                  {text}
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-3 mt-5">
              {[
                { icon: <GithubIcon size={18} />, href: personal.github, label: 'GitHub' },
                { icon: <LinkedinIcon size={18} />, href: personal.linkedin, label: 'LinkedIn' },
                { icon: <Mail size={18} />, href: `mailto:${personal.email}`, label: 'Email' },
              ].map(({ icon, href, label }) => (
                <motion.a
                  key={label} href={href} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 42, height: 42, borderRadius: '0.6rem',
                    border: '1px solid var(--border)', background: 'var(--surface)',
                    color: 'var(--text)',
                  }}
                  title={label}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: Bio + stats */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text)', marginBottom: '2rem' }}
            >
              {personal.bio}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
              style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--text)', marginBottom: '2.5rem' }}
            >
              When I'm not coding, I'm exploring new technologies, contributing to open source,
              and constantly learning to become a better engineer.
            </motion.p>

            {/* Stats grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((s) => (
                <StatCard key={s.label} label={s.label} value={s.value} suffix={s.suffix} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes avatarPulse {
          0%,100% { box-shadow: 0 0 0 3px rgba(255,255,255,0.25); }
          50%      { box-shadow: 0 0 0 6px rgba(255,255,255,0.08); }
        }
      `}</style>
    </section>
  );
}
