import { Stack } from 'expo-router';

export default function ExploreStackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Explore Events' }} />
      <Stack.Screen name="[eventId]" options={{ title: 'Event Details' }} />
    </Stack>
  );
}
