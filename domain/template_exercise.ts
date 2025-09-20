import ExerciseData from './exercise';
import TemplateSet from './template_set';

export default interface TemplateExercise {
  id: number;
  exercise: ExerciseData;
  sets: TemplateSet[];
}
