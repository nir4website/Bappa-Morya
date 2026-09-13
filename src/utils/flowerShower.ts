import { playTempleBell } from './audioSynth.ts';

export interface FlowerShowerData {
  count?: number;
}

/**
 * Triggers a vibrant shower of sacred Red Hibiscus (जास्वंद) flowers across the viewport
 * @param count Number of falling hibiscus flowers (default: 28)
 */
export function triggerRedHibiscusShower(count: number = 28) {
  try {
    playTempleBell(980, 0.7);
  } catch (err) {
    console.warn('Audio chime could not be played:', err);
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent<FlowerShowerData>('bappa-flower-shower', {
        detail: { count }
      })
    );
  }
}
