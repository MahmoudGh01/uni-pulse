import { type StyleProp, Pressable, StyleSheet, type ViewStyle } from 'react-native';

import { colors, radius, spacing, typography } from '../foundations';
import { Typography } from './typography';

type ButtonVariant = 'primary' | 'warning' | 'success' | 'ghost';

export type ButtonProps = {
  label: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  variant?: ButtonVariant;
};

const variantStyles: Record<ButtonVariant, ViewStyle> = {
  primary: {
    backgroundColor: colors.primaryStrong,
  },
  warning: {
    backgroundColor: colors.warningAction,
  },
  success: {
    backgroundColor: colors.success,
  },
  ghost: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
  },
};

const labelColor: Record<ButtonVariant, string> = {
  primary: colors.onPrimary,
  warning: '#fff7ed',
  success: '#ecfdf3',
  ghost: colors.textMuted,
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
    alignSelf: 'flex-start',
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  label: {
    ...typography.button,
  },
});
