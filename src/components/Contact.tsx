import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { personal } from '../data';

const EJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string;
const EJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EJS_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string;

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

type FormData = z.infer<typeof schema>;

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    try {
      await emailjs.send(
        EJS_SERVICE,
        EJS_TEMPLATE,
        {
          from_name:  data.name,
          from_email: data.email,
          email:      'rathodarun1436@gmail.com',
          subject:    data.subject,
          message:    data.message,
          to_name:    'Arun Rathod',
        },
        { publicKey: EJS_KEY },
      );
      setStatus('success');
      reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const inputStyle = (hasError: boolean) => ({
    width: '100%', padding: '0.75rem 1rem',
    background: 'var(--surface2)', border: `1px solid ${hasError ? '#ef4444' : 'var(--border)'}`,
    borderRadius: '0.6rem', color: 'var(--text-heading)',
    fontSize: '0.92rem', outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit',
  });

  return (
    <section id="contact" style={{ padding: '6rem 1.5rem', background: 'var(--surface2)' }}>
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            GET IN TOUCH
          </p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-heading)', margin: 0 }}>
            Contact Me
          </h2>
          <p style={{ color: 'var(--text)', marginTop: '0.75rem', fontSize: '1rem' }}>
            Have a project in mind? Let's talk.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '1rem' }}>
              Let's work together
            </h3>
            <p style={{ color: 'var(--text)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.95rem' }}>
              I'm currently open to freelance projects and full-time opportunities.
              Whether you need a full-stack web app, an API backend, or just want to chat about tech — reach out!
            </p>

            {/* Contact cards */}
            <div className="flex flex-col gap-4 mb-8">
              {[
                { icon: <Mail size={20} />, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
                { icon: <MapPin size={20} />, label: 'Location', value: personal.location, href: '#' },
                { icon: <GithubIcon size={20} />, label: 'GitHub', value: 'rathodarun1436-sketch', href: personal.github },
              ].map(({ icon, label, value, href }) => (
                <motion.a
                  key={label} href={href} target="_blank" rel="noopener noreferrer"
                  whileHover={{ x: 6 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '1rem 1.25rem', borderRadius: '0.75rem',
                    border: '1px solid var(--border)', background: 'var(--surface)',
                    textDecoration: 'none', transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'}
                >
                  <span style={{
                    width: 42, height: 42, borderRadius: '0.5rem',
                    background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--accent)', flexShrink: 0,
                  }}>
                    {icon}
                  </span>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text)' }}>{label}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-heading)', fontWeight: 500 }}>{value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              {[
                { icon: <GithubIcon size={18} />, href: personal.github },
                { icon: <LinkedinIcon size={18} />, href: personal.linkedin },
                { icon: <Mail size={18} />, href: `mailto:${personal.email}` },
              ].map(({ icon, href }, i) => (
                <motion.a
                  key={i} href={href} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  style={{
                    width: 42, height: 42, borderRadius: '0.6rem',
                    border: '1px solid var(--border)', background: 'var(--surface)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text)', transition: 'all 0.2s',
                  }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '1rem', padding: '2rem',
            }}
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ textAlign: 'center', padding: '3rem 1rem' }}
                >
                  <CheckCircle2 size={56} style={{ color: 'var(--green)', margin: '0 auto 1rem' }} />
                  <h3 style={{ color: 'var(--text-heading)', fontWeight: 700, fontSize: '1.3rem' }}>Message Sent!</h3>
                  <p style={{ color: 'var(--text)', marginTop: '0.5rem' }}>
                    Thanks for reaching out. I'll get back to you soon.
                  </p>
                </motion.div>
              ) : status === 'error' ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ textAlign: 'center', padding: '3rem 1rem' }}
                >
                  <AlertCircle size={56} style={{ color: '#ef4444', margin: '0 auto 1rem' }} />
                  <h3 style={{ color: 'var(--text-heading)', fontWeight: 700, fontSize: '1.3rem' }}>Failed to Send</h3>
                  <p style={{ color: 'var(--text)', marginTop: '0.5rem' }}>
                    Something went wrong. Please email me directly at <a href={`mailto:${personal.email}`} style={{ color: 'var(--accent)' }}>{personal.email}</a>
                  </p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text)', marginBottom: '0.4rem', fontWeight: 500 }}>
                        Name
                      </label>
                      <input
                        {...register('name')}
                        placeholder="Your name"
                        style={inputStyle(!!errors.name)}
                        onFocus={(e) => (e.target as HTMLElement).style.borderColor = 'var(--accent)'}
                        onBlur={(e) => (e.target as HTMLElement).style.borderColor = errors.name ? '#ef4444' : 'var(--border)'}
                      />
                      {errors.name && (
                        <span style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                          <AlertCircle size={12} /> {errors.name.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text)', marginBottom: '0.4rem', fontWeight: 500 }}>
                        Email
                      </label>
                      <input
                        {...register('email')}
                        placeholder="your@email.com"
                        style={inputStyle(!!errors.email)}
                        onFocus={(e) => (e.target as HTMLElement).style.borderColor = 'var(--accent)'}
                        onBlur={(e) => (e.target as HTMLElement).style.borderColor = errors.email ? '#ef4444' : 'var(--border)'}
                      />
                      {errors.email && (
                        <span style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                          <AlertCircle size={12} /> {errors.email.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text)', marginBottom: '0.4rem', fontWeight: 500 }}>
                      Subject
                    </label>
                    <input
                      {...register('subject')}
                      placeholder="What's this about?"
                      style={inputStyle(!!errors.subject)}
                      onFocus={(e) => (e.target as HTMLElement).style.borderColor = 'var(--accent)'}
                      onBlur={(e) => (e.target as HTMLElement).style.borderColor = errors.subject ? '#ef4444' : 'var(--border)'}
                    />
                    {errors.subject && (
                      <span style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <AlertCircle size={12} /> {errors.subject.message}
                      </span>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text)', marginBottom: '0.4rem', fontWeight: 500 }}>
                      Message
                    </label>
                    <textarea
                      {...register('message')}
                      placeholder="Tell me about your project..."
                      rows={5}
                      style={{ ...inputStyle(!!errors.message), resize: 'vertical' }}
                      onFocus={(e) => (e.target as HTMLElement).style.borderColor = 'var(--accent)'}
                      onBlur={(e) => (e.target as HTMLElement).style.borderColor = errors.message ? '#ef4444' : 'var(--border)'}
                    />
                    {errors.message && (
                      <span style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <AlertCircle size={12} /> {errors.message.message}
                      </span>
                    )}
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    whileHover={{ scale: 1.02, boxShadow: '0 0 25px var(--accent-glow)' }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      padding: '0.85rem',
                      background: status === 'loading' ? 'var(--border)' : 'var(--accent)',
                      color: '#fff', border: 'none', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                      borderRadius: '0.6rem', fontWeight: 600,
                      fontSize: '0.95rem', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', gap: 8,
                      transition: 'background 0.2s',
                    }}
                  >
                    {status === 'loading' ? (
                      <>
                        <span style={{
                          width: 16, height: 16, border: '2px solid #fff4',
                          borderTopColor: '#fff', borderRadius: '50%',
                          animation: 'spin 0.7s linear infinite',
                          display: 'inline-block',
                        }} />
                        Sending...
                      </>
                    ) : (
                      <><Send size={16} /> Send Message</>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}
