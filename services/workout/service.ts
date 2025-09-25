import { DataSource } from 'typeorm';

import Workout from '@/domain/workout';
import CreateWorkoutTemplate from '@/models/dto/create_workout_template';
import { ModelWorkoutTemplate } from '@/models/template';
import { ModelWorkout } from '@/models/workout';
import { BaseMapper } from '@/utils/base_mapper';

export default class WorkoutTemplateService {
  private localDb: DataSource;
  private mapper: BaseMapper<ModelWorkout, Workout>;
  constructor(localDb: DataSource, mapper: BaseMapper<ModelWorkout, Workout>) {
    this.localDb = localDb;
    this.mapper = mapper;
  }

  async getMany(): Promise<Workout[]> {
    try {
      const workouts = await this.localDb
        .getRepository(ModelWorkout)
        .find({ relations: ['template', 'exercises.exercise', 'exercises.sets'] });
      return workouts.map(workout => this.mapper.map(workout));
    } catch (error) {
      console.error('Error getting workouts:', error);
      throw error;
    }
  }
}
