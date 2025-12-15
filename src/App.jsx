import { FloatingNav } from './components/FloatingNav.jsx';
import { Rainfield } from './components/Rainfield.jsx';
import { Hero } from './sections/Hero.jsx';
import { About } from './sections/About.jsx';
import { Skills } from './sections/Skills.jsx';
import { Projects } from './sections/Projects.jsx';
import { Experience } from './sections/Experience.jsx';
import { Contact } from './sections/Contact.jsx';

function App() {
  return (
    <div className="app-shell">
      <Rainfield />
      <FloatingNav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <footer className="footer">
        <p>© Fahim Abdullah Danial · {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
