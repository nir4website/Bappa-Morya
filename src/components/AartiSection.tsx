import React, { useState } from 'react';
import { 
  Play, Pause, Copy, Check, Download, Share2, Volume2, 
  Sparkles, Flame, ChevronDown, ChevronUp, Music
} from 'lucide-react';
import { AARTIS_DATA } from '../data/aartisData.ts';
import { AartiItem } from '../types.ts';
import { playTempleBell, playKartal } from '../utils/audioSynth.ts';
import { BrassPanti, RedHibiscus, HandheldPoojaBellIcon } from './FestiveIcons.tsx';
import { RangoliPattern } from './RangoliPattern.tsx';

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
  const [thaliFlowers, setThaliFlowers] = useState<number>(5);

  const handleCopy = (aarti: AartiItem) => {
    const textToCopy = `${aarti.title}\n${aarti.subTitle}\n\n${aarti.lyrics.join('\n')}\n\n— Bappa Morya (गणपती बाप्पा मोरया)`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(aarti.id);
    onShowToast(`📋 Copied Marathi Aarti text for ${aarti.title}!`);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDownloadLyrics = (aarti: AartiItem) => {
    const textContent = `${aarti.title}\n${aarti.subTitle}\n\n${aarti.lyrics.join('\n')}\n\nभावार्थ:\n${aarti.meaning || ''}\n\n॥ गणपती बाप्पा मोरया, मंगलमूर्ती मोरया ॥\n`;
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${aarti.id}-aarti-marathi.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onShowToast(`📥 Downloaded Aarti file: ${aarti.title}`);
  };

  const handleShare = (aarti: AartiItem) => {
    if (navigator.share) {
      navigator.share({
        title: aarti.title,
        text: `${aarti.title}\n${aarti.lyrics.slice(0, 7).join('\n')}...\n\nRead & Listen to full Aarti on Bappa Morya!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      handleCopy(aarti);
    }
  };

  const handleOwalAarti = () => {
    setIsRotatingThali(true);
    playTempleBell(2250, 0.9);
    playKartal(0.5);
    onShowToast('🪔 Jai Dev Jai Dev Jai Mangal Moorti! Performed traditional Aarti!');
    setTimeout(() => setIsRotatingThali(false), 4000);
  };

  const handleAddFlowerToThali = () => {
    playTempleBell(2400, 0.65);
    setThaliFlowers(prev => prev + 1);
    onShowToast('🌺 Offered sacred Red Hibiscus (जास्वंद) into the Aarti Thali!');
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
            Read and listen to traditional Marathi Aartis for Lord Ganesha, Devi, Shankar, Ghalin Lotangan, and Mantrapushpanjali.
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
                      {/* Play/Pause Button for Aarti */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isTrackPlaying) {
                            onPauseTrack();
                          } else {
                            onPlayTrack(aarti);
                          }
                        }}
                        className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 border transition-all active:scale-95 shadow-md cursor-pointer ${
                          isTrackPlaying
                            ? 'bg-[#FFD700] text-[#8B4513] border-white shadow-[0_0_15px_#FFD700] animate-pulse'
                            : 'bg-[#5D2B0D] text-[#FFD700] border-[#D4AF37] hover:bg-[#8B4513] hover:border-[#FFD700]'
                        }`}
                        title={isTrackPlaying ? 'Pause Aarti melody' : 'Play Aarti melody'}
                      >
                        {isTrackPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                      </button>

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

                      {/* Action Tools: Copy, Download, Share, Play */}
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

                          {/* Download Lyrics */}
                          <button
                            onClick={() => handleDownloadLyrics(aarti)}
                            className="px-3.5 py-2 rounded-xl bg-[#72370F] hover:bg-[#5D2B0D] text-[#FFFDD0] text-xs sm:text-sm font-semibold border border-[#D4AF37]/50 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
                          >
                            <Download className="w-4 h-4 text-[#FFD700]" />
                            <span>Download Text</span>
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

                        {/* Audio Play button */}
                        <button
                          onClick={() => {
                            if (isTrackPlaying) onPauseTrack();
                            else onPlayTrack(aarti);
                          }}
                          className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#FFD700] text-[#8B4513] text-xs sm:text-sm font-bold border border-white shadow-md transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
                        >
                          {isTrackPlaying ? (
                            <>
                              <Pause className="w-4 h-4" />
                              <span>Pause Aarti</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-4 h-4" />
                              <span>Listen Melody</span>
                            </>
                          )}
                        </button>
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
                  Traditional Brass Aarti Thali
                </h3>
                <p className="text-xs text-[#FFFDD0]/90">
                  Perform Aarti, ring the sacred traditional temple bell, and offer sacred Red Jaswand flowers.
                </p>
              </div>

              {/* Interactive Visual Brass Aarti Thali with Brass Panti & Rangoli */}
              <div className="relative py-4 flex items-center justify-center">
                <div 
                  className={`relative w-60 h-60 sm:w-68 sm:h-68 rounded-full bg-gradient-to-tr from-[#997a15] via-[#ffd700] to-[#8a5d12] p-3.5 shadow-2xl border-4 border-[#ffed99] flex items-center justify-center transition-transform duration-1000 ${
                    isRotatingThali ? 'rotate-180 scale-105 aarti-plate-glow' : 'hover:scale-102'
                  }`}
                >
                  {/* Subtle Background Rangoli inside the Thali */}
                  <div className="absolute inset-4 opacity-25 pointer-events-none">
                    <RangoliPattern variant="lotus" size="100%" />
                  </div>

                  {/* Inner Brass Plate Basin */}
                  <div className="w-full h-full rounded-full bg-gradient-to-b from-[#5D2B0D] via-[#3a190b] to-[#5D2B0D] border-2 border-dashed border-[#FFD700] flex flex-col items-center justify-center relative p-4 text-center">
                    
                    {/* Center Brass Panti with Radiant Flame */}
                    <div className="relative z-10 flex flex-col items-center">
                      <BrassPanti size={44} showFlame={true} />
                    </div>

                    {/* Surrounding Red Hibiscus Flowers */}
                    <div className="absolute top-4 inset-x-0 flex justify-center gap-6 z-10">
                      <RedHibiscus size={26} className="animate-bounce" />
                      <RedHibiscus size={24} className="animate-bounce" />
                    </div>

                    <div className="absolute bottom-4 inset-x-0 flex justify-center gap-4 z-10">
                      <RedHibiscus size={22} />
                      <span className="text-sm">🌼</span>
                      <RedHibiscus size={22} />
                    </div>

                    <div className="mt-1 text-center z-10">
                      <span className="text-[11px] font-bold text-[#FFD700] tracking-wider uppercase font-devanagari-serif">
                        ॥ ॐ मंगलमूर्ती मोरया ॥
                      </span>
                    </div>
                  </div>

                  {/* Rim Accent Dots */}
                  <div className="absolute top-1 left-1 w-3 h-3 bg-[#FFD700] rounded-full border border-white" />
                  <div className="absolute top-1 right-1 w-3 h-3 bg-[#FFD700] rounded-full border border-white" />
                  <div className="absolute bottom-1 left-1 w-3 h-3 bg-[#FFD700] rounded-full border border-white" />
                  <div className="absolute bottom-1 right-1 w-3 h-3 bg-[#FFD700] rounded-full border border-white" />
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
                  <span>Perform Aarti (ओवाळा)</span>
                </button>

                {/* Additional Ritual Actions */}
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => {
                      playTempleBell(840, 0.85);
                      onShowToast('🔔 Sacred Ghantinaad (घंटीनाद) — जय गणेश देवा!');
                    }}
                    className="py-2.5 px-3 rounded-xl bg-[#5D2B0D] hover:bg-[#8B4513] text-[#FFD700] text-xs sm:text-sm font-semibold border border-[#D4AF37]/60 flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                  >
                    <HandheldPoojaBellIcon size={20} />
                    <span>Ghantinaad (घंटीनाद)</span>
                  </button>

                  <button
                    onClick={handleAddFlowerToThali}
                    className="py-2.5 px-3 rounded-xl bg-[#5D2B0D] hover:bg-[#8B4513] text-[#FFFDD0] text-xs sm:text-sm font-semibold border border-[#D4AF37]/60 flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                  >
                    <RedHibiscus size={18} />
                    <span>Offer Jaswand ({thaliFlowers})</span>
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
