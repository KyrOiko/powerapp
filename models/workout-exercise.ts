import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ModelExercise } from "./exercise";
import { ModelWorkout } from "./workout";
import { ModelWorkoutSet } from "./workout-set";

@Entity("workout_exercises")
export class ModelWorkoutExercise {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => ModelExercise, { eager: true })
  exercise!: ModelExercise;

  @ManyToOne(() => ModelWorkout, (w) => w.exercises, { onDelete: "CASCADE" })
  workout!: ModelWorkout;

  @OneToMany(() => ModelWorkoutSet, (ws) => ws.workoutExercise, { cascade: true })
  sets!: ModelWorkoutSet[];
}
