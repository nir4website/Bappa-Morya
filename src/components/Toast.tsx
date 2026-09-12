import React from 'react';
import { Sparkles } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed top-20 right-4 sm:right-8 z-50 animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-none">
      <div className="bg-[#5D2B0D] text-[#FFFDD0] px-4 py-3 rounded-2xl border-2 border-[#D4AF37] shadow-[0_4px_25px_rgba(227,93,37,0.5)] backdrop-blur-md flex items-center gap-3 text-sm font-semibold max-w-sm">
        <div className="w-8 h-8 rounded-full bg-[#D4AF37] border border-white flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4 text-[#8B4513]" />
        </div>
        <p className="font-devanagari-serif">{message}</p>
      </div>
    </div>
  );
};
