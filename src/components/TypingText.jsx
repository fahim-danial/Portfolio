import { useEffect, useState } from 'react';

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => setPrefersReducedMotion(Boolean(mediaQuery.matches));
    update();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', update);
      return () => mediaQuery.removeEventListener('change', update);
    }

    mediaQuery.addListener(update);
    return () => mediaQuery.removeListener(update);
  }, []);

  return prefersReducedMotion;
}

export function TypingText({
  text,
  startDelayMs = 250,
  charDelayMs = 32,
  className,
  showCursor = true,
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visibleCount, setVisibleCount] = useState(prefersReducedMotion ? text.length : 0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisibleCount(text.length);
      return;
    }

    setVisibleCount(0);

    let cancelled = false;
    let timeoutId;

    const tick = (nextCount) => {
      if (cancelled) return;

      setVisibleCount(nextCount);

      if (nextCount >= text.length) return;
      timeoutId = window.setTimeout(() => tick(nextCount + 1), charDelayMs);
    };

    timeoutId = window.setTimeout(() => tick(1), startDelayMs);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [text, startDelayMs, charDelayMs, prefersReducedMotion]);

  const shownText = text.slice(0, visibleCount);

  return (
    <span className={['typing', className].filter(Boolean).join(' ')} aria-label={text}>
      <span aria-hidden="true">{shownText}</span>
      {showCursor && !prefersReducedMotion ? <span className="typing-cursor" aria-hidden="true" /> : null}
    </span>
  );
}
