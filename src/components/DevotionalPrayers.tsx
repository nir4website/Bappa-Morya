import React, { useState } from 'react';
import { Copy, Check, Play, Pause, Download, Sparkles, Heart } from 'lucide-react';
import { AARTIS_DATA } from '../data/aartisData.ts';
import { AartiItem } from '../types.ts';
import { playTempleBell, playShankha } from '../utils/audioSynth.ts';
import { RedHibiscus } from './FestiveIcons.tsx';

interface DevotionalPrayersProps {
  currentPlayingId: string | null;
  isPlaying: boolean;
  onPlayTrack: (aarti: AartiItem) => void;
  onPauseTrack: () => void;
  onShowToast: (msg: string) => void;
}

export const DevotionalPrayers: React.FC<DevotionalPrayersProps> = ({
  currentPlayingId,
  isPlaying,
  onPlayTrack,
  onPauseTrack,
  onShowToast
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [flowerShowerActive, setFlowerShowerActive] = useState<boolean>(false);

  const ghalinLotangan = AARTIS_DATA.find((a) => a.id === 'ghalin-lotangan')!;
  const mantrapushpanjali = AARTIS_DATA.find((a) => a.id === 'mantrapushpanjali')!;

  const handleCopy = (item: AartiItem) => {
    const textToCopy = `${item.title}\n${item.subTitle}\n\n${item.lyrics.join('\n')}\n\n— Bappa Morya`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(item.id);
    onShowToast(`📋 Copied text for ${item.title}!`);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDownload = (item: AartiItem) => {
    const textContent = `${item.title}\n${item.subTitle}\n\n${item.lyrics.join('\n')}\n\nभावार्थ:\n${item.meaning || ''}\n\n॥ गणपती बाप्पा मोरया, मंगलमूर्ती मोरया ॥\n`;
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${item.id}-marathi.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onShowToast(`📥 Downloaded ${item.title} text file!`);
  };

  const handleFlowerShower = () => {
    setFlowerShowerActive(true);
    playShankha(3.0, 0.7);
    playTempleBell(2300, 0.85);
    onShowToast('🌺 ॐ मंत्रपुष्पांजली समर्पयामि! Offered sacred flower shower at Bappa\'s feet!');
    setTimeout(() => setFlowerShowerActive(false), 3800);
  };

  return (
    <section id="mantra" className="py-16 sm:py-20 bg-gradient-to-b from-[#E35D25] via-[#C94D18] to-[#E35D25] relative border-t-2 border-b-2 border-[#D4AF37]">
      
      {/* Dynamic Red Hibiscus Flower Shower Overlay */}
      {flowerShowerActive && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
          <div className="absolute top-10 left-[15%] animate-flower-shower"><RedHibiscus size={36} /></div>
          <div className="absolute top-14 left-[35%] animate-flower-shower" style={{ animationDelay: '0.2s' }}><RedHibiscus size={32} /></div>
          <div className="absolute top-8 left-[55%] animate-flower-shower" style={{ animationDelay: '0.4s' }}><RedHibiscus size={40} /></div>
          <div className="absolute top-16 left-[75%] animate-flower-shower" style={{ animationDelay: '0.1s' }}><RedHibiscus size={30} /></div>
          <div className="absolute top-6 left-[88%] animate-flower-shower" style={{ animationDelay: '0.3s' }}><RedHibiscus size={34} /></div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header in English */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8B4513] border border-[#D4AF37] text-xs sm:text-sm font-semibold text-[#FFD700] shadow-md">
            <Sparkles className="w-4 h-4 text-[#FFD700]" />
            <span>Sacred Surrender & Vedic Prayers</span>
          </div>

          <h2 className="font-festive text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFDD0] tracking-tight gold-glow">
            Ghalin Lotangan & Mantrapushpanjali
          </h2>

          <p className="text-base sm:text-lg text-[#FFFDD0]/90">
            The revered concluding prayers of Aarti ceremony and the Vedic national anthem of ancient India.
          </p>

          <div className="h-0.5 w-28 mx-auto bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mt-2" />
        </div>

        {/* Two Devotional Cards Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          
          {/* Card 1: Ghalin Lotangan */}
          <div className="bg-[#8B4513] rounded-3xl border-2 border-[#D4AF37] shadow-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-[#FFD700] transition-colors">
            
            {/* Top Corner Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🙏</span>
                <div>
                  <h3 className="font-festive text-2xl sm:text-3xl font-bold text-[#FFD700] font-devanagari-serif">
                    घालीन लोटांगण (Ghalin Lotangan)
                  </h3>
                  <p className="text-xs sm:text-sm text-[#FFFDD0]">
                    Aarti Concluding Prayer of Total Surrender
                  </p>
                </div>
              </div>

              {/* Audio Play Trigger */}
              <button
                onClick={() => {
                  if (currentPlayingId === ghalinLotangan.id && isPlaying) {
                    onPauseTrack();
                  } else {
                    onPlayTrack(ghalinLotangan);
                  }
                }}
                className={`p-3 rounded-full border transition-all active:scale-95 shadow-md cursor-pointer ${
                  currentPlayingId === ghalinLotangan.id && isPlaying
                    ? 'bg-[#FFD700] text-[#8B4513] border-white shadow-[0_0_15px_#FFD700]'
                    : 'bg-[#5D2B0D] text-[#FFD700] border-[#D4AF37] hover:bg-[#72370F]'
                }`}
                title="Listen to Ghalin Lotangan"
              >
                {currentPlayingId === ghalinLotangan.id && isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
            </div>

            {/* Meaning Box in English */}
            <div className="p-3.5 rounded-xl bg-[#5D2B0D] border border-[#D4AF37]/50 text-xs text-[#FFFDD0] leading-relaxed">
              <span className="font-bold text-[#FFD700] block mb-1">Spiritual Essence:</span>
              "O Lord, I bow prostrate at Thy lotus feet, behold Thy radiant form with my eyes, worship Thee with deep devotion, and dedicate all my bodily actions, words, and thoughts to Thee."
            </div>

            {/* Complete Lyrics Box in authentic Marathi Devanagari */}
            <div className="p-5 rounded-2xl bg-[#5D2B0D] border border-[#D4AF37]/40 shadow-inner font-devanagari-serif text-base sm:text-lg leading-relaxed text-[#FFFDD0] space-y-3 select-text max-h-96 overflow-y-auto">
              {ghalinLotangan.lyrics.map((line, idx) => (
                <p key={idx} className={line === '' ? 'h-2' : line.includes('त्वमेव') || line.includes('कायेन') ? 'text-[#FFD700] font-bold' : ''}>
                  {line}
                </p>
              ))}
            </div>

            {/* Action Buttons in English */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#72370F]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(ghalinLotangan)}
                  className="px-3.5 py-2 rounded-xl bg-[#72370F] hover:bg-[#5D2B0D] text-[#FFD700] text-xs sm:text-sm font-semibold border border-[#D4AF37]/50 flex items-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  {copiedId === ghalinLotangan.id ? <Check className="w-4 h-4 text-green-300" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedId === ghalinLotangan.id ? 'Copied!' : 'Copy Text'}</span>
                </button>

                <button
                  onClick={() => handleDownload(ghalinLotangan)}
                  className="px-3.5 py-2 rounded-xl bg-[#72370F] hover:bg-[#5D2B0D] text-[#FFFDD0] text-xs sm:text-sm font-semibold border border-[#D4AF37]/50 flex items-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#FFD700]" />
                  <span>Download Text</span>
                </button>
              </div>

              <button
                onClick={() => {
                  playTempleBell(2250, 0.85);
                  onShowToast('🙏 Charansparsha Vandana! Prostrations at Lord Ganesha\'s lotus feet.');
                }}
                className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#FFD700] text-[#8B4513] text-xs sm:text-sm font-bold border border-white shadow flex items-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <Heart className="w-4 h-4 text-[#8B4513]" />
                <span>Bow in Reverence</span>
              </button>
            </div>

          </div>

          {/* Card 2: Mantrapushpanjali */}
          <div className="bg-[#8B4513] rounded-3xl border-2 border-[#D4AF37] shadow-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-[#FFD700] transition-colors">
            
            {/* Top Corner Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RedHibiscus size={26} />
                <div>
                  <h3 className="font-festive text-2xl sm:text-3xl font-bold text-[#FFD700] font-devanagari-serif">
                    मंत्रपुष्पांजली (Mantrapushpanjali)
                  </h3>
                  <p className="text-xs sm:text-sm text-[#FFFDD0]">
                    Vedic Anthem of Sovereign Peace & Flower Offering
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  if (currentPlayingId === mantrapushpanjali.id && isPlaying) {
                    onPauseTrack();
                  } else {
                    onPlayTrack(mantrapushpanjali);
                  }
                }}
                className={`p-3 rounded-full border transition-all active:scale-95 shadow-md cursor-pointer ${
                  currentPlayingId === mantrapushpanjali.id && isPlaying
                    ? 'bg-[#FFD700] text-[#8B4513] border-white shadow-[0_0_15px_#FFD700]'
                    : 'bg-[#5D2B0D] text-[#FFD700] border-[#D4AF37] hover:bg-[#72370F]'
                }`}
                title="Listen to Mantrapushpanjali"
              >
                {currentPlayingId === mantrapushpanjali.id && isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
            </div>

            {/* Meaning Box in English */}
            <div className="p-3.5 rounded-xl bg-[#5D2B0D] border border-[#D4AF37]/50 text-xs text-[#FFFDD0] leading-relaxed">
              <span className="font-bold text-[#FFD700] block mb-1">Vedic Significance:</span>
              Originating from the Rigveda and Taittiriya Aranyaka, this sacred prayer seeks sovereign governance, righteousness, peace, and abundance across the realm while offering sanctified flowers at Lord Ganesha's lotus feet.
            </div>

            {/* Complete Sanskrit Mantra Box in Devanagari */}
            <div className="p-5 rounded-2xl bg-[#5D2B0D] border border-[#D4AF37]/40 shadow-inner font-devanagari-serif text-base sm:text-lg leading-relaxed text-[#FFFDD0] space-y-3 select-text max-h-96 overflow-y-auto">
              {mantrapushpanjali.lyrics.map((line, idx) => (
                <p key={idx} className={line === '' ? 'h-2' : line.includes('ॐ') ? 'text-[#FFD700] font-bold' : ''}>
                  {line}
                </p>
              ))}
            </div>

            {/* Action Buttons with Flower Shower Trigger */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#72370F]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(mantrapushpanjali)}
                  className="px-3.5 py-2 rounded-xl bg-[#72370F] hover:bg-[#5D2B0D] text-[#FFD700] text-xs sm:text-sm font-semibold border border-[#D4AF37]/50 flex items-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  {copiedId === mantrapushpanjali.id ? <Check className="w-4 h-4 text-green-300" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedId === mantrapushpanjali.id ? 'Copied!' : 'Copy Text'}</span>
                </button>

                <button
                  onClick={() => handleDownload(mantrapushpanjali)}
                  className="px-3.5 py-2 rounded-xl bg-[#72370F] hover:bg-[#5D2B0D] text-[#FFFDD0] text-xs sm:text-sm font-semibold border border-[#D4AF37]/50 flex items-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#FFD700]" />
                  <span>Download Text</span>
                </button>
              </div>

              {/* Ceremonial Flower Offering Button */}
              <button
                onClick={handleFlowerShower}
                className="px-4 sm:px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#FFD700] text-[#8B4513] font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(255,215,0,0.5)] border border-white flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
              >
                <RedHibiscus size={18} />
                <span>Perform Pushpavrushti (Flower Shower)</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
