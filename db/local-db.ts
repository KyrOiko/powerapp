import * as SQLite from 'expo-sqlite';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { ModelExercise } from '@/models/exercise';
import { ModelWorkoutTemplate } from '@/models/template';
import { ModelTemplateExercise } from '@/models/template-exercise';
import { ModelTemplateSet } from '@/models/template-set';
import { ModelWorkout } from '@/models/workout';
import { ModelWorkoutExercise } from '@/models/workout-exercise';
import { ModelWorkoutSet } from '@/models/workout-set';

export const AppDataSource = new DataSource({
  type: 'expo',
  database: 'local-db',
  driver: SQLite,
  entities: [
    ModelExercise,
    ModelWorkout,
    ModelWorkoutExercise,
    ModelWorkoutSet,
    ModelTemplateExercise,
    ModelTemplateSet,
    ModelWorkoutTemplate,
  ],
  synchronize: true,
  logging: true,
  dropSchema: true,
});
