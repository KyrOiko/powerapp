import { useEffect } from 'react';

import { FlatList, StyleSheet, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import TitledPage from '@/components/pages/titled-page';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { fetchTemplates } from '@/store/template/index';

import TemplateCard from '../components/workout/templateCard';

export default function Workout() {
  const templates = useAppSelector(state => state.templatesSlice.templates);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTemplates());
  }, []);

  return (
    <TitledPage title="Workout" backButton={false}>
      <View style={styles.header}>
        <Ionicons
          name="add-circle"
          size={22}
          color="green"
          onPress={() => {
            router.push('/new-workout');
          }}
        />
      </View>

      <View style={styles.templatesContainer}>
        <FlatList
          data={templates}
          renderItem={({ item }) => (
            <TemplateCard
              item={item}
              onCardPress={() => {
                router.push(`/details-workout?id=${item.id}`);
              }}
              isSelected={false}
            />
          )}
          numColumns={1}
          style={styles.innerContainer}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.templateSeparator} />}
          showsVerticalScrollIndicator={true}
        />
      </View>
    </TitledPage>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  templatesContainer: {
    height: '95%',
    flexDirection: 'column',
  },
  innerContainer: {
    flex: 1,
    gap: 20,
  },
  template: {
    flexDirection: 'column',
    gap: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  exercise: {
    padding: 10,
  },
  exercisesContainer: {
    flexDirection: 'column',
    gap: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    maxHeight: 200,
  },
  exerciseSeparator: {
    height: 1,
    backgroundColor: 'transparent',
  },
  templateSeparator: {
    height: 10,
    backgroundColor: 'transparent',
  },
  templateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  startWorkoutButton: {
    marginTop: 10,
  },
});
