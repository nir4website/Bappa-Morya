import React, { useState } from 'react';
import { Sparkles, Eye, Compass, ShieldCheck, Check, ChevronLeft, ChevronRight, Image as ImageIcon, Bell } from 'lucide-react';
import { HERO_CHOICES, HeroImageChoice } from '../data/templesData.ts';
import { playTempleBell, playBhajanTaal } from '../utils/audioSynth.ts';
import { triggerRedHibiscusShower } from '../utils/flowerShower.ts';
import { RedHibiscus } from './FestiveIcons.tsx';
import { RangoliPattern } from './RangoliPattern.tsx';

interface HeroProps {
  onShowToast: (msg: string) => void;
  onOpenLightbox?: (imgUrl: string, title: string, subtitle: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onShowToast, onOpenLightbox }) => {
  const [selectedHeroIndex, setSelectedHeroIndex] = useState<number>(0);
  const currentHero: HeroImageChoice = HERO_CHOICES[selectedHeroIndex] || HERO_CHOICES[0];

  const handleSelectChoice = (index: number) => {
    setSelectedHeroIndex(index);
    playTempleBell(784, 0.65);
    const chosen = HERO_CHOICES[index];
    if (chosen) {
      onShowToast(`🙏 Selected: ${chosen.name} — Bappa Morya!`);
    }
  };

  const handleNextHero = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIdx = (selectedHeroIndex + 1) % HERO_CHOICES.length;
    handleSelectChoice(nextIdx);
  };

  const handlePrevHero = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIdx = (selectedHeroIndex - 1 + HERO_CHOICES.length) % HERO_CHOICES.length;
    handleSelectChoice(prevIdx);
  };

  const handleOfferFlower = () => {
    triggerRedHibiscusShower(32);
    onShowToast('🌺 Sacred Red Hibiscus Flower Shower (जास्वंद पुष्पवृष्टी) — Ganapati Bappa Morya!');
  };

  const handlePlayTaal = () => {
    playTempleBell(840, 0.9);
    onShowToast('🔔 Bell (टण...) — Ganapati Bappa Morya!');
  };

  return (
    <section id="home" className="relative pt-6 pb-16 lg:py-20 overflow-hidden bg-gradient-to-br from-[#FF8C00] via-[#E35D25] to-[#C94D18]">
      {/* Background Animated Rangoli Mandala */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20 hidden md:block">
        <RangoliPattern variant="lotus" size={540} opacity={0.35} />
      </div>

      {/* Background Decorative Gold Grid Dots */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#FFD700_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Gold Ambient Glow Sphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] bg-[#FFD700]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Traditional Auspicious Header Banner */}
      <div className="max-w-4xl mx-auto px-4 mb-6 flex items-center justify-center gap-2 sm:gap-4 select-none opacity-95">
        <div
          onClick={handleOfferFlower}
          className="cursor-pointer transition-transform hover:scale-130 active:scale-95"
          title="Click for Red Hibiscus Flower Shower (जास्वंद पुष्पवृष्टी)!"
        >
          <RedHibiscus size={24} />
        </div>
        <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />
        <span className="text-sm sm:text-base font-bold tracking-widest text-[#FFFDD0] uppercase font-cinzel gold-glow">
          ॥ श्री गणेशाय नम: ॥
        </span>
        <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />
        <div
          onClick={handleOfferFlower}
          className="cursor-pointer transition-transform hover:scale-130 active:scale-95"
          title="Click for Red Hibiscus Flower Shower (जास्वंद पुष्पवृष्टी)!"
        >
          <RedHibiscus size={24} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Devotional Taglines, Actions */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#8B4513] border border-[#D4AF37] shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF0000] diya-flicker" />
              <span className="text-xs sm:text-sm font-semibold text-[#FFFDD0] tracking-wide">
                Devotion • Celebrations • Aartis • Sacred Darshan
              </span>
            </div>

            {/* Main Headings */}
            <div className="space-y-1 sm:space-y-2">
              <div className="font-cinzel text-xl sm:text-2xl font-bold tracking-widest text-[#FFD700] uppercase">
                Welcome to Bappa Morya
              </div>
              <h1 className="font-festive text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-[#FFFDD0] gold-glow">
                गणपती बाप्पा मोरया!
              </h1>
            </div>

            {/* Supporting Devotional Description in English */}
            <p className="text-base sm:text-lg lg:text-xl text-[#FFFDD0] opacity-95 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Celebrate the divine spirit of Ganesh Chaturthi and Ganesh Utsav. Discover historic temples, explore the sacred 8 Ashtavinayak pilgrimage circuit, and immerse yourself in traditional Marathi Aartis.
            </p>

            {/* Sacred Shloka Card in Glass Panel */}
            <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-[#FFD700]/40 shadow-inner text-center lg:text-left">
              <p className="text-sm sm:text-base font-bold text-[#FFD700] font-devanagari-serif italic leading-relaxed">
                “वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।<br className="sm:hidden" />
                &nbsp;निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥”
              </p>
              <p className="text-xs text-[#FFFDD0]/90 mt-1.5 leading-normal">
                <em>"O Lord with the curved trunk and immense radiant body, shining with the brilliance of millions of suns, please make all my endeavors free from obstacles forever."</em>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              {/* Primary CTA: Explore Darshan */}
              <a
                href="#darshan"
                className="bg-[#FFFDD0] text-[#8B4513] px-7 py-3.5 rounded-xl font-bold text-base sm:text-lg shadow-xl hover:bg-white hover:scale-105 transition-all duration-200 flex items-center gap-2.5 active:scale-95 border-2 border-[#D4AF37]"
              >
                <Eye className="w-5 h-5 text-[#8B4513]" />
                <span>Temple Darshan</span>
              </a>

              {/* Interactive Quick Offering: Offer Red Hibiscus Flower */}
              <button
                onClick={handleOfferFlower}
                className="px-5 py-3.5 rounded-xl bg-[#72370F] text-[#FFD700] hover:text-[#FFFDD0] text-sm sm:text-base font-semibold border border-[#D4AF37]/60 hover:bg-[#5D2B0D] transition-all flex items-center gap-2 active:scale-95 shadow-md cursor-pointer group"
                title="Offer Red Hibiscus Flower to Lord Ganesha"
              >
                <RedHibiscus size={22} className="group-hover:scale-110 transition-transform" />
                <span>Offer Jaswand Flower</span>
              </button>

              {/* Interactive Bell ("Tong") Button */}
              <button
                onClick={handlePlayTaal}
                className="px-5 py-3.5 rounded-xl bg-[#72370F] text-[#FFD700] hover:text-[#FFFDD0] text-sm sm:text-base font-semibold border border-[#D4AF37]/60 hover:bg-[#5D2B0D] transition-all flex items-center gap-2 active:scale-95 shadow-md cursor-pointer group"
                title="Ring Bell (टण...)"
              >
                <Bell className="w-4 h-4 text-[#FFD700] group-hover:scale-110 transition-transform" />
                <span>Ring Bell (टण...)</span>
              </button>
            </div>

            {/* Quick Highlights Badge Strip */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-[#FFFDD0] font-medium">
              <div className="flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#FFD700]" />
                <span>8 Ashtavinayak Temples</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#FFD700]" />
                <span>Authentic Marathi Aartis</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#FFD700]" />
                <span>Vedic Mantrapushpanjali</span>
              </div>
            </div>

          </div>

          {/* Right Column: Central Divine Ganapati Idol Visual & Choices */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md">
              
              {/* Outer Golden Halo Glow */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-b from-[#FFD700]/50 via-[#E35D25]/40 to-[#8B4513]/50 blur-lg pointer-events-none" />

              {/* Decorative Frame */}
              <div className="relative rounded-3xl bg-[#8B4513] p-3 sm:p-4 border-2 border-[#D4AF37] shadow-2xl overflow-hidden group">
                
                {/* Main Hero Image */}
                <div 
                  className="relative rounded-2xl overflow-hidden bg-[#5D2B0D] cursor-pointer shadow-inner"
                  onClick={() => onOpenLightbox && onOpenLightbox(currentHero.url, currentHero.name, currentHero.caption)}
                  title="Click to view full sacred darshan"
                >
                  <img
                    id="hero-ganapati-image"
                    src={currentHero.url}
                    alt={currentHero.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-80 sm:h-96 md:h-[420px] object-cover object-center group-hover:scale-105 transition-all duration-500 ease-out"
                    loading="eager"
                  />
                  
                  {/* Subtle Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#5D2B0D] via-transparent to-black/15 pointer-events-none" />

                  {/* Corner Traditional Motifs */}
                  <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#FFD700] pointer-events-none" />
                  <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#FFD700] pointer-events-none" />
                  <div className="absolute bottom-14 left-2 w-6 h-6 border-b-2 border-l-2 border-[#FFD700] pointer-events-none" />
                  <div className="absolute bottom-14 right-2 w-6 h-6 border-b-2 border-r-2 border-[#FFD700] pointer-events-none" />

                  {/* Quick cycle left/right buttons on image */}
                  <button
                    onClick={handlePrevHero}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#5D2B0D]/80 hover:bg-[#8B4513] text-[#FFD700] border border-[#FFD700]/70 flex items-center justify-center transition-all shadow-md active:scale-95 z-20 cursor-pointer"
                    aria-label="Previous Ganapati Image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handleNextHero}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#5D2B0D]/80 hover:bg-[#8B4513] text-[#FFD700] border border-[#FFD700]/70 flex items-center justify-center transition-all shadow-md active:scale-95 z-20 cursor-pointer"
                    aria-label="Next Ganapati Image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Top Badge: Active style */}
                  <div className="absolute top-3 inset-x-0 flex justify-center pointer-events-none z-10">
                    <span className="px-3 py-1 rounded-full bg-[#5D2B0D]/90 backdrop-blur-md text-[#FFD700] border border-[#FFD700]/60 text-[11px] font-bold shadow-md tracking-wider uppercase">
                      {currentHero.tag}
                    </span>
                  </div>

                  {/* Bottom Image Caption */}
                  <div className="absolute bottom-3 inset-x-3 text-center pointer-events-none z-10">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-[#8B4513]/95 backdrop-blur-sm border border-[#FFD700] shadow-lg">
                      <span className="font-festive text-sm sm:text-base font-bold text-[#FFD700] tracking-wide">
                        ॥ ॐ गणपतये नमः ॥
                      </span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Choices Selector Bar to Choose From */}
            <div className="w-full max-w-md mt-4 p-2.5 rounded-2xl bg-[#7A360E]/90 backdrop-blur-sm border border-[#D4AF37]/60 shadow-xl">
              <div className="flex items-center justify-between px-1 mb-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#FFFDD0]">
                  <ImageIcon className="w-3.5 h-3.5 text-[#FFD700]" />
                  <span>Choose Hero Murti / Idol:</span>
                </div>
                <span className="text-[11px] text-[#FFD700] font-medium">
                  {selectedHeroIndex + 1} of {HERO_CHOICES.length}
                </span>
              </div>

              {/* Thumbnails Row */}
              <div className="grid grid-cols-5 gap-1.5">
                {HERO_CHOICES.map((choice, idx) => {
                  const isSelected = idx === selectedHeroIndex;
                  return (
                    <button
                      key={choice.id}
                      onClick={() => handleSelectChoice(idx)}
                      className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all group/btn cursor-pointer ${
                        isSelected
                          ? 'border-[#FFD700] ring-2 ring-[#FFD700]/60 scale-105 shadow-md'
                          : 'border-[#D4AF37]/40 opacity-75 hover:opacity-100 hover:border-[#FFD700]/70'
                      }`}
                      title={choice.name}
                    >
                      <img
                        src={choice.url}
                        alt={choice.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover/btn:scale-110 transition-transform"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-[#FFD700]/20 flex items-end justify-center pb-0.5">
                          <div className="w-3.5 h-3.5 rounded-full bg-[#FFD700] text-[#5D2B0D] flex items-center justify-center shadow">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Active selection helper label */}
              <div className="mt-2 text-center text-[11px] text-[#FFFDD0]/90 truncate font-medium">
                {currentHero.name} • <span className="text-[#FFD700] italic">{currentHero.caption}</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Border Separator */}
      <div className="mt-12 w-full flex items-center justify-center gap-3 opacity-80">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />
        <span className="text-xs text-[#FFFDD0] font-bold tracking-widest uppercase font-cinzel">ॐ गं गणपतये नम:</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />
      </div>
    </section>
  );
};
