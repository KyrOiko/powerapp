import TemplateData from '@/domain/template';
import { ModelWorkoutTemplate } from '@/models/template';
import { BaseMapper } from '@/utils/base_mapper';

import { templateExerciseMapper } from '../template_exercise/mapper';

export const templateMapper: BaseMapper<ModelWorkoutTemplate, TemplateData> = {
  map(entity: ModelWorkoutTemplate): TemplateData {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      exercises: entity.exercises.map(exercise => templateExerciseMapper.map(exercise)),
    };
  },
};
