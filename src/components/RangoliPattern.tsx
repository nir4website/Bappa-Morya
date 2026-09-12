import React from 'react';

interface RangoliPatternProps {
  variant?: 'lotus' | 'diya' | 'kolam' | 'corner' | 'mandala';
  size?: number | string;
  className?: string;
  opacity?: number;
  animated?: boolean;
}

/**
 * Culturally authentic Animated Rangoli Patterns
 * Designed using sacred geometry (Ashtadala Padma, Kolam loops, Diya points, rice powder dots)
 * Non-intrusive, subtle festive ambiance with prefers-reduced-motion support.
 */
export const RangoliPattern: React.FC<RangoliPatternProps> = ({
  variant = 'lotus',
  size = 200,
  className = '',
  opacity = 0.25,
  animated = true,
}) => {
  const animClass = animated ? 'animate-rangoli-spin-slow' : '';
  const revAnimClass = animated ? 'animate-rangoli-spin-reverse' : '';
  const pulseClass = animated ? 'animate-rangoli-pulse' : '';

  if (variant === 'corner') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`pointer-events-none select-none ${pulseClass} ${className}`}
        style={{ opacity }}
        aria-hidden="true"
      >
        {/* Quarter Rangoli Corner Motif */}
        <circle cx="0" cy="0" r="95" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="3 3" />
        <circle cx="0" cy="0" r="85" stroke="#FFD700" strokeWidth="1" />
        <circle cx="0" cy="0" r="70" stroke="#FFFDD0" strokeWidth="0.75" strokeDasharray="2 2" />
        <circle cx="0" cy="0" r="55" stroke="#E35D25" strokeWidth="1.2" />
        <circle cx="0" cy="0" r="35" stroke="#FFD700" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="15" fill="#D4AF37" fillOpacity="0.4" stroke="#FFFDD0" strokeWidth="0.8" />

        {/* Radiating Petals */}
        {[0, 15, 30, 45, 60, 75, 90].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x1 = Math.cos(rad) * 35;
          const y1 = Math.sin(rad) * 35;
          const x2 = Math.cos(rad) * 85;
          const y2 = Math.sin(rad) * 85;
          const dotX = Math.cos(rad) * 92;
          const dotY = Math.sin(rad) * 92;

          return (
            <g key={deg}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D4AF37" strokeWidth="0.75" />
              <circle cx={dotX} cy={dotY} r="2" fill="#FFD700" />
            </g>
          );
        })}

        {/* Scalloped Lace Edges */}
        <path
          d="M 0,55 Q 15,50 25,35 Q 35,25 50,15 Q 55,0 55,0"
          stroke="#FFFDD0"
          strokeWidth="0.8"
          fill="none"
        />
        <path
          d="M 0,70 Q 20,65 35,45 Q 45,35 65,20 Q 70,0 70,0"
          stroke="#FFD700"
          strokeWidth="0.8"
          fill="none"
        />
      </svg>
    );
  }

  if (variant === 'diya') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`pointer-events-none select-none ${animClass} ${className}`}
        style={{ opacity }}
        aria-hidden="true"
      >
        {/* Outer Sacred Ring with 8 Diya rays */}
        <circle cx="100" cy="100" r="92" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="100" cy="100" r="82" stroke="#FFD700" strokeWidth="1.2" />
        <circle cx="100" cy="100" r="64" stroke="#E35D25" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="42" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="100" cy="100" r="22" fill="#FFD700" fillOpacity="0.2" stroke="#FFD700" strokeWidth="1.5" />

        {/* 8-Directional Diya Flames */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <g key={deg} transform={`rotate(${deg} 100 100)`}>
            {/* Diya base curve */}
            <path
              d="M 92,28 Q 100,20 108,28 Q 104,36 96,36 Z"
              fill="#D4AF37"
              stroke="#FFFDD0"
              strokeWidth="0.75"
            />
            {/* Flickering Flame tip */}
            <path
              d="M 100,10 Q 104,18 100,24 Q 96,18 100,10 Z"
              fill="#FFD700"
              stroke="#E35D25"
              strokeWidth="0.5"
            />
            {/* Radiating floral spire */}
            <line x1="100" y1="42" x2="100" y2="64" stroke="#FFD700" strokeWidth="1" />
            <circle cx="100" cy="74" r="2.5" fill="#FFFDD0" />
            {/* Petal arcs */}
            <path
              d="M 85,64 Q 100,50 115,64"
              stroke="#D4AF37"
              strokeWidth="1"
              fill="none"
            />
          </g>
        ))}

        {/* Center Om / Auspicious Core */}
        <circle cx="100" cy="100" r="8" fill="#E35D25" stroke="#FFD700" strokeWidth="1" />
      </svg>
    );
  }

  if (variant === 'kolam') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`pointer-events-none select-none ${revAnimClass} ${className}`}
        style={{ opacity }}
        aria-hidden="true"
      >
        {/* Geometric Sikku Kolam / Sacred Swirls */}
        <circle cx="100" cy="100" r="88" stroke="#D4AF37" strokeWidth="1" />
        <circle cx="100" cy="100" r="76" stroke="#FFFDD0" strokeWidth="0.75" strokeDasharray="3 3" />
        <circle cx="100" cy="100" r="50" stroke="#FFD700" strokeWidth="1.2" />

        {/* Continuous Interlocking Kolam Loops */}
        <g stroke="#FFFDD0" strokeWidth="1.2" fill="none">
          <path d="M 100,25 C 130,25 175,70 175,100 C 175,130 130,175 100,175 C 70,175 25,130 25,100 C 25,70 70,25 100,25 Z" />
          <path d="M 45,45 C 90,20 110,20 155,45 C 180,90 180,110 155,155 C 110,180 90,180 45,155 C 20,110 20,90 45,45 Z" stroke="#FFD700" strokeWidth="1" />
        </g>

        {/* Sacred Rice Powder Grid Dots */}
        {[
          [100, 40], [100, 70], [100, 100], [100, 130], [100, 160],
          [40, 100], [70, 100], [130, 100], [160, 100],
          [60, 60], [140, 60], [60, 140], [140, 140],
          [80, 80], [120, 80], [80, 120], [120, 120]
        ].map(([cx, cy], idx) => (
          <circle key={idx} cx={cx} cy={cy} r="2.2" fill="#FFD700" />
        ))}
      </svg>
    );
  }

  // Default: Ashtadala Padma Lotus Mandala (अष्टदल पद्म रांगोळी)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${animClass} ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Outer Sacred Boundary with 16 Beads */}
      <circle cx="100" cy="100" r="95" stroke="#D4AF37" strokeWidth="0.75" strokeDasharray="3 3" />
      <circle cx="100" cy="100" r="88" stroke="#FFD700" strokeWidth="1.2" />
      <circle cx="100" cy="100" r="82" stroke="#FFFDD0" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="62" stroke="#E35D25" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="44" stroke="#D4AF37" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="100" cy="100" r="28" fill="#D4AF37" fillOpacity="0.15" stroke="#FFD700" strokeWidth="1.2" />

      {/* 8 Lotus Petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 100 100)`}>
          {/* Main Petal */}
          <path
            d="M 100,28 C 114,48 116,68 100,82 C 84,68 86,48 100,28 Z"
            fill="#D4AF37"
            fillOpacity="0.12"
            stroke="#FFD700"
            strokeWidth="1.2"
          />
          {/* Inner Petal Vein */}
          <line x1="100" y1="32" x2="100" y2="78" stroke="#FFFDD0" strokeWidth="0.8" strokeDasharray="2 2" />
          
          {/* Outer Lace Crest */}
          <path
            d="M 88,40 Q 100,18 112,40"
            stroke="#FFFDD0"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="100" cy="14" r="2" fill="#FFD700" />
        </g>
      ))}

      {/* Outer 16 decorative dots */}
      {[...Array(16)].map((_, i) => {
        const rad = (i * 22.5 * Math.PI) / 180;
        const cx = 100 + Math.cos(rad) * 91;
        const cy = 100 + Math.sin(rad) * 91;
        return <circle key={i} cx={cx} cy={cy} r="1.5" fill="#FFFDD0" />;
      })}

      {/* Center Sacred Core (Sun Bindu) */}
      <circle cx="100" cy="100" r="10" fill="#E35D25" stroke="#FFD700" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="4" fill="#FFD700" />
    </svg>
  );
};
