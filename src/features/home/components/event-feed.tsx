import { FlatList, StyleSheet, View } from 'react-native';

import { foundations, elements } from '#design';

import { type EventCategory, type UniEvent } from '../hooks/use-home-screen-model';

const { colors, radius, spacing, typography } = foundations;
const { Button, Card, Chip, Typography } = elements;

export type EventFeedProps = {
  events: UniEvent[];
  hasMore: boolean;
  isRefreshing: boolean;
  onRefresh: () => void;
  onEndReached: () => void;
  selectedCategory: EventCategory;
  onCategoryChange: (category: EventCategory) => void;
  savedIds: Set<number>;
  onToggleSave: (eventId: number) => void;
};

export function EventFeed({
  events,
  hasMore,
  isRefreshing,
  onRefresh,
  onEndReached,
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
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.4}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Typography style={styles.emptyText}>No events match this filter.</Typography>
        }
        ListFooterComponent={
          hasMore ? (
            <Typography variant="caption" style={styles.footerText}>
              Scroll for more events
            </Typography>
          ) : null
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
    gap: spacing.sm, // 8px gap between chips
    marginBottom: spacing.lg, // 16px bottom margin
    flexWrap: 'wrap', // Wrap chips if needed
  },
  listContent: {
    paddingBottom: spacing.x2, // 24px bottom padding
    gap: spacing.lg, // 16px gap between cards
  },
  card: {
    gap: spacing.md, // 12px gap between card elements
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md, // 12px gap
  },
  cardTitle: {
    flex: 1,
  },
  badge: {
    ...typography.label, // 14px, bold
    color: colors.primary,
    backgroundColor: colors.infoSurface,
    paddingHorizontal: spacing.md, // 12px horizontal padding
    paddingVertical: spacing.xs, // 4px vertical padding
    borderRadius: radius.pill, // Fully rounded
    overflow: 'hidden',
  },
  emptyText: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.x3, // 32px top margin
  },
  footerText: {
    textAlign: 'center',
    marginTop: spacing.lg, // 16px margins
    marginBottom: spacing.lg,
    color: colors.textMuted,
  },
});
