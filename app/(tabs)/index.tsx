import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type EventCategory = 'All' | 'Campus' | 'City' | 'Club';

type UniEvent = {
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

function Header({
  savedCount,
  searchInputRef,
  query,
  onQueryChange,
}: {
  savedCount: number;
  searchInputRef: RefObject<TextInput | null>;
  query: string;
  onQueryChange: (value: string) => void;
}) {
  return (
    <View style={headerStyles.container}>
      <View>
        <Text style={headerStyles.title}>UniPulse</Text>
        <Text style={headerStyles.subtitle}>Campus + city events with slightly chaotic energy</Text>
      </View>

      <View style={headerStyles.statusRow}>
        <Text style={headerStyles.savedCounter}>Saved: {savedCount}</Text>
        <Pressable
          onPress={() => searchInputRef.current?.focus()}
          style={headerStyles.focusButton}
          android_ripple={{ color: '#123f4a' }}
        >
          <Text style={headerStyles.focusButtonText}>Focus search</Text>
        </Pressable>
      </View>

      <TextInput
        ref={searchInputRef}
        value={query}
        onChangeText={onQueryChange}
        placeholder="Search events"
        placeholderTextColor="#5d7477"
        style={headerStyles.searchInput}
      />
    </View>
  );
}

function EventFlasher({
  panicMessage,
  onPanicPress,
}: {
  panicMessage: string;
  onPanicPress: () => void;
}) {
  return (
    <View style={flasherStyles.container}>
      <Text style={flasherStyles.label}>Live Chaos Feed</Text>
      <Text style={flasherStyles.message}>{panicMessage}</Text>
      <TouchableOpacity style={flasherStyles.button} onPress={onPanicPress}>
        <Text style={flasherStyles.buttonText}>Panic Button</Text>
      </TouchableOpacity>
    </View>
  );
}

function EventFeed({
  events,
  selectedCategory,
  onCategoryChange,
  savedIds,
  onToggleSave,
}: {
  events: UniEvent[];
  selectedCategory: EventCategory;
  onCategoryChange: (category: EventCategory) => void;
  savedIds: Set<number>;
  onToggleSave: (eventId: number) => void;
}) {
  const categories: EventCategory[] = ['All', 'Campus', 'City', 'Club'];

  return (
    <View style={feedStyles.container}>
      <View style={feedStyles.filterRow}>
        {categories.map((category) => {
          const selected = selectedCategory === category;

          return (
            <TouchableOpacity
              key={category}
              style={[feedStyles.filterPill, selected && feedStyles.filterPillActive]}
              onPress={() => onCategoryChange(category)}
            >
              <Text
                style={[feedStyles.filterPillText, selected && feedStyles.filterPillTextActive]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={feedStyles.listContent}
        ListEmptyComponent={<Text style={feedStyles.emptyText}>No events match this filter.</Text>}
        renderItem={({ item }) => {
          const isSaved = savedIds.has(item.id);

          return (
            <View style={feedStyles.card}>
              <View style={feedStyles.cardTopRow}>
                <Text style={feedStyles.cardTitle}>{item.title}</Text>
                <Text style={feedStyles.badge}>{item.category}</Text>
              </View>

              <Text style={feedStyles.metaText}>{item.location}</Text>
              <Text style={feedStyles.metaText}>Starts in {item.startsIn}</Text>

              <TouchableOpacity
                style={[feedStyles.saveButton, isSaved && feedStyles.saveButtonSaved]}
                onPress={() => onToggleSave(item.id)}
              >
                <Text style={feedStyles.saveButtonText}>
                  {isSaved ? 'Saved' : 'Save for later'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}

export default function HomeScreen() {
  const searchInputRef = useRef<TextInput | null>(null);

  const [events, setEvents] = useState<UniEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set());
  const [panicMessage, setPanicMessage] = useState<string>(panicMessages[0]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        // Public API fetch used to simulate dynamic event data on app launch.
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
        // Fallback list keeps the prototype usable if network fetch fails.
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
        setIsLoading(false);
      }
    };

    void loadEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return events.filter((event) => {
      const categoryMatch = selectedCategory === 'All' || event.category === selectedCategory;
      const queryMatch =
        normalizedQuery.length === 0 ||
        event.title.toLowerCase().includes(normalizedQuery) ||
        event.location.toLowerCase().includes(normalizedQuery);

      return categoryMatch && queryMatch;
    });
  }, [events, searchQuery, selectedCategory]);

  const handleToggleSave = (eventId: number) => {
    setSavedIds((previous) => {
      const next = new Set(previous);
      if (next.has(eventId)) {
        next.delete(eventId);
      } else {
        next.add(eventId);
      }
      return next;
    });
  };

  const handlePanicPress = () => {
    const randomIndex = Math.floor(Math.random() * panicMessages.length);
    setPanicMessage(panicMessages[randomIndex]);
  };

  return (
    <SafeAreaView style={screenStyles.safeArea}>
      <View style={screenStyles.screen}>
        <Header
          savedCount={savedIds.size}
          searchInputRef={searchInputRef}
          query={searchQuery}
          onQueryChange={setSearchQuery}
        />

        <EventFlasher panicMessage={panicMessage} onPanicPress={handlePanicPress} />

        {isLoading ? (
          <View style={screenStyles.loaderWrap}>
            <ActivityIndicator size="large" color="#1f7a8c" />
            <Text style={screenStyles.loaderText}>Summoning events from the internet...</Text>
          </View>
        ) : (
          <EventFeed
            events={filteredEvents}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const screenStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f7f7',
  },
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  loaderWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  loaderText: {
    fontSize: 14,
    color: '#2f4a4f',
  },
});

const headerStyles = StyleSheet.create({
  container: {
    backgroundColor: '#e7f4f6',
    borderRadius: 16,
    padding: 14,
    gap: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#0f1720',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#30484c',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  savedCounter: {
    fontSize: 14,
    color: '#22393d',
    fontWeight: '700',
  },
  focusButton: {
    backgroundColor: '#1f7a8c',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  focusButtonText: {
    color: '#f8fbfb',
    fontWeight: '700',
  },
  searchInput: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#bed0d3',
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#162224',
  },
});

const flasherStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff5df',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#f5d48f',
    padding: 12,
    gap: 8,
  },
  label: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    fontWeight: '800',
    color: '#7a4d00',
  },
  message: {
    fontSize: 15,
    color: '#3a2a00',
    fontWeight: '600',
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: '#f97316',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonText: {
    color: '#fff7ed',
    fontWeight: '800',
  },
});

const feedStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  filterPill: {
    borderWidth: 1,
    borderColor: '#b6c7ca',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
  },
  filterPillActive: {
    backgroundColor: '#1f7a8c',
    borderColor: '#1f7a8c',
  },
  filterPillText: {
    color: '#26464c',
    fontWeight: '700',
  },
  filterPillTextActive: {
    color: '#eff9fa',
  },
  listContent: {
    paddingBottom: 20,
    gap: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#dde8ea',
    gap: 8,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  cardTitle: {
    fontSize: 16,
    color: '#132125',
    fontWeight: '700',
    flex: 1,
  },
  badge: {
    fontSize: 12,
    color: '#10444f',
    backgroundColor: '#dff3f7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: 'hidden',
    fontWeight: '700',
  },
  metaText: {
    color: '#3f565b',
    fontSize: 13,
  },
  saveButton: {
    marginTop: 4,
    alignSelf: 'flex-start',
    backgroundColor: '#215f7f',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  saveButtonSaved: {
    backgroundColor: '#24855a',
  },
  saveButtonText: {
    color: '#f4fbff',
    fontWeight: '700',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    color: '#445f65',
    fontSize: 15,
  },
});
