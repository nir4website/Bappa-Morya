import React from 'react';

export const BrassThaliPattern: React.FC = () => {
  // 64 fluted godron ribs around the outer border
  const flutes = Array.from({ length: 64 }, (_, i) => {
    const angle = (i * 360) / 64;
    return { id: i, angle };
  });

  // 36 sunburst rays around the central Om medallion
  const sunRays = Array.from({ length: 36 }, (_, i) => {
    const angle = (i * 360) / 36;
    const isLong = i % 2 === 0;
    const innerR = 40;
    const outerR = isLong ? 62 : 52;
    const rad = (angle * Math.PI) / 180;
    return {
      id: i,
      x1: +(150 + Math.cos(rad) * innerR).toFixed(2),
      y1: +(150 + Math.sin(rad) * innerR).toFixed(2),
      x2: +(150 + Math.cos(rad) * outerR).toFixed(2),
      y2: +(150 + Math.sin(rad) * outerR).toFixed(2),
      isLong
    };
  });

  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      <svg
        viewBox="0 0 300 300"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Authentic polished brass radial gradient */}
          <radialGradient id="brassBasePlate" cx="46%" cy="44%" r="54%">
            <stop offset="0%" stopColor="#FFFCE8" />
            <stop offset="12%" stopColor="#FFF0A0" />
            <stop offset="26%" stopColor="#F5D061" />
            <stop offset="48%" stopColor="#D4AF37" />
            <stop offset="72%" stopColor="#B38728" />
            <stop offset="88%" stopColor="#875E14" />
            <stop offset="100%" stopColor="#543805" />
          </radialGradient>

          {/* Golden metallic gradient for embossed text & rays */}
          <linearGradient id="brassGoldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFAD1" />
            <stop offset="35%" stopColor="#F5CE58" />
            <stop offset="70%" stopColor="#B8861B" />
            <stop offset="100%" stopColor="#664606" />
          </linearGradient>

          {/* Reverse gradient for engraved depth */}
          <linearGradient id="brassEngravedShadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4A3104" />
            <stop offset="100%" stopColor="#A87B1C" />
          </linearGradient>

          {/* Circular path for the engraved Vedic Gayatri Mantra */}
          {/* Radius = 84px, centered at 150, 150 */}
          <path
            id="gayatriMantraCircle"
            d="M 150, 150 m -84, 0 a 84,84 0 1,1 168,0 a 84,84 0 1,1 -168,0"
            fill="none"
          />
        </defs>

        {/* 1. Deep Brass Plate Basin Base */}
        <circle cx="150" cy="150" r="148" fill="url(#brassBasePlate)" />

        {/* 2. Outer Fluted Godron Border (खाचांची नक्षी / Sunburst Flutes) */}
        <g opacity="0.82">
          {flutes.map((f) => {
            const rad = (f.angle * Math.PI) / 180;
            const x1 = 150 + Math.cos(rad) * 114;
            const y1 = 150 + Math.sin(rad) * 114;
            const x2 = 150 + Math.cos(rad) * 144;
            const y2 = 150 + Math.sin(rad) * 144;

            return (
              <g key={f.id}>
                {/* Dark groove shadow */}
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#573A05"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />
                {/* Bright metallic brass highlight right next to groove */}
                <line
                  x1={x1 - 0.7}
                  y1={y1 - 0.7}
                  x2={x2 - 0.7}
                  y2={y2 - 0.7}
                  stroke="#FFF6BE"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </g>
            );
          })}
        </g>

        {/* 3. Outer Scalloped Beaded Pearl Rim */}
        <circle
          cx="150"
          cy="150"
          r="144"
          fill="none"
          stroke="#5C3E07"
          strokeWidth="1.5"
        />
        <circle
          cx="150"
          cy="150"
          r="143"
          fill="none"
          stroke="#FFF2A3"
          strokeWidth="1.2"
          strokeDasharray="2.5 3"
        />

        {/* 4. Concentric Embossed Brass Ridge Rings separating fluted rim and body */}
        <circle
          cx="150"
          cy="150"
          r="114"
          fill="none"
          stroke="#523604"
          strokeWidth="2.2"
        />
        <circle
          cx="150"
          cy="150"
          r="113"
          fill="none"
          stroke="#FFF9CB"
          strokeWidth="1.4"
        />
        <circle
          cx="150"
          cy="150"
          r="110"
          fill="none"
          stroke="#8A5F12"
          strokeWidth="1"
        />

        {/* 5. Circular Engraved Sacred Gayatri Mantra */}
        {/* Embossed Chiseled Shadow Layer */}
        <text
          fill="#4A3104"
          fontSize="9.4"
          fontFamily="'Noto Serif Devanagari', serif"
          fontWeight="bold"
          letterSpacing="1.3"
          dy="0.8"
          opacity="0.9"
        >
          <textPath href="#gayatriMantraCircle" startOffset="50%" textAnchor="middle">
            ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्
          </textPath>
        </text>

        {/* Embossed Bright Brass Top Highlight */}
        <text
          fill="#FFFDD0"
          fontSize="9.4"
          fontFamily="'Noto Serif Devanagari', serif"
          fontWeight="bold"
          letterSpacing="1.3"
          dy="-0.7"
          opacity="0.95"
        >
          <textPath href="#gayatriMantraCircle" startOffset="50%" textAnchor="middle">
            ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्
          </textPath>
        </text>

        {/* Main Golden Brass Mantra Text */}
        <text
          fill="url(#brassGoldMetallic)"
          fontSize="9.4"
          fontFamily="'Noto Serif Devanagari', serif"
          fontWeight="bold"
          letterSpacing="1.3"
        >
          <textPath href="#gayatriMantraCircle" startOffset="50%" textAnchor="middle">
            ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्
          </textPath>
        </text>

        {/* 6. Inner Concentric Embossed Brass Rings enclosing the Sunburst */}
        <circle
          cx="150"
          cy="150"
          r="68"
          fill="none"
          stroke="#5C3E07"
          strokeWidth="1.8"
        />
        <circle
          cx="150"
          cy="150"
          r="67"
          fill="none"
          stroke="#FFF6BF"
          strokeWidth="1.2"
        />
        <circle
          cx="150"
          cy="150"
          r="64"
          fill="none"
          stroke="#8A5F12"
          strokeWidth="1"
          strokeDasharray="1.5 2.5"
        />

        {/* 7. Radiating Golden Sunburst Rays (सूर्यकिरण) */}
        <g opacity="0.88">
          {sunRays.map((r) => (
            <g key={r.id}>
              {/* Sunbeam shadow line */}
              <line
                x1={r.x1}
                y1={r.y1}
                x2={r.x2}
                y2={r.y2}
                stroke="#543703"
                strokeWidth={r.isLong ? '2.4' : '1.8'}
                strokeLinecap="round"
              />
              {/* Sunbeam golden brass highlight */}
              <line
                x1={r.x1 - 0.5}
                y1={r.y1 - 0.5}
                x2={r.x2 - 0.5}
                y2={r.y2 - 0.5}
                stroke="#FFF4AC"
                strokeWidth={r.isLong ? '1.5' : '1.1'}
                strokeLinecap="round"
              />
            </g>
          ))}
        </g>

        {/* 8. Center Medallion Inner Ring */}
        <circle
          cx="150"
          cy="150"
          r="38"
          fill="none"
          stroke="#573905"
          strokeWidth="2.2"
        />
        <circle
          cx="150"
          cy="150"
          r="37"
          fill="none"
          stroke="#FFF7C6"
          strokeWidth="1.4"
        />

        {/* 9. Center Embossed Sacred ॐ (Aum) */}
        {/* Deep drop-shadow for 3D brass relief */}
        <text
          x="150"
          y="162"
          textAnchor="middle"
          fontSize="33"
          fontFamily="'Noto Serif Devanagari', 'Yatra One', serif"
          fontWeight="900"
          fill="#482F03"
          opacity="0.9"
        >
          ॐ
        </text>
        {/* Sharp specular top highlight */}
        <text
          x="150"
          y="160.2"
          textAnchor="middle"
          fontSize="33"
          fontFamily="'Noto Serif Devanagari', 'Yatra One', serif"
          fontWeight="900"
          fill="#FFFDE2"
          opacity="0.98"
        >
          ॐ
        </text>
        {/* Front brass metallic body */}
        <text
          x="150"
          y="161"
          textAnchor="middle"
          fontSize="33"
          fontFamily="'Noto Serif Devanagari', 'Yatra One', serif"
          fontWeight="900"
          fill="url(#brassGoldMetallic)"
        >
          ॐ
        </text>
      </svg>
    </div>
  );
};
