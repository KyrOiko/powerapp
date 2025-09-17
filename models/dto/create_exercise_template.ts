import ExerciseData from '@/types/exercise';

import { CreateTemplateSet } from './create_set_template';

export default interface CreateExerciseTemplate {
  exercise: ExerciseData;
  sets: CreateTemplateSet[];
}
