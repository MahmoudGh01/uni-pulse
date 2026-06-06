import { type StyleProp, Pressable, StyleSheet, type ViewStyle } from 'react-native';

import { colors, radius, spacing, typography } from '../foundations';
import { Typography } from './typography';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';

export type ButtonProps = {
  label: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  variant?: ButtonVariant;
};

// Apple-style button variants with clean, bold colors
const variantStyles: Record<ButtonVariant, ViewStyle> = {
  primary: {
    backgroundColor: colors.primary, // iOS blue
  },
  secondary: {
    backgroundColor: colors.textMuted, // Gray
  },
  success: {
    backgroundColor: colors.success, // Green
  },
  danger: {
    backgroundColor: colors.error, // Red
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: colors.border,
    borderWidth: 1,
  },
};

const labelColor: Record<ButtonVariant, string> = {
  primary: colors.onPrimary,
  secondary: colors.onPrimary,
  success: colors.onPrimary,
  danger: colors.onPrimary,
  ghost: colors.primary,
};

export function Button({ label, onPress, style, variant = 'primary' }: ButtonProps) {
  return (
    <Pressable style={[styles.base, variantStyles[variant], style]} onPress={onPress}>
      <Typography style={[styles.label, { color: labelColor[variant] }]}>{label}</Typography>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'center',
    borderRadius: radius.sm, // 12px rounded corners
    paddingHorizontal: spacing.x2, // 24px horizontal padding
    paddingVertical: spacing.md, // 12px vertical padding
    minWidth: 120, // Minimum width for consistency
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...typography.button,
  },
});
