import { Link, Stack } from 'expo-router';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const featuredEvents = [
  {
    id: 'hack-night',
    title: 'Midnight Hack Night',
    venue: 'Innovation Lab',
  },
  {
    id: 'poetry-jam',
    title: 'Open Mic Poetry Jam',
    venue: 'Library Steps',
  },
  {
    id: 'street-food',
    title: 'Street Food Crawl',
    venue: 'Downtown Stage',
  },
];

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ title: 'Explore Events' }} />

      <View style={styles.container}>
        <Text style={styles.heading}>Trending this week</Text>
        <Text style={styles.subheading}>Pick an event to open a nested details screen.</Text>

        <View style={styles.list}>
          {featuredEvents.map((event) => (
            <Link key={event.id} href={`./${event.id}`} asChild>
              <Pressable style={styles.card}>
                <Text style={styles.cardTitle}>{event.title}</Text>
                <Text style={styles.cardMeta}>{event.venue}</Text>
                <Text style={styles.cardCta}>View details</Text>
              </Pressable>
            </Link>
          ))}
        </View>
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
    paddingTop: 14,
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f1720',
  },
  subheading: {
    marginTop: 6,
    marginBottom: 14,
    fontSize: 14,
    color: '#41505b',
  },
  list: {
    gap: 10,
  },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#d3dde5',
    backgroundColor: '#ffffff',
    padding: 12,
    gap: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#17232c',
  },
  cardMeta: {
    color: '#4a5a66',
  },
  cardCta: {
    marginTop: 2,
    color: '#0067c0',
    fontWeight: '700',
  },
});
