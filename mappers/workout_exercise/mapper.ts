import WorkoutExerciseData from '@/domain/workout_exercise';
import { ModelWorkoutExercise } from '@/models/workout-exercise';
import { BaseMapper } from '@/utils/base_mapper';

import { workoutSetMapper } from '../workout_set/mapper';

export const workoutExerciseMapper: BaseMapper<ModelWorkoutExercise, WorkoutExerciseData> = {
  map(entity: ModelWorkoutExercise): WorkoutExerciseData {
    return {
      id: entity.id,
      exercise: entity.exercise,
      sets: entity.sets.map(set => workoutSetMapper.map(set)),
    };
  },
};
