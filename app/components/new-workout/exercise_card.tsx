import { Fragment, memo } from 'react';

import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import CreateExerciseTemplate from '@/models/dto/create_exercise_template';

import SetHeader from './set-header';
import SetRow from './set-row';

function ExerciseCard({
  templateExercise,
  onAddSet,
  onRemoveSet,
  onDuplicateSet,
  onLowerRepRangeChange,
  onUpperRepRangeChange,
  onDelete,
  onSelectRIR: onSelectRIR,
}: {
  templateExercise: CreateExerciseTemplate;
  onAddSet: (exerciseId: number) => void;
  onRemoveSet: (exerciseId: number, setNumber: number) => void;
  onDuplicateSet: (exerciseId: number, setIndex: number) => void;
  onLowerRepRangeChange: (exerciseId: number, setIndex: number, lower: number) => void;
  onUpperRepRangeChange: (exerciseId: number, setIndex: number, upper: number) => void;
  onDelete: (exerciseId: number) => void;
  onSelectRIR: (exerciseId: number, setNumber: number) => void;
}) {
  return (
    <View style={styles.gridContainer}>
      <ThemedText type="smallTitle" style={styles.exerciseName}>
        {templateExercise.exercise.name} ({templateExercise.sets.length} sets)
      </ThemedText>
      <SetHeader />
      <ScrollView
        style={styles.setsContainer}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        {templateExercise.sets.map((set, index) => (
          <Fragment key={set.number}>
            <SetRow
              index={index}
              onLowerChange={text => {
                onLowerRepRangeChange(templateExercise.exercise.id, index, parseInt(text));
              }}
              onUpperChange={text => {
                onUpperRepRangeChange(templateExercise.exercise.id, index, parseInt(text));
              }}
              onDelete={() => onRemoveSet(templateExercise.exercise.id, set.number)}
              set={set}
              onDuplicateSet={() => {
                onDuplicateSet(templateExercise.exercise.id, index);
              }}
              onSelectRIR={() => onSelectRIR(templateExercise.exercise.id, set.number)}
            />
            {index < templateExercise.sets.length - 1 && <View style={styles.setSeparator} />}
          </Fragment>
        ))}
      </ScrollView>

      <View style={styles.actionsContainer}>
        <Pressable
          onPress={() => {
            onAddSet(templateExercise.exercise.id);
          }}
          style={styles.addSetButton}
        >
          <ThemedText type="smallSubtitle">Add set</ThemedText>
        </Pressable>
        <Pressable
          style={styles.deleteExerciseButton}
          onPress={() => onDelete(templateExercise.exercise.id)}
        >
          <Ionicons name="trash" size={24} color={'red'} />
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
  setsContainer: {
    maxHeight: 200,
    flexGrow: 0,
  },
  setSeparator: {
    height: 10,
  },
});

export default memo(ExerciseCard);
