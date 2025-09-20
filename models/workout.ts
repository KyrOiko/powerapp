import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ModelWorkoutExercise } from "./workout-exercise";

@Entity("workouts")
export class ModelWorkout {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text") name!: string;
  @Column("text") description!: string;
  @Column("datetime") date!: string;

  @OneToMany(() => ModelWorkoutExercise, (we) => we.workout, { cascade: true })
  exercises!: ModelWorkoutExercise[];
}
