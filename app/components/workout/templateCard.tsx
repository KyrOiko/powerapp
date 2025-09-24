import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { ThemedButton } from '@/components/themed-button';
import { ThemedText } from '@/components/themed-text';
import Template from '@/domain/template';

import ExerciseDetailsConcise from './exerciseDetailsConcise';

export default function TemplateCard({
  item,
  onCardPress,
  isSelected,
}: {
  item: Template;
  onCardPress: (item: Template) => void;
  isSelected: boolean;
}) {
  return (
    <Pressable
      onPress={() => {
        onCardPress(item);
      }}
    >
      <View style={[styles.template, { borderColor: isSelected ? 'green' : 'gray' }]}>
        <View style={styles.templateHeader}>
          <ThemedText type="smallTitle">{item.name}</ThemedText>
          {isSelected && (
            <ThemedButton
              title="Start workout"
              onPress={() => {
                console.log('start workout');
              }}
            />
          )}
        </View>
        <ThemedText type="smallSubtitle">{item.description}</ThemedText>
        <View style={styles.maskedContainer}>
          <FlatList
            data={item.exercises}
            renderItem={({ item }) => (
              <View key={item.id} style={[{ borderColor: isSelected ? 'green' : 'gray' }]}>
                <ExerciseDetailsConcise templateExercise={item} />
              </View>
            )}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={() => <View style={styles.exerciseSeparator} />}
            showsVerticalScrollIndicator={true}
            nestedScrollEnabled={true}
            style={styles.exerciseList}
          />
          <LinearGradient
            colors={['transparent', 'black']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.mask}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  template: {
    flexDirection: 'column',
    gap: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  maskedContainer: {
    overflow: 'hidden',
    maxHeight: 100,
    minHeight: 70,
    flexGrow: 0,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    position: 'relative',
  },
  exerciseList: {
    padding: 10,
  },
  mask: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    height: 40,
  },
  templateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseSeparator: {
    height: 5,
    backgroundColor: 'transparent',
  },
});
