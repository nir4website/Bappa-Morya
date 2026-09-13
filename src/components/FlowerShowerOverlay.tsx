import React, { useState, useEffect } from 'react';
import { RedHibiscus } from './FestiveIcons.tsx';

interface HibiscusFlowerItem {
  id: string;
  left: number;
  size: number;
  delay: number;
  duration: number;
  isReverse: boolean;
  opacity: number;
}

export const FlowerShowerOverlay: React.FC = () => {
  const [flowers, setFlowers] = useState<HibiscusFlowerItem[]>([]);
  const [showBadge, setShowBadge] = useState<boolean>(false);

  useEffect(() => {
    const handleShowerEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ count?: number }>;
      const count = customEvent.detail?.count || 28;
      const now = Date.now();

      const newBatch: HibiscusFlowerItem[] = Array.from({ length: count }, (_, i) => {
        // Evenly distribute across screen with slight organic jitter
        const spread = (i * (94 / count) + (Math.random() * 4)) % 94 + 3;
        return {
          id: `${now}-${i}`,
          left: Math.max(2, Math.min(96, spread)),
          size: Math.floor(24 + Math.random() * 26), // 24px to 50px
          delay: +(Math.random() * 0.95).toFixed(2),
          duration: +(3.8 + Math.random() * 1.2).toFixed(2),
          isReverse: Math.random() > 0.5,
          opacity: +(0.88 + Math.random() * 0.12).toFixed(2)
        };
      });

      setFlowers((prev) => [...prev, ...newBatch]);
      setShowBadge(true);

      // Hide badge after 3.5s and cleanup batch after 5.6s
      setTimeout(() => {
        setShowBadge(false);
      }, 3500);

      setTimeout(() => {
        const batchIds = new Set(newBatch.map((f) => f.id));
        setFlowers((prev) => prev.filter((f) => !batchIds.has(f.id)));
      }, 5600);
    };

    window.addEventListener('bappa-flower-shower', handleShowerEvent);
    return () => {
      window.removeEventListener('bappa-flower-shower', handleShowerEvent);
    };
  }, []);

  if (flowers.length === 0) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Devotional Ephemeral Badge */}
      {showBadge && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-bounce">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8B0000]/90 border border-[#FFD700] text-[#FFFDD0] shadow-xl text-xs font-bold font-devanagari-serif tracking-wider">
            <span>🌺</span>
            <span>॥ श्री गणरायाला जास्वंद पुष्पवृष्टी ॥</span>
            <span>🌺</span>
          </div>
        </div>
      )}

      {/* Falling Red Hibiscus Flowers */}
      {flowers.map((flower) => (
        <div
          key={flower.id}
          className={`absolute top-0 pointer-events-auto cursor-pointer transition-transform hover:scale-130 active:scale-95 ${
            flower.isReverse ? 'animate-hibiscus-shower-rev' : 'animate-hibiscus-shower'
          }`}
          style={{
            left: `${flower.left}%`,
            animationDelay: `${flower.delay}s`,
            animationDuration: `${flower.duration}s`,
            opacity: flower.opacity,
            filter: 'drop-shadow(0 4px 10px rgba(139, 0, 0, 0.45))'
          }}
          title="Sacred Red Hibiscus (जास्वंद)"
        >
          <RedHibiscus size={flower.size} />
        </div>
      ))}
    </div>
  );
};
