import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Code2 } from 'lucide-react';

const NAV_LINKS = ['Home', 'About', 'Skills', 'Reviews', 'Projects', 'Experience', 'Contact'];

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('Home');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.toLowerCase()));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1));
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (section: string) => {
    document.getElementById(section.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setActive(section);
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        background: scrolled ? 'rgba(15,23,42,0.9)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        transition: 'all 0.3s ease',
      }}
      className="px-6 py-4"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.button
          onClick={() => scrollTo('Home')}
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 font-bold text-lg"
          style={{ color: 'var(--text-heading)', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <span style={{ color: 'var(--accent)' }}><Code2 size={22} /></span>
          <span>Arun<span style={{ color: 'var(--accent)' }}>.</span></span>
        </motion.button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: active === link ? 'var(--accent)' : 'var(--text)',
                fontWeight: active === link ? 600 : 400,
                padding: '0.4rem 0.9rem',
                borderRadius: '0.5rem',
                fontSize: '0.9rem',
                transition: 'color 0.2s',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                if (active !== link) (e.target as HTMLElement).style.color = 'var(--text-heading)';
              }}
              onMouseLeave={(e) => {
                if (active !== link) (e.target as HTMLElement).style.color = 'var(--text)';
              }}
            >
              {link}
              {active === link && (
                <motion.span
                  layoutId="nav-indicator"
                  style={{
                    position: 'absolute', bottom: 0, left: '20%', right: '20%',
                    height: 2, background: 'var(--accent)', borderRadius: 1,
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              color: 'var(--text)', cursor: 'pointer', borderRadius: '0.5rem',
              padding: '0.45rem', display: 'flex', alignItems: 'center',
            }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden"
            onClick={() => setMobileOpen((p) => !p)}
            style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              color: 'var(--text)', cursor: 'pointer', borderRadius: '0.5rem',
              padding: '0.45rem', display: 'flex', alignItems: 'center',
            }}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </motion.button>
        </div>
      </div>

      {/* Scroll progress bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2 }}>
        <div style={{
          height: '100%',
          width: `${scrollProgress * 100}%`,
          background: 'linear-gradient(90deg, #6366f1, #ec4899, #10b981)',
          borderRadius: '0 2px 2px 0',
          transition: 'width 0.1s linear',
        }} />
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: 'var(--surface)', borderTop: '1px solid var(--border)',
              marginTop: '0.5rem', borderRadius: '0.75rem',
              overflow: 'hidden',
            }}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '0.75rem 1.25rem', background: 'none', border: 'none',
                  color: active === link ? 'var(--accent)' : 'var(--text)',
                  cursor: 'pointer', fontSize: '0.95rem',
                  fontWeight: active === link ? 600 : 400,
                  borderBottom: '1px solid var(--border)',
                }}
              >
                {link}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
