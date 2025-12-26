import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading.jsx';
import { skillGroups } from '../data/portfolio.js';
import {
  siCplusplus,
  siCss,
  siDjango,
  siFlask,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siMysql,
  siOpenjdk,
  siPython,
  siReact,
  siSqlite,
} from 'simple-icons';

export function Skills({ isActive = false }) {
  const shouldReduceMotion = useReducedMotion();

  const languageIcons = {
    'C++': siCplusplus,
    Python: siPython,
    Java: siOpenjdk,
    HTML: siHtml5,
    CSS: siCss,
    JavaScript: siJavascript,
  };

  const brandIcons = {
    ...languageIcons,
    Flask: siFlask,
    Django: siDjango,
    ReactJS: siReact,
    SQLite: siSqlite,
    MySQL: siMysql,
    Git: siGit,
    GitHub: siGithub,
  };

  const renderSimpleIcon = (icon) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={icon.path} fill={`#${icon.hex}`} />
    </svg>
  );

  const getRelativeLuminance = (hex) => {
    if (typeof hex !== 'string' || hex.length !== 6) return 1;
    const r8 = Number.parseInt(hex.slice(0, 2), 16);
    const g8 = Number.parseInt(hex.slice(2, 4), 16);
    const b8 = Number.parseInt(hex.slice(4, 6), 16);

    const toLinear = (v8) => {
      const v = v8 / 255;
      return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    };

    const r = toLinear(r8);
    const g = toLinear(g8);
    const b = toLinear(b8);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const shouldBoostIcon = (icon) => {
    if (!icon?.hex) return false;
    return getRelativeLuminance(icon.hex) < 0.28;
  };

  const cardAnimation = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <motion.section
      id="skills"
      className={`section${isActive ? ' is-highlighted' : ''}`}
      initial={{ opacity: 0, y: 22, rotateZ: 0.4 }}
      whileInView={{ opacity: 1, y: 0, rotateZ: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      viewport={{ amount: 0.2 }}
    >
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
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    y: -8,
                    transition: { type: 'spring', stiffness: 220, damping: 20 },
                  }
            }
            whileTap={shouldReduceMotion ? undefined : { scale: 0.995 }}
          >
            <h3>{group.title}</h3>
            <ul
              className={
                group.title === 'Core Strengths'
                  ? 'skills-list dot-list'
                  : group.title === 'Languages' ||
                      group.title === 'Frameworks & Libraries' ||
                      group.title === 'Databases & Tools'
                    ? 'skills-list skills-list--brand-logos'
                    : 'skills-list'
              }
            >
              {group.items.map((item) => (
                <li
                  key={item}
                  className={
                    group.title === 'Languages' ||
                    group.title === 'Frameworks & Libraries' ||
                    group.title === 'Databases & Tools'
                      ? 'skill-row'
                      : undefined
                  }
                >
                  {group.title === 'Languages' ||
                  group.title === 'Frameworks & Libraries' ||
                  group.title === 'Databases & Tools' ? (
                    <span
                      className={`skill-logo${shouldBoostIcon(brandIcons[item]) ? ' skill-logo--boost' : ''}`}
                      aria-hidden="true"
                    >
                      {renderSimpleIcon(brandIcons[item] ?? siJavascript)}
                    </span>
                  ) : null}
                  <span
                    className={
                      group.title === 'Languages' ||
                      group.title === 'Frameworks & Libraries' ||
                      group.title === 'Databases & Tools'
                        ? 'skill-label'
                        : undefined
                    }
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}
