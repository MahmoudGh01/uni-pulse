import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';

import { foundations, elements, layout } from '#design';

import { featuredEventsById, type FeaturedEventId } from '#shared/events';

const { colors, spacing, typography } = foundations;
const { Card, Typography } = elements;
const { Screen, Section, Stack: LayoutStack } = layout;

export default function ExploreEventDetailsScreen() {
  const { eventId } = useLocalSearchParams<{ eventId: string }>();

  const key = eventId as FeaturedEventId | undefined;
  const detail = key ? featuredEventsById[key] : undefined;
  const title = detail?.title ?? 'Event Details';

  return (
    <Screen>
      <Stack.Screen options={{ title }} />

      <Section>
        <Card>
          <LayoutStack gap="lg" style={styles.container}>
            <Typography variant="title">{title}</Typography>
            <Typography style={styles.time}>
              {detail?.time ?? 'Schedule to be announced'}
            </Typography>
            <Typography style={styles.description}>
              {detail?.description ??
                'This event was not found. Please go back and choose another.'}
            </Typography>
          </LayoutStack>
        </Card>
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  time: {
    ...typography.label, // 14px, bold
    color: colors.primary, // iOS blue
  },
  description: {
    ...typography.body, // 16px
    lineHeight: 24, // Slightly more generous line height
    color: colors.text,
    marginTop: spacing.sm, // 8px top margin
  },
});
