import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ModelWorkoutExercise } from "./workout-exercise";

@Entity("workout_sets")
export class ModelWorkoutSet {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("int") number!: number;
  @Column("int") actualRIR!: number;
  @Column("int") rest!: number;
  @Column("int") reps!: number;
  @Column("float") load!: number;
  @Column("text") notes!: string;

  @ManyToOne(() => ModelWorkoutExercise, (we) => we.sets, { onDelete: "CASCADE" })
  workoutExercise!: ModelWorkoutExercise;
}
