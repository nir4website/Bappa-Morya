/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { OfflineStatusIndicator } from './components/OfflineStatusIndicator.tsx';
import { FloatingDecorations } from './components/FloatingDecorations.tsx';
import { Hero } from './components/Hero.tsx';
import { GanapatiDarshan } from './components/GanapatiDarshan.tsx';
import { AshtavinayakSection } from './components/AshtavinayakSection.tsx';
import { AartiSection } from './components/AartiSection.tsx';
import { DevotionalPrayers } from './components/DevotionalPrayers.tsx';
import { DownloadGallery } from './components/DownloadGallery.tsx';
import { ImageLightbox } from './components/ImageLightbox.tsx';
import { Footer } from './components/Footer.tsx';
import { Toast } from './components/Toast.tsx';
import { AARTIS_DATA } from './data/aartisData.ts';
import { AartiItem } from './types.ts';
import { aartiAudioEngine } from './utils/audioSynth.ts';
import { registerServiceWorker } from './utils/serviceWorkerRegistration.ts';

export default function App() {
  const [currentAarti, setCurrentAarti] = useState<AartiItem | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState<boolean>(
    typeof navigator !== 'undefined' ? !navigator.onLine : false
  );
  const [isCachedReady, setIsCachedReady] = useState<boolean>(false);
  const [hideOfflineBanner, setHideOfflineBanner] = useState<boolean>(false);

  useEffect(() => {
    // Purge outdated caches from previous versions to immediately show newly uploaded deity photos
    if (typeof window !== 'undefined' && 'caches' in window) {
      caches.keys().then((keys) => {
        keys.forEach((key) => {
          if (key.startsWith('bappa-morya-') && !key.endsWith('-v8')) {
            caches.delete(key);
          }
        });
      });
    }

    // Register Service Worker for offline Aarti & temple darshan support
    registerServiceWorker({
      onSuccess: () => {
        setIsCachedReady(true);
        showToast('📴 Offline Mode Ready: Aartis & Temples cached for offline use!');
      },
      onUpdate: () => {
        showToast('✨ Updated devotional content is available.');
      },
      onOffline: () => {
        setIsOffline(true);
        setHideOfflineBanner(false);
        showToast('⚠️ You are offline. All Marathi Aartis & images remain accessible!');
      },
      onOnline: () => {
        setIsOffline(false);
        showToast('🟢 Back Online — Ganapati Bappa Morya! 🙏');
      }
    });

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => {
      setIsOffline(true);
      setHideOfflineBanner(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Lightbox State
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    imageUrl: string;
    title: string;
    subtitle: string;
    googleMapsUrl?: string;
    fileName?: string;
  }>({
    isOpen: false,
    imageUrl: '',
    title: '',
    subtitle: '',
    googleMapsUrl: undefined,
    fileName: undefined
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handlePlayAarti = (aarti: AartiItem) => {
    setCurrentAarti(aarti);
    setIsPlaying(true);
    aartiAudioEngine.play(aarti.id);
    showToast(`🎵 Playing Aarti melody: ${aarti.title}`);
  };

  const handlePauseAarti = () => {
    setIsPlaying(false);
    aartiAudioEngine.stop();
    showToast('⏸️ Paused Aarti melody.');
  };

  const handleToggleAudio = () => {
    if (isPlaying) {
      handlePauseAarti();
    } else {
      const trackToPlay = currentAarti || AARTIS_DATA[0];
      handlePlayAarti(trackToPlay);
    }
  };

  const handleOpenLightbox = (imageUrl: string, title: string, subtitle: string, googleMapsUrl?: string, fileName?: string) => {
    setLightbox({
      isOpen: true,
      imageUrl,
      title,
      subtitle,
      googleMapsUrl,
      fileName
    });
  };

  const handleCloseLightbox = () => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen bg-[#E35D25] text-[#FFFDD0] flex flex-col relative selection:bg-[#FFD700] selection:text-[#8B4513]">
      
      {/* Floating Brass Pantis, Traditional Brass Temple Bells, Red Hibiscus Flowers & Rangoli */}
      <FloatingDecorations onShowToast={showToast} />

      {/* Sticky Header Navigation */}
      <Navbar
        onShowToast={showToast}
        isAudioPlaying={isPlaying}
        onToggleAudio={handleToggleAudio}
        isOffline={isOffline}
      />

      {/* Offline Status Alert Banner */}
      <OfflineStatusIndicator
        isOffline={isOffline && !hideOfflineBanner}
        isCachedReady={isCachedReady}
        onDismissOfflineBanner={() => setHideOfflineBanner(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section with Animated Rangoli, Red Hibiscus Offering & Authentic Handheld Bell */}
        <Hero
          onStartAarti={() => {
            handlePlayAarti(AARTIS_DATA[0]);
            const aartiEl = document.getElementById('aarti');
            if (aartiEl) aartiEl.scrollIntoView({ behavior: 'smooth' });
          }}
          onShowToast={showToast}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* 2. Ganapati Darshan (Siddhivinayak Prabhadevi, Udyan Ganesh Shivaji Park, Dagadusheth Halwai Pune, etc.) */}
        <GanapatiDarshan
          onOpenLightbox={handleOpenLightbox}
          onShowToast={showToast}
        />

        {/* 3. Ashtavinayak Section (All 8 Sacred Temples with accurate images & sthala-purana) */}
        <AshtavinayakSection
          onOpenLightbox={handleOpenLightbox}
          onShowToast={showToast}
        />

        {/* 4. Aarti Section (Devotional Marathi Aartis with Interactive Brass Aarti Thali & Panti) */}
        <AartiSection
          currentPlayingId={currentAarti?.id || null}
          isPlaying={isPlaying}
          onPlayTrack={handlePlayAarti}
          onPauseTrack={handlePauseAarti}
          onShowToast={showToast}
        />

        {/* 5. Ghalin Lotangan & Mantrapushpanjali (Vedic Marathi/Sanskrit texts with Pushpavrushti) */}
        <DevotionalPrayers
          currentPlayingId={currentAarti?.id || null}
          isPlaying={isPlaying}
          onPlayTrack={handlePlayAarti}
          onPauseTrack={handlePauseAarti}
          onShowToast={showToast}
        />

        {/* 6. Download Hub (Wallpapers & Complete Marathi Aarti Collection) */}
        <DownloadGallery
          onOpenLightbox={handleOpenLightbox}
          onShowToast={showToast}
        />
      </main>

      {/* Image Lightbox Modal */}
      <ImageLightbox
        isOpen={lightbox.isOpen}
        imageUrl={lightbox.imageUrl}
        title={lightbox.title}
        subtitle={lightbox.subtitle}
        googleMapsUrl={lightbox.googleMapsUrl}
        fileName={lightbox.fileName}
        onClose={handleCloseLightbox}
        onShowToast={showToast}
      />

      {/* Traditional Festive Footer */}
      <Footer onShowToast={showToast} />

      {/* Global Toast Feedback */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

    </div>
  );
}
