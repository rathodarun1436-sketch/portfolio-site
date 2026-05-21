import { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { MapPin, Mail, Briefcase } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { personal, stats } from '../data';
import { useCountUp } from '../hooks/useCountUp';

import profilePhoto from '../assets/profile.jpg';


/* ── 3-D tilt profile card ──────────────────────────────────────── */
const INNER_WORDS = [
  { text: 'React',       color: '#6366f1' },
  { text: 'TypeScript',  color: '#3b82f6' },
  { text: 'Java 21',     color: '#f59e0b' },
  { text: 'Spring Boot', color: '#10b981' },
  { text: 'Kafka',       color: '#ec4899' },
  { text: 'Redis',       color: '#a78bfa' },
];
const OUTER_WORDS = [
  { text: 'PostgreSQL', color: '#f59e0b' },
  { text: 'Docker',     color: '#3b82f6' },
  { text: 'JWT Auth',   color: '#10b981' },
  { text: 'REST API',   color: '#6366f1' },
  { text: 'Git',        color: '#ec4899' },
  { text: 'Swagger',    color: '#a78bfa' },
];

function ProfileCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const rX    = useSpring(0, { stiffness: 300, damping: 22 });
  const rY    = useSpring(0, { stiffness: 300, damping: 22 });
  const sc    = useSpring(1, { stiffness: 220, damping: 18 });
  const imgSc = useSpring(1, { stiffness: 200, damping: 16 });
  const [glare, setGlare] = useState({ x: 50, y: 50, on: false });
  const [hovered, setHovered] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top)  / r.height;
    rY.set((px - 0.5) * 28);
    rX.set(-(py - 0.5) * 28);
    setGlare({ x: px * 100, y: py * 100, on: true });
  };
  const onEnter = () => { sc.set(1.05); imgSc.set(1.1); setHovered(true); };
  const onLeave = () => {
    rX.set(0); rY.set(0); sc.set(1); imgSc.set(1);
    setGlare(g => ({ ...g, on: false })); setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove} onMouseEnter={onEnter} onMouseLeave={onLeave}
      style={{
        rotateX: rX, rotateY: rY, scale: sc,
        transformStyle: 'preserve-3d',
        position: 'relative', margin: '0 0 2rem',
        width: 'min(360px, 88vw)', aspectRatio: '1 / 1',
        cursor: 'default', willChange: 'transform',
      }}
    >
      {/* ── Spinning conic outer border ── */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', inset: -3, borderRadius: '50%',
          background: 'conic-gradient(from 0deg, #6366f1, #ec4899, #10b981, #f59e0b, #6366f1)',
          zIndex: 0,
        }}
      />

      {/* ── Card body — CIRCLE, overflow hidden ── */}
      <div style={{
        position: 'absolute', inset: 3, borderRadius: '50%',
        background: 'linear-gradient(145deg, #07071a 0%, #0e0524 60%, #060c1c 100%)',
        overflow: 'hidden', zIndex: 1,
        boxShadow: hovered
          ? '0 0 60px rgba(99,102,241,0.5), 0 0 30px rgba(236,72,153,0.3) inset'
          : '0 0 30px rgba(99,102,241,0.2)',
        transition: 'box-shadow 0.4s',
      }}>
        {/* Aurora blobs — contained inside circle */}
        <motion.div
          animate={{ x: [0,25,-15,0], y: [0,-20,25,0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '-10%', left: '-10%', width: '60%', height: '60%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.6) 0%, transparent 70%)', filter: 'blur(35px)' }}
        />
        <motion.div
          animate={{ x: [0,-20,18,0], y: [0,25,-18,0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '58%', height: '58%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.55) 0%, transparent 70%)', filter: 'blur(38px)' }}
        />
        <motion.div
          animate={{ opacity: [0.3,0.65,0.3], scale: [1,1.12,1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '70%', height: '70%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 65%)', filter: 'blur(28px)' }}
        />
      </div>

      {/* ── Inner orbit ring (CW, radius 112px) — outside overflow:hidden so words show ── */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        width: 0, height: 0, zIndex: 3,
        animation: 'orbitCW 11s linear infinite',
      }}>
        {INNER_WORDS.map((w, i) => (
          <span key={w.text} style={{ position: 'absolute', display: 'inline-block', transform: `rotate(${(360/6)*i}deg) translateX(112px)` }}>
            <span style={{
              display: 'inline-block', animation: 'counterCW 11s linear infinite',
              fontSize: '0.62rem', fontWeight: 700, fontFamily: 'monospace',
              color: w.color, whiteSpace: 'nowrap',
              background: `${w.color}20`, border: `1px solid ${w.color}50`,
              padding: '2px 8px', borderRadius: 6,
              transform: 'translateX(-50%)',
              boxShadow: `0 0 8px ${w.color}30`,
            }}>{w.text}</span>
          </span>
        ))}
      </div>

      {/* ── Outer orbit ring (CCW, radius 156px) ── */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        width: 0, height: 0, zIndex: 3,
        animation: 'orbitCCW 17s linear infinite',
      }}>
        {OUTER_WORDS.map((w, i) => (
          <span key={w.text} style={{ position: 'absolute', display: 'inline-block', transform: `rotate(${(360/6)*i + 30}deg) translateX(156px)` }}>
            <span style={{
              display: 'inline-block', animation: 'counterCCW 17s linear infinite',
              fontSize: '0.58rem', fontWeight: 600, fontFamily: 'monospace',
              color: w.color, whiteSpace: 'nowrap', opacity: 0.85,
              transform: 'translateX(-50%)',
            }}>{w.text}</span>
          </span>
        ))}
      </div>

      {/* ── Photo (centered, large, on top) ── */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 4,
      }}>
        {/* Spinning ring around photo */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: hovered ? 1.5 : 5, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute', inset: -4, borderRadius: '1.6rem',
            background: 'conic-gradient(from 0deg, #6366f1, #ec4899, #10b981, #6366f1)',
            zIndex: 0,
          }}
        />
        <motion.div style={{ scale: imgSc, position: 'relative', zIndex: 1 }}>
          <img
            src={profilePhoto}
            alt="Arun R"
            style={{
              width: 190, height: 238,
              borderRadius: '1.4rem',
              objectFit: 'cover', objectPosition: 'top center',
              display: 'block',
              border: '3px solid #07071a',
              filter: 'brightness(1.04) contrast(1.05)',
            }}
          />
          {/* Shimmer */}
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            whileHover={{ opacity: 1, x: '150%' }}
            transition={{ duration: 0.55 }}
            style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.2) 50%, transparent 65%)', borderRadius: '1.4rem', pointerEvents: 'none' }}
          />
        </motion.div>
      </div>

      {/* ── Cursor glare ── */}
      <div style={{
        position: 'absolute', inset: 3, borderRadius: '50%',
        pointerEvents: 'none', zIndex: 5,
        background: glare.on ? `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.12) 0%, transparent 60%)` : 'none',
        transition: 'background 0.03s',
      }} />

      {/* ── Available badge ── */}
      {personal.available && (
        <div style={{
          position: 'absolute', bottom: 18, right: 18,
          background: 'var(--green)', color: '#fff',
          fontSize: '0.7rem', fontWeight: 700,
          padding: '4px 12px', borderRadius: 100,
          border: '2px solid #07071a', zIndex: 6,
          display: 'flex', alignItems: 'center', gap: 5,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', boxShadow: '0 0 0 3px rgba(255,255,255,0.3)', animation: 'avatarPulse 2s infinite' }} />
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
        @keyframes orbitCW   { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
        @keyframes orbitCCW  { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
        @keyframes counterCW  { from { transform: translateX(-50%) rotate(0deg);   } to { transform: translateX(-50%) rotate(-360deg);  } }
        @keyframes counterCCW { from { transform: translateX(-50%) rotate(0deg);   } to { transform: translateX(-50%) rotate(360deg);   } }
      `}</style>
    </section>
  );
}
