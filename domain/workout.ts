import WorkoutExercise from './workout_exercise';

export default interface Workout {
  id: number;
  name: string;
  description: string;
  exercises: WorkoutExercise[];
}
