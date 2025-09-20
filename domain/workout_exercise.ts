import ExerciseData from './exercise';
import WorkoutSet from './workout_set';

export default interface WorkoutExercise {
  id: number;
  exercise: ExerciseData;
  sets: WorkoutSet[];
}
