import { DataSource } from 'typeorm';

import CreateWorkoutTemplate from '@/models/dto/create_workout_template';
import { ModelWorkoutTemplate } from '@/models/template';
import { BaseMapper } from '@/utils/base_mapper';

export default class WorkoutTemplateService {
  private localDb: DataSource;
  private mapper: BaseMapper<CreateWorkoutTemplate, Object>;
  constructor(localDb: DataSource, mapper: BaseMapper<CreateWorkoutTemplate, Object>) {
    this.localDb = localDb;
    this.mapper = mapper;
  }

  async create(workoutTemplate: CreateWorkoutTemplate): Promise<void> {
    const workoutTemplateEntity = this.localDb
      .getRepository(ModelWorkoutTemplate)
      .create(this.mapper.map(workoutTemplate));
    const response = await this.localDb
      .getRepository(ModelWorkoutTemplate)
      .save(workoutTemplateEntity);
    console.log('response');
    console.log(response);
  }

  async getMany(): Promise<ModelWorkoutTemplate[]> {
    return this.localDb.getRepository(ModelWorkoutTemplate).find();
  }
}
