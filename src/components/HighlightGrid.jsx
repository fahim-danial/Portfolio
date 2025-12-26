import { motion, useReducedMotion } from 'framer-motion';
import { highlights } from '../data/portfolio.js';

export function HighlightGrid() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="highlight-grid">
      {highlights.map((highlight, index) => (
        <motion.div
          key={highlight.label}
          className="highlight-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={
            shouldReduceMotion
              ? undefined
              : {
                  y: -8,
                  transition: { type: 'spring', stiffness: 220, damping: 20 },
                }
          }
          whileTap={shouldReduceMotion ? undefined : { scale: 0.995 }}
          transition={{ delay: index * 0.08, duration: 0.6, ease: 'easeOut' }}
          viewport={{ amount: 0.5 }}
        >
          <span className="highlight-value">{highlight.value}</span>
          <span className="highlight-label">{highlight.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
