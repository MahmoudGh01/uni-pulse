import { Link, Stack } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

import { foundations, elements, layout } from '#design';

import { featuredEvents } from '#shared/events';

const { colors, spacing } = foundations;
const { Card, Typography } = elements;
const { Screen, Section, Stack: LayoutStack } = layout;

export default function ExploreListScreen() {
  return (
    <Screen>
      <Stack.Screen options={{ title: 'Explore Events' }} />

      <Section style={styles.container}>
        <Typography variant="title">Trending this week</Typography>
        <Typography variant="muted" style={styles.subheading}>
          Pick an event to open a nested details screen.
        </Typography>

        <LayoutStack gap="lg">
          {featuredEvents.map((event) => (
            <Link key={event.id} href={`./${event.id}`} asChild>
              <Pressable>
                <Card>
                  <Typography variant="large">{event.title}</Typography>
                  <Typography variant="body">{event.venue}</Typography>
                  <Typography style={styles.cardCta}>View details →</Typography>
                </Card>
              </Pressable>
            </Link>
          ))}
        </LayoutStack>
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacing.lg, // 16px gap
  },
  subheading: {
    marginBottom: spacing.md, // 12px bottom margin
  },
  cardCta: {
    marginTop: spacing.sm, // 8px top margin
    color: colors.primary, // iOS blue
    fontWeight: '600',
    fontSize: 16,
  },
});
