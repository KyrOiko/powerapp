import { StyleSheet, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { ThemedText } from '../themed-text';

export default function TitledPage({
  title,
  children,
  backButton = true,
}: {
  title: string;
  children: React.ReactNode;
  backButton?: boolean;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {backButton && (
          <Ionicons name="arrow-back" size={24} color="white" onPress={() => router.back()} />
        )}
        <ThemedText type="title" style={styles.title}>
          {title}
        </ThemedText>
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  backButtonSeparator: {
    width: 1,
    height: 24,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    gap: 10,
  },
});
