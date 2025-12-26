import { FloatingNav } from './components/FloatingNav.jsx';
import { Rainfield } from './components/Rainfield.jsx';
import { Hero } from './sections/Hero.jsx';
import { About } from './sections/About.jsx';
import { Skills } from './sections/Skills.jsx';
import { Projects } from './sections/Projects.jsx';
import { Experience } from './sections/Experience.jsx';
import { Contact } from './sections/Contact.jsx';
import { useEffect, useState } from 'react';

function App() {
  const [activeSectionId, setActiveSectionId] = useState('');

  useEffect(() => {
    // Reset highlight (and :target styling) after a full refresh.
    if (typeof window !== 'undefined' && window.location.hash) {
      try {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      } catch {
        // ignore
      }
    }

    const isInteractiveTarget = (target) => {
      if (!(target instanceof Element)) return false;
      return Boolean(target.closest('a, button, input, textarea, select, summary, label'));
    };

    const getSectionFromTarget = (target) => {
      if (!(target instanceof Element)) return null;
      return target.closest('.section[id]');
    };

    const handleClick = (event) => {
      if (isInteractiveTarget(event.target)) return;
      const section = getSectionFromTarget(event.target);
      if (!section) return;
      setActiveSectionId(section.id);
    };

    const handleHashChange = () => {
      setActiveSectionId(window.location.hash ? window.location.hash.slice(1) : '');
    };

    // Capture so we can react even if inner components stop propagation later.
    document.addEventListener('click', handleClick, true);
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      document.removeEventListener('click', handleClick, true);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="app-shell">
      <Rainfield />
      <FloatingNav />
      <main>
        <Hero isActive={activeSectionId === 'hero'} />
        <About isActive={activeSectionId === 'about'} />
        <Skills isActive={activeSectionId === 'skills'} />
        <Projects isActive={activeSectionId === 'projects'} />
        <Experience isActive={activeSectionId === 'experience'} />
        <Contact isActive={activeSectionId === 'contact'} />
      </main>
      <footer className="footer">
        <p>© Fahim Abdullah Danial · {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
