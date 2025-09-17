import { useState } from 'react';

import { FlatList, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { ThemedButton } from '@/components/themed-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WorkoutTemplate, templates } from '@/scripts/exercises';

export default function Workout() {
  const [selectedTemplate, setSelectedTemplate] = useState<WorkoutTemplate | null>(null);
  const { width } = useWindowDimensions();

  const renderTemplate = ({
    item,
    setSelectedTemplate,
  }: {
    item: WorkoutTemplate;
    setSelectedTemplate: (template: WorkoutTemplate) => void;
  }) => {
    const isSelected = selectedTemplate?.id === item.id;
    const ITEM_SIZE = 100;
    const numColumns = Math.floor(width / ITEM_SIZE);

    return (
      <Pressable
        onPress={() => {
          setSelectedTemplate(item);
        }}
      >
        <View style={[styles.template, { borderColor: isSelected ? 'green' : 'gray' }]}>
          <View style={styles.templateHeader}>
            <ThemedText type="small">{item.name}</ThemedText>
            {isSelected && <ThemedButton title="Start workout" onPress={() => {}} />}
          </View>
          <ThemedText type="smallSubtitle">{item.description}</ThemedText>
          <FlatList
            data={item.exercises}
            numColumns={numColumns}
            renderItem={({ item }) => (
              <View
                key={item.id}
                style={[styles.exercise, { borderColor: isSelected ? 'green' : 'gray' }]}
              >
                <ThemedText type="small">{item.name}</ThemedText>
              </View>
            )}
            style={styles.exercisesContainer}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View style={styles.exerciseSeparator} />}
          />
        </View>
      </Pressable>
    );
  };

  return (
    <ThemedView>
      <View style={styles.header}>
        <ThemedText type="title">Workout</ThemedText>
        <Ionicons
          name="add-circle"
          size={24}
          color="green"
          onPress={() => {
            router.push('/new-workout');
          }}
        />
      </View>

      <View style={styles.templatesContainer}>
        <FlatList
          data={templates}
          renderItem={({ item }) => renderTemplate({ item, setSelectedTemplate })}
          style={styles.innerContainer}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View style={styles.templateSeparator} />}
          extraData={selectedTemplate}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ThemedView>
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
