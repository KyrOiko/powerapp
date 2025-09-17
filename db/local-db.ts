import * as SQLite from 'expo-sqlite';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { Exercise } from '@/models/exercise';
import { TemplateExercise } from '@/models/template-exercise';
import { TemplateSet } from '@/models/template-set';
import { Workout } from '@/models/workout';
import { WorkoutExercise } from '@/models/workout-exercise';
import { WorkoutSet } from '@/models/workout-set';
import { WorkoutTemplate } from '@/models/workout-template';

export const AppDataSource = new DataSource({
  type: 'expo',
  database: 'local-db',
  driver: SQLite,
  entities: [
    Exercise,
    Workout,
    WorkoutExercise,
    WorkoutSet,
    TemplateExercise,
    TemplateSet,
    WorkoutTemplate,
  ],
  synchronize: true,
  logging: true,
});
