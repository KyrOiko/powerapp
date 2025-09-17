import CreateExerciseTemplate from './create_exercise_template';

export default interface CreateWorkoutTemplate {
  name: string;
  description: string;
  exercises: CreateExerciseTemplate[];
}
