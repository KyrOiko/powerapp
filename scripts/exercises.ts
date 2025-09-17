export interface Exercise {
  id: string;
  name: string;
  description: string;
}

export interface WorkoutTemplate {
  id: string;
  name: string;
  description: string;
  exercises: Exercise[];
}

export const exercises: Exercise[] = [
  { id: '1', name: 'Push-up', description: 'Push-up' },
  { id: '2', name: 'Pull-up', description: 'Pull-up' },
  { id: '3', name: 'Squat', description: 'Squat' },
  { id: '4', name: 'Deadlift', description: 'Deadlift' },
  { id: '5', name: 'Bench Press', description: 'Bench Press' },
  { id: '6', name: 'Overhead Press', description: 'Overhead Press' },
  { id: '7', name: 'Squat', description: 'Squat' },
  { id: '8', name: 'Deadlift', description: 'Deadlift' },
  { id: '9', name: 'Bench Press', description: 'Bench Press' },
  { id: '10', name: 'Overhead Press', description: 'Overhead Press' },
  { id: '11', name: 'Squat', description: 'Squat' },
  { id: '12', name: 'Deadlift', description: 'Deadlift' },
  { id: '13', name: 'Bench Press', description: 'Bench Press' },
  { id: '14', name: 'Overhead Press', description: 'Overhead Press' },
  { id: '15', name: 'Squat', description: 'Squat' },
  { id: '16', name: 'Deadlift', description: 'Deadlift' },
  { id: '17', name: 'Bench Press', description: 'Bench Press' },
  { id: '18', name: 'Overhead Press', description: 'Overhead Press' },
  { id: '19', name: 'Squat', description: 'Squat' },
  { id: '20', name: 'Deadlift', description: 'Deadlift' },
  { id: '21', name: 'Bench Press', description: 'Bench Press' },
  { id: '22', name: 'Overhead Press', description: 'Overhead Press' },
  { id: '23', name: 'Squat', description: 'Squat' },
  { id: '24', name: 'Deadlift', description: 'Deadlift' },
  { id: '25', name: 'Bench Press', description: 'Bench Press' },
  { id: '26', name: 'Overhead Press', description: 'Overhead Press' },
  { id: '27', name: 'Squat', description: 'Squat' },
  { id: '28', name: 'Deadlift', description: 'Deadlift' },
  { id: '29', name: 'Bench Press', description: 'Bench Press' },
  { id: '30', name: 'Overhead Press', description: 'Overhead Press' },
];

export const templates: WorkoutTemplate[] = [
  { id: '1', name: 'Template 1', description: 'Template 1', exercises: exercises.slice(0, 3) },
  { id: '2', name: 'Template 2', description: 'Template 2', exercises: exercises.slice(3, 6) },
  { id: '3', name: 'Template 3', description: 'Template 3', exercises: exercises.slice(6, 9) },
  { id: '4', name: 'Template 4', description: 'Template 4', exercises: exercises.slice(9, 12) },
  { id: '5', name: 'Template 5', description: 'Template 5', exercises: exercises.slice(12, 15) },
  { id: '6', name: 'Template 6', description: 'Template 6', exercises: exercises.slice(15, 18) },
  { id: '7', name: 'Template 7', description: 'Template 7', exercises: exercises.slice(18, 21) },
  { id: '8', name: 'Template 8', description: 'Template 8', exercises: exercises.slice(18, 21) },
  { id: '9', name: 'Template 9', description: 'Template 9', exercises: exercises.slice(21, 24) },
  { id: '10', name: 'Template 10', description: 'Template 10', exercises: exercises },
  { id: '11', name: 'Template 11', description: 'Template 11', exercises: exercises.slice(24, 27) },
];
