import { type RefObject } from 'react';
import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

import { colors, radius, spacing, typography } from '../foundations';

export type TextFieldProps = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  inputRef?: RefObject<TextInput | null>;
} & Pick<
  TextInputProps,
  'autoCapitalize' | 'autoCorrect' | 'returnKeyType' | 'keyboardType' | 'inputMode'
>;

export function TextField({
  value,
  onChangeText,
  placeholder,
  inputRef,
  autoCapitalize = 'none',
  autoCorrect = false,
  returnKeyType = 'search',
  keyboardType,
  inputMode,
}: TextFieldProps) {
  return (
    <TextInput
      ref={inputRef}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colors.textMuted}
      style={styles.input}
      autoCapitalize={autoCapitalize}
      autoCorrect={autoCorrect}
      returnKeyType={returnKeyType}
      keyboardType={keyboardType}
      inputMode={inputMode}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.surfaceMuted, // Light gray background
    borderRadius: radius.sm, // 12px rounded corners
    borderWidth: 0, // No border for cleaner Apple look
    paddingHorizontal: spacing.lg, // 16px horizontal padding
    paddingVertical: spacing.md, // 12px vertical padding
    color: colors.text,
    fontSize: typography.body.fontSize, // 16px
    fontWeight: '400',
  },
});
