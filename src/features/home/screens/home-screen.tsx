import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, TextInput, View } from 'react-native';

import { foundations, elements, layout } from '#design';

const { colors, radius, spacing, typography } = foundations;
const { Button, Card, Chip, TextField, Typography } = elements;
const { Screen, Section, Stack } = layout;

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
    <Card tone="muted">
      <Stack gap="sm">
        <View>
          <Typography variant="hero">UniPulse</Typography>
          <Typography variant="subtitle">
            Campus + city events with slightly chaotic energy
          </Typography>
        </View>

        <View style={headerStyles.statusRow}>
          <Typography style={headerStyles.savedCounter}>Saved: {savedCount}</Typography>
          <Button label="Focus search" onPress={() => searchInputRef.current?.focus()} />
        </View>

        <TextField
          inputRef={searchInputRef}
          value={query}
          onChangeText={onQueryChange}
          placeholder="Search events"
        />
      </Stack>
    </Card>
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
    <Card tone="warning">
      <Typography variant="overline">Live Chaos Feed</Typography>
      <Typography variant="bodyStrong" style={flasherStyles.message}>
        {panicMessage}
      </Typography>
      <Button label="Panic Button" variant="warning" onPress={onPanicPress} />
    </Card>
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
            <Chip
              key={category}
              label={category}
              selected={selected}
              onPress={() => onCategoryChange(category)}
            />
          );
        })}
      </View>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={feedStyles.listContent}
        ListEmptyComponent={
          <Typography style={feedStyles.emptyText}>No events match this filter.</Typography>
        }
        renderItem={({ item }) => {
          const isSaved = savedIds.has(item.id);

          return (
            <Card style={feedStyles.card}>
              <View style={feedStyles.cardTopRow}>
                <Typography variant="bodyStrong" style={feedStyles.cardTitle}>
                  {item.title}
                </Typography>
                <Typography style={feedStyles.badge}>{item.category}</Typography>
              </View>

              <Typography variant="caption">{item.location}</Typography>
              <Typography variant="caption">Starts in {item.startsIn}</Typography>

              <Button
                label={isSaved ? 'Saved' : 'Save for later'}
                variant={isSaved ? 'success' : 'primary'}
                onPress={() => onToggleSave(item.id)}
              />
            </Card>
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
    <Screen>
      <Section style={screenStyles.screen}>
        <Header
          savedCount={savedIds.size}
          searchInputRef={searchInputRef}
          query={searchQuery}
          onQueryChange={setSearchQuery}
        />

        <EventFlasher panicMessage={panicMessage} onPanicPress={handlePanicPress} />

        {isLoading ? (
          <View style={screenStyles.loaderWrap}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Typography style={screenStyles.loaderText}>
              Summoning events from the internet...
            </Typography>
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
      </Section>
    </Screen>
  );
}

const screenStyles = StyleSheet.create({
  screen: {
    flex: 1,
    gap: spacing.md,
  },
  loaderWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  loaderText: {
    ...typography.body,
  },
});

const headerStyles = StyleSheet.create({
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  savedCounter: {
    ...typography.button,
    color: colors.text,
    fontWeight: '700',
  },
});

const flasherStyles = StyleSheet.create({
  message: {
    color: colors.warningText,
  },
});

const feedStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  listContent: {
    paddingBottom: spacing.xl,
    gap: spacing.sm,
  },
  card: {
    gap: spacing.sm,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  cardTitle: {
    flex: 1,
  },
  badge: {
    ...typography.chip,
    color: colors.primaryStrong,
    backgroundColor: colors.infoSurface,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: spacing.x2,
  },
});
