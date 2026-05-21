import { useState, useRef } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { ExternalLink, Star, Building2, Layers } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { projects } from '../data';

type Project = typeof projects[0];

/* ── Abstract visual header per project ────────────────────────── */
function ProjectVisual({ project }: { project: Project }) {
  const accent = project.accent;
  const shapes = [
    { w: '55%', h: 10, top: '22%', left: '8%',  opacity: 0.9 },
    { w: '35%', h: 10, top: '22%', left: '67%', opacity: 0.5 },
    { w: '70%', h: 10, top: '44%', left: '8%',  opacity: 0.6 },
    { w: '20%', h: 10, top: '44%', left: '72%', opacity: 0.35 },
    { w: '45%', h: 10, top: '66%', left: '8%',  opacity: 0.45 },
    { w: '30%', h: 10, top: '66%', left: '57%', opacity: 0.7 },
  ];
  return (
    <div style={{
      height: 130, position: 'relative', overflow: 'hidden',
      background: `linear-gradient(135deg, ${accent}14 0%, ${accent}06 100%)`,
      borderBottom: `1px solid ${accent}25`,
    }}>
      {/* Grid lines */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(${accent}18 1px, transparent 1px), linear-gradient(90deg, ${accent}18 1px, transparent 1px)`,
        backgroundSize: '28px 28px',
      }} />
      {/* Abstract UI bars */}
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: s.opacity }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: 'easeOut' }}
          style={{
            position: 'absolute', top: s.top, left: s.left,
            width: s.w, height: s.h, borderRadius: 6,
            background: `linear-gradient(90deg, ${accent}, ${accent}60)`,
            transformOrigin: 'left',
          }}
        />
      ))}
      {/* Glow circle */}
      <div style={{
        position: 'absolute', top: '50%', right: '12%',
        transform: 'translateY(-50%)',
        width: 70, height: 70, borderRadius: '50%',
        background: `radial-gradient(circle, ${accent}35 0%, transparent 70%)`,
        filter: 'blur(10px)',
      }} />
      {/* Featured star */}
      {project.featured && (
        <div style={{
          position: 'absolute', top: 12, right: 12,
          display: 'flex', alignItems: 'center', gap: 4,
          background: `${accent}22`, border: `1px solid ${accent}60`,
          color: accent, fontSize: '0.68rem', fontWeight: 700,
          padding: '3px 10px', borderRadius: 20,
          backdropFilter: 'blur(6px)',
        }}>
          <Star size={10} fill={accent} /> Featured
        </div>
      )}
    </div>
  );
}

/* ── Single project card with 3D tilt + glare ───────────────────── */
function ProjectCard({ project, i }: { project: Project; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rX = useSpring(0, { stiffness: 380, damping: 32 });
  const rY = useSpring(0, { stiffness: 380, damping: 32 });
  const sc = useSpring(1, { stiffness: 280, damping: 26 });
  const [glare, setGlare] = useState({ x: 50, y: 50, on: false });
  const accent = project.accent;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top)  / r.height;
    rY.set((px - 0.5) * 20);
    rX.set(-(py - 0.5) * 20);
    setGlare({ x: px * 100, y: py * 100, on: true });
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.93 }}
      transition={{ duration: 0.45, delay: i * 0.1 }}
      onMouseMove={onMove}
      onMouseEnter={() => sc.set(1.03)}
      onMouseLeave={() => { rX.set(0); rY.set(0); sc.set(1); setGlare(g => ({ ...g, on: false })); }}
      style={{
        rotateX: rX, rotateY: rY, scale: sc,
        transformStyle: 'preserve-3d',
        background: 'var(--surface)',
        border: `1px solid ${project.featured ? accent + '50' : 'var(--border)'}`,
        borderRadius: '1.25rem',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        position: 'relative',
        boxShadow: project.featured ? `0 0 40px ${accent}18` : 'none',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        willChange: 'transform',
        cursor: 'default',
      }}
    >
      {/* Animated gradient border on hover */}
      <motion.div
        style={{
          position: 'absolute', inset: 0, borderRadius: '1.25rem',
          background: `linear-gradient(135deg, ${accent}00, ${accent}30, ${accent}00)`,
          opacity: glare.on ? 1 : 0,
          pointerEvents: 'none', zIndex: 0,
          transition: 'opacity 0.3s',
        }}
      />

      {/* Cursor glare */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '1.25rem',
        pointerEvents: 'none', zIndex: 20,
        background: glare.on
          ? `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.07) 0%, transparent 60%)`
          : 'none',
        transition: 'background 0.04s',
      }} />

      {/* Visual header */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <ProjectVisual project={project} />
      </div>

      {/* Card body */}
      <div style={{ padding: '1.6rem', flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>

        {/* Company + year row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            fontSize: '0.7rem', fontWeight: 700,
            padding: '3px 10px', borderRadius: 20,
            background: `${project.companyColor}15`,
            border: `1px solid ${project.companyColor}40`,
            color: project.companyColor,
          }}>
            <Building2 size={10} /> {project.company}
          </span>
          <span style={{
            fontSize: '0.72rem', color: 'var(--text)',
            background: 'var(--surface2)', padding: '2px 8px',
            borderRadius: 6, border: '1px solid var(--border)',
          }}>
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: '1.25rem', fontWeight: 800,
          color: 'var(--text-heading)', margin: '0 0 0.2rem',
          letterSpacing: '-0.02em',
        }}>
          {project.title}
        </h3>
        <p style={{
          fontSize: '0.75rem', color: accent, fontWeight: 600,
          marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: 5,
        }}>
          <Layers size={11} /> {project.subtitle}
        </p>

        {/* Description */}
        <p style={{
          fontSize: '0.875rem', lineHeight: 1.8,
          color: 'var(--text)', marginBottom: '1.25rem', flex: 1,
        }}>
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '1.25rem' }}>
          {project.tags.map((tag) => (
            <motion.span
              key={tag}
              whileHover={{ scale: 1.08, borderColor: accent }}
              style={{
                fontSize: '0.7rem', fontWeight: 600,
                padding: '3px 9px', borderRadius: 6,
                background: `${accent}10`,
                border: `1px solid ${accent}30`,
                color: accent,
                cursor: 'default',
                transition: 'border-color 0.2s',
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: 10 }}>
          <motion.a
            href={project.github} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '0.5rem 1.1rem', borderRadius: '0.6rem',
              border: '1px solid var(--border)', background: 'var(--surface2)',
              color: 'var(--text)', fontSize: '0.82rem',
              textDecoration: 'none', fontWeight: 600,
            }}
          >
            <GithubIcon size={14} /> Code
          </motion.a>
          <motion.a
            href={project.live} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: `0 4px 20px ${accent}35` }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '0.5rem 1.1rem', borderRadius: '0.6rem',
              border: `1px solid ${accent}60`,
              background: `${accent}12`,
              color: accent, fontSize: '0.82rem',
              textDecoration: 'none', fontWeight: 600,
            }}
          >
            <ExternalLink size={14} /> Live Demo
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main section ───────────────────────────────────────────────── */
export default function Projects() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" style={{ padding: '6rem 1.5rem', background: 'var(--surface2)', position: 'relative', overflow: 'hidden' }}>

      {/* Background orbs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '10%', left: '5%',
            width: 400, height: 400, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          style={{
            position: 'absolute', bottom: '10%', right: '5%',
            width: 350, height: 350, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            WHAT I'VE BUILT
          </p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-heading)', margin: '0 0 1rem' }}>
            Projects
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text)', maxWidth: 500, margin: '0 auto' }}>
            Real-world enterprise applications built at scale — from fintech platforms to full-stack products.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => {
            const isActive = filter === cat;
            return (
              <motion.button
                key={cat}
                onClick={() => setFilter(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '0.45rem 1.3rem', borderRadius: 100,
                  border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                  background: isActive ? 'var(--accent)' : 'var(--surface)',
                  color: isActive ? '#fff' : 'var(--text)',
                  fontWeight: isActive ? 700 : 400,
                  fontSize: '0.85rem', cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: isActive ? '0 4px 16px rgba(99,102,241,0.35)' : 'none',
                }}
              >
                {cat}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Cards grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 480px), 1fr))', gap: '1.75rem' }}
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} i={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2.5rem',
            marginTop: '4rem',
            padding: '1.5rem 2rem',
            background: 'var(--surface)',
            borderRadius: '1rem',
            border: '1px solid var(--border)',
          }}
        >
          {[
            { val: `${projects.filter(p => p.featured).length}`, label: 'Featured Projects' },
            { val: `${new Set(projects.map(p => p.category)).size}`, label: 'Categories' },
            { val: `${new Set(projects.flatMap(p => p.tags)).size}+`, label: 'Technologies Used' },
            { val: `${new Set(projects.map(p => p.company)).size - 1}`, label: 'Companies' },
          ].map(({ val, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent)' }}>{val}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text)', marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
