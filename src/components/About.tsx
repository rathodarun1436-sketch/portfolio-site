import { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { MapPin, Mail, Briefcase } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { personal, stats } from '../data';
import { useCountUp } from '../hooks/useCountUp';

import profilePhoto from '../assets/profile.jpg';


/* ── 3-D tilt profile card ──────────────────────────────────────── */

function ProfileCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const rX    = useSpring(0, { stiffness: 300, damping: 22 });
  const rY    = useSpring(0, { stiffness: 300, damping: 22 });
  const sc    = useSpring(1, { stiffness: 220, damping: 18 });
  const imgSc = useSpring(1, { stiffness: 200, damping: 16 });
  const [glare, setGlare] = useState({ x: 50, y: 50, on: false });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top)  / r.height;
    rY.set((px - 0.5) * 18);
    rX.set(-(py - 0.5) * 18);
    setGlare({ x: px * 100, y: py * 100, on: true });
  };
  const onEnter = () => { sc.set(1.03); imgSc.set(1.06); };
  const onLeave = () => {
    rX.set(0); rY.set(0); sc.set(1); imgSc.set(1);
    setGlare(g => ({ ...g, on: false }));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove} onMouseEnter={onEnter} onMouseLeave={onLeave}
      style={{
        rotateX: rX, rotateY: rY, scale: sc,
        transformStyle: 'preserve-3d',
        position: 'relative', margin: '0 0 2rem',
        width: 'min(300px, 88vw)',
        cursor: 'default', willChange: 'transform',
      }}
    >
      {/* Static gradient border */}
      <div style={{
        position: 'absolute', inset: -2, borderRadius: '1.75rem', zIndex: 0,
        background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 35%, #10b981 65%, #f59e0b 100%)',
      }} />

      {/* Outer ambient glow */}
      <div style={{
        position: 'absolute', inset: -16, borderRadius: '2.5rem', zIndex: -1,
        background: 'linear-gradient(135deg, rgba(99,102,241,0.22) 0%, rgba(236,72,153,0.14) 50%, rgba(16,185,129,0.12) 100%)',
        filter: 'blur(20px)', pointerEvents: 'none',
      }} />

      {/* Card body */}
      <div style={{
        position: 'relative', zIndex: 1, borderRadius: '1.6rem',
        background: 'linear-gradient(160deg, #0f0f23 0%, #130a25 55%, #0a1020 100%)',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Subtle mesh glows — static, no animation */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: [
            'radial-gradient(circle at 15% 15%, rgba(99,102,241,0.12) 0%, transparent 50%)',
            'radial-gradient(circle at 85% 80%, rgba(236,72,153,0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 45%, rgba(139,92,246,0.06) 0%, transparent 55%)',
          ].join(','),
        }} />

        {/* Photo */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <motion.img
            style={{ scale: imgSc, display: 'block', width: '100%', height: 340, objectFit: 'cover', objectPosition: 'center top' } as React.CSSProperties & { scale: typeof imgSc }}
            src={profilePhoto}
            alt="Arun R"
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />

          {/* Available badge */}
          {personal.available && (
            <div style={{
              position: 'absolute', top: 12, right: 12,
              display: 'flex', alignItems: 'center', gap: 5,
              background: 'rgba(6,8,20,0.75)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(16,185,129,0.55)',
              color: '#10b981', fontSize: '0.68rem', fontWeight: 700,
              padding: '4px 11px', borderRadius: 100,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', animation: 'avatarPulse 2s infinite' }} />
              Available
            </div>
          )}
        </div>


        {/* Cursor glare */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '1.6rem', pointerEvents: 'none', zIndex: 20,
          background: glare.on ? `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.07) 0%, transparent 60%)` : 'none',
          transition: 'background 0.03s',
        }} />
      </div>
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
          0%,100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.5); }
          50%      { box-shadow: 0 0 0 5px rgba(16,185,129,0.0); }
        }
      `}</style>
    </section>
  );
}
