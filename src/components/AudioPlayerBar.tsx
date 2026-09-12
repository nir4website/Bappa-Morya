import React, { useState } from 'react';
import { 
  Play, Pause, SkipForward, SkipBack, 
  Music, Sparkles, ListMusic, X 
} from 'lucide-react';
import { AARTIS_DATA } from '../data/aartisData.ts';
import { AartiItem } from '../types.ts';
import { playTempleBell, playShankha } from '../utils/audioSynth.ts';
import { HandheldPoojaBellIcon } from './FestiveIcons.tsx';

interface AudioPlayerBarProps {
  currentAarti: AartiItem | null;
  isPlaying: boolean;
  onPlay: (aarti: AartiItem) => void;
  onPause: () => void;
  onShowToast: (msg: string) => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  currentAarti,
  isPlaying,
  onPlay,
  onPause,
  onShowToast
}) => {
  const [showPlaylist, setShowPlaylist] = useState<boolean>(false);

  const activeAarti = currentAarti || AARTIS_DATA[0];

  const handleNext = () => {
    const currentIndex = AARTIS_DATA.findIndex((a) => a.id === activeAarti.id);
    const nextIndex = (currentIndex + 1) % AARTIS_DATA.length;
    onPlay(AARTIS_DATA[nextIndex]);
    onShowToast(`🎶 Next Aarti: ${AARTIS_DATA[nextIndex].title}`);
  };

  const handlePrev = () => {
    const currentIndex = AARTIS_DATA.findIndex((a) => a.id === activeAarti.id);
    const prevIndex = (currentIndex - 1 + AARTIS_DATA.length) % AARTIS_DATA.length;
    onPlay(AARTIS_DATA[prevIndex]);
    onShowToast(`🎶 Previous Aarti: ${AARTIS_DATA[prevIndex].title}`);
  };

  const handleRingBell = () => {
    playTempleBell(840, 0.85);
    onShowToast('🔔 Ghantinaad (घंटीनाद) — Ganapati Bappa Morya!');
  };

  const handleShankha = () => {
    playShankha(3.5, 0.75);
    onShowToast('📯 Sacred Shankha Chime!');
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40">
      
      {/* Expanded Lyrics / Playlist Drawer */}
      {showPlaylist && (
        <div className="max-w-4xl mx-auto px-4 pb-2">
          <div className="bg-[#72370F] backdrop-blur-xl border-2 border-[#D4AF37] rounded-t-3xl p-5 shadow-2xl space-y-4 max-h-80 overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#5D2B0D] pb-3">
              <div className="flex items-center gap-2">
                <ListMusic className="w-5 h-5 text-[#FFD700]" />
                <h4 className="font-festive text-lg font-bold text-[#FFFDD0]">
                  Aarti Playlist (आरती यादी)
                </h4>
              </div>
              <button
                onClick={() => setShowPlaylist(false)}
                className="p-1 rounded-full text-[#FFFDD0] hover:text-[#FFD700] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1.5">
              {AARTIS_DATA.map((aarti, idx) => {
                const isActive = activeAarti.id === aarti.id;
                return (
                  <div
                    key={aarti.id}
                    onClick={() => {
                      onPlay(aarti);
                      setShowPlaylist(false);
                    }}
                    className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                      isActive
                        ? 'bg-[#8B4513] border-2 border-[#FFD700] text-[#FFD700] shadow-md'
                        : 'bg-[#5D2B0D] hover:bg-[#8B4513] text-[#FFFDD0]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold w-5 text-[#FFD700]">{idx + 1}.</span>
                      <div>
                        <p className="text-sm font-bold font-festive font-devanagari-serif">{aarti.title}</p>
                        <p className="text-xs text-[#FFFDD0]/90 font-devanagari-serif">{aarti.subTitle}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isActive && isPlaying && (
                        <span className="text-xs text-[#FFD700] animate-pulse flex items-center gap-1 font-semibold">
                          <Music className="w-3 h-3" /> Playing
                        </span>
                      )}
                      <Play className="w-4 h-4 text-[#FFD700]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Bottom Audio Bar */}
      <div className="bg-[#5D2B0D]/95 backdrop-blur-md border-t-2 border-[#D4AF37] shadow-[0_-8px_30px_rgba(0,0,0,0.6)] px-4 py-3 sm:py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6">
          
          {/* Left: Track Information & Playlist Toggle */}
          <div className="flex items-center gap-3 min-w-0 max-w-[40%] sm:max-w-xs">
            {/* Spinning/pulsing Diya disc */}
            <div 
              onClick={() => setShowPlaylist(!showPlaylist)}
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#D4AF37] border border-white flex items-center justify-center shrink-0 cursor-pointer shadow-md ${
                isPlaying ? 'animate-pulse' : ''
              }`}
              title="View Aarti Playlist"
            >
              <Music className="w-5 h-5 text-[#8B4513]" />
            </div>

            <div className="min-w-0 cursor-pointer" onClick={() => setShowPlaylist(!showPlaylist)}>
              <div className="flex items-center gap-1.5">
                <span className="font-festive text-sm sm:text-base font-bold text-[#FFFDD0] truncate font-devanagari-serif">
                  {activeAarti.title}
                </span>
              </div>
              <p className="text-[11px] text-[#FFD700] truncate font-devanagari-serif">
                {activeAarti.subTitle}
              </p>
            </div>
          </div>

          {/* Center: Audio Playback Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Previous */}
            <button
              onClick={handlePrev}
              className="p-2 text-[#FFFDD0] hover:text-[#FFD700] active:scale-95 transition-colors cursor-pointer"
              title="Previous Aarti"
            >
              <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Main Play / Pause */}
            <button
              onClick={() => {
                if (isPlaying) onPause();
                else onPlay(activeAarti);
              }}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#D4AF37] hover:bg-[#FFD700] text-[#8B4513] border-2 border-white shadow-[0_0_15px_rgba(255,215,0,0.6)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title={isPlaying ? 'Pause' : 'Play Aarti Melody'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </button>

            {/* Next */}
            <button
              onClick={handleNext}
              className="p-2 text-[#FFFDD0] hover:text-[#FFD700] active:scale-95 transition-colors cursor-pointer"
              title="Next Aarti"
            >
              <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Right: Temple Instruments (Bell, Shankha, Volume, Playlist button) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Handheld Bell Sound */}
            <button
              onClick={handleRingBell}
              className="p-2 rounded-xl bg-[#72370F] text-[#FFD700] hover:bg-[#8B4513] border border-[#D4AF37] text-xs flex items-center gap-1.5 active:scale-95 font-semibold cursor-pointer"
              title="Ring Handheld Pooja Bell"
            >
              <HandheldPoojaBellIcon size={16} />
              <span className="hidden md:inline">Bell</span>
            </button>

            {/* Shankha Sound */}
            <button
              onClick={handleShankha}
              className="hidden sm:flex p-2 rounded-xl bg-[#72370F] text-[#FFFDD0] hover:bg-[#8B4513] border border-[#D4AF37] text-xs items-center gap-1.5 active:scale-95 font-semibold cursor-pointer"
              title="Blow Sacred Shankha"
            >
              <Sparkles className="w-4 h-4 text-[#FFD700]" />
              <span className="hidden md:inline">Shankha</span>
            </button>

            {/* Playlist Button */}
            <button
              onClick={() => setShowPlaylist(!showPlaylist)}
              className={`p-2 rounded-xl border transition-all text-xs flex items-center gap-1.5 font-semibold cursor-pointer ${
                showPlaylist
                  ? 'bg-[#FFD700] text-[#8B4513] border-white'
                  : 'bg-[#72370F] text-[#FFD700] border-[#D4AF37] hover:bg-[#8B4513]'
              }`}
              title="Aarti Playlist"
            >
              <ListMusic className="w-4 h-4" />
              <span className="hidden sm:inline">Playlist</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
