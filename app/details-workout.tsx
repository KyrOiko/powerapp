import { FlatList, Pressable, StyleSheet } from 'react-native';

import { useLocalSearchParams } from 'expo-router';

import TitledPage from '@/components/pages/titled-page';
import { ThemedText } from '@/components/themed-text';
import { useAppSelector } from '@/hooks/store';

import ExerciseDetailsCard from './components/details-template/exercise-details-card';

export default function DetailsWorkout() {
  const { id } = useLocalSearchParams();
  const template = useAppSelector(state =>
    state.templatesSlice.templates.find(template => template.id === Number(id))
  );
  return (
    <TitledPage title={template?.name ?? ''}>
      {template?.description && <ThemedText>{template?.description}</ThemedText>}
      <FlatList
        data={template?.exercises}
        renderItem={({ item }) => <ExerciseDetailsCard exercise={item} />}
        keyExtractor={item => item.id.toString()}
      />
      <Pressable style={styles.startWorkoutButton}>
        <ThemedText type="smallSubtitle">Start workout</ThemedText>
      </Pressable>
    </TitledPage>
  );
}

const styles = StyleSheet.create({
  exerciseContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  setContainer: {
    marginTop: 10,
    gap: 10,
  },
  setNumber: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },
  setNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  setNumberContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  setNumberIcon: {
    marginRight: 5,
  },
  startWorkoutButton: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
});
