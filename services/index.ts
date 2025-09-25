import { AppDataSource } from '@/db/local-db';
import { exerciseMapper } from '@/mappers/exercise';
import { templateMapper } from '@/mappers/template/mapper';
import { createWorkoutTemplateMapper } from '@/mappers/workout';
import { workoutMapper } from '@/mappers/workout/mapper';

import ExerciseService from './exercise/service';
import TemplateService from './template/service';
import WorkoutService from './workout/service';

export const exerciseService = new ExerciseService(AppDataSource, exerciseMapper);
export const workoutService = new WorkoutService(AppDataSource, workoutMapper);

// Template Service
export const templateService = new TemplateService(
  AppDataSource,
  templateMapper,
  createWorkoutTemplateMapper
);
