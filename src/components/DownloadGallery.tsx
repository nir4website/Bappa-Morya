import React, { useState } from 'react';
import { Download, Sparkles, Image as ImageIcon, FileText, MapPin, ExternalLink, Folder } from 'lucide-react';
import { FAMOUS_TEMPLES } from '../data/templesData.ts';
import { ASHTAVINAYAK_TEMPLES } from '../data/ashtavinayakData.ts';
import { AARTIS_DATA } from '../data/aartisData.ts';

interface DownloadGalleryProps {
  onOpenLightbox: (imageUrl: string, title: string, subtitle: string, googleMapsUrl?: string, fileName?: string) => void;
  onShowToast: (msg: string) => void;
}

export const DownloadGallery: React.FC<DownloadGalleryProps> = ({ onOpenLightbox, onShowToast }) => {
  const [activeTab, setActiveTab] = useState<'ashtavinayak' | 'famous'>('ashtavinayak');

  const handleDownloadAllAartis = () => {
    let combinedContent = `॥ श्री गणेशाय नम: ॥\n\n=========================================\nBAPPA MORYA — संपूर्ण मराठी आरती संग्रह व मंत्र\n=========================================\n\n`;
    
    AARTIS_DATA.forEach((a, i) => {
      combinedContent += `[${i + 1}] ${a.title}\n(${a.subTitle})\n\n${a.lyrics.join('\n')}\n\nभावार्थ: ${a.meaning || ''}\n\n-----------------------------------------\n\n`;
    });

    combinedContent += `॥ गणपती बाप्पा मोरया, मंगलमूर्ती मोरया ॥\n॥ शुभ गणेशोत्सव ॥`;

    const blob = new Blob([combinedContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'bappa-morya-complete-marathi-aartis.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    onShowToast('📥 Downloaded Complete Marathi Aarti Sangrah file!');
  };

  const handleDownloadImage = (imgUrl: string, filename: string, title: string) => {
    try {
      const link = document.createElement('a');
      link.href = imgUrl;
      link.download = filename;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      onShowToast(`📥 Downloaded ${filename}!`);
    } catch {
      window.open(imgUrl, '_blank');
      onShowToast(`📥 Opened ${filename}!`);
    }
  };

  return (
    <section id="download-gallery" className="py-16 sm:py-20 bg-gradient-to-b from-[#E35D25] via-[#C94D18] to-[#E35D25] border-t-2 border-[#D4AF37] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8B4513] border border-[#D4AF37] text-xs sm:text-sm font-semibold text-[#FFD700] shadow-md">
            <Download className="w-4 h-4 text-[#FFD700]" />
            <span>Devotional Downloads & Locations Hub</span>
          </div>

          <h2 className="font-festive text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFDD0] tracking-tight gold-glow">
            Ganesha Wallpapers & Aarti Downloads
          </h2>

          <p className="text-base sm:text-lg text-[#FFFDD0]/95">
            Download high-definition Lord Ganesha wallpapers from the Astavinayak folder and the complete Marathi Aarti book for your poojas and mobile devices.
          </p>

          <div className="h-0.5 w-28 mx-auto bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mt-2" />
        </div>

        {/* All-in-One Download Banner */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#8B4513] via-[#72370F] to-[#5D2B0D] border-2 border-[#D4AF37] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFD700] uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Complete Collection</span>
            </div>
            <h3 className="font-festive text-2xl sm:text-3xl font-bold text-[#FFFDD0]">
              Download All Marathi Aartis in One File
            </h3>
            <p className="text-xs sm:text-sm text-[#FFFDD0]/90 max-w-xl">
              Includes Sukhkarta Dukhharta, Durge Durgat Bhari, Lavthavati Vikrala, Ghalin Lotangan, and Vedic Mantrapushpanjali with meanings in one clean text file.
            </p>
          </div>

          <button
            onClick={handleDownloadAllAartis}
            className="px-6 py-3.5 rounded-2xl bg-[#D4AF37] hover:bg-[#FFD700] text-[#8B4513] font-extrabold text-base border border-white shadow-[0_0_20px_rgba(255,215,0,0.5)] flex items-center gap-2.5 active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            <FileText className="w-5 h-5 text-[#8B4513]" />
            <span>Download All Aartis (.txt)</span>
          </button>
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
                        onClick={() => handleDownloadImage(temple.image, temple.downloadFilename, temple.deity)}
                        className="flex-1 py-1.5 px-2 rounded-lg bg-[#D4AF37] hover:bg-[#FFD700] text-[#8B4513] text-[11px] font-bold border border-white flex items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer"
                        title={`Download ${temple.downloadFilename}`}
                      >
                        <Download className="w-3 h-3 text-[#8B4513]" />
                        <span>Download</span>
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
                      onClick={() => handleDownloadImage(temple.image, temple.downloadFilename, temple.nameEn)}
                      className="w-full py-1.5 px-2 rounded-lg bg-[#D4AF37] hover:bg-[#FFD700] text-[#8B4513] text-[11px] font-bold border border-white flex items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer"
                    >
                      <Download className="w-3 h-3 text-[#8B4513]" />
                      <span>Download</span>
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
