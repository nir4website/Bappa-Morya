import React from 'react';
import { Share2, ArrowUp } from 'lucide-react';
import { playTempleBell } from '../utils/audioSynth.ts';

interface FooterProps {
  onShowToast: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onShowToast }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: 'BAPPA MORYA — Lord Ganesha & Ganesh Festival',
        text: 'Experience the divine darshan of famous Ganapati temples, the 8 Ashtavinayak pilgrimage, and Marathi Aartis on Bappa Morya!',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      onShowToast('🔗 Website link copied to clipboard! Share with family and friends.');
    }
  };

  const handleRingBell = () => {
    playTempleBell(2250, 0.85);
    onShowToast('🔔 Ganapati Bappa Morya! Mangal Moorti Morya!');
  };

  return (
    <footer className="bg-[#5D2B0D] border-t-2 border-[#D4AF37] text-[#FFFDD0] pt-14 pb-28 sm:pb-24 relative overflow-hidden">
      
      {/* Top Toran Decorative Accent */}
      <div className="h-2 w-full bg-gradient-to-r from-[#E35D25] via-[#FFD700] to-[#E35D25] absolute top-0 inset-x-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Devotional Greeting Banner */}
        <div className="text-center space-y-3">
          <div 
            className="inline-block p-1 rounded-full bg-gradient-to-r from-[#FFD700] via-[#E35D25] to-[#FFD700] mb-2 cursor-pointer shadow-lg" 
            onClick={handleRingBell} 
            title="Click to ring bell"
          >
            <div className="w-12 h-12 rounded-full bg-[#8B4513] border-2 border-[#FFD700] flex items-center justify-center text-2xl text-[#FFD700] font-bold font-devanagari-serif">
              ॐ
            </div>
          </div>

          <h2 className="font-festive text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFDD0] tracking-wide gold-glow">
            गणपती बाप्पा मोरया! मंगलमूर्ती मोरया! 🙏
          </h2>

          <p className="text-base sm:text-lg text-[#FFD700] font-bold tracking-widest uppercase">
            ॥ Happy Ganesh Chaturthi & Ganesh Utsav ॥
          </p>

          <p className="text-sm text-[#FFFDD0]/90 max-w-2xl mx-auto leading-relaxed">
            May Lord Ganesha bestow joy, auspiciousness, good health, and peace upon you and your family.
          </p>
        </div>

        {/* Quick Links & Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-b border-[#72370F] py-8 text-center md:text-left">
          
          {/* Col 1: About */}
          <div className="space-y-3">
            <h4 className="font-festive text-lg font-bold text-[#FFD700]">
              BAPPA MORYA
            </h4>
            <p className="text-xs text-[#FFFDD0]/85 leading-relaxed">
              A sacred devotional platform celebrating the rich heritage of Maharashtra's Ganesh Utsav, historic temples, the Ashtavinayak yatra, and traditional Marathi Aartis.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-festive text-base font-bold text-[#FFD700]">
              Key Sections
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#darshan" className="hover:text-[#FFD700] transition-colors">Ganapati Darshan (Famous Temples)</a></li>
              <li><a href="#ashtavinayak" className="hover:text-[#FFD700] transition-colors">Ashtavinayak (8 Sacred Shrines)</a></li>
              <li><a href="#aarti" className="hover:text-[#FFD700] transition-colors">Marathi Aarti Sangrah</a></li>
              <li><a href="#mantra" className="hover:text-[#FFD700] transition-colors">Ghalin Lotangan & Mantras</a></li>
            </ul>
          </div>

          {/* Col 3: Features & Downloads */}
          <div className="space-y-3">
            <h4 className="font-festive text-base font-bold text-[#FFD700]">
              Sacred Features
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#download-gallery" className="hover:text-[#FFD700] transition-colors">HD Wallpaper Downloads</a></li>
              <li><a href="#aarti" className="hover:text-[#FFD700] transition-colors">Interactive Brass Aarti Thali</a></li>
              <li><a href="#mantra" className="hover:text-[#FFD700] transition-colors">Pushpavrushti (Flower Shower)</a></li>
              <li><a href="#home" className="hover:text-[#FFD700] transition-colors">Handheld Bell & Shankha Audio</a></li>
            </ul>
          </div>

          {/* Col 4: Share with Family */}
          <div className="space-y-3 flex flex-col items-center md:items-start">
            <h4 className="font-festive text-base font-bold text-[#FFD700]">
              Share with Devotees
            </h4>
            <p className="text-xs text-[#FFFDD0]/85">
              Spread festive joy by sharing this devotional website with family and friends.
            </p>
            <button
              onClick={handleShareApp}
              className="mt-1 py-2.5 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#FFD700] text-[#8B4513] text-xs font-bold border border-white shadow-md flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-[#8B4513]" />
              <span>Share Website</span>
            </button>
          </div>

        </div>

        {/* Bottom Copyright & Scroll to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFFDD0]/75">
          <div className="flex items-center gap-1">
            <span>Crafted with devotion for Ganesh Chaturthi & Ganesh Utsav</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-bold text-[#FFD700] font-devanagari-serif">॥ गणपती बाप्पा मोरया ॥</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-[#72370F] text-[#FFD700] hover:bg-[#8B4513] border border-[#D4AF37] flex items-center gap-1 transition-all cursor-pointer"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="text-[11px]">Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
