import WorkoutSetData from '@/domain/workout_set';
import { ModelWorkoutSet } from '@/models/workout-set';
import { BaseMapper } from '@/utils/base_mapper';

export const workoutSetMapper: BaseMapper<ModelWorkoutSet, WorkoutSetData> = {
  map(entity: ModelWorkoutSet): WorkoutSetData {
    return {
      id: entity.id,
      number: entity.number,
      actualRIR: entity.actualRIR,
      rest: entity.rest,
      reps: entity.reps,
      load: entity.load,
      notes: entity.notes,
    };
  },
};
