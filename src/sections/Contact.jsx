import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading.jsx';
import { contact } from '../data/portfolio.js';

export function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <SectionHeading
        eyebrow="Stay in touch"
        title="Let’s build dependable backends together"
        description="Share a dataset, API spec, or contest-style problem—I'm ready to turn it into a scalable solution."
      />
      <motion.div
        className="contact-card"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ amount: 0.4 }}
      >
        <div className="contact-details">
          <p>
            <span>Email</span>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
          <p><span>Phone</span>{contact.phone}</p>
          <p><span>Location</span>{contact.location}</p>
        </div>
        <div className="contact-socials">
          {contact.socials.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
              <span>{social.label}</span>
              <span>{social.handle}</span>
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
