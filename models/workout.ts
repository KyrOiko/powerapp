import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WorkoutExercise } from "./workout-exercise";

@Entity("workouts")
export class Workout {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text") name!: string;
  @Column("text") description!: string;
  @Column("datetime") date!: string;

  @OneToMany(() => WorkoutExercise, (we) => we.workout, { cascade: true })
  exercises!: WorkoutExercise[];
}
