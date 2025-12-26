import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading.jsx';
import { ProjectCard } from '../components/ProjectCard.jsx';
import { projects } from '../data/portfolio.js';

export function Projects({ isActive = false }) {
  return (
    <motion.section
      id="projects"
      className={`section${isActive ? ' is-highlighted' : ''}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      viewport={{ amount: 0.25 }}
    >
      <SectionHeading
        eyebrow="Selected builds"
        title="Backend projects for real learners and travelers"
        description="Tour planning, AI-assisted education, and other DIU projects where I owned the data models, APIs, and infrastructure."
      />
      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </motion.section>
  );
}
