import { motion } from 'framer-motion';

export function ProjectCard({ project, index }) {
  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.7, ease: 'easeOut' }}
      viewport={{ amount: 0.35 }}
    >
      <div className="project-glow" />
      <div className="project-content">
        <div className="project-meta">
          <p>Featured project</p>
          <span />
        </div>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <ul className="project-stack">
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="project-links">
          {project.live !== '#' && (
            <a href={project.live} target="_blank" rel="noreferrer">
              Live
            </a>
          )}
          {project.repo !== '#' && (
            <a href={project.repo} target="_blank" rel="noreferrer">
              Repo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
