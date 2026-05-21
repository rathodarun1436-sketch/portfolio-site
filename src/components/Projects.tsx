import { useState, useRef } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { ExternalLink, Star, Building2, Layers } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { projects } from '../data';

type Project = typeof projects[0];

/* ── Mock browser window visual ─────────────────────────────────── */
function BrowserVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  const a = project.accent;
  const bars = compact
    ? [[0.55, 0.3], [0.7, 0.2], [0.4, 0.45]]
    : [[0.55, 0.3], [0.7, 0.2], [0.4, 0.45], [0.65, 0.25]];
  const chartHeights = [0.4, 0.72, 0.5, 0.88, 0.62, 0.78, 0.45, 0.9];

  return (
    <div style={{
      width: '100%', height: '100%',
      background: `linear-gradient(160deg, ${a}14, rgba(0,0,0,0.25))`,
      borderRadius: '0.75rem',
      overflow: 'hidden',
      border: `1px solid ${a}30`,
    }}>
      {/* Browser chrome */}
      <div style={{
        height: 28,
        background: 'rgba(0,0,0,0.45)',
        borderBottom: `1px solid ${a}20`,
        display: 'flex', alignItems: 'center',
        padding: '0 10px', gap: 5,
      }}>
        {['#ff5f57', '#ffbd2e', '#28c840'].map((c, i) => (
          <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.9 }} />
        ))}
        <div style={{
          flex: 1, marginLeft: 8, height: 14,
          background: 'rgba(255,255,255,0.07)',
          borderRadius: 3, border: `1px solid ${a}15`,
        }} />
      </div>

      {/* Content bars */}
      <div style={{ padding: compact ? '10px 12px' : '12px 14px', display: 'flex', flexDirection: 'column', gap: 7 }}>
        {bars.map((row, ri) => (
          <div key={ri} style={{ display: 'flex', gap: 7 }}>
            {row.map((w, ci) => (
              <motion.div
                key={ci}
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: ri === 0 ? 0.9 : 0.35 + ci * 0.15 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 + (ri * row.length + ci) * 0.07, ease: 'easeOut' }}
                style={{
                  flex: w, height: ri === 0 ? 10 : 7, borderRadius: 4,
                  background: ri === 0
                    ? `linear-gradient(90deg, ${a}, ${a}70)`
                    : 'rgba(255,255,255,0.13)',
                  transformOrigin: 'left',
                }}
              />
            ))}
          </div>
        ))}

        {/* Mini bar chart */}
        {!compact && (
          <div style={{
            marginTop: 4, height: 38,
            background: `${a}0e`,
            borderRadius: 6, border: `1px solid ${a}20`,
            display: 'flex', alignItems: 'flex-end',
            padding: '4px 8px', gap: 4,
          }}>
            {chartHeights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.3 + i * 0.05, ease: 'easeOut' }}
                style={{
                  flex: 1, height: `${h * 100}%`,
                  background: `${a}${Math.round(50 + h * 100).toString(16).padStart(2, '0')}`,
                  borderRadius: '2px 2px 0 0',
                  transformOrigin: 'bottom',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Featured card — full-width horizontal ───────────────────────── */
function FeaturedCard({ project, i }: { project: Project; i: number }) {
  const a = project.accent;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: i * 0.12 }}
      whileHover={{ y: -5 }}
      className="featured-card"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.5fr',
        background: 'var(--surface)',
        border: `1px solid ${a}45`,
        borderRadius: '1.5rem',
        overflow: 'hidden',
        boxShadow: `0 0 60px ${a}12, 0 20px 60px rgba(0,0,0,0.18)`,
        transition: 'box-shadow 0.3s, transform 0.3s',
        position: 'relative',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 100px ${a}28, 0 30px 80px rgba(0,0,0,0.28)`; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 60px ${a}12, 0 20px 60px rgba(0,0,0,0.18)`; }}
    >
      {/* Left visual panel */}
      <div style={{
        padding: '2rem',
        background: `linear-gradient(145deg, ${a}18 0%, ${a}06 100%)`,
        borderRight: `1px solid ${a}22`,
        display: 'flex', flexDirection: 'column', gap: '1.25rem',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Featured badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          background: `${a}20`, border: `1px solid ${a}50`,
          color: a, fontSize: '0.68rem', fontWeight: 800,
          padding: '4px 12px', borderRadius: 20, width: 'fit-content',
          letterSpacing: '0.08em',
        }}>
          <Star size={9} fill={a} /> FEATURED
        </div>

        <BrowserVisual project={project} />

        {/* Bottom glow */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
          background: `radial-gradient(ellipse at bottom, ${a}18, transparent 70%)`,
          pointerEvents: 'none',
        }} />
      </div>

      {/* Right content */}
      <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          {/* Company + year */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              fontSize: '0.7rem', fontWeight: 700,
              padding: '4px 12px', borderRadius: 20,
              background: `${project.companyColor}15`, border: `1px solid ${project.companyColor}40`,
              color: project.companyColor,
            }}>
              <Building2 size={10} /> {project.company}
            </span>
            <span style={{
              fontSize: '0.72rem', color: 'var(--text)',
              background: 'var(--surface2)', padding: '3px 10px',
              borderRadius: 6, border: '1px solid var(--border)',
            }}>
              {project.year}
            </span>
          </div>

          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-heading)', margin: '0 0 0.3rem', letterSpacing: '-0.03em' }}>
            {project.title}
          </h3>
          <p style={{ fontSize: '0.82rem', color: a, fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 5 }}>
            <Layers size={12} /> {project.subtitle}
          </p>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.85, color: 'var(--text)', marginBottom: '1.5rem' }}>
            {project.description}
          </p>
        </div>

        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '1.5rem' }}>
            {project.tags.map(tag => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.08 }}
                style={{
                  fontSize: '0.7rem', fontWeight: 600,
                  padding: '3px 10px', borderRadius: 6,
                  background: `${a}10`, border: `1px solid ${a}30`, color: a, cursor: 'default',
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <motion.a href={project.github} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '0.6rem 1.3rem', borderRadius: '0.65rem',
                border: '1px solid var(--border)', background: 'var(--surface2)',
                color: 'var(--text)', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 600,
              }}
            >
              <GithubIcon size={15} /> Code
            </motion.a>
            <motion.a href={project.live} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: `0 6px 24px ${a}40` }} whileTap={{ scale: 0.96 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '0.6rem 1.3rem', borderRadius: '0.65rem',
                border: `1px solid ${a}60`,
                background: `linear-gradient(135deg, ${a}22, ${a}0e)`,
                color: a, fontSize: '0.85rem', textDecoration: 'none', fontWeight: 600,
              }}
            >
              <ExternalLink size={15} /> Live Demo
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Regular compact card with 3D tilt + glare ───────────────────── */
function ProjectCard({ project, i }: { project: Project; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rX = useSpring(0, { stiffness: 380, damping: 32 });
  const rY = useSpring(0, { stiffness: 380, damping: 32 });
  const sc = useSpring(1, { stiffness: 280, damping: 26 });
  const [glare, setGlare] = useState({ x: 50, y: 50, on: false });
  const a = project.accent;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    rY.set((px - 0.5) * 18);
    rX.set(-(py - 0.5) * 18);
    setGlare({ x: px * 100, y: py * 100, on: true });
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.93 }}
      transition={{ duration: 0.4, delay: i * 0.1 }}
      onMouseMove={onMove}
      onMouseEnter={e => {
        sc.set(1.03);
        (e.currentTarget as HTMLElement).style.borderColor = `${a}50`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 50px rgba(0,0,0,0.2), 0 0 0 1px ${a}25`;
      }}
      onMouseLeave={e => {
        rX.set(0); rY.set(0); sc.set(1); setGlare(g => ({ ...g, on: false }));
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
      style={{
        rotateX: rX, rotateY: rY, scale: sc,
        transformStyle: 'preserve-3d',
        background: 'var(--surface)',
        border: `1px solid var(--border)`,
        borderRadius: '1.25rem',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        position: 'relative',
        willChange: 'transform',
        cursor: 'default',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
    >
      {/* Top accent bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${a}, ${a}50)`, zIndex: 2 }} />

      {/* Cursor glare */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '1.25rem',
        pointerEvents: 'none', zIndex: 20,
        background: glare.on
          ? `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.08) 0%, transparent 60%)`
          : 'none',
        transition: 'background 0.04s',
      }} />

      {/* Visual header */}
      <div style={{ height: 140, padding: '0.85rem 0.85rem 0', position: 'relative', zIndex: 1 }}>
        <BrowserVisual project={project} compact />
      </div>

      {/* Card body */}
      <div style={{ padding: '1.25rem 1.4rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        {/* Company + year */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            fontSize: '0.68rem', fontWeight: 700,
            padding: '3px 10px', borderRadius: 20,
            background: `${project.companyColor}15`, border: `1px solid ${project.companyColor}40`,
            color: project.companyColor,
          }}>
            <Building2 size={9} /> {project.company}
          </span>
          <span style={{
            fontSize: '0.7rem', color: 'var(--text)',
            background: 'var(--surface2)', padding: '2px 8px',
            borderRadius: 6, border: '1px solid var(--border)',
          }}>
            {project.year}
          </span>
        </div>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-heading)', margin: '0 0 0.2rem', letterSpacing: '-0.02em' }}>
          {project.title}
        </h3>
        <p style={{ fontSize: '0.73rem', color: a, fontWeight: 600, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: 4 }}>
          <Layers size={10} /> {project.subtitle}
        </p>
        <p style={{ fontSize: '0.85rem', lineHeight: 1.75, color: 'var(--text)', marginBottom: '1rem', flex: 1 }}>
          {project.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: '1.1rem' }}>
          {project.tags.map(tag => (
            <motion.span
              key={tag}
              whileHover={{ scale: 1.08 }}
              style={{
                fontSize: '0.68rem', fontWeight: 600,
                padding: '3px 8px', borderRadius: 5,
                background: `${a}10`, border: `1px solid ${a}30`, color: a, cursor: 'default',
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <motion.a href={project.github} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '0.45rem 1rem', borderRadius: '0.55rem',
              border: '1px solid var(--border)', background: 'var(--surface2)',
              color: 'var(--text)', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 600,
            }}
          >
            <GithubIcon size={13} /> Code
          </motion.a>
          <motion.a href={project.live} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: `0 4px 18px ${a}35` }} whileTap={{ scale: 0.96 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '0.45rem 1rem', borderRadius: '0.55rem',
              border: `1px solid ${a}55`,
              background: `${a}12`,
              color: a, fontSize: '0.8rem', textDecoration: 'none', fontWeight: 600,
            }}
          >
            <ExternalLink size={13} /> Live
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
  const featuredFiltered = filtered.filter(p => p.featured);
  const regularFiltered = filtered.filter(p => !p.featured);

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
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                style={{
                  padding: '0.45rem 1.3rem', borderRadius: 100,
                  border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                  background: isActive ? 'var(--accent)' : 'var(--surface)',
                  color: isActive ? '#fff' : 'var(--text)',
                  fontWeight: isActive ? 700 : 400,
                  fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s',
                  boxShadow: isActive ? '0 4px 16px rgba(99,102,241,0.35)' : 'none',
                }}
              >
                {cat}
              </motion.button>
            );
          })}
        </motion.div>

        <AnimatePresence mode="popLayout">

          {/* Featured showcase */}
          {featuredFiltered.length > 0 && (
            <motion.div key="featured" layout style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginBottom: '1.75rem' }}>
              {filter === 'All' && (
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '0.1em', opacity: 0.5 }}
                >
                  FEATURED WORK
                </motion.p>
              )}
              {featuredFiltered.map((p, i) => <FeaturedCard key={p.id} project={p} i={i} />)}
            </motion.div>
          )}

          {/* Regular cards grid */}
          {regularFiltered.length > 0 && (
            <motion.div key="regular" layout>
              {filter === 'All' && (
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '0.1em', opacity: 0.5, marginBottom: '1.25rem' }}
                >
                  MORE PROJECTS
                </motion.p>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: '1.5rem' }}>
                {regularFiltered.map((p, i) => <ProjectCard key={p.id} project={p} i={i} />)}
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2.5rem',
            marginTop: '4rem', padding: '1.5rem 2rem',
            background: 'var(--surface)', borderRadius: '1rem', border: '1px solid var(--border)',
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

      <style>{`
        @media (max-width: 640px) {
          .featured-card { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
