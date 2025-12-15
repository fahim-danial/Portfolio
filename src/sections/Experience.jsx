import { SectionHeading } from '../components/SectionHeading.jsx';
import { ExperienceCard } from '../components/ExperienceCard.jsx';
import { experiences } from '../data/portfolio.js';

export function Experience() {
  return (
    <section id="experience" className="section">
      <SectionHeading
        eyebrow="Education"
        title="Software Engineering at DIU"
        description="Coursework, labs, and collaborative projects that built my backend foundation and product instincts."
      />
      <div className="experience-grid">
        {experiences.map((entry, index) => (
          <ExperienceCard key={entry.company} entry={entry} index={index} />
        ))}
      </div>
    </section>
  );
}
