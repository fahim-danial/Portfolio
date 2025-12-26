import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading.jsx';
import { ExperienceCard } from '../components/ExperienceCard.jsx';
import { experiences } from '../data/portfolio.js';

export function Experience({ isActive = false }) {
  return (
    <motion.section
      id="experience"
      className={`section${isActive ? ' is-highlighted' : ''}`}
      initial={{ opacity: 0, y: 18, rotateX: 6 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
      viewport={{ amount: 0.22 }}
      style={{ transformPerspective: 900 }}
    >
      <SectionHeading
        eyebrow="Education"
        title="Software Engineering at DIU"
        description="Focused coursework, hands-on labs, and team projects that strengthened my backend fundamentals, product thinking, and delivery discipline."
      />
      <div className="experience-grid">
        {experiences.map((entry, index) => (
          <ExperienceCard key={entry.company} entry={entry} index={index} />
        ))}
      </div>
    </motion.section>
  );
}
