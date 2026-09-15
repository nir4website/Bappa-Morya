import React, { useState } from 'react';
import { 
  Copy, Check, Share2, 
  Sparkles, Flame, ChevronDown, ChevronUp, Music
} from 'lucide-react';
import { AARTIS_DATA } from '../data/aartisData.ts';
import { AartiItem } from '../types.ts';
import { playTempleBell, playKartal, playHousePujaGhantiContinuous, stopHousePujaGhanti } from '../utils/audioSynth.ts';
import { triggerRedHibiscusShower } from '../utils/flowerShower.ts';
import { BrassPanti, RedHibiscus, HandheldPoojaBellIcon, HaldiKumkumShendurBoxes, MarigoldFlower, PoojaBellStanding } from './FestiveIcons.tsx';
import { RangoliPattern } from './RangoliPattern.tsx';
import { HaldiKumkumPuffEffect, ActivePuff } from './HaldiKumkumPuffEffect.tsx';
import { BrassThaliPattern } from './BrassThaliPattern.tsx';

interface AartiSectionProps {
  currentPlayingId: string | null;
  isPlaying: boolean;
  onPlayTrack: (aarti: AartiItem) => void;
  onPauseTrack: () => void;
  onShowToast: (msg: string) => void;
}

export const AartiSection: React.FC<AartiSectionProps> = ({
  currentPlayingId,
  isPlaying,
  onPlayTrack,
  onPauseTrack,
  onShowToast
}) => {
  const [expandedAartiId, setExpandedAartiId] = useState<string>('sukhkarta-dukhharta');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isRotatingThali, setIsRotatingThali] = useState<boolean>(false);
  const [thaliFlowers, setThaliFlowers] = useState<number>(6);
  const [isBellRinging, setIsBellRinging] = useState<boolean>(false);
  const [tilakApplied, setTilakApplied] = useState<boolean>(false);
  const [activePuffs, setActivePuffs] = useState<ActivePuff[]>([]);
  const [puffPhase, setPuffPhase] = useState<'idle' | 'haldi' | 'kumkum'>('idle');

  const handleCopy = (aarti: AartiItem) => {
    const textToCopy = `${aarti.title}\n${aarti.subTitle}\n\n${aarti.lyrics.join('\n')}\n\n— Bappa Morya (गणपती बाप्पा मोरया)`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(aarti.id);
    onShowToast(`📋 Copied Marathi Aarti text for ${aarti.title}!`);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleShare = (aarti: AartiItem) => {
    if (navigator.share) {
      navigator.share({
        title: aarti.title,
        text: `${aarti.title}\n${aarti.lyrics.slice(0, 7).join('\n')}...\n\nRead full Aarti on Bappa Morya!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      handleCopy(aarti);
    }
  };

  const handleOwalAarti = () => {
    setIsRotatingThali(true);
    setIsBellRinging(true);
    playHousePujaGhantiContinuous(4.5, 0.9);
    playKartal(0.5);
    onShowToast('🪔 Jai Dev Jai Dev Jai Mangal Moorti! Performed traditional Aarti!');
    setTimeout(() => {
      setIsRotatingThali(false);
      setIsBellRinging(false);
    }, 4500);
  };

  const handleRingThaliBell = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isBellRinging) {
      stopHousePujaGhanti();
      setIsBellRinging(false);
      return;
    }
    setIsBellRinging(true);
    playHousePujaGhantiContinuous(7.0, 0.9);
    onShowToast('🔔 House Puja Bell (घरगुती पूजा घंटी) — अखंड घंटानाद!');
    setTimeout(() => setIsBellRinging(false), 7000);
  };

  const handleApplyTilak = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setTilakApplied(true);
    setPuffPhase('haldi');

    // 1. Send Yellow Puff (Haldi color) immediately
    const haldiPuffId = Date.now();
    playTempleBell(2250, 0.7);
    setActivePuffs((prev) => [...prev, { id: haldiPuffId, type: 'haldi' }]);
    onShowToast('✨ ॐ हळद समर्पयामि! Offered sacred Yellow Haldi puff to Lord Ganesha!');

    // 2. Followed by Vermilion Puff (Kumkum color) after 400ms
    const vermilionPuffId = haldiPuffId + 1;
    setTimeout(() => {
      setPuffPhase('kumkum');
      playTempleBell(2640, 0.75);
      setActivePuffs((prev) => [...prev, { id: vermilionPuffId, type: 'kumkum' }]);
      onShowToast('✨ ॐ कुंकू समर्पयामि! Offered sacred Vermilion Kumkum puff to Lord Ganesha!');
    }, 400);

    // Reset phase and clean up puffs
    setTimeout(() => {
      setPuffPhase('idle');
      setTilakApplied(false);
    }, 2800);

    setTimeout(() => {
      setActivePuffs((prev) => prev.filter((p) => p.id !== haldiPuffId));
    }, 2400);

    setTimeout(() => {
      setActivePuffs((prev) => prev.filter((p) => p.id !== vermilionPuffId));
    }, 2800);
  };

  const handleDiyaClick = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playTempleBell(980, 0.6);
    onShowToast('🪔 Sacred Twin Niranjan Diyas (२ निरांजन) glowing with holy ghee!');
  };

  const handleAddFlowerToThali = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setThaliFlowers(prev => prev + 1);
    triggerRedHibiscusShower(32);
    onShowToast('🌺 Sacred Red Hibiscus Flower Shower (जास्वंद पुष्पवृष्टी) — Ganapati Bappa Morya!');
  };

  return (
    <section id="aarti" className="py-16 sm:py-20 bg-gradient-to-b from-[#E35D25] via-[#C94D18] to-[#E35D25] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Glowing Panti */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#8B4513] border border-[#D4AF37] shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
            <span className="text-xs sm:text-sm font-semibold text-[#FFD700]">
              Sacred Stotras & Traditional Aartis
            </span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <BrassPanti size={32} showFlame={true} className="hidden sm:inline-flex" />

            <h2 className="font-festive text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFDD0] tracking-tight gold-glow">
              Aarti Sangrah
            </h2>

            <BrassPanti size={32} showFlame={true} className="hidden sm:inline-flex" />
          </div>

          <p className="text-base sm:text-lg text-[#FFFDD0]/90">
            Read traditional Marathi Aartis for Lord Ganesha, Devi, Shankar, Ghalin Lotangan, and Mantrapushpanjali.
          </p>

          <div className="h-0.5 w-28 mx-auto bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mt-2" />
        </div>

        {/* Layout Grid: Desktop Aarti List + Interactive Aarti Thali on the Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Aarti Accordion List (7 columns on desktop) */}
          <div className="lg:col-span-7 space-y-4">
            {AARTIS_DATA.map((aarti) => {
              const isExpanded = expandedAartiId === aarti.id;
              const isTrackPlaying = currentPlayingId === aarti.id && isPlaying;

              return (
                <div
                  key={aarti.id}
                  className={`rounded-2xl border-2 transition-all duration-300 overflow-hidden shadow-xl ${
                    isExpanded
                      ? 'bg-[#8B4513] border-[#FFD700] shadow-[0_4px_25px_rgba(255,215,0,0.3)]'
                      : 'bg-[#72370F] border-[#D4AF37]/50 hover:border-[#FFD700]'
                  }`}
                >
                  {/* Aarti Card Header */}
                  <div
                    onClick={() => setExpandedAartiId(isExpanded ? '' : aarti.id)}
                    className="p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3.5 flex-1 min-w-0">
                      <div className="min-w-0">
                        <h3 className="font-festive text-lg sm:text-xl font-bold text-[#FFFDD0] truncate font-devanagari-serif">
                          {aarti.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#FFD700] truncate font-devanagari-serif">
                          {aarti.subTitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isTrackPlaying && (
                        <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFD700] text-[#8B4513] text-xs font-bold animate-pulse">
                          <Music className="w-3 h-3" /> Playing Melody
                        </span>
                      )}
                      
                      <div className="w-8 h-8 rounded-full bg-[#5D2B0D] border border-[#D4AF37] flex items-center justify-center text-[#FFD700]">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Aarti Lyrics & Action Bar */}
                  {isExpanded && (
                    <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-[#5D2B0D] space-y-5 animate-in fade-in duration-300">
                      
                      {/* Meaning / Bhavarth Pill if available */}
                      {aarti.meaning && (
                        <div className="p-3 rounded-xl bg-[#5D2B0D] border border-[#D4AF37]/50 text-xs text-[#FFFDD0] font-devanagari-serif">
                          <span className="text-[#FFD700] font-bold block mb-0.5">भावार्थ (Spiritual Meaning):</span>
                          {aarti.meaning}
                        </div>
                      )}

                      {/* Aarti Lyrics Box in Clear Marathi Devanagari */}
                      <div className="p-5 sm:p-6 rounded-xl bg-[#5D2B0D] border border-[#D4AF37]/40 shadow-inner font-devanagari-serif text-base sm:text-lg leading-loose text-[#FFFDD0] space-y-1 select-text">
                        {aarti.lyrics.map((line, idx) => (
                          <p key={idx} className={line === '' ? 'h-3' : line.includes('धृ') ? 'font-bold text-[#FFD700]' : ''}>
                            {line}
                          </p>
                        ))}
                      </div>

                      {/* Action Tools: Copy, Share, Play */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <div className="flex items-center gap-2">
                          {/* Copy Button */}
                          <button
                            onClick={() => handleCopy(aarti)}
                            className="px-3.5 py-2 rounded-xl bg-[#72370F] hover:bg-[#5D2B0D] text-[#FFD700] text-xs sm:text-sm font-semibold border border-[#D4AF37]/50 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
                          >
                            {copiedId === aarti.id ? (
                              <>
                                <Check className="w-4 h-4 text-green-300" />
                                <span className="text-green-300">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4" />
                                <span>Copy Text</span>
                              </>
                            )}
                          </button>

                          {/* Share */}
                          <button
                            onClick={() => handleShare(aarti)}
                            className="px-3.5 py-2 rounded-xl bg-[#72370F] hover:bg-[#5D2B0D] text-[#FFFDD0] text-xs sm:text-sm font-semibold border border-[#D4AF37]/50 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
                          >
                            <Share2 className="w-4 h-4 text-[#FFD700]" />
                            <span>Share</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Prominent Aarti Devotional Puja Thali on Desktop (5 columns) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 bg-[#72370F] rounded-3xl p-6 sm:p-7 border-2 border-[#D4AF37] shadow-2xl space-y-6">
              
              {/* Thali Header in English */}
              <div className="text-center space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5D2B0D] border border-[#D4AF37] text-xs font-bold text-[#FFD700]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Interactive Puja Ritual</span>
                </div>
                <h3 className="font-festive text-2xl font-bold text-[#FFFDD0]">
                  Traditional Brass Aarti Thali (पितळी ताट)
                </h3>
                <p className="text-xs text-[#FFFDD0]/90">
                  Lustrous brass platter engraved with Gayatri Mantra & ॐ, adorned with 2 glowing Diyas, Haldi-Kumkum-Shendur boxes, Ghanti, and fresh flowers.
                </p>
              </div>

              {/* Interactive Visual Brass Aarti Thali with 2 Diyas, Bell, Haldi-Kumkum-Shendur & Flowers */}
              <div className="relative py-2 sm:py-4 flex items-center justify-center overflow-visible">
                {/* Yellow & Vermilion Powder Puff Burst Effect */}
                <HaldiKumkumPuffEffect puffs={activePuffs} />

                <div
                  className={`relative w-72 h-72 sm:w-80 sm:h-80 rounded-full p-3.5 shadow-2xl transition-all duration-700 select-none ${
                    isRotatingThali ? 'rotate-360 scale-105 aarti-plate-glow' : 'hover:scale-102'
                  }`}
                  style={{
                    background: 'radial-gradient(circle, #ffe87c 0%, #ffd700 25%, #d4af37 55%, #8a5d12 85%, #5d2b0d 100%)',
                    boxShadow: isRotatingThali
                      ? '0 0 50px rgba(255, 215, 0, 0.8), 0 0 25px rgba(227, 93, 37, 0.6), inset 0 0 20px rgba(255, 235, 120, 0.8)'
                      : '0 12px 30px rgba(0,0,0,0.6), inset 0 0 15px rgba(255, 235, 120, 0.6)',
                    border: '4px solid #FFFDD0',
                    transition: 'transform 4.5s ease-in-out, box-shadow 0.8s ease'
                  }}
                >
                  {/* Outer Embossed Brass Scallop Petal Rim with Studs */}
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                    <div
                      key={deg}
                      className="absolute w-2 h-2 rounded-full bg-[#FFFDD0] border border-[#72370F] shadow-sm pointer-events-none"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: `rotate(${deg}deg) translate(0, -134px) translate(-50%, -50%)`
                      }}
                    />
                  ))}

                  {/* Inner Polished Brass Plate Basin (पितळी ताट with Gayatri Mantra & Om) */}
                  <div className="w-full h-full rounded-full bg-[radial-gradient(circle_at_center,_#FFFCE8_0%,_#FCE57A_22%,_#EAB308_48%,_#CA8A04_72%,_#78350F_100%)] shadow-[inset_0_3px_22px_rgba(0,0,0,0.5),_0_2px_10px_rgba(0,0,0,0.3)] border-2 border-[#FFE87C] relative overflow-hidden flex flex-col items-center justify-between p-2.5 sm:p-3 text-center">
                    
                    {/* Authentic Engraved Brass Thali: Fluted Rim, Circular Gayatri Mantra & Center Om Sunburst */}
                    <BrassThaliPattern />

                    {/* =========================================================
                        TOP SECTION: Haldi, Kumkum, and Shendur Boxes (हळद-कुंकू-शेंदूर)
                       ========================================================= */}
                    <div className="relative z-20 flex flex-col items-center mt-1">
                      <HaldiKumkumShendurBoxes size={72} onClick={handleApplyTilak} />
                      <div className="mt-0.5 px-2 py-0.5 rounded-full bg-[#5D2B0D]/90 border border-[#D4AF37] text-[9px] font-bold text-[#FFE87C] tracking-wider pointer-events-none shadow-sm backdrop-blur-[2px]">
                        हळद • कुंकू • शेंदूर
                      </div>
                    </div>

                    {/* =========================================================
                        MIDDLE SECTION: 2 Diyas Together in Center + Ghanti on Right
                       ========================================================= */}
                    <div className="relative z-20 w-full px-3 sm:px-4 flex items-center justify-between my-auto">
                      {/* Left balancing spacer to keep Diyas perfectly centered */}
                      <div className="w-12 flex-shrink-0" aria-hidden="true" />

                      {/* Both Diyas Together in the Centre (दोन्ही निरांजन एकत्र मध्यभागी) */}
                      <div className="flex items-center justify-center gap-2 sm:gap-2.5">
                        {/* Diya 1 */}
                        <div
                          onClick={handleDiyaClick}
                          className="flex flex-col items-center cursor-pointer transition-transform hover:scale-115 active:scale-95 group"
                          title="Brass Diya (निरांजन) - Tap for Blessing"
                        >
                          <BrassPanti size={40} showFlame={true} />
                          <span className="text-[8px] font-bold text-[#5D2B0D] group-hover:text-[#991B1B] transition-colors font-devanagari-serif drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
                            निरांजन
                          </span>
                        </div>

                        {/* Diya 2 */}
                        <div
                          onClick={handleDiyaClick}
                          className="flex flex-col items-center cursor-pointer transition-transform hover:scale-115 active:scale-95 group"
                          title="Brass Diya (निरांजन) - Tap for Blessing"
                        >
                          <BrassPanti size={40} showFlame={true} />
                          <span className="text-[8px] font-bold text-[#5D2B0D] group-hover:text-[#991B1B] transition-colors font-devanagari-serif drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
                            निरांजन
                          </span>
                        </div>
                      </div>

                      {/* Standing Brass Pooja Bell shifted to the Right (उजवीकडे पूजा घंटी) */}
                      <div
                        onClick={handleRingThaliBell}
                        className="w-12 flex-shrink-0 flex flex-col items-center cursor-pointer transition-transform hover:scale-115 active:scale-90 group"
                        title="Tap to Ring House Puja Bell (घरगुती पूजा घंटी अखंड नाद)"
                      >
                        <PoojaBellStanding size={38} isRinging={isBellRinging} />
                        <span className="text-[8px] font-bold text-[#5D2B0D] tracking-wider font-devanagari-serif mt-0.5 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] whitespace-nowrap">
                          {isBellRinging ? '🔔 अखंड नाद...' : '🔔 पूजा घंटी'}
                        </span>
                      </div>
                    </div>

                    {/* =========================================================
                        BOTTOM SECTION: Sacred Flowers (Jaswand & Marigold) + Petals
                       ========================================================= */}
                    <div className="relative z-20 w-full flex flex-col items-center pb-1">
                      {/* Floral Arrangement on Thali */}
                      <div className="flex items-center justify-center gap-2 mb-1">
                        {/* Orange Marigold (झेंडू) */}
                        <div
                          onClick={handleAddFlowerToThali}
                          className="cursor-pointer transition-transform hover:scale-125 active:scale-90"
                          title="Click for Red Hibiscus Flower Shower (जास्वंद पुष्पवृष्टी)!"
                        >
                          <MarigoldFlower size={26} variant="orange" />
                        </div>
                        
                        {/* Red Hibiscus (जास्वंद) */}
                        <div
                          onClick={handleAddFlowerToThali}
                          className="cursor-pointer transition-transform hover:scale-130 active:scale-90 animate-pulse group/flower"
                          title="Click for Sacred Red Hibiscus Shower (जास्वंद पुष्पवृष्टी)!"
                        >
                          <RedHibiscus size={36} className="drop-shadow-[0_2px_8px_rgba(255,0,0,0.5)]" />
                        </div>

                        {/* Yellow Marigold (झेंडू) */}
                        <div
                          onClick={handleAddFlowerToThali}
                          className="cursor-pointer transition-transform hover:scale-125 active:scale-90"
                          title="Click for Red Hibiscus Flower Shower (जास्वंद पुष्पवृष्टी)!"
                        >
                          <MarigoldFlower size={26} variant="yellow" />
                        </div>

                        {/* Dynamic additional flowers if user offered more */}
                        {thaliFlowers > 6 && (
                          <div
                            onClick={handleAddFlowerToThali}
                            className="cursor-pointer transition-transform hover:scale-125"
                            title="Click for Red Hibiscus Shower"
                          >
                            <RedHibiscus size={24} className="hidden sm:inline-block animate-pulse" />
                          </div>
                        )}
                      </div>

                      {/* Scattered Petals & Sacred Inscription */}
                      <div className="flex items-center gap-1.5 text-center">
                        <span className="text-[10px] text-[#DC2626] select-none">🌸</span>
                        <span className="text-[10px] sm:text-[11px] font-extrabold text-[#991B1B] tracking-wider uppercase font-devanagari-serif drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                          ॥ ॐ गं गणपतये नमः ॥
                        </span>
                        <span className="text-[10px] text-[#EA580C] select-none">🌼</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Ritual Buttons in English */}
              <div className="space-y-3">
                {/* Perform Aarti Button */}
                <button
                  onClick={handleOwalAarti}
                  className="w-full py-3.5 rounded-2xl bg-[#D4AF37] hover:bg-[#FFD700] text-[#8B4513] font-bold text-base sm:text-lg border-2 border-white shadow-[0_0_20px_rgba(255,215,0,0.5)] flex items-center justify-center gap-2.5 transition-all active:scale-95 group cursor-pointer"
                >
                  <Flame className="w-5 h-5 text-[#8B4513] group-hover:scale-110" />
                  <span>Perform Puja</span>
                </button>

                {/* Additional Ritual Actions */}
                <div className="grid grid-cols-3 gap-2">
                  {/* Bell Button */}
                  <button
                    onClick={handleRingThaliBell}
                    className={`py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all flex flex-col sm:flex-row items-center justify-center gap-1 active:scale-95 cursor-pointer ${
                      isBellRinging
                        ? 'bg-[#8B4513] text-[#FFE87C] border-[#FFD700] shadow-[0_0_12px_rgba(255,215,0,0.6)] animate-pulse'
                        : 'bg-[#5D2B0D] hover:bg-[#8B4513] text-[#FFD700] border-[#D4AF37]/60'
                    }`}
                    title="Ring House Puja Bell (घरगुती पूजा घंटी अखंड नाद)"
                  >
                    <HandheldPoojaBellIcon size={18} />
                    <span className="truncate">{isBellRinging ? 'अखंड नाद सुरू...' : 'पूजा घंटी'}</span>
                  </button>

                  {/* Haldi Kumkum Button */}
                  <button
                    onClick={handleApplyTilak}
                    className={`py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all flex flex-col sm:flex-row items-center justify-center gap-1 active:scale-95 cursor-pointer ${
                      puffPhase === 'haldi'
                        ? 'bg-[#EAB308] text-[#713F12] border-[#FEF08A] shadow-[0_0_18px_rgba(250,204,21,0.95)] scale-105'
                        : puffPhase === 'kumkum'
                        ? 'bg-[#DC2626] text-[#FFFDD0] border-[#FECDD3] shadow-[0_0_18px_rgba(220,38,38,0.95)] scale-105'
                        : 'bg-[#5D2B0D] hover:bg-[#8B4513] text-[#FFE87C] border-[#D4AF37]/60'
                    }`}
                    title="Offer Sacred Haldi (Yellow) & Kumkum (Vermilion) Puff"
                  >
                    <span className="text-sm">
                      {puffPhase === 'haldi' ? '🟡' : puffPhase === 'kumkum' ? '🔴' : '✨'}
                    </span>
                    <span className="truncate">
                      {puffPhase === 'haldi' ? 'हळद...' : puffPhase === 'kumkum' ? 'कुंकू...' : 'हळद-कुंकू'}
                    </span>
                  </button>

                  {/* Offer Flower Button (पुष्पवृष्टी) */}
                  <button
                    onClick={handleAddFlowerToThali}
                    className="py-2.5 px-2 rounded-xl bg-[#5D2B0D] hover:bg-[#8B4513] text-[#FFFDD0] text-xs font-semibold border border-[#D4AF37]/60 flex flex-col sm:flex-row items-center justify-center gap-1 active:scale-95 cursor-pointer"
                    title="Click for Red Hibiscus Flower Shower (जास्वंद पुष्पवृष्टी)"
                  >
                    <RedHibiscus size={16} />
                    <span className="truncate">पुष्पवृष्टी ({thaliFlowers})</span>
                  </button>
                </div>
              </div>

              {/* Sacred Devotional Epigraph */}
              <div className="pt-2 text-center text-xs text-[#FFFDD0]/90 font-devanagari-serif border-t border-[#5D2B0D]">
                “सुखकर्ता दुःखहर्ता वार्ता विघ्नाची ।<br />
                नुरवी पूर्वी प्रेम कृपा जयाची ॥”
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
