import { StyleSheet } from 'react-native';

import { foundations, elements } from '#design';

const { colors } = foundations;
const { Button, Card, Typography } = elements;

export type EventFlasherProps = {
  panicMessage: string;
  onPanicPress: () => void;
};

export function EventFlasher({ panicMessage, onPanicPress }: EventFlasherProps) {
  return (
    <Card tone="warning">
      <Typography variant="overline">Live Chaos Feed</Typography>
      <Typography variant="bodyStrong" style={styles.message}>
        {panicMessage}
      </Typography>
      <Button label="Panic Button" variant="warning" onPress={onPanicPress} />
    </Card>
  );
}

const styles = StyleSheet.create({
  message: {
    color: colors.warningText,
  },
});
