import TemplateExercise from './template_exercise';

export default interface Template {
  id: number;
  name: string;
  description: string;
  exercises: TemplateExercise[];
}
