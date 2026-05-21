import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, MessageSquare, Loader } from 'lucide-react';
import { collection, addDoc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Review {
  id: string;
  stars: number;
  comment: string;
  date: string;
}

const REVIEWS_COL = 'reviews';

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [stars, setStars] = useState(0);
  const [hoverStar, setHoverStar] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Real-time listener — all visitors see the same reviews
  useEffect(() => {
    const q = query(collection(db, REVIEWS_COL), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setReviews(snap.docs.map(doc => {
        const d = doc.data();
        const ts = d.createdAt?.toDate?.();
        return {
          id: doc.id,
          stars: d.stars,
          comment: d.comment,
          date: ts
            ? ts.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
            : 'Just now',
        };
      }));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const avgStars = reviews.length
    ? (reviews.reduce((s, r) => s + r.stars, 0) / reviews.length).toFixed(1)
    : null;

  const handleSubmit = async () => {
    if (!stars) { setError('Please select a star rating'); return; }
    if (!comment.trim()) { setError('Please write a comment'); return; }

    setSubmitting(true);
    try {
      await addDoc(collection(db, REVIEWS_COL), {
        stars,
        comment: comment.trim(),
        createdAt: serverTimestamp(),
      });
      setStars(0);
      setComment('');
      setError('');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch {
      setError('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reviews" style={{ padding: '6rem 1.5rem', background: 'var(--surface)' }}>
      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            FEEDBACK
          </p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-heading)', margin: 0 }}>
            Leave a Review
          </h2>
          {avgStars && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ color: 'var(--text)', marginTop: '0.6rem', fontSize: '0.95rem' }}
            >
              ⭐ {avgStars} average · {reviews.length} review{reviews.length !== 1 ? 's' : ''}
            </motion.p>
          )}
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: '1.25rem',
            padding: '2rem',
            marginBottom: '3rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 3,
            borderRadius: '1.25rem 1.25rem 0 0',
            background: 'linear-gradient(90deg, #6366f1, #ec4899)',
          }} />

          {/* Star rating */}
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: 'var(--text)', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
              YOUR RATING
            </p>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {[1, 2, 3, 4, 5].map(n => {
                const active = n <= (hoverStar || stars);
                return (
                  <motion.button
                    key={n}
                    whileHover={{ scale: 1.25, y: -3 }}
                    whileTap={{ scale: 0.85 }}
                    onClick={() => { setStars(n); setError(''); }}
                    onMouseEnter={() => setHoverStar(n)}
                    onMouseLeave={() => setHoverStar(0)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer', padding: 2,
                      color: active ? '#f59e0b' : 'var(--border)',
                      transition: 'color 0.15s',
                    }}
                  >
                    <Star size={34} fill={active ? '#f59e0b' : 'none'} strokeWidth={1.5} />
                  </motion.button>
                );
              })}
              {stars > 0 && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  style={{ marginLeft: 8, fontSize: '0.85rem', color: '#f59e0b', fontWeight: 600 }}
                >
                  {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'][stars]}
                </motion.span>
              )}
            </div>
          </div>

          {/* Comment */}
          <div style={{ marginBottom: '1.25rem' }}>
            <p style={{ color: 'var(--text)', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
              YOUR COMMENT
            </p>
            <textarea
              value={comment}
              onChange={e => { setComment(e.target.value); setError(''); }}
              placeholder="Share your thoughts about Arun's work or portfolio..."
              rows={4}
              style={{
                width: '100%',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '0.75rem',
                padding: '0.85rem 1rem',
                color: 'var(--text)',
                fontSize: '0.9rem',
                resize: 'vertical',
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
                lineHeight: 1.6,
                transition: 'border-color 0.2s',
              }}
              onFocus={e => (e.target.style.borderColor = '#6366f1')}
              onBlur={e => (e.target.style.borderColor = 'var(--border)')}
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '1rem' }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: submitting ? 1 : 1.03 }}
            whileTap={{ scale: submitting ? 1 : 0.96 }}
            onClick={handleSubmit}
            disabled={submitting}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: submitted
                ? 'linear-gradient(135deg, #10b981, #6366f1)'
                : 'linear-gradient(135deg, #6366f1, #ec4899)',
              color: '#fff', border: 'none', borderRadius: '0.75rem',
              padding: '0.75rem 1.75rem', fontSize: '0.95rem', fontWeight: 600,
              cursor: submitting ? 'not-allowed' : 'pointer',
              opacity: submitting ? 0.8 : 1,
              transition: 'background 0.4s, opacity 0.2s',
            }}
          >
            {submitting
              ? <><Loader size={16} style={{ animation: 'spin 0.8s linear infinite' }} /> Submitting...</>
              : submitted
                ? 'Thank you! 🎉'
                : <><Send size={16} /> Submit Review</>
            }
          </motion.button>
        </motion.div>

        {/* Reviews list */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text)', opacity: 0.5 }}>
            <Loader size={24} style={{ animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
          </div>
        ) : reviews.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ textAlign: 'center', color: 'var(--text)', opacity: 0.45, fontSize: '0.95rem' }}
          >
            No reviews yet — be the first!
          </motion.p>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.25rem' }}>
              <MessageSquare size={18} style={{ color: 'var(--accent)' }} />
              <h3 style={{ color: 'var(--text-heading)', fontWeight: 700, fontSize: '1rem', margin: 0 }}>
                {reviews.length} Review{reviews.length !== 1 ? 's' : ''}
              </h3>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '0.75rem',
            }}>
              <AnimatePresence>
                {reviews.map((r, i) => (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 16, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: i * 0.05, type: 'spring', stiffness: 220, damping: 18 }}
                    style={{
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      borderRadius: '0.75rem',
                      padding: '0.85rem 1rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <div style={{ display: 'flex', gap: 2 }}>
                        {[1, 2, 3, 4, 5].map(n => (
                          <Star key={n} size={12}
                            fill={n <= r.stars ? '#f59e0b' : 'none'}
                            color={n <= r.stars ? '#f59e0b' : 'var(--border)'}
                            strokeWidth={1.5}
                          />
                        ))}
                      </div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text)', opacity: 0.45 }}>{r.date}</span>
                    </div>
                    <p style={{ color: 'var(--text)', fontSize: '0.82rem', lineHeight: 1.55, margin: 0 }}>
                      {r.comment}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
