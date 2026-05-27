import { type TextStyle } from 'react-native';

import { colors } from './colors';

export const typography = {
  hero: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.text,
  } satisfies TextStyle,
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
  } satisfies TextStyle,
  subtitle: {
    fontSize: 15,
    color: colors.textMuted,
  } satisfies TextStyle,
  body: {
    fontSize: 15,
    color: colors.textMuted,
  } satisfies TextStyle,
  bodyStrong: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  } satisfies TextStyle,
  caption: {
    fontSize: 13,
    color: colors.textMuted,
  } satisfies TextStyle,
  overline: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    fontWeight: '800',
    color: colors.warningText,
  } satisfies TextStyle,
  button: {
    fontSize: 14,
    fontWeight: '700',
  } satisfies TextStyle,
  chip: {
    fontSize: 12,
    fontWeight: '700',
  } satisfies TextStyle,
} as const;
