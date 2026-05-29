import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const SAVED_EVENT_IDS_STORAGE_KEY = 'home:saved-event-ids';

export function usePersistedSavedEvents() {
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set());
  const [isHydrating, setIsHydrating] = useState(true);

  useEffect(() => {
    void (async () => {
      try {
        const cached = await AsyncStorage.getItem(SAVED_EVENT_IDS_STORAGE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached) as number[];
          setSavedIds(new Set(parsed));
        }
      } finally {
        setIsHydrating(false);
      }
    })();
  }, []);

  const toggleSaved = (eventId: number) => {
    setSavedIds((previous) => {
      const next = new Set(previous);

      if (next.has(eventId)) {
        next.delete(eventId);
      } else {
        next.add(eventId);
      }

      void AsyncStorage.setItem(SAVED_EVENT_IDS_STORAGE_KEY, JSON.stringify(Array.from(next)));

      return next;
    });
  };

  return { savedIds, isHydrating, toggleSaved };
}
