import { Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { featuredEventsById, type FeaturedEventId } from '#shared/events';

export default function ExploreEventDetailsScreen() {
  const { eventId } = useLocalSearchParams<{ eventId: string }>();

  const key = eventId as FeaturedEventId | undefined;
  const detail = key ? featuredEventsById[key] : undefined;
  const title = detail?.title ?? 'Event Details';

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ title }} />

      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.time}>{detail?.time ?? 'Schedule to be announced'}</Text>
        <Text style={styles.description}>
          {detail?.description ?? 'This event was not found. Please go back and choose another.'}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f6f8fa',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 18,
    gap: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f1720',
  },
  time: {
    fontSize: 15,
    color: '#2a4b60',
    fontWeight: '700',
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#304450',
  },
});
