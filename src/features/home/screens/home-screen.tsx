import { useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, TextInput, View } from 'react-native';

import { foundations, elements, layout } from '#design';

import { EventFeed } from '../components/event-feed';
import { HomeHeader } from '../components/home-header';
import { useHomeScreenModel } from '../hooks/use-home-screen-model';

const { colors, spacing, typography } = foundations;
const { Typography } = elements;
const { Screen, Section } = layout;

export default function HomeScreen() {
  const initialVisibleCount = 6;
  const searchInputRef = useRef<TextInput | null>(null);
  const {
    events,
    isLoading,
    isRefreshing,
    refreshEvents,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    savedIds,
    toggleSaved,
    preferences,
    setDisplayName,
    setPreferredLocation,
    setSavedOnly,
  } = useHomeScreenModel();

  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);
  const visibleEvents = events.slice(0, visibleCount);
  const hasMore = visibleCount < events.length;

  const handleLoadMore = () => {
    if (!hasMore) {
      return;
    }

    setVisibleCount((previousCount) =>
      Math.min(previousCount + initialVisibleCount, events.length),
    );
  };

  const handleRefresh = () => {
    setVisibleCount(initialVisibleCount);
    refreshEvents();
  };

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
        />

        {isLoading ? (
          <View style={screenStyles.loaderWrap}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Typography style={screenStyles.loaderText}>Loading your event feed...</Typography>
          </View>
        ) : (
          <EventFeed
            events={visibleEvents}
            hasMore={hasMore}
            isRefreshing={isRefreshing}
            onRefresh={handleRefresh}
            onEndReached={handleLoadMore}
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
    gap: spacing.lg, // 16px gap between sections
  },
  loaderWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg, // 16px gap between spinner and text
  },
  loaderText: {
    ...typography.body,
    color: colors.textMuted,
  },
});
