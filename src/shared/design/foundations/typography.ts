import { type TextStyle } from 'react-native';

import { colors } from './colors';

// Apple-style typography with mathematical scaling
// Base size: 16px (iOS standard)
const baseSize = 16;

export const typography = {
  // Large title (2x base) - 32px
  hero: {
    fontSize: baseSize * 2,
    fontWeight: '700',
    color: colors.text,
  } satisfies TextStyle,

  // Title (2x base) - 32px
  title: {
    fontSize: baseSize * 2,
    fontWeight: '700',
    color: colors.text,
  } satisfies TextStyle,

  // Large text (1.25x base) - 20px
  large: {
    fontSize: baseSize * 1.25,
    fontWeight: '600',
    color: colors.text,
  } satisfies TextStyle,

  // Body text (1x base) - 16px
  body: {
    fontSize: baseSize,
    color: colors.text,
  } satisfies TextStyle,

  // Body strong (1x base, bold) - 16px
  bodyStrong: {
    fontSize: baseSize,
    fontWeight: '600',
    color: colors.text,
  } satisfies TextStyle,

  // Subtitle/secondary text (1x base, muted) - 16px
  subtitle: {
    fontSize: baseSize,
    color: colors.textMuted,
  } satisfies TextStyle,

  // Muted text (1x base, muted) - 16px
  muted: {
    fontSize: baseSize,
    color: colors.textMuted,
  } satisfies TextStyle,

  // Caption (0.875x base) - 14px
  caption: {
    fontSize: baseSize * 0.875,
    color: colors.textMuted,
  } satisfies TextStyle,

  // Label (0.875x base, bold) - 14px
  label: {
    fontSize: baseSize * 0.875,
    fontWeight: '700',
    color: colors.text,
  } satisfies TextStyle,

  // Button text - 16px
  button: {
    fontSize: baseSize,
    fontWeight: '600',
  } satisfies TextStyle,

  // Chip text (0.875x base, bold) - 14px
  chip: {
    fontSize: baseSize * 0.875,
    fontWeight: '600',
  } satisfies TextStyle,
} as const;
