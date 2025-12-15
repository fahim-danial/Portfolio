import { useMemo } from 'react';

export function Rainfield() {
  const drops = useMemo(
    () =>
      Array.from({ length: 36 }, (_, index) => ({
        id: index,
        left: Math.random() * 100,
        delay: index * 0.35,
        duration: 8 + Math.random() * 6,
      })),
    [],
  );

  return (
    <div className="rainfield" aria-hidden="true">
      {drops.map((drop) => (
        <span
          key={drop.id}
          className="rain-drop"
          style={{
            left: `${drop.left}%`,
            animationDelay: `${drop.delay}s`,
            animationDuration: `${drop.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
