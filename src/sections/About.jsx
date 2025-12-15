import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading.jsx';

const focusAreas = [
  // {
  //   title: 'API craft',
  //   detail: 'Design REST endpoints that feel predictable, versionable, and easy for frontends to consume.',
  // },
  // {
  //   title: 'Data confidence',
  //   detail: 'Model relational schemas, write migrations, and profile queries so dashboards stay fast and accurate.',
  // },
  // {
  //   title: 'Collaborative delivery',
  //   detail: 'Share notes, review pull requests, and keep DIU teammates aligned on requirements and timelines.',
  // },
];

export function About() {
  return (
    <section id="about" className="section">
      <SectionHeading
        eyebrow="Origin Story"
        // title="Backend-first student builder"
        description="From DIU labs to GitHub releases, I focus on the plumbing—databases, APIs, auth, and the ops glue that keeps apps trustworthy."
      />
      <div className="about-grid">
        <motion.p
          className="about-lede"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ amount: 0.45 }}
        >
          Hello! I’m Md. Fahim Abdullah Danial, a Software Engineering student who loves taking messy requirements and structuring them into reliable backends. I translate contest discipline into clean data layers, monitored services, and developer-friendly documentation that teams can trust.
        </motion.p>
        <div className="about-cards">
          {focusAreas.map((area, index) => (
            <motion.article
              key={area.title}
              className="glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ amount: 0.4 }}
            >
              <h3>{area.title}</h3>
              <p>{area.detail}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
