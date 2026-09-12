import React, { useEffect } from 'react';
import { X, Download, MapPin, ExternalLink, Folder } from 'lucide-react';

interface ImageLightboxProps {
  isOpen: boolean;
  imageUrl: string;
  title: string;
  subtitle: string;
  googleMapsUrl?: string;
  fileName?: string;
  onClose: () => void;
  onShowToast?: (msg: string) => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  isOpen,
  imageUrl,
  title,
  subtitle,
  googleMapsUrl,
  fileName,
  onClose,
  onShowToast
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const link = document.createElement('a');
      link.href = imageUrl;
      const downloadName = fileName || `${title.replace(/[^a-zA-Z0-9\u0900-\u097F]/g, '-')}-bappa-morya.jpg`;
      link.download = downloadName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      if (onShowToast) onShowToast(`📥 Downloaded ${downloadName}!`);
    } catch {
      window.open(imageUrl, '_blank');
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
    >
      {/* Modal Dialog Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full bg-[#8B4513] rounded-3xl border-2 border-[#D4AF37] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header Bar */}
        <div className="px-5 py-3.5 sm:px-6 sm:py-4 bg-[#72370F] border-b border-[#5D2B0D] flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 id="lightbox-title" className="font-festive text-lg sm:text-2xl font-bold text-[#FFFDD0] truncate">
              {title}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mt-0.5">
              {subtitle && (
                <p className="text-xs sm:text-sm text-[#FFD700] flex items-center gap-1 font-medium truncate">
                  <MapPin className="w-3.5 h-3.5 text-[#FFD700] shrink-0" />
                  <span>{subtitle}</span>
                </p>
              )}
              {fileName && (
                <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-[#5D2B0D] text-[#FFFDD0]/90 border border-[#D4AF37]/50 font-mono">
                  <Folder className="w-3 h-3 text-[#FFD700]" />
                  <span>Astavinayak/{fileName}</span>
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Google Location Link */}
            {googleMapsUrl && (
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="py-1.5 px-3 rounded-xl bg-white hover:bg-[#FFFDD0] text-[#1A73E8] hover:text-[#174EA6] text-xs sm:text-sm font-bold border border-[#D4AF37] flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                title="Open Google Maps Location & Directions"
              >
                <MapPin className="w-3.5 h-3.5 text-[#EA4335]" />
                <span className="hidden xs:inline">Google Location</span>
                <ExternalLink className="w-3 h-3 text-[#1A73E8]" />
              </a>
            )}

            {/* Download */}
            <button
              onClick={handleDownload}
              className="py-1.5 px-3 sm:py-2 sm:px-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#FFD700] text-[#8B4513] text-xs sm:text-sm font-bold border border-white flex items-center gap-1.5 transition-all active:scale-95 shadow-md cursor-pointer"
              title="Download wallpaper"
            >
              <Download className="w-3.5 h-3.5 text-[#8B4513]" />
              <span className="hidden sm:inline">Download</span>
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-xl bg-[#5D2B0D] text-[#FFFDD0] hover:text-[#FFD700] hover:bg-[#72370F] border border-[#D4AF37] transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image Display Area */}
        <div className="relative flex-1 bg-[#5D2B0D] flex items-center justify-center p-2 sm:p-4 overflow-hidden min-h-[300px]">
          <img
            src={imageUrl}
            alt={title}
            className="max-h-[68vh] w-auto object-contain rounded-xl shadow-lg border border-[#D4AF37]"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'block';
            }}
          />
        </div>

        {/* Bottom Devotional Ribbon */}
        <div className="px-5 py-2 sm:px-6 sm:py-2.5 bg-[#72370F] border-t border-[#5D2B0D] flex items-center justify-between text-xs text-[#FFFDD0]">
          <span className="font-festive text-[#FFD700] font-bold truncate">॥ Ganapati Bappa Morya • Mangal Moorti Morya ॥</span>
          <span className="text-[11px] text-[#FFFDD0]/80 shrink-0 ml-2">Press ESC to close</span>
        </div>

      </div>
    </div>
  );
};
