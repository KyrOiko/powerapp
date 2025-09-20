import WorkoutData from '@/domain/workout';
import { ModelWorkout } from '@/models/workout';
import { BaseMapper } from '@/utils/base_mapper';

import { workoutExerciseMapper } from '../workout_exercise/mapper';

export const workoutMapper: BaseMapper<ModelWorkout, WorkoutData> = {
  map(entity: ModelWorkout): WorkoutData {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      exercises: entity.exercises.map(exercise => workoutExerciseMapper.map(exercise)),
    };
  },
};
