import TemplateExerciseData from '@/domain/template_exercise';
import { ModelTemplateExercise } from '@/models/template-exercise';
import { BaseMapper } from '@/utils/base_mapper';

import { templateSetMapper } from '../template_set/mapper';

export const templateExerciseMapper: BaseMapper<ModelTemplateExercise, TemplateExerciseData> = {
  map(entity: ModelTemplateExercise): TemplateExerciseData {
    return {
      id: entity.id,
      exercise: entity.exercise,
      sets: entity.sets.map(set => templateSetMapper.map(set)),
    };
  },
};
