import { DataSource } from 'typeorm';

import ExerciseData from '@/domain/exercise';
import { ModelExercise } from '@/models/exercise';
import { BaseMapper } from '@/utils/base_mapper';

export default class ExerciseService {
  private localDb: DataSource;
  private mapper: BaseMapper<ModelExercise, ExerciseData>;
  constructor(localDb: DataSource, mapper: BaseMapper<ModelExercise, ExerciseData>) {
    this.localDb = localDb;
    this.mapper = mapper;
  }

  async getMany(): Promise<ExerciseData[]> {
    const exercises = await this.localDb.getRepository(ModelExercise).find();
    return exercises.map(exercise => this.mapper.map(exercise));
  }
}
