import { SectionHeading } from '../components/SectionHeading.jsx';
import { ProjectCard } from '../components/ProjectCard.jsx';
import { projects } from '../data/portfolio.js';

export function Projects() {
  return (
    <section id="projects" className="section">
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
    </section>
  );
}
