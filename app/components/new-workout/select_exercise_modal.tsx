import { useState } from 'react';

import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { Modalize } from 'react-native-modalize';
import { useDispatch, useSelector } from 'react-redux';

import { ThemedText } from '@/components/themed-text';
import { RootState } from '@/store';
import { toggleSelectedExercise } from '@/store/workoutTemplateSlice';
import ExerciseData from '@/types/exercise';

export default function SelectExerciseModal({
  modalizeRef,
  exercises,
  onAddExercisesPress,
}: {
  modalizeRef: React.RefObject<Modalize | null>;
  exercises: ExerciseData[];
  onAddExercisesPress: () => void;
}) {
  const dispatch = useDispatch();
  const selectedExercises = useSelector(
    (state: RootState) => state.workoutTemplateSlice.selectedExercises
  );

  const [search, setSearch] = useState('');
  function onExercisePress(exercise: ExerciseData) {
    dispatch(toggleSelectedExercise({ exercise }));
  }

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
            {exercises
              .filter((exercise: ExerciseData) =>
                exercise.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((exercise: ExerciseData) => (
                <Pressable
                  key={exercise.id}
                  style={[
                    styles.exerciseContainer,
                    { borderColor: selectedExercises.includes(exercise) ? 'green' : 'gray' },
                  ]}
                  onPress={() => onExercisePress(exercise)}
                >
                  <ThemedText type="medium">{exercise.name}</ThemedText>
                </Pressable>
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
