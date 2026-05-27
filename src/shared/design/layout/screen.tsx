import { type ReactNode } from 'react';
import { SafeAreaView, StyleSheet, type ViewStyle } from 'react-native';

import { colors } from '../foundations';

export type ScreenProps = {
  children: ReactNode;
  style?: ViewStyle;
};

export function Screen({ children, style }: ScreenProps) {
  return <SafeAreaView style={[styles.base, style]}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: colors.screen,
  },
});
