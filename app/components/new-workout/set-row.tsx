import { StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { CreateTemplateSet } from '@/models/dto/create_set_template';

export default function SetRow({
  index,
  set,
  onLowerChange,
  onUpperChange,
}: {
  index: number;
  set: CreateTemplateSet;
  onLowerChange: (text: string) => void;
  onUpperChange: (text: string) => void;
}) {
  return (
    <View style={styles.gridRow}>
      <View style={[styles.baseGridItem, styles.gridItem1]}>
        <ThemedText type="smallSubtitle">{index + 1}</ThemedText>
      </View>
      <View style={[styles.baseGridItem, styles.gridItem4]}>
        <View style={styles.repRangeInputContainer}>
          <TextInput
            style={styles.repRangeInput}
            returnKeyType="next"
            keyboardType="numeric"
            onChangeText={text => {
              onLowerChange(text);
            }}
          >
            {set.repRange.lower}
          </TextInput>
          <ThemedText type="smallTitle">-</ThemedText>
          <TextInput
            style={styles.repRangeInput}
            returnKeyType="next"
            keyboardType="numeric"
            onChangeText={text => {
              onUpperChange(text);
            }}
          >
            {set.repRange.upper}
          </TextInput>
        </View>
      </View>
      <View style={[styles.baseGridItem, styles.gridItem3]}>
        <ThemedText type="smallSubtitle">{set.expectedRIR}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'column',
    gap: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 10,
  },
  baseGridItem: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItem1: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  gridItem3: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  gridItem4: {
    flex: 4,
  },
  repRangeInputContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  repRangeInput: {
    textAlign: 'center',
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: 'gray',
    borderRadius: 10,
    color: 'white',
    fontSize: 16,
    width: 60,
  },
  addSetButton: {
    height: 20,
  },
});
