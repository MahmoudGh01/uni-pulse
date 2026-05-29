import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const HOME_PREFERENCES_STORAGE_KEY = 'home:preferences:v1';

export type HomePreferences = {
  displayName: string;
  preferredLocation: string;
  savedOnly: boolean;
  quietMode: boolean;
};

const defaultPreferences: HomePreferences = {
  displayName: '',
  preferredLocation: '',
  savedOnly: false,
  quietMode: false,
};

export function usePersistedHomePreferences() {
  const [preferences, setPreferences] = useState<HomePreferences>(defaultPreferences);
  const [isHydrating, setIsHydrating] = useState(true);

  useEffect(() => {
    void (async () => {
      try {
        const cached = await AsyncStorage.getItem(HOME_PREFERENCES_STORAGE_KEY);
        if (!cached) {
          return;
        }

        const parsed = JSON.parse(cached) as Partial<HomePreferences>;
        setPreferences({
          displayName: parsed.displayName ?? '',
          preferredLocation: parsed.preferredLocation ?? '',
          savedOnly: parsed.savedOnly ?? false,
          quietMode: parsed.quietMode ?? false,
        });
      } finally {
        setIsHydrating(false);
      }
    })();
  }, []);

  const updatePreferences = (updater: (previous: HomePreferences) => HomePreferences) => {
    setPreferences((previous) => {
      const next = updater(previous);
      void AsyncStorage.setItem(HOME_PREFERENCES_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const setDisplayName = (displayName: string) => {
    updatePreferences((previous) => ({ ...previous, displayName }));
  };

  const setPreferredLocation = (preferredLocation: string) => {
    updatePreferences((previous) => ({ ...previous, preferredLocation }));
  };

  const setSavedOnly = (savedOnly: boolean) => {
    updatePreferences((previous) => ({ ...previous, savedOnly }));
  };

  const setQuietMode = (quietMode: boolean) => {
    updatePreferences((previous) => ({ ...previous, quietMode }));
  };

  return {
    preferences,
    isHydrating,
    setDisplayName,
    setPreferredLocation,
    setSavedOnly,
    setQuietMode,
  };
}
