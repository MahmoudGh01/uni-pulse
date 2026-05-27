import { Pressable, StyleSheet, type ViewStyle } from 'react-native';

import { colors, radius, spacing, typography } from '../foundations';
import { Typography } from './typography';

export type ChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
};

export function Chip({ label, selected = false, onPress, style }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.base, selected ? styles.selected : styles.idle, style]}
    >
      <Typography style={[styles.label, selected ? styles.selectedLabel : styles.idleLabel]}>
        {label}
      </Typography>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
  },
  idle: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  selected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  label: {
    ...typography.button,
  },
  idleLabel: {
    color: colors.textMuted,
  },
  selectedLabel: {
    color: colors.onPrimary,
  },
});
