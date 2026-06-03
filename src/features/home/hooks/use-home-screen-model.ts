import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  type HomePreferences,
  usePersistedHomePreferences,
} from './use-persisted-home-preferences';
import { usePersistedSavedEvents } from './use-persisted-saved-events';

export type EventCategory = 'All' | 'Campus' | 'City' | 'Club';

export type UniEvent = {
  id: number;
  title: string;
  category: Exclude<EventCategory, 'All'>;
  location: string;
  startsIn: string;
};

const categoryOrder: Exclude<EventCategory, 'All'>[] = ['Campus', 'City', 'Club'];
const locations = ['Main Quad', 'Downtown Stage', 'Library Steps', 'Union Lawn'];
const timings = ['10 mins', '30 mins', '1 hour', '2 hours'];
const panicMessages = [
  'Free pizza in the quad right now. Run.',
  'Improv troupe flash mob sighted near the fountain.',
  'Mystery DJ set started in the campus tunnel.',
  'Rooftop karaoke challenge has gone competitive.',
  'Unexpected bubble rave activated. Bring sunglasses.',
];

export function useHomeScreenModel() {
  const [events, setEvents] = useState<UniEvent[]>([]);
  const [isEventsLoading, setIsEventsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [panicMessage, setPanicMessage] = useState<string>(panicMessages[0]);

  const { savedIds, isHydrating: isSavedHydrating, toggleSaved } = usePersistedSavedEvents();
  const {
    preferences,
    isHydrating: isPreferencesHydrating,
    setDisplayName,
    setPreferredLocation,
    setSavedOnly,
    setQuietMode,
  } = usePersistedHomePreferences();

  const loadEvents = useCallback(async (refresh: boolean = false) => {
    if (refresh) {
      setIsRefreshing(true);
    } else {
      setIsEventsLoading(true);
    }

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=12');
      const payload: { id: number; title: string }[] = await response.json();

      const mappedEvents: UniEvent[] = payload.map((item, index) => ({
        id: item.id,
        title: item.title.replace(/(^\w|\s\w)/g, (char) => char.toUpperCase()),
        category: categoryOrder[index % categoryOrder.length],
        location: locations[index % locations.length],
        startsIn: timings[index % timings.length],
      }));

      setEvents(mappedEvents);
    } catch {
      setEvents([
        {
          id: 101,
          title: 'Open Mic Night at Student Union',
          category: 'Campus',
          location: 'Union Lawn',
          startsIn: '45 mins',
        },
        {
          id: 102,
          title: 'Midnight Food Truck Rally',
          category: 'City',
          location: 'Downtown Stage',
          startsIn: '20 mins',
        },
      ]);
    } finally {
      if (refresh) {
        setIsRefreshing(false);
      } else {
        setIsEventsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    void loadEvents();
  }, [loadEvents]);

  const filteredEvents = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const preferredLocation = preferences.preferredLocation.trim().toLowerCase();

    return events.filter((event) => {
      const categoryMatch = selectedCategory === 'All' || event.category === selectedCategory;
      const queryMatch =
        normalizedQuery.length === 0 ||
        event.title.toLowerCase().includes(normalizedQuery) ||
        event.location.toLowerCase().includes(normalizedQuery);
      const locationMatch =
        preferredLocation.length === 0 || event.location.toLowerCase().includes(preferredLocation);
      const savedOnlyMatch = !preferences.savedOnly || savedIds.has(event.id);

      return categoryMatch && queryMatch && locationMatch && savedOnlyMatch;
    });
  }, [
    events,
    preferences.preferredLocation,
    preferences.savedOnly,
    savedIds,
    searchQuery,
    selectedCategory,
  ]);

  const handlePanicPress = () => {
    if (preferences.quietMode) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * panicMessages.length);
    setPanicMessage(panicMessages[randomIndex]);
  };

  const isHydrating = isSavedHydrating || isPreferencesHydrating;
  const refreshEvents = () => loadEvents(true);

  return {
    events: filteredEvents,
    isLoading: isEventsLoading || isHydrating,
    isRefreshing,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    savedIds,
    toggleSaved,
    refreshEvents,
    panicMessage,
    handlePanicPress,
    preferences,
    setDisplayName,
    setPreferredLocation,
    setSavedOnly,
    setQuietMode,
  };
}

export function formatWelcome(displayName: HomePreferences['displayName']) {
  const name = displayName.trim();
  if (name.length === 0) {
    return 'Campus + city events with slightly chaotic energy';
  }

  return `Welcome back, ${name}. Your feed is tuned and ready.`;
}
