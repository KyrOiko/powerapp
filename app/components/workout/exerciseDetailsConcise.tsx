import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import TemplateExercise from '@/domain/template_exercise';

export default function ExerciseDetailsConcise({
  templateExercise,
}: {
  templateExercise: TemplateExercise;
}) {
  return (
    <View style={styles.exerciseContainer}>
      <ThemedText type="smallSubtitle" style={styles.exerciseName}>
        {templateExercise.exercise.name}
      </ThemedText>
      <ThemedText type="smallSubtitle" style={styles.exerciseSets}>
        {templateExercise.sets.length} sets
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  exerciseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  exerciseName: {
    fontWeight: '500',
  },
  exerciseSets: {
    fontWeight: '300',
  },
});
