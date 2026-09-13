import React, { useState } from 'react';
import { Eye, MapPin, Sparkles, Info } from 'lucide-react';
import { FAMOUS_TEMPLES } from '../data/templesData.ts';
import { GanapatiTemple } from '../types.ts';

interface GanapatiDarshanProps {
  onOpenLightbox: (imageUrl: string, title: string, subtitle: string) => void;
  onShowToast?: (msg: string) => void;
}

export const GanapatiDarshan: React.FC<GanapatiDarshanProps> = ({ onOpenLightbox }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'mumbai' | 'pune'>('all');
  const [expandedInfoId, setExpandedInfoId] = useState<string | null>(null);

  const filteredTemples = FAMOUS_TEMPLES.filter((temple) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'mumbai') return temple.district.includes('Mumbai') || temple.district.includes('Thane') || temple.location.includes('Mumbai');
    if (selectedFilter === 'pune') return temple.district.includes('Pune') || temple.location.includes('Pune') || temple.district.includes('Ahilyanagar');
    return true;
  });

  const toggleInfo = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedInfoId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="darshan" className="py-16 sm:py-20 bg-gradient-to-b from-[#E35D25] via-[#C94D18] to-[#E35D25] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header in English with Marathi Subheading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B4513] border border-[#D4AF37] text-xs sm:text-sm font-semibold text-[#FFD700] shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sacred Temple Sanctuaries</span>
          </div>

          <h2 className="font-festive text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFDD0] tracking-tight gold-glow">
            Ganapati Darshan
          </h2>

          <p className="text-base sm:text-lg text-[#FFFDD0]/90">
            Discover the iconic, historic, and wish-fulfilling Ganesha temples of Maharashtra.
          </p>

          <div className="h-0.5 w-24 mx-auto bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mt-2" />
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-10">
          {[
            { id: 'all', label: 'All Temples (सर्व मंदिरे)' },
            { id: 'mumbai', label: 'Mumbai & MMR (मुंबई)' },
            { id: 'pune', label: 'Pune Region (पुणे)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id as typeof selectedFilter)}
              className={`px-4 sm:px-5 py-2 rounded-xl text-sm font-bold transition-all duration-200 border cursor-pointer ${
                selectedFilter === tab.id
                  ? 'bg-[#FFD700] text-[#8B4513] border-white shadow-[0_0_15px_rgba(255,215,0,0.5)]'
                  : 'bg-[#8B4513] text-[#FFFDD0] border-[#D4AF37]/50 hover:bg-[#5D2B0D] hover:text-[#FFD700]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Temple Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTemples.map((temple) => (
            <div
              key={temple.id}
              onClick={() => onOpenLightbox(temple.image, `${temple.nameEn} (${temple.name})`, temple.location)}
              className="bg-[#8B4513] rounded-2xl border-2 border-[#D4AF37] hover:border-[#FFD700] shadow-xl hover:shadow-[0_8px_30px_rgba(255,215,0,0.3)] transition-all duration-300 flex flex-col overflow-hidden group cursor-pointer"
            >
              {/* Card Image with Hover Zoom */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-[#5D2B0D]">
                <img
                  src={temple.image}
                  alt={temple.imageAlt}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'block';
                  }}
                />
                
                {/* Gradient shade */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#8B4513] via-transparent to-black/25" />

                {/* Location Badge */}
                <div className="absolute top-3 left-3 bg-[#5D2B0D]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#D4AF37] flex items-center gap-1.5 shadow-md">
                  <MapPin className="w-3.5 h-3.5 text-[#FFD700]" />
                  <span className="text-xs font-semibold text-[#FFFDD0]">{temple.location}</span>
                </div>

                {/* Lightbox Quick View Eye icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#5D2B0D]/90 text-[#FFD700] border border-[#D4AF37] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="space-y-0.5">
                    <h3 className="font-festive text-xl sm:text-2xl font-bold text-[#FFD700] group-hover:text-white transition-colors">
                      {temple.nameEn}
                    </h3>
                    <div className="text-xs text-[#FFFDD0]/80 font-devanagari-serif font-bold">
                      {temple.name}
                    </div>
                  </div>

                  {/* Expandable History snippet */}
                  {expandedInfoId === temple.id && (
                    <div className="mt-3 p-3 rounded-lg bg-[#72370F] border border-[#D4AF37]/50 text-xs text-[#FFFDD0] space-y-1 animate-in fade-in duration-200">
                      <span className="font-bold text-[#FFD700] block">Historical Significance:</span>
                      <p>{temple.historicalSignificance}</p>
                    </div>
                  )}
                </div>

                {/* Card Action Buttons */}
                <div className="pt-2 flex items-center gap-2 border-t border-[#72370F]">
                  {/* Historical Info Toggle */}
                  <button
                    onClick={(e) => toggleInfo(temple.id, e)}
                    className="p-2.5 rounded-xl bg-[#72370F] text-[#FFD700] hover:bg-[#5D2B0D] border border-[#D4AF37]/50 transition-colors cursor-pointer"
                    title={expandedInfoId === temple.id ? 'Hide details' : 'Read historical significance'}
                  >
                    <Info className="w-4 h-4" />
                  </button>

                  {/* View Darshan Button */}
                  <button
                    onClick={() => onOpenLightbox(temple.image, `${temple.nameEn} (${temple.name})`, temple.location)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#FFD700] text-[#8B4513] text-xs sm:text-sm font-bold border border-white shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 group/btn cursor-pointer"
                    title={`View Darshan of ${temple.nameEn}`}
                  >
                    <Eye className="w-4 h-4 text-[#8B4513]" />
                    <span>View Darshan</span>
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
