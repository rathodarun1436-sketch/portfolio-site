import { useState, useRef } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { skills } from '../data';

/* ── 3D tilt + glare on each skill tag ─────────────────────────── */
function SkillTag({ item, color }: { item: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rX = useSpring(0, { stiffness: 500, damping: 40 });
  const rY = useSpring(0, { stiffness: 500, damping: 40 });
  const [glare, setGlare] = useState({ x: 50, y: 50, on: false });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    rY.set((px - 0.5) * 22);
    rX.set(-(py - 0.5) * 22);
    setGlare({ x: px * 100, y: py * 100, on: true });
  };

  const onLeave = () => {
    rX.set(0); rY.set(0);
    setGlare(g => ({ ...g, on: false }));
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ boxShadow: `0 8px 28px ${color}30, 0 0 0 1px ${color}50` }}
      style={{
        rotateX: rX, rotateY: rY,
        transformStyle: 'preserve-3d',
        padding: '0.6rem 1.25rem',
        borderRadius: '0.7rem',
        border: `1px solid ${color}35`,
        background: `${color}0d`,
        color: 'var(--text-heading)',
        fontSize: '0.88rem', fontWeight: 500,
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        userSelect: 'none',
        transition: 'border-color 0.2s',
      }}
    >
      {/* Glare */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 'inherit',
        pointerEvents: 'none',
        background: glare.on
          ? `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.13) 0%, transparent 65%)`
          : 'none',
        transition: 'background 0.05s',
      }} />
      {/* Glow dot */}
      <span style={{
        display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
        background: color, marginRight: 8, verticalAlign: 'middle',
        boxShadow: `0 0 8px ${color}`,
        flexShrink: 0,
      }} />
      {item}
    </motion.div>
  );
}

/* ── Magnetic stat card ────────────────────────────────────────── */
function StatCard({ s, maxItems }: { s: typeof skills[0]; maxItems: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useSpring(0, { stiffness: 200, damping: 22 });
  const my = useSpring(0, { stiffness: 200, damping: 22 });
  const rX = useSpring(0, { stiffness: 300, damping: 30 });
  const rY = useSpring(0, { stiffness: 300, damping: 30 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set((px - 0.5) * 14);
    my.set((py - 0.5) * 14);
    rY.set((px - 0.5) * 10);
    rX.set(-(py - 0.5) * 10);
  };

  const onLeave = () => { mx.set(0); my.set(0); rX.set(0); rY.set(0); };
  const pct = Math.round((s.items.length / maxItems) * 100);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        x: mx, y: my, rotateX: rX, rotateY: rY,
        transformStyle: 'preserve-3d',
        background: 'var(--surface)',
        border: `1px solid var(--border)`,
        borderRadius: '1rem',
        padding: '1.5rem',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'border-color 0.3s',
      }}
      whileHover={{
        borderColor: s.color,
        boxShadow: `0 16px 40px ${s.color}18`,
      }}
    >
      {/* Top accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        borderRadius: '1rem 1rem 0 0',
        background: s.color,
      }} />
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: -40, right: -40,
        width: 120, height: 120, borderRadius: '50%',
        background: `radial-gradient(circle, ${s.color}20 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />
      <div style={{ fontSize: '0.78rem', color: 'var(--text)', fontWeight: 600, marginBottom: '0.5rem' }}>
        {s.category}
      </div>
      <div style={{ fontSize: '2rem', fontWeight: 800, color: s.color, lineHeight: 1, marginBottom: '0.25rem' }}>
        {s.items.length}
      </div>
      <div style={{ fontSize: '0.72rem', color: 'var(--text)', marginBottom: '0.85rem' }}>technologies</div>
      {/* Progress bar */}
      <div style={{ height: 4, borderRadius: 4, background: `${s.color}20`, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          style={{ height: '100%', borderRadius: 4, background: s.color }}
        />
      </div>
    </motion.div>
  );
}

/* ── Main component ────────────────────────────────────────────── */
export default function Skills() {
  const [active, setActive] = useState(skills[0].category);
  const current = skills.find(s => s.category === active)!;
  const maxItems = Math.max(...skills.map(s => s.items.length));

  const sectionRef = useRef<HTMLDivElement>(null);
  const spotX  = useSpring(-2000, { stiffness: 120, damping: 28 });
  const spotY  = useSpring(-2000, { stiffness: 120, damping: 28 });
  const trailX = useSpring(-2000, { stiffness: 55,  damping: 20 });
  const trailY = useSpring(-2000, { stiffness: 55,  damping: 20 });

  const onSectionMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = sectionRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    spotX.set(x - 350);
    spotY.set(y - 350);
    trailX.set(x - 150);
    trailY.set(y - 150);
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      onMouseMove={onSectionMove}
      onMouseLeave={() => { spotX.set(-2000); spotY.set(-2000); }}
      style={{ padding: '6rem 1.5rem', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Section-level cursor spotlight */}
      <motion.div
        style={{
          position: 'absolute', width: 700, height: 700,
          borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
          x: spotX, y: spotY,
          background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, rgba(236,72,153,0.04) 40%, transparent 70%)',
        }}
      />
      {/* Trailing secondary glow */}
      <motion.div
        style={{
          position: 'absolute', width: 300, height: 300,
          borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
          x: trailX, y: trailY,
          background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            WHAT I USE
          </p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-heading)', margin: 0 }}>
            Skills & Technologies
          </h2>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
          style={{ position: 'relative' }}
        >
          {skills.map((s) => {
            const isActive = active === s.category;
            return (
              <motion.button
                key={s.category}
                onClick={() => setActive(s.category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '0.5rem 1.4rem',
                  borderRadius: 100,
                  border: `1px solid ${isActive ? s.color : 'var(--border)'}`,
                  background: isActive ? `${s.color}18` : 'var(--surface)',
                  color: isActive ? s.color : 'var(--text)',
                  fontWeight: isActive ? 700 : 400,
                  fontSize: '0.88rem', cursor: 'pointer',
                  position: 'relative', overflow: 'hidden',
                  transition: 'all 0.25s',
                  boxShadow: isActive ? `0 0 16px ${s.color}30` : 'none',
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="tab-pill"
                    style={{
                      position: 'absolute', inset: 0,
                      background: `${s.color}12`,
                      borderRadius: 100,
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span style={{ position: 'relative', zIndex: 1 }}>{s.category}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Skill tags — fall from above on scroll / tab change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial="hidden"
            whileInView="visible"
            exit={{ opacity: 0, y: -16, transition: { duration: 0.22 } }}
            viewport={{ once: false, amount: 0.1 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.07 } },
            }}
            className="flex flex-wrap justify-center gap-3"
          >
            {current.items.map((item, i) => (
              <motion.div
                key={item}
                variants={{
                  hidden: { opacity: 0, y: -90, rotate: i % 2 === 0 ? -7 : 7, scale: 0.8 },
                  visible: {
                    opacity: 1, y: 0, rotate: 0, scale: 1,
                    transition: { type: 'spring', stiffness: 260, damping: 16 },
                  },
                }}
              >
                <SkillTag item={item} color={current.color} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Stat cards — fall from above on scroll */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-4"
        >
          {skills.map((s, i) => (
            <motion.div
              key={s.category}
              variants={{
                hidden: { opacity: 0, y: -70, rotate: i % 2 === 0 ? -6 : 6 },
                visible: {
                  opacity: 1, y: 0, rotate: 0,
                  transition: { type: 'spring', stiffness: 240, damping: 18 },
                },
              }}
            >
              <StatCard s={s} maxItems={maxItems} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
