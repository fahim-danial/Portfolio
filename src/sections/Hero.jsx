import { motion } from 'framer-motion';
import { hero } from '../data/portfolio.js';
import { HighlightGrid } from '../components/HighlightGrid.jsx';
import { TypingText } from '../components/TypingText.jsx';

export function Hero() {
  return (
    <section id="hero" className="section hero-section">
      <div className="hero-grid">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="eyebrow">Available for collaboration · 2025</p>
          <h1>
            {hero.name}
            <span>
              <TypingText text={hero.title} startDelayMs={350} charDelayMs={28} />
            </span>
          </h1>
          <p className="section-copy">{hero.summary}</p>
          <div className="hero-actions">
            {hero.actions.map((action) => {
              const isExternal = action.target === '_blank';
              return (
                <a
                  key={action.label}
                  className={`pill pill-${action.variant}`}
                  href={action.href}
                  target={action.target}
                  rel={isExternal ? 'noreferrer noopener' : undefined}
                >
                  {action.label}
                </a>
              );
            })}
          </div>
        </motion.div>
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        >
          <span className="hero-ring hero-ring-outer" aria-hidden="true" />
          <span className="hero-ring hero-ring-inner" aria-hidden="true" />
          <div className="hero-core">
            <span className="hero-core-glow" aria-hidden="true" />
            <div className="hero-scan" aria-hidden="true" />
            <div className="hero-core-content">
              {hero.badge ? <span className="hero-core-label">{hero.badge}</span> : null}
              {hero.photo && (
                <div className="hero-photo-frame">
                  <div className="hero-photo">
                    <img
                      className="hero-photo-img"
                      src={hero.photo}
                      alt={hero.photoAlt || `${hero.name} portrait`}
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                    />
                  </div>
                  <span className="hero-photo-glow" aria-hidden="true" />
                </div>
              )}
              <p>{hero.punchline}</p>
              <span className="hero-core-label hero-core-meta-pill">{hero.meta}</span>
            </div>
          </div>
        </motion.div>
      </div>
      <HighlightGrid />
    </section>
  );
}
