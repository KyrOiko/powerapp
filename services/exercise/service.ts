import { Exercise } from "@/models/exercise";
import ExerciseData from "@/types/exercise";
import { BaseMapper } from "@/utils/base_mapper";
import { DataSource } from "typeorm";

export default class ExerciseService {

  private localDb: DataSource;
  private mapper: BaseMapper<Exercise, ExerciseData>;
  constructor(localDb: DataSource, mapper: BaseMapper<Exercise, ExerciseData>) {
    this.localDb = localDb;
    this.mapper = mapper;
  }

  async getMany(): Promise<ExerciseData[]> {
    const exercises = await this.localDb.getRepository(Exercise).find();
    return exercises.map((exercise) => this.mapper.map(exercise));
  }
}
