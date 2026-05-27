import { type ReactNode } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import { spacing } from '../foundations';

export type SectionProps = {
  children: ReactNode;
  style?: ViewStyle;
};

export function Section({ children, style }: SectionProps) {
  return <View style={[styles.base, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
});
