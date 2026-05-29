import { type RefObject } from 'react';
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
  quietMode: boolean;
  onQuietModeChange: (value: boolean) => void;
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
  quietMode,
  onQuietModeChange,
}: HomeHeaderProps) {
  return (
    <Card tone="muted">
      <Stack gap="sm">
        <View>
          <Typography variant="hero">UniPulse</Typography>
          <Typography variant="subtitle">{formatWelcome(displayName)}</Typography>
        </View>

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

        <View style={styles.toggleRow}>
          <Typography style={styles.toggleLabel}>Quiet mode</Typography>
          <Switch value={quietMode} onValueChange={onQuietModeChange} />
        </View>

        <TextField
          inputRef={searchInputRef}
          value={query}
          onChangeText={onQueryChange}
          placeholder="Search events"
        />
      </Stack>
    </Card>
  );
}

const styles = StyleSheet.create({
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  savedCounter: {
    ...typography.button,
    color: colors.text,
    fontWeight: '700',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleLabel: {
    ...typography.button,
    color: colors.text,
  },
});
