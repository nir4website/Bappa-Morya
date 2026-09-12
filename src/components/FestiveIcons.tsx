import React from 'react';

/**
 * Traditional Brass Temple Bell (पारंपरिक पितळी मंदिर घंटा)
 * Intricate cast brass bell with heavy chain links, decorative rings, and swinging clapper
 */
export const BrassTempleBell: React.FC<{
  size?: number;
  className?: string;
  isRinging?: boolean;
}> = ({ size = 48, className = '', isRinging = false }) => {
  return (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="0 0 60 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${isRinging ? 'animate-bell-gentle' : ''} ${className}`}
      aria-label="Traditional Brass Temple Bell"
    >
      <defs>
        <linearGradient id="brassGradientLight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8B4513" />
          <stop offset="25%" stopColor="#D4AF37" />
          <stop offset="50%" stopColor="#FFE87C" />
          <stop offset="75%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#5D2B0D" />
        </linearGradient>
        <linearGradient id="brassChain" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#72370F" />
          <stop offset="50%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#5D2B0D" />
        </linearGradient>
        <radialGradient id="bellHighlight" cx="40%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#FFFDD0" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#FFD700" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#8B4513" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Top Chain Links */}
      <g stroke="url(#brassChain)" strokeWidth="2.5" fill="none">
        <ellipse cx="30" cy="5" rx="3.5" ry="4.5" />
        <ellipse cx="30" cy="11" rx="3.5" ry="4.5" />
      </g>
      {/* Top Finial / Dome mount */}
      <circle cx="30" cy="16" r="3.5" fill="url(#brassGradientLight)" stroke="#FFD700" strokeWidth="0.8" />

      {/* Bell Main Body with authentic flaring skirt */}
      <path
        d="M 23,19 C 23,19 14,34 10,50 C 8,57 6,61 6,63 C 6,65 14,66 30,66 C 46,66 54,65 54,63 C 54,61 52,57 50,50 C 46,34 37,19 37,19 Z"
        fill="url(#brassGradientLight)"
        stroke="#FFD700"
        strokeWidth="1.2"
      />

      {/* Shading / Reflection Overlay */}
      <path
        d="M 23,19 C 23,19 14,34 10,50 C 8,57 6,61 6,63 C 6,65 14,66 30,66 C 46,66 54,65 54,63 C 54,61 52,57 50,50 C 46,34 37,19 37,19 Z"
        fill="url(#bellHighlight)"
      />

      {/* Engraved Sacred Bands */}
      <path d="M 18,32 C 22,34 38,34 42,32" stroke="#5D2B0D" strokeWidth="1" fill="none" />
      <path d="M 14,44 C 20,46.5 40,46.5 46,44" stroke="#5D2B0D" strokeWidth="1" fill="none" />
      <path d="M 11,54 C 18,57 42,57 49,54" stroke="#FFE87C" strokeWidth="1" fill="none" />

      {/* Sacred Decorative Dots */}
      <circle cx="24" cy="38" r="1" fill="#FFFDD0" />
      <circle cx="30" cy="39" r="1.2" fill="#FFFDD0" />
      <circle cx="36" cy="38" r="1" fill="#FFFDD0" />

      {/* Cast Bottom Lip / Rim */}
      <ellipse cx="30" cy="63" rx="24" ry="4.5" fill="url(#brassGradientLight)" stroke="#FFD700" strokeWidth="1.2" />
      <ellipse cx="30" cy="64" rx="21" ry="3" fill="#3E1A04" />

      {/* Clapper / Tongue (लोलक) */}
      <g className={isRinging ? 'animate-pulse' : ''}>
        <line x1="30" y1="58" x2="30" y2="72" stroke="#5D2B0D" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="30" cy="72" r="4" fill="url(#brassGradientLight)" stroke="#FFD700" strokeWidth="1" />
      </g>
    </svg>
  );
};

/**
 * Traditional Brass Panti / Diya (पारंपरिक पितळी पणती)
 * Cast brass oil lamp with pointed wick spout, floral rim, ornamental handle and ghee flame
 */
export const BrassPanti: React.FC<{
  size?: number;
  className?: string;
  showFlame?: boolean;
}> = ({ size = 44, className = '', showFlame = true }) => {
  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`} style={{ width: size, height: size * 0.9 }}>
      {/* Glowing Warm Radiance */}
      {showFlame && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-radial from-[#FFD700]/70 via-[#E35D25]/40 to-transparent blur-[6px] pointer-events-none"
        />
      )}

      <svg
        width={size}
        height={size * 0.85}
        viewBox="0 0 54 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pantiBrass" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#72370F" />
            <stop offset="25%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#FFE87C" />
            <stop offset="80%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#5D2B0D" />
          </linearGradient>
          <linearGradient id="flameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#E35D25" />
            <stop offset="35%" stopColor="#FFA500" />
            <stop offset="75%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FFFFEE" />
          </linearGradient>
        </defs>

        {/* Flickering Flame & Cotton Wick */}
        {showFlame && (
          <g className="animate-flame origin-bottom">
            {/* Cotton Wick tip */}
            <line x1="27" y1="20" x2="27" y2="15" stroke="#3E1A04" strokeWidth="1.5" strokeLinecap="round" />
            {/* Outer Flame */}
            <path
              d="M 27,2 C 32,8 34,14 30,19 C 28,21 26,21 24,19 C 20,14 22,8 27,2 Z"
              fill="url(#flameGrad)"
              filter="drop-shadow(0 0 4px #FFD700)"
            />
            {/* Inner Core Flame */}
            <path
              d="M 27,6 C 29.5,10 30,13 28.5,16 C 27.5,17 26.5,17 25.5,16 C 24,13 24.5,10 27,6 Z"
              fill="#FFFFFF"
              opacity="0.9"
            />
          </g>
        )}

        {/* Brass Diya Spout & Rim */}
        <path
          d="M 6,24 C 6,24 16,21 27,21 C 38,21 48,24 48,24 C 52,25 50,28 44,30 C 37,33 27,33 27,33 C 27,33 17,33 10,30 C 4,28 2,25 6,24 Z"
          fill="url(#pantiBrass)"
          stroke="#FFD700"
          strokeWidth="0.8"
        />

        {/* Oil Basin Top View */}
        <ellipse cx="27" cy="25" rx="19" ry="4" fill="#5D2B0D" stroke="#FFE87C" strokeWidth="0.6" />
        <ellipse cx="27" cy="25.5" rx="16" ry="2.5" fill="#8B4513" />

        {/* Brass Panti Pedestal / Bowl Base with Petal engraving */}
        <path
          d="M 12,27 C 14,35 20,40 27,40 C 34,40 40,35 42,27 C 38,32 32,34 27,34 C 22,34 16,32 12,27 Z"
          fill="url(#pantiBrass)"
          stroke="#FFD700"
          strokeWidth="0.8"
        />

        {/* Decorative Lotus Foot Base */}
        <path
          d="M 20,39 C 20,39 22,43 27,43 C 32,43 34,39 34,39 Z"
          fill="url(#pantiBrass)"
          stroke="#D4AF37"
          strokeWidth="0.6"
        />

        {/* Traditional Ornamental Tail Handle (काकडा/मूठ) on Left */}
        <path
          d="M 8,25 C 2,22 1,18 4,16 C 6,15 8,17 7,20 C 6.5,21.5 7,23 8,25 Z"
          fill="url(#pantiBrass)"
          stroke="#FFD700"
          strokeWidth="0.6"
        />
      </svg>
    </div>
  );
};

/**
 * Sacred Red Hibiscus Flower (जास्वंद - Jaswand)
 * Lord Ganesha's favorite flower with 5 scarlet-crimson petals and golden pollen stamen
 */
export const RedHibiscus: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 36, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      aria-label="Red Hibiscus Flower (Jaswand)"
    >
      <defs>
        <radialGradient id="hibiscusPetal" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF1E27" />
          <stop offset="70%" stopColor="#C4001A" />
          <stop offset="100%" stopColor="#7E0010" />
        </radialGradient>
        <radialGradient id="hibiscusCenter" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#500008" />
          <stop offset="60%" stopColor="#960018" />
          <stop offset="100%" stopColor="#C4001A" />
        </radialGradient>
        <linearGradient id="stamenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF1E27" />
          <stop offset="60%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FFFDD0" />
        </linearGradient>
      </defs>

      {/* 5 Petals arranged at 72 degree intervals */}
      {[0, 72, 144, 216, 288].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 50 50)`}>
          {/* Main Petal with ruffled organic edge */}
          <path
            d="M 50,50 C 35,38 25,20 40,8 C 50,0 60,8 65,18 C 72,30 60,42 50,50 Z"
            fill="url(#hibiscusPetal)"
            stroke="#960018"
            strokeWidth="0.8"
          />
          {/* Delicate Petal Vein Textures */}
          <path
            d="M 50,44 Q 48,25 48,12"
            stroke="#FF6B7A"
            strokeWidth="0.8"
            opacity="0.6"
            fill="none"
          />
          <path
            d="M 50,44 Q 54,28 58,16"
            stroke="#FF6B7A"
            strokeWidth="0.6"
            opacity="0.5"
            fill="none"
          />
        </g>
      ))}

      {/* Deep Crimson Velvet Center Eye */}
      <circle cx="50" cy="50" r="14" fill="url(#hibiscusCenter)" />

      {/* Prominent Long Style & Stamen Column (पुंकेसर) curving upwards */}
      <path
        d="M 50,50 Q 56,36 68,22"
        stroke="url(#stamenGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 50,50 Q 56,36 68,22"
        stroke="#FF1E27"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Golden Yellow Pollen Anthers along the Stamen Column */}
      {[
        [60, 32], [63, 29], [66, 26], [68, 22], [58, 36], [62, 34]
      ].map(([x, y], idx) => (
        <circle
          key={idx}
          cx={x + (idx % 2 === 0 ? 1.5 : -1.5)}
          cy={y}
          r="1.8"
          fill="#FFD700"
          stroke="#FFE87C"
          strokeWidth="0.5"
        />
      ))}

      {/* 5-Lobed Stigma at the very tip */}
      <circle cx="69" cy="20" r="2" fill="#8B0000" stroke="#FFD700" strokeWidth="0.6" />
      <circle cx="71" cy="21" r="1.5" fill="#8B0000" />
      <circle cx="68" cy="18" r="1.5" fill="#8B0000" />
    </svg>
  );
};

/**
 * Handheld Pooja Bell Icon (घरगुती पूजा घंटी)
 */
export const HandheldPoojaBellIcon: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 28, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Handheld Pooja Ghanti"
    >
      <defs>
        <linearGradient id="poojaBrass" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8B4513" />
          <stop offset="35%" stopColor="#FFD700" />
          <stop offset="70%" stopColor="#FFE87C" />
          <stop offset="100%" stopColor="#72370F" />
        </linearGradient>
      </defs>
      {/* Handle with Garuda/Nandi finial top */}
      <path d="M 16,3 C 14.5,3 14.5,6 16,6 C 17.5,6 17.5,3 16,3 Z" fill="url(#poojaBrass)" stroke="#FFD700" strokeWidth="0.5" />
      <line x1="16" y1="6" x2="16" y2="16" stroke="url(#poojaBrass)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="16" cy="11" r="2" fill="#D4AF37" />
      
      {/* Bell Cup */}
      <path
        d="M 12,16 C 12,16 9,21 7,26 C 6.5,27 8,28 16,28 C 24,28 25.5,27 25,26 C 23,21 20,16 20,16 Z"
        fill="url(#poojaBrass)"
        stroke="#FFD700"
        strokeWidth="0.8"
      />
      <ellipse cx="16" cy="27" rx="8" ry="1.5" fill="url(#poojaBrass)" stroke="#FFD700" strokeWidth="0.5" />
      {/* Clapper */}
      <circle cx="16" cy="29" r="1.5" fill="#FFE87C" stroke="#5D2B0D" strokeWidth="0.5" />
    </svg>
  );
};
