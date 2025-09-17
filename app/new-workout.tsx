import { useRef } from 'react';

import { FlatList, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { Modalize } from 'react-native-modalize';
import { useDispatch, useSelector } from 'react-redux';

import TitledPage from '@/components/pages/titled-page';
import { ThemedText } from '@/components/themed-text';
import { RootState } from '@/store';
import { updateTemplateField } from '@/store/workoutTemplateSlice';

import ExerciseCard from './components/new-workout/exercise_card';
import SelectExerciseModal from './components/new-workout/select_exercise_modal';

export default function NewWorkout() {
  const dispatch = useDispatch();
  const templateState = useSelector((state: RootState) => state.workoutTemplateSlice.template);
  const exercises = useSelector((state: RootState) => state.exercisesSlice.exercises);
  const modalizeRef = useRef<Modalize>(null);
  const onNameChange = (text: string) => {
    dispatch(updateTemplateField({ field: 'name', value: text }));
  };

  const onDescriptionChange = (text: string) => {
    dispatch(updateTemplateField({ field: 'description', value: text }));
  };

  const onAddExercisesPress = () => {
    modalizeRef.current?.open();
  };

  return (
    <>
      <TitledPage title="New Template">
        <ThemedText type="smallSubtitle">Template name</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Template name"
          value={templateState.name}
          numberOfLines={4}
          multiline={true}
          onChangeText={onNameChange}
        />
        <ThemedText type="smallSubtitle">Template description</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Template description"
          numberOfLines={4}
          multiline={true}
          value={templateState.description}
          onChangeText={onDescriptionChange}
        />
        <ThemedText type="smallSubtitle">Template exercises</ThemedText>
        <FlatList
          data={templateState.exercises}
          renderItem={({ item }) => <ExerciseCard templateExercise={item} />}
          keyExtractor={item => item.exercise.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.exerciseSeparator} />}
          showsVerticalScrollIndicator={false}
        />
        <Pressable
          onPress={() => {
            modalizeRef.current?.open();
          }}
          style={styles.addExerciseButton}
        >
          <ThemedText type="smallSubtitle">Add exercise</ThemedText>
        </Pressable>
      </TitledPage>

      <SelectExerciseModal
        modalizeRef={modalizeRef}
        exercises={exercises}
        onAddExercisesPress={onAddExercisesPress}
      />
    </>
  );
}

const styles = StyleSheet.create({
  exerciseSeparator: {
    height: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    maxHeight: 100,
    padding: 10,
    color: 'white',
    fontSize: 16,
    width: '100%',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },

  addExerciseButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },

  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  radioButtonItem: {
    fontSize: 16,
    fontWeight: 500,
    color: 'black',
    padding: 0,
    margin: 0,
  },
  modal: {
    backgroundColor: '#121212',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
  },
});
