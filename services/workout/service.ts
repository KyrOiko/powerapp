import { DataSource } from 'typeorm';

import CreateWorkoutTemplate from '@/models/dto/create_workout_template';
import { WorkoutTemplate } from '@/models/workout-template';
import { BaseMapper } from '@/utils/base_mapper';

export default class WorkoutTemplateService {
  private localDb: DataSource;
  private mapper: BaseMapper<CreateWorkoutTemplate, Object>;
  constructor(localDb: DataSource, mapper: BaseMapper<CreateWorkoutTemplate, Object>) {
    this.localDb = localDb;
    this.mapper = mapper;
  }

  async create(workoutTemplate: CreateWorkoutTemplate): Promise<WorkoutTemplate> {
    const workoutTemplateEntity = this.localDb
      .getRepository(WorkoutTemplate)
      .create(this.mapper.map(workoutTemplate));
    return this.localDb.getRepository(WorkoutTemplate).save(workoutTemplateEntity);
  }
}
