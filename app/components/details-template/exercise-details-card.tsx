import { StyleSheet, View } from 'react-native';

import { BodyPartMuscleIcon, EquipmentGym03Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';

import { ThemedText } from '@/components/themed-text';
import TemplateExercise from '@/domain/template_exercise';

export default function ExerciseDetailsCard({ exercise }: { exercise: TemplateExercise }) {
  return (
    <View style={styles.exerciseContainer}>
      <ThemedText type="smallTitle">{exercise.exercise.name}</ThemedText>
      <View style={styles.setContainer}>
        {exercise.sets.map(set => (
          <View style={styles.setNumberContainer} key={set.number}>
            <View style={styles.setNumber} key={set.number}>
              <ThemedText type="smallSubtitle">{set.number}</ThemedText>
            </View>
            <View style={styles.setNumberContent}>
              <HugeiconsIcon icon={EquipmentGym03Icon} size={20} color="white" />
              <ThemedText type="smallSubtitle">
                {set.repRange.lower} - {set.repRange.upper}
              </ThemedText>
            </View>
            <View style={styles.setNumberContent}>
              <HugeiconsIcon icon={BodyPartMuscleIcon} size={20} color="white" />
              <ThemedText type="smallSubtitle">{set.expectedRIR}</ThemedText>
            </View>
          </View>
        ))}
      </View>
    </View>
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
