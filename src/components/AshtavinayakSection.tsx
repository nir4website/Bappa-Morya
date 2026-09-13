import React from 'react';
import { Eye, MapPin, Compass, ExternalLink, Folder } from 'lucide-react';
import { ASHTAVINAYAK_TEMPLES } from '../data/ashtavinayakData.ts';
import { AshtavinayakTemple } from '../types.ts';

interface AshtavinayakSectionProps {
  onOpenLightbox: (imageUrl: string, title: string, subtitle: string, googleMapsUrl?: string, fileName?: string) => void;
  onShowToast?: (msg: string) => void;
}

export const AshtavinayakSection: React.FC<AshtavinayakSectionProps> = ({ onOpenLightbox, onShowToast }) => {
  return (
    <section id="ashtavinayak" className="py-16 sm:py-20 bg-gradient-to-b from-[#E35D25] via-[#C94D18] to-[#E35D25] border-t-2 border-b-2 border-[#D4AF37] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8B4513] border border-[#D4AF37] text-xs sm:text-sm font-semibold text-[#FFD700] shadow-md">
            <Compass className="w-4 h-4 text-[#FFD700]" />
            <span>Sacred Pilgrimage Circuit & Google Locations</span>
          </div>

          <h2 className="font-festive text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFDD0] tracking-tight gold-glow">
            Ashtavinayak Darshan & Locations
          </h2>

          <p className="text-base sm:text-lg text-[#FFFDD0]/95 leading-relaxed">
            The eight self-manifested (Swayambhu) shrines of Lord Ganesha in Maharashtra with authentic deity murtis and direct Google Maps locations for pilgrimage navigation.
          </p>

          <div className="h-0.5 w-28 mx-auto bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mt-2" />
        </div>

        {/* 8 Ashtavinayak Cards Grid (4x2 on large screens) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {ASHTAVINAYAK_TEMPLES.map((temple) => (
            <div
              key={temple.id}
              onClick={() => onOpenLightbox(temple.image, `${temple.order}. ${temple.deity}`, `${temple.location}, ${temple.district}`, temple.googleMapsUrl, temple.folderFileName)}
              className="bg-[#8B4513] rounded-2xl border-2 border-[#D4AF37] hover:border-[#FFD700] shadow-xl hover:shadow-[0_8px_25px_rgba(255,215,0,0.3)] transition-all duration-300 flex flex-col overflow-hidden group cursor-pointer"
            >
              {/* Image Container with Order Badge */}
              <div className="relative h-56 overflow-hidden bg-[#5D2B0D]">
                <img
                  src={temple.image}
                  alt={temple.deity}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'block';
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#8B4513] via-transparent to-black/20" />

                {/* Sequence Badge (1 to 8) */}
                <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-[#FFD700] text-[#8B4513] border-2 border-white font-bold text-sm flex items-center justify-center shadow-lg font-festive">
                  {temple.order}
                </div>

                {/* Lightbox Eye trigger */}
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#5D2B0D]/90 text-[#FFD700] border border-[#D4AF37] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                  <Eye className="w-3.5 h-3.5" />
                </div>

                {/* District Badge */}
                <div className="absolute bottom-2 left-3 bg-[#5D2B0D]/90 px-2.5 py-0.5 rounded-full border border-[#D4AF37] flex items-center gap-1 text-[11px] text-[#FFFDD0]">
                  <MapPin className="w-3 h-3 text-[#FFD700]" />
                  <span>{temple.district}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div>
                    <h3 className="font-festive text-lg sm:text-xl font-bold text-[#FFD700] group-hover:text-white transition-colors leading-snug">
                      {temple.deity}
                    </h3>
                    <div className="text-xs text-[#FFFDD0]/80 font-devanagari-serif font-semibold">
                      {temple.name}
                    </div>
                  </div>

                  {/* Folder Filename Badge */}
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#5D2B0D] text-[#FFD700] border border-[#D4AF37]/40 text-[10px] font-mono truncate max-w-full">
                    <Folder className="w-2.5 h-2.5 text-[#FFD700] shrink-0" />
                    <span className="truncate">Astavinayak/{temple.folderFileName}</span>
                  </div>

                  <p className="text-xs text-[#FFFDD0] leading-relaxed line-clamp-3">
                    {temple.description}
                  </p>

                  {/* Sthala-purana snippet */}
                  <div className="pt-1 text-[11px] text-[#FFFDD0]/90 italic border-l-2 border-[#FFD700] pl-2 line-clamp-2">
                    <span className="font-semibold text-[#FFD700] not-italic">Legend: </span>
                    {temple.legend}
                  </div>
                </div>

                {/* Action Buttons: Google Location & Full Darshan */}
                <div className="pt-3 border-t border-[#72370F] flex items-center gap-2">
                  {/* Google Location */}
                  <a
                    href={temple.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 py-2 px-2.5 rounded-xl bg-white hover:bg-[#FFFDD0] text-[#1A73E8] hover:text-[#174EA6] text-xs font-bold border border-[#D4AF37] shadow transition-all flex items-center justify-center gap-1 active:scale-95 cursor-pointer group/loc"
                    title={`Open Google Maps location for ${temple.deity}`}
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#EA4335] shrink-0" />
                    <span className="truncate">Google Location</span>
                    <ExternalLink className="w-3 h-3 text-[#1A73E8] shrink-0" />
                  </a>

                  {/* View Full Darshan */}
                  <button
                    onClick={() => onOpenLightbox(temple.image, `${temple.deity} (${temple.name})`, temple.location, temple.googleMapsUrl, temple.downloadFilename)}
                    className="py-2 px-3 rounded-xl bg-[#D4AF37] hover:bg-[#FFD700] text-[#8B4513] text-xs font-bold border border-white shadow transition-all flex items-center justify-center gap-1 active:scale-95 cursor-pointer shrink-0"
                    title={`View Darshan of ${temple.deity}`}
                  >
                    <Eye className="w-3.5 h-3.5 text-[#8B4513]" />
                    <span>Darshan</span>
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
