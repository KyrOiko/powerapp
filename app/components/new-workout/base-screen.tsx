import { useRef } from 'react';

import { StyleSheet } from 'react-native';
import { FlatList, Pressable, TextInput, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';

import TitledPage from '@/components/pages/titled-page';
import { ThemedText } from '@/components/themed-text';
import Template from '@/domain/template';
import { useAppSelector } from '@/hooks/store';
import { RIR } from '@/models/enums';

import ExerciseCard from './exercise_card';
import SelectExerciseModal from './select_exercise_modal';
import SelectRIRModal from './select_rir_modal';

export default function TemplateBaseScreen({
  title,
  template,
  onNameChange,
  onDescriptionChange,
  onSave,
  onAddSet,
  onRemoveSet,
  onDuplicateSet,
  onLowerRepRangeChange,
  onUpperRepRangeChange,
  onSelectRIR,
  onUpdateRIR,
  onDelete,
}: {
  title: string;
  template: Template;
  onNameChange: (name: string) => void;
  onDescriptionChange: (description: string) => void;
  onAddSet: (exerciseId: number) => void;
  onRemoveSet: (exerciseId: number, setNumber: number) => void;
  onDuplicateSet: (exerciseId: number, setIndex: number) => void;
  onLowerRepRangeChange: (exerciseId: number, setIndex: number, value: number) => void;
  onUpperRepRangeChange: (exerciseId: number, setIndex: number, value: number) => void;
  onSelectRIR: (exerciseId: number, setNumber: number) => void;
  onUpdateRIR: (RIR: RIR) => void;
  onDelete: (exerciseId: number) => void;
  onSave: () => void;
}) {
  const exercises = useAppSelector(state => state.exercisesSlice.exercises);
  const modalizeRef = useRef<Modalize>(null);
  const rirModalizeRef = useRef<Modalize>(null);
  return (
    <>
      <TitledPage title={title}>
        <ThemedText type="smallSubtitle">Template name</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Template name"
          value={template.name}
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
          value={template.description}
          onChangeText={onDescriptionChange}
        />
        <View style={styles.exercisesHeader}>
          <ThemedText type="smallSubtitle">Template exercises</ThemedText>
          <Ionicons
            name="add-circle"
            size={22}
            color="white"
            onPress={() => {
              modalizeRef.current?.open();
            }}
          />
        </View>

        {template.exercises.length > 0 ? (
          <FlatList
            data={template.exercises}
            renderItem={({ item }) => (
              <>
                <ExerciseCard
                  templateExercise={item}
                  onAddSet={onAddSet}
                  onRemoveSet={onRemoveSet}
                  onDuplicateSet={onDuplicateSet}
                  onLowerRepRangeChange={onLowerRepRangeChange}
                  onUpperRepRangeChange={onUpperRepRangeChange}
                  onSelectRIR={(exerciseId: number, setNumber: number) => {
                    onSelectRIR(exerciseId, setNumber);
                    rirModalizeRef.current?.open();
                  }}
                  onDelete={onDelete}
                  key={item.exercise.id.toString()}
                />
              </>
            )}
            keyExtractor={item => item.exercise.id.toString()}
            ItemSeparatorComponent={() => <View style={styles.exerciseSeparator} />}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.noExercisesContainer}>
            <ThemedText type="smallSubtitle">No exercises added</ThemedText>
          </View>
        )}

        <Pressable
          onPress={() => {
            console.log('save template');
            onSave();
            console.log('saved template');
          }}
          style={styles.addExerciseButton}
        >
          <ThemedText type="smallSubtitle">Save template</ThemedText>
        </Pressable>
      </TitledPage>

      <SelectExerciseModal modalizeRef={modalizeRef} exercises={exercises} />
      <SelectRIRModal
        modalizeRef={rirModalizeRef}
        onItemSelect={(RIR: RIR) => {
          console.log('onItemSelect', RIR);
          onUpdateRIR(RIR);
        }}
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
  noExercisesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exercisesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
