import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { WorkoutExercise } from "./workout-exercise";

  @Entity("workout_sets")
export class WorkoutSet {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("int") number!: number;
  @Column("int") actualRIR!: number;
  @Column("int") rest!: number;
  @Column("int") reps!: number;
  @Column("float") load!: number;
  @Column("text") notes!: string;

  @ManyToOne(() => WorkoutExercise, (we) => we.sets, { onDelete: "CASCADE" })
  workoutExercise!: WorkoutExercise;
}
