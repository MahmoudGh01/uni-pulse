import { type ReactNode } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import { spacing } from '../foundations';

type StackGap = keyof typeof spacing;

export type StackProps = {
  children: ReactNode;
  gap?: StackGap;
  style?: ViewStyle;
};

export function Stack({ children, gap = 'md', style }: StackProps) {
  return <View style={[styles.base, { gap: spacing[gap] }, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    width: '100%',
  },
});
