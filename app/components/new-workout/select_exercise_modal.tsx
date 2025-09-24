import { memo, useCallback, useMemo, useState } from 'react';

import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { Modalize } from 'react-native-modalize';
import { useDispatch, useSelector } from 'react-redux';

import { ThemedText } from '@/components/themed-text';
import ExerciseData from '@/domain/exercise';
import { RootState } from '@/store';
import { toggleSelectedExercise } from '@/store/workoutTemplateSlice';

const ExerciseItem = memo(
  ({
    exercise,
    isSelected,
    onPress,
  }: {
    exercise: ExerciseData;
    isSelected: boolean;
    onPress: () => void;
  }) => (
    <Pressable
      style={[
        styles.exerciseContainer,
        {
          borderColor: isSelected ? 'green' : 'gray',
        },
      ]}
      onPress={onPress}
    >
      <ThemedText type="medium">{exercise.name}</ThemedText>
    </Pressable>
  )
);

export default function SelectExerciseModal({
  modalizeRef,
  exercises,
}: {
  modalizeRef: React.RefObject<Modalize | null>;
  exercises: ExerciseData[];
}) {
  const dispatch = useDispatch();
  const selectedExercises = useSelector(
    (state: RootState) => state.workoutTemplateSlice.selectedExercises
  );

  const [search, setSearch] = useState('');

  // Memoize filtered exercises
  const filteredExercises = useMemo(() => {
    return exercises.filter((exercise: ExerciseData) =>
      exercise.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [exercises, search]);

  // Memoize selected exercise IDs for faster lookup
  const selectedExerciseIds = useMemo(() => {
    return new Set(selectedExercises.map(e => e.id));
  }, [selectedExercises]);

  const handleExercisePress = useCallback(
    (exercise: ExerciseData) => {
      dispatch(toggleSelectedExercise({ exercise }));
    },
    [dispatch]
  );

  return (
    <Modalize
      ref={modalizeRef}
      withHandle={true}
      modalStyle={styles.modal}
      modalHeight={750}
      scrollViewProps={{ scrollEnabled: false }}
    >
      <View style={styles.modalContent}>
        <ThemedText type="smallTitle">Select exercises</ThemedText>
        <TextInput
          style={styles.input}
          value={search}
          onChangeText={setSearch}
          placeholder="Search exercises..."
          placeholderTextColor="gray"
        />
        <ScrollView style={styles.scrollView}>
          <View style={styles.exercisesGrid}>
            {filteredExercises.map((exercise: ExerciseData) => (
              <ExerciseItem
                key={exercise.id}
                exercise={exercise}
                isSelected={selectedExerciseIds.has(exercise.id)}
                onPress={() => handleExercisePress(exercise)}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </Modalize>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    color: 'white',
  },
  modalContent: {
    flexDirection: 'column',
    gap: 10,
  },
  modal: {
    backgroundColor: '#121212',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
    flexDirection: 'column',
    gap: 10,
  },
  scrollView: {
    height: 620,
  },
  exercisesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'flex-start',
  },
  exerciseContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
});
