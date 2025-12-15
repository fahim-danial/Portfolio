import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading.jsx';
import { skillGroups } from '../data/portfolio.js';

export function Skills() {
  const cardAnimation = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <section id="skills" className="section">
      <SectionHeading
        eyebrow="Capabilities"
        // title="Backend-first problem solving"
        description="Stacks I lean on to design APIs, manage data, and keep projects and tour platforms fast, secure, and dependable."
      />
      <motion.div
        className="skills-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}
        transition={{ staggerChildren: 0.15 }}
      >
        {skillGroups.map((group, index) => (
          <motion.article
            key={group.title}
            className="skills-card"
            variants={cardAnimation}
          >
            <h3>{group.title}</h3>
            <ul className={group.title === 'Core Strengths' ? 'skills-list dot-list' : 'skills-list'}>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
