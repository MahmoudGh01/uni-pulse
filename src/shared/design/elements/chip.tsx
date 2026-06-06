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
    borderRadius: radius.pill, // Fully rounded pill shape
    paddingHorizontal: spacing.lg, // 16px horizontal padding
    paddingVertical: spacing.sm, // 8px vertical padding
    alignItems: 'center',
    justifyContent: 'center',
  },
  idle: {
    backgroundColor: colors.surfaceMuted, // Light gray background
    borderWidth: 0, // No border for cleaner look
  },
  selected: {
    backgroundColor: colors.primary, // iOS blue when selected
    borderWidth: 0,
  },
  label: {
    ...typography.chip, // 14px, semibold
  },
  idleLabel: {
    color: colors.text, // Black text for unselected
  },
  selectedLabel: {
    color: colors.onPrimary, // White text for selected
  },
});
