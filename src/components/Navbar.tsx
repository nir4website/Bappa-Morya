import React, { useState } from 'react';
import { Menu, X, Volume2, VolumeX, Sparkles, WifiOff } from 'lucide-react';
import { playTempleBell, playShankha } from '../utils/audioSynth.ts';
import { HandheldPoojaBellIcon } from './FestiveIcons.tsx';

interface NavbarProps {
  onShowToast: (msg: string) => void;
  isAudioPlaying?: boolean;
  onToggleAudio?: () => void;
  isOffline?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onShowToast, isAudioPlaying, onToggleAudio, isOffline }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Ganapati Darshan', href: '#darshan' },
    { name: 'Ashtavinayak', href: '#ashtavinayak' },
    { name: 'Aarti Sangrah', href: '#aarti' },
    { name: 'Mantras', href: '#mantra' },
    { name: 'Wallpapers', href: '#download-gallery' },
  ];

  const handleRingBell = () => {
    playTempleBell(840, 0.85);
    onShowToast('🔔 Temple Bell (टण...) — Ganapati Bappa Morya!');
  };

  const handleBlowShankha = () => {
    playShankha(3.5, 0.7);
    onShowToast('📯 Sacred Shankha Chime — Auspicious Ganesh Utsav!');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#8B4513] border-b-2 border-[#D4AF37] shadow-xl transition-all">
      {/* Decorative Golden Line Strip at Very Top */}
      <div className="h-1 w-full bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand Name */}
          <a href="#home" className="flex items-center gap-3 group">
            {/* Om Circular Badge */}
            <div className="w-10 h-10 bg-[#FFD700] rounded-full flex items-center justify-center text-[#8B4513] font-bold text-xl shadow-md group-hover:scale-105 transition-transform font-devanagari-serif">
              <span>ॐ</span>
            </div>
            
            <div className="flex flex-col">
              <span className="font-festive text-xl sm:text-2xl font-bold tracking-wider text-[#FFFDD0] group-hover:text-[#FFD700] transition-colors gold-glow">
                Bappa Morya
              </span>
              <span className="text-[10px] sm:text-xs text-[#FFFDD0]/80 font-medium tracking-wider -mt-0.5">
                Lord Ganesha & Ganesh Festival 🙏
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-5 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-2.5 py-1 text-[#FFFDD0] hover:text-[#FFD700] hover:border-b-2 hover:border-[#FFD700] transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Interactive Temple Sound Shortcuts & Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Offline Status Badge if disconnected */}
            {isOffline && (
              <div 
                className="px-2.5 py-1 rounded-full bg-[#C94D18] border border-[#FFD700] text-[#FFFDD0] text-xs font-bold flex items-center gap-1.5 shadow-sm animate-pulse"
                title="Offline Mode Active - Aartis and Darshan available offline"
              >
                <WifiOff className="w-3.5 h-3.5" />
                <span>Offline</span>
              </div>
            )}

            {/* Quick Handheld Pooja Bell Ring Button */}
            <button
              onClick={handleRingBell}
              className="px-3 py-1.5 rounded-full bg-[#72370F] border border-[#D4AF37]/60 text-[#FFD700] hover:bg-[#5D2B0D] hover:border-[#FFD700] text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer"
              title="Ring Handheld Pooja Bell"
            >
              <HandheldPoojaBellIcon size={16} />
              <span>Bell</span>
            </button>

            {/* Quick Shankha Button */}
            <button
              onClick={handleBlowShankha}
              className="px-3 py-1.5 rounded-full bg-[#72370F] border border-[#D4AF37]/60 text-[#FFFDD0] hover:bg-[#5D2B0D] hover:border-[#FFD700] text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer"
              title="Blow Sacred Shankha"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
              <span>Shankha</span>
            </button>

            {/* Aarti Audio Toggle */}
            {onToggleAudio && (
              <button
                onClick={onToggleAudio}
                className={`p-2 rounded-full border transition-all cursor-pointer ${
                  isAudioPlaying
                    ? 'bg-[#E35D25] text-[#FFFDD0] border-[#FFD700] shadow-[0_0_10px_#E35D25]'
                    : 'bg-[#72370F] text-[#FFD700] border-[#D4AF37]/60 hover:bg-[#5D2B0D]'
                }`}
                title={isAudioPlaying ? 'Pause Aarti Melody' : 'Play Aarti Melody'}
              >
                {isAudioPlaying ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
              </button>
            )}

            {/* Action CTA Button */}
            <a
              href="#darshan"
              className="bg-[#FFD700] text-[#8B4513] px-5 py-2 rounded-full font-bold text-sm shadow-lg hover:bg-white transition-all active:scale-95"
            >
              Temple Darshan
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={handleRingBell}
              className="p-2 rounded-lg bg-[#72370F] border border-[#D4AF37]/60 text-[#FFD700] cursor-pointer"
              title="Ring Handheld Pooja Bell"
            >
              <HandheldPoojaBellIcon size={18} />
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#72370F] border border-[#D4AF37]/60 text-[#FFFDD0] hover:text-[#FFD700] cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#72370F] border-b-2 border-[#D4AF37] px-4 pt-2 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-base font-semibold text-[#FFFDD0] hover:bg-[#8B4513] hover:text-[#FFD700] border-l-2 border-transparent hover:border-[#FFD700] transition-all"
            >
              {link.name}
            </a>
          ))}

          <div className="pt-3 flex items-center justify-between border-t border-[#8B4513] gap-2">
            <button
              onClick={() => {
                handleBlowShankha();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 px-3 rounded-lg bg-[#8B4513] text-[#FFD700] text-sm font-semibold border border-[#D4AF37]/60 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" /> Shankha
            </button>
            
            {onToggleAudio && (
              <button
                onClick={() => {
                  onToggleAudio();
                  setMobileMenuOpen(false);
                }}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold border flex items-center justify-center gap-2 cursor-pointer ${
                  isAudioPlaying
                    ? 'bg-[#E35D25] text-white border-[#FFD700]'
                    : 'bg-[#8B4513] text-[#FFD700] border-[#D4AF37]/60'
                }`}
              >
                {isAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span>{isAudioPlaying ? 'Playing' : 'Play Aarti'}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
