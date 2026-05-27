import { type StyleProp, type ViewStyle, StyleSheet, View } from 'react-native';

import { colors, radius, shadows, spacing } from '../foundations';

type CardTone = 'default' | 'muted' | 'warning';

export type CardProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  tone?: CardTone;
};

const toneStyles: Record<CardTone, ViewStyle> = {
  default: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  muted: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.border,
  },
  warning: {
    backgroundColor: colors.warningSurface,
    borderColor: '#f5d48f',
  },
};

export function Card({ children, style, tone = 'default' }: CardProps) {
  return <View style={[styles.base, toneStyles[tone], style]}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.md,
    gap: spacing.sm,
    ...shadows.card,
  },
});
