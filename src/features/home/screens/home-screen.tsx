import { useRef } from 'react';
import { ActivityIndicator, StyleSheet, TextInput, View } from 'react-native';

import { foundations, elements, layout } from '#design';

import { EventFeed } from '../components/event-feed';
import { EventFlasher } from '../components/event-flasher';
import { HomeHeader } from '../components/home-header';
import { useHomeScreenModel } from '../hooks/use-home-screen-model';

const { colors, spacing, typography } = foundations;
const { Typography } = elements;
const { Screen, Section } = layout;

export default function HomeScreen() {
  const searchInputRef = useRef<TextInput | null>(null);
  const {
    events,
    isLoading,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    savedIds,
    toggleSaved,
    panicMessage,
    handlePanicPress,
    preferences,
    setDisplayName,
    setPreferredLocation,
    setSavedOnly,
    setQuietMode,
  } = useHomeScreenModel();

  return (
    <Screen>
      <Section style={screenStyles.screen}>
        <HomeHeader
          savedCount={savedIds.size}
          searchInputRef={searchInputRef}
          query={searchQuery}
          onQueryChange={setSearchQuery}
          displayName={preferences.displayName}
          onDisplayNameChange={setDisplayName}
          preferredLocation={preferences.preferredLocation}
          onPreferredLocationChange={setPreferredLocation}
          savedOnly={preferences.savedOnly}
          onSavedOnlyChange={setSavedOnly}
          quietMode={preferences.quietMode}
          onQuietModeChange={setQuietMode}
        />

        <EventFlasher panicMessage={panicMessage} onPanicPress={handlePanicPress} />

        {isLoading ? (
          <View style={screenStyles.loaderWrap}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Typography style={screenStyles.loaderText}>Loading your event feed...</Typography>
          </View>
        ) : (
          <EventFeed
            events={events}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            savedIds={savedIds}
            onToggleSave={toggleSaved}
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
