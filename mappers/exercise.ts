import ExerciseData from '@/domain/exercise';
import { ModelExercise } from '@/models/exercise';
import { BaseMapper } from '@/utils/base_mapper';

export const exerciseMapper: BaseMapper<ModelExercise, ExerciseData> = {
  map(entity: ModelExercise): ExerciseData {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      type: entity.type,
      muscleGroup: entity.muscleGroup,
      dominance: entity.dominance,
      machine: entity.machine,
      equipment: entity.equipment,
      handle: entity.handle,
      tier: entity.tier,
      style: entity.style,
    };
  },
};
