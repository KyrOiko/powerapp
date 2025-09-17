import { Pressable, StyleSheet, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import CreateExerciseTemplate from '@/models/dto/create_exercise_template';

import SetHeader from './set-header';
import SetRow from './set-row';

export default function ExerciseCard({
  templateExercise,
}: {
  templateExercise: CreateExerciseTemplate;
}) {
  return (
    <View style={styles.gridContainer}>
      <ThemedText type="smallTitle" style={styles.exerciseName}>
        {templateExercise.exercise.name}
      </ThemedText>
      <SetHeader />
      {templateExercise.sets.map((_, index) => (
        <SetRow
          key={index}
          index={index}
          onLowerChange={text => {
            console.log(text);
          }}
          onUpperChange={text => {
            console.log(text);
          }}
          set={templateExercise.sets[index]}
        />
      ))}
      <View style={styles.actionsContainer}>
        <Pressable onPress={() => {}} style={styles.addSetButton}>
          <ThemedText type="smallSubtitle">Add set</ThemedText>
        </Pressable>
        <Pressable style={styles.deleteExerciseButton}>
          <Ionicons name="trash" size={24} color={'red'}></Ionicons>
        </Pressable>
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
  addExerciseButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  deleteExerciseButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 10,
    maxWidth: 50,
  },
  exerciseName: {
    color: 'white',
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  addSetButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    flex: 1,
  },
});
