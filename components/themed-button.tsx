import { Pressable, PressableProps, StyleSheet, Text } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedButtonProps = PressableProps & {
  title: string;
  onPress: () => void;
};

export function ThemedButton({ title, onPress, style, ...props }: ThemedButtonProps) {
  const backgroundColor = useThemeColor({ light: 'green', dark: 'green' }, 'background');
  const textColor = useThemeColor({ light: 'white', dark: 'white' }, 'text');
  return (
    <Pressable style={[styles.button, { backgroundColor }]} onPress={onPress} {...props}>
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
