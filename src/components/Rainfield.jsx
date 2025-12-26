import { useEffect, useMemo, useRef, useState } from 'react';

export function Rainfield() {
  const [enabled, setEnabled] = useState(() => {
    const mq = window.matchMedia?.('(max-width: 720px)');
    return mq ? !mq.matches : true;
  });

  const rootRef = useRef(null);
  const flashRef = useRef(null);
  const distortRef = useRef(null);
  const villainRef = useRef(null);
  const boltRefs = useRef([]);
  const prefersReducedRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia?.('(max-width: 720px)');
    if (!mq) return;

    const onChange = (e) => setEnabled(!e.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  if (!enabled) return null;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const t = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      const y = (t - 0.5) * 48;
      const x = Math.sin(t * Math.PI * 2) * 18;

      el.style.setProperty('--par-x1', `${x * 0.15}px`);
      el.style.setProperty('--par-y1', `${y * 0.15}px`);
      el.style.setProperty('--par-x2', `${x * 0.35}px`);
      el.style.setProperty('--par-y2', `${y * 0.35}px`);
      el.style.setProperty('--par-x3', `${x * 0.6}px`);
      el.style.setProperty('--par-y3', `${y * 0.6}px`);
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    const flashEl = flashRef.current;
    const distortEl = distortRef.current;
    if (!el || !flashEl || !distortEl) return;

    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    prefersReducedRef.current = Boolean(mq?.matches);
    const onMq = (e) => {
      prefersReducedRef.current = Boolean(e.matches);
    };
    mq?.addEventListener?.('change', onMq);

    let cancelled = false;
    let timeoutId = 0;

    const rand = (min, max) => min + Math.random() * (max - min);

    const fireBolt = (boltIndex) => {
      const bolt = boltRefs.current[boltIndex];
      if (!bolt) return;

      const left = rand(10, 90);
      const top = rand(6, 38);
      const size = rand(260, 640);
      const angle = rand(-26, 26);
      const intensity = rand(0.45, 0.82);

      bolt.style.left = `${left}%`;
      bolt.style.top = `${top}%`;
      bolt.style.width = `${size}px`;
      bolt.style.height = `${size}px`;
      bolt.style.setProperty('--angle', `${angle}deg`);
      bolt.style.setProperty('--intensity', intensity.toFixed(3));

      bolt.getAnimations().forEach((a) => a.cancel());
      bolt.animate(
        [
          { opacity: 0 },
          { opacity: intensity * 0.92, offset: 0.18 },
          { opacity: 0.06, offset: 0.28 },
          { opacity: intensity, offset: 0.42 },
          { opacity: 0, offset: 1 },
        ],
        {
          duration: Math.round(rand(240, 520)),
          easing: 'steps(1, end)',
          fill: 'both',
        },
      );
    };

    const triggerLightning = () => {
      if (cancelled || prefersReducedRef.current) return;

      el.classList.add('storm-on');

      flashEl.getAnimations().forEach((a) => a.cancel());
      flashEl.animate(
        [
          { opacity: 0 },
          { opacity: 0.22, offset: 0.12 },
          { opacity: 0.04, offset: 0.18 },
          { opacity: 0.34, offset: 0.34 },
          { opacity: 0, offset: 1 },
        ],
        {
          duration: 560,
          easing: 'steps(1, end)',
          fill: 'both',
        },
      );

      distortEl.getAnimations().forEach((a) => a.cancel());
      distortEl.animate(
        [
          { opacity: 0, transform: 'translate3d(0,0,0) scale(1)' },
          { opacity: 0.12, transform: 'translate3d(-0.6%,0.4%,0) scale(1.01)', offset: 0.16 },
          { opacity: 0.03, transform: 'translate3d(0.4%,-0.3%,0) scale(1.01)', offset: 0.32 },
          { opacity: 0.16, transform: 'translate3d(0.5%,-0.4%,0) scale(1.012)', offset: 0.46 },
          { opacity: 0, transform: 'translate3d(0,0,0) scale(1)', offset: 1 },
        ],
        {
          duration: 520,
          easing: 'steps(1, end)',
          fill: 'both',
        },
      );

      const primary = Math.floor(rand(0, 3));
      fireBolt(primary);
      if (Math.random() < 0.55) {
        const secondary = (primary + 1 + Math.floor(rand(0, 2))) % 3;
        window.setTimeout(() => fireBolt(secondary), Math.round(rand(80, 170)));
      }

      const villainEl = villainRef.current;
      if (villainEl) {
        villainEl.getAnimations().forEach((a) => a.cancel());
        villainEl.animate(
          [
            { opacity: 0.06, transform: 'translate3d(-50%, 0, 0) scale(1)', filter: 'blur(0.25px) saturate(1)' },
            { opacity: 0.46, transform: 'translate3d(-50%, -0.6%, 0) scale(1.02)', filter: 'blur(0.05px) saturate(1.12)', offset: 0.18 },
            { opacity: 0.12, transform: 'translate3d(-50%, 0.2%, 0) scale(1.01)', filter: 'blur(0.16px) saturate(1.06)', offset: 0.32 },
            { opacity: 0.54, transform: 'translate3d(-50%, -0.4%, 0) scale(1.03)', filter: 'blur(0.02px) saturate(1.14)', offset: 0.46 },
            { opacity: 0.06, transform: 'translate3d(-50%, 0, 0) scale(1)', filter: 'blur(0.25px) saturate(1)' },
          ],
          {
            duration: 680,
            easing: 'steps(1, end)',
            fill: 'both',
          },
        );
      }

      window.setTimeout(() => el.classList.remove('storm-on'), 680);
    };

    const schedule = () => {
      if (cancelled) return;
      const next = rand(3000, 6000);
      timeoutId = window.setTimeout(() => {
        triggerLightning();
        schedule();
      }, Math.round(next));
    };

    schedule();
    return () => {
      cancelled = true;
      if (timeoutId) window.clearTimeout(timeoutId);
      mq?.removeEventListener?.('change', onMq);
    };
  }, []);

  const embers = useMemo(
    () =>
      Array.from({ length: 170 }, (_, index) => {
        const depth01 = Math.random();
        const size = (0.9 + Math.random() * 2.8) * (0.7 + depth01 * 0.85);
        const blur = 0.2 + Math.random() * 0.7 + (1 - depth01) * 0.25;
        const opacityMin = 0.04 + Math.random() * 0.08;
        const opacityMax = Math.min(0.38, opacityMin + 0.08 + Math.random() * 0.16 + depth01 * 0.1);

        const dx = (-14 + Math.random() * 28) * (0.55 + depth01 * 0.85);
        const dy = (-22 - Math.random() * 96) * (0.52 + depth01 * 0.92);

        return {
          id: `ember-${index}`,
          left: Math.random() * 100,
          top: Math.random() * 100,
          size,
          blur,
          opacityMin,
          opacityMax,
          dx,
          dy,
          driftDelay: Math.random() * 10,
          driftDuration: 10 + Math.random() * 18 - depth01 * 2,
          twinkleDelay: Math.random() * 8,
          twinkleDuration: 5.8 + Math.random() * 7.4,
        };
      }),
    [],
  );

  const motes = useMemo(
    () =>
      Array.from({ length: 22 }, (_, index) => ({
        id: `mote-${index}`,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 6 + Math.random() * 14,
        delay: Math.random() * 2.5,
        duration: 10 + Math.random() * 10,
        drift: -10 + Math.random() * 20,
      })),
    [],
  );

  const dimensionBlobs = useMemo(
    () =>
      Array.from({ length: 4 }, (_, index) => {
        const size = 360 + Math.random() * 520;
        const opacity = 0.12 + Math.random() * 0.18;
        const driftDelay = Math.random() * 8;
        const driftDuration = 18 + Math.random() * 20;
        return {
          id: `blob-${index}`,
          left: 10 + Math.random() * 80,
          top: 10 + Math.random() * 80,
          size,
          opacity,
          driftDelay,
          driftDuration,
        };
      }),
    [],
  );

  const veins = useMemo(
    () =>
      Array.from({ length: 6 }, (_, index) => {
        const length = 220 + Math.random() * 520;
        const thickness = 1 + Math.random() * 1.6;
        const angle = -55 + Math.random() * 110;
        const glow = 10 + Math.random() * 18;
        return {
          id: `vein-${index}`,
          left: Math.random() * 100,
          top: Math.random() * 100,
          length,
          thickness,
          angle,
          glow,
          delay: 2 + Math.random() * 12,
          duration: 6 + Math.random() * 9,
        };
      }),
    [],
  );

  const vines = useMemo(
    () =>
      Array.from({ length: 9 }, (_, index) => {
        const length = 260 + Math.random() * 680;
        const thickness = 1 + Math.random() * 2.2;
        const angle = -55 + Math.random() * 110;
        const sway = 5 + Math.random() * 11;
        return {
          id: `vine-${index}`,
          left: Math.random() * 100,
          top: 10 + Math.random() * 82,
          length,
          thickness,
          angle,
          sway,
          delay: Math.random() * 10,
          duration: 14 + Math.random() * 18,
        };
      }),
    [],
  );

  return (
    <div className="rainfield" ref={rootRef} aria-hidden="true">
      <div className="bg-layer vignette-layer" />
      <div className="bg-layer calm-layer" />
      <span className="storm-flash" ref={flashRef} />
      <span className="storm-distort" ref={distortRef} />

      <div className="bg-layer fog-layer" />

      <div className="bg-layer lightning-layer">
        {Array.from({ length: 3 }, (_, index) => (
          <span
            key={`bolt-${index}`}
            className="storm-bolt"
            ref={(node) => {
              boltRefs.current[index] = node;
            }}
          />
        ))}
      </div>

      <div className="bg-layer vein-layer">
        {veins.map((vein) => (
          <span
            key={vein.id}
            className="energy-vein"
            style={{
              left: `${vein.left}%`,
              top: `${vein.top}%`,
              width: `${vein.length}px`,
              height: `${vein.thickness}px`,
              '--angle': `${vein.angle}deg`,
              '--glow': `${vein.glow}px`,
              animationDelay: `${vein.delay}s`,
              animationDuration: `${vein.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="bg-layer vine-layer">
        {vines.map((vine) => (
          <span
            key={vine.id}
            className="creep-vine"
            style={{
              left: `${vine.left}%`,
              top: `${vine.top}%`,
              width: `${vine.length}px`,
              height: `${vine.thickness}px`,
              '--angle': `${vine.angle}deg`,
              '--sway': `${vine.sway}deg`,
              animationDelay: `${vine.delay}s`,
              animationDuration: `${vine.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="bg-layer blob-layer">
        {dimensionBlobs.map((blob) => (
          <span
            key={blob.id}
            className="dimension-blob"
            style={{
              left: `${blob.left}%`,
              top: `${blob.top}%`,
              width: `${blob.size}px`,
              height: `${blob.size}px`,
              opacity: blob.opacity,
              animationDelay: `${blob.driftDelay}s`,
              animationDuration: `${blob.driftDuration}s`,
            }}
          />
        ))}
      </div>

      <div className="bg-layer villain-layer">
        <div className="villain-figure" ref={villainRef}>
          <svg className="villain-svg" viewBox="0 0 300 420" role="presentation" focusable="false">
            <defs>
              <linearGradient id="villain-cloak" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#070613" stopOpacity="0.98" />
                <stop offset="62%" stopColor="#030209" stopOpacity="0.96" />
                <stop offset="100%" stopColor="#010108" stopOpacity="0.98" />
              </linearGradient>
              <radialGradient id="villain-rim" cx="50%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#b1002b" stopOpacity="0.55" />
                <stop offset="60%" stopColor="#b1002b" stopOpacity="0.10" />
                <stop offset="100%" stopColor="#b1002b" stopOpacity="0" />
              </radialGradient>
            </defs>

            <path
              d="M150 30 C 116 36, 92 58, 84 86 C 70 136, 86 176, 64 214 C 36 262, 34 320, 52 370 C 86 410, 214 410, 248 370 C 266 320, 264 262, 236 214 C 214 176, 230 136, 216 86 C 208 58, 184 36, 150 30 Z"
              fill="url(#villain-cloak)"
              stroke="url(#villain-rim)"
              strokeWidth="2"
              opacity="0.96"
            />

            <path
              d="M150 64 C 128 64, 112 82, 112 104 C 112 128, 128 146, 150 146 C 172 146, 188 128, 188 104 C 188 82, 172 64, 150 64 Z"
              fill="rgba(0,0,0,0.42)"
              opacity="0.9"
            />

            <path
              d="M100 210 C 118 172, 140 156, 150 156 C 160 156, 182 172, 200 210 C 214 240, 218 280, 214 332 C 212 356, 204 380, 194 402 C 170 410, 130 410, 106 402 C 96 380, 88 356, 86 332 C 82 280, 86 240, 100 210 Z"
              fill="rgba(0,0,0,0.26)"
              opacity="0.85"
            />

            <g className="villain-eyes">
              <ellipse className="villain-eye" cx="132" cy="106" rx="10" ry="4" />
              <ellipse className="villain-eye" cx="168" cy="106" rx="10" ry="4" />
            </g>
          </svg>
        </div>
      </div>

      <div className="bg-layer dust-layer">
        {embers.map((p) => (
          <span
            key={p.id}
            className="ember"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              '--b': `${p.blur}px`,
              '--o-min': p.opacityMin,
              '--o-max': p.opacityMax,
              '--dx': `${p.dx}px`,
              '--dy': `${p.dy}px`,
              '--sd': `${p.driftDuration}s`,
              '--sd-delay': `${p.driftDelay}s`,
              '--tw': `${p.twinkleDuration}s`,
              '--tw-delay': `${p.twinkleDelay}s`,
            }}
          />
        ))}
      </div>

      {motes.map((mote) => (
        <span
          key={mote.id}
          className="bg-mote"
          style={{
            left: `${mote.left}%`,
            top: `${mote.top}%`,
            width: `${mote.size}px`,
            height: `${mote.size}px`,
            animationDelay: `${mote.delay}s`,
            animationDuration: `${mote.duration}s`,
            '--drift-x': `${mote.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
