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

/**
 * Traditional Brass Standing Pooja Bell with Clapper for Thali (ताटातील पितळी पूजा घंटी)
 * Styled identical to the main Handheld Pooja Bell with ringing animation & clapper
 */
export const PoojaBellStanding: React.FC<{
  size?: number;
  isRinging?: boolean;
  className?: string;
}> = ({ size = 40, isRinging = false, className = '' }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-110 select-none ${
        isRinging ? 'animate-bell-continuous' : ''
      } ${className}`}
      style={{ width: size, height: size * 1.05, transformOrigin: 'top center' }}
      title="घरगुती पूजा घंटी (House Puja Bell) - अखंड घंटानाद"
    >
      {/* Radiating Soundwave Ripples when Continuously Ringing */}
      {isRinging && (
        <>
          <span className="absolute -inset-1.5 rounded-full border-2 border-[#FFD700]/70 animate-soundwave pointer-events-none" />
          <span className="absolute -inset-3.5 rounded-full border border-[#FFE87C]/50 animate-soundwave [animation-delay:0.2s] pointer-events-none" />
        </>
      )}

      <svg
        width={size}
        height={size * 1.05}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={isRinging ? 'drop-shadow-[0_0_12px_rgba(255,215,0,0.95)]' : 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]'}
        aria-label="Handheld Pooja Ghanti"
      >
        <defs>
          <linearGradient id="poojaBrassStanding" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B4513" />
            <stop offset="35%" stopColor="#FFD700" />
            <stop offset="70%" stopColor="#FFE87C" />
            <stop offset="100%" stopColor="#72370F" />
          </linearGradient>
        </defs>

        {/* Handle with Garuda/Nandi finial top */}
        <path
          d="M 16,3 C 14.5,3 14.5,6 16,6 C 17.5,6 17.5,3 16,3 Z"
          fill="url(#poojaBrassStanding)"
          stroke="#FFD700"
          strokeWidth="0.5"
        />
        <line
          x1="16"
          y1="6"
          x2="16"
          y2="16"
          stroke="url(#poojaBrassStanding)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="16" cy="11" r="2" fill="#D4AF37" />

        {/* Bell Cup */}
        <path
          d="M 12,16 C 12,16 9,21 7,26 C 6.5,27 8,28 16,28 C 24,28 25.5,27 25,26 C 23,21 20,16 20,16 Z"
          fill="url(#poojaBrassStanding)"
          stroke="#FFD700"
          strokeWidth="0.8"
        />
        <ellipse
          cx="16"
          cy="27"
          rx="8"
          ry="1.5"
          fill="url(#poojaBrassStanding)"
          stroke="#FFD700"
          strokeWidth="0.5"
        />

        {/* Clapper */}
        <g className={isRinging ? 'animate-clapper-continuous' : ''} style={{ transformOrigin: '16px 27px' }}>
          <circle cx="16" cy="29" r="1.5" fill="#FFE87C" stroke="#5D2B0D" strokeWidth="0.5" />
        </g>
      </svg>
    </div>
  );
};

/**
 * Traditional Indian Haldi, Kumkum, and Shendur Boxes / Katori (हळद, कुंकू आणि शेंदूर वाटी)
 * 3-bowl brass organizer container with authentic turmeric yellow, sacred vermilion red,
 * and bright saffron-orange sindoor powders.
 */
export const HaldiKumkumShendurBoxes: React.FC<{
  size?: number;
  className?: string;
  onClick?: () => void;
}> = ({ size = 68, className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-108 active:scale-95 group select-none ${className}`}
      style={{ width: size, height: size * 0.95 }}
      title="Sacred Haldi, Kumkum & Shendur (हळद-कुंकू-शेंदूर) - Tap for Tilak"
    >
      <svg
        width={size}
        height={size * 0.95}
        viewBox="0 0 90 85"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="trayBrass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#72370F" />
            <stop offset="30%" stopColor="#D4AF37" />
            <stop offset="55%" stopColor="#FFE87C" />
            <stop offset="85%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#5D2B0D" />
          </linearGradient>
          {/* Haldi Yellow Glow */}
          <radialGradient id="haldiPowder" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#FFF275" />
            <stop offset="45%" stopColor="#FFD700" />
            <stop offset="85%" stopColor="#E6A100" />
            <stop offset="100%" stopColor="#B37400" />
          </radialGradient>
          {/* Kumkum Red Glow */}
          <radialGradient id="kumkumPowder" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#FF5252" />
            <stop offset="45%" stopColor="#D50000" />
            <stop offset="85%" stopColor="#8E0000" />
            <stop offset="100%" stopColor="#4A0000" />
          </radialGradient>
          {/* Shendur Orange Glow */}
          <radialGradient id="shendurPowder" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#FFAB40" />
            <stop offset="45%" stopColor="#FF6D00" />
            <stop offset="85%" stopColor="#D84315" />
            <stop offset="100%" stopColor="#871C00" />
          </radialGradient>
        </defs>

        {/* Brass Trefoil Connecting Base Plate with ornamental scallops */}
        <path
          d="M 45,18 C 55,18 64,28 66,38 C 76,40 84,49 83,60 C 82,71 72,78 61,77 C 53,83 37,83 29,77 C 18,78 8,71 7,60 C 6,49 14,40 24,38 C 26,28 35,18 45,18 Z"
          fill="url(#trayBrass)"
          stroke="#FFD700"
          strokeWidth="1.2"
          filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))"
        />

        {/* Center Brass Carrying Handle / Ring */}
        <circle cx="45" cy="48" r="8" fill="url(#trayBrass)" stroke="#FFD700" strokeWidth="1" />
        <circle cx="45" cy="48" r="4.5" fill="#3A1700" />
        <circle cx="45" cy="48" r="2" fill="#FFE87C" />

        {/* =========================================================
            BOWL 1 (Top Center): SHENDUR (शेंदूर - Orange Sindoor)
           ========================================================= */}
        <g>
          {/* Brass Katori Rim */}
          <circle cx="45" cy="27" r="16" fill="url(#trayBrass)" stroke="#FFE87C" strokeWidth="1.2" />
          <circle cx="45" cy="27" r="14" fill="#5D2B0D" />
          {/* Shendur Powder Mound */}
          <circle cx="45" cy="27" r="12.5" fill="url(#shendurPowder)" />
          {/* Powder Granule Highlights */}
          <circle cx="43" cy="25" r="1" fill="#FFE0B2" opacity="0.8" />
          <circle cx="47" cy="28" r="0.8" fill="#FFE0B2" opacity="0.8" />
          <circle cx="45" cy="24" r="0.8" fill="#FFF3E0" opacity="0.9" />
          {/* Auspicious Inscription / Label */}
          <text x="45" y="30" fontSize="7" fontWeight="bold" fill="#FFFDD0" textAnchor="middle" opacity="0.9" fontFamily="serif">
            शेंदूर
          </text>
        </g>

        {/* =========================================================
            BOWL 2 (Bottom Left): HALDI (हळद - Golden Turmeric)
           ========================================================= */}
        <g>
          {/* Brass Katori Rim */}
          <circle cx="25" cy="58" r="16" fill="url(#trayBrass)" stroke="#FFE87C" strokeWidth="1.2" />
          <circle cx="25" cy="58" r="14" fill="#5D2B0D" />
          {/* Haldi Powder Mound */}
          <circle cx="25" cy="58" r="12.5" fill="url(#haldiPowder)" />
          {/* Powder Granule Highlights */}
          <circle cx="23" cy="56" r="1" fill="#FFFDE7" opacity="0.8" />
          <circle cx="27" cy="59" r="0.8" fill="#FFFDE7" opacity="0.8" />
          <circle cx="25" cy="55" r="0.8" fill="#FFFFFF" opacity="0.9" />
          <text x="25" y="61" fontSize="7" fontWeight="bold" fill="#3E2723" textAnchor="middle" opacity="0.9" fontFamily="serif">
            हळद
          </text>
        </g>

        {/* =========================================================
            BOWL 3 (Bottom Right): KUMKUM (कुंकू - Sacred Vermilion)
           ========================================================= */}
        <g>
          {/* Brass Katori Rim */}
          <circle cx="65" cy="58" r="16" fill="url(#trayBrass)" stroke="#FFE87C" strokeWidth="1.2" />
          <circle cx="65" cy="58" r="14" fill="#5D2B0D" />
          {/* Kumkum Powder Mound */}
          <circle cx="65" cy="58" r="12.5" fill="url(#kumkumPowder)" />
          {/* Powder Granule Highlights */}
          <circle cx="63" cy="56" r="1" fill="#FFCDD2" opacity="0.8" />
          <circle cx="67" cy="59" r="0.8" fill="#FFCDD2" opacity="0.8" />
          <circle cx="65" cy="55" r="0.8" fill="#FFFFFF" opacity="0.9" />
          <text x="65" y="61" fontSize="7" fontWeight="bold" fill="#FFFDD0" textAnchor="middle" opacity="0.9" fontFamily="serif">
            कुंकू
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * Traditional Marigold Flower (झेंडूचे फूल - Zendu)
 * Auspicious layered golden-orange flower dear to Lord Ganesha
 */
export const MarigoldFlower: React.FC<{
  size?: number;
  className?: string;
  variant?: 'orange' | 'yellow';
}> = ({ size = 32, className = '', variant = 'orange' }) => {
  const isYellow = variant === 'yellow';
  const c1 = isYellow ? '#FFF59D' : '#FFE082';
  const c2 = isYellow ? '#FDD835' : '#FF9800';
  const c3 = isYellow ? '#F57F17' : '#E65100';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      aria-label="Marigold Flower"
    >
      <defs>
        <radialGradient id={`marigoldGrad-${variant}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={c1} />
          <stop offset="50%" stopColor={c2} />
          <stop offset="100%" stopColor={c3} />
        </radialGradient>
      </defs>

      {/* Outer Ruffled Petals Layer */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <path
          key={`outer-${deg}`}
          d="M 30,30 Q 30,6 23,10 Q 30,2 37,10 Q 30,6 30,30 Z"
          fill={`url(#marigoldGrad-${variant})`}
          stroke={c3}
          strokeWidth="0.4"
          transform={`rotate(${deg} 30 30)`}
        />
      ))}

      {/* Middle Ruffled Petals Layer */}
      {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((deg) => (
        <path
          key={`mid-${deg}`}
          d="M 30,30 Q 30,12 25,15 Q 30,9 35,15 Q 30,12 30,30 Z"
          fill={`url(#marigoldGrad-${variant})`}
          transform={`rotate(${deg} 30 30)`}
        />
      ))}

      {/* Inner Dense Petals Crown */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <path
          key={`in-${deg}`}
          d="M 30,30 Q 30,18 27,20 Q 30,16 33,20 Q 30,18 30,30 Z"
          fill={c1}
          transform={`rotate(${deg} 30 30)`}
        />
      ))}

      {/* Center Pistil Core */}
      <circle cx="30" cy="30" r="5" fill={c3} />
      <circle cx="30" cy="30" r="2.5" fill="#FFE082" />
    </svg>
  );
};

