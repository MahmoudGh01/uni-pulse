import { FlatList, StyleSheet, View } from 'react-native';

import { foundations, elements } from '#design';

import { type EventCategory, type UniEvent } from '../hooks/use-home-screen-model';

const { colors, radius, spacing, typography } = foundations;
const { Button, Card, Chip, Typography } = elements;

export type EventFeedProps = {
  events: UniEvent[];
  selectedCategory: EventCategory;
  onCategoryChange: (category: EventCategory) => void;
  savedIds: Set<number>;
  onToggleSave: (eventId: number) => void;
};

export function EventFeed({
  events,
  selectedCategory,
  onCategoryChange,
  savedIds,
  onToggleSave,
}: EventFeedProps) {
  const categories: EventCategory[] = ['All', 'Campus', 'City', 'Club'];

  return (
    <View style={styles.container}>
      <View style={styles.filterRow}>
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
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Typography style={styles.emptyText}>No events match this filter.</Typography>
        }
        renderItem={({ item }) => {
          const isSaved = savedIds.has(item.id);

          return (
            <Card style={styles.card}>
              <View style={styles.cardTopRow}>
                <Typography variant="bodyStrong" style={styles.cardTitle}>
                  {item.title}
                </Typography>
                <Typography style={styles.badge}>{item.category}</Typography>
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

const styles = StyleSheet.create({
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
