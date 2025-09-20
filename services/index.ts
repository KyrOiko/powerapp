import { AppDataSource } from '@/db/local-db';
import { exerciseMapper } from '@/mappers/exercise';
import { createWorkoutTemplateMapper } from '@/mappers/workout';

import ExerciseService from './exercise/service';
import WorkoutTemplateService from './workout/service';

export const exerciseService = new ExerciseService(AppDataSource, exerciseMapper);
export const workoutTemplateService = new WorkoutTemplateService(
  AppDataSource,
  createWorkoutTemplateMapper
);
