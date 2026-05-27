import { type RefObject } from 'react';
import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

import { colors, palette, radius, spacing } from '../foundations';

export type TextFieldProps = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  inputRef?: RefObject<TextInput | null>;
} & Pick<TextInputProps, 'autoCapitalize' | 'autoCorrect' | 'returnKeyType'>;

export function TextField({
  value,
  onChangeText,
  placeholder,
  inputRef,
  autoCapitalize = 'none',
  autoCorrect = false,
  returnKeyType = 'search',
}: TextFieldProps) {
  return (
    <TextInput
      ref={inputRef}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={palette.slate500}
      style={styles.input}
      autoCapitalize={autoCapitalize}
      autoCorrect={autoCorrect}
      returnKeyType={returnKeyType}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.text,
  },
});
