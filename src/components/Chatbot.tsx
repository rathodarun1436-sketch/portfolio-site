import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, Sparkles } from 'lucide-react';
import { personal, skills, projects, experience } from '../data';

interface Message {
  id: number;
  from: 'bot' | 'user';
  text: string;
}

const QUICK_REPLIES = [
  'What are your skills?',
  'Tell me about projects',
  'Your experience?',
  'How to contact you?',
];

function getResponse(input: string): string {
  const msg = input.toLowerCase();

  // ── Greetings ──────────────────────────────────────────────────
  if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey') || msg.includes('sup') || msg.includes('hola') || msg.match(/^(yo|hi|hey)\b/)) {
    return `Hi there! 👋 I'm Arun's portfolio assistant. Ask me about his skills, projects, experience, or how to get in touch!`;
  }

  if (msg.includes('good morning') || msg.includes('good afternoon') || msg.includes('good evening')) {
    return `Hey! 👋 Great to hear from you. I'm Arun's assistant — ask me anything about his work, skills, or how to collaborate!`;
  }

  // ── Identity & bio ─────────────────────────────────────────────
  if (msg.includes('who are you') || msg.includes('what are you') || msg.includes('are you ai') || msg.includes('are you a bot') || msg.includes('are you human')) {
    return `I'm a smart assistant built into Arun's portfolio. I know everything about his skills, projects, and experience. Ask away! 🤖`;
  }

  if (msg.includes('who') || msg.includes('about') || msg.includes('introduce') || msg.includes('tell me about arun') || msg.includes('arun')) {
    return personal.bio;
  }

  // ── Role & title ───────────────────────────────────────────────
  if (msg.includes('what do you do') || msg.includes('role') || msg.includes('position') || msg.includes('title') || msg.includes('job')) {
    return `Arun is a Software Engineer specialising in Java Spring Boot backends and React frontends. He currently works at Omnissolution in Dubai, building large-scale fintech platforms.`;
  }

  // ── Specialisation & strengths ─────────────────────────────────
  if (msg.includes('speciali') || msg.includes('best at') || msg.includes('expert') || msg.includes('strong') || msg.includes('good at')) {
    return `Arun specialises in:\n\n⚡ Java 21 + Spring Boot (microservices, REST APIs)\n⚡ Event-driven architecture with Apache Kafka\n⚡ Fintech systems — payments, loans, KYC\n⚡ React + TypeScript frontends\n⚡ PostgreSQL, Redis, Drools Rule Engine`;
  }

  // ── Why hire ───────────────────────────────────────────────────
  if (msg.includes('why hire') || msg.includes('why should') || msg.includes('why arun') || msg.includes('convince') || msg.includes('reason to hire')) {
    return `Why hire Arun? 🚀\n\n✅ 4+ years building production-grade enterprise systems\n✅ Fintech expertise — payment gateways, loan platforms\n✅ Full-stack: Java backend + React frontend\n✅ Experience with high-throughput systems (Kafka, Redis)\n✅ Clean architecture & API-first mindset\n✅ Currently open to new opportunities!`;
  }

  // ── Resume / CV ────────────────────────────────────────────────
  if (msg.includes('resume') || msg.includes('cv') || msg.includes('download')) {
    return `You can download Arun's CV using the "Download CV" button on the Hero section at the top of the page! 📄`;
  }

  // ── Availability & hiring ──────────────────────────────────────
  if (msg.includes('available') || msg.includes('hire') || msg.includes('freelance') || msg.includes('opportunit') || msg.includes('looking for work') || msg.includes('open to')) {
    return `Yes! Arun is currently open to freelance projects and full-time opportunities. Reach out at:\n\n📧 ${personal.email}\n\nOr use the Contact form on this page!`;
  }

  // ── Interview / meeting ────────────────────────────────────────
  if (msg.includes('interview') || msg.includes('schedule') || msg.includes('meeting') || msg.includes('call') || msg.includes('chat')) {
    return `To schedule a call or interview with Arun, send him a message via the Contact form or email directly:\n\n📧 ${personal.email}\n🔗 linkedin.com/in/arun-rathod1320`;
  }

  // ── Contact ────────────────────────────────────────────────────
  if (msg.includes('contact') || msg.includes('email') || msg.includes('reach') || msg.includes('connect') || msg.includes('message')) {
    return `You can reach Arun at:\n\n📧 ${personal.email}\n🔗 linkedin.com/in/arun-rathod1320\n📍 ${personal.location}\n\nOr use the Contact form on this page!`;
  }

  // ── LinkedIn ───────────────────────────────────────────────────
  if (msg.includes('linkedin')) {
    return `Arun's LinkedIn profile:\n🔗 linkedin.com/in/arun-rathod1320\n\nFeel free to connect!`;
  }

  // ── GitHub ─────────────────────────────────────────────────────
  if (msg.includes('github') || msg.includes('repo') || msg.includes('open source') || msg.includes('source code')) {
    return `Arun's GitHub:\n🔗 ${personal.github}\n\nYou'll find his Task Manager and other projects there!`;
  }

  // ── Location & timezone ────────────────────────────────────────
  if (msg.includes('location') || msg.includes('where') || msg.includes('country') || msg.includes('timezone') || msg.includes('time zone') || msg.includes('city')) {
    return `Arun is originally from India 🇮🇳 and currently based in Dubai, UAE 🇦🇪, working full-time at Omnissolution.\n\nTimezone: GST (UTC+4)`;
  }

  // ── Full skill list ────────────────────────────────────────────
  if (msg.includes('skill') || msg.includes('technolog') || msg.includes('stack') || msg.includes('what can') || msg.includes('what do you know')) {
    const list = skills.map(s => `• ${s.category}: ${s.items.slice(0, 3).join(', ')}…`).join('\n');
    return `Arun's full tech stack:\n\n${list}\n\nAsk about any category for the full list!`;
  }

  // ── Specific skill categories ──────────────────────────────────
  if (msg.includes('frontend') || msg.includes('react') || msg.includes('typescript') || msg.includes('tailwind') || msg.includes('css')) {
    const s = skills.find(s => s.category === 'Frontend');
    return `🔵 Frontend skills:\n${s?.items.join(', ')}.`;
  }

  if (msg.includes('backend') || msg.includes('java') || msg.includes('spring') || msg.includes('api') || msg.includes('rest') || msg.includes('jwt') || msg.includes('hibernate')) {
    const s = skills.find(s => s.category === 'Backend');
    return `🟢 Backend skills:\n${s?.items.join(', ')}.`;
  }

  if (msg.includes('database') || msg.includes('sql') || msg.includes('postgres') || msg.includes('mysql') || msg.includes('orm')) {
    const s = skills.find(s => s.category === 'Database');
    return `🟡 Database skills:\n${s?.items.join(', ')}.`;
  }

  if (msg.includes('kafka') || msg.includes('redis') || msg.includes('drool') || msg.includes('messaging') || msg.includes('cach') || msg.includes('firebase') || msg.includes('event')) {
    const s = skills.find(s => s.category === 'Messaging & Caching');
    return `🟠 Messaging & Caching:\n${s?.items.join(', ')}.`;
  }

  if (msg.includes('devops') || msg.includes('docker') || msg.includes('vercel') || msg.includes('railway') || msg.includes('tool') || msg.includes('maven') || msg.includes('postman')) {
    const s = skills.find(s => s.category === 'Tools & DevOps');
    return `🔴 Tools & DevOps:\n${s?.items.join(', ')}.`;
  }

  // ── Microservices / architecture ───────────────────────────────
  if (msg.includes('microservice') || msg.includes('architecture') || msg.includes('design pattern') || msg.includes('system design')) {
    return `Arun has hands-on experience with microservices architecture at Omnissolution — modular Spring Boot services communicating via Apache Kafka, secured with JWT, documented with Swagger/OpenAPI, and scaled with Redis caching.`;
  }

  // ── Fintech ────────────────────────────────────────────────────
  if (msg.includes('fintech') || msg.includes('finance') || msg.includes('banking') || msg.includes('payment') && !msg.includes('gateway')) {
    return `Arun has strong fintech experience:\n\n💳 International Payment Gateway (Pay-In, Payout, Refund)\n🏦 Loan Origination & Management System (LOS/LMS)\n📋 KYC & Onboarding modules\n🔒 Fraud detection with Drools Rule Engine`;
  }

  // ── Projects list ──────────────────────────────────────────────
  if (msg.includes('project') || msg.includes('portfolio') || msg.includes('what have you built') || msg.includes('what did you build')) {
    return projects
      .map((p, i) => `${i + 1}. **${p.title}** — ${p.subtitle}\n   🏢 ${p.company} | 📅 ${p.year}`)
      .join('\n\n') + '\n\nAsk about any project for full details!';
  }

  // ── Specific projects ──────────────────────────────────────────
  if (msg.includes('loan') || msg.includes('ashapurti') || msg.includes('lms') || msg.includes('los')) {
    const p = projects.find(p => p.id === 1);
    return `🏦 **${p?.title}**\n${p?.description}\n\nStack: ${p?.tags.join(', ')}`;
  }

  if (msg.includes('payment gateway') || msg.includes('internationalpg') || msg.includes('international pg') || msg.includes('omniss') || msg.includes('payout') || msg.includes('payin') || msg.includes('refund')) {
    const p = projects.find(p => p.id === 2);
    return `💳 **${p?.title}**\n${p?.description}\n\nStack: ${p?.tags.join(', ')}`;
  }

  if (msg.includes('task') || msg.includes('task manager')) {
    const p = projects.find(p => p.id === 3);
    return `📋 **${p?.title}**\n${p?.description}\n\n🔗 GitHub: github.com/rathodarun1436-sketch/task_manager`;
  }

  // ── Experience ─────────────────────────────────────────────────
  if (msg.includes('experience') || msg.includes('worked') || msg.includes('career') || msg.includes('compan') || msg.includes('gllfl') || msg.includes('omnissolution') || msg.includes('dubai') || msg.includes('mumbai')) {
    return experience
      .map(e => `💼 **${e.role} @ ${e.company}**\n📅 ${e.period} | 📍 ${e.location}\n${e.description.slice(0, 200)}…`)
      .join('\n\n');
  }

  if (msg.includes('how long') || msg.includes('how many year') || msg.includes('years of')) {
    return `Arun has 4+ years of coding experience — professionally working since 2025, with expertise built across enterprise fintech platforms in India and Dubai.`;
  }

  // ── Salary / rate ──────────────────────────────────────────────
  if (msg.includes('salary') || msg.includes('rate') || msg.includes('cost') || msg.includes('price') || msg.includes('charge') || msg.includes('pay')) {
    return `For salary or rate discussions, please reach out directly:\n\n📧 ${personal.email}\n🔗 linkedin.com/in/arun-rathod1320\n\nArun is open to discussing based on role and requirements!`;
  }

  // ── Collaborations / startup ───────────────────────────────────
  if (msg.includes('collaborat') || msg.includes('partner') || msg.includes('startup') || msg.includes('together') || msg.includes('team up')) {
    return `Arun loves collaborating on interesting projects! Whether it's a startup idea, freelance project, or open-source work — reach out:\n\n📧 ${personal.email}\nOr use the Contact form below! 🚀`;
  }

  // ── Testimonials / references ──────────────────────────────────
  if (msg.includes('testimonial') || msg.includes('reference') || msg.includes('recommendation') || msg.includes('review')) {
    return `For professional references and recommendations, check Arun's LinkedIn profile:\n🔗 linkedin.com/in/arun-rathod1320`;
  }

  // ── Portfolio / this website ───────────────────────────────────
  if (msg.includes('this website') || msg.includes('this portfolio') || msg.includes('built this') || msg.includes('portfolio website') || msg.includes('how was this made')) {
    const p = projects.find(p => p.id === 4);
    return `This portfolio was built by Arun himself! 🎨\n\nStack: ${p?.tags.join(', ')}\n\nFeaturing dark/light mode, 3D tilt cards, typewriter effect, framer motion animations, and this chatbot!`;
  }

  // ── Positive reactions ─────────────────────────────────────────
  if (msg.includes('thank') || msg.includes('thanks') || msg.includes('cool') || msg.includes('great') || msg.includes('awesome') || msg.includes('nice') || msg.includes('good') || msg.includes('wow') || msg.includes('amazing') || msg.includes('impressive')) {
    return `Thank you! 😊 Arun worked hard on this. Feel free to scroll through or drop him a message — he'd love to hear from you!`;
  }

  // ── Bye ────────────────────────────────────────────────────────
  if (msg.includes('bye') || msg.includes('goodbye') || msg.includes('see you') || msg.includes('cya') || msg.includes('later')) {
    return `Goodbye! 👋 Feel free to come back anytime. You can also reach Arun at ${personal.email} — he's always happy to connect!`;
  }

  // ── Default ────────────────────────────────────────────────────
  return `You can reach Arun at:\n\n📧 ${personal.email}\n🔗 linkedin.com/in/arun-rathod1320\n📍 ${personal.location}\n\nOr use the Contact form on this page!`;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, from: 'bot', text: "Hi! 👋 I'm Arun's portfolio assistant. What would you like to know about him?" },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const nextId = useRef(1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const send = (text: string) => {
    if (!text.trim() || typing) return;
    setMessages(m => [...m, { id: nextId.current++, from: 'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(m => [...m, { id: nextId.current++, from: 'bot', text: getResponse(text) }]);
    }, 700 + Math.random() * 500);
  };

  return (
    <>
      {/* Floating button */}
      <div style={{ position: 'fixed', bottom: '1.5rem', right: '1rem', zIndex: 1000 }}>
        {/* Pulse ring */}
        {!open && (
          <motion.div
            animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity }}
            style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: 'rgba(99,102,241,0.4)',
              pointerEvents: 'none',
            }}
          />
        )}
        <motion.button
          onClick={() => setOpen(o => !o)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #ec4899)',
            border: 'none', cursor: 'pointer', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(99,102,241,0.45)',
            position: 'relative',
          }}
        >
          <AnimatePresence mode="wait">
            {open
              ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}><X size={22} /></motion.span>
              : <motion.span key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}><MessageCircle size={22} /></motion.span>
            }
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            style={{
              position: 'fixed', bottom: '6.5rem', right: '1rem', zIndex: 999,
              width: 'min(360px, calc(100vw - 2rem))',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '1.25rem',
              display: 'flex', flexDirection: 'column',
              boxShadow: '0 30px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,102,241,0.15)',
              overflow: 'hidden',
              maxHeight: '70vh',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1rem 1.25rem',
              background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
              display: 'flex', alignItems: 'center', gap: 10,
              flexShrink: 0,
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: '50%',
                background: 'rgba(255,255,255,0.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', flexShrink: 0,
              }}>
                <Bot size={19} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                  Portfolio Assistant <Sparkles size={13} />
                </div>
                <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: 5, marginTop: 1 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block', boxShadow: '0 0 6px #4ade80' }} />
                  Always online
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', padding: 4, display: 'flex' }}>
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                  style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start' }}
                >
                  <div style={{
                    maxWidth: '82%',
                    padding: '0.65rem 1rem',
                    borderRadius: msg.from === 'user' ? '1.1rem 1.1rem 0.25rem 1.1rem' : '1.1rem 1.1rem 1.1rem 0.25rem',
                    background: msg.from === 'user'
                      ? 'linear-gradient(135deg, #6366f1, #ec4899)'
                      : 'var(--surface2)',
                    color: msg.from === 'user' ? '#fff' : 'var(--text-heading)',
                    fontSize: '0.84rem', lineHeight: 1.65,
                    border: msg.from === 'bot' ? '1px solid var(--border)' : 'none',
                    whiteSpace: 'pre-line',
                  }}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0.5rem 0.75rem' }}>
                  {[0, 1, 2].map(i => (
                    <motion.span
                      key={i}
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.14 }}
                      style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }}
                    />
                  ))}
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            <div style={{ padding: '0 1rem 0.6rem', display: 'flex', flexWrap: 'wrap', gap: 6, flexShrink: 0 }}>
              {QUICK_REPLIES.map(q => (
                <motion.button
                  key={q}
                  onClick={() => send(q)}
                  whileHover={{ scale: 1.05, borderColor: 'var(--accent)', color: 'var(--accent)' }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    fontSize: '0.71rem', padding: '0.28rem 0.75rem', borderRadius: 20,
                    border: '1px solid var(--border)', background: 'var(--surface2)',
                    color: 'var(--text)', cursor: 'pointer', whiteSpace: 'nowrap',
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                >
                  {q}
                </motion.button>
              ))}
            </div>

            {/* Input */}
            <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid var(--border)', display: 'flex', gap: 8, flexShrink: 0 }}>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send(input)}
                placeholder="Ask me anything…"
                style={{
                  flex: 1, padding: '0.6rem 0.9rem',
                  background: 'var(--surface2)', border: '1px solid var(--border)',
                  borderRadius: '0.65rem', color: 'var(--text-heading)',
                  fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border)')}
              />
              <motion.button
                onClick={() => send(input)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                style={{
                  width: 40, height: 40, borderRadius: '0.65rem', flexShrink: 0,
                  background: input.trim() ? 'linear-gradient(135deg, #6366f1, #ec4899)' : 'var(--border)',
                  border: 'none', color: '#fff', cursor: input.trim() ? 'pointer' : 'default',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s',
                }}
              >
                <Send size={15} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
