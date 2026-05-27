import { type LinkProps, Link } from 'expo-router';
import { type StyleProp, type TextStyle, StyleSheet, Text } from 'react-native';

import { typography } from '../foundations';

type TypographyVariant = keyof typeof typography;

type BaseProps = {
  variant?: TypographyVariant;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
};

type LinkTypographyProps = BaseProps & Pick<LinkProps, 'href' | 'replace' | 'push' | 'dismissTo'>;
type TextTypographyProps = BaseProps & { href?: never };

export type TypographyProps = LinkTypographyProps | TextTypographyProps;

const styles = StyleSheet.create(typography);

export function Typography({ variant = 'body', style, children, ...props }: TypographyProps) {
  if ('href' in props && props.href) {
    return (
      <Link {...props} style={[styles[variant], style]}>
        {children}
      </Link>
    );
  }

  return <Text style={[styles[variant], style]}>{children}</Text>;
}
