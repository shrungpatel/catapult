'use client';

import { useState } from 'react';

const categories = [
  {
    title: 'Overall\nWinner',
    desc: 'Best across innovation, execution, and impact.',
    blob: 'radial-gradient(ellipse at 50% 70%, rgba(61,191,154,0.6) 0%, rgba(80,160,255,0.2) 55%, transparent 75%)',
    clip: 'polygon(0% 5%, 12% 0%, 100% 2%, 96% 82%, 85% 100%, 2% 94%)',
    rotate: '-28deg',
  },
  {
    title: 'Best ML\nProject',
    desc: 'Outstanding ML models and AI-driven intelligence.',
    blob: 'radial-gradient(ellipse at 40% 65%, rgba(80,200,255,0.55) 0%, rgba(61,191,154,0.2) 55%, transparent 75%)',
    clip: 'polygon(5% 0%, 98% 4%, 100% 78%, 90% 100%, 6% 96%, 0% 20%)',
    rotate: '-16deg',
  },
  {
    title: 'Most\nPromising\nStartup',
    desc: 'Real market potential with a path to product.',
    blob: 'radial-gradient(ellipse at 55% 60%, rgba(61,191,154,0.5) 0%, rgba(100,210,255,0.25) 55%, transparent 75%)',
    clip: 'polygon(3% 8%, 88% 0%, 100% 90%, 80% 100%, 0% 97%, 2% 5%)',
    rotate: '-5deg',
  },
  {
    title: 'Best Web\nAutomation',
    desc: 'Agent workflows that eliminate friction.',
    blob: 'radial-gradient(ellipse at 45% 70%, rgba(100,220,200,0.5) 0%, rgba(60,130,255,0.2) 55%, transparent 75%)',
    clip: 'polygon(8% 0%, 100% 6%, 94% 92%, 76% 100%, 0% 88%, 4% 14%)',
    rotate: '7deg',
  },
  {
    title: 'Best Use\nof Hardware',
    desc: 'Creative integration of physical systems.',
    blob: 'radial-gradient(ellipse at 50% 65%, rgba(60,180,255,0.5) 0%, rgba(61,191,154,0.25) 55%, transparent 75%)',
    clip: 'polygon(0% 4%, 82% 0%, 100% 84%, 94% 100%, 10% 98%, 3% 18%)',
    rotate: '18deg',
  },
  {
    title: 'Most\nPromising\nFinTech',
    desc: 'Innovative solutions in finance and access.',
    blob: 'radial-gradient(ellipse at 55% 65%, rgba(61,191,154,0.55) 0%, rgba(80,180,255,0.3) 50%, transparent 72%)',
    clip: 'polygon(10% 0%, 100% 8%, 90% 100%, 70% 94%, 0% 100%, 5% 16%)',
    rotate: '28deg',
  },
];

export default function PrizeCategories() {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ width: '100%', padding: '48px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      {/* Header */}


      {/* Fan of cards */}
      <div style={{
        position: 'relative',
        width: '96%',
        maxWidth: '1400px',
        height: '440px',
      }}>
        {categories.map((cat, i) => {
          const isHovered = hovered === i;
          const spreadPct = 2 + (i / (categories.length - 1)) * 78;

          return (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: 'absolute',
                left: `${spreadPct}%`,
                bottom: '50px',
                width: '230px',
                height: '300px',
                transformOrigin: 'bottom center',
                transform: isHovered
                  ? `rotate(0deg) scale(1.1) translateY(-32px)`
                  : `rotate(${cat.rotate})`,
                transition: 'transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)',
                zIndex: isHovered ? 20 : i + 1,
                cursor: 'default',
              }}
            >
              {/* Glass base */}
              <div style={{
                position: 'absolute',
                inset: 0,
                clipPath: cat.clip,
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }} />

              {/* Color blob */}
              <div style={{
                position: 'absolute',
                inset: 0,
                clipPath: cat.clip,
                background: cat.blob,
                opacity: isHovered ? 1 : 0.8,
                transition: 'opacity 0.4s ease',
              }} />

              {/* Border */}
              <div style={{
                position: 'absolute',
                inset: 0,
                clipPath: cat.clip,
                boxShadow: isHovered
                  ? 'inset 0 0 0 1.5px rgba(255,255,255,0.55)'
                  : 'inset 0 0 0 1px rgba(255,255,255,0.18)',
                transition: 'box-shadow 0.4s ease',
              }} />

              {/* Top shimmer */}
              <div style={{
                position: 'absolute',
                inset: 0,
                clipPath: cat.clip,
                background: 'linear-gradient(160deg, rgba(255,255,255,0.12) 0%, transparent 50%)',
                pointerEvents: 'none',
              }} />

              {/* Content */}
              <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 2,
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                gap: '10px',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-unbounded), sans-serif',
                  fontSize: '17px',
                  fontWeight: 400,
                  color: '#fff',
                  margin: 0,
                  lineHeight: 1.35,
                  whiteSpace: 'pre-line',
                  textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                }}>
                  {cat.title}
                </h3>

                <p style={{
                  fontFamily: 'var(--font-raleway), sans-serif',
                  fontSize: '11px',
                  fontWeight: 200,
                  color: isHovered ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0)',
                  margin: 0,
                  lineHeight: 1.6,
                  transition: 'color 0.3s ease',
                }}>
                  {cat.desc}
                </p>
              </div>

              {/* Vertical line */}
              <div style={{
                position: 'absolute',
                bottom: '-40px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '1px',
                height: '36px',
                background: isHovered ? 'rgba(61,191,154,0.9)' : 'rgba(255,255,255,0.2)',
                transition: 'background 0.3s ease',
              }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}