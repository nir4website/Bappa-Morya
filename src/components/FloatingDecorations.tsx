import React, { useState } from 'react';
import { playTempleBell } from '../utils/audioSynth.ts';
import { triggerRedHibiscusShower } from '../utils/flowerShower.ts';
import { BrassTempleBell, BrassPanti, RedHibiscus } from './FestiveIcons.tsx';
import { RangoliPattern } from './RangoliPattern.tsx';

interface FloatingDecorationsProps {
  onShowToast?: (msg: string) => void;
}

export const FloatingDecorations: React.FC<FloatingDecorationsProps> = ({ onShowToast }) => {
  const [leftRinging, setLeftRinging] = useState(false);
  const [rightRinging, setRightRinging] = useState(false);

  const handleBellRing = (side: 'left' | 'right') => {
    playTempleBell(840, 0.85);
    if (side === 'left') {
      setLeftRinging(true);
      setTimeout(() => setLeftRinging(false), 1200);
    } else {
      setRightRinging(true);
      setTimeout(() => setRightRinging(false), 1200);
    }

    if (onShowToast) {
      onShowToast(`🔔 Temple Bell (टण...) — ${side === 'left' ? 'Jai Ganesh' : 'Mangal Moorti Morya'}!`);
    }
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden" aria-hidden="true">
      {/* Subtle Corner Rangoli Patterns */}
      <div className="absolute -top-10 -left-10 opacity-25 pointer-events-none">
        <RangoliPattern variant="corner" size={160} />
      </div>
      <div className="absolute -top-10 -right-10 opacity-25 pointer-events-none rotate-90">
        <RangoliPattern variant="corner" size={160} />
      </div>

      {/* Top Left Hanging Brass Temple Bell */}
      <div
        onClick={() => handleBellRing('left')}
        title="Tap to ring temple bell"
        className="pointer-events-auto absolute top-14 left-2 sm:left-7 cursor-pointer flex flex-col items-center animate-bell-gentle transition-transform duration-300 hover:scale-110 group"
      >
        <BrassTempleBell size={42} isRinging={leftRinging} />
        <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-14 bg-[#72370F]/95 text-[#FFFDD0] text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded border border-[#D4AF37] whitespace-nowrap shadow-md">
          🔔 Ring Bell (टण...)
        </span>
      </div>

      {/* Top Right Hanging Brass Temple Bell */}
      <div
        onClick={() => handleBellRing('right')}
        title="Tap to ring temple bell"
        className="pointer-events-auto absolute top-14 right-2 sm:right-7 cursor-pointer flex flex-col items-center animate-bell-gentle transition-transform duration-300 hover:scale-110 group"
        style={{ animationDelay: '2s' }}
      >
        <BrassTempleBell size={42} isRinging={rightRinging} />
        <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-14 bg-[#72370F]/95 text-[#FFFDD0] text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded border border-[#D4AF37] whitespace-nowrap shadow-md">
          🔔 Ring Bell (टण...)
        </span>
      </div>

      {/* Traditional Floating Brass Pantis */}
      {/* Mid Left Panti */}
      <div className="absolute top-[36%] left-2 sm:left-6 animate-slow-float opacity-90">
        <BrassPanti size={38} showFlame={true} />
      </div>

      {/* Mid Right Panti */}
      <div className="absolute top-[48%] right-2 sm:right-6 animate-slow-float-rev opacity-90">
        <BrassPanti size={38} showFlame={true} />
      </div>

      {/* Lower Left Panti (Desktop) */}
      <div className="hidden lg:block absolute top-[74%] left-6 animate-slow-float opacity-85">
        <BrassPanti size={34} showFlame={true} />
      </div>

      {/* Lower Right Panti (Desktop) */}
      <div className="hidden lg:block absolute top-[82%] right-6 animate-slow-float-rev opacity-85">
        <BrassPanti size={34} showFlame={true} />
      </div>

      {/* Sacred Floating Red Hibiscus Flowers */}
      <div
        onClick={() => {
          triggerRedHibiscusShower(28);
          if (onShowToast) onShowToast('🌺 Sacred Red Hibiscus Flower Shower (जास्वंद पुष्पवृष्टी) — Bappa Morya!');
        }}
        title="Tap for Red Hibiscus Flower Shower (जास्वंद पुष्पवृष्टी)"
        className="pointer-events-auto absolute top-[26%] right-[10%] animate-slow-float opacity-85 hover:opacity-100 hidden md:block cursor-pointer transition-transform hover:scale-135 active:scale-95 group"
      >
        <RedHibiscus size={32} />
        <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-7 -left-10 bg-[#8B0000]/95 text-[#FFFDD0] text-[10px] font-bold tracking-wide px-2 py-0.5 rounded border border-[#FFD700] whitespace-nowrap shadow-md pointer-events-none">
          🌺 पुष्पवृष्टी
        </span>
      </div>

      <div
        onClick={() => {
          triggerRedHibiscusShower(28);
          if (onShowToast) onShowToast('🌺 Sacred Red Hibiscus Flower Shower (जास्वंद पुष्पवृष्टी) — Bappa Morya!');
        }}
        title="Tap for Red Hibiscus Flower Shower (जास्वंद पुष्पवृष्टी)"
        className="pointer-events-auto absolute top-[65%] left-[8%] animate-slow-float-rev opacity-80 hover:opacity-100 hidden md:block cursor-pointer transition-transform hover:scale-135 active:scale-95 group"
      >
        <RedHibiscus size={30} />
        <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-7 -left-10 bg-[#8B0000]/95 text-[#FFFDD0] text-[10px] font-bold tracking-wide px-2 py-0.5 rounded border border-[#FFD700] whitespace-nowrap shadow-md pointer-events-none">
          🌺 पुष्पवृष्टी
        </span>
      </div>

      {/* Auspicious golden shimmer sparkles */}
      <div className="absolute top-[22%] left-[16%] w-1.5 h-1.5 rounded-full bg-[#FFD700] opacity-40 animate-pulse" />
      <div className="absolute top-[60%] left-[82%] w-2 h-2 rounded-full bg-[#FFD700] opacity-40 animate-pulse" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-[88%] left-[28%] w-1.5 h-1.5 rounded-full bg-[#FFFDD0] opacity-35 animate-pulse" style={{ animationDelay: '0.9s' }} />
    </div>
  );
};
