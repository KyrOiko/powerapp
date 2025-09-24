import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';

export default function SetHeader() {
  return (
    <View style={styles.gridContainer}>
      <View style={styles.gridRow}>
        <View style={[styles.baseGridItem, styles.gridItem1]}>
          <ThemedText type="smallSubtitle">Set</ThemedText>
        </View>
        <View style={[styles.baseGridItem, styles.gridItem4]}>
          <ThemedText type="smallSubtitle">Rep Range</ThemedText>
        </View>
        <View style={[styles.baseGridItem, styles.gridItem3]}>
          <ThemedText type="smallSubtitle">RIR</ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'column',
    gap: 10,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 10,
  },
  baseGridItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItem1: {
    flex: 1,
  },
  gridItem4: {
    flex: 4,
  },
  gridItem3: {
    flex: 1,
  },
});
