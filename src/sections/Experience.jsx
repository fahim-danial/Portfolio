import { SectionHeading } from '../components/SectionHeading.jsx';
import { ExperienceCard } from '../components/ExperienceCard.jsx';
import { experiences } from '../data/portfolio.js';

export function Experience() {
  return (
    <section id="experience" className="section">
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
    </section>
  );
}
