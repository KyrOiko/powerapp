import { AppDataSource } from '@/db/local-db';
import { exerciseMapper } from '@/mappers/exercise';
import { templateMapper } from '@/mappers/template/mapper';
import { createWorkoutTemplateMapper } from '@/mappers/workout';

import ExerciseService from './exercise/service';
import TemplateService from './template/service';
import WorkoutTemplateService from './workout/service';

export const exerciseService = new ExerciseService(AppDataSource, exerciseMapper);
export const workoutTemplateService = new WorkoutTemplateService(
  AppDataSource,
  createWorkoutTemplateMapper
);

// Template Service
export const templateService = new TemplateService(
  AppDataSource,
  templateMapper,
  createWorkoutTemplateMapper
);
