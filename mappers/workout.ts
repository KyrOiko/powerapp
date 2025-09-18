import CreateWorkoutTemplate from '@/models/dto/create_workout_template';
import { BaseMapper } from '@/utils/base_mapper';

export const createWorkoutTemplateMapper: BaseMapper<CreateWorkoutTemplate, Object> = {
  map(entity: CreateWorkoutTemplate): Object {
    return {
      name: entity.name,
      description: entity.description,
      exercises: entity.exercises.map(exercise => ({
        exercise: exercise.exercise,
        sets: exercise.sets.map(set => ({
          number: set.number,
          expectedRIR: set.expectedRIR,
          rest: set.rest,
          repRange: {
            lower: set.repRange.lower,
            upper: set.repRange.upper,
          },
          guides: set.guides,
        })),
      })),
    };
  },
};
