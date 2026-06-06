// Apple-inspired minimal color palette
export const palette = {
  // Core colors
  white: '#ffffff',
  black: '#000000',
  gray: '#888888',

  // iOS system blue (brand color)
  blue: '#007aff',
  blueLight: '#e5f3ff',

  // Supporting colors for states
  red: '#ff3b30',
  green: '#34c759',
  orange: '#ff9500',

  // Shadow
  shadowColor: 'rgba(0, 0, 0, 0.15)',
} as const;

export const colors = {
  // Screen & surfaces
  screen: palette.white,
  surface: palette.white,
  surfaceMuted: '#f5f5f5',
  border: '#e5e5e5',

  // Text
  text: palette.black,
  textMuted: palette.gray,

  // Primary (iOS blue)
  primary: palette.blue,
  primaryStrong: '#0051d5',
  onPrimary: palette.white,

  // Status colors
  warningSurface: '#fff4e5',
  warningText: '#cc7a00',
  warningAction: palette.orange,
  success: palette.green,
  error: palette.red,
  infoSurface: palette.blueLight,

  // Shadow
  shadow: palette.shadowColor,
} as const;
