import { AppDataSource } from '@/db/local-db';
import { exerciseMapper } from '@/mappers/exercise';

import ExerciseService from './exercise/service';

export const exerciseService = new ExerciseService(AppDataSource, exerciseMapper);
