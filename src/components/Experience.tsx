import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { experience } from '../data';

const CARD_COLORS = [
  { from: '#6366f1', to: '#ec4899', glow: 'rgba(99,102,241,0.25)' },
  { from: '#10b981', to: '#6366f1', glow: 'rgba(16,185,129,0.2)' },
];

export default function Experience() {
  return (
    <section id="experience" style={{ padding: '6rem 1.5rem', background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            WHERE I'VE WORKED
          </p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-heading)', margin: 0 }}>
            Experience
          </h2>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>

          {/* Animated vertical line — wrapper keeps position, inner div animates */}
          <div className="exp-line-wrap">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
              style={{
                width: '100%', height: '100%',
                transformOrigin: 'top',
                background: 'linear-gradient(to bottom, #6366f1, #ec4899 50%, #10b981)',
              }}
            />
          </div>

          {experience.map((exp, i) => {
            const c = CARD_COLORS[i % CARD_COLORS.length];
            const isRight = i % 2 !== 0;
            return (
              <div key={i} className={`exp-row${isRight ? ' exp-row-right' : ''}`}>

                {/* Card */}
                <motion.div
                  className="exp-card"
                  initial={{ opacity: 0, scale: 0.25 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ type: 'spring', stiffness: 110, damping: 9, delay: i * 0.28 }}
                  whileHover={{ y: -6 }}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '1.25rem',
                    padding: '2rem',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = c.from;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 50px rgba(0,0,0,0.2), 0 0 0 1px ${c.from}30`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  {/* Top gradient bar */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                    borderRadius: '1.25rem 1.25rem 0 0',
                    background: `linear-gradient(90deg, ${c.from}, ${c.to})`,
                  }} />

                  {/* Background corner glow */}
                  <div style={{
                    position: 'absolute', top: -50, right: -50,
                    width: 200, height: 200, borderRadius: '50%',
                    background: `radial-gradient(circle, ${c.glow} 0%, transparent 70%)`,
                    pointerEvents: 'none',
                  }} />

                  {/* Role + badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-2" style={{ position: 'relative' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-heading)', margin: 0 }}>
                      {exp.role}
                    </h3>
                    <span style={{
                      fontSize: '0.7rem', fontWeight: 600,
                      padding: '0.2rem 0.6rem', borderRadius: 100,
                      background: 'rgba(99,102,241,0.12)',
                      border: '1px solid rgba(99,102,241,0.25)',
                      color: 'var(--accent)',
                    }}>
                      {exp.type}
                    </span>
                    {i === 0 && (
                      <span style={{
                        fontSize: '0.68rem', fontWeight: 600,
                        padding: '0.2rem 0.6rem', borderRadius: 100,
                        background: 'rgba(16,185,129,0.1)',
                        border: '1px solid rgba(16,185,129,0.3)',
                        color: '#10b981',
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                      }}>
                        <span style={{
                          width: 6, height: 6, borderRadius: '50%',
                          background: '#10b981', display: 'inline-block',
                          boxShadow: '0 0 0 3px rgba(16,185,129,0.2)',
                          animation: 'pulse 2s infinite',
                        }} />
                        Current
                      </span>
                    )}
                  </div>

                  {/* Company — gradient text */}
                  <div style={{
                    fontSize: '1.05rem', fontWeight: 700,
                    background: `linear-gradient(90deg, ${c.from}, ${c.to})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '0.75rem',
                    position: 'relative',
                  }}>
                    {exp.company}
                  </div>

                  {/* Meta row */}
                  <div className="flex flex-wrap gap-4 mb-4" style={{ position: 'relative' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.83rem', color: 'var(--text)' }}>
                      <Calendar size={13} style={{ color: c.from }} /> {exp.period}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.83rem', color: 'var(--text)' }}>
                      <MapPin size={13} style={{ color: c.from }} /> {exp.location}
                    </span>
                  </div>

                  {/* Description */}
                  <p style={{
                    fontSize: '0.88rem', lineHeight: 1.85,
                    color: 'var(--text)', marginBottom: '1.25rem',
                    position: 'relative',
                  }}>
                    {exp.description}
                  </p>

                  {/* Skill tags */}
                  <div className="flex flex-wrap gap-2" style={{ position: 'relative' }}>
                    {exp.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.06, borderColor: c.from }}
                        style={{
                          fontSize: '0.73rem', fontWeight: 500,
                          padding: '0.22rem 0.65rem', borderRadius: 6,
                          background: 'var(--surface2)',
                          border: '1px solid var(--border)',
                          color: 'var(--text)',
                          cursor: 'default',
                          transition: 'border-color 0.2s',
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Center dot */}
                <motion.div
                  className="exp-dot"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ type: 'spring', stiffness: 260, damping: 14, delay: i * 0.28 + 0.15 }}
                  style={{
                    position: 'absolute',
                    top: '2rem',
                    width: 52, height: 52, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${c.from}, ${c.to})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', zIndex: 2,
                    boxShadow: `0 0 0 4px var(--bg), 0 0 24px ${c.glow}`,
                  }}
                >
                  <Briefcase size={20} />
                </motion.div>

              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        /* Desktop: alternating left/right */
        .exp-line-wrap {
          position: absolute;
          left: calc(50% - 1px);
          top: 0; bottom: 0;
          width: 2px;
        }
        .exp-row {
          display: flex;
          justify-content: flex-start;
          position: relative;
          margin-bottom: 3.5rem;
          padding-right: calc(50% + 48px);
        }
        .exp-row-right {
          justify-content: flex-end;
          padding-right: 0;
          padding-left: calc(50% + 48px);
        }
        .exp-card { width: 100%; }
        .exp-dot  { left: 50%; transform: translateX(-50%); }

        /* Mobile: single left-aligned column */
        @media (max-width: 768px) {
          .exp-line-wrap { left: 25px; }
          .exp-row,
          .exp-row-right {
            justify-content: flex-start;
            padding-left: 70px;
            padding-right: 0;
          }
          .exp-dot { left: 25px; transform: translateX(-50%); }
        }

        @keyframes pulse {
          0%,100% { box-shadow: 0 0 0 3px rgba(16,185,129,0.2); }
          50%      { box-shadow: 0 0 0 6px rgba(16,185,129,0.05); }
        }
        @media (max-width: 640px) {
          .exp-card { padding: 1.25rem !important; }
          .exp-row, .exp-row-right { margin-bottom: 2rem; }
        }
      `}</style>
    </section>
  );
}
