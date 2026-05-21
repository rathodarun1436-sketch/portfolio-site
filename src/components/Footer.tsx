import { motion } from 'framer-motion';
import { Mail, ArrowUp, Heart, Code2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { personal } from '../data';

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer style={{
      background: 'var(--bg)',
      borderTop: '1px solid var(--border)',
      padding: '3rem 1.5rem 2rem',
    }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-heading)' }}>
            <Code2 size={20} style={{ color: 'var(--accent)' }} />
            Arun<span style={{ color: 'var(--accent)' }}>.</span>
          </div>

          {/* Copyright */}
          <p style={{ fontSize: '0.85rem', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 5 }}>
            Built with <Heart size={13} style={{ color: 'var(--pink)', fill: 'var(--pink)' }} /> using React + TypeScript
          </p>

          {/* Social + Back to top */}
          <div className="flex items-center gap-3">
            {[
              { icon: <GithubIcon size={17} />, href: personal.github },
              { icon: <LinkedinIcon size={17} />, href: personal.linkedin },
              { icon: <Mail size={17} />, href: `mailto:${personal.email}` },
            ].map(({ icon, href }, i) => (
              <motion.a
                key={i} href={href} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                style={{
                  width: 36, height: 36, borderRadius: '0.5rem',
                  border: '1px solid var(--border)', background: 'var(--surface)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text)',
                }}
              >
                {icon}
              </motion.a>
            ))}

            <motion.button
              onClick={scrollTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: 36, height: 36, borderRadius: '0.5rem',
                background: 'var(--accent)', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', cursor: 'pointer',
              }}
              title="Back to top"
            >
              <ArrowUp size={17} />
            </motion.button>
          </div>
        </div>

        <div style={{
          textAlign: 'center', marginTop: '2rem',
          fontSize: '0.78rem', color: 'var(--text)',
          borderTop: '1px solid var(--border)', paddingTop: '1.5rem',
        }}>
          © {new Date().getFullYear()} Arun R. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
