import { Link, Stack } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

import { foundations, elements, layout } from '#design';

import { featuredEvents } from '#shared/events';

const { spacing } = foundations;
const { Card, Typography } = elements;
const { Screen, Section, Stack: LayoutStack } = layout;

export default function ExploreListScreen() {
  return (
    <Screen>
      <Stack.Screen options={{ title: 'Explore Events' }} />

      <Section style={styles.container}>
        <Typography variant="title">Trending this week</Typography>
        <Typography variant="subtitle" style={styles.subheading}>
          Pick an event to open a nested details screen.
        </Typography>

        <LayoutStack gap="sm">
          {featuredEvents.map((event) => (
            <Link key={event.id} href={`./${event.id}`} asChild>
              <Pressable>
                <Card>
                  <Typography variant="bodyStrong">{event.title}</Typography>
                  <Typography variant="body">{event.venue}</Typography>
                  <Typography style={styles.cardCta}>View details</Typography>
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
    gap: spacing.sm,
  },
  subheading: {
    marginBottom: spacing.sm,
  },
  cardCta: {
    marginTop: spacing.xs,
    color: '#0067c0',
    fontWeight: '700',
  },
});
