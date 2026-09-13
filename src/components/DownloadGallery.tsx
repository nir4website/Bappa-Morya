import React, { useState } from 'react';
import { Eye, Sparkles, Image as ImageIcon, MapPin, ExternalLink, Folder } from 'lucide-react';
import { FAMOUS_TEMPLES } from '../data/templesData.ts';
import { ASHTAVINAYAK_TEMPLES } from '../data/ashtavinayakData.ts';

interface DownloadGalleryProps {
  onOpenLightbox: (imageUrl: string, title: string, subtitle: string, googleMapsUrl?: string, fileName?: string) => void;
  onShowToast: (msg: string) => void;
}

export const DownloadGallery: React.FC<DownloadGalleryProps> = ({ onOpenLightbox }) => {
  const [activeTab, setActiveTab] = useState<'ashtavinayak' | 'famous'>('ashtavinayak');

  return (
    <section id="download-gallery" className="py-16 sm:py-20 bg-gradient-to-b from-[#E35D25] via-[#C94D18] to-[#E35D25] border-t-2 border-[#D4AF37] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8B4513] border border-[#D4AF37] text-xs sm:text-sm font-semibold text-[#FFD700] shadow-md">
            <ImageIcon className="w-4 h-4 text-[#FFD700]" />
            <span>Sacred Wallpaper & Temple Darshan Gallery</span>
          </div>

          <h2 className="font-festive text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFDD0] tracking-tight gold-glow">
            Ganesha Wallpapers & Sacred Shrines
          </h2>

          <p className="text-base sm:text-lg text-[#FFFDD0]/95">
            Explore high-definition Lord Ganesha wallpapers from the sacred Astavinayak yatra and renowned Maharashtra temples with verified Google Maps navigation.
          </p>

          <div className="h-0.5 w-28 mx-auto bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mt-2" />
        </div>

        {/* Wallpaper Tabs & Gallery */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#72370F] pb-4 gap-4">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#FFD700]" />
              <h4 className="font-festive text-xl font-bold text-[#FFD700]">
                HD Wallpaper Gallery
              </h4>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 bg-[#5D2B0D] p-1 rounded-xl border border-[#D4AF37]/60">
              <button
                onClick={() => setActiveTab('ashtavinayak')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'ashtavinayak'
                    ? 'bg-[#FFD700] text-[#8B4513] shadow'
                    : 'text-[#FFFDD0] hover:text-[#FFD700]'
                }`}
              >
                <Folder className="w-3.5 h-3.5" />
                <span>Astavinayak Folder (8)</span>
              </button>
              <button
                onClick={() => setActiveTab('famous')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'famous'
                    ? 'bg-[#FFD700] text-[#8B4513] shadow'
                    : 'text-[#FFFDD0] hover:text-[#FFD700]'
                }`}
              >
                <span>Famous Temples</span>
              </button>
            </div>
          </div>

          {/* Ashtavinayak Folder Images Grid */}
          {activeTab === 'ashtavinayak' && (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
              {ASHTAVINAYAK_TEMPLES.map((temple) => (
                <div
                  key={temple.id}
                  className="bg-[#8B4513] rounded-2xl border-2 border-[#D4AF37] overflow-hidden group hover:border-[#FFD700] shadow-md transition-all flex flex-col justify-between"
                >
                  <div 
                    className="relative h-44 sm:h-48 overflow-hidden cursor-pointer bg-[#5D2B0D]"
                    onClick={() => onOpenLightbox(temple.image, `${temple.order}. ${temple.deity}`, `${temple.location}, ${temple.district}`, temple.googleMapsUrl, temple.folderFileName)}
                  >
                    <img
                      src={temple.image}
                      alt={temple.deity}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'block';
                      }}
                    />
                    <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-[#FFD700] text-[#8B4513] font-bold text-xs flex items-center justify-center shadow">
                      {temple.order}
                    </div>
                  </div>

                  <div className="p-3 space-y-2">
                    <div>
                      <p className="text-xs font-bold text-[#FFD700] truncate" title={temple.deity}>
                        {temple.deity}
                      </p>
                      <p className="text-[10px] text-[#FFFDD0]/75 truncate font-mono">
                        {temple.folderFileName}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 pt-1 border-t border-[#72370F]">
                      <a
                        href={temple.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1 px-2 rounded-lg bg-white hover:bg-[#FFFDD0] text-[#1A73E8] text-[11px] font-bold border border-[#D4AF37] flex items-center justify-center gap-1 transition-all active:scale-95"
                        title="Google Location"
                      >
                        <MapPin className="w-3 h-3 text-[#EA4335]" />
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>

                      <button
                        onClick={() => onOpenLightbox(temple.image, `${temple.order}. ${temple.deity}`, `${temple.location}, ${temple.district}`, temple.googleMapsUrl, temple.folderFileName)}
                        className="flex-1 py-1.5 px-2 rounded-lg bg-[#D4AF37] hover:bg-[#FFD700] text-[#8B4513] text-[11px] font-bold border border-white flex items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer"
                        title={`View Darshan of ${temple.deity}`}
                      >
                        <Eye className="w-3 h-3 text-[#8B4513]" />
                        <span>Darshan</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Famous Temples Grid */}
          {activeTab === 'famous' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {FAMOUS_TEMPLES.slice(0, 6).map((temple) => (
                <div
                  key={temple.id}
                  className="bg-[#8B4513] rounded-2xl border-2 border-[#D4AF37] overflow-hidden group hover:border-[#FFD700] shadow-md transition-all flex flex-col justify-between"
                >
                  <div 
                    className="relative h-32 sm:h-36 overflow-hidden cursor-pointer bg-[#5D2B0D]"
                    onClick={() => onOpenLightbox(temple.image, `${temple.nameEn} (${temple.name})`, temple.location)}
                  >
                    <img
                      src={temple.image}
                      alt={temple.nameEn}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'block';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  </div>

                  <div className="p-3 space-y-2">
                    <p className="text-xs font-bold text-[#FFFDD0] truncate text-center" title={temple.nameEn}>
                      {temple.nameEn}
                    </p>
                    
                    <button
                      onClick={() => onOpenLightbox(temple.image, `${temple.nameEn} (${temple.name})`, temple.location)}
                      className="w-full py-1.5 px-2 rounded-lg bg-[#D4AF37] hover:bg-[#FFD700] text-[#8B4513] text-[11px] font-bold border border-white flex items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer"
                      title={`View Darshan of ${temple.nameEn}`}
                    >
                      <Eye className="w-3 h-3 text-[#8B4513]" />
                      <span>Darshan</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
