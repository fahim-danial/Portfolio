import { motion } from 'framer-motion';

export function TypingText({
  text,
  startDelayMs = 250,
  charDelayMs = 32,
  className,
  showCursor = true,
}) {
  const characters = Array.from(text);

  const container = {
    hidden: {},
    show: {
      transition: {
        delayChildren: startDelayMs / 1000,
        staggerChildren: Math.max(0.01, charDelayMs / 1000),
      },
    },
  };

  const character = {
    hidden: {
      opacity: 0,
      y: '0.18em',
      filter: 'blur(8px)',
    },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.22,
        ease: 'easeOut',
      },
    },
  };

  return (
    <span className={['typing', className].filter(Boolean).join(' ')} aria-label={text}>
      <motion.span variants={container} initial="hidden" animate="show" aria-hidden="true">
        {characters.map((ch, index) => (
          <motion.span key={`${ch}-${index}`} variants={character}>
            {ch === ' ' ? '\u00A0' : ch}
          </motion.span>
        ))}
      </motion.span>
      {showCursor ? <span className="typing-cursor" aria-hidden="true" /> : null}
    </span>
  );
}
