import { useEffect, useState } from 'react';

const navLinks = [
  { label: 'Intro', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 48);
    handle();
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <header className={`floating-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-inner">
        <a className="nav-logo" href="#hero" aria-label="Back to top">
          FD
        </a>
        <nav className="nav-links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href="#contact">
          Let&apos;s build
        </a>
      </div>
    </header>
  );
}
