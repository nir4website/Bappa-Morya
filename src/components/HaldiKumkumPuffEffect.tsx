import React, { useMemo } from 'react';

export interface ActivePuff {
  id: number;
  type: 'haldi' | 'kumkum';
  x?: number; // percentage or px
  y?: number;
}

interface HaldiKumkumPuffEffectProps {
  puffs: ActivePuff[];
}

export const HaldiKumkumPuffEffect: React.FC<HaldiKumkumPuffEffectProps> = ({ puffs }) => {
  if (puffs.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-visible select-none">
      {puffs.map((puff) => (
        <SinglePuff key={puff.id} puff={puff} />
      ))}
    </div>
  );
};

const SinglePuff: React.FC<{ puff: ActivePuff }> = ({ puff }) => {
  const isHaldi = puff.type === 'haldi';

  // Generate 20 deterministic particles for this puff instance
  const particles = useMemo(() => {
    return Array.from({ length: 22 }, (_, i) => {
      // Angle between -155 deg and -25 deg (radiating upward and outward)
      const angle = (-155 + (i * 130) / 21 + ((i % 5) - 2) * 8) * (Math.PI / 180);
      const distance = 45 + ((i * 19) % 55) + ((i % 3) * 15);
      const px = Math.round(Math.cos(angle) * distance);
      const py = Math.round(Math.sin(angle) * distance - 25);
      const size = 3 + (i % 4);
      const delay = (i * 0.02).toFixed(2);
      const dur = (1.4 + (i % 5) * 0.12).toFixed(2);

      const color = isHaldi
        ? ['#FEF08A', '#FACC15', '#EAB308', '#CA8A04', '#FFD700'][i % 5]
        : ['#FECDD3', '#F87171', '#EF4444', '#DC2626', '#B91C1C'][i % 5];

      return {
        id: i,
        px,
        py,
        size,
        delay,
        dur,
        color
      };
    });
  }, [isHaldi]);

  const cloudGradient = isHaldi
    ? 'radial-gradient(circle, rgba(254, 240, 138, 0.95) 0%, rgba(250, 204, 21, 0.82) 40%, rgba(202, 138, 4, 0.45) 70%, transparent 95%)'
    : 'radial-gradient(circle, rgba(254, 205, 211, 0.95) 0%, rgba(239, 68, 68, 0.88) 40%, rgba(185, 28, 28, 0.55) 70%, transparent 95%)';

  const glowShadow = isHaldi
    ? 'drop-shadow(0 0 16px rgba(250, 204, 21, 0.75))'
    : 'drop-shadow(0 0 16px rgba(220, 38, 38, 0.75))';

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ filter: glowShadow }}
    >
      {/* 1. Core expanding puff cloud */}
      <div
        className="w-36 h-36 rounded-full animate-powder-cloud"
        style={{
          background: cloudGradient
        }}
      />

      {/* 2. Secondary billow (left-upper) */}
      <div
        className="absolute -top-4 -left-6 w-28 h-28 rounded-full animate-powder-cloud"
        style={{
          background: cloudGradient,
          animationDelay: '0.04s'
        }}
      />

      {/* 3. Secondary billow (right-upper) */}
      <div
        className="absolute -top-6 left-4 w-32 h-32 rounded-full animate-powder-cloud"
        style={{
          background: cloudGradient,
          animationDelay: '0.06s'
        }}
      />

      {/* 4. Fine powder particles radiating outward */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full animate-powder-particle"
            style={
              {
                '--p-x': `${p.px}px`,
                '--p-y': `${p.py}px`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                boxShadow: `0 0 6px ${p.color}`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.dur}s`
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* 5. Auspicious Floating Title Tag */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap animate-powder-cloud">
        <span
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider font-devanagari-serif shadow-md border ${
            isHaldi
              ? 'bg-[#FEF08A] text-[#854D0E] border-[#EAB308]'
              : 'bg-[#FECDD3] text-[#991B1B] border-[#EF4444]'
          }`}
        >
          {isHaldi ? '✨ पिवळा हळदीचा झोत (Yellow Haldi)' : '✨ लाल कुंकवाचा झोत (Vermilion Kumkum)'}
        </span>
      </div>
    </div>
  );
};
