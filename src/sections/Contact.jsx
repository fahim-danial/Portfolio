import { motion, useReducedMotion } from 'framer-motion';
import { SiCodechef, SiCodeforces, SiGithub, SiLeetcode, SiLinkedin } from 'react-icons/si';
import { SectionHeading } from '../components/SectionHeading.jsx';
import { contact } from '../data/portfolio.js';

function AtCoderIcon() {
  return (
    <span className="contact-social-icon contact-social-icon--fallback" aria-hidden="true">
      AC
    </span>
  );
}

const socialIconByLabel = {
  LinkedIn: SiLinkedin,
  GitHub: SiGithub,
  LeetCode: SiLeetcode,
  Codeforces: SiCodeforces,
  Codechef: SiCodechef,
  Atcoder: AtCoderIcon,
};

export function Contact({ isActive = false }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id="contact"
      className={`section contact-section${isActive ? ' is-highlighted' : ''}`}
      initial={{ opacity: 0, y: 24, rotateZ: -0.4 }}
      whileInView={{ opacity: 1, y: 0, rotateZ: 0 }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
      viewport={{ amount: 0.2 }}
    >
      <SectionHeading
        eyebrow="Stay in touch"
        title="Let’s connect"
        description="Share a dataset, API spec, or contest-style problem—I'm ready to turn it into a scalable solution."
      />
      <motion.div
        className="contact-card"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={
          shouldReduceMotion
            ? undefined
            : {
                y: -8,
                transition: { type: 'spring', stiffness: 220, damping: 20 },
              }
        }
        whileTap={shouldReduceMotion ? undefined : { scale: 0.995 }}
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
          {contact.socials.map((social) => {
            const Icon = socialIconByLabel[social.label];

            return (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                <span className="contact-social-left">
                  {Icon ? (
                    <Icon className="contact-social-icon" aria-hidden="true" focusable="false" />
                  ) : null}
                  <span>{social.label}</span>
                </span>
                <span>{social.handle}</span>
              </a>
            );
          })}
        </div>
      </motion.div>
    </motion.section>
  );
}
