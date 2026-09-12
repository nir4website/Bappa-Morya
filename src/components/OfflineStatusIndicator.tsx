import React from 'react';
import { WifiOff, CheckCircle2, CloudDownload, RefreshCw, X } from 'lucide-react';

interface OfflineStatusIndicatorProps {
  isOffline: boolean;
  isCachedReady: boolean;
  onRefreshCache?: () => void;
  onDismissOfflineBanner?: () => void;
}

export const OfflineStatusIndicator: React.FC<OfflineStatusIndicatorProps> = ({
  isOffline,
  isCachedReady,
  onRefreshCache,
  onDismissOfflineBanner,
}) => {
  if (!isOffline && !isCachedReady) return null;

  return (
    <aside aria-label="Offline Mode Status" className="sticky top-16 z-30 w-full transition-all">
      {isOffline ? (
        <div className="bg-[#5D2B0D] border-b border-[#D4AF37] px-4 py-2 text-[#FFFDD0] shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm">
            
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="p-1 rounded-full bg-[#C94D18] text-[#FFFDD0] shrink-0 animate-pulse">
                <WifiOff className="w-3.5 h-3.5" />
              </span>
              <div className="truncate">
                <span className="font-bold text-[#FFD700]">Offline Mode Active: </span>
                <span className="text-[#FFFDD0]/90">
                  All Marathi Aarti texts, mantras, pooja bells, and temple darshan images are available offline!
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-semibold text-[#FFD700] bg-[#8B4513] px-2 py-0.5 rounded-full border border-[#D4AF37]/50">
                <CheckCircle2 className="w-3 h-3 text-[#FFD700]" />
                <span>Offline Cached</span>
              </span>

              {onDismissOfflineBanner && (
                <button
                  onClick={onDismissOfflineBanner}
                  className="p-1 text-[#FFFDD0]/70 hover:text-[#FFFDD0] rounded-lg transition-colors cursor-pointer"
                  title="Dismiss alert"
                  aria-label="Dismiss offline banner"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        </div>
      ) : null}
    </aside>
  );
};
