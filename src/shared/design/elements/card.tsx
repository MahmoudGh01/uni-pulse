import { type StyleProp, type ViewStyle, StyleSheet, View } from 'react-native';

import { colors, radius, shadows, spacing } from '../foundations';

type CardTone = 'default' | 'muted' | 'info' | 'warning';

export type CardProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  tone?: CardTone;
};

// Apple-style card variants with clean backgrounds and subtle borders
const toneStyles: Record<CardTone, ViewStyle> = {
  default: {
    backgroundColor: colors.surface,
  },
  muted: {
    backgroundColor: colors.surfaceMuted,
  },
  info: {
    backgroundColor: colors.infoSurface,
  },
  warning: {
    backgroundColor: colors.warningSurface,
  },
};

export function Card({ children, style, tone = 'default' }: CardProps) {
  return <View style={[styles.base, toneStyles[tone], style]}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.lg, // 20px - Apple's signature rounded corners
    padding: spacing.x2, // 24px - generous internal padding
    gap: spacing.lg, // 16px - space between child elements
    ...shadows.card, // Subtle elevation
  },
});
