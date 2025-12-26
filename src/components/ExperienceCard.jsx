import { motion, useReducedMotion } from 'framer-motion';

export function ExperienceCard({ entry, index }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      className="experience-card"
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -8,
              scale: 1.01,
              transition: { type: 'spring', stiffness: 220, damping: 20 },
            }
      }
      whileTap={shouldReduceMotion ? undefined : { scale: 0.995 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      viewport={{ amount: 0.45 }}
    >
      <div className="experience-header">
        <p className="experience-period">{entry.period}</p>
        <h3>
          {entry.title}
          <span> · {entry.company}</span>
        </h3>
      </div>
      <ul>
        {entry.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </motion.article>
  );
}
