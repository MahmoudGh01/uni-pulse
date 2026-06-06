import { type RefObject, useState } from 'react';
import { StyleSheet, Switch, TextInput, View } from 'react-native';

import { foundations, elements, layout } from '#design';

import { formatWelcome } from '../hooks/use-home-screen-model';

const { colors, typography } = foundations;
const { Button, Card, TextField, Typography } = elements;
const { Stack } = layout;

export type HomeHeaderProps = {
  savedCount: number;
  searchInputRef: RefObject<TextInput | null>;
  query: string;
  onQueryChange: (value: string) => void;
  displayName: string;
  onDisplayNameChange: (value: string) => void;
  preferredLocation: string;
  onPreferredLocationChange: (value: string) => void;
  savedOnly: boolean;
  onSavedOnlyChange: (value: boolean) => void;
};

export function HomeHeader({
  savedCount,
  searchInputRef,
  query,
  onQueryChange,
  displayName,
  onDisplayNameChange,
  preferredLocation,
  onPreferredLocationChange,
  savedOnly,
  onSavedOnlyChange,
}: HomeHeaderProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Card tone="muted">
      <Stack gap="sm">
        <View style={styles.headerRow}>
          <View style={styles.headerTextWrap}>
            <Typography variant="hero">UniPulse</Typography>
            <Typography variant="subtitle">{formatWelcome(displayName)}</Typography>
          </View>
          <Button
            label={isExpanded ? 'Hide Search' : 'Show Search'}
            variant="ghost"
            onPress={() => setIsExpanded((previousState) => !previousState)}
          />
        </View>

        {isExpanded ? (
          <>
            <TextField
              value={displayName}
              onChangeText={onDisplayNameChange}
              placeholder="Your name"
              autoCapitalize="words"
              returnKeyType="next"
            />

            <TextField
              value={preferredLocation}
              onChangeText={onPreferredLocationChange}
              placeholder="Preferred location"
              autoCapitalize="words"
              returnKeyType="next"
            />

            <View style={styles.statusRow}>
              <Typography style={styles.savedCounter}>Saved: {savedCount}</Typography>
              <Button label="Focus search" onPress={() => searchInputRef.current?.focus()} />
            </View>

            <View style={styles.toggleRow}>
              <Typography style={styles.toggleLabel}>Saved only</Typography>
              <Switch value={savedOnly} onValueChange={onSavedOnlyChange} />
            </View>

            <TextField
              inputRef={searchInputRef}
              value={query}
              onChangeText={onQueryChange}
              placeholder="Search events"
            />
          </>
        ) : null}
      </Stack>
    </Card>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: foundations.spacing.lg, // 16px gap
  },
  headerTextWrap: {
    flex: 1,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: foundations.spacing.sm, // 8px vertical padding
  },
  savedCounter: {
    ...typography.bodyStrong,
    color: colors.text,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: foundations.spacing.sm, // 8px vertical padding
  },
  toggleLabel: {
    ...typography.body,
    color: colors.text,
  },
});
