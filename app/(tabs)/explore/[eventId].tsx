import { Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const eventDetails: Record<string, { title: string; time: string; description: string }> = {
  'hack-night': {
    title: 'Midnight Hack Night',
    time: 'Tonight at 9:00 PM',
    description:
      'Build quick campus tools with pop-up teams. Mentors roam all night and there is a prize for best utility.',
  },
  'poetry-jam': {
    title: 'Open Mic Poetry Jam',
    time: 'Thursday at 7:30 PM',
    description:
      'Spoken word, indie acoustic sets, and late-night coffee. Bring your own piece or just listen.',
  },
  'street-food': {
    title: 'Street Food Crawl',
    time: 'Saturday at 6:00 PM',
    description:
      'Student-curated route through the most-loved food trucks near campus, ending with a live DJ set.',
  },
};

export default function EventDetailsScreen() {
  const { eventId } = useLocalSearchParams<{ eventId: string }>();

  const detail = eventId ? eventDetails[eventId] : undefined;
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
